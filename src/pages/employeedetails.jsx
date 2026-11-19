import { useQuery } from "@tanstack/react-query"
import { useParams,Link } from "react-router-dom"
import api from "../services/api"


function Employeedetails(){
 const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["employee", id],
        queryFn: async () => {
            const response = await api.get(`/users/${id}`);
            return response.data;
        }
    });

    if (isLoading) return <h2>Loading employee details...</h2>;

    if (isError) return <h2>Error loading employee details!</h2>;

  return(
    <>
    <h1>Employee Details</h1>
       <p><strong>ID:</strong> {data.id}</p>
       <p><strong>Name:</strong> {data.name}</p>
       <p><strong>Email:</strong> {data.email}</p>
       <p><strong>Phone:</strong> {data.phone}</p>
       <p><strong>Username:</strong> {data.username}</p>
       <p><strong>Website:</strong> {data.website}</p>
        <h2>Address Information</h2>

         <p><strong>Street:</strong> {data.address.street}</p>
         <p><strong>Suite:</strong> {data.address.suite}</p>
         <p><strong>City:</strong> {data.address.city}</p>
         <p><strong>Zipcode:</strong> {data.address.zipcode}</p>
         <p><strong>Latitude:</strong> {data.address.geo.lat}</p>
         <p><strong>Longitude:</strong> {data.address.geo.lng}</p>

            <hr />

        <h2>Company Information</h2>

         <p><strong>Company Name:</strong> {data.company.name}</p>
         <p><strong>Catch Phrase:</strong> {data.company.catchPhrase}</p>
         <p><strong>Business:</strong> {data.company.bs}</p>

           <hr />
        <Link to={`/editemployee/${data.id}`}>
        Edit Employee
       </Link>
       <br /><br />
       <Link to="/employees">
        Back to Employees
        </Link>
    </>
  )
}



export default Employeedetails