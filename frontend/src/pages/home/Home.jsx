import axios from "axios";
import { useState,useEffect  } from "react";
import { Link } from "react-router-dom";
import "./home.css"


export const Home = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    getUsers()
  },[])

   const getUsers=async () =>{
    const res = await axios.get("http://localhost:5000/users")
    if(res.status === 200 ){
        setData(res.data)
    }
   }
 const onDelete = async (id) =>{
    if(window.confirm("Are you sure")){
    const res = await axios.delete(`http://localhost:5000/users/${id}`)
    if(res.status ===200){
        getUsers()
    }
}
 }
  return (
    <div >
        <table class="table" >
            <thead >
               <tr>
                <th scope="col">No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Contact</th>
                <th>Action</th>
                </tr> 
            </thead>
        
        <tbody  >
            {data && data.map((user,index)=>(
                <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.contact}</td>
                <td>
                  <div className="buttons"> 
                      <Link to={`/view/${user.id}`}>
                        <button className="btn btn-success">View</button>
                        </Link>
                      <Link to={`/update/${user.id}`}>
                      <button className="btn btn-warning">Edit</button>
                      </Link>
                      <button className="btn btn-danger" onClick={()=> onDelete(user.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}
