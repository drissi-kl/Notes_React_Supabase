import Note from "./Note";

import "../style/home.css";

export default function Home({notes, refetch}){
    // const pattren = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/gi;

    return <div className="home">
    
        <div className="notes">
            {
                notes && notes.map((note)=>{return <Note key={note.id} note={note} refetch={()=>refetch()} /> })
            }
            
        </div>

    </div>
}