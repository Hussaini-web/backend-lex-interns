import multer  from 'multer';
import path    from 'path';
import fs      from 'fs';
import cloudinary from '../utils/cloudinary';
import { Request, Response, NextFunction } from "express";

// Extend Express.Multer.File to include cloudinaryUrl
declare global {
  namespace Express {
    namespace Multer {
      interface File {
        cloudinaryUrl?: string;
      }
    }
  }
}

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/images');
    // Ensure the upload directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to accept only image files
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const multerUpload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

//export the multer middleware
export const uploadImage = [
  multerUpload.single('userImage'),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'lex-interns/users',
        resource_type: 'image'
      });
      req.file.cloudinaryUrl = result.secure_url;
      // Optionally, delete local file after upload
      fs.unlinkSync(req.file.path);
      next();
    } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Cloudinary upload failed', error: err.message });
    }
  }
];