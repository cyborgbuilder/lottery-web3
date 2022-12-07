import React from 'react'
import styled from 'styled-components'

function Winner() {
  return (
    <Container>
      <Box>
        <h2>Last Winner: </h2>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </Box>
    </Container>
  )
}
const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding-bottom: 40px;

`
const Box = styled.div`
    display: flex;
    border: 4px solid #FFD649;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 20px;

    @media only screen and (max-width: 1200px){
      background: #f3efef;
  }
    h2{
        font-size: 22px;
        letter-spacing: 0.1rem;

        @media only screen and (max-width: 1200px){
          font-size: 16px;
          background: #eaeaea;
      }
        
    }

`

export default Winner
