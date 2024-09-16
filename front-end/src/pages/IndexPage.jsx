import React,{useEffect, useState} from 'react'
import Post from '../Post'

const API_URL=import.meta.env.VITE_API_URL;

const IndexPage = () => {
    const[posts,setPosts]=useState([])
    useEffect(() => {
      fetch(`${API_URL}/post`).then(response=>{
        response.json().then(posts=>{
            console.log(posts);
            setPosts(posts)
        })
      })
    }, [])
    
  return (
    <>
        {
           posts.length>0 && posts.map(post=>(
            <Post {...post}></Post>
           ))
        }
    </>
  )
}

export default IndexPage