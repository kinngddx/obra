// const express = require("express");
// const axios = require("axios");
// const router = express.Router();


// const API_KEY = process.env.ASSEMBLYAI_API_KEY;




// router.post("/", async (req, res) => {
//   try {
//     const { audioUrl } = req.body;

//     const response = await axios.post(
//       "https://api.assemblyai.com/v2/transcript",
//       { audio_url: audioUrl },
//       { headers: { authorization: API_KEY } }
//     );



//     // while(polling){
//     //     const pollingres = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//     //     { headers: { authorization: API_KEY } }
//     //   );

     

//     // }


//        const transcriptId = response.data.id;
//     let transcriptData = null;


//     while (true) {
//       const pollingRes = await axios.get(
//         `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//         { headers: { authorization: API_KEY } }
//       );

//       const status = pollingRes.data.status;

//       if (status === "completed") {
//         transcriptData = pollingRes.data;
//         break;
//       } else if (status === "error") {
//         return res.status(500).json({ error: "Transcription failed." });
//       }


//       await new Promise((resolve) =>setTimeout(resolve,300));
//     }

//  res.json({ text: transcriptData.text });

//   } catch (err) {
// console.error("Transcription Error:", err.response?.data || err.message || err);

//     res.status(500).json({ error: "Failed to transcribe audio." });
//   }
// });

// module.exports = router;






const express = require("express");
const axios = require("axios");
const router = express.Router();

// ✅ Ensure .env is loaded (optional but safe)
require("dotenv").config();

const API_KEY = process.env.ASSEMBLYAI_API_KEY;

// ✅ Sanity check for missing API key
if (!API_KEY) {
  console.warn("❗ ASSEMBLYAI_API_KEY is not set in environment variables.");
}

router.post("/", async (req, res) => {
  try {
    const { audioUrl } = req.body;

    // ✅ Validate input
    if (!audioUrl) {
      return res.status(400).json({ error: "Missing audioUrl in request body." });
    }

    console.log("🔁 Sending to AssemblyAI:", audioUrl);

    // ✅ Send audio URL to AssemblyAI
    const response = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: audioUrl },
      {
        headers: {
          authorization: API_KEY,
          "content-type": "application/json", // <- Ensure this is set
        },
      }
    );

    const transcriptId = response.data.id;
    console.log("📝 Transcript ID:", transcriptId);

    let transcriptData = null;

    // ✅ Poll until transcription is complete
    while (true) {
      const pollingRes = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: { authorization: API_KEY },
        }
      );

      const status = pollingRes.data.status;
      console.log("📡 Polling status:", status);

      if (status === "completed") {
        transcriptData = pollingRes.data;
        break;
      } else if (status === "error") {
        return res.status(500).json({ error: "Transcription failed at AssemblyAI." });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s wait
    }

    res.json({ text: transcriptData.text });
  } catch (err) {
    console.error("❌ Transcription Error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to transcribe audio." });
  }
});

module.exports = router;
