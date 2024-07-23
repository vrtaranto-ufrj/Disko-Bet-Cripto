export const contractAddress = "0xEE1e4B51be742C3651CB45E903e0e4f65EBF6b59";

export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "BetClosed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "claimWinnings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "closeBetting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_teamA",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_teamB",
				"type": "string"
			}
		],
		"name": "createMatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "WinningTeamSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "newBet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_team",
				"type": "uint8"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_winningTeam",
				"type": "uint8"
			}
		],
		"name": "setWinningTeam",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "betador",
				"type": "address"
			}
		],
		"name": "getBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "team",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "getMatch",
		"outputs": [
			{
				"internalType": "string",
				"name": "teamA",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "teamB",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "getTotalBets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalB",
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
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "betador",
				"type": "address"
			}
		],
		"name": "isClaimable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "can",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "isClosed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "closed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "matchCount",
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
		"name": "matches",
		"outputs": [
			{
				"internalType": "string",
				"name": "teamA",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "teamB",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalBetTeamA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalBetTeamB",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bettingClosed",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "winningTeam",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "odds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalBetTeamA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalBetTeamB",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];