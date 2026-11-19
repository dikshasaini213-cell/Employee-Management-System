import {Routes, Route, useLocation} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Employee from "./pages/employee"
import EditEmployee from "./pages/editemployee"
import AddEmployee from "./pages/addemployee"
import Employeedetails from "./pages/employeedetails"
import Navbar from "./components/nabvar"
import Sidebar from "./components/sidebar"
import Login from "./components/login"

function App(){
  const location = useLocation();
  if (location.pathname === "/login") {
    return <Login />;
  }
  return(
    <div className="app-container">
      <Navbar/>
      <div className="main-layout">
        <Sidebar/>
      {/* <Link to="/">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/add-employee">Add employees</Link> */}
    <main className="main-content">
    <Routes>
      <Route path="/"element={<Dashboard/>}/>
      <Route path="/employees"element={<Employee/>}/>
      <Route path="/add-employee"element={<AddEmployee/>}/>
      <Route path="/employee/:id"element={<Employeedetails/>}/>
      <Route path="/editemployee/:id"element={<EditEmployee/>}/>
    </Routes>
    </main>
    </div>
    </div>
  )
}

export default App