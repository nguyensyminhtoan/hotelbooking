import { useState, useEffect } from 'react'
import './TransactionContent.css'
import { format, parseISO } from 'date-fns';
const TransactionContent = ({ email }) =>
{
  const [dataTransaction, setDataTransaction] = useState([])
  const [error, setError] = useState(false)

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const request = await fetch('http://localhost:5000/your-transaction', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email })
      })
      const data = await request.json()

      if (request.ok)
      {
        setDataTransaction(data)
      } else { setError(data.message) }
    }
    fetchData();
  }, [email]);
  if (dataTransaction.length === 0)
  {
    return <div>Loading...</div>;
  }
  return <div className='transaction'>
    <h2>Your Transaction</h2>
    <table className="transaction-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Hotel</th>
          <th>Room</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {dataTransaction.map((transaction, index) =>
        {
          return <tr key={index}>
            <td>{index + 1}</td>
            <td>{transaction.hotel.name}</td>
            <td>{transaction.room.join(', ')}</td>
            <td> {format(parseISO(transaction.dateStart), 'dd/MM/yyyy')} -{' '}
              {format(parseISO(transaction.dateEnd), 'dd/MM/yyyy')}</td>
            <td>{transaction.price}</td>
            <td>{transaction.payment}</td>
            <td><p>{transaction.status}</p></td>
          </tr>
        })}
      </tbody>
    </table>
    {error ? <p>{error.message}</p> : ''}
  </div>
}
export default TransactionContent