const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const PORT=process.env.PORT || 3003;
const uri=process.env.MONGO_URL;
const {HoldingsModel}=require('./models/HoldingsModels');
const {PositionsModel}=require('./models/PositionsModel');
const { SignupModel } = require('./models/SignupModels');

const app=express();
app.use(cors());
app.use(bodyParser());
app.use(express.json())

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    }); // CONNECTING MONGOOSE WITH CLUSTER

// app.get("/addHoldings",async(req,res)=>{
//     const tempHoldings=[{
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//       },
//       {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//       },
//       {
//         name: "HINDUNILVR",
//         qty: 1,
//         avg: 2335.85,
//         price: 2417.4,
//         net: "+3.49%",
//         day: "+0.21%",
//       },
//       {
//         name: "INFY",
//         qty: 1,
//         avg: 1350.5,
//         price: 1555.45,
//         net: "+15.18%",
//         day: "-1.60%",
//         isLoss: true,
//       },
//       {
//         name: "ITC",
//         qty: 5,
//         avg: 202.0,
//         price: 207.9,
//         net: "+2.92%",
//         day: "+0.80%",
//       },
//       {
//         name: "KPITTECH",
//         qty: 5,
//         avg: 250.3,
//         price: 266.45,
//         net: "+6.45%",
//         day: "+3.54%",
//       },
//       {
//         name: "M&M",
//         qty: 2,
//         avg: 809.9,
//         price: 779.8,
//         net: "-3.72%",
//         day: "-0.01%",
//         isLoss: true,
//       },
//       {
//         name: "RELIANCE",
//         qty: 1,
//         avg: 2193.7,
//         price: 2112.4,
//         net: "-3.71%",
//         day: "+1.44%",
//       },
//       {
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: true,
//       },
//       {
//         name: "SGBMAY29",
//         qty: 2,
//         avg: 4727.0,
//         price: 4719.0,
//         net: "-0.17%",
//         day: "+0.15%",
//       },
//       {
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: true,
//       },
//       {
//         name: "TCS",
//         qty: 1,
//         avg: 3041.7,
//         price: 3194.8,
//         net: "+5.03%",
//         day: "-0.25%",
//         isLoss: true,
//       },
//       {
//         name: "WIPRO",
//         qty: 4,
//         avg: 489.3,
//         price: 577.75,
//         net: "+18.08%",
//         day: "+0.32%",
//       },
//     ];
//     tempHoldings.forEach((item)=>{
//         const newHolding=new HoldingsModel({
//             name:item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         })
//         newHolding.save();
//     })
//     res.send("data is added");
// });

// app.get("/addPosition",async(req,res)=>{
//     const tempPositions=[ {
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//       },
//       {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//       },]
//     tempPositions.forEach((item)=>{
//         const newPosition=new PositionsModel({
//             product: item.product,
//             name:item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss:item.isLoss,
//         })
//         newPosition.save();
//     })
//     res.send("data is added for position");
// });

app.get("/allHoldings",async(req,res)=>{
    let allHoldings=await HoldingsModel.find({});
    res.json(allHoldings);
})

app.get("/allPositions",async(req,res)=>{
    let allPositions=await PositionsModel.find({});
    res.json(allPositions);
})

app.post("/Signup",async(req,res)=>{
    
    try{    
            const email=req.body.email;
            const existingUser=await SignupModel.findOne({email});

            if (existingUser) return res.status(400).send('User already exists');

            const hashedPassword=await bcrypt.hash(req.body.password,10);
            const user=new SignupModel({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword});
            user.save();
            res.json({ success: true, message: 'User created successfully' });
    }catch(error){
        console.error(error);
        res.status(500).send('Failed to create user');
    }
   
})

app.post('/Login',async(req,res)=>{
    try {
        const { email, password } = req.body;

        const user = await SignupModel.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, 'JWT_SECRET', { expiresIn: "1h" });
        console.log("user is present")
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
})


app.listen(PORT,()=>{
    console.log(`app is running at ${PORT} `);
})