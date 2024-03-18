import data from "../../../../data/navBar.json";
import "./NavBar.css";
import NavBarItem from "./NavBarItem";
const NavBar = ({ isLogin, email }) =>
{

  return (
    <div className="nav">
      <NavBarItem isLogin={isLogin} email={email} />
      <ul className="navbar">
        {isLogin ? data.map((item, index) => (
          <span key={index}>
            <li className={item.active ? "active" : ""}>
              <i className={`fas ${item.icon}`} />
              {item.type}
            </li>
          </span>
        )) : ''}
      </ul>
    </div>
  );
};
export default NavBar;
