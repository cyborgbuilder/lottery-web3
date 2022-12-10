import {useState, useEffect} from 'react';
import {getRemainingTimeUntilMsTimestamp} from './ClockUtils';
import styled from 'styled-components'

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const Clock = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <Container>
            <Slot>
            <h1>{remainingTime.days} </h1>
            <p>Dys</p>
            </Slot>
            <Slot>
                <h2>:</h2>
            </Slot>
            <Slot>
            <h1 className="two-numbers">{remainingTime.hours} </h1>
            <p>Hrs</p>
            </Slot>
            <Slot>
                <h2>:</h2>
            </Slot>
            <Slot>
            <h1 className="two-numbers">{remainingTime.minutes} </h1>
            <p>Min</p>
            </Slot>

            <Slot>
                <h2>:</h2>
            </Slot>

            <Slot>
            <h1 className="two-numbers">{remainingTime.seconds}</h1> 
            <p>Sec</p>
            </Slot>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;


    

`

const Slot = styled.div`
    width: 100px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 1200px){
        width: 100px;

    }



    @media only screen and (max-width: 1200px){
        margin: 10px;
    }
    span{

        margin: 10px 0;
        align-items: center;
        justify-content: center;

        @media only screen and (max-width: 1200px){
            font-size: 33px;
        }
    }

    h2{
        font-size: 50px;

        @media only screen and (max-width: 1200px){
            font-size: 20px;
        }
    }
    h1{
        font-size: 100px; 

        @media only screen and (max-width: 1200px){
            font-size: 37px;
        }
    }
    p{
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Overpass Mono', monospace;

        @media only screen and (max-width: 1200px){
            font-size: 18px;
        }
    }
    .two-numbers{
        width: 2ch;
    }
`

export default Clock;