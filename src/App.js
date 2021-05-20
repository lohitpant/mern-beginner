import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [food,setFood]=useState("")
  const [days, setDays]=useState(0);
  const [foodList, setFoodList]=useState([])
  const [newFoodName, setNewFoodName]=useState("")

  useEffect(()=>{
    Axios.get("https://mern-beginnerss.herokuapp.com/read").then((response)=>{
      setFoodList(response.data)
      console.log(response);
    })
  },[])

  const addToList=()=>{
    Axios.post("https://mern-beginnerss.herokuapp.com/insert", {      
      foodName:food,
      days:days
    })
  }

  const updateFood=(id)=>{
    Axios.put("https://mern-beginnerss.herokuapp.com/update", {
      id:id,
      newFoodName:newFoodName
    })
  }

  const deleteFood=(id)=>{
    Axios.delete(`https://mern-beginnerss.herokuapp.com/delete/${id}`)
  }

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input type="text" onChange={(e)=>setFood(e.target.value)} />
      <label>Days Since You Ate It:</label>
      <input type="number" onChange={(e)=>setDays(e.target.value)} />
      <button onClick={addToList}>Add To DB</button>
      <hr/>
      <h1>Food List</h1>
        {foodList.map((val, key)=>(
          <div key={key} className="food">
            {val.foodName} Ate since {val.daysSinceIAte} days
            <button onClick={()=>deleteFood(val._id)}>Delete</button>
            <input type="text" placeholder="Type New Food Name Here..." onChange={(e)=>setNewFoodName(e.target.value)} />
            <button onClick={()=>updateFood(val._id)}>Update</button>
            </div>
        ))}
    </div>
  );
}

export default App;
