// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract DiskoBet {
    event BetClosed();
    event WinningTeamSet();
    event newBet();

    struct Bet {
        uint amount;
        uint8 team; // 1 for Team A, 2 for Team B
    }

    struct Match {
        string teamA;
        string teamB;
        uint totalBetTeamA;
        uint totalBetTeamB;
        bool bettingClosed;
        uint8 winningTeam; // 0: not decided, 1: team A, 2: team B
        mapping(address => Bet) bets;
    }

    mapping(uint => Match) public matches;
    uint public matchCount;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier matchExists(uint matchId) {
        require(bytes(matches[matchId].teamA).length > 0, "Match does not exist.");
        _;
    }

    modifier whenBettingOpen(uint matchId) {
        require(!matches[matchId].bettingClosed, "Betting is closed for this match.");
        _;
    }

    function createMatch(string memory _teamA, string memory _teamB) external onlyOwner {
        matchCount++;
        Match storage newMatch = matches[matchCount];
        newMatch.teamA = _teamA;
        newMatch.teamB = _teamB;
        newMatch.totalBetTeamA = 0;
        newMatch.totalBetTeamB = 0;
        newMatch.bettingClosed = false;
        newMatch.winningTeam = 0;
    }

    function placeBet(uint matchId, uint8 _team) external payable matchExists(matchId) whenBettingOpen(matchId) {
        require(msg.value > 0, "You must bet some amount.");
        require(_team == 1 || _team == 2, "Invalid team selected.");

        Match storage currentMatch = matches[matchId];
        Bet storage userBet = currentMatch.bets[msg.sender];

        if (userBet.amount > 0) {
            // User is changing their bet
            if (userBet.team == 1) {
                currentMatch.totalBetTeamA -= userBet.amount;
            } else {
                currentMatch.totalBetTeamB -= userBet.amount;
            }
        }

        userBet.amount += msg.value;
        userBet.team = _team;

        if (_team == 1) {
            currentMatch.totalBetTeamA += userBet.amount;
        } else {
            currentMatch.totalBetTeamB += userBet.amount;
        }
        
        emit newBet();
    }

    function closeBetting(uint matchId) external onlyOwner matchExists(matchId) whenBettingOpen(matchId) {
        matches[matchId].bettingClosed = true;
        emit BetClosed();
    }

    function setWinningTeam(uint matchId, uint8 _winningTeam) external onlyOwner matchExists(matchId) {
        Match storage currentMatch = matches[matchId];
        require(currentMatch.bettingClosed, "Betting is still open for this match.");
        require(_winningTeam == 1 || _winningTeam == 2, "Invalid team selected.");
        currentMatch.winningTeam = _winningTeam;
        emit WinningTeamSet();
    }

    function claimWinnings(uint matchId) external matchExists(matchId) {
        Match storage currentMatch = matches[matchId];
        require(currentMatch.bettingClosed, "Betting is still open for this match.");
        require(currentMatch.winningTeam > 0, "Winning team not set.");

        Bet storage userBet = currentMatch.bets[msg.sender];
        require(userBet.amount > 0, "You did not place a bet.");
        require(userBet.team == currentMatch.winningTeam, "Your team did not win.");

        uint totalWinningBets = (currentMatch.winningTeam == 1) ? currentMatch.totalBetTeamA : currentMatch.totalBetTeamB;
        uint totalLosingBets = (currentMatch.winningTeam == 1) ? currentMatch.totalBetTeamB : currentMatch.totalBetTeamA;

        uint userWinnings = userBet.amount + (userBet.amount * totalLosingBets / totalWinningBets);

        // Reset user bet
        userBet.amount = 0;

        // Transfer winnings
        payable(msg.sender).transfer(userWinnings);
    }

    function getTotalBets(uint matchId) external view matchExists(matchId) returns (uint totalA, uint totalB) {
        Match storage currentMatch = matches[matchId];
        return (currentMatch.totalBetTeamA, currentMatch.totalBetTeamB);
    }

    function getMatch(uint matchId) external view matchExists(matchId) returns (string memory teamA, string memory teamB) {
        Match storage currentMatch = matches[matchId];
        return (currentMatch.teamA, currentMatch.teamB);
    }

    function getBet(uint matchId, address betador) external view matchExists(matchId) returns (uint amount, uint8 team) {
        Match storage currentMatch = matches[matchId];
        return (currentMatch.bets[betador].amount, currentMatch.bets[betador].team);
    }

    function isClosed(uint matchId) external view matchExists(matchId) returns (bool closed) {
        Match storage currentMatch = matches[matchId];
        return currentMatch.bettingClosed;
    }

    function isClaimable(uint matchId, address betador) external view matchExists(matchId) returns (bool can) {
        Match storage currentMatch = matches[matchId];
        return currentMatch.winningTeam == currentMatch.bets[betador].team && currentMatch.winningTeam != 0 && currentMatch.bets[betador].amount != 0;
    }

    function odds(uint matchId) external view matchExists(matchId) returns (uint totalBetTeamA, uint totalBetTeamB) {
        Match storage currentMatch = matches[matchId];
        return (currentMatch.totalBetTeamA, currentMatch.totalBetTeamB);
    }
}
