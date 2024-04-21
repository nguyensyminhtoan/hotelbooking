import Sidebar from "./sidebar"
import styles from "./transaction.module.css"
import { useState } from "react";
import { useEffect } from "react";
const Transaction = () =>
{
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  let transactionPerPage = 9;
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const requestTransaction = await fetch('https://hotelbooking-u13m.onrender.com/dashboard')
      const dataTransaction = await requestTransaction.json()


      if (requestTransaction.ok)
      {
        setDataTransaction(dataTransaction);
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

  // Calculate current records
  const indexOfLastTransaction = currentPage * transactionPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;

  const currentTransaction = dataTransaction.slice(indexOfFirstTransaction, indexOfLastTransaction);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return <div className={styles.transaction}>
    <Sidebar />
    <div className={styles['transaction-content']}>
      <p>Transaction List</p>
      <div className={styles['transaction-table']}>
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
            {currentTransaction.map((transaction, index) =>
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
      <div className={styles["page-nav"]}>
        <p>{indexOfFirstTransaction + 1} - {Math.min(indexOfLastTransaction, dataTransaction.length)} of {dataTransaction.length}</p>

        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastTransaction >= dataTransaction.length}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg></button>
      </div>
    </div>
  </div >


}
export default Transaction