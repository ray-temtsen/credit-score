// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CreditScore {
    struct UserCreditInfo {
        uint256 transactionVolume;
        uint256 walletBalance;
        uint256 transactionFrequency;
        uint256 transactionMix;
        uint256 newTransactions;
        uint256 creditScore;
    }

    mapping(address => UserCreditInfo) public userCreditInfo;

    function updateTransactionVolume(address _user, uint256 _volume) public {
        userCreditInfo[_user].transactionVolume = _volume;
        updateCreditScore(_user);
    }

    function updateWalletBalance(address _user, uint256 _balance) public {
        userCreditInfo[_user].walletBalance = _balance;
        updateCreditScore(_user);
    }

    function updateTransactionFrequency(address _user, uint256 _frequency) public {
        userCreditInfo[_user].transactionFrequency = _frequency;
        updateCreditScore(_user);
    }

    function updateTransactionMix(address _user, uint256 _mix) public {
        userCreditInfo[_user].transactionMix = _mix;
        updateCreditScore(_user);
    }

    function updateNewTransactions(address _user, uint256 _newTransactions) public {
        userCreditInfo[_user].newTransactions = _newTransactions;
        updateCreditScore(_user);
    }

    function updateCreditScore(address _user) internal {
        UserCreditInfo storage user = userCreditInfo[_user];
        user.creditScore = uint256(300 + 
            (user.transactionVolume * 35 / 100) + 
            (user.walletBalance * 30 / 100) + 
            (user.transactionFrequency * 15 / 100) + 
            (user.transactionMix * 10 / 100) + 
            (user.newTransactions * 10 / 100));
    }

    function getCreditScore(address _user) public view returns (uint256) {
        return userCreditInfo[_user].creditScore;
    }
}
