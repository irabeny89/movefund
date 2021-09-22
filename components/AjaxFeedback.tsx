import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import config from "config";

type AjaxFeedbackProps = {
  isLoading?: boolean;
  error?: any;
  spinnerMessage?: string;
};

const {
  appData: { title },
} = config;

const AjaxFeedback = ({
  isLoading,
  error,
  spinnerMessage = title,
}: AjaxFeedbackProps) => {
  return (
    <Container className="text-center">
      {isLoading && (
        <Spinner animation="border" role="status">
          {spinnerMessage}
        </Spinner>
      )}
      {error && error.message !== "Authorization failed" && (
        <Alert variant="danger">
          <Alert.Heading>Alert</Alert.Heading>
          <hr />
          <p>
            {error.message}
          </p>
        </Alert>
      )}
    </Container>
  );
};

export default AjaxFeedback;
