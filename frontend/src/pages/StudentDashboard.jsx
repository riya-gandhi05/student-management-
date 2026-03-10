import { useNavigate } from "react-router-dom";

function StudentDashboard(){

const navigate=useNavigate()

const user=JSON.parse(localStorage.getItem("user"))

const handleLogout=()=>{

localStorage.removeItem("user")

navigate("/")

}

const styles={

dashboard:{display:"flex",height:"100vh",color:"white"},

sidebar:{width:"200px",background:"#1e1e2f",padding:"20px"},

main:{flex:1,padding:"40px"},

card:{
background:"white",
color:"black",
padding:"20px",
marginTop:"20px",
borderRadius:"10px"
}


}

return(

<div style={styles.dashboard}>

<div style={styles.sidebar}>

<h2>Student</h2>

<p>Dashboard</p>
<p>Subjects</p>
<p>Marks</p>
<p>Attendance</p>

<button onClick={handleLogout}>Logout</button>

</div>

<div style={styles.main}>

<h1>Student Dashboard</h1>

<p>Welcome {user?.name}</p>

<div style={styles.card}>
<h3>My Subjects</h3>
</div>

<div style={styles.card}>
<h3>My Marks</h3>
</div>

<div style={styles.card}>
<h3>Attendance</h3>
</div>

</div>

</div>

)

}

export default StudentDashboard