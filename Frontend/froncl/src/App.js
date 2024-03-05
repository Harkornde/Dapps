import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./abi.json";

function App() {
  const [imput, setInput] = useState("");
  const [colect, setColet] = useState("");

  const contractAddress = "0x5DA65fA47AbdB0fCA8f8616E343732698C2c146C";

  function WhenChange(event) {
    const { value } = event.target;
    setInput(value); //imput = value
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setName() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.collectName(imput);
        await transaction.wait();
        console.log(imput);
        setInput("");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function returnMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.returnFullName();
        setColet(transaction);
        // console.log(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  // async function returnMessage() {
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();

  //     const contracts = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       signer
  //     );

  //     try {
  //       const transaction = contracts.returnFullNam;
  //       console.log(transaction);
  //       console.log("message retrieved successful");
  //     } catch (err) {
  //       console.error("Error:", err);
  //     }
  //   }
  // }

  return (
    <div className="App">
      <div className="container">
        <h1>Name Input</h1>
        <input
          placeholder="Full Name"
          className="input-box"
          type="text"
          value={imput}
          onChange={WhenChange}
        />

        <button
          className="button"
          onClick={() => {
            setName();
          }}
        >
          Save Name
        </button>
        <button className="button" onClick={returnMessage}>
          Check Name
        </button>
        <h2>Get Message: {colect}</h2>
      </div>
    </div>
  );
}

export default App;
