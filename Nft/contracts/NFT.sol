// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nft is ERC721{
    constructor () ERC721("BoredApe","BAYC"){
        _safeMint(address(this),0);
    }

    //extend the internal mint function
    function safeMint(address to) external{
        _safeMint(to,1);
    }

    //safe transfer for testing
    function transferForTesting() external{
        address owner = ownerOf(0);
        _transfer(owner,tx.origin, 0);
    }
}

contract GateKeep is Ownable{

    // constructor(address nftAdress){
    //     theNft = Nft(nftAdress);
    // }
    //the 2 different contents
    string contentNftOwners = "Content"; 
    string contentNftIdOwner = "Content ID owner";

    Nft theNft;
    //function modifier checking if the NFT is defined and present
    modifier checkNftOwner(){
        require(address(theNft)!= address(0),"Address not set");
        require(theNft.balanceOf(msg.sender) >0, "The required NFT is not present" );
        _;
    }

    //display content
    function showContentNftOwners() checkNftOwner() external view returns(string memory){
        return theNft.ownerOf(0) == msg.sender? contentNftIdOwner : contentNftOwners;
    }

    function setNft(address nftAddress) onlyOwner() external{
        theNft = Nft(nftAddress); 
    }

    function getNft() external view returns(address){
        return address(theNft); 
    }


    //Testing functions ---> 

    //mint NFT to the user
    function mintNft() external{
        theNft.safeMint(msg.sender);
    }

    //transfer the 0 ID NFT to the msg.sender
    function transferNft() external{
        theNft.transferForTesting();
    }
}