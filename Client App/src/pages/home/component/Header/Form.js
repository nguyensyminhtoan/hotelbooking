
import "./Form.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../../searchContext/SearchContext";
const Form = () =>
{
  const navigate = useNavigate()
  const { searchData, updateSearchData } = useSearch();

  const [isDateRangeVisible, setDateRangeVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("")
  const handleLocationChange = (e) =>
  {
    setSelectedLocation(e.target.value)
  }
  // Hàm này sẽ được gọi khi người dùng thay đổi phạm vi ngày tháng
  const handleSelect = (ranges) =>
  {
    setSelectedDateRange(ranges.selection);
    // Nếu ngày kết thúc đã được chọn, đóng modal
    if (ranges.selection.endDate)
    {
      setDateRangeVisible(false);
    }

  };
  const handleAdultsChange = (e) =>
  {
    setAdults(e.target.value);
  };

  const handleChildrenChange = (e) =>
  {
    setChildren(e.target.value);
  };

  const handleRoomsChange = (e) =>
  {
    setRooms(e.target.value);
  };
  const handleSearch = (e) =>
  {
    e.preventDefault();
    updateSearchData({
      location: selectedLocation,
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
      adults: adults,
      children: children,
      rooms: rooms,
    });

    navigate("/search");
  };

  return (
    <form className="search-form">
      <i
        className="fa fa-bed"
        style={{ color: "#d6d6d6", marginRight: "5px" }}
      />
      <select value={selectedLocation} onChange={handleLocationChange}>
        <option value="">Where are you going?</option>
        <option value="Ha Noi">Ha Noi</option>
        <option value="Da Nang">Da Nang</option>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
      </select>
      <label>
        <i
          className="fa fa-calendar"
          style={{ color: "#d6d6d6", marginRight: "5px" }}
        />
      </label>
      <input
        type="text"
        onClick={() => setDateRangeVisible(true)} // Khi người dùng click vào ô nhập ngày tháng
        value={`${selectedDateRange.startDate.toDateString()}-${selectedDateRange.endDate.toDateString()}`}
        readOnly
      />
      {isDateRangeVisible && ( // Nếu isDateRangeVisible là true, hiển thị modal
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          className="date"
          minDate={new Date()}
          onChange={handleSelect}
          ranges={[selectedDateRange]}
        />
      )}

      <label>
        <i
          className="fa fa-female"
          style={{ color: "#d6d6d6", marginRight: "5px" }}
        />
      </label>
      <select value={adults} onChange={handleAdultsChange}>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>{`${value} adult${value > 1 ? "s" : ""}`}</option>
        ))}
      </select>

      <select value={children} onChange={handleChildrenChange}>
        {[0, 1, 2, 3].map((value) => (
          <option key={value} value={value}>{`${value} children`}</option>
        ))}
      </select>

      <select value={rooms} onChange={handleRoomsChange}>
        {[1, 2, 3].map((value) => (
          <option key={value} value={value}>{`${value} room${value > 1 ? "s" : ""}`}</option>
        ))}
      </select>
      <button className="button search-button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default Form;
