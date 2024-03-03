import React, { useState } from "react";

import SelectCategory from "../Shop/SelectCategory";
import productData from "../../products.json";
import { Link } from "react-router-dom";
import "./Banner.css";

const title = (
  <h2>
    Busca el tuyo entre <span>Miles</span> De Productos
  </h2>
);
const desc = "Tenemos La Mayor Coleccion De Productos";

const bannerList = [
  {
    iconName: "icofont-users-alt-4",
    text: "1.5 Million Customers",
  },
  {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
  },
  {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
  },
];

const Banner = () => {
  // product search funtionality
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);

    // Filter products based on the search term
    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="banner-section  style-4" style={{ background: "#242424" }}>
      <div className="container">
        <div className="banner-content">
          {title}
          <form>
            <SelectCategory select={"all"} />
            <input
              type="text"
              name="search"
              placeholder="Busca Tus Productos"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p>{desc}</p>
          <ul className="lab-ul">
            {searchInput &&
              filteredProducts.map((product, i) => (
                <li key={i}>
                  <Link to={`/shop/${product.id}`}> {product.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;