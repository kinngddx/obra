const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const Transcript = require('../models/Transcript'); 
// const fs = require('fs');
// const axios = require('axios');


const handleUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No audio file uploaded' });

   
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path));

    const uploadRes = await axios.post('https://api.assemblyai.com/v2/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        authorization: process.env.ASSEMBLYAI_API_KEY,
      },
    });

    const audioUrl = uploadRes.data.upload_url;

    // . Transcription start hoga
    const transcriptRes = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      { audio_url: audioUrl },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
        },
      }
    );

    const transcriptId = transcriptRes.data.id;


    let transcriptText = '';
    let status = 'queued';

    while (status === 'queued' || status === 'processing') {
      const polling = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
          },
        }
      );

      status = polling.data.status;

      if (status === 'completed') {
        transcriptText = polling.data.text;
        break;
      } else if (status === 'error') {
        return res.status(500).json({ message: 'Transcription failed' });
      }

      await new Promise((r) => setTimeout(r, 3000)); 
    }

  // ✅ Save transcript to MongoDB
const savedTranscript = await Transcript.create({
  user: req.user.id,            // linked to current logged-in user
  audioUrl,
  text: transcriptText,
});

// ✅ Send transcript + its DB ID
return res.status(200).json({
  message: 'Transcription successful',
  transcript: transcriptText,
  transcriptId: savedTranscript._id
});



  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { handleUpload };
