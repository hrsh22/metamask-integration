import React from 'react';
import { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';



const Navbar = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const infuraProjectId = '0184d3d3bd644a9788ed3c7eeda35b20';
  const infuraRpcEndpoint = `https://goerli.infura.io/v3/${infuraProjectId}`;

  const connectToWeb3 = async () => {
    try {
      // request access to user's MetaMask wallet
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(account);
  
      // create new Web3Provider instance with Infura as the RPC endpoint
      const web3Provider = new JsonRpcProvider(infuraRpcEndpoint);
      setWeb3(web3Provider);
    } catch (error) {
      console.error(error);
    }
  };
  
    

  return (
    <nav class="bg-gray-100">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between">

      <div class="flex space-x-4">
        {/* <!-- logo --> */}
        <div>
          <a href="#" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
            <svg class="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span class="font-bold">MetaMask Integration</span>
          </a>
        </div>

        {/* <!-- primary nav --> */}
        {/* <div class="hidden md:flex items-center space-x-1">
          <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Features</a>
          <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</a>
        </div> */}
      </div>

      {/* <!-- secondary nav --> */}
      <div class="hidden md:flex items-center space-x-1">
        {/* <a href="" class="py-5 px-3">Login</a> */}
        {account ? (
        <button href="" class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">{account}</button>
      ) : (
        <button href="" class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300" onClick={connectToWeb3}>Connect Wallet</button>
      )}
        
      </div>

      {/* <!-- mobile button goes here --> */}
      <div class="md:hidden flex items-center">
        <button class="mobile-menu-button">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

    </div>
  </div>

  {/* <!-- mobile menu --> */}
  <div class="mobile-menu hidden md:hidden">
    <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
    <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
  </div>
</nav>
  );
}

export default Navbar;
