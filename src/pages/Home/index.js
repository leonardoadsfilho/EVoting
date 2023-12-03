import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers'
import './index.css'
import ElectionContract from '../../config/abi';
import ReactLoading from 'react-loading'
import CandidateCardR from '../../components/CandidateCardR';

const Home = () => {

    const [candidates, setCandidates] = useState([])
    const [electionOpen, setElectionOpen] = useState(false)
    const [electionName, setElectionName] = useState(null)
    const [erroV, setErroV] = useState('')
    const [waiti, setWaiti] = useState(true)

    useEffect(() => {
        const getData = async () => {
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
                    const electionOpenResponse = await electionContract.votation_time()
                    
                    setElectionName(electionNameResponse)
                    setCandidates(candidatesResponse)
                    setElectionOpen(electionOpenResponse)
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

        getData().catch(
            console.error
        )
    }, [])

    const printData = () => {
        let row = []

        let high = 0
        
        if(candidates.length > 0){

            row.push(
                <div className='vote-title'>
                    Election {electionName}
                </div>
            )

            for(let i in candidates){

                let colo = '#0049d1'
                let bord = '#1e00af'

                if(high < candidates[i][6].toNumber() && i > 0){
                    high = candidates[i][6].toNumber()
                    colo = '#39b168'
                    bord = '#fffb00'
                }

                row.push(
                    <CandidateCardR key={i} candidate={candidates[i]} colo={colo} bord={bord}/>
                )
            }
        }

        return(row)
    }

    return (
        <div className='vote-page'>
            <div className='vote-formH'>                
                {
                    printData()
                }
                {waiti ? <ReactLoading type='spin' color={'#0049d1'} height={30} width={30}></ReactLoading> : <></>}
            </div>
        </div>
    );
}

export default Home;