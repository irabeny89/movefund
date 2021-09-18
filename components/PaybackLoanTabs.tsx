import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import AppTransferForm from "@/components/AppTransferForm";
import { myLastLoanAmountDueVar } from "@/graphql/reactiveVariables";
import { useReactiveVar } from "@apollo/client";

const PaybackLoanTabs = () => {
  const myLastLoanAmountDue = useReactiveVar(myLastLoanAmountDueVar);
  return (
    <Tabs defaultActiveKey="appTransfer" id="uncontrolled-tab" className="mb-3">
      <Tab tabClassName="text-info" eventKey="appTransfer" title="App Transfer">
        {!!myLastLoanAmountDue && (
          <Alert variant="info" className="h4">
            Amount due: {myLastLoanAmountDue}
          </Alert>
        )}
        <AppTransferForm />
      </Tab>
      <Tab
        tabClassName="text-info"
        eventKey="bankTransfer"
        title="Bank Transfer"
      >
        {!!myLastLoanAmountDue && (
          <Alert variant="info" className="h4">
            Amount due: {myLastLoanAmountDue}
          </Alert>
        )}
        <>Coming soon</>
      </Tab>
    </Tabs>
  );
};

export default PaybackLoanTabs;
