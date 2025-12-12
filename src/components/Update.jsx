import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate, useParams } from "react-router-dom";

export default function Upadate({refetch, posts}){
    const navigate = useNavigate();
    const params = useParams();

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false)
    const [message, setMessage] = useState('');
    const {id} = params;


    useEffect(()=>{
        const fetchPost = async () =>{
            const response = await supabase.from('posts').select().eq("id", id).single();
            
            if(response.status == 200){
                const data = response.data;
                setTitle(data.title);
                setDescription(data.description);
            }
        }
        fetchPost()

        // const post = posts.find((post)=>{return post.id == id})
        // console.log(post)
        // if(post){
        //     setTitle(post.title);
        //     setDescription(post.description);
        // }else{
        //     setMessage("this post not exists, check from this post :>)")
        // }

    }, [id])


    const submitProcess = async (e) =>{
        e.preventDefault();
        if(!title){
            setTitleError(true)
        }
        if(!description){
            setDescriptionError(true)
        }

        if(title && description){
            const post = {title, description};
    
            const response = await supabase.from('posts').update([post]).eq("id", id);
            if(response.status == 204){
                setTitle("");
                setDescription("");
                setMessage("update post success");
                setTimeout(()=>{
                    setMessage("");
                    navigate("/");
                    refetch()
                }, 1000)
            }
            console.log("response", response);
        }
    }



    return <div>
        
        <h2>Update Post</h2>
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
            <button type="submit">save update</button>
        </form>
    </div>
}