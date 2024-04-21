import
{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login";
import Dashboard from "./pages/admin dashboard/dashboard";
import Hotels from "./pages/admin dashboard/hotel";
import NewHotel from "./pages/admin dashboard/new-hotel";
import Rooms from "./pages/admin dashboard/rooms";
import Newroom from "./pages/admin dashboard/new-room";
import Transaction from "./pages/admin dashboard/transaction";



function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/hotels" element={<Hotels />} />
        <Route path="/dashboard/new-hotel" element={<NewHotel />} />
        <Route path="/dashboard/rooms" element={<Rooms />} />
        <Route path="/dashboard/new-room" element={<Newroom />} />
        <Route path="/dashboard/transactions" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
