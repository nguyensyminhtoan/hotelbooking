import Sidebar from "./sidebar"
import './new-hotel.css'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const NewHotel = () =>
{
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get('hotelId');

  const rooms = ['2 Bed Room', '1 Bed Room', 'Budget Twin Room', "Premier City View Room", "Superior basement room", "Basement Double Room", "Budget Double Room", "Deluxe Room", "Deluxe Window"]
  useEffect(() =>
  {

    const fetchHotel = async () =>
    {
      const request = await fetch(`https://hotelbooking-u13m.onrender.com/hotel-detail?hotelID=${hotelId}`)
      const dataHotel = await request.json()
      if (request.ok)
      {
        setImages(dataHotel.photos[0])
        setName(dataHotel.name)
        setCity(dataHotel.city)
        setDistance(dataHotel.distance)
        setDescription(dataHotel.desc)
        setType(dataHotel.type)
        setAddress(dataHotel.address)
        setTitle(dataHotel.title)
        setPrice(dataHotel.cheapestPrice)
        setFeatured(dataHotel.featured)
      }
    }
    if (hotelId)
    {
      fetchHotel()
    }
  }, [hotelId])


  const handleRoomSelect = (selectedRoom) =>
  {
    if (selectedRooms.includes(selectedRoom))
    {
      setSelectedRooms(selectedRooms.filter(room => room !== selectedRoom));
    } else
    {
      setSelectedRooms([...selectedRooms, selectedRoom]);
    }
  };
  const handleSubmit = (e) =>
  {
    e.preventDefault();

    // Kiểm tra xem các trường đã được điền đầy đủ hay không
    if (!name || !city || !distance || !description || !images || !type || !address || !title || !price)
    {
      setFormMessage("Please fill in all fields.");
      return;
    }
    setFormMessage("");
    if (hotelId)
    {
      const sendRequest = async () =>
      {
        const request = await fetch(`https://hotelbooking-u13m.onrender.com/edit-hotel?hotelId=${hotelId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            city: city,
            distance: distance,
            description: description,
            imageUrl: images,
            type: type,
            address: address,
            title: title,
            price: price,
            featured: featured,
            roomTitle: selectedRooms
          })
        })
        const res = await request.json()

        if (request.ok)
        {
          setFormMessage(res.message)
        } else
        {
          setFormMessage(res.error)
        }
      }
      sendRequest()
      return
    }
    const sendRequest = async () =>
    {
      const request = await fetch('https://hotelbooking-u13m.onrender.com/add-hotel', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          city: city,
          distance: distance,
          description: description,
          imageUrl: images,
          type: type,
          address: address,
          title: title,
          price: price,
          featured: featured,
          roomTitle: selectedRooms
        })
      })
      const res = await request.json()

      if (request.ok)
      {
        setFormMessage(res.message)
      } else
      {
        setFormMessage(res.error)
      }
    }
    sendRequest()


  };
  return <div className="new-hotel">
    <Sidebar></Sidebar>
    <div className="new-hotel_content">
      <h2>{hotelId ? 'Edit Hotel' : 'Add New Hotel'}</h2>
      <form className="new-hotel_form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-items">
            <label>Name</label>
            <input type="text" placeholder="My Hotel" value={name} onChange={(e) => setName(e.target.value)} required></input>
            <label>City</label>
            <input type="text" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} required></input>
            <label>Distance form City Center</label>
            <input type="Number" placeholder="500" value={distance} onChange={(e) => setDistance(e.target.value)} required></input>
            <label>Description</label>
            <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
            <label>Images</label>
            <input type="text" value={images} onChange={(e) => setImages(e.target.value)} required></input>
          </div>
          <div className="form-items">
            <label>Type</label>
            <input type="text" placeholder="hotel" value={type} onChange={(e) => setType(e.target.value)} required></input>
            <label>Address</label>
            <input type="text" placeholder="elton st. 216" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
            <label>Title</label>
            <input type="text" placeholder="The best Hotel" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
            <label>Price</label>
            <input type="text" placeholder="100" value={price} onChange={(e) => setPrice(e.target.value)} required></input>
            <label>Featured</label>
            <select value={featured} onChange={(e) => setFeatured(e.target.value === "false" ? false : true)} required>
              <option value="false" >No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>
        <label>Rooms</label>

        <ul className="rooms-list">
          {rooms.map((room, index) => (
            <li
              key={index}
              className={selectedRooms.includes(room) ? 'active' : ""}
              onClick={() =>
              {
                handleRoomSelect(room)

              }
              }>
              {room}
            </li>
          ))}
        </ul>
        <button type="submit">Send</button>
        {formMessage && <p className="form-error">{formMessage}</p>}
      </form>
    </div>
  </div >
}
export default NewHotel