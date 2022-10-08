import app from "./app.js";
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`,
    `\nApp name: ${app.get("name")}`);
});