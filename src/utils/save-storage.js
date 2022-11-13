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
const maxFileSize = 3315 * 1024 * 1024;
const uploadImage = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxFileSize }, fileFilter: fileFilterImage });
export const upload_image = uploadImage.single("image");
