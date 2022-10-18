import ReactSlider from 'react-slider'
import './slider.css'
import SettingsContext from './SettingsContext'
import { useContext } from 'react'
import BackButton from './BackButton'


function Settings(params) {
    const settingsInfo = useContext(SettingsContext)
    return (
        <div style={{textAlign: 'left'}}>
            <label>Work: {settingsInfo.workMins}:00</label>
            <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value = {settingsInfo.workMins}
            min={1}
            max={120}
            onChange={newValue => settingsInfo.setWorkMins(newValue)}
            />
            <label>Break: {settingsInfo.breakMins}:00</label>
            <ReactSlider
            className={'slider green'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value = {settingsInfo.breakMins}
            min={1}
            max={120}
            onChange={newValue => settingsInfo.setBreakMins(newValue)}
            />
            <div style={{textAlign: 'center', marginTop: '20px'}}>
            <BackButton onClick={newValue => settingsInfo.setShowSettings(false)} />
            </div>
        </div> 
    )
}

export default Settings