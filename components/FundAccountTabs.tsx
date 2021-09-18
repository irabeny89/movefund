import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RequestLoanForm from "@/components/RequestLoanForm";
import { usePayload } from "hooks";

const getActiveTab = (isAdmin: boolean) =>
  isAdmin ? "bankTransfer" : "requestLoan";

const FundAccountTabs = () => {
  const { jwtPayload } = usePayload();

  return (
      <Tabs
        defaultActiveKey={getActiveTab(jwtPayload?.aud == "admin")}
        id="uncontrolled-tab"
        className="mb-3"
      >
        {jwtPayload?.aud !== "admin" && (
          <Tab
            tabClassName="text-info"
            eventKey="requestLoan"
            title="Request Loan"
          >
              <RequestLoanForm />
          </Tab>
        )}
        <Tab
          tabClassName="text-info"
          eventKey="bankTransfer"
          title="Bank Transfer"
        >
          <>Coming soon</>
        </Tab>
      </Tabs>
  );
};

export default FundAccountTabs;
