import config from "config";
import FundAccountTabs from "@/components/FundAccountTabs";

const {
  pageTitles 
} = config.appData

const FundAccount = () => {
  return (
    <div>
      <h2 className="display-4">{pageTitles[2]}</h2>
      <hr />
      <br />
      <FundAccountTabs />
    </div>
  );
};

export default FundAccount;
