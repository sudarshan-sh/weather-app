import React, { useEffect, useState } from "react";
import sunWeatherImg from "../images/big-sun.png";
import { IoIosCloudOutline } from "react-icons/io";
import { FaCloudRain } from "react-icons/fa";
import imageOvercastClouds from "../images/weekImages/clouds.png";
import clearImg from "../images/weekImages/clear.png";
import imageModerateRain from "../images/weekImages/rain.png";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const LeftSideWeather = ({
  fetchWeatherData,
  searchPlace,
  onSetSearchPlace,
  cityName,
  fetchImageDetails,
  isTempInCelsius,
}) => {
  const [filteredDailyData, setFilteredDailyData] = useState([]);
  const { current } = fetchWeatherData;
  // today's data
  const d = new Date();
  let toDay = weekday[d.getDay()];
  let UTCseconds = (d.getTime() + d.getTimezoneOffset() * 60 * 1000) / 1000;

  const formatTimestampToDate = (timestamp) => {
    if (!timestamp) return ""; // Handle case where timestamp is not available
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0"); // Get hours with leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes with leading zero if needed
    // return date.toLocaleString();
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentDayIndex = d.getDay();

    // Filter the weather data for the next 7 days based on the current day index
    const filteredData = fetchWeatherData?.daily
      ?.slice(0, 7)
      .filter((dailyData, index) => {
        // Calculate the day index for the current data in the filter function
        const dayIndex = (currentDayIndex + index) % 7;
        // Check if the day index matches the current day index
        return dayIndex === currentDayIndex;
      });
    setFilteredDailyData(filteredData);
  }, [fetchWeatherData]);

  const tempInFahrenheit = ((current?.temp - 273.15) * 9) / 5 + 32;
  const tempInCelsius = current?.temp - 273.15;

  const WeatherIcon = ({ weatherIcon }) => {
    // Check if the weather ID starts with 5
    const isCloudy = weatherIcon?.toString() === "04d";
    const isRainy = weatherIcon?.toString().startsWith("5");
    const isOvercastCloudy = weatherIcon?.toString() === "804";
    // Render the appropriate weather icon based on the weather ID
    if (isRainy) {
      return (
        <img
          src={imageModerateRain}
          alt="rainy"
          className="weather-img"
          style={{ width: "200px" }}
        />
      );
    } else if (isCloudy) {
      return (
        <img
          src={imageOvercastClouds}
          alt="scattered clouds"
          className="weather-img"
          style={{ width: "200px" }}
        />
      );
    } else if (isOvercastCloudy) {
      return (
        <img
          src={imageOvercastClouds}
          alt="overcast clouds"
          className="weather-img"
          style={{ width: "200px" }}
        />
      );
    } else {
      return (
        <img
          src={clearImg}
          alt="clear"
          className="weather-img"
          style={{ width: "200px" }}
        />
      );
    }
  };

  return (
    <>
      <div className="left-container">
        <div className="p-3">
          <input
            type="search"
            className="search-place"
            placeholder="Search for places..."
            value={searchPlace}
            onChange={(e) => onSetSearchPlace(e.target.value)}
          />
          {/* <img src={sunWeatherImg} alt="sun-weather" /> */}
          <WeatherIcon weatherIcon={current?.weather[0]?.icon} />
        </div>
        <div className="left-weather-info">
          {filteredDailyData?.map((dailyData) => (
            <div>
              <h1>
                {/* {isTempInCelsius
                  ? tempInCelsius.toFixed(2) + "°C"
                  : tempInFahrenheit.toFixed(2) + "°F"} */}
                {isTempInCelsius
                  ? (dailyData?.temp?.day - 273.15).toFixed(2) + "°C"
                  : ((dailyData?.temp?.day * 9) / 5 + 32).toFixed(2) + "°F"}
              </h1>
              <span className="d-flex">
                <p>{toDay}</p>,&nbsp;
                {/* <p>{formatTimestampToDate(UTCseconds)}</p> */}
                <p>{formatTimestampToDate(dailyData.dt)}</p>
              </span>
            </div>
          ))}
        </div>
        <hr style={{ color: "darkgrey" }} />
        <div className="left-weather-info">
          <span className="d-flex align-items-center gap-2">
            <IoIosCloudOutline />
            <p className="m-0">{current?.weather[0]?.description}</p>
          </span>
          <span className="d-flex align-items-center gap-2">
            <FaCloudRain />
            <p className="m-0">{current?.weather[0]?.main}</p>
          </span>
          <div className="p-3" style={{ position: "relative" }}>
            <img
              src={fetchImageDetails[0]?.urls.small}
              alt="sun-weather"
              style={{
                borderRadius: "20px",
                height: "auto",
                width: "100%",
                position: "relative",
                top: 0,
                left: 0,
                maxWidth: "250px",
                maxHeight: "220px",
              }}
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              {searchPlace || cityName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideWeather;
