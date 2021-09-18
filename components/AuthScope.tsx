import { usePayload } from "hooks";
import React, { ReactNode } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Link from "next/link";

type AuthScopePropsType = {
  children: ReactNode;
  scope?: "admin" | "user";
  element?: "page" | "nav";
};

const forbiddenStyle = {
  paddingBottom: "20rem",
};
// handle auth
const AuthScope = ({
  children,
  scope,
  element = "page",
}: AuthScopePropsType) => {
  // get decoded payload
  const payload = usePayload();
  // forbid if not authorized/authenticated
  if (!payload)
    return (
      <div style={forbiddenStyle} className="text-center pt-5 h4">
        <Alert variant="danger">
          <Alert.Heading>Forbidden</Alert.Heading>
          <hr />
          <p>Kindly, Register or Login</p>
        </Alert>
        <Link href="/">
          <Button>Go Home Page</Button>
        </Link>
      </div>
    );
  // render children when scope matches
  if (
    ((element === "page" || element === "nav") && payload && !scope) ||
    payload?.aud === scope
  )
    return <>{children}</>;
  // if no scoped audience hide element
  return null;
};

export default AuthScope;
