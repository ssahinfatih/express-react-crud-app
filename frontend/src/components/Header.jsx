import "./header.css"
import {Link} from "react-router-dom"


export const Header = () => {
 


  return (
    <nav className="navbar">
        <Link to="/" className="header">
            USER MANAGEMENT SYSTEM
        </Link>
        <div >
        <Link to="/"  className="active">
              Home
        </Link>
        <Link to="/add" className="active" >
             Add New User
        </Link>
        </div>
    </nav>
  )
}
