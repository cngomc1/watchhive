app.get("/routes", (req, res) => {
  const routes = [];
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      routes.push(r.route.path);
    }
  });
  res.json(routes);
});
