const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

let db = require("./db.json");

// 📌 получить пользователя
app.get("/user/:id", (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  res.json(user || {});
});

// 📌 создать оплату Kaspi (имитация redirect)
app.post("/kaspi/create", (req, res) => {
  const { userId } = req.body;

  // тут будет Kaspi payment link
  const paymentUrl = `https://kaspi.kz/pay?order=${userId}`;

  res.json({ url: paymentUrl });
});

// 📌 webhook (Kaspi подтверждает оплату)
app.post("/kaspi/success", (req, res) => {
  const { userId } = req.body;

  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.isSubscribed = true;
  }

  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running"));