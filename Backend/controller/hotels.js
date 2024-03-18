const mongoose = require('mongoose')
const Hotels = require('../models/hotels')
const Rooms = require('../models/rooms')
const Transaction = require('../models/transaction')
exports.getHotels = (req, res) =>
{
  Hotels.find()
    .then(hotels =>
    {
      return res.json(hotels)
    })
    .catch(err => console.log(err))
}
exports.postSearchHotels = (req, res) =>
{
  const location = req.body.location;
  const adults = Number(req.body.adults);
  const children = Number(req.body.children);
  const roomsNeeded = req.body.rooms;
  // tìm kiếm các hotels phù hợp trong db
  if (location !== '')
  {
    Hotels.find({ city: location })
      .populate('rooms')
      .then((hotels) =>
      {
        // Lọc phòng theo số lượng người và số phòng cần
        const filteredHotels = hotels.filter(hotel =>
        {
          const rooms = hotel.rooms;
          const filteredRooms = rooms.filter(room =>
            room.maxPeople * room.roomNumbers.length >= (children + adults) && room.roomNumbers.length >= roomsNeeded

          );

          return filteredRooms.length > 0
        });

        res.json(filteredHotels);
      })
      .catch(err => console.error(err));
  } else
  {
    Hotels.find()
      .populate('rooms')
      .then((hotels) =>
      {
        // Lọc phòng theo số lượng người và số phòng cần
        const filteredHotels = hotels.filter(hotel =>
        {
          const rooms = hotel.rooms;
          const filteredRooms = rooms.filter(room =>
            room.maxPeople * room.roomNumbers.length >= (children + adults) && room.roomNumbers.length >= roomsNeeded

          );

          return filteredRooms.length > 0
        });

        res.json(filteredHotels);
      })
      .catch(err => console.error(err));
  }
}
exports.getHotelDetail = (req, res) =>
{
  const hotelID = new mongoose.Types.ObjectId(req.query.hotelID)
  Hotels.findOne(hotelID)
    .populate('rooms')
    .then(hotel =>
    {
      res.json(hotel)
    })
    .catch(err => console.log(err))
}
exports.postDeleteHotel = (req, res) =>
{
  const hotelId = req.body.id
  // Kiểm tra xem có giao dịch nào sử dụng khách sạn này không
  Transaction.findOne({ hotel: hotelId })
    .then(transaction =>
    {
      if (transaction)
      {
        // Nếu có giao dịch sử dụng khách sạn này, trả về thông báo lỗi
        return res.status(400).json({ message: 'Hotel is associated with a transaction. Cannot delete.' });
      } else
      {
        // Nếu không có giao dịch nào sử dụng khách sạn này, tiến hành xóa
        Hotels.findByIdAndDelete(hotelId)
          .then(deletedHotel =>
          {
            res.json({ message: 'Hotel deleted successfully' });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));

}
exports.postAddHotel = async (req, res) =>
{
  const { name, city, distance, description, imageUrl, type, address, title, price, featured, roomTitle } = req.body;
  const rooms = await Rooms.find({ title: { $in: roomTitle } })
  const roomIds = rooms.map(room => room._id)
  const newHotel = new Hotels({
    name: name,
    city: city,
    distance: distance,
    desc: description,
    photos: [imageUrl],
    type: type,
    address: address,
    title: title,
    cheapestPrice: Number(price),
    featured: featured,
    rooms: roomIds
  });

  newHotel.save()
    .then(result =>
    {

      res.status(200).json({ message: 'Hotel added successfully!' })
    })
    .catch(err =>
    {
      console.log(err)
      res.status(500).json({ error: err.message });
    });

}
exports.postEditHotel = async (req, res) =>
{
  try
  {
    const hotelId = new mongoose.Types.ObjectId(req.query.hotelId)
    const { name, city, distance, description, imageUrl, type, address, title, price, featured, roomTitle } = req.body;
    const rooms = await Rooms.find({ title: { $in: roomTitle } })
    const roomIds = rooms.map(room => room._id)
    const updateHotel = {
      name: name,
      city: city,
      distance: distance,
      desc: description,
      photos: [imageUrl],
      type: type,
      address: address,
      title: title,
      cheapestPrice: Number(price),
      featured: featured,
      rooms: roomIds
    }
    const hotel = await Hotels.findByIdAndUpdate(hotelId, updateHotel, { new: true })
    res.status(200).json({ message: 'Hotel updated successfully' })
  }
  catch (err)
  {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}