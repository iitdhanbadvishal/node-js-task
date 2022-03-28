const app = require("./app");
const mongoose = require("mongoose");

const PORT = 3001;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY must be defined");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
