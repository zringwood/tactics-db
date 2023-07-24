import { NavLink } from 'react-router-dom'
import "../Header/Header.scss"
function Header({ ranges }) {
    return (
        <header className='navbar'>

            <NavLink className="navbar__link" to={`/middlegames/${Math.ceil(Math.random() * (ranges.endgames - 1))}`}><p className='navbar__text'>Middlegames</p></NavLink>


            <NavLink className="navbar__link" to={`/endgames/${Math.ceil(Math.random() * (ranges.middlegames - 1))}`}><p className='navbar__text'>Endgames</p></NavLink>


            <NavLink className="navbar__link" to={`/puzzle/${Math.ceil(Math.random() * (ranges.totalGames - 1))}`}><p className='navbar__text'>Either</p></NavLink>


        </header>
    )
}
export default Header