import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element ={<Navigate to={`/${Math.ceil(Math.random() * 3e6)}`}/>}/>
        <Route path="/:id" element={<PuzzlePage />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
