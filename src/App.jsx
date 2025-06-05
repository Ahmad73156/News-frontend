// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./NavBar";
import NewsItem from "./NewsItem"; // Use NewsItem here

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<NewsItem key="general" category="general" />} />
        <Route exact path="/entertainment" element={<NewsItem key="entertainment" category="entertainment" />} />
        <Route exact path="/sports" element={<NewsItem key="sports" category="sports" />} />
        <Route exact path="/business" element={<NewsItem key="business" category="business" />} />
        <Route exact path="/health" element={<NewsItem key="health" category="health" />} />
        <Route exact path="/science" element={<NewsItem key="science" category="science" />} />
        <Route exact path="/general" element={<NewsItem key="general" category="general" />} />
        <Route exact path="/technology" element={<NewsItem key="technology" category="technology" />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
