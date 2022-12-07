import React, { useState } from 'react'
import styled from 'styled-components'

// import { init, mintToken } from './Web3Client';



function BtnText() {
  const [minted, setMinted] = useState(false);

  // const mint = () => {
  //   mintToken()
  //     .then((tx) => {
  //       console.log(tx);
  //       setMinted(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <Container>
        <h1>Lottery is <Gr>OPEN</Gr></h1>
        <h1>Pot Size <Or>$xxxx</Or></h1>
        <Button >PLAY</Button>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    z-index: 1000;

    h1{
        margin: 10px 0;
        letter-spacing: 0.1rem;

        @media only screen and (max-width: 1200px){
          font-size: 25px;
      }
    }
   
`
const Button = styled.button`
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
`

const Or = styled.span`
    color: #f7ab1e;

`

const Gr = styled.span`
    color: #63ff2f

`

export default BtnText
