import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {formatISO9075} from 'date-fns'

const API_URL=import.meta.env.VITE_API_URL;

const PostPage = () => {
    const{id}=useParams()
    const [postInfo, setPostInfo] = useState(null)
    useEffect(() => {
      fetch(`${API_URL}/post/${id}`).
      then(response=>{response.json().then(postInfo=>{setPostInfo(postInfo)})})
    
    }, [])
    if (!postInfo) {
        return ''
    }
  return (
    <div className='postCard'>
        <div className="image">
            <img src={`${API_URL}/${postInfo.cover}`} alt="" className="img" />
        </div>
        <div className="texts">
            <h1 className="writer">{postInfo.title}</h1>
        </div> 
        <div className="this" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    </div>
  )
}

export default PostPage