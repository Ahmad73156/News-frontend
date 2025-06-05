// NewsItem.jsx
import React from "react";
import News from "./News";

const NewsItem = ({ category }) => {
  return (
    <div>
      {/* Pass the category prop to the News component */}
      <News category={category} />
    </div>
  );
};

export default NewsItem;
