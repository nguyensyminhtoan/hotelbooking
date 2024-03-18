import "./navbar.css"
import { Link } from 'react-router-dom'
const Navbar = () =>
{
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">
          <button className="navButton">Register</button>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
