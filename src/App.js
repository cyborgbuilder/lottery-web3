import './App.css';
import React, { useState } from 'react';
import Clock from './Components/Clock';
import styled from 'styled-components'
import BtnText from './Components/BtnText';
import Winner from './Components/Winner';
import Nav from './Components/Nav';
import Man from './Components/Man';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Lottery from './Components/Contract/lotteryabi.json'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';



const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Lottery",
      infuraId: {3: "hhtps://ropsten.infura.io/v3/fefnefnesfe"}
    }
  }
}
function App() {

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
              cacheProvider: false,
              providerOptions
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
        stateValue = "CLOSED"
      }else{
        stateValue = "OPEN"
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

  const handleTransfer = async (e) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const lottery = new ethers.Contract("0x25369B7Bfe52e9df54c5A2Cb57F1fd1b717E93Ef", Lottery, signer);
    await lottery.enter();
  };
  return (
    <Container>
      <Navi>
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

      
    </Navi>
     <Clock 
     countdownTimestampMs={1670924221000}/>

    <PlayContainer>
        <h1>Lottery is <Gr>{contractInfo.stateValue}</Gr></h1>
        <h1>Pot Size <Or>{contractInfo.balance}</Or></h1>
        <button className='btn' onClick={handleTransfer}>PLAY</button>
    </PlayContainer>

    <WinnerContainer>
      <Box>
        <h2>Last Winner: </h2>
        <p>{contractInfo.lastWinner}</p>
      </Box>
    </WinnerContainer>

    <Man />
     
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Navi = styled.div`
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
const PlayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    z-index: 1;

    h1{
        margin: 10px 0;
        letter-spacing: 0.1rem;

        @media only screen and (max-width: 1200px){
          font-size: 25px;
      }
    }

    .btn{
      padding: 10px 30px;
    margin: 20px 0;
    font-weight: bold;
    font-size: 26px;
    letter-spacing: 0.1rem;
    border: none;
    outline: none;
    border-radius: 5px;
    background: #FFD649;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover{
      background: #ffd23f;
      color: #fff;
      transform: scale(1.1);
      cursor: pointer;
  }
    }

   
`


const Or = styled.span`
    color: #f7ab1e;

`

const Gr = styled.span`
    color: #63ff2f

`
const WinnerContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding-bottom: 40px;

`
const Box = styled.div`
    display: flex;
    flex-wrap: wrap;
    border: 4px solid #FFD649;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 20px;

    @media only screen and (max-width: 1200px){
      background: #f3efef;
      margin: 0 10px;
      justify-content: center;

  }
    h2{
        font-size: 18px;
        letter-spacing: 0.1rem;
        font-family: 'Overpass Mono', monospace;
        font-weight: normal;
        @media only screen and (max-width: 1200px){
          font-size: 14px;
          background: #eaeaea;
      }
        
    }

    P{
      color: #63ff2f;
      padding: 0 10px;

      @media only screen and (max-width: 1200px){
        font-size: 10px;
        margin: 5px 0;
    }
    }

`


export default App;
