import Post from "./Item";


export default function Home({posts, refetch}){
    const pattren = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/gi;

    return <div>
        <h2>All Posts:</h2>

        <div className="showPosts">
            {
                posts && posts.map((post)=>{return <Post key={post.id} post={post} refetch={()=>refetch()} /> })
            }
            
        </div>

    </div>
}