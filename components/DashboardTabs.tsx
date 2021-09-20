import User from "@/components/User";
import { CreditType, DebitType, LoanType, UserType } from "types";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Credits from "@/components/Credits";
import Debits from "@/components/Debits";
import Loans from "@/components/Loans";
import Withdraws from "./Withdraws";

type DashboardProps = { userData: UserType };

const DashboardTabs = ({
  userData: {
    credits,
    loans,
    debits,
    firstname,
    lastname,
    balance,
    createdAt,
    email,
    phone,
    currency,
    _id,
  },
}: DashboardProps) => {
  return (
    <Tabs defaultActiveKey="overview" id="uncontrolled-tab" className="mb-3">
      <Tab tabClassName="text-info" eventKey="overview" title="Overview">
        <User
          summary={{
            firstname,
            lastname,
            balance,
            createdAt,
            email,
            phone,
            currency,
            _id,
          }}
        />
      </Tab>
      <Tab tabClassName="text-info" eventKey="credits" title="Credits">
        <Credits credits={credits as unknown as CreditType[]} />
      </Tab>
      <Tab tabClassName="text-info" eventKey="debits" title="Debits">
        <Debits debits={debits as unknown as DebitType[]} />
      </Tab>
      <Tab tabClassName="text-info" eventKey="loans" title="Loans">
        <Loans loans={loans as unknown as LoanType[]} />
      </Tab>
      <Tab tabClassName="text-info" eventKey="withdraws" title="Withdraws">
        {/* coming soon */}
        <Withdraws />
      </Tab>
    </Tabs>
  );
};

export default DashboardTabs;
