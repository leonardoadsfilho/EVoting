import React, { useContext, useEffect, useState } from 'react';
import './index.css'
import WalletContext from '../../Context/Wallet';
import ElectionContract from '../../config/abi'
import { ethers, utils } from 'ethers';
import CandidateCard from '../../components/CandidateCard'

const Vote = () => {

    const { wallet } = useContext(WalletContext)
    const [contract, setContract] = useState('')
    const [electionName, setElectionName] = useState(null)
    const [candidates, setCandidates] = useState([])
    const [cpf, setCpf] = useState('')
    const [age, handleAgeChange] = useState('')
    const [state, handleStateChange] = useState('')
    const [city, handleCityChange] = useState('')
    const [registered, setRegistered] = useState(false)
    const [erro, setErro] = useState('')

    const handleClick = async () => {
        try {    
            if (window.ethereum) {
                // res[0] for fetching a first wallet
                window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((res) => {}
                    );

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const electionContract = new ethers.Contract(ElectionContract.ElectionContractAddress, ElectionContract.ElectionContractABI, signer)
                const electionNameResponse = await electionContract.election_name()
                const candidatesResponse = await electionContract.GetCandidates()
                
                setCandidates(candidatesResponse)
                setElectionName(electionNameResponse)
                const transaction = await electionContract.RegisterVoter('123', 123, 'MG', 'Belo-Horizonte')

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

                setRegistered(true)
            } else {
                alert("install metamask extension!!");
            }
        } catch (error) {
            console.log(error.error.message);
            setErro(error.error.message)
        }      
    }

    useEffect(() => {
        if(erro == 'execution reverted: Este endereco ja esta registrado.'){
            setRegistered(true)
        }
    }, [erro])

    const handleContractAddressChange = (event) => {
        setContract(event.target.value)
    }
    
    const handleCPFChange = (event) => {
        setCpf(event.target.value)
    }

    const printCandidates = () => {
        
        let rows = []
        for(let i in candidates){
            rows.push(
                <CandidateCard key={i} candidate={candidates[i]} cpf={cpf} />
            )
        }
        return rows        
    }

    return (
        <div className='vote-page'>
            <div className='vote-form'>
                <h2>Register</h2>
                <div className='input'>
                    Contract Address <input type='text' onChange={handleContractAddressChange} value={contract}/>
                </div>
                <div className='input'>
                    CPF <input type='text' onChange={handleCPFChange} value={cpf}/>
                </div>
                <div className='input'>
                    Age <input type='text' onChange={() => handleAgeChange()} value={age}/>
                </div>
                <div className='input'>
                    State <input type='text' onChange={() => handleStateChange()} value={state}/>
                </div>
                <div className='input'>
                    City <input type='text' onChange={() => handleCityChange()} value={city}/>
                </div>
                {erro}
                <div className='input input-center'>
                    <div type='button' className='vote-button' onClick={handleClick}>
                        Register
                    </div>
                </div>
            </div>
            {
                electionName &&
                <div className='vote-form'>
                    Election Name: {electionName}
                    {
                        registered ? printCandidates() : ''
                    }
                </div>
            }            
        </div>
    );
}

export default Vote;