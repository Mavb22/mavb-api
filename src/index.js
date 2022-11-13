import app from "./app.js";
import { DB } from "./config/db.js";
const main = async ()=>{
    await DB();
    app.listen(app.get("port"), () => {
        console.log(`Server running on port ${app.get("port")}`,
        `\nApp name: ${app.get("name")}`);
    });
}
main();
