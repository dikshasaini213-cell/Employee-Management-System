import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authslice";

function Navbar(){
  const user=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();
  function handleLogout(){
    dispatch(logout());
  }
  return(
    <header className="navbar">
      <div className="navabar-logo">
        EmployeeMS
      </div>
      <div className="navbar-right">
        {user?(
          <><span>Welcome{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
          </>):(<Link to="/login">Login</Link>)}
      </div>
    </header>
  )
}

export default Navbar