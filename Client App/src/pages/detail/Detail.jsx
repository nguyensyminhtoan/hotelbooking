import NavBar from "../home/component/NavBar/NavBar";
import Footer from "../home/component/Footer/Footer";

import DetailContent from "./DetailContent";
import FormSignup from "../home/component/Content/FormSignup";
import FormBooking from "./FormBooking";
import { useState } from "react";
const Detail = ({ isLogin, dataUser }) =>
{
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedHotels, setSelectedHotels] = useState({});
  const handleBookNow = (hotel) =>
  {
    setIsFormOpen(true);
    setSelectedHotels(hotel)
  };
  return (
    <div>
      <NavBar isLogin={isLogin} email={dataUser.email}></NavBar>
      <DetailContent handleBookNow={handleBookNow} ></DetailContent>
      {isFormOpen ? <FormBooking dataUser={dataUser} isFormOpen={isFormOpen} dataHotels={selectedHotels}></FormBooking> : ''}
      <FormSignup></FormSignup>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
