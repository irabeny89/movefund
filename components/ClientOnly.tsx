import { useEffect, useState, ReactNode } from "react";

const ClientOnly = ({
  children,
  ...delegated
}: {
  children: ReactNode;
  delegated?: any;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return !hasMounted ? null : <div {...delegated}>{children}</div>;
};

export default ClientOnly;
