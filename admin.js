app.get("/admin/users", (req, res) => {
  res.json(db.users);
});

app.delete("/admin/user/:id", (req, res) => {
  db.users = db.users.filter(u => u.id !== req.params.id);
  saveDB();
  res.json({ ok: true });
});