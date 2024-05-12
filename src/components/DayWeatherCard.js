import React from "react";
import { Card } from "react-bootstrap";
import { BsFillSunFill } from "react-icons/bs";
import imageModerateRain from "../images/weekImages/rain.png";
import imageCloudy from "../images/weekImages/clouds.png";
import imageOvercastClouds from "../images/weekImages/overcast-clouds.png";
import clearImg from "../images/weekImages/clear.png";

const DayWeatherCard = ({ tempObj, index, isTempInCelsius, weatherDesc }) => {
  // Array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day name based on the index
  const dayName = daysOfWeek[index % 7];

  const convertTemperature = (tempInKelvin, unit) => {
    let temperature;
    switch (unit) {
      case "F":
        temperature = ((tempInKelvin - 273.15) * 9) / 5 + 32; // Convert to Fahrenheit
        break;
      case "C":
        temperature = tempInKelvin - 273.15; // Convert to Celsius
        break;
      default:
        temperature = tempInKelvin; // Default to Kelvin
        break;
    }
    return temperature.toFixed(2);
  };

  // Convert temperatures based on the state isTempInCelsius
  const maxTemp = isTempInCelsius
    ? convertTemperature(tempObj.max, "C")
    : convertTemperature(tempObj.max, "F");
  const minTemp = isTempInCelsius
    ? convertTemperature(tempObj.min, "C")
    : convertTemperature(tempObj.min, "F");

  const WeatherIcon = ({ weatherId }) => {
    // Check if the weather ID starts with 5
    const isRainy = weatherId.toString().startsWith("5");
    const isCloudy = weatherId.toString() === "802";
    const isOvercastCloudy = weatherId.toString() === "804";
    // Render the appropriate weather icon based on the weather ID
    if (isRainy) {
      return (
        <img src={imageModerateRain} alt="rainy" className="weather-img" />
      );
    } else if (isCloudy) {
      return (
        <img src={imageCloudy} alt="scattered clouds" className="weather-img" />
      );
    } else if (isOvercastCloudy) {
      return (
        <img
          src={imageOvercastClouds}
          alt="overcast clouds"
          className="weather-img"
        />
      );
    } else {
      return <img src={clearImg} alt="clear" className="weather-img" />;
    }
  };

  return (
    <Card className="day-weather-card">
      <div className="d-flex flex-column gap-2">
        <h6 style={{ fontSize: "0.9rem" }}>{dayName}</h6>
        <div>
          <WeatherIcon weatherId={weatherDesc[0]?.id} />
        </div>
        <span className="d-flex justify-content-center gap-2 pt-1 weather-temp">
          <p style={{ fontSize: "0.9rem" }}>
            {maxTemp}°{isTempInCelsius ? "C" : "F"}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            {minTemp}°{isTempInCelsius ? "C" : "F"}
          </p>
        </span>
      </div>
    </Card>
  );
};

export default DayWeatherCard;
