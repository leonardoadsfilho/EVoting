import React, { useEffect, useState } from 'react';
import ElectionContract from '../../config/abi'
import { ethers } from 'ethers';
import './index.css'

const CandidateCardR = (props) => {
    
    const [colo, setColo] = useState(props.colo)

    return (
        <div className='CandidateCardR' style={{backgroundColor: colo, borderColor: props.bord}}>
            <div className='CandidateName'>
                {props.candidate[1]}
            </div>
            <div className='CandidateInfo'>
                {props.candidate[2]}
            </div>
            <div className='CandidateInfo'>
                {props.candidate[4]}
            </div>
            <div className='CandidateInfo'>
                {props.candidate[5]}
            </div>
            <div className='CandidateNumber'>
                {props.candidate[6].toNumber()}
            </div>
        </div>
    )
}

export default CandidateCardR