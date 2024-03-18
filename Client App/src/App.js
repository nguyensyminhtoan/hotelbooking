import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useEffect, useState } from "react";
import { SearchProvider } from "./searchContext/SearchContext";
import Transaction from "./pages/Transaction/Transaction";
function App()
{
  const [isLogin, setIsLogin] = useState(false)
  const [dataUser, setDataUser] = useState('')
  // check login
  const [redirectToHome, setRedirectToHome] = useState(false)
  const [dataHotels, setDataHotels] = useState()
  useEffect(() =>
  {

    fetchHotels()

  }, [])
  useEffect(() =>
  {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo)
    {
      // Gửi thông tin người dùng đến server để kiểm tra đăng nhập
      fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
        .then(response => response.json())
        .then(data =>
        {
          setIsLogin(data.isLogin);
          setDataUser(data.user);
        })
        .catch(error => console.log(error));
    } else
    {
      setIsLogin(false)
      setDataUser([])
    }
  }, [redirectToHome])
  const handleLoginSuccess = () =>
  {
    setRedirectToHome(true);
  }


  const fetchHotels = async () =>
  {
    const request = await fetch('http://localhost:5000/hotel')
    const dataHotels = await request.json()
    setDataHotels(dataHotels)


  }

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isLogin={isLogin} email={dataUser.email} data={dataHotels} />} />
          <Route path="/search" element={<Search isLogin={isLogin} email={dataUser.email} />} />
          <Route path="/detail/:hotelID" element={<Detail isLogin={isLogin} dataUser={dataUser} />} />
          <Route path="/auth" element={<AuthPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/transaction" element={<Transaction isLogin={isLogin} email={dataUser.email} />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
