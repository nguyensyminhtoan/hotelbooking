import NavBar from "../home/component/NavBar/NavBar";
import Footer from "../home/component/Footer/Footer";
import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";
import "./Search.css";

const Search = ({ isLogin, email }) =>
{

  return (
    <div>
      <NavBar isLogin={isLogin} email={email} />
      <div className="search">
        <SearchPopup></SearchPopup>
        <SearchList></SearchList>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
