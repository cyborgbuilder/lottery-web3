import { ethers } from 'ethers'
import React, { useState } from 'react'
import styled from 'styled-components'
import Web3Modal from 'web3modal';
import Lottery from './Contract/lotteryabi.json'

function Nav() {

    const [web3Provider, setWeb3Provider] = useState(null);

    const [contractInfo, setContractInfo] = useState({
        address: "-",
        owner: "-",
        EntranceFee: "-",
        lastWinner: "-",
        stateValue: "-",
        balance: "-"
      });
    async function connectWallet(){
        try{
            let web3modal = new Web3Modal({
                cacheProvider: false
            });
            const web3modalInstance = await web3modal.connect();
            const web3modalProvider = new ethers.providers.Web3Provider(web3modalInstance);
            if(web3modalProvider){
                setWeb3Provider(web3modalProvider)
            }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        const lottery = new ethers.Contract("0x25369B7Bfe52e9df54c5A2Cb57F1fd1b717E93Ef", Lottery, provider);
    
        const owner = await lottery.owner();
        const lastWinner = await lottery.s_recentWinner();
        const EntranceFee = await lottery.getEntranceFee();
        const stateLottery = await lottery.s_lotteryState();
        const balance = await provider.getBalance("0x25369B7Bfe52e9df54c5A2Cb57F1fd1b717E93Ef");
        var stateValue = "";
        if(stateLottery == 1){
          stateValue = "Open"
        }else{
          stateValue = "Closed"
        }

        setContractInfo({
            address: "0x25369B7Bfe52e9df54c5A2Cb57F1fd1b717E93Ef",
            owner,
            EntranceFee,
            lastWinner,
            stateValue,
            balance: String(balance)

          });
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Container>
      <Logo>
      <img src='./images/logo.png' />
      </Logo>

      {web3Provider == null ? (
        <button onClick={connectWallet}>Connect</button>
      ) : (
        <Connect>
            <h1>Connected</h1>
            {/* <p>{web3Provider.provider.selectedAddress}</p> */}
        </Connect>
      )}

      <h1>{contractInfo.lastWinner}</h1>
      
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 1200px){
        height: 80px;
        margin-bottom: 50px;
    }



    button{
        width: 120px;
        height: 50px;
        padding: 0 20px;
        border: none;
        outline: none;
        font-size: 18px;
        border-radius: 5px;
        color: #63ff2f;
        border: 3px solid #FFD649;
        background: #fff;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover{
            background: #FFD649;
            color: black;
            transform: scale(1.1);
            cursor: pointer;
        }
    }

    h1{
        margin:  10px;
        font-size: 22px;
        color: #63ff2f;
    }

    p{
        font-size: 12px;
        margin: 0 10px;
    }

`

const Connect = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Logo = styled.div`
    width: 100px;
    height: 100%;

    img{
        width: 70%;
        height: 90%;

        @media only screen and (max-width: 1200px){
            width: 70%;
            height: 90%;
        }
    }

`
export default Nav
