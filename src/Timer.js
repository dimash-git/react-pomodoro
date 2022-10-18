import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e'
const green = '#4ace8c'



function Timer(){
    const settingsInfo = useContext(SettingsContext) // break, work (mins); showSettings

    const [isPaused, setIsPaused] = useState(true)
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMins*60)
    const [mode, setMode] = useState('work') // work/break

    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)

    // isPaused - main trigger

    function tick(){
        secondsLeftRef.current--
        setSecondsLeft(secondsLeftRef.current)
        console.log(secondsLeftRef.current)
    }

    useEffect(()=> {
        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work'
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMins : settingsInfo.breakMins) * 60
            setMode(nextMode)
            modeRef.current = nextMode
    
            setSecondsLeft(nextSeconds)
            secondsLeftRef.current = nextSeconds
        }

        if (isPausedRef.current) {
            console.log('paused', isPausedRef.current)
            return
        }

        const interval = setInterval(() => { // if we use state variables in timers,
            // it won't work
            if (secondsLeftRef.current === 0) {
                console.log('2')
                return switchMode()
            }
            tick()
        }, 1000);

        return () => clearInterval(interval)
    }, [isPausedRef.current])

    const totalSeconds = mode === 'work' ? settingsInfo.workMins * 60 : settingsInfo.breakMins * 60
    const percentage = Math.round(secondsLeft/totalSeconds*100)

    const minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    if(seconds<10) seconds = '0' + seconds

    return (
        <div>
            <CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles({
            textColor:'#fff',
            pathColor:mode === 'work' ? red : green,
            tailColor:'rgba(255,255,255,.2)',
        })} />
            <div style={{marginTop: '20px'}}>
                {isPaused ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false}}/> : 
                <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true }}/>}
                
            </div>
            <div style={{marginTop: '20px'}}><SettingsButton onClick={newValue => settingsInfo.setShowSettings(true) }/></div>
        </div>
    );
}

export default Timer;