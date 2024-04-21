import { useState } from "react";

import NavBar from "../home/component/NavBar/NavBar";
import './AuthPage.css'
import { useLocation, useNavigate } from "react-router-dom";
const AuthPage = ({ onLoginSuccess }) =>
{
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const mode = searchParams.get('mode')
  const navigate = useNavigate()

  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [isSubmitDisabled, setSubmitDisabled] = useState(true)
  const [isEmailValid, setEmailValid] = useState(false)
  const [isPasswordValid, setPasswordValid] = useState(false)
  const [response, setResponse] = useState('')

  const sendRequest = async (mode) =>
  {    // Nếu email và mật khẩu không hợp lệ, không gửi yêu cầu
    if (!isEmailValid || !isPasswordValid)
    {
      console.error('Invalid email or password');
      return;
    }


    const url = mode === 'signup' ? 'https://hotelbooking-u13m.onrender.com/create-user' : 'https://hotelbooking-u13m.onrender.com/login';

    const request = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword })
    })

    const res = await request.json()
    setResponse(res)

    if (request.ok)
    {
      if (mode === 'signup')
      {

        navigate('/auth?mode=signin')
      } else
      {
        localStorage.setItem('userInfo', JSON.stringify({ email: enteredEmail, password: enteredPassword }));
        onLoginSuccess()
        navigate('/')

      }
    }

  }
  const handlEmail = (e) =>
  {
    setEnteredEmail(e.target.value)
    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(e.target.value));
    setSubmitDisabled(!isEmailValid || !isPasswordValid)
  }
  const handlPassword = (e) =>
  {
    setEnteredPassword(e.target.value)
    // Kiểm tra mật khẩu có ít nhất 8 ký tự
    setPasswordValid(e.target.value.length >= 8);
    setSubmitDisabled(!isEmailValid || !isPasswordValid)
  }
  const handlSubmit = (e) =>
  {
    e.preventDefault()
    sendRequest(mode)
  }

  return <div>
    <NavBar ></NavBar>
    <div className="login">
      <h1>{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
      <form className="form-auth">
        <input placeholder="email" type="email" onChange={handlEmail} ></input>
        <input placeholder="password" type="password" onChange={handlPassword} ></input>
        <button onClick={handlSubmit} disabled={isSubmitDisabled}>{mode === 'signup' ? 'Create Account' : 'Login'}</button>
        <p style={{ color: 'red' }}>{response.message}</p>
      </form>

    </div>
  </div>
}
export default AuthPage