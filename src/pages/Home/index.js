import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers'
import WalletContext from '../../Context/Wallet';
import './index.css'

const Home = () => {

    const { wallet } = useContext(WalletContext)

    return (
        <div className='vote-page'>
            <div className='vote-form'>

            </div>
        </div>
    );
}

export default Home;