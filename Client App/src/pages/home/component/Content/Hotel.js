import "./Hotel.css";

const Hotel = ({ data }) =>
{
  if (!data)
  {
    return <div>Loading...</div>;
  }
  const sortedHotels = data.sort((a, b) => b.rating - a.rating)
  const top3Hotels = sortedHotels.slice(0, 3)


  return (
    <div>
      <h2 className="title">Homes guests love</h2>
      <div className="hotel">
        {top3Hotels.map((hotel, index) =>
        {
          return (
            <div key={index} className="card-hotel">
              <img src={hotel.photos[0]} alt={hotel.title}></img>
              <a href={`/detail/${hotel._id}`}>{hotel.name}</a>
              <p>{hotel.city}</p>
              <h3>Starting from ${hotel.cheapestPrice}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hotel;
