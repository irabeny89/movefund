import SendMoneyForm from "@/components/SendMoneyForm";
import config from "config";

const { pageTitles } = config.appData

const SendMoney = () => {
  return (
    <div>
      <h2 className="display-4">{pageTitles[3]} </h2>
      <hr />
      <br />
      <SendMoneyForm />
    </div>
  );
};

export default SendMoney;
