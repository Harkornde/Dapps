// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Namings{
    string public fullName;

    constructor(string memory initialMessage) {
        fullName = initialMessage; 
    }

    function collectName(string memory newMessage) public {
        fullName = newMessage;
    }

    function returnFullName() public view returns (string memory) {
        return fullName;
    }
}