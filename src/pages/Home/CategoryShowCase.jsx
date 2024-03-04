import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Sidebar/Rating.jsx";

const title = "Nuestros Productos";

const ProductData = [
  {
    imgUrl: "images/categoryTab/01.jpg",
    cate: "Shoes",
    title: "Nike Premier X",
    author: "images/course/author/01.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 1,
  },
  {
    imgUrl: "images/categoryTab/02.jpg",
    cate: "Bags",
    title: "Asthetic Bags",
    author: "images/course/author/02.jpg",
    brand: "D&J Bags",
    price: "$199.00",
    id: 2,
  },
  {
    imgUrl: "images/categoryTab/03.jpg",
    cate: "Phones",
    title: "iPhone 12",
    author: "images/categoryTab/brand/apple.png",
    brand: "Apple",
    price: "$199.00",
    id: 3,
  },
  {
    imgUrl: "images/categoryTab/04.jpg",
    cate: "Bags",
    title: "Hiking Bag 15 Nh100",
    author: "images/course/author/04.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 4,
  },
  {
    imgUrl: "images/categoryTab/05.jpg",
    cate: "Shoes",
    title: "Outdoor Sports Shoes",
    author: "images/course/author/05.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 5,
  },
  {
    imgUrl: "images/categoryTab/06.jpg",
    cate: "Beauty",
    title: "COSRX Snail Mucin",
    author: "images/course/author/06.jpg",
    brand: "Zaara",
    price: "$199.00",
    id: 6,
  },
  {
    imgUrl: "images/categoryTab/07.jpg",
    cate: "Bags",
    title: "Look Less Chanel Bag ",
    author: "images/course/author/01.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 7,
  },
  {
    imgUrl: "images/categoryTab/08.jpg",
    cate: "Shoes",
    title: "Casual Sneakers",
    author: "images/course/author/02.jpg",
    brand: "Bata",
    price: "$199.00",
    id: 8,
  },
];

const CategoryShowCase = () => {
  const [items, setItems] = useState(ProductData);
  const filterItem = (categItem) => {
    const updateItems = ProductData.filter((curElem) => {
      return curElem.cate === categItem;
    });
    setItems(updateItems);
  };
  return (
    <div
      className="course-section style-3 padding-tb"
      style={{ background: "#242424" }}
    >
      {/*
      <div className="course-shape one">
        <img src="/images/shape-img/icon/01.png" alt="education"/>
      </div>
      <div className="course-shape two">
        <img src="/images/shape-img/icon/02.png" alt="education" />
      </div>
       */}
      <div className="container">
        {/* section header */}
        <div className="section-header" style={{ background: "#1c1c1c" }}>
          <h2 className="title" style={{ color: "#ffff" }}>
            {title}
          </h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li
                onClick={() => setItems(ProductData)}
                style={{ color: "#ffff" }}
              >
                Todo
              </li>
              <li
                onClick={() => filterItem("Shoes")}
                style={{ color: "#ffff" }}
              >
                Zapatos
              </li>
              <li onClick={() => filterItem("Bags")} style={{ color: "#ffff" }}>
                Mochilas
              </li>
              <li
                onClick={() => filterItem("Phones")}
                style={{ color: "#ffff" }}
              >
                Celulares
              </li>
              <li
                onClick={() => filterItem("Beauty")}
                style={{ color: "#ffff" }}
              >
                Belleza
              </li>
            </ul>
          </div>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
            {items.map((elem) => {
              const {
                id,
                imgUrl,
                imgAlt,
                cate,
                title,
                brand,
                authorName,
                price,
              } = elem;
              return (
                <div className="col" key={id}>
                  <div className="course-item style-4">
                    <div
                      className="course-inner"
                      style={{ borderRadius: "1.13rem", overflow: "hidden" }}
                    >
                      <div className="course-thumb">
                        <img
                          src={imgUrl}
                          alt=""
                          style={{ borderRadius: "1.13rem" }}
                        />
                        <div
                          className="course-category"
                          style={{ backgroundColor: "#287bff" }}
                        >
                          <div className="course-cate">
                            <a href="#">{cate}</a>
                          </div>
                          <div className="course-reiew">
                            <Rating />
                          </div>
                        </div>
                      </div>

                      {/* content  */}
                      <div
                        className="course-content"
                        style={{
                          backgroundColor: "#242424",
                          borderBottomLeftRadius: "1.13rem",
                          borderBottomRightRadius: "1.13rem",
                        }}
                      >
                        <Link to="/course-single">
                          <h5 style={{ color: "white" }}>{title}</h5>
                        </Link>
                        <div className="course-footer">
                          <div className="course-author">
                            <Link
                              to="/team-single"
                              className="ca-name"
                              style={{ color: "#ccc" }}
                            >
                              {brand}
                            </Link>
                          </div>
                          <div
                            className="course-price"
                            style={{ color: "white" }}
                          >
                            {price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowCase;