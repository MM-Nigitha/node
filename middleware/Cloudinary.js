const cloudinary = require('cloudinary').v2;
const { unlink } = require('fs/promises');

// Configure Cloudinary with your API credentials
cloudinary.config({
    cloud_name: "dtqen0cn0",
    api_key: "855239698971828",
    api_secret: "WGZ_ypFLHli-CRHUmrqjV7IfkB0"
});

// Middleware function to upload images to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
    try {
        const files = req.files ? req.files : [req.file];
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }

        const uploadedImages = await Promise.all(files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            await unlink(file.path); // Remove the file from the server after uploading to Cloudinary
            return result.secure_url; // Return only the URL
        }));

        // Attach the uploaded image URLs to the request object
        req.body.images = uploadedImages;
        next();
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: 'Failed to upload to Cloudinary', message: error.message });
    }
};

module.exports = { uploadToCloudinary };
