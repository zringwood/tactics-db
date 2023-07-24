import './App.css'
import {BrowserRouter, Routes, Route, Navigate, NavLink} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'

function App() {
  const numberOfMiddlegames = 1644191
  const numberOfEndgames = 1527915
  const totalNumberofGames = 3366499
  return (
    <>
      <BrowserRouter>
      <NavLink to={`/middlegames/${Math.ceil(Math.random() * (numberOfEndgames-1))}`}>Middlegames</NavLink>
      <NavLink to={`/endgames/${Math.ceil(Math.random() * (numberOfMiddlegames-1))}`}>Endgames</NavLink>
      <NavLink to={`/puzzle/${Math.ceil(Math.random() * (totalNumberofGames-1))}`}>Either</NavLink>
      <Routes>
        <Route path = "/" element ={<Navigate to={`/puzzle/${Math.ceil(Math.random() * 3e6)}`}/>}/>
        <Route path="/puzzle/:id" element={<PuzzlePage category= {"/puzzle"} categoryRange={totalNumberofGames}/>}/>
        <Route path="/middlegames/:id" element={<PuzzlePage category={"/middlegames"} categoryRange={numberOfMiddlegames-1}/>}/>
        <Route path="/endgames/:id" element={<PuzzlePage category={"/endgames"} categoryRange={numberOfEndgames-1}/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
