import React, { useEffect, useState } from 'react';
import './index.css'
import ElectionContract from '../../config/abi'
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'

const Vote = () => {

    const [cpf, setCpf] = useState('')
    const [age, setAge] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [erro, setErro] = useState('')
    const [waiti, setWaiti] = useState(false)

    const nav = useNavigate()

    const handleClick = async () => {
        if(!cpf || !age || !state || !city){
            if(!cpf){
                setErro('fill the cpf field')
                return
            }

            if(!age){
                setErro('fill the age field')
                return
            }

            if(!state){
                setErro('fill the state field')
                return
            }

            if(!city){
                setErro('fill the city field')
                return
            }
            
        }

        setWaiti(true)

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
                const electionOpenResponse = await electionContract.votation_time();

                if(electionOpenResponse.toNumber() > 0){
                    throw {error: {message: 'Election is already open. Registration Disabled.'}}
                }

                const transaction = await electionContract.RegisterVoter(cpf, age, state, city)

                await transaction.wait()
                
                nav('/Results')
            } else {
                alert("install metamask extension!!");
            }
        } catch (error) {
            console.log(error);
            try {
                setErro(error.error.message)   
            } catch (er) {
                setErro(`${er}`)
            }
        }    
        
        setWaiti(false)
    }
    
    const handleCPFChange = (event) => {
        if(event.target.value){
            setErro('')
            setCpf(event.target.value)
        }        
    }

    const handleAgeChange = (event) => {
        if(event.target.value){
            setErro('')
            setAge(event.target.value)
        }    
    }

    const handleStateChange = (event) => {
        if(event.target.value){
            setErro('')
            setState(event.target.value)
        }    
    }

    const handleCityChange = (event) => {
        if(event.target.value){
            setErro('')
            setCity(event.target.value)
        }    
    }

    return (
        <div className='vote-page'>
            <div className='vote-form'>
                <h2>Register</h2>
                <div className='input'>
                    CPF <input type='text' onChange={handleCPFChange} value={cpf}/>
                </div>
                <div className='input'>
                    Age <input type='text' onChange={handleAgeChange} value={age}/>
                </div>
                <div className='input'>
                    State <input type='text' onChange={handleStateChange} value={state}/>
                </div>
                <div className='input'>
                    City <input type='text' onChange={handleCityChange} value={city}/>
                </div>
                <div className='vote-erro'>
                    {erro}
                </div>
                <div className='input input-center'>
                    <div type='button' className='vote-button' onClick={handleClick}>
                        {waiti ? <ReactLoading type='spin' color={'#FAFAFA'} height={30} width={30}></ReactLoading> : 'Register'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vote;