import mongoose from "mongoose";
export const DB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Connected to ${db.connection.host}:${db.connection.port}/${db.connection.name}`);
    } catch (error) {
        console.log({msj: "Error al conectar con la base de datos", error: error});
    }
}