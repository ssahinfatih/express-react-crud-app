import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './view.css'
export const View = () => {
    const [user, setUser] = useState({})
    const {id}=useParams()
    const getSingleUser = async(id)=>{
        const res= await axios.get(`http://localhost:5000/users/${id}`)
        if(res.status === 200){
            setUser({...res.data})
        }
    }

    useEffect(() => {
      if(id){
        getSingleUser(id)
      }
    

    }, [id])
    
  return (
    <div className='view'>
    <div className="viev-item">
        <b>ID: </b> <span>{user.id}</span><br/>
        <b>Name: </b> <span>{user.name}</span><br/>
        <b>Email: </b> <span>{user.email}</span><br/>
        <b>Country: </b> <span>{user.country}</span><br/>
        <b>Contact: </b> <span>{user.contact}</span><br/>
    </div>
    <div>
       <Link to={`/update/${user.id}`}><button className="btn btn-warning">Edit</button></Link> 
       <Link to="/" ><button className="btn btn-danger">Back</button></Link> 
    </div>

    </div>
  )
}
