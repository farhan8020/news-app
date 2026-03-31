import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { description, imageUrl, title, newsUrl, author, date, mode, source } = this.props;

    const fallbackImage = "https://placehold.co/400x200?text=No+Image";

    return (
      <div className='container my-3'>
        <div
          className={`card ${mode === "dark" ? "bg-dark text-light" : ""}`}
          style={{ width: "19rem", height: "480px", position: "relative" }}
        >

          {/* Source Badge (optional) */}
          {source && (
            <span className="badge bg-danger position-absolute top-0 end-0 m-2">
              {source}
            </span>
          )}

          {/* Image */}
          <img
            src={imageUrl || fallbackImage}
            className="card-img-top"
            alt="news"
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />

          <div className="card-body">
            
            {/* Title */}
            <h5 className="card-title">
              {title ? title.slice(0, 60) : "No Title"}...
            </h5>

            {/* Description */}
            <p className="card-text">
              {description ? description.slice(0, 100) : "No Description"}...
            </p>

            {/* Author + Date */}
            <p className="card-text">
              <small className={mode === "dark" ? "text-light" : "text-muted"}>
                By {author || "Unknown"} on{" "}
                {date ? new Date(date).toGMTString() : "No Date Mentioned"}
              </small>
            </p>

            {/* Read More Button */}
            <a
              href={newsUrl || "#"}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>

          </div>
        </div>
      </div>
    );
  }
}