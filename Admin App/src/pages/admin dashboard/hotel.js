import styles from "./hotel.module.css"
import Sidebar from "./sidebar"

import { useState, useEffect } from "react";
import { Link, useNavigate, } from 'react-router-dom'
const Hotels = () =>
{
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataHotels, setDataHotels] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const request = await fetch('http://localhost:5000/hotel')
      const data = await request.json()

      if (request.ok)
      {
        setDataHotels(data)
      }
    }
    fetchData()
  }, [])


  const handleSelectAll = () =>
  {
    setSelectAll(!selectAll);
    if (!selectAll)
    {
      const allIds = dataHotels.map((hotel, index) => index);
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
  const handleDelete = (id) =>
  {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm('Are you sure you want to delete this hotel?');

    // Nếu người dùng đồng ý xóa
    if (isConfirmed)
    {
      const sendRequest = async () =>
      {
        try
        {
          const request = await fetch('http://localhost:5000/delete-hotel', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
          });
          const response = await request.json();
          setMessage(response.message);
          if (request.ok)
          {
            // Sau khi xóa thành công, cập nhật lại danh sách khách sạn
            const updatedHotels = dataHotels.filter(hotel => hotel._id !== id);
            setDataHotels(updatedHotels);
          }
        } catch (error)
        {
          console.error(error);
        }
      };

      sendRequest();
    }
  }
  return <div className={styles.hotel}>
    <Sidebar />
    <div className={styles['hotel-content']}>
      <div className={styles['add-new']}>
        <p>Lastest Transaction</p>
        <button onClick={() => { navigate('/dashboard/new-hotel') }}>Add New</button>
      </div>

      <div className={styles['hotel-table']}>
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
              <th>Name</th>
              <th>Type</th>
              <th>Title</th>
              <th>City</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {dataHotels.map((hotel, index) =>
            {
              return <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleSelectRow(index)}
                  />
                </td>
                <td>{hotel._id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.type}</td>
                <td>{hotel.title}</td>
                <td>{hotel.city}</td>
                <td ><p onClick={() => handleDelete(hotel._id)}>Delete</p><Link to={`/dashboard/new-hotel?hotelId=${hotel._id}`}>Edit</Link></td>
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
        {message ? <h3 style={{ color: "red" }}>{message}</h3> : ""}
      </div>
    </div>
  </div>


}
export default Hotels