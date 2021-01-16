import express from 'express';
import { findApps, findAppsByCattegory } from "./find/scrapper";
import { findUsers, findUserById } from "./user/gorest";

// rest of the code remains same
const app = express();
const PORT = 8000;
app.get('/find', (req, res) => res.send(findApps()));
app.get('/find/:category', (req, res) => res.send(findAppsByCattegory(req.params.category)));
app.get('/users', (req, res) => findUsers(req.query.page?.toString(), req.query.limit?.toString()));
app.get('/users/:id', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});