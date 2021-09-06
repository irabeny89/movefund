import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

type AjaxFeedbackProps = {
  isLoading: boolean;
  error: unknown;
};

const AjaxFeedback = ({ isLoading, error }: AjaxFeedbackProps) => (
  <Container className="text-center">
    {isLoading && (
      <Container className="text-info">
        <Spinner size="sm" animation="grow" /> Loading...
      </Container>
    )}
    {error && (
      <Container className="text-danger">
        Could not fetch data! Check your internet connection then reload the
        page.
      </Container>
    )}
  </Container>
);

export default AjaxFeedback;
