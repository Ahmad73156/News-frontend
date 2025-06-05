import React, { useState, useEffect } from "react";

const Card = ({ title, description, imageurl, url, author, date, source }) => {
  const [cardStyle, setCardStyle] = useState({
    width: "21rem",
    height: "480px",
    margin: "1rem",
    marginLeft: "20px",
    marginRight:"20px",
    marginTop: "40px",
    backgroundColor: "#fff",
    color: "#000",
  });

 useEffect(() => {
  const updateStyle = () => {
    const width = window.innerWidth;

    if (width <= 375) {
      // Mobile S and M
      setCardStyle((prev) => ({
        ...prev,
        margin: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "90%",
      }));
    } else if (width <= 425) {
      // Mobile L
      setCardStyle((prev) => ({
        ...prev,
        margin: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
      }));
    } else if (width > 768 && width <= 1024) {
      // Tablet to Laptop L
      setCardStyle((prev) => ({
        ...prev,
        margin: "16px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "20rem",
      }));
    } else if (width <= 768) {
      // Tablets and medium mobiles
      setCardStyle((prev) => ({
        ...prev,
         margin: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "85%"
      }));
    } else {
      // Desktop and larger
      setCardStyle((prev) => ({
        ...prev,
        margin: "1rem",
        marginLeft: "90px",
        marginRight: "1rem",
        width: "20rem",
      }));
    }
  };

  updateStyle(); // Initial check
  window.addEventListener("resize", updateStyle);
  return () => window.removeEventListener("resize", updateStyle);
}, []);





  return (
    <div className="card" style={cardStyle}>
      <span
        className="badge bg-danger"
        style={{
          color: "#fff",
        }}
      >
        {source}
      </span>
      <img
        src={
          !imageurl
            ? "https://www.mlive.com/resizer/v2/MME6IWXPXNDW3PFRKAU5XRHNAY.jpg?auth=7ee8a438463af64c6118a21c7c09334b1f0a34d364d439a951f7e3ce2a495531&width=1280&quality=90"
            : imageurl
        }
        className="card-img-top"
        alt="News"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {author ? author : "Unknown"} on{" "}
            {new Date(date).toLocaleString()}
          </small>
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;
