import "./SearchPopup.css";
import { useSearch } from "../../searchContext/SearchContext"
import { useState } from "react";
import { DateRange } from "react-date-range";

const SearchPopup = () =>
{
  const { searchData, updateSearchData } = useSearch()
  const [isDateRangeVisible, setDateRangeVisible] = useState(false);

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(searchData.location)
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: searchData.startDate ? new Date(searchData.startDate) : new Date(),
    endDate: searchData.endDate ? new Date(searchData.endDate) : new Date(),
    key: "selection",
  });
  const handleLocationChange = (e) => { setSelectedLocation(e.target.value) }
  const handleSelect = (ranges) =>
  {
    setSelectedDateRange(ranges.selection);
    // Nếu ngày kết thúc đã được chọn, đóng modal
    if (ranges.selection.endDate)
    {
      setDateRangeVisible(false);
    };
  }
  const handleMinPrice = (e) => { setMinPrice(e.target.value) }
  const handleMaxPrice = (e) => { setMaxPrice(e.target.value) }
  const handleAdultsChange = (e) => { setAdults(e.target.value); };

  const handleChildrenChange = (e) => { setChildren(e.target.value); };

  const handleRoomsChange = (e) => { setRooms(e.target.value); };
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
      minPrice: minPrice,
      maxPrice: maxPrice
    });


  };
  return (
    <div className="search-popup">
      <h2>Search</h2>
      <form className="form-booking-information">
        <label>Destination</label>
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Where are you going?</option>
          <option value="Ha Noi">Ha Noi</option>
          <option value="Da Nang">Da Nang</option>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
        </select>
        <label>Check-in Date</label>
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
        <h3>Options</h3>
        <div className="detail-information">
          <label>Min price per night</label>
          <input type="number" min='0' onChange={handleMinPrice}></input>
        </div>
        <div className="detail-information">
          <label>Max price per night</label>
          <input type="number" min='0' onChange={handleMaxPrice}></input>
        </div>
        <div className="detail-information">
          <label>Aduit</label>

          <input type="number" min="1" defaultValue={searchData.adults} onChange={handleAdultsChange}></input>
        </div>
        <div className="detail-information">
          <label>Children</label>
          <input type="number" min="0" defaultValue={searchData.children} onChange={handleChildrenChange}></input>
        </div>
        <div className="detail-information">
          <label>Room</label>
          <input type="number" min="1" defaultValue={searchData.rooms} onChange={handleRoomsChange}></input>
        </div>

        <button className="button" onClick={handleSearch}>Search</button>
      </form>
    </div>
  );
};

export default SearchPopup
