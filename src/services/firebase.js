import  admin from "firebase-admin";
// import { createRequire } from "module"
// const require = createRequire(import.meta.url)
const serviceAccount = ("../config/firebase-key.json")
const BUCKET = "api-mavb.appspot.com";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});
const bucket = admin.storage().bucket();
export const uploadImage = (req,res,next) => {
    if(!req.file) return next();
    const imagen = req.file;
    const nameFile = Date.now() + "." + imagen.originalname.split(".").pop();
    const file = bucket.file(nameFile);
    const stream = file.createWriteStream({
        metadata:{
            contentType:imagen.mimetype
        }
    });
    stream.on("error",(e)=>{
        console.error(e);
    })
    stream.on("finish",async (e)=>{
        await file.makePublic();
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nameFile}`;
        next();
    })
    stream.end(imagen.buffer);
}
