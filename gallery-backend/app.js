require('dotenv').config();
const express=require('express');
const cors=require('cors')

const app=express();
app.use(express.json());

app.use(cors());

app.get("/api/images",async(req,res)=>{
    try{
        const response=await fetch('https://api.pexels.com/v1/search?query=people',{
            headers:{
                Authorization:process.env.PEXEL_API_KEY
            }
        });
        if(!response.ok){
            return res.status(500).json({error:"failure"});
        }
        const data=await response.json();
        res.json(data.photos);
    }catch(error){
        res.status(500).json({error:"internal server error"});
    }
});

app.listen(3000,()=>{
    console.log('Server started');
})
