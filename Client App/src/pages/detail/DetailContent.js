import "./DetailContent.css";
// import dataDetail from "../../data/detail.json";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const DetailContent = ({ handleBookNow }) =>
{
  const [data, setData] = useState({})

  let { hotelID } = useParams()


  useEffect(() =>
  {
    const fetchHotel = async () =>
    {
      const request = await fetch(`http://localhost:5000/hotel-detail?hotelID=${hotelID}`)
      const data = await request.json()
      if (request.ok)
      {
        setData(data)
      }

    }
    fetchHotel()

  }, [hotelID])
  const handleBook = (e) =>
  {
    e.preventDefault()
    handleBookNow(data)
  }
  return (
    <div className="detail-content">
      <div className="detail-title">
        <h2>{data.name}</h2>
        <span>
          <i className="fa-solid fa-location-dot"></i> {data.address}
        </span>
        <p style={{ color: "blue" }}>{data.distance}m from center</p>
        <p style={{ color: "green" }}>Book a stay over ${data.cheapestPrice} at this property</p>
      </div>
      <button
        style={{ position: "absolute", top: "0%", right: "3%", height: "40px" }}
        className="button"
        onClick={handleBook}
      >
        Reserve or Book Now!
      </button>
      <div className="img-detail">
        {data.photos ? data.photos.map((item, index) => (
          <img key={index} src={item} alt={item}></img>
        )) : <p>Loading...</p>}
      </div>
      <div className="detail-apartments">
        <div style={{ width: "75%" }}>
          <h2>{data.title}</h2>
          <p style={{ fontSize: "12px", lineHeight: "18px" }}>
            {data.desc}
          </p>
        </div>
        <div className="nine-night" >
          <p style={{ fontWeight: "bold", color: "#625e6d" }}>
            Perfect for a 9-night stay!
          </p>
          <p>This property has an excellent location score of {data.rating}!</p>
          <div>
            <span style={{ fontWeight: "bold" }}>
              ${data.cheapestPrice * 9}
            </span>
            <span>(9 nights)</span>
          </div>
          <button className="button" onClick={handleBook}>Reserve or Book Now!</button>
        </div>
      </div>
    </div>
  );
};
export default DetailContent;
