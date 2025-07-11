
// require("dotenv").config();


// const express = require("express");
// const cors = require("cors");
// const dotenv   = require("dotenv");
// const transcriberoute = require("./routes/transcribe");


// dotenv.config();
// console.log("Loaded API KEY:", process.env.ASSEMBLYAI_API_KEY);


// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/transcribe", transcriberoute);

// app.get("/", (req, res) => {
//   res.send("VoiceVault backend is running ✅");
// });


// const PORT= process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });





// require("express-async-errors");


require("dotenv").config(); 
// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


//middleware hai
app.use(cors());
app.use(express.json());


// const transcribeRoute = require("./routes/transcribeRoute");
const transcribeRoute = require("./routes/transcribe");

app.use("/api/transcribe", transcribeRoute);
app.use("/api/auth", authRoutes);



const uploadRoute = require('./routes/upload');
app.use('/api/upload', uploadRoute);




// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
mongoose.connect(MONGO_URI)

  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
