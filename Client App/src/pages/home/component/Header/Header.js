import "./Header.css";
import Form from "./Form";
const Header = () => {
  return (
    <div className="header">
      <h1>A lifetime of discounts? It's Genius.</h1>
      <p>
        Get rewarded for your travels - unlock instant savings of 10% or more
        with a free account
      </p>
      <button className="button signin-button">Sign in / Register</button>
      <Form />
    </div>
  );
};
export default Header;
