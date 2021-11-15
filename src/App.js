import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "./views/Home";
import { products as mockProducts } from "./mockData";
import { setCart, setProducts, selectCartItems } from "./redux/slices/app";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => selectCartItems(state));

  useEffect(() => {
    if (!localStorage.getItem("products") || !localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(mockProducts.slice(0, 3)));
      localStorage.setItem("products", JSON.stringify(mockProducts));
    }
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    dispatch(setProducts(JSON.parse(localStorage.getItem("products"))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return <Home />;
}

export default App;
