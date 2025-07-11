const handleUpload = async (req, res) => {
  try {
    const file = req.file;
    const user = req.user; 

    if (!file) return res.status(400).json({ message: 'No audio file uploaded' });

   
    return res.status(200).json({ message: 'File received', fileName: file.originalname });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

module.exports = { handleUpload };
