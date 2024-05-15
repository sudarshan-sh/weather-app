/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Card, Col, Row } from "react-bootstrap";
import "./App.css";
import LeftSideWeather from "./components/LeftSideWeather";
import RightWeatherInfo from "./components/RightWeatherInfo";
import { useEffect, useState } from "react";
import axios from "axios";

const endpoint = process.env.REACT_APP_SERVICE_URI;
const apiKey = process.env.REACT_APP_API_KEY;
const photosAPI = process.env.REACT_APP_PHOTOS_URI;
const clientID = process.env.REACT_APP_CLIENT_ID;
const endpointMain = process.env.REACT_APP_MAIN_API_ENDPOINT;

function App() {
  const [fetchWeatherData, setFetchWeatherData] = useState({});
  const initialCity = "New York"; // Set initial city
  const [cityName, setCityName] = useState(initialCity);
  const [searchPlace, setSearchPlace] = useState("");
  const [placePhoto, setPlacePhoto] = useState(null);
  const [fetchImageDetails, setFetchImageDetails] = useState([]);
  const [isTempInCelsius, setIsTempInCelsius] = useState(true);

  var dateFormat = new Date();
  // Get year, month, and day part from the date
  var year = dateFormat.toLocaleString("default", { year: "numeric" });
  var month = dateFormat.toLocaleString("default", { month: "2-digit" });
  var day = dateFormat.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = year + "-" + month + "-" + day;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch latitude and longitude of a city
        const cityData = await fetchCityData(cityName);
        const { lat, lon } = cityData[0];
        // Step 2: Fetch weather data using obtained latitude and longitude
        const weatherData = await fetchWeatherData1(lat, lon);
        setFetchWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cityToFetch = searchPlace;
        if (searchPlace.trim() === "") {
          cityToFetch = initialCity;
        }
        // Step 1: Fetch latitude and longitude of a city
        const cityData = await fetchCityData(cityToFetch);
        if (cityData.length === 0) {
          console.error("No data found for the entered city.");
          return; // If no data found for the entered city, do not fetch weather data
        }
        const { lat, lon } = cityData[0];
        // Step 2: Fetch weather data using obtained latitude and longitude
        const weatherData = await fetchWeatherData1(lat, lon);
        setFetchWeatherData(weatherData);

        // Step 3: Fetch image data using search place
        const imageData = await fetchImageData(cityToFetch);
        setFetchImageDetails(imageData?.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchPlace]);

  const fetchCityData = async (cityName) => {
    const url = `${endpointMain}?q=${cityName}&limit=5&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherData1 = async (lat, lon) => {
    const url = `${endpoint}?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchImageData = async (searchPlace) => {
    const url = `${photosAPI}?page=1&per_page=20&query=${searchPlace}&client_id=${clientID}`;
    const response = await axios.get(url);
    return response.data;
  };

  return (
    <div className="App">
      <Card className="main-card">
        <div>
          <Row className="p-3">
            <Col md={4} style={{ background: "#fff" }}>
              <LeftSideWeather
                fetchWeatherData={fetchWeatherData}
                searchPlace={searchPlace}
                onSetSearchPlace={setSearchPlace}
                cityName={cityName}
                fetchImageDetails={fetchImageDetails}
                isTempInCelsius={isTempInCelsius}
              />
            </Col>
            <Col
              md={8}
              style={{ background: "rgb(247, 245, 245)" }}
              className="m-0"
            >
              <RightWeatherInfo
                fetchWeatherData={fetchWeatherData}
                setIsTempInCelsius={setIsTempInCelsius}
                isTempInCelsius={isTempInCelsius}
              />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default App;
