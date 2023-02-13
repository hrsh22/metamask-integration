import React from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { contractABI } from "./Details";

const Home = () => {
  const [toValue, setToValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);

  const handleToValue = (event) => {
    setToValue(event.target.value);
  };
  const handleAmountValue = (event) => {
    setAmountValue(event.target.value);
  };
  const handleTokenAddress = (event) => {
    setTokenAddress(event.target.value);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const address = window.ethereum.selectedAddress;
          setWalletAddress(address);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("MetaMask is not available");
      }
    };

    checkConnection();
  }, []);

  async function sendToken() {
    // Check if MetaMask is installed
    console.log(walletAddress);
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask first.");
      return;
    }

    // Connect to the MetaMask provider
    window.addEventListener("load", async () => {
      try {
        await ethereum.enable();
      } catch (error) {}
    });

    // Create a Web3 object
    const web3 = new Web3(window.ethereum);
    // Load the ERC-20 contract
    const contract = new web3.eth.Contract(contractABI, tokenAddress);

    // Send the transaction
    await contract.methods
      .transfer(toValue, `${amountValue * (10 ** 18)}`)
      .send({ from: window.ethereum.selectedAddress });

    alert("Transaction sent.");
    console.log("Transaction sent.");
    setAmountValue("");
    setToValue("");
    setTokenAddress("");
  }

  return (
    <div>
      <div class="py-20 bg-cover bg-no-repeat bg-fixed h-screen">
        <div class="container m-auto text-center px-6 opacity-100">
          <h2 class="text-4xl font-bold mb-4 text-white">
            Hey...Send ERC20 Tokens!
          </h2>
          <h3 class="text-2xl mb-8 text-gray-200">
            {/* <div>
            <p>From: {walletAddress},</p> 
            <p>To: {sendTo}</p> 
            <p>Amount:{amount}</p>
            </div> */}
            <div>
              <p>
                <input
                  class="bg-gray border text-center border-gray-400 m-3 p-2 w-5/12"
                  type="text"
                  value={tokenAddress}
                  onChange={handleTokenAddress}
                  placeholder="Enter Token Address"
                />
              </p>
              <p>
                <input
                  className="bg-gray border text-center border-gray-400 m-3 p-2 w-5/12"
                  type="text"
                  value={toValue}
                  onChange={handleToValue}
                  placeholder="Enter Receiver Address"
                />
              </p>
              <p>
                <input
                  className="bg-gray border text-center border-gray-400 m-3 p-2 w-5/12"
                  type="text"
                  value={amountValue}
                  onChange={handleAmountValue}
                  placeholder="Enter amount in ether (upto 18 decimal places)"
                />
              </p>
            </div>
          </h3>
          <button
            onClick={sendToken}
            class="bg-red-400 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:text-blue-500 hover:bg-gray-800 transition-all"
          >
            Click to Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
