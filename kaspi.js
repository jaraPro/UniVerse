app.post("/kaspi/create", auth, (req, res) => {
  const user = db.users.find(u => u.id === req.user.id);

  const payUrl = `https://kaspi.kz/pay?order=${user.id}`;

  res.json({ url: payUrl });
});