import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../services/api";


function Dashboard(){
const {data,isLoading,isError}=useQuery({
  queryKey:["employees"],

  queryFn:async()=>{
    const response=await api.get("/users");
    return response.data;
  }
});

if(isLoading)return<h2>Loading dashboard......</h2>;
if(isError)return<h2>Error loading the dashborad</h2>;

const totalEmployees=data.length;
const totalCompanies=new Set(data.map((employee)=>employee.company.name)).size;
const totalCities=new Set(data.map((employee)=>employee.address.city)).size;


  return(
    <div>
      <h2>Employee Dashborad</h2>
      <p>Welcome to employee management system</p>
      <hr/>
      <h2>Dashboard statistics</h2>
      <div>
        <h3>Total companies</h3>
        <p>{totalCompanies}</p>
      </div>
      <div>
        <h3>Total cities</h3>
        <p>{totalCities}</p>
      </div>
      <hr/>
      <h2>Quick actions</h2>
      <Link to="/employees">
           View All Employees
      </Link>

      <br /><br />

      <Link to="/add-employee">
          Add New Employee
       </Link>

    </div>
  )
}

export default Dashboard