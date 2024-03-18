import "./SearchList.css";

import { useSearch } from "../../searchContext/SearchContext"
import { useEffect, useState } from "react";
const SearchList = () =>
{
  const { searchData } = useSearch()
  const [data, setData] = useState([])


  useEffect(() =>
  {
    const sendData = async () =>
    {

      const request = await fetch('http://localhost:5000/search', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
      })
      const data = await request.json()

      if (request.ok)
      {
        setData(data)
      }
    }
    sendData()
  }, [searchData])


  return (data.length > 0 ?
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((item, index) => (
        <div key={index} className="card-searchlist">
          <img src={item.photos[0]} alt={item.title}></img>
          <div className="detail-searchlist">
            <h3 className="name-hotel">{item.name}</h3>
            <p>{item.distance}m from center</p>
            <p className="description">{item.type}</p>
            <p style={{ fontSize: "12px", }} className="desc">{item.desc}</p>

            {item.featured ? (
              <div>
                <p className="free_cancel">Free cancellation</p>
                <p className="free_cancel-detail">
                  you can cancel later, so lock in this great price today!
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="rate-searchlist">
            <div className="rate">
              <p style={{ fontWeight: "bold" }}>Rate</p>
              <p style={{ backgroundColor: "#003580", color: "#fff", width: "20px", paddingLeft: "12px" }}>
                {item.rating}
              </p>
            </div>
            <div className="price">
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                ${item.cheapestPrice}
              </p>
              <p style={{ fontSize: "10px" }}>Includes taxes and fees</p>
              <button className="button"><a href={`/detail/${item._id}`}>See availability</a></button>
            </div>
          </div>
        </div>
      ))
      }
    </div > : <h1>No hotels were found matching your search</h1>
  );
};
export default SearchList;
