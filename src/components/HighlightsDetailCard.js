import React from "react";
import { Card } from "react-bootstrap";

const HighlightsDetailCard = ({ cardData }) => {
  const { heading, description, unit, footer } = cardData;
  return (
    <Card className="day-weather-card m-2">
      <div className="d-flex flex-column gap-2 py-3 px-4">
        <div className="d-flex justify-content-start">
          <h6 style={{ color: "darkgray" }}>{heading}</h6>
        </div>
        {description && (
          <div className="d-flex justify-content-start gap-1 align-items-end">
            <h1 className="mb-0">{description}</h1>
            <h5 className="mb-1">{unit}</h5>
          </div>
        )}
        {footer.length === 1 ? (
          <span className="d-flex justify-content-start align-items-center gap-1 pt-1 weather-temp">
            {footer[0].icon}
            <p className="mb-0">{footer[0].content}</p>
          </span>
        ) : (
          <>
            {footer.map((data, index) => {
              const { icon, content } = data;
              return (
                <span
                  className="d-flex justify-content-start align-items-center gap-1 pt-1"
                  key={index}
                >
                  <span style={{ fontSize: "1.3rem", color: "#ffbf00" }}>
                    {icon}
                  </span>
                  <p className="mb-0 fw-bold">{content}</p>
                </span>
              );
            })}
          </>
        )}
      </div>
    </Card>
  );
};

export default HighlightsDetailCard;
