import React, { useState } from 'react';
import CandidateCard from '../../components/CandidateCard';
import './index.css'
import ElectionContract from '../../config/abi';
import ReactLoading from 'react-loading'
import { ethers } from 'ethers';

const Results = () => {

    const [erroV, setErroV] = useState('')
    const [candidates, setCandidates] = useState([])
    const [electionOpen, setElectionOpen] = useState(false)
    const [electionName, setElectionName] = useState(null)
    const [cpf, setCpf] = useState('')
    const [vot, setVot] = useState(false)
    const [waiti, setWaiti] = useState(false)

    const getcand = async () => {

        if(!cpf){
            if(!cpf){
                setErroV('fill the cpf field')
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
                const electionNameResponse = await electionContract.election_name()
                const candidatesResponse = await electionContract.GetCandidates()
                const electionOpenResponse = await electionContract.votation_time();
                
                setElectionName(electionNameResponse)
                setCandidates(candidatesResponse)
                setElectionOpen(electionOpenResponse)
                setVot(true)
            } else {
                alert("install metamask extension!!");
            }
        } catch (error) {
            console.log(error);
            try {
                setErroV(error.error.message)   
            } catch (er) {
                setErroV(`${er}`)
            }
        }   

        setWaiti(false)
    }

    const printCandidates = (event) => {
        
        let rows = []
        for(let i in candidates){
            console.log(i);
            rows.push(
                <CandidateCard key={i} candidate={candidates[i]} cpf={cpf} setErroVote={setErroV} setWaitir={setWaiti}/>
            )
        }
        return rows        
    }

    const handleCPFChange = (event) => {
        if(event.target.value){
            setErroV('')
            setCpf(event.target.value)
        }        
    }

    return (
        <div className='vote-page'>
            <div className='vote-form options'>
                <div className='input'>
                    CPF <input type='text' onChange={handleCPFChange} value={cpf}/>
                </div>
                <div className='input input-center'>
                    <div className='vote-title'>
                        <button className='vote-button' onClick={getcand}>Vote</button>
                    </div>
                </div>
                {
                    vot &&
                    <>
                        <div className='vote-title'>
                            Election {electionName}
                        </div>
                        <div style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
                            {waiti ? <ReactLoading type='spin' color={'#0049d1'} height={30} width={30}></ReactLoading> : <></>}
                        </div>
                        {
                            printCandidates()
                        }
                    </>
                }
                <div className='vote-erro' style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
                    {erroV}
                </div>
            </div>
        </div>
    );
}

export default Results;