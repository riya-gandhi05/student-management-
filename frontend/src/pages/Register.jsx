import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [role,setRole]=useState("student")

const navigate=useNavigate()

const handleRegister=async(e)=>{

e.preventDefault()

await fetch("http://localhost:4000/api/register",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
email:email,
password:password,
role:role

})

})

alert("Registered Successfully")

navigate("/")

}

const styles={

page:{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh"
},

box:{
background:"white",
padding:"40px",
borderRadius:"10px",
width:"300px"
},

input:{
width:"100%",
padding:"10px",
marginTop:"10px"
},

button:{
marginTop:"20px",
width:"100%",
padding:"10px",
background:"purple",
color:"white",
border:"none"
}

}

return(

<div style={styles.page}>

<div style={styles.box}>

<h2>Register</h2>

<form onSubmit={handleRegister}>

<input
style={styles.input}
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
style={styles.input}
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
style={styles.input}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<select
style={styles.input}
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option value="student">Student</option>
<option value="teacher">Teacher</option>
<option value="admin">Admin</option>

</select>

<button style={styles.button}>Register</button>

</form>

</div>

</div>

)

}

export default Register