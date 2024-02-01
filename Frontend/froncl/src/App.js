import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./abi.json";

function App() {
  const [imput, UseImput] = useState("");
  const [colect, Usecolet] = useState("");

  function WhenChange(event) {
    const { value } = event.target;
    console.log(value);
    UseImput(value);
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = "0x23e474C90C9f37B6AF9dc17DFf5fF8A4264d3914";

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage(imput);
        await transaction.wait();
        console.log("THERE");
        UseImput(" ");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = "0x23e474C90C9f37B6AF9dc17DFf5fF8A4264d3914";

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        Usecolet(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <h1>Message Integrated</h1>
      <input type="text" value={imput} onChange={WhenChange} />

      <button
        onClick={() => {
          setMessage();
        }}
      >
        Set Message
      </button>
      <button
        onClick={() => {
          getMessage();
        }}
      >
        Get Message
      </button>
      <h2>Get Message: {colect}</h2>
    </div>
  );
}

export default App;
