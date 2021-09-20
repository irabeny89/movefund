import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import AuthScope from "./AuthScope";
import { usePayload } from "hooks";
import config from "config";
import AjaxFeedback from "./AjaxFeedback";

// get app data from config
const { title, pageTitles } = config.appData;

const brandStyle = {
  cursor: "pointer",
};

const Header = () => {
  // get token payload
  const { jwtPayload } = usePayload();
  // create logout mutation
  const [logoutUser, { loading, error }] = useMutation(gql`
    mutation Logout {
      logout
    }
  `);
  // logout handler
  const handleLogout = async () => {
    // execute logout mutation
    await logoutUser();
    // clear tokens
    accessTokenVar(undefined);
    // redirect to home and refresh to clear cache
    location.href = "/";
  };
  return !!jwtPayload ? (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link href="/">
          <Navbar.Brand style={brandStyle}>{title}&trade;</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={jwtPayload.firstname || "Member"}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <AuthScope>
              <Link passHref href="/me">
                <Nav.Link>{pageTitles[1]}</Nav.Link>
              </Link>
            </AuthScope>
            <AuthScope>
              <Link passHref href="/me/fundAccount">
                <Nav.Link>{pageTitles[2]}</Nav.Link>
              </Link>
            </AuthScope>
            <AuthScope scope="user">
              <Link passHref href="/me/sendMoney">
                <Nav.Link>{pageTitles[3]}</Nav.Link>
              </Link>
            </AuthScope>
            <AuthScope scope="user">
              <Link passHref href="/me/paybackLoan">
                <Nav.Link>{pageTitles[4]}</Nav.Link>
              </Link>
            </AuthScope>
            <AuthScope>
              <Link passHref href="#withdraw">
                <Nav.Link>
                  Withdraw - <Badge className="bg-info">coming soon</Badge>
                </Nav.Link>
              </Link>
            </AuthScope>
            <AuthScope scope="admin">
              <Link passHref href="/me/users">
                <Nav.Link>{pageTitles[5]}</Nav.Link>
              </Link>
            </AuthScope>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <AjaxFeedback error={error} isLoading={loading} />
    </Navbar>
  ) : null;
};

export default Header;
