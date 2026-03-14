import express from "express"
import dotenv from "dotenv"
import type { Express } from "express"
import { createServer } from "node:http"

dotenv.config()

const app:Express=express();
const server=createServer(app);
export {server}
export default app
