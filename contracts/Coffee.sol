// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Coffee {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Memo {
        address from;
        string name;
        string message;
        uint256 timestamp;
    }

    Memo[] memos;

    function byCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "Please pay more than 0");
        owner.transfer(msg.value);
        memos.push(Memo(msg.sender, _name, _message, block.timestamp));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
