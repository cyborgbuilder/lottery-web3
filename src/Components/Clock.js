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
            <span>{remainingTime.days} </span>
            <p>Dys</p>
            </Slot>
            <Slot>
                <p>:</p>
            </Slot>
            <Slot>
            <span className="two-numbers">{remainingTime.hours} </span>
            <p>Hrs</p>
            </Slot>
            <Slot>
                <p>:</p>
            </Slot>
            <Slot>
            <span className="two-numbers">{remainingTime.minutes} </span>
            <p>Min</p>
            </Slot>

            <Slot>
                <p>:</p>
            </Slot>
            <Slot>
            <span className="two-numbers">{remainingTime.seconds} </span>
            <p>Sec</p>
            </Slot>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    

`

const Slot = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1200px){
        margin: 10px;
    }
    span{
        font-size: 60px;
        margin: 10px 0;
        align-items: center;
        justify-content: center;

        @media only screen and (max-width: 1200px){
            font-size: 33px;
        }
    }
    p{
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        @media only screen and (max-width: 1200px){
            font-size: 20px;
        }
    }
    .two-numbers{
        width: 2ch;
    }
`

export default Clock;