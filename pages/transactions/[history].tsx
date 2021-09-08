import Credits from "@/components/Credits";
import Debits from "@/components/Debits";
import Loans from "@/components/Loans";
import ErrorPage from "@/components/ErrorPage";
import Withdraws from "@/components/Withdraws";
import { useRouter } from "next/router"

const History = () => {
  const { query } = useRouter()
console.log('====================================');
console.log(query);
console.log('====================================');
  switch (query.history) {
    case "credits":
      return <Credits />

      case "debits":
        return <Debits />

        case "loans":
      return <Loans />

      case "withdraws":
      return <Withdraws />
  
    default:
      return <ErrorPage title="Page Not Found" message="404 - Page Not Found" />
  }
}

export default History