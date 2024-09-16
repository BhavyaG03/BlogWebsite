import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { UserContextProvider } from './UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'

function App() {

  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <Layout></Layout>
      }>
   <Route index element={
    <IndexPage></IndexPage>
   }></Route>
   <Route path='/login' element={
   <LoginPage></LoginPage>}></Route>
   <Route path="/register" element={
   <RegisterPage></RegisterPage>}></Route>
   <Route path='/create' 
   element={<CreatePost></CreatePost>}></Route>
    <Route path='/post/:id' element={<PostPage></PostPage>}></Route>
   </Route>
   </Routes>
   </BrowserRouter>
   </UserContextProvider>
  )
}

export default App
