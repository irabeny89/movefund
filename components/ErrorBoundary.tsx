import { Component, ErrorInfo, ReactNode } from "react";
import ErrorPage from "@/components/ErrorPage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError)
      return (
        <ErrorPage title="Oops Error" message="Sorry... there was an error" />
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
