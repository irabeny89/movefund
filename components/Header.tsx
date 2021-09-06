import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";

const brandStyle = {
  cursor: "pointer",
};
const Header = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Link href="/">
        <Navbar.Brand style={brandStyle}>MoveMoney</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Member" id="collapsible-nav-dropdown">
            <Link passHref href="/member/register">
              <NavDropdown.Item>Register</NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <Link passHref href="/member/login">
              <NavDropdown.Item>Login</NavDropdown.Item>
            </Link>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Fund Account" id="collapsible-nav-dropdown">
            <Link passHref href="/fundAccount/requestLoan">
              <NavDropdown.Item>Request Loan</NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#bankTransfer">
              Bank Transfer - <Badge className="bg-info">coming soon</Badge>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#withdraw">
            Withdraw - <Badge className="bg-info">coming soon</Badge>
          </Nav.Link>
          <NavDropdown title="Transactions" id="collapsible-nav-dropdown">
            <Link passHref href="/transactions/loans">
              <NavDropdown.Item>Loans</NavDropdown.Item>
            </Link>
            <Link passHref href="/transactions/credits">
              <NavDropdown.Item>Credits</NavDropdown.Item>
            </Link>
            <Link passHref href="/transactions/debits">
              <NavDropdown.Item>Debits</NavDropdown.Item>
            </Link>
            <Link passHref href="/transactions/withdraws">
              <NavDropdown.Item>Withdraws</NavDropdown.Item>
            </Link>
          </NavDropdown>
          <Link passHref href="/users">
            <Nav.Link>All Users</Nav.Link>
          </Link>
          <Link passHref href="/loanRequests">
            <Nav.Link>Loan Requests</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
