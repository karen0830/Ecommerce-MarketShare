/* eslint-disable react/prop-types */
const title = "All Categories";
import { getAllProductsCompany } from "../../api/auth.products";
import "./ShopCategory.css";
const ShopCategory = ({
  filterItem,
  setItem,
  menuItems,
  setProducts,
  selectedCategory,
}) => {

  async function getProducts() {
    let products = [];
    const res = await getAllProductsCompany();
    console.log(res, " jssas");
    res.data.products.forEach(element => {
      products.push(element)
    });
    console.log("p ", products);
    setProducts(products)
  }
 

  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2" style={{ color: "#fff" }}>
          {title}
        </h5>
      </div>
      <div className="">
        <button
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}
          onClick={() => getProducts()}
        >
          All
        </button>

        {menuItems.map((Val, id) => {
          return (
            <button
              className={`m-2 ${selectedCategory === Val ? "selected-category" : ""
                }`}
              onClick={() => filterItem(Val)}
              key={id}
            >
              {Val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;
