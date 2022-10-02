import axios from "axios"
import { useState } from "react"
import "./addedit.css"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const initialState = {
    name: "",
    email: "",
    country:"",
    contact:"",
}

export const AddEdit = () => {
    const[data, setData]=useState(initialState) 
    const {name,email,country,contact}= data
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(id){
            getSingleUser(id)
        }
    },[id])

    const getSingleUser = async(id)=>{
        const res= await axios.get(`http://localhost:5000/users/${id}`)
        if(res.status === 200){
            setData({...res.data})
        }
    }

    const createUser = async(data)=>{
        const res= await axios.post("http://localhost:5000/users",data)
        if(res.status === 200){
            toast.success(res.data)
        }
    }
    const updateUser = async(data,id)=>{
        const res= await axios.put(`http://localhost:5000/users/${id}`,data)
        if(res.status === 200){
            toast.success(res.data)
        }
    }
const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !email || !country || !contact){
        toast.error("please fill all the fields")       
        return
    }
    if(!id){
        createUser(data)    
    }
    else{
        updateUser(data,id)
    }
    navigate("/")
    window.location.reload()
    
}

const handleInputChange = (e)=>{
    const {name, value}= e.target
    setData({...data, [name]:value})
}
  return (
    <div  class="login">
        <form onSubmit={handleSubmit}>
            <div class="col">
            <label htmlFor="name"> Name</label>
            <input type="text"
            class="form-control"  
            id="name" 
            name="name" 
            placeholder="Enter a name:"
            onChange={handleInputChange}
            value={name}
            ></input>
            </div>
            <br/>
            <div >
            <label htmlFor="email" > E-mail</label>
            <input type="email" 
            class="form-control"  
            id="email" 
            name="email" 
            placeholder="Enter a email:"
            onChange={handleInputChange}
            value={email}
            ></input>
            </div>
            <br/>
            <div>
            <label htmlFor="country"> Country</label>
            <input type="text" 
            class="form-control"  
            id="country" 
            name="country" 
            placeholder="Enter a country:"
            onChange={handleInputChange}
            value={country}
            ></input>
            </div>
            <div>
            <br/>
            <label htmlFor="contact"> Contact</label>
            <input type="text" 
            class="form-control"  
            id="contact" 
            name="contact" 
            placeholder="Enter a contact:"
            onChange={handleInputChange}
            value={contact}
            ></input>
            </div>
            <br/>
            <input className="btn btn-success" type="submit" value={id ? "Update" : "Add"}></input>
        </form>
    </div>
    
    
  )
}
