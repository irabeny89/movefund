import { UserType } from "types";
import DashboardTabs from "./DashboardTabs";

type AllUsersProps = {
  usersData: UserType[];
};

const AllUsers = ({ usersData = [] }: AllUsersProps) => {
  return (
    <div>
      {usersData.map((user) => (
        <DashboardTabs userData={user} key={String(user._id)} />
      ))}
    </div>
  );
};

export default AllUsers;
