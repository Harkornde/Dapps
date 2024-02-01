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
      const contractAddress = "0x76c0c8d78acb2464d8a42daf22c66714e90e0b34";

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage(colect);
        await transaction.wait();
        console.log("THERE");
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
      const contractAddress = "0x76c0c8d78acb2464d8a42daf22c66714e90e0b34";

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        Usecolet(transaction);
        console.log(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Message Integrated</h1>
        <input className="input-box" type="text" value={imput} onChange={WhenChange} />

        <button
          className="button"
          onClick={() => {
            setMessage();
          }}
        >
          Set Message
        </button>
        <button
          className="button"
          onClick={() => {
            getMessage();
          }}
        >
          Get Message
        </button>
        <h2>Get Message: {colect}</h2>
      </div>
    </div>
  );
}

export default App;
