import { Link, Outlet } from "react-router-dom"
import "../style/navbar.css"

export default function NavBar(){

    return <nav>
        <div className="navbar">
            <p className="logo">PostDR</p>
            <div className="options">
                <Link to="/" className="option" >Home</Link>
                <Link to="/create" className="option" >Create</Link>
            </div>
        </div>


        <Outlet />
        
    </nav>
}