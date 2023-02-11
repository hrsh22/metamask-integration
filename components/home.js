import React from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { contractABI, contractAddress } from "./Details";

const Home = () => {
  const [toValue, setToValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);

  const handleToValue = (event) => {
    setToValue(event.target.value);
  };
  const handleAmountValue = (event) => {
    setAmountValue(event.target.value);
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

  const sendTo = "0x5991fd6Ecc5634C4de497b47Eb0Aa0065fffb214";
  const amount = "1000000000000000000";
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
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Send the transaction
    await contract.methods
      .transfer(toValue, amountValue)
      .send({ from: walletAddress });

    alert("Transaction sent.");
    console.log("Transaction sent.");
    setAmountValue("");
    setToValue("");
  }

  return (
    <div>
      <div class="py-20 bg-cover bg-no-repeat bg-fixed h-screen">
        <div class="container m-auto text-center px-6 opacity-100">
          <h2 class="text-4xl font-bold mb-4 text-white">
            Hey...Send STK Tokens!
          </h2>
          <h3 class="text-2xl mb-8 text-gray-200">
            {/* <div>
            <p>From: {walletAddress},</p> 
            <p>To: {sendTo}</p> 
            <p>Amount:{amount}</p>
            </div> */}
    <div><p>
            <input
              className="bg-gray border border-gray-400 m-3 p-2 w-100"
              type="text"
              value={toValue}
              onChange={handleToValue}
              placeholder="Enter Receiver Address"
            /></p>
            <p>
            <input
              className="bg-gray border border-gray-400 m-3 p-2 w-100"
              type="text"
              value={amountValue}
              onChange={handleAmountValue}
              placeholder="Enter amount in wei"
            /></p>
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
