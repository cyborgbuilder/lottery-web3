import { ethers } from 'ethers'
import React, { useState } from 'react'
import styled from 'styled-components'
import Web3Modal from 'web3modal'

function Nav() {

    const [web3Provider, setWeb3Provider] = useState(null);

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
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Container>
      <img src='./images/logo.png' />

      {web3Provider == null ? (
        <button onClick={connectWallet}>Connect</button>
      ) : (
        <Connect>
            <h1>Connected</h1>
            {/* <p>{web3Provider.provider.selectedAddress}</p> */}
        </Connect>
      )}
      
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 1200px){
        height: 60px;
    }

    img{
        width: 10%;
        height: 100%;

        @media only screen and (max-width: 1200px){
            width: 20%;
            height: 100%;
        }
    }

    button{
        margin: 10px;
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

export default Nav
