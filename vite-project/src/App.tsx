import './App.css'
import '../../wwwroot/css/site.css'
import { Provider } from './components/ui/provider'
import MainPage from './Pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import ResultPage from './Pages/ResultPage'
import { useState } from 'react'
import AuthPage from './Pages/AuthPage'

function App() {
  const [searchResults, setSearchResults] = useState(null);
  
  return (
    <>
    <Provider>
      </Provider>
      <Routes>
            <Route path="/" element={<MainPage onChange={setSearchResults}/>} />
            <Route path="Result" element={<ResultPage results={searchResults}/>} />
            <Route path='Auth' element={<AuthPage/>}></Route>
      </Routes>
    </>
  )
}

export default App