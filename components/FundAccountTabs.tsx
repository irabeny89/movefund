import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RequestLoanForm from "@/components/RequestLoanForm";
import { usePayload } from "hooks";

const getActiveTab = (isAdmin: boolean) =>
  isAdmin ? "bankTransfer" : "requestLoan";

const FundAccountTabs = () => {
  const payload = usePayload();

  return (
      <Tabs
        defaultActiveKey={getActiveTab(payload?.isAdmin!)}
        id="uncontrolled-tab"
        className="mb-3"
      >
        {!payload?.isAdmin! && (
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
