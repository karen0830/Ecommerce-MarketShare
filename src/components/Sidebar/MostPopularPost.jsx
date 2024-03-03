import React from "react";
import { Link } from "react-router-dom";
const title = "Most Popular Post";

const MostPopularPost = () => {
  return (
    <div className="widget widget-post">
      <div className="widget-header">
        <h5 className="title">{title}</h5>
      </div>
    </div>
  );
};

export default MostPopularPost;
