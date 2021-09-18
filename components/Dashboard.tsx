import DashboardTabs from "@/components/DashboardTabs";
import { useQuery, useReactiveVar } from "@apollo/client";
import AjaxFeedback from "@/components/AjaxFeedback";
import { LoanType, UserType } from "types";
import {
  accessTokenVar,
  myLastLoanAmountDueVar,
} from "@/graphql/reactiveVariables";
import { GET_MY_PROFILE_QUERY } from "@/graphql/documentNodes";
import config from "config";

const { pageTitles } = config.appData;

const Dashboard = () => {
  // get access token from reactive variable
  const accessToken = useReactiveVar(accessTokenVar);
  // execute query for user profile
  const { loading, error, data } = useQuery<{
    getMyProfile: UserType;
  }>(GET_MY_PROFILE_QUERY, {
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    pollInterval: 5000,
  });

  if (data) {
    const lastLoan = data?.getMyProfile?.loans![
      data?.getMyProfile?.loans?.length! - 1
    ] as LoanType;
    // set last amount due in reactive variable
    myLastLoanAmountDueVar(lastLoan?.amountDue! || 0);
  }

  return (
    <div>
      <h2 className="display-4">{pageTitles[1]}</h2>
      <hr />
      <br />
      {error && <AjaxFeedback error={error} />}
      {loading && <AjaxFeedback isLoading={loading} />}
      {data ? <DashboardTabs userData={data.getMyProfile} /> : null}
    </div>
  );
};

export default Dashboard;
