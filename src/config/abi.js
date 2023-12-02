const ElectionContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_election_name",
				"type": "string"
			},
			{
				"internalType": "enum Election.ElectionLevel",
				"name": "_election_level",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vice",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "age",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "number",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "votes",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "is_alive",
						"type": "bool"
					}
				],
				"indexed": false,
				"internalType": "struct Election.Candidate[]",
				"name": "result",
				"type": "tuple[]"
			}
		],
		"name": "ElectionResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "menssage",
				"type": "string"
			}
		],
		"name": "Notify",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "EndElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vice",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "age",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "number",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "votes",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "is_alive",
						"type": "bool"
					}
				],
				"internalType": "struct Election.Candidate[]",
				"name": "candidates_array",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vice_name",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "age",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "number",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "party",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			}
		],
		"name": "RegisterCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "age",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			}
		],
		"name": "RegisterVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SelfDestruct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "new_election_name",
				"type": "string"
			}
		],
		"name": "SetElectionName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "StartElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "Vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vice",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "age",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "number",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "party",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "is_alive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidates_count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cooldown_ElectionResult",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "election_level",
		"outputs": [
			{
				"internalType": "enum Election.ElectionLevel",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "election_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "is_election_open",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "last_emit_ElectionResult",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "number_to_id_candidate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votation_time",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const ElectionContractAddress = '0x582d80897CDA4e8342323b86448DAF75e5F82AAB'
const WalletPrivateKey = '0xe3524cc2274fddd4da0a9911f36bad0a518ca6e1f1e706f57442163c7221b401'

const ElectionContract = { 
	ElectionContractABI, 
	ElectionContractAddress 
}

export default ElectionContract