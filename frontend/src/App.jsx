import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavbar from "../src/components/MainNavbar";
import Footer from "../src/components/Footer";
import About from "./pages/About";
import Header from './components/Header';
import BusinessHome from './merchants/BusinessHome';
import FaqPage from "./pages/Faq";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Checkout from "./users/Checkout";
import TopBusinessList from './merchants/TopBusinessList';
import BusinessCategory from "./merchants/BusinessCategory";
import Menu from './merchants/Menu';
import ProductDetail from "./merchants/ProductDetail";
import UserOrders from './users/UserOrders';
import ProductHome from './pages/ProductHome';
import MerchantHome from './pages/MerchantHome';
import { ROUTES } from './config';
import SecondaryNav from './components/SecondaryNav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainNavbar />}>
          <Route index element={<>
            <Header />
            <SecondaryNav />
            <TopBusinessList />
            <BusinessCategory />
          </>
          } />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.FAQ} element={<FaqPage />} />
          <Route path={ROUTES.FEATURES} element={<Features />} />
          <Route path={ROUTES.PRICING} element={<Pricing />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.CATEGORY} element={<BusinessCategory />} />
          {/* <Route path="details" element={<ProductDetail />} /> */}
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.ORDERS} element={<UserOrders />} />
          <Route path={ROUTES.PRODUCTHOME}>
            <Route index element={
              <>
                <ProductHome />
              </>
            } />
            <Route path={ROUTES.PRODUCTDETAIL} element={<ProductDetail />} />
          </Route>
          <Route path={ROUTES.MERCHANTHOME}>
            <Route index element={
              <>
                <MerchantHome />
              </>
            } />
            <Route path={ROUTES.MERCHANTDETAIL} element={<ProductDetail />} />
          </Route>
        </Route>
        <Route path={ROUTES.BUSINESSHOME}>
          {/* <Route path='register' element={<RegisterBusiness />} /> */}
          <Route index element={<BusinessHome />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
