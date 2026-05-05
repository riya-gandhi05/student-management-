const userModel = require("./models/user.model");

module.exports = (app) => {

app.post("/api/register", async (req,res)=>{

    try{

        const {name,email,password,role} = req.body;

        const user = new userModel({
            name,
            email,
            password,
            role
        });

        await user.save();

        res.send({
            status:1,
            message:"User registered"
        });

    }catch(err){

        res.send({
            status:0,
            message:"Registration failed"
        });

    }

});


app.post("/api/login", async (req,res)=>{

    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){

        return res.send({
            status:0,
            message:"User not found"
        });

    }

    if(user.password !== password){

        return res.send({
            status:0,
            message:"Wrong password"
        });

    }

    res.send({
        status:1,
        message:"Login successful",
        data:user
    });

});

};
// added file
//added the file
