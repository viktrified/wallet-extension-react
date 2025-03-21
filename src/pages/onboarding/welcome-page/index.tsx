import { Link, useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo2.png";
import { retrieveData } from "../../../utils/utils";
import { useEffect } from "react";

const WelcomePage = () => {
    const accounts = retrieveData("accounts");
    const navigate = useNavigate();
    useEffect(() => {
      if (accounts[0]) {
        navigate(`/login`);
      } 
    });


  return (
    <div className="relative p-5 h-full w-full flex flex-col items-center justify-center text-white">
      <div className="flex h-full flex-col gap-1 justify-center items-center text-center">
        <img src={logo} alt="" className="h-12 w-12 flex justify-center mb-2" />
        <h1 className="text-2xl font-quicksand font-semibold">
          Welcome to Katera
        </h1>
        <p className="font-inter text-gray-400 text-sm ">
        Your secure gateway to Ethereum. Manage, send, and receive crypto with 
        confidence.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full mt-auto">
        <Link to="/create-wallet">
          <button className="w-full p-3 bg-violet-500 rounded-full text-white font-poppins">
            Create a new wallet
          </button>
        </Link>
  
        <Link to="/import-wallet">
          <button className="w-full p-3 bg-[#4D4D4D] rounded-full text-white font-poppins">
            I already have a wallet
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
