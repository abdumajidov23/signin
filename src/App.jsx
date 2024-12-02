import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/Products";
import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Swiperr from "./components/Swiperr";

function App() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const toggleActions = (action) => {
    if (action === "signIn") {
      setSignIn(true);
      setSignUp(false);
    } else if (action === "signUp") {
      setSignUp(true);
      setSignIn(false);
    }
  };

  return (
    <>
      <Header />
      <Swiperr />
      <div className="flex justify-center space-x-4 p-4 bg-[#f0f9ff]">
  <button
    onClick={() => toggleActions("signIn")}
    className="h-[40px] w-[120px] bg-[#8082ff] text-white font-[700] flex justify-center items-center px-4 py-2 rounded-md hover:text-black duration-300 hover:border-2 hover:border-black hover:bg-opacity-0 hover:scale-110"
  >
    Sign In
  </button>
  <button
    onClick={() => toggleActions("signUp")}
    className="h-[40px] w-[120px] bg-[#d118ff] text-white font-[700] flex justify-center items-center px-4 py-2 rounded-md hover:text-black duration-300 hover:border-2 hover:border-black hover:bg-opacity-0 hover:scale-110"
  >
    Sign Up
  </button>
</div>



      {signIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-96 min-h-56 bg-white p-6 rounded-lg">
            <SignIn toggle={toggleActions} />
            <button
              onClick={() => setSignIn(false)}
              className="mt-4 w-full bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {signUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-96 min-h-56 bg-white p-6 rounded-lg">
            <SignUp toggle={toggleActions} />
            <button
              onClick={() => setSignUp(false)}
              className="mt-4 w-full bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Products />
      <ToastContainer />
    </>
  );
}

export default App;
