import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers'
import WalletContext from '../../Context/Wallet';
import './index.css'

const Home = () => {

    const { wallet } = useContext(WalletContext)

    return (
        <div className='home'>
            <p>Address: {wallet.address}</p>
            <p>Balance: {wallet.balance}</p>
        </div>
    );
}

export default Home;