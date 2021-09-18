import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AllUsers from "./AllUsers";
import LoanRequests from "./LoanRequests";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_ALL_USERS_QUERY } from "@/graphql/documentNodes";
import { LoanType, UserType } from "types";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import AjaxFeedback from "./AjaxFeedback";

const AllUsersTabs = () => {
  const accessToken = useReactiveVar(accessTokenVar);
  const { loading, error, data } = useQuery<{
    getAllUsers: UserType[];
  }>(GET_ALL_USERS_QUERY, {
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    pollInterval: 5000,
  });
console.log(accessToken, "test access token");

  if (loading) return <AjaxFeedback isLoading={loading} />;

  // get all users pending loans
  const getPendingLoans = (usersData: UserType[]) => {
    const usersPendingLoanRequest = usersData.map((user) => {
      // get a user loans list
      const loans = user.loans! as LoanType[];
      // filter pending loans
      const pendingLoans = loans.filter((loan) => loan.status === "PENDING");
      // return new user with pending loans
      return { ...user, loans: pendingLoans };
    });
    // filter out admin user then return new users list
    const regularUsers = usersPendingLoanRequest.filter(
      (user) => !user.isAdmin
    );

    return regularUsers.length < 1 ? [] : regularUsers;
  };

  return (
    <div>
      {error && <AjaxFeedback error={error} />}
      <Tabs defaultActiveKey="users" id="uncontrolled-tab" className="mb-3">
        <Tab tabClassName="text-info" eventKey="users" title="User Dashboards">
          <AllUsers usersData={data?.getAllUsers!} />
        </Tab>
        <Tab
          tabClassName="text-info"
          eventKey="loanRequests"
          title="Reply Loan Requests"
        >
          <LoanRequests
            usersWithPendingLoans={getPendingLoans(data?.getAllUsers!)}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AllUsersTabs;
