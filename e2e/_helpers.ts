import { Server } from "http";
import path from "path";
import express from "express";

export async function startServer(port: number = 0): Promise<Server> {
  const app = express();
  app.use(express.static(path.join(__dirname, "../dist")));
  let server: Server = null as any;
  await new Promise<Server>(r => (server = app.listen(port, r)));
  return server as Server;
}
