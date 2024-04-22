import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavbar from "../src/components/MainNavbar";
import Footer from "../src/components/Footer";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import Header from './components/Header';
import MerchantHome from './merchants/MerchantHome';
import FaqPage from "./pages/Faq";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Checkout from "./users/Checkout";
import TopBusinessList from './merchants/TopBusinessList';
import BusinessCategory from "./merchants/BusinessCategory";
import Menu from './merchants/Menu';
import ProductDetail from "./merchants/ProductDetail";
import UserOrders from './users/UserOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainNavbar />}>
          <Route index element={<>
            <Header />
            <ProductList />
            <TopBusinessList />
            <BusinessCategory />
          </>
          } />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="category" element={<BusinessCategory />} />
          <Route path="details" element={<ProductDetail />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
        <Route path='/m'>
          {/* <Route path='register' element={<RegisterBusiness />} /> */}
          <Route index element={<MerchantHome />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
