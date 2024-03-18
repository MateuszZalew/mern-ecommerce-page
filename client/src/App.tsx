import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import CheckoutPage from "./pages/checkout";
import PurchasedItemsPage from "./pages/purchased-items";
import ShopPage from "./pages/shop";
import { ShopContextProvider } from "./context/shop-context";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
          </Routes>
        </ShopContextProvider>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          theme="light"
          closeOnClick
        />
      </Router>
    </div>
  );
}

export default App;
