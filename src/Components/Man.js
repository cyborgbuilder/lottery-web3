import React from 'react'
import styled from 'styled-components'

function Man() {
  return (
    <Container>
      <img src='./images/man.png' />
    </Container>
  )
}

const Container = styled.div`
    width: 22%;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 0;

    @media only screen and (max-width: 1200px){
        width: 60%;
    }

    img{
        width: 100%;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover{
          transform: scale(1.05);
          cursor: pointer
      }
    }


`

export default Man
