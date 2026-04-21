app.post("/kaspi/success", (req, res) => {
  const { userId } = req.body;

  const user = db.users.find(u => u.id === userId);
  if (user) user.isSubscribed = true;

  saveDB();

  res.json({ ok: true });
});