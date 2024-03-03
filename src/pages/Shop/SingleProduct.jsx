import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import Rating from "../../components/Sidebar/rating";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
import Review from "../../components/Review";
import MostPopularPost from "../../components/Sidebar/MostPopularPost";
import ProductDisplay from "./ProductDisplay";
import { getAllProductsCompany } from "../../api/auth.products";
const reviwtitle = "Add a Review";

const SingleProduct = () => { 
  const [product, setProduct] = useState();
  const [result, setResult] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function getProducts() {
      const res = await getAllProductsCompany();
      setProduct(res.data.products);
    }
    getProducts();
  }, []);
  
  useEffect(() => {
    if (Array.isArray(product)) {
      setResult(product.filter((p) => p.id == id));
    }
  }, [product, id]);

  useEffect(() => {
   console.log("Result", result);
  }, [result]);
  return (
    <div>
      <PageHeader title={"OUR SHOP SINGLE"}/>
      <div
        className="shop-single padding-tb aside-bg"
        style={{ backgroundColor: "#242424" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details" style={{ color: "#1c1c1c" }}>
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={"true"}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                          >
                            {Array.isArray(result) ? (
                              result.map((item, i) => (
                                <SwiperSlide key={i}>
                                  <div className="single-thumb">
                                    <img src={item.img} alt="" />
                                  </div>
                                </SwiperSlide>
                              ))
                            ): null}
                          </Swiper>
                          <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <div>
                          {Array.isArray(result) ? (
                            result.map((item) => (
                              <ProductDisplay item={item} key={item.id} />
                            ))
                          ): null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  <Review />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-md-7 col-12">
              <aside className="ps-lg-4">
                <MostPopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
