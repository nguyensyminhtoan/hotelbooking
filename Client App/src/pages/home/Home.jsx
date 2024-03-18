import NavBar from "./component/NavBar/NavBar";
import Header from "./component/Header/Header";
import Content from "./component/Content/Content";
import Footer from "./component/Footer/Footer";



const Home = ({ isLogin, email, data }) =>
{

  return (
    <div>
      <NavBar isLogin={isLogin} email={email}></NavBar>
      <Header></Header>
      <Content data={data}></Content>
      <Footer></Footer>
    </div>
  );
};

export default Home;
