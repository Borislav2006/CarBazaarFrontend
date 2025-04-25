import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/userAuth";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import CarListing from "./Components/CarListing/CarListing";
import Hero from "./Components/Hero/Hero";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <ToastContainer />
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
