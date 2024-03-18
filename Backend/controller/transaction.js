
const Transaction = require('../models/transaction')
const mongoose = require('mongoose');
const User = require('../models/user');


exports.postTransaction = async (req, res) =>
{
  try
  {
    const transactionData = req.body;
    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (error)
  {
    console.error('Error saving transaction:', error);
    res.status(500).json({
      message: 'You need to login first'
    });
  }
};
exports.postTransactionInformation = async (req, res) =>
{
  const userEmail = req.body.email
  const user = await User.findOne({ email: userEmail })
  if (!user)
  {
    return res.status(404).json({
      message: "You need to login first"
    })
  }
  const userId = user._id;
  Transaction.find({ user: userId })
    .populate('hotel')
    .then(transaction => res.status(200).json(transaction))
    .catch(err => console.log(err))
}
exports.getAdminTransaction = async (req, res) =>
{
  try
  {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate('hotel')
      .populate('user')
    const response = transactions.map(transaction => ({
      id: transaction._id,
      user: transaction.user.username,
      hotel: transaction.hotel.name,
      room: transaction.room,
      date: `${formatDate(transaction.dateStart)} - ${formatDate(transaction.dateEnd)}`,
      price: transaction.price,
      payment: transaction.payment,
      status: transaction.status,
    }));

    res.status(200).json(response);
  } catch (error)
  {
    console.error('Error retrieving transactions:', error);

  }
};

function formatDate(dateString)
{
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
exports.getAllInformation = async (req, res) =>
{
  try
  {
    const countUsers = await User.find().then(result => result.length)
    const countOrders = await Transaction.find().then(result => result.length)
    const allTransaction = await Transaction.find()
    const totalEarnings = allTransaction.reduce((total, transaction) => total + transaction.price, 0
    )
    res.status(200).json({
      countUsers: countUsers,
      countOrders: countOrders,
      totalEarnings: totalEarnings
    })
  } catch { res.status(200).json({ message: "Internal server error" }) }
}