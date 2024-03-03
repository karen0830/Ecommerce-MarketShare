import { Link } from "react-router-dom";
import "./HomeCategory.css";
import { useAuth } from "../../contexts/AuthProvider";

const subTitle = "Escoge Cualquier Producto";
const title = "Compra Cualquier Cosa Con Nosotros";
const btnText = "Empieza Ahora";

const categoryList = [
  {
    imgUrl: "../assets/images/category/01.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "DSLR Camera",
  },
  {
    imgUrl: "../assets/images/category/02.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Shoes",
  },
  {
    imgUrl: "../assets/images/category/03.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Photography",
  },
  {
    imgUrl: "../assets/images/category/04.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Formal Dress",
  },
  {
    imgUrl: "../assets/images/category/05.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Colorful Bags",
  },
  {
    imgUrl: "../assets/images/category/06.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Home Decor",
  },
];

const HomeCategory = () => {
  const {user} = useAuth();
  return (
    <div className="category-section background-section style-4 ">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title" style={{ color: "#fff" }}>
            {title}
          </h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {categoryList.map((val, i) => (
              <div className="col" key={i}>
                <Link to={user ? `/shopping/:${user.id}` : `/shop`} className="category-item">
                  <div
                    className="category-inner"
                    style={{ borderRadius: "1.13rem" }}
                  >
                    <div className="category-thumb">
                      <img
                        src={`${val.imgUrl}`}
                        alt={`${val.imgAlt}`}
                        style={{ borderRadius: "1.13rem" }}
                      />
                    </div>
                    <div className="category-content">
                      <div className="cate-icon">
                        <i className={`${val.iconName}`}></i>
                      </div>
                      <Link to={user ? `/shopping/:${user.id}` : `/shop`}>
                        <h6>{val.title}</h6>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to={user ? `/shopping/:${user.id}` : `/shop`} className="lab-btn">
              <span style={{ color: "#ffff" }}>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;