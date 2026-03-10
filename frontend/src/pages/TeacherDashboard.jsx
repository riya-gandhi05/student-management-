import { useNavigate } from "react-router-dom";

function TeacherDashboard(){

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

const handleLogout = ()=>{
localStorage.removeItem("user")
navigate("/")
}

const styles = {

dashboard:{
display:"flex",
height:"100vh",
color:"white"
},

sidebar:{
width:"220px",
background:"#1e1e2f",
padding:"20px",
display:"flex",
flexDirection:"column",
gap:"15px"
},

link:{
color:"white",
textDecoration:"none",
cursor:"pointer"
},

logout:{
marginTop:"20px",
padding:"10px",
background:"#ff4d6d",
border:"none",
color:"white",
cursor:"pointer",
borderRadius:"6px"
},

main:{
flex:1,
padding:"40px"
},

cards:{
display:"flex",
gap:"20px",
marginTop:"30px"
},

card:{
background:"white",
color:"black",
padding:"20px",
borderRadius:"10px",
width:"200px",
boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
}

}

return(

<div style={styles.dashboard}>

<div style={styles.sidebar}>

<h2>Teacher Panel</h2>

<a style={styles.link}>Dashboard</a>
<a style={styles.link}>Subjects</a>
<a style={styles.link}>Marks</a>
<a style={styles.link}>Attendance</a>

<button style={styles.logout} onClick={handleLogout}>
Logout
</button>

</div>


<div style={styles.main}>

<h1>Teacher Dashboard</h1>

<p>Welcome {user?.name}</p>

<div style={styles.cards}>

<div style={styles.card}>
<h3>Subjects</h3>
<p>Manage Subjects</p>
</div>

<div style={styles.card}>
<h3>Marks</h3>
<p>Enter Marks</p>
</div>

<div style={styles.card}>
<h3>Attendance</h3>
<p>Mark Attendance</p>
</div>

</div>

</div>

</div>

)

}

export default TeacherDashboard;