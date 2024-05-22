import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Card, Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import DayWeatherCard from "./DayWeatherCard";
import GaugeChart from "react-gauge-chart";
import { IoLocationSharp } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegFrown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import manImg from "../images/man-header.png";

const RightWeatherInfo = ({
  fetchWeatherData,
  setIsTempInCelsius,
  isTempInCelsius,
  isLoading,
  setIsLoading,
}) => {
  const { current, daily } = fetchWeatherData;

  const formatTimestampToDate = (timestamp) => {
    if (!timestamp) return ""; // Handle case where timestamp is not available
    const date = new Date(timestamp * 1000);
    // return date.toLocaleString();
    // const hours = date.getHours().toString().padStart(2, "0");
    let hours = date.getHours() % 12; // Get hours in 12-hour format
    hours = hours || 12; // Handle midnight (0 hours)
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${amOrPm}`;
  };

  const [activeDegree, setActiveDegree] = useState("celsius");
  const [activeTab, setActiveTab] = useState("week");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDegreeChange = (degree) => {
    setActiveDegree(degree);
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      {/* HEADER */}
      <header className="header-right">
        {/* initial starting section */}
        <div>
          <Tabs
            defaultActiveKey="week"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={handleTabChange}
            activeKey={activeTab}
          >
            <Tab eventKey="today" title="Today">
              {/* Today */}
            </Tab>
            <Tab eventKey="week" title="Week">
              {/* Week */}
            </Tab>
          </Tabs>
        </div>
        {/* final end sectiion */}
        <div className="d-flex gap-4">
          <div className="d-flex gap-1">
            <button
              className={`degree-btn ${
                activeDegree === "celsius" ? "degree-btn-active" : ""
              }`}
              onClick={() => {
                handleDegreeChange("celsius");
                setIsTempInCelsius(true);
              }}
            >
              °C
            </button>
            <button
              className={`degree-btn ${
                activeDegree === "fahrenheit" ? "degree-btn-active" : ""
              }`}
              onClick={() => {
                handleDegreeChange("fahrenheit");
                setIsTempInCelsius(false);
              }}
            >
              °F
            </button>
          </div>
          {manImg ? (
            <img
              src={manImg}
              alt="man"
              style={{ borderRadius: "10px", height: "45px" }}
            />
          ) : (
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          )}
        </div>
      </header>
      {/* Weekdays Card Section */}
      <section>
        <div className="day-cards">
          <>
            {daysOfWeek?.map((day, index) => {
              // Filter daily data to get data for the current day
              const dayData = daily?.find((dailyData) => {
                const dailyDate = new Date(dailyData.dt * 1000);
                return dailyDate.getDay() === index;
              });
              return (
                <Card className="day-weather-card" key={index}>
                  <div className="d-flex flex-column gap-2">
                    <h6 style={{ fontSize: "0.9rem" }}>{day}</h6>
                    {!dayData ? (
                      <div>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <DayWeatherCard
                        key={dayData.dt}
                        weatherDesc={dayData.weather}
                        tempObj={dayData.temp}
                        isTempInCelsius={isTempInCelsius}
                      />
                    )}
                  </div>
                </Card>
              );
            })}
          </>
        </div>
      </section>
      <div className="d-flex px-5 py-3">
        <h3>Today's Highlights</h3>
      </div>
      {/* Today's Highlights */}
      <main>
        <Row className="px-5">
          {/* {cardsDummyData.map((eachCardData, index) => {
            return (
              <Col lg={6} xl={4} className="p-0" key={index}>
                <HighlightsDetailCard cardData={eachCardData} />
              </Col>
            );
          })} */}
          {/* UV Index */}
          <Col lg={6} xl={4} className="p-0">
            <Card className="day-weather-card m-2">
              <div className="d-flex flex-column gap-2 py-3 px-4">
                <div className="d-flex justify-content-start">
                  <h6 style={{ color: "darkgray" }}>UV Index</h6>
                </div>
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <div className="d-flex justify-content-start gap-1 align-items-end">
                    <GaugeChart
                      id="gauge-chart1"
                      percent={current?.uvi / 100}
                      arcWidth={0.2}
                      colors={["#10BE5D", "#F4AB44", "#E42525"]}
                      needleColor="#464A4F"
                      labels={["Low", "Medium", "High"]}
                      animate={true}
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      textColor="#000"
                      needleBaseColor="#464A4F"
                    />
                  </div>
                )}
              </div>
            </Card>
          </Col>
          {/* WIND STATUS */}
          <Col lg={6} xl={4} className="p-0">
            <Card className="day-weather-card m-2">
              <div className="d-flex flex-column gap-2 py-3 px-4">
                <div className="d-flex justify-content-start">
                  <h6 style={{ color: "darkgray" }}>Wind Status</h6>
                </div>
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <div className="d-flex justify-content-start gap-1 align-items-end">
                    <h1 className="mb-0">{current?.wind_speed}</h1>
                    <h5 className="mb-1">km/h</h5>
                  </div>
                )}
                <span className="d-flex justify-content-start align-items-center gap-1 pt-1 weather-temp">
                  <IoLocationSharp />
                  <p className="mb-0">WSW</p>
                </span>
              </div>
            </Card>
          </Col>
          <Col lg={6} xl={4} className="p-0">
            <Card className="day-weather-card m-2">
              <div className="d-flex flex-column gap-2 py-3 px-4">
                <div className="d-flex justify-content-start">
                  <h6 style={{ color: "darkgray" }}>Sunrise & Sunset</h6>
                </div>
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <span className="d-flex justify-content-start align-items-center gap-2 pt-1">
                      <span style={{ fontSize: "1.3rem", color: "#ffbf00" }}>
                        <FaArrowCircleUp />
                      </span>
                      <p
                        className="mb-0 mt-1"
                        style={{ fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        {formatTimestampToDate(current?.sunrise)}
                      </p>
                    </span>
                    <span className="d-flex justify-content-start align-items-center gap-2 pt-1">
                      <span style={{ fontSize: "1.3rem", color: "#ffbf00" }}>
                        <FaArrowCircleDown />
                      </span>
                      <p
                        className="mb-0  mt-1"
                        style={{ fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        {formatTimestampToDate(current?.sunset)}
                      </p>
                    </span>
                  </>
                )}
              </div>
            </Card>
          </Col>
          <Col lg={6} xl={4} className="p-0">
            <Card className="day-weather-card m-2">
              <div className="d-flex flex-column gap-2 py-3 px-4">
                <div className="d-flex justify-content-start">
                  <h6 style={{ color: "darkgray" }}>Humidity</h6>
                </div>
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-start gap-1 align-items-end">
                      <h1 className="mb-0">{current?.humidity}</h1>
                      <h5 className="mb-1">%</h5>
                    </div>
                    <span className="d-flex justify-content-start align-items-center gap-1 pt-1 weather-temp">
                      <span style={{ fontSize: "1.3rem", color: "#ffbf00" }}>
                        <SlLike />
                      </span>
                      <p className="mb-0">Normal</p>
                    </span>
                  </>
                )}
              </div>
            </Card>
          </Col>
          <Col lg={6} xl={4} className="p-0">
            <Card className="day-weather-card m-2">
              <div className="d-flex flex-column gap-2 py-3 px-4">
                <div className="d-flex justify-content-start">
                  <h6 style={{ color: "darkgray" }}>Visibility</h6>
                </div>
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-start gap-1 align-items-end">
                      <h1 className="mb-0">{current?.visibility}</h1>
                      <h5 className="mb-1">m</h5>
                    </div>
                    <span className="d-flex justify-content-start align-items-center gap-1 pt-1 weather-temp">
                      <span style={{ fontSize: "1.3rem", color: "#ffbf00" }}>
                        <FaRegFrown />
                      </span>
                      <p className="mb-0">Average</p>
                    </span>
                  </>
                )}
              </div>
            </Card>
          </Col>
          <Col lg={6} xl={4} className="p-0">
            <Card className="day-weather-card m-2">
              <div className="d-flex flex-column gap-2 py-3 px-4">
                <div className="d-flex justify-content-start">
                  <h6 style={{ color: "darkgray" }}>Air Quality</h6>
                </div>
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-start gap-1 align-items-end">
                      <h1 className="mb-0">{current?.feels_like}</h1>
                      {/* <h5 className="mb-1">m</h5> */}
                    </div>
                    <span className="d-flex justify-content-start align-items-center gap-1 pt-1 weather-temp">
                      <span style={{ fontSize: "1.3rem", color: "#ffbf00" }}>
                        <SlDislike />
                      </span>
                      <p className="mb-0">Unhealthy</p>
                    </span>
                  </>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default RightWeatherInfo;
