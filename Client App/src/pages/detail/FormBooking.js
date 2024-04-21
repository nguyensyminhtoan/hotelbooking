import { useState } from 'react';
import './FormBooking.css'
import { DateRange } from 'react-date-range'
import { useNavigate } from 'react-router-dom';
const FormBooking = ({ dataUser, dataHotels }) =>
{
  const navigate = useNavigate()
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [datesSelected, setDatesSelected] = useState(false);
  const [email, setEmail] = useState(dataUser.email || '')
  const [fullName, setFullName] = useState(dataUser.fullName || '')
  const [phoneNumber, setPhoneNumber] = useState(dataUser.phoneNumber || '')
  const [cardNumber, setCardNumber] = useState(dataUser.cardNumber || '')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [err, setErr] = useState(false)
  const dataRooms = dataHotels.rooms
  // Hàm xử lý sự kiện khi checkbox được thay đổi

  const handleCheckboxChange = (event) =>
  {
    const roomNumber = Number(event.target.value);

    const updatedSelectedRooms = [...selectedRooms];

    if (event.target.checked)
    {

      updatedSelectedRooms.push(roomNumber);
    } else
    {

      const index = updatedSelectedRooms.indexOf(roomNumber);
      if (index !== -1)
      {
        updatedSelectedRooms.splice(index, 1);
      }
    }

    setSelectedRooms(updatedSelectedRooms);

  };
  const handlePaymentMethodChange = (event) =>
  {
    setPaymentMethod(event.target.value);
  };
  const handleSelect = (ranges) =>
  {
    // Tính lại số ngày khi người dùng thay đổi phạm vi ngày
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const days = Math.round((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
    setNumberOfDays(days + 1);
    setSelectedDateRange(ranges.selection);
    setDatesSelected(true)
  };

  const sendDataBooking = async () =>
  {
    const selectedRoomsIds = [];

    // Lặp qua selectedRooms và tìm id của các phòng đã chọn
    selectedRooms.forEach((selectedRoom) =>
    {
      const foundRoom = dataRooms.find((room) => room.roomNumbers.includes(selectedRoom));
      if (foundRoom)
      {
        selectedRoomsIds.push(foundRoom._id);
      }
    });
    if (selectedRoomsIds.length === 0)
    {
      setErr({ message: "Please select the room you want!" })
      return
    }
    const request = await fetch('https://hotelbooking-u13m.onrender.com/transaction', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user: dataUser._id,
        hotel: dataHotels._id,
        room: selectedRooms,
        roomsId: selectedRoomsIds,
        dateStart: selectedDateRange.startDate,
        dateEnd: selectedDateRange.endDate,
        price: dataHotels.cheapestPrice * selectedRooms.length * numberOfDays,
        payment: paymentMethod,
        status: 'Booked'
      })
    })

    const response = await request.json()
    if (request.ok)
    {
      setErr(false)
      navigate('/transaction')
    } else
    {
      setErr(response)
    }
  }
  const validateForm = () =>
  {
    if (
      fullName === '' ||
      email === '' ||
      phoneNumber === '' ||
      cardNumber === '' ||
      paymentMethod === ''
    )
    {
      return false; // Trả về false nếu có ít nhất một trường chưa được điền
    }
    return true; // Trả về true nếu tất cả các trường đều đã được điền
  };
  const handleReserve = (e) =>
  {
    e.preventDefault()
    if (!datesSelected)
    {
      setErr({ message: "Please select check-in and check-out dates!" });
      return;
    }
    if (!validateForm())
    {
      setErr({ message: "Please fill in all required fields!" });
      return;
    }

    sendDataBooking()
  }
  const handleFullName = (e) => { setFullName(e.target.value) }
  const handleEmail = (e) => { setEmail(e.target.value) }
  const handlePhoneNumber = (e) => { setPhoneNumber(e.target.value) }
  const handleCardNumber = (e) => { setCardNumber(e.target.value) }


  return <div className='form-booking'>
    <div className='form-user'>
      <div>
        <h3>Dates</h3>
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          className="date"
          minDate={new Date()}
          onChange={handleSelect}
          ranges={[selectedDateRange]}
        />
      </div>
      <div className='user-info'>
        <h3>Reserve Info</h3>
        <label>Your Full Name:</label>
        <input type='text' placeholder='Full Name' onChange={handleFullName} value={fullName}></input>
        <label>Your Email:</label>
        <input type='email' placeholder='Email' onChange={handleEmail} value={email}></input>
        <label>Your Phone Number:</label>
        <input type='Number' placeholder='Phone Number' onChange={handlePhoneNumber} value={phoneNumber}></input>
        <label >Your Identity Card Number</label>
        <input type='Number' placeholder='Card Number' onChange={handleCardNumber} value={cardNumber}></input>
      </div>
    </div>
    <div>
      <h3>Select Rooms</h3>
      <div className='rooms'>
        {dataRooms.map((room, index) =>
        {
          return <div key={index} className='rooms-item'>
            <div>
              <h4>{room.title}</h4>
              <p>{room.desc}</p>
              <p>Max people: <b>{room.maxPeople}</b></p>
              <p><b>${dataHotels.cheapestPrice}</b></p>
            </div>
            <div className='rooms-number'>
              {room.roomNumbers.map((roomNumber, index) =>
              {
                return <div key={index}>
                  <label htmlFor={roomNumber}>{roomNumber}</label>
                  <input id={roomNumber}
                    type='checkbox'
                    value={roomNumber}
                    onChange={handleCheckboxChange}>
                  </input>
                </div>
              })}
            </div>
          </div>
        })}
      </div>
      <div className='bill'>
        <h3>Total Bill: ${dataHotels.cheapestPrice * selectedRooms.length * numberOfDays}</h3>
        <div className='payment'>
          <select defaultValue='Select Payment Method' onChange={handlePaymentMethodChange}>
            <option value='Select Payment Method' disabled>Select Payment Method</option>
            <option value='cash'>Cash</option>
            <option value='card'>Card</option>
            <option value='credit card'>Credit Card</option>
          </select>
          <button className='button' onClick={handleReserve}>Reserve Now</button>
          {err ? <p style={{ color: 'red' }}>{err.message}</p> : ''}
        </div>

      </div>
    </div>
  </div>
}
export default FormBooking