import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: replace invalid "general" with "top"
  const validCategory = props.category === "general" ? "top" : props.category;

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [validCategory]);

  const updateNews = async () => {
    try {
      document.title = `${validCategory.toUpperCase()} - NewsMonkey`;

      props.setProgress(10);

      const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&language=en&category=${validCategory}`;

      setLoading(true);

      let response = await fetch(url);
      let parsedData = await response.json();

      console.log("API RESPONSE:", parsedData);

      props.setProgress(70);

      // ✅ HANDLE API ERROR
      if (parsedData.status === "error") {
        console.error("API ERROR:", parsedData);
        setArticles([]);
        setLoading(false);
        return;
      }

      // ✅ SAFE ARRAY CHECK
      setArticles(Array.isArray(parsedData.results) ? parsedData.results : []);
      setNextPage(parsedData.nextPage || null);

      setLoading(false);
      props.setProgress(100);

    } catch (error) {
      console.error("Fetch Error:", error);
      setArticles([]);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      if (!nextPage) return;

      const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&language=en&category=${validCategory}&page=${nextPage}`;

      let response = await fetch(url);
      let parsedData = await response.json();

      if (parsedData.status === "error") return;

      if (Array.isArray(parsedData.results)) {
        setArticles(prev => prev.concat(parsedData.results));
        setNextPage(parsedData.nextPage || null);
      }

    } catch (error) {
      console.error("Fetch More Error:", error);
    }
  };

  return (
    <div className="container my-3">

      <h3 className="text-center my-4" style={{ paddingTop: "60px" }}>
        NewsMonkey - Top {validCategory.toUpperCase()}
      </h3>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={nextPage !== null}
        loader={<Spinner />}
      >

        <div className="container">
          <div className="row">

            {Array.isArray(articles) && articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title?.slice(0, 45) || ""}
                  description={element.description?.slice(0, 80) || ""}
                  imageUrl={element.image_url || "https://via.placeholder.com/150"}
                  newsUrl={element.link}
                  author={element.creator?.[0] || "Unknown"}
                  date={element.pubDate}
                  mode={props.mode}
                />
              </div>
            ))}

          </div>
        </div>

      </InfiniteScroll>

    </div>
  );
};

export default News;