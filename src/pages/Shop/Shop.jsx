import React, { useContext, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Component, Fragment, useState } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import ProductCards from "./ProductCards";
const showResult = "Showing 01 - 12 of 139 Results";
import "./Shop.css";
import { getAllProductsCompany } from "../../api/auth.products";
import { AuthContext, useAuth } from "../../contexts/AuthProvider";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const { checkLogin } = useAuth();
  const [products, setProducts] = useState(null);
  const { user, logOut, isAuthenticated } = useContext(AuthContext);

  //   category active colors
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    console.log(token, " totok");
    const tokenLocal = localStorage.getItem("token");
    if (token && token != "null") {
      localStorage.setItem('token', token)
      checkLogin();
    } else if (!tokenLocal) {
      let tokenLocal = localStorage.getItem("token");
      if (tokenLocal) {
        localStorage.removeItem("token");
        checkLogin();
      }
    }
  }, [token])

  useEffect(() => {
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
    getProducts()
  }, [user])
  // pagination
  // Get current products to display
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products ? products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ) : [];
  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // category based filtering
  let menuItems; // Declaración de menuItems

  if (Array.isArray(products)) {
    menuItems = [...new Set(products.map((Val) => Val.description))]; // Asignación de valor a menuItems
  } else {
    console.log('products no es un arreglo');
  }

  // Ahora puedes acceder a menuItems aquí, fuera del bloque if
  console.log(menuItems);


  const filterItem = (curcat) => {
    const newItem = products.filter((newVal) => {
      return newVal.description === curcat;
    });
    setSelectedCategory(curcat);
    setProducts(newItem);
    // console.log(selectedCategory)
  };

  return (
    <div>
      <PageHeader title={"Our Shop Pages"} />

      {/* shop page */}
      <div
        className="shop-page padding-tb"
        style={{ backgroundColor: "#242424" }}
      >
        <div className="container">
          {Array.isArray(products) ? (
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12">
                <article>
                  <div className="shop-title d-flex flex-wrap justify-content-between">
                    <p style={{ color: "#fff" }}>{showResult}</p>
                    <div
                      className={`product-view-mode ${GridList ? "gridActive" : "listActive"
                        }`}
                    >
                      <a className="grid" onClick={() => setGridList(!GridList)}>
                        <i className="icofont-ghost"></i>
                      </a>
                      <a className="list" onClick={() => setGridList(!GridList)}>
                        <i className="icofont-listine-dots"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <ProductCards
                      products={currentProducts}
                      GridList={GridList}
                    />
                  </div>
                  <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate}
                    activePage={currentPage}
                  />
                </article>
              </div>
              <div className="col-lg-4 col-12">
                <aside>
                  <Search products={products} GridList={GridList} />
                  {/* <ShopCategory /> */}
                  <ShopCategory
                    filterItem={filterItem}
                    setItem={setProducts}
                    menuItems={menuItems}
                    setProducts={setProducts}
                    selectedCategory={selectedCategory}
                  />

                  {/*<PopularPost />
                <Tags /> */}
                </aside>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Shop;
