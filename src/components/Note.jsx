import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";

export default function Note({note, refetch}){

    const pattren = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/gi;

    const deleteNote = async () => {
        const response = await supabase.from('notes').delete().eq("id", note.id);
        if(response.status === 204){
            refetch()
        }

        console.log('handle delete', response);
    }

    return <div className="note">
            <p className="title">{note.title}</p>
            <p className="description">{note.description}</p>
            <div className="states">
                
            </div>
            <p className="created_at">created at {note.created_at.match(pattren) }</p>
            <div className="actions">
                <Link to={`/update/${note.id}`}  >
                    <button className="updateBtn">update</button>
                </Link>
                <button className="deleteBtn" onClick={deleteNote}>delete</button>
            </div>
        </div>
}