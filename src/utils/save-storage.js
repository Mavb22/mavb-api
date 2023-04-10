import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/image");
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + "-" + file.originalname);

    }
});
const fileFilterImage = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        req.fileValidationError = "Invalid file type";
        cb(null, false);
    }
}
const fileFilterMusic = (req, file, cb) => {
    if (file.mimetype === "audio/mpeg") {
        cb(null, true);
    } else {
        req.fileValidationError = "Invalid file type";
        cb(null, false);
    }
}
const maxFileSize = 3000 * 1024 * 1024;
const uploadImage = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxFileSize }, fileFilter: fileFilterMusic });
export const upload_image = uploadImage.single("image");
