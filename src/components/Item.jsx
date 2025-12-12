import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";

export default function Post({post, refetch}){

    const pattren = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/gi;

    const deletePost = async () => {
        const response = await supabase.from('posts').delete().eq("id", post.id);
        if(response.status === 204){
            refetch()
        }

        console.log('handle delete', response);
    }

    return <div className="post">
            <h3>title: {post.title}</h3>
            <p>description: {post.description}</p>
            <p>created_at: {post.created_at.match(pattren) }</p>
            <div className="actions">
                <Link to={`/update/${post.id}`}  >
                    <button>update</button>
                </Link>
                <button onClick={deletePost}>delete</button>
            </div>
        </div>
}