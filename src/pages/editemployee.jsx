import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditEmployee() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
      queryKey: ["employee", id],

      queryFn: async () => {
       const response = await api.get(`/users/${id}`);
       return response.data;
     }
    });

    useEffect(() => {
     if (data) {
      setName(data.name);
      setEmail(data.email);
      setCity(data.address.city);
     }
    }, [data]);

    const mutation = useMutation({
     mutationFn: async (updatedEmployee) => {
      const response = await api.put( `/users/${id}`,updatedEmployee);
      return response.data;
      },

     onSuccess: () => {
      alert("Employee updated successfully!");
      navigate("/employees");
      },

     onError: () => {
      alert("Unable to update employee!");
     }
    });

    function handleSubmit(e) {
     e.preventDefault();

     const updatedEmployee = {
        name: name,
        email: email,
        address: {
        city: city
        }
      };

     mutation.mutate(updatedEmployee);
    }

    if (isLoading) {
      return <h2>Loading employee details...</h2>;
    }

    if (isError) {
      return <h2>Error loading employee details!</h2>;
    }

    return (
     <div>
       <h1>Edit Employee</h1>
       <form onSubmit={handleSubmit}>
         <input type="text" placeholder="Employee Name" value={name} onChange={(e) => setName(e.target.value)}required/>
          <br /><br />
         <input type="email" placeholder="Employee Email" value={email} onChange={(e) => setEmail(e.target.value)}required/>
          <br /><br />
         <input type="text" placeholder="Employee City" value={city} onChange={(e) => setCity(e.target.value)} required />
         <br /><br />
         <button type="submit" disabled={mutation.isPending}>
         {mutation.isPending ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
   );
}


export default EditEmployee