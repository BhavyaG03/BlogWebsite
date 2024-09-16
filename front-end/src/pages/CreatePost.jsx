import React,{useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const API_URL=import.meta.env.VITE_API_URL;

const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']                                        
    ],
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];
  
const CreatePost = () => {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const[files,setFiles]=useState('')
  const[redirect,setRedirect]=useState(false)
  const createNewPost=async(e)=>{
    const data=new FormData()
    data.set('title',title)
    data.set('summary',summary)
    data.set('content',content)
    data.set('file',files[0])
    e.preventDefault()
    console.log(files)
    const response = await fetch(`${API_URL}/post`, {
        method: 'POST',
        body: data,
        credentials:'include',
    });
    if (response.ok) {
        setRedirect(true)
    }
  }
  if (redirect) {
    return <Navigate to={'/'}/>
  }
  return (
    <div>
        <form onSubmit={createNewPost}>
   <input type='title' placeholder='Title' value={title}
   onChange={e=>setTitle(e.target.value)}></input>
   <input type='summary' placeholder='Summary'
   value={summary} onChange={e=>setSummary(e.target.value)}></input>
   <input type='file' onChange={e=>setFiles(e.target.files)}></input>
   <ReactQuill value={content} 
   onChange={newValue=>setContent(newValue)} 
   modules={modules} formats={formats}></ReactQuill>
   <button style={{marginTop:'5px'}}>Create Post</button>
   </form>
    </div>
  )
}

export default CreatePost