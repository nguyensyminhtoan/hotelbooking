import React from "react"
import Navbar from "../../components/navbar/Navbar.jsx"
import "./login.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
const Login = () =>
{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const handleEmail = (e) => { setEmail(e.target.value) }
  const handlePassword = (e) => { setPassword(e.target.value) }
  const handleLogin = (e) =>
  {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
    {
      setErrorMessage("Vui lòng nhập định dạng email hợp lệ.");
      return;
    }
    if (password.length < 8)
    {
      setErrorMessage("Mật khẩu phải chứa ít nhất 8 ký tự.");
      return;
    }
    const fetchLogin = async () =>
    {
      const request = await fetch('http://localhost:5000/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      })
      const data = await request.json()
      if (request.ok)
      {
        localStorage.setItem('userInfo', JSON.stringify(data))
        if (data.isAdmin)
        {
          navigate('/dashboard')
        } else
        {
          navigate('/')
        }
      } else
      {
        setErrorMessage(data.message)
      }
    }
    fetchLogin()
  }
  return <div>
    <Navbar />
    <form className="form-login">
      <h1><b>Login</b></h1>
      <input type="email" placeholder="Email" onChange={handleEmail} value={email}></input>
      <input type="password" placeholder="Password" onChange={handlePassword} value={password}></input>
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>

  </div>
}
export default Login