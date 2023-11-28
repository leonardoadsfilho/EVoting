import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom'
import { ethers } from 'ethers';
import Layout from './pages/Layout'
import Home from './pages/Home'
import Vote from './pages/Vote'
import Results from './pages/Results'
import NotFound from './pages/NotFound'
import WalletContext from './Context/Wallet'

const App = () => {

  const [wallet, setWallet] = useState({address: '', cpf: '', balance: null})

  useEffect(() => {
    if (window.ethereum) {
        // res[0] for fetching a first wallet
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) =>
                accountChangeHandler(res[0])
            );
    } else {
        alert("install metamask extension!!");
    }
  }, [])

  const getbalance = async (address) => {
    // Requesting balance method

    let balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })

    if(balance)
      balance = ethers.utils.formatEther(balance)

    return balance
  };

  const accountChangeHandler = async (account) => {
    
    const balance = await getbalance(account);

    setWallet({
      address: account,
      balance: balance
    })
  };

  return (
    <WalletContext.Provider value={{wallet: wallet, setWallet: setWallet}}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="vote" element={<Vote />} />
          <Route path="results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </WalletContext.Provider>
  );
}

export default App;
