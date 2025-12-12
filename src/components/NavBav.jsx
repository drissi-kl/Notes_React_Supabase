import { Link, Outlet } from "react-router-dom"
import "../style/navbar.css"

export default function NavBar(){

    return <nav>
        <div className="navbar">
            <div className="leftSide">
                 <p className="logo">PostDR</p>
                <Link to="/" className="option" >Home</Link>
                <Link to="/create" className="option" >Create</Link>
            </div>
            <div>
                <button>Log in</button>
                <button>Sign up</button>
            </div>

        </div>


        <Outlet />
        
    </nav>
}