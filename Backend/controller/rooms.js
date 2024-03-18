const Rooms = require('../models/rooms')
const Transaction = require('../models/transaction')
const Hotels = require('../models/hotels')
const mongoose = require('mongoose');
exports.getRooms = (req, res) =>
{
  Rooms.find()
    .then((rooms) =>
    {
      res.status(200).json(rooms)
    })
    .catch((err) => console.log(err))
}
exports.postDeleteRooms = (req, res) =>
{
  const roomId = new mongoose.Types.ObjectId(req.body.id)
  // Kiểm tra xem có giao dịch nào sử dụng phòng này không
  Transaction.findOne({ roomsId: { $in: [roomId] } })
    .then(transaction =>
    {
      if (transaction)
      {
        // Nếu có giao dịch sử dụng phòng này, trả về thông báo lỗi
        return res.status(400).json({ message: 'rooms is associated with a transaction. Cannot delete.' });
      } else
      {
        // Nếu không có giao dịch nào sử dụng phòng này, tiến hành xóa
        Hotels.updateMany({ rooms: req.body.id }, { $pull: { rooms: req.body.id } })
          .then(() =>
          {
            // 2. Tiến hành xóa roomId từ bảng Rooms
            return Rooms.findByIdAndDelete(roomId);
          })
          .then(result =>
          {
            res.json({ message: 'Rooms deleted successfully' });
          })
          .catch(err =>
          {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while deleting rooms' });
          });
      }
    })
    .catch(err => console.log(err));

}
exports.postAddRooms = async (req, res) =>
{
  const { title, desc, maxPeople, price, roomNumbers, hotel } = req.body
  try
  {
    const foundHotel = await Hotels.findOne({ name: hotel })
    const newRooms = new Rooms({
      title: title,
      desc: desc,
      maxPeople: maxPeople,
      price: price,
      roomNumbers: Number(roomNumbers),
    })
    newRooms.save()
      .then(rooms =>
      {
        foundHotel.rooms.push(rooms._id)
        foundHotel.save()
        res.status(200).json({ message: "Rooms added successfully" })
      })
  }
  catch (error)
  {
    console.error(error)
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.getRoomsDetail = (req, res) =>
{
  const roomsId = new mongoose.Types.ObjectId(req.query.roomsId)
  Rooms.findOne(roomsId)
    .then(result => res.status(200).json(result))
    .catch(err =>
    {
      res.status(500).json({ error: 'Internal server error' })
      console.log(err)
    })
}
exports.postEditRooms = (req, res) =>
{
  const roomsId = new mongoose.Types.ObjectId(req.query.roomsId)
  const updateRooms = req.body
  Rooms.findByIdAndUpdate(roomsId, updateRooms, { new: true })
    .then(result => res.status(200).json({ message: "Rooms edited successfully" }))
    .catch(err =>
    {
      console.log(err)
      res.status(500).json({ error: 'Internal server error' })
    })
}