export const UpdateImage = async (req, res) => {
    console.log(req.file);
    res.status(200).json({
        msj:"listo"
    })
}