import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<PuzzlePage />}/>
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
