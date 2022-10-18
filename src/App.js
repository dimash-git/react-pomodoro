// import logo from './logo.svg';
import './App.css';
import Timer from './Timer';
import Settings from './Settings';
import {useState} from 'react'
import SettingsContext from './SettingsContext';

// custom dependencies

function App() {

  const [showSettings, setShowSettings] = useState(false)
  const [workMins, setWorkMins] = useState(45)
  const [breakMins, setBreakMins] = useState(15)
  
  return (
      <main>
        <SettingsContext.Provider value={{
          workMins,
          breakMins,
          setBreakMins,
          setWorkMins,
          showSettings,
          setShowSettings
        }}>
        {showSettings ? <Settings/> : <Timer/>}
        </SettingsContext.Provider>
      </main>
  );
}

export default App;
