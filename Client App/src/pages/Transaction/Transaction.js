import FormSignup from '../home/component/Content/FormSignup'
import Footer from '../home/component/Footer/Footer'
import NavBar from '../home/component/NavBar/NavBar'

import TransactionContent from './TransactionContent'
const Transaction = ({ isLogin, email }) =>
{
  return <div>
    <NavBar isLogin={isLogin} email={email}></NavBar>
    <TransactionContent email={email}></TransactionContent>
    <FormSignup></FormSignup>
    <Footer></Footer>
  </div>
}
export default Transaction