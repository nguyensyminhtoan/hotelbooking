import styles from "./rooms.module.css"
import Sidebar from "./sidebar"

import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom'
const Rooms = () =>
{
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataRooms, setDataRooms] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const request = await fetch('https://hotelbooking-u13m.onrender.com/rooms')
      const data = await request.json()

      if (request.ok)
      {
        setDataRooms(data)
      }
    }
    fetchData()
  }, [])


  const handleSelectAll = () =>
  {
    setSelectAll(!selectAll);
    if (!selectAll)
    {
      const allIds = dataRooms.map((rooms, index) => index);
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
    const isConfirmed = window.confirm('Are you sure you want to delete this rooms?');

    // Nếu người dùng đồng ý xóa
    if (isConfirmed)
    {
      const sendRequest = async () =>
      {
        try
        {
          const request = await fetch('https://hotelbooking-u13m.onrender.com/delete-rooms', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
          });
          const response = await request.json();
          setMessage(response.message);
          if (request.ok)
          {
            // Sau khi xóa thành công, cập nhật lại danh sách phòng
            const updatedRooms = dataRooms.filter(room => room._id !== id);
            setDataRooms(updatedRooms);
          }
        } catch (error)
        {
          console.error(error);
        }
      };

      sendRequest();
    }
  }
  return <div className={styles.rooms}>
    <Sidebar />
    <div className={styles['rooms-content']}>
      <div className={styles['add-new']}>
        <p>Rooms List</p>
        <button onClick={() => { navigate('/dashboard/new-room') }}>Add New</button>
      </div>

      <div className={styles['rooms-table']}>
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
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataRooms.map((room, index) =>
            {
              return <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleSelectRow(index)}
                  />
                </td>
                <td>{room._id}</td>
                <td>{room.title}</td>
                <td>{room.desc}</td>
                <td>{room.price}</td>
                <td>{room.maxPeople}</td>
                <td ><p onClick={() => handleDelete(room._id)}>Delete</p><Link to={`/dashboard/new-room?roomsId=${room._id}`}>Edit</Link></td>
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
export default Rooms