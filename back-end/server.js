require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const jwt=require('jsonwebtoken')
const connectDB=require('./db/dbConnection')
const schema = require('./db/schema')
const Post=require('./db/Post')
const cookieParser=require('cookie-parser')
const multer=require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' });
const secret='fjesghzsjhdgkjhesjghaseheheshgag'
const fs=require('fs')
connectDB()
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.json())
app.use(cors({origin:'http://localhost:5173',
credentials:true}))
const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Backend is running');
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/test',(req,res)=>{                        
    res.json('Hello')
})
app.post('/register',async(req,res)=>{
    try {
        const{username,password}=req.body
    console.log(req.body)
    const newUser=schema({
        username:username,
        password:password
    })
    await newUser.save()
    res.status(201).json({message:'Registration successful'})
    } catch (error) {
        res.status(500).json({error:"registration failed"})
    }
})
app.post('/login', async (req, res) => {
    
        const { username, password } = req.body;
        console.log(req.body);
        const user = await schema.findOne({ username });
        if (!user) {
            return res.status(400).json('User not found');
          }
        if (password===user.password) {
            jwt.sign({username,id:user._id},secret,{},(error,token)=>{
                if(error) throw error;
                res.status(200).cookie('token',token).json({
                    id:user._id,
                    username
                })
            })
        }  
        else{
            res.status(401).json('wrong credentials')
        }
});
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });
  app.post('/logout', (req, res) => {
    res.cookie('token','').json('ok')
  
});
app.post('/post', uploadMiddleware.single('file'), (req, res) => {
    console.log(req.file, req.body);

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;

    jwt.verify(token, secret, async (err, info) => {
        if (err) {
            throw err;
        }

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });

        res.json(postDoc);
    });
});

app.get('/post',async(req,res)=>{
   const posts= await Post.find().
   populate('author',['username']);
   console.log(posts)
   res.json(posts)

})   
app.get("/post/:id",async(req,res)=>{
    const {id}=req.params
    const postDoc= await Post.findById(id).
    populate('author',['username']);
    res.json(postDoc)
})
app.delete("/post/:id",async(req,res)=>{
    const {id}=req.params
    const postDoc=await Post.findByIdAndDelete(id)
    res.json()
})