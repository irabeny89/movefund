import { usePayload } from "hooks";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router"
import Link from "next/link"

type AuthScopePropsType = {
  children: ReactNode;
  scope?: "admin" | "user";
};
// handle auth
const AuthScope = ({
  children,
  scope,
}: AuthScopePropsType) => {
  const { replace } = useRouter()
  // get decoded payload
  const { jwtPayload } = usePayload();
  // useEffect(() => {
  // })
  // unauthorized
  if (!jwtPayload) replace("/")
// general
if (!scope) return <>{children}</>
// specific
if (scope !== jwtPayload?.aud) return null
  // default
  return <>{children}</>;
};

export default AuthScope;
