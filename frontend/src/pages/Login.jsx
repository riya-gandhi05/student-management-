import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleLogin = async(e)=>{
e.preventDefault()

const response = await fetch("http://localhost:4000/api/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
})

const data = await response.json()

if(data.status===1){

localStorage.setItem("user",JSON.stringify(data.data))

if(data.data.role==="teacher"){
navigate("/teacher")
}

else if(data.data.role==="student"){
navigate("/student")
}

else if(data.data.role==="admin"){
navigate("/admin")
}

}else{
alert("Invalid Login")
}

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

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
style={styles.input}
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
style={styles.input}
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button style={styles.button}>Login</button>

</form>

<p style={{marginTop:"10px"}}>

No account? <a href="/register">Register</a>

</p>

</div>

</div>

)

}

export default Login