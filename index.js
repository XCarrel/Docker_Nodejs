const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8800;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", async (req, res) => {
  const users = await db.select().from("users");
  res.json(users);
});

app.get("/values", async (req, res) => {
  res.send(
    "<html><header><body>" +
      "<div><span>L1 tension:</span><span>232</span>V</div>" +
      "<div><span>L1 tension:</span><span>241</span>V</div>" +
      "<div><span>L1 tension:</span><span>235</span>V</div>" +
      "</html></header></body>"
  );
});

app.post("/users", async (req, res) => {
  const user = await db("users").insert({ name: req.body.name }).returning("*");
  res.json(user);
});

app.listen(PORT, () => console.log(`Server up at PORT:${PORT}`));
