import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById('connectButton');
const teamAbutton = document.getElementById('teamAButton');
const teamBbutton = document.getElementById('teamBButton');
const claimButton = document.getElementById('claimButton');
const popupPanel = document.getElementById('popup-panel');
const popup = document.getElementById('popup');
connectButton.onclick = connect;
teamAbutton.onclick = betTeamA;
teamBbutton.onclick = betTeamB;
claimButton.onclick = claim;




async function getTeams(matchID) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const match = await contract.getMatch(matchID);
            document.getElementById('teamAButton').innerHTML = match.teamA;
            document.getElementById('teamBButton').innerHTML = match.teamB;
            document.getElementById('nameteamA').innerHTML = match.teamA;
            document.getElementById('nameteamB').innerHTML = match.teamB;
            return match;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log(error);
        } finally {
            connectButton.innerHTML = 'Conectado';
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);
            popup.classList.add("deslizar");
            popupPanel.classList.add("clarear");
            setTimeout(() => {
                popup.classList.remove("deslizar");
                popup.style.marginTop = "100%"
                popupPanel.classList.remove("clarear");
                popupPanel.style.backgroundColor = "rgba(0, 0, 0, 0)"
                popupPanel.style.pointerEvents = "none";
            }, 1350);
        }
    } else {
        alert("Por favor, instale o MetaMask");
    }
}

async function betTeamA() {
    bet(1);
}

async function betTeamB() {
    bet(2);
}

async function claim() {
    if (typeof window.ethereum !== 'undefined') {
        const matchId = document.getElementById('matchId').value;
        /*const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.claimWinnings(contractAddress);
        console.log(ethers.utils.formatEther(balance));*/
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const transactionResponse = await contract.claimWinnings(matchId);
    }
}

bet

async function bet(teamBet) {
    const ethAmount = document.getElementById('ethAmount').value;
    const matchId = document.getElementById('matchId').value;
    console.log(`Funding ${ethAmount} ETH`);
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.placeBet(matchId, teamBet, {
                value: ethers.utils.parseEther(ethAmount),
            });
            await listenForTransactionMine(transactionResponse, provider);
        } catch (error) {
            console.log(error);
        }

        //const transactionResponse = await contract.claimWinnings(1)

    }
}

function listenForTransactionMine(transactionResponse, provider) {
    const ethAmount = document.getElementById('ethAmount').value;
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Console with ${transactionReceipt.confirmations} confirmations`
            );
            getAmountBetted()
            resolve();
            checkIsClaimable();
        });
    })

}

async function getAmountBetted() {
    const matchId = document.getElementById('matchId').value;
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const amountBetted = await contract.getBet(matchId, accounts[0]);
            console.log(amountBetted);
            const match = await getTeams(matchId);
            const team = amountBetted.team == 1 ? match.teamA : amountBetted.team == 2 ? match.teamB : 'None';

            document.getElementById('amountBetted').innerHTML = `Você apostou ${ethers.utils.formatEther(amountBetted.amount.toString())} DSK no ${team}`;

        } catch (error) {
            console.log(error);
        }
    }
}

async function checkIsClosed() {
    const matchId = document.getElementById('matchId').value;
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const isClosed = await contract.isClosed(matchId);
            document.getElementById('isClosed').innerHTML = isClosed ? 'A bet está fechada' : 'A bet está aberta!';
            document.getElementById('ethAmount').disabled = isClosed;
        } catch (error) {
            console.log(error);
        }
    }

}

async function checkIsClaimable() {
    const matchId = document.getElementById('matchId').value;
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const isClaimable = await contract.isClaimable(matchId, accounts[0]);
            if (isClaimable) {
                document.getElementById('claimButton').disabled = false;
            }
            else {
                document.getElementById('claimButton').disabled = true;
            }
            document.getElementById('isClaimable').innerHTML = isClaimable ? 'Você pode receber seus ganhos!' : 'Você não tem o que receber';

        } catch (error) {
            console.log(error);
        }
    }
}



async function getOdds() {
    const matchId = document.getElementById('matchId').value;
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const odds = await contract.odds(matchId);
            //ethers.utils.formatEther(amountBetted.amount.toString())
            const oddA = ethers.utils.formatEther(odds[0].toString());
            const oddB = ethers.utils.formatEther(odds[1].toString());
            const total = parseFloat(oddA) + parseFloat(oddB);
            if (oddA == 0) {
                document.getElementById('oddsA').innerHTML = `Chances: 0`;
            } else {
                document.getElementById('oddsA').innerHTML = `Chances: ${total / parseFloat(oddA)}`;
            }
            if (oddB == 0) {
                document.getElementById('oddsB').innerHTML = `Chances: 0`;
            } else {
                document.getElementById('oddsB').innerHTML = `Chances: ${total / parseFloat(oddB)}`;
            }


        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    listenToEvents();
    const matchInput = document.getElementById('matchId');

    matchInput.addEventListener('input', (event) => {
        const matchID = event.target.value;
        if (matchID) {
            checkIsClaimable();
            checkIsClosed()
            getTeams(matchID);
            getAmountBetted();
            getOdds();
        }
    });

    // Adicionando event listener ao botão de conexão
    const connectButton = document.getElementById('connectButton');
    connectButton.addEventListener('click', connect);
});

async function listenToEvents() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Listener para o evento BetClosed
        contract.on("BetClosed", (event) => {
            console.log("BetClosed triggered");
            checkIsClosed();
        });

        contract.on("WinningTeamSet", (event) => {
            console.log("WinningTeamSet triggered");
            checkIsClaimable();
        });

        contract.on("newBet", (event) => {
            console.log("newBet triggered");
            getOdds();
        });

        console.log("Listening for events...");
    } else {
        console.error("Ethereum provider not found");
    }
}