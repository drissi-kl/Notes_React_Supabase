import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import "../style/navbar.css"
import supabase from "../supabase";
import { useEffect, useState } from "react";

export default function NavBar(){
    useEffect(()=>{
        const protectedRoutes = async ()=>{
                const { data, error  } = await supabase.auth.getUser();
                // console.log("session", data);
                if(data){
                    setLoading(false);
                }
                if(error ){
                    navigate("/");
                }
        };
        protectedRoutes();
    }, []);

    const navigate = useNavigate();
    const location = useLocation()
    let pathname = location.pathname;

    const [loading, setLoading] = useState(true);
    const handleLogout = async () => {
        
        let { error } = await supabase.auth.signOut();
        if(error){
            console.log(error);
        }else{
            navigate('/');
        }
    }






    return <nav>
        {
            loading ? <h1>loading</h1>
            :<>
                <div className="navbar">
                    <div className="leftSide">
                        <p className="logo">Note</p>
                        <Link to="/notes" className={pathname == "/notes"?"option active":"option"} >Home</Link>
                        <Link to="/notes/create" className={pathname == "/notes/create"?"option active":"option"} >Create</Link>
                    </div>
                    <div className="rightSide">
                        <button className="logoutBtn" onClick={()=>handleLogout()}>Log out</button>
                    </div>
                </div>
                <Outlet />
            </>
        }
        
    </nav>
}