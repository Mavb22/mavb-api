import fs from 'fs';

export const deletedir = (ruta) => {
    fs.unlinkSync(ruta, (err) => {
        if (err) {
            return err;
        }
    })   
}