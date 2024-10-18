// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract Belgium is ERC721A{

    address public owner;
    uint256 public max = 5;
    string baseUrl = "https://gateway.pinata.cloud/ipfs/QmScunxFfAVPvS9twDvFsRs672caCApYLd9Rgdj4eQfJZz";
    
    string public prompt =
        "A Formula 1 car racing around spa Francorchamps";

    constructor() ERC721A("Belgium", "GMG") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Owner should call this function");
        _;
    }

    function mint(uint256 quantity) external payable onlyOwner{
        require(totalSupply() + quantity <= max ,"Highest Number mintable is 5");
        _mint(msg.sender, quantity);
    }


    function _baseURI() internal view override returns (string memory){
        return baseUrl;
    }

    function promptDescription() external view returns (string memory) {
        return prompt;
    }
}
