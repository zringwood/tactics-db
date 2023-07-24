import './App.css'
import {BrowserRouter, Routes, Route, Navigate, NavLink} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'

function App() {
  return (
    <>
      <BrowserRouter>
      <NavLink to='/puzzle?category="middlegame"'>Middlegames</NavLink>
      <NavLink to='/puzzle?category="endgame"'>Endgames</NavLink>
      <Routes>
        <Route path = "/" element ={<Navigate to={`/puzzle/${Math.ceil(Math.random() * 3e6)}`}/>}/>
        <Route path="/puzzle/:id" element={<PuzzlePage />}/>
        <Route path="/puzzle" element={<PuzzlePage />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
