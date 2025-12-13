import { useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import "../style/create.css"

export default function Create({refetch}){
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [state, setState]=useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const states = ["personal","education","work","projects","ideas"];
    const handleState = (st) =>{
        console.log('new state', st);
        
        if(state.includes(st)){
            setState(state.filter(s => s != st))
        }else{
            setState([...state, st])
        }
    }
   


    const submitProcess = async (e) =>{
        e.preventDefault();
        setLoading(true)
        if(!title || !description){
            setMessage("title and description are required for create a Note 😊")
        }
        
        if(title && description){
            const {data, error} = await supabase.auth.getUser()
            if(data){
                const user_id = data.user.id;
                const note = {title, description, state, user_id};
                
                const response = await supabase.from('notes').insert([note]);
                if(response.status == 201){
                    setTitle("");
                    setDescription("");
                    refetch();
                    navigate("/notes");
                }else {
                    setMessage(response.error.message);
                    setLoading(false);
                }
            }
            if(error){
                setMessage(error.message);
            }
        }

        setLoading(false);
 
    }



    return <div className="createNote">
        <div className="createNoteContainer">
            <h2 className="title">Create Note</h2>
            <form onSubmit={(e)=>{submitProcess(e)}}>
                <div className="input">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={(e)=> {setTitle(e.target.value); setMessage('')}} value={title} />
                </div>
                <div className="input">
                    <label htmlFor="title">Description:</label>
                    <textarea onChange={(e)=> {setDescription(e.target.value); setMessage('')}} value={description} />
                </div>
                <div className="states">
                    {
                        states.map((st)=>{return <div className="state" key={st}> 
                            <input type="checkbox" id={st} onChange={()=>{handleState(st)}}/>
                            <label htmlFor={st} >{st}</label>
                        </div>})
                    }
      
                </div>

                {message && <p className="error">{message}</p>}
                <button type="submit" className="createBtn" disabled={loading} 
                style={loading?{backgroundColor: "#999"}:{backgroundColor: "#555"}}>
                    { loading ? "Loading...":"Create Note"}
                </button>
            </form>
        </div>
    </div>
}