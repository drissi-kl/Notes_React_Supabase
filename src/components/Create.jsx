import { useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Create({refetch}){
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false)
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    


    const submitProcess = async (e) =>{
        e.preventDefault();
        setLoading(true)
        if(!title){
            setTitleError(true)
        }
        if(!description){
            setDescriptionError(true)
        }

        if(title && description){
            const post = {title, description};
    
            const response = await supabase.from('posts').insert([post]);
            if(response.status == 201){
                setTitle("");
                setDescription("");
                setMessage("create new post success");
                setTimeout(()=>{
                    setMessage("");
                    navigate("/");
                    refetch()
                }, 1000)
            }else {
                setMessage(response.error.message);
                setLoading(false)
            }
            console.log("response", response);
        }
        setLoading(false)
    }



    return <div>
        
        <h2>Create Post</h2>
        {message && <p>{message}</p>}
        <form onSubmit={(e)=>{submitProcess(e)}}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" onChange={(e)=> {setTitle(e.target.value); setTitleError(false)}} value={title} />
                {titleError && <p style={{color: "red"}}>title is required</p>}
            </div>
            <br />
            <div>
                <label htmlFor="title">Description:</label>
                <textarea onChange={(e)=> {setDescription(e.target.value); setDescriptionError(false)}} value={description} />
                {descriptionError && <p style={{color: "red"}}>description is required</p>}
            </div>
            <button type="submit" className="btn" disabled={loading} 
            style={loading?{backgroundColor: "#999"}:{backgroundColor: "#555"}}>
                { loading ? "Post...":"Post"}
            </button>
        </form>
    </div>
}