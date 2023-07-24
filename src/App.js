import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'
import Header from './components/Header/Header'
function App() {
  const ranges = {
    middlegames:1644191,
    endgames:1527915,
    totalGames: 3366499,
  }
  return (
    <>
      <BrowserRouter>
      <Header ranges = {ranges}/>
      <Routes>
        <Route path = "/" element ={<Navigate to={`/puzzle/${Math.ceil(Math.random() * 3e6)}`}/>}/>
        <Route path="/puzzle/:id" element={<PuzzlePage category= {"/puzzle"} categoryRange={ranges.totalGames}/>}/>
        <Route path="/middlegames/:id" element={<PuzzlePage category={"/middlegames"} categoryRange={ranges.middlegames-1}/>}/>
        <Route path="/endgames/:id" element={<PuzzlePage category={"/endgames"} categoryRange={ranges.endgames-1}/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
