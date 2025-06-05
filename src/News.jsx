import React, { useState, useEffect } from "react";
import Card from "./Card";
import LoadingBar from "react-top-loading-bar";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [progress, setProgress] = useState(0);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const fetchData = async () => {
    setLoading(true);
    setProgress(20);
    const pageSize = 12;
    const url = `https://news-backend-staging.up.railway.app/news?category=${category}&page=${currentPage}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      setProgress(50);
      const parsedData = await response.json();
      setProgress(70);

      if (Array.isArray(parsedData.articles)) {
        // Append articles for pagination
        setArticles((prev) => [...prev, ...parsedData.articles]);
      } else {
        console.error("No articles array:", parsedData);
      }

      setProgress(100);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setProgress(100);
      setLoading(false);
    }
  };

  // Reset articles & page on category change
  useEffect(() => {
    setArticles([]);
    setCurrentPage(1);
  }, [category]);

  // Fetch data when currentPage or category changes
  useEffect(() => {
    fetchData();
  }, [currentPage, category]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowBackToTop(true);
      else setShowBackToTop(false);

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const titleLimit = 30;
  const descriptionLimit = 60;

  return (
    <>
      <LoadingBar color="red" progress={progress} height={2} onLoaderFinished={() => setProgress(0)} />

      <div className="container">
        <div style={{ marginTop: "76px", marginLeft: "13px" }}>
          <h2>NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines</h2>
        </div>

        <div className="row">
          {loading && currentPage === 1 ? (
            <div className="flex flex-col justify-center items-center h-60 w-full animate-fade-in-up">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-500 dark:border-blue-400 border-t-transparent"></div>
              <span className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                Loading {capitalizeFirstLetter(category)} news...
              </span>
            </div>
          ) : (
            articles.map((article, index) => {
              const truncatedTitle =
                article.title.length > titleLimit ? article.title.slice(0, titleLimit) + "..." : article.title;
              const truncatedDescription =
                article.description && article.description.length > descriptionLimit
                  ? article.description.slice(0, descriptionLimit) + "..."
                  : article.description;

              return (
                <div className="col-md-4" key={index}>
                  <Card
                    title={truncatedTitle}
                    description={truncatedDescription}
                    imageurl={article.urlToImage}
                    url={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {showBackToTop && (
        <button
          style={{
            boxShadow: "3px 3px 6px skyblue",
            transform: "scale(1.05)",
            position: "fixed",
            bottom: "20px",
            marginBottom: "40px",
            right: "20px",
            backgroundColor: "#0056b3",
            color: "white",
            marginRight: "-16px",
            border: "none",
            padding: "10px 15px",
            borderRadius: "40%",
            transition: "ease-in",
            cursor: "pointer",
            zIndex: 1000,
          }}
          onClick={scrollToTop}
        >
          ⬆ Back to Top
        </button>
      )}
    </>
  );
};

export default News;
