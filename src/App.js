import "./App.css";
import React, { useState, useEffect } from "react";
import { Moralis } from "moralis";
import { contractABI, contractAddress } from "./web3/contract";
import Contract from "./web3/contract";

function App() {
  const [nftOwners, setNftOwners] = useState();
  const [userAddress, setAddress] = useState();
  //   connect to Moralis server
  const serverUrl = "https://zd5qd2rg1qcy.usemoralis.com:2053/server";
  const appId = "jyejaXjVH60qgOtTfYv4eoNWEzXkTJbMsdXxxrCV";
  let user;
  Moralis.start({ serverUrl, appId });

  async function login() {
    user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate();
      setAddress(user.attributes.ethAddress);
    }
    console.log("logged in user:", user);
  }

  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  async function getNFTOwners() {
    const result = await Contract.methods
      .showContentNftOwners()
      .call({ from: userAddress });
    console.log(result);
     setNftOwners(result)
  }

  async function mintToken() {
    const result = await Contract.methods
      .mintNft()
      .send({ from: userAddress, gas: 0x00, gasPrice: 0x00 })
      .then((receipt) => console.log(receipt));
    console.log(result);
    setNftOwners(result)
  }

  async function transferNFT() {
    const result = await Contract.methods
      .transferNft()
      .send({ from: userAddress, gas: 0x00, gasPrice: 0x00 })
      .then((receipt) => console.log(receipt));
    console.log(result);
    setNftOwners(result)
  }

  const getNFTsFunction = async () => {
    const options = {
      chain: "rinkeby",
      address: userAddress,
    };

    try {
      await Moralis.Web3API.account.getNFTs(options).then(async (res) => {
        console.log(res.result);
      });
    } catch (error) {
      console.log(error);
      console.log("could not load nfts!");
    }
  };

  return (
    <div className="App">
      <button onClick={login}>Log in</button>
      <button onClick={logOut}>Log out</button>
      <button onClick={getNFTOwners}>Get NFT Owners</button>
      <button onClick={mintToken}>Mint NFT</button>
      <button onClick={transferNFT}>Transfer NFT</button>
      <button onClick={getNFTsFunction}>Get User NFTs</button>
      {nftOwners && <p>{nftOwners}</p>}
    </div>
  );
}

export default App;