import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Register from "@/components/Register";
import Login from "@/components/Login";

const AuthTabs = () => (
  <Tabs defaultActiveKey="register" id="uncontrolled-tab" className="mb-3">
    <Tab tabClassName="text-info" eventKey="register" title="Register">
      <Register />
    </Tab>
    <Tab tabClassName="text-info" eventKey="login" title="Login">
      <Login />
    </Tab>
  </Tabs>
);

export default AuthTabs;
