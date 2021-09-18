import { randomBytes, scrypt, BinaryLike } from "crypto";
import { AuthenticationError } from "apollo-server-micro";
import { promisify } from "util";
import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";
import { TokenType, UserPayloadType } from "types";
import { JwtPayload, Secret, sign, SignOptions, verify } from "jsonwebtoken";
import config from "config";

const {
  environmentVariable: {
    jwtAccessSecret,
    jwtRefreshSecret,
    tokenIssuer,
    nodeEnvironment,
  },
} = config;

export const CREDITS_LOANS_WITHDRAWALS_POPULATION = {
  path: "credits loans withdrawals",
};

export const DEBITS_POPULATION = {
  path: "debits",
  populate: {
    path: "to",
  },
};

export const AUTHORIZATION_ERROR_MESSAGE = "Authorization failed";

export const LOGIN_ERROR_MESSAGE = "Enter correct email and password";

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge!);
    options.maxAge! /= 1000;
  }
  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

export const handleEncryption = async (
  password: string
): Promise<{ salt: string; password: string } | undefined> => {
  try {
    const salt = randomBytes(32).toString("hex");

    return {
      salt,
      password: await hashPassword(password, salt),
    };
  } catch (error) {
    handleError(error, Error, "Registration failed");
  }
};

const asyncScrypt = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt);

export const handleError = (
  condition: any,
  ErrorClass: any,
  message: string
) => {
  if (condition) throw new ErrorClass(message);
};

const hashPassword = async (password: string, salt: string) => {
  const hash = await asyncScrypt(password, salt, 64);

  return hash.toString("hex");
};

export const comparePassword = async (
  hashedpassword: string,
  password: string,
  salt: string
) => {
  const isValid = hashedpassword === (await hashPassword(password, salt));

  handleError(!isValid, AuthenticationError, "Authentication error");
};

export const getAccessToken = (authHeader: string | undefined): string | void =>
  authHeader
    ? authHeader.replace("Bearer ", "")
    : handleError(
        !authHeader,
        AuthenticationError,
        AUTHORIZATION_ERROR_MESSAGE
      );

export const verifyToken = (token: string, secret: Secret) => {
  try {
    // verify token and return jwt payload
    const decodedToken = verify(token, secret) as JwtPayload & UserPayloadType;

    return decodedToken;
  } catch (error) {
    handleError(error, AuthenticationError, AUTHORIZATION_ERROR_MESSAGE);
  }
};

const generateToken = (
  payload: string | object | Buffer,
  secretOrPrivateKey: Secret,
  options?: SignOptions | undefined
) => {
  try {
    return sign(payload, secretOrPrivateKey, options);
  } catch (error) {
    handleError(error, AuthenticationError, AUTHORIZATION_ERROR_MESSAGE);
  }
};

const getToken = ({ id, isAdmin }: UserPayloadType): TokenType => ({
  accessToken: generateToken({ id, isAdmin }, jwtAccessSecret, {
    subject: `${id}`,
    expiresIn: "10m",
    audience: isAdmin ? "admin" : "user",
    issuer: tokenIssuer || "http://localhost:3000/api/graphql",
    algorithm: "HS256",
  })!,
  refreshToken: generateToken({ id, isAdmin }, jwtRefreshSecret, {
    subject: `${id}`,
    expiresIn: "30d",
    audience: isAdmin ? "admin" : "user",
    issuer: tokenIssuer || "http://localhost:3000/api/graphql",
    algorithm: "HS256",
  })!,
});

export const authUser = (
  { id, isAdmin }: UserPayloadType,
  res: NextApiResponse
) => {
  const _token = getToken({
    id,
    isAdmin,
  });

  setCookie(res, "token", _token.refreshToken, {
    maxAge: 2592000000,
    httpOnly: true,
    sameSite: true,
    secure: nodeEnvironment == "production" ? true : false,
    path: "/api/graphql",
  });

  return _token;
};

export const handleAdminAuth = (
  authHeader: string,
  isAdmin: boolean = true
) => {
  const payload = verifyToken(
    getAccessToken(authHeader)!,
    jwtAccessSecret
  ) as JwtPayload & UserPayloadType;

  isAdmin
    ? handleError(
        !payload.isAdmin,
        AuthenticationError,
        AUTHORIZATION_ERROR_MESSAGE
      )
    : handleError(
        payload.isAdmin,
        AuthenticationError,
        AUTHORIZATION_ERROR_MESSAGE
      );

  return payload;
};
