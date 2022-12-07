import './App.css';
import Clock from './Components/Clock';
import styled from 'styled-components'
import BtnText from './Components/BtnText';
import Winner from './Components/Winner';
import Nav from './Components/Nav';
import Man from './Components/Man';

function App() {
  return (
    <Container>
      <Nav />
     <Clock 
     countdownTimestampMs={1670553087000}/>
     <BtnText />
     <Winner />
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

export default App;
