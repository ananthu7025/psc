import { useSelector } from "react-redux";
import Payment from "./Payment";
import UserDashboard from "./UserDashboard";
import { useGetUserDetailsQuery } from "../../api/modules/login";
import { useEffect, useState } from "react";

const UserLayout = () => {
  const [isRefech,setIsRefech]=useState(false)
  const { data,refetch } = useGetUserDetailsQuery(); 
  useEffect(() => {
    refetch()
    debugger
  }, [isRefech])
    
  console.log(data?.isPaid);
  
  return (
    <div>
      {data?.isPaid === true ? (
        <UserDashboard/>
      ) : (
        <Payment setIsRefech={setIsRefech} />
      )}
    </div>
  );
};
  
export default UserLayout;
