import React, { useState } from 'react';
import ElectionContract from '../../config/abi'
import { ethers } from 'ethers';
import './index.css'

const CandidateCard = (props) => {

    const RegisterVote = async () => {
        try {    
            if (window.ethereum) {
                window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((res) => {}
                    );
                
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const electionContract = new ethers.Contract(ElectionContract.ElectionContractAddress, ElectionContract.ElectionContractABI, signer)
                const transaction = electionContract.Vote(props.cpf, props.candidate[4])

                const response = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                      {
                        to: transaction.to,
                        gas: transaction.gasLimit.toHexString(),
                        gasPrice: transaction.gasPrice.toHexString(),
                        value: transaction.value.toHexString(),
                        data: transaction.data,
                      },
                    ],
                });

            } else {
                alert("install metamask extension!!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='CandidateCard' onClick={RegisterVote}>
            {props.candidate[1]}
        </div>
    )
}

export default CandidateCard