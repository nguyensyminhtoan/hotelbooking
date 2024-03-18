import Sidebar from "./sidebar"
import './new-room.css'
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
const Newroom = () =>
{
  const [rooms, setRooms] = useState('');
  const [description, setDescription] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [hotel, setHotel] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [selectedHotel, setSelectedHotel] = useState('')
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const roomsId = searchParams.get('roomsId')

  useEffect(() =>
  {
    const fetchHotel = async () =>
    {
      const request = await fetch('http://localhost:5000/hotel')
      const hotel = await request.json()
      setHotel(hotel.map(hotel => hotel.name))

    }
    const fetchRoomsDetail = async () =>
    {
      const request = await fetch(`http://localhost:5000/rooms-detail?roomsId=${roomsId}`)
      const roomsDetail = await request.json()
      setRooms(roomsDetail.roomNumbers.join(', '))
      setDescription(roomsDetail.desc)
      setMaxPeople(roomsDetail.maxPeople)
      setTitle(roomsDetail.title)
      setPrice(roomsDetail.price)
    }
    if (roomsId)
    {
      fetchRoomsDetail()
    }

    fetchHotel()
  }, [])
  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map(room => room.trim())
    // Kiểm tra xem các trường đã được điền đầy đủ hay không
    if (!description || !maxPeople || !title || !price || !rooms)
    {
      setFormMessage("Please fill in all fields.");
      return;
    }

    setFormMessage("");
    if (roomsId)
    {
      const sendRequest = async () =>
      {
        const request = await fetch(`http://localhost:5000/edit-room?roomsId=${roomsId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            desc: description,
            maxPeople: maxPeople,
            price: price,
            roomNumbers: roomNumbers,
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
      const request = await fetch('http://localhost:5000/add-room', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          desc: description,
          maxPeople: maxPeople,
          price: price,
          roomNumbers: roomNumbers,
          hotel: selectedHotel

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
  return <div className="new-room">
    <Sidebar></Sidebar>
    <div className="new-room_content">
      <h2>{roomsId ? 'Edit Rooms' : 'Add New Room'}</h2>
      <form className="new-room_form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-items">
            <label>Title</label>
            <input type="text" placeholder="The best room" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
            <label>Price</label>
            <input type="text" placeholder="100" value={price} onChange={(e) => setPrice(e.target.value)} required></input>
          </div>
          <div className="form-items">
            <label>Description</label>
            <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
            <label>Max People</label>
            <input type="Number" placeholder="2" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} required></input>
          </div>
        </div>
        <div className="rooms">
          <div>
            <p>Rooms</p>
            <textarea value={rooms} onChange={(e) => setRooms(e.target.value)} type="text" placeholder="give comma between room numbers."></textarea>
          </div>
          {!roomsId ? <div>
            <p>Choose a hotel</p>
            <select value={selectedHotel} onChange={(e) => setSelectedHotel(e.target.value)} required>
              <option value="">Select Hotel</option>
              {hotel ? hotel.map((hotelName, index) =>
              {
                return <option key={index} value={hotelName}>{hotelName}</option>
              }) : ''}

            </select>
          </div> : ''}
          <button type="submit">Send</button>
        </div>
        {formMessage && <p className="form-error">{formMessage}</p>}
      </form>
    </div>
  </div >
}
export default Newroom