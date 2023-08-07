const express=require("express")
const mongoose=require("mongoose")
const app=express()
const path=require("path")
const cookieparser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const port=process.env.PORT || 2000

mongoose.connect("mongodb://127.0.0.1:27017", { dbname:"backend",
}).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
     console.log("Not connected")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
})

const message =mongoose.model("user", userSchema)

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.set("view engine","ejs");

const isAuthenticated = async(req,res, next)=>{
    const { token}=req.cookies;
    if(token){
        next();
        const decoded = jwt.verify(token, "jfkbkhbahvoh");
        req.user=await user.finById(decode._id);
        next();
    }else {
        res.render("login");
    }
};
app.get("/",isAuthenticated,(req,res)=>{
    res.render("logout");
})
// app.post("/login",(req,res)=>{
//     req.cookies("token","imin",{
//         httponly:true,expire:now Date(Date.now()+60*1000)
//     })
//     res.redirect("/")
   
// // })
// app.get("/success",(req,res)=>{
//     res.render("success");
// })

// app.get("/add",async(req,res)=>{
//     await message.create({name:"ABCD", email:"abcd@gmail.com" })
//         res.send("Nice") 
   
//})
app.post("/login",async(req,res)=>{
    const {name, email}=req.body;
    const user = await user.create({
        neme,
        email,
    });
    const token = jwt.sign({_id:user._id}, "hgfggwjbfg");
    console.log(token)
  res.cookie("token", user._id, {
    httponly:true,
    expire:new Date(Date.now()+60 *1000)
  })
    res.redirect("/");
});

app.get("/logout",(req, res)=>{
    res.cookie("token",  null,{
        httpOnly:true,
        expire:new Date(Date.now)
    })
})

app.listen(port,()=>{
    console.log(`Server is working ${port}`)
})