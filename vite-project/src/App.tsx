import './App.css'
import '../../wwwroot/css/site.css'
import { Provider } from './components/ui/provider'
import MainPage from './Pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import ResultPage from './Pages/ResultPage'
import { useState } from 'react'
import TrackManager from '../../wwwroot/js/trackManager'
import TrackManagerContext, { useTrackManager} from './contexts/TrackManagerContext'

const trackManager = new TrackManager();

function App() {
  const [searchResults, setSearchResults] = useState(null);
  
  return (
    <>
    <Provider>
      </Provider>
      <Routes>
        <TrackManagerContext.Provider value={trackManager}>
            <Route path="/" element={<MainPage onChange={setSearchResults}/>} />
            <Route path="Result" element={<ResultPage results={searchResults}/>} />
        </TrackManagerContext.Provider>
      </Routes>
    </>
  )
}

export default App