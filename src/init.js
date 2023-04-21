import "regenerator-runtime";
import "dotenv/config";
import "./db";
import app from "./server";

const Hostname = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://${Hostname}:${PORT} 🚀`);

app.listen(PORT, "0.0.0.0", handleListening);
