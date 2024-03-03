import "./App.css";
import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import "./index.css";
import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";
import NavItems from "./components/NavItems";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import SingleProduct from "./pages/Shop/SingleProduct.jsx";
import About from "./pages/AboutPage/About.jsx";
import Contact from "./pages/ContactPage/Contact.jsx";
import CartPage from "./pages/Shop/CartPage.jsx";
import CheckoutPage from "./pages/Shop/CheckoutPage.jsx";
//Components
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import PrivateRoute, { PublicRoute } from "./PrivateRoute/PrivateRoute.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { useContext } from "react";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavItems />
        <Routes>
          {/* Inicio de las rutas */}
          <Route element={<PublicRoute/>}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            {/* Si hay un usuario autenticado, incluye el ID en la ruta */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
          <Route path="/:id" element={<Home />} />
            <Route path={`cart-page/:id`} element={<CartPage />} />
            <Route path={`shop/:id`} element={<SingleProduct />} />
            <Route path={`/shopping/:id`} element={<Shop />} />
            <Route path="/about/:id" element={<About />} />
            <Route path="/contact/:id" element={<Contact />} />
          </Route>
          {/* Fin de las rutas */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
