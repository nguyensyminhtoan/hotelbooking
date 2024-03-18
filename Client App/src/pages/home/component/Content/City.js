
import "./City.css";

const City = ({ data }) =>
{
  const cityImagePaths = {
    "Ha Noi": "./CityImage/Ha%20Noi.jpg",
    "Da Nang": "./CityImage/Da%20Nang.jpg",
    "Ho Chi Minh": "./CityImage/HCM.jpg"
  };
  const cityCounts = {}
  if (!data)
  {
    return <div>Loading...</div>;
  }
  // Khởi tạo cityCounts với số lượng khách sạn của mỗi thành phố là 0
  ["Ha Noi", "Da Nang", "Ho Chi Minh"].forEach(city =>
  {
    cityCounts[city] = 0;
  });
  data.forEach((item) =>
  {
    const city = item.city;
    if (cityCounts[city])
    {
      cityCounts[city]++;
    } else
    {
      cityCounts[city] = 1;
    }

  });


  return (
    <div className="city">
      {Object.keys(cityCounts).map((city, index) =>
      { // Lấy số lượng khách sạn cho thành phố hiện tại
        const hotelCount = cityCounts[city];

        return (
          <div
            key={index}
            className="card-city"
            style={{ backgroundImage: `url(${cityImagePaths[city]})` }}
          >
            <h3>{hotelCount} properties</h3>
            <h2>{city}</h2>
          </div>
        );
      })}
    </div>
  );
};
export default City;
