import Sidebar from "./sidebar"
import styles from "./dashboard.module.css"
import { useState } from "react";
import { useEffect } from "react";
const Dashboard = () =>
{
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([])
  const [allInformation, setAllInformation] = useState({})
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const requestTransaction = await fetch('https://hotelbooking-u13m.onrender.com/dashboard')
      const dataTransaction = await requestTransaction.json()
      const requestAllInformation = await fetch('https://hotelbooking-u13m.onrender.com/all')
      const response = await requestAllInformation.json()
      if (requestTransaction.ok)
      {
        setDataTransaction(dataTransaction.slice(0, 8));
      }
      if (requestAllInformation.ok)
      {
        setAllInformation(response)
      }
    }
    fetchData()
  }, [])


  const handleSelectAll = () =>
  {
    setSelectAll(!selectAll);
    if (!selectAll)
    {
      const allIds = dataTransaction.map((transaction, index) => index);
      setSelectedRows(allIds);
    } else
    {
      setSelectedRows([]);
    }
  };
  const handleSelectRow = (id) =>
  {
    if (selectedRows.includes(id))
    {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else
    {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return <div className={styles.dashboard}>
    <Sidebar />
    <div style={{ width: "100%" }} >
      <div className={styles['basic-information']}>
        <div className={`${styles['count-users']} ${styles.count}`}>
          <p>USER</p>
          <p>{allInformation.countUsers}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
        </div>
        <div className={`${styles['count-orders']} ${styles.count}`}>
          <p>ORDERS</p>
          <p>{allInformation.countOrders}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
        </div>
        <div className={`${styles['count-earnings']} ${styles.count}`}>
          <p>EARNINGS</p>
          <p>{allInformation.totalEarnings}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" /></svg>
        </div>
        <div className={`${styles['count-balance']} ${styles.count}`}>
          <p>BALANCE</p>
          <p>{allInformation.totalEarnings}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
        </div>
      </div>
      <div className={styles['dashboard-content']}>
        <p>Lastest Transaction</p>
        <div className={styles['dashboard-table']}>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataTransaction.map((transaction, index) =>
              {
                return <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </td>
                  <td>{transaction.id}</td>
                  <td>{transaction.user}</td>
                  <td>{transaction.hotel}</td>
                  <td>{transaction.room.join(', ')}</td>
                  <td>{transaction.date}</td>
                  <td>${transaction.price}</td>
                  <td>{transaction.payment}</td>
                  <td><p>{transaction.status}</p></td>
                </tr>
              })}

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

}
export default Dashboard