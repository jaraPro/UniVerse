app.get("/access/:id", auth, (req, res) => {
  const user = db.users.find(u => u.id === req.user.id);

  if (!user.isSubscribed) {
    return res.json({ access: false });
  }

  res.json({ access: true });
});