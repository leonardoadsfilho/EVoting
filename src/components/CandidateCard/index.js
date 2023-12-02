import React, { useEffect, useState } from 'react';
import ElectionContract from '../../config/abi'
import { ethers } from 'ethers';
import './index.css'

const CandidateCard = (props) => {

    const [colo, setColo] = useState(`#${Math.floor(Math.random()*16777215).toString(16)}`)

    const RegisterVote = async () => {

        props.setWaitir(true)
        
        try {    
            if (window.ethereum) {
                window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((res) => {}
                    );
                
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const electionContract = new ethers.Contract(ElectionContract.ElectionContractAddress, ElectionContract.ElectionContractABI, signer)
                const transaction = await electionContract.Vote(props.cpf, props.candidate[4])

                await transaction.wait()

            } else {
                alert("install metamask extension!!");
            }
        } catch (error) {
            console.log(error);
            props.setErroVote(error.error.message)
        }

        props.setWaitir(false)
    }
    
    return (
        <div className='CandidateCard' onClick={RegisterVote} style={{backgroundColor: colo}}>
            <div className='CandidateName'>
                {props.candidate[1]}
            </div>
            <div className='CandidateInfo'>
                {props.candidate[2]}
            </div>
            <div className='CandidateNumber'>
                {props.candidate[4]}
            </div>
        </div>
    )
}

export default CandidateCard