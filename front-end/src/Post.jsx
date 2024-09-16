import React, { useContext } from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'
import { RiDeleteBin4Fill } from "react-icons/ri";
import { UserContext } from './UserContext';

const API_URL=import.meta.env.VITE_API_URL;

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
  const {userInfo}=useContext(UserContext)
  const deletePost=async(id)=>{
    const response=await fetch(`${API_URL}/post/${id}`,{
      method:'DELETE',

    })
    if (response.status !== 200) {
      throw new Error('Failed to delete post');
    }
    window.location.reload()
  }
  return (
    <div>
         <div className='post'>
      <div className="image">
        <Link to={`post/${_id}`}>
          <img src={'http://localhost:8000/'+cover} alt="" className='img' />
        </Link>
    </div>
    <div className="texts">
      <Link to={`post/${_id}`}>
        <h2>{title}</h2>
      </Link>
    <p className='info'>
    <a href="" className="author">{author ? author.username : 'Unknown'}</a>
    <time>{formatISO9075( new Date(createdAt))}</time>
    </p>
    <p className='summary'>{summary}</p>
    {
  (userInfo?.id === author?._id) && 
  <RiDeleteBin4Fill size={30} onClick={() => deletePost(_id)} />
}

       </div>

    </div>
    </div>
  )
}

export default Post