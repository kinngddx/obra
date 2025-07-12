
// // // require("dotenv").config();


// // // const express = require("express");
// // // const cors = require("cors");
// // // const dotenv   = require("dotenv");
// // // const transcriberoute = require("./routes/transcribe");


// // // dotenv.config();
// // // console.log("Loaded API KEY:", process.env.ASSEMBLYAI_API_KEY);


// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // app.use("/api/transcribe", transcriberoute);

// // // app.get("/", (req, res) => {
// // //   res.send("VoiceVault backend is running ✅");
// // // });


// // // const PORT= process.env.PORT || 5000;

// // // app.listen(PORT, () => {
// // //   console.log(`Server running on http://localhost:${PORT}`);
// // // });





// // // require("express-async-errors");


// // require("dotenv").config(); 
// // // const authRoutes = require("./routes/auth");
// // // app.use("/api/auth", authRoutes);


// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const authRoutes = require("./routes/auth");


// // const app = express();
// // const PORT = process.env.PORT || 5000;
// // const MONGO_URI = process.env.MONGO_URI;


// // //middleware hai
// // app.use(cors());
// // app.use(express.json());


// // // const transcribeRoute = require("./routes/transcribeRoute");
// // const transcribeRoute = require("./routes/transcribe");

// // app.use("/api/transcribe", transcribeRoute);
// // app.use("/api/auth", authRoutes);



// // const uploadRoute = require('./routes/upload');
// // app.use('/api/upload', uploadRoute);




// // // mongoose
// // //   .connect(MONGO_URI, {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true,
// // //   })
// // mongoose.connect(MONGO_URI)

// //   .then(() => {
// //     console.log("✅ MongoDB connected");
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server running on http://localhost:${PORT}`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error("❌ MongoDB connection error:", err);
// //   });



// // first way
// require("dotenv").config(); 

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const authRoutes = require("./routes/auth");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// const transcribeRoute = require("./routes/transcribe");
// app.use("/api/transcribe", transcribeRoute);
// app.use("/api/auth", authRoutes);

// const uploadRoute = require('./routes/upload');
// app.use('/api/upload', uploadRoute);

// // Serve static files from the client build directory
// app.use(express.static(path.join(__dirname, '../client/build')));

// // For any non-API routes, serve the React app
// app.get('*', (req, res) => {
//   // Skip API routes
//   if (req.path.startsWith('/api/')) {
//     return res.status(404).json({ error: 'API route not found' });
//   }
  
//   // Serve React app for all other routes
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// // Connect to MongoDB and start server
// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });




require("dotenv").config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());


// app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/transcribe", require("./routes/transcribe"));


app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


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
