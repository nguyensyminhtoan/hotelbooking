import "./Type.css";
import dataType from "../../../../data/type.json";
const Type = ({ data }) =>
{
  const propertyType = {}
  if (!data)
  {
    return <div>Loading...</div>;
  }
  ["Hotel", "Apartment", "Resort", "Villa", "Cabin"].forEach(type =>
  {
    propertyType[type] = {
      count: 0,
      image: ""
    }
  });

  data.forEach(item =>
  {
    const type = item.type.charAt(0).toUpperCase() + item.type.slice(1)

    if (propertyType[type])
    {
      propertyType[type].count++
    } else
    {
      propertyType[type] = { count: 1, image: '' }
    }
  })
  dataType.forEach((item) =>
  {
    const type = item.name;
    if (propertyType[type])
    {
      propertyType[type].image = item.image;
    }
  });


  return (
    <div>
      <h2 className="title">Browse by property type</h2>
      <div className="type">
        {Object.keys(propertyType).map((type, index) =>
        {
          return (
            <div key={index} className="card-type">
              <img src={propertyType[type].image} alt={type} />
              <h3>{type}</h3>
              <p>{propertyType[type].count} {type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Type;
