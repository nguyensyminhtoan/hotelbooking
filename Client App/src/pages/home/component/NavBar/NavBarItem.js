import "./NavBarItem.css";
import { Link } from 'react-router-dom'
const NavBarItem = ({ isLogin, email }) =>
{
  const handleLogout = () =>
  {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('userInfo');
    // Tải lại trang để cập nhật giao diện sau khi logout
    window.location.href = '/'
  };

  return (
    <div className="navbar-item">
      <h1>Booking Website</h1>
      <div className="buttons">
        {isLogin ? <p>{email}</p> : ''}
        {isLogin ? (
          <>
            <Link to='/transaction'>
              <button>Transaction</button>
            </Link>
            <Link to='/'>
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </>
        ) : (
          <>
            <Link to='/auth?mode=signup'>
              <button>Sign Up</button>
            </Link>
            <Link to='/auth?mode=signin'>
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBarItem;
