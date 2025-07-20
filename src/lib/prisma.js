import { PrismaClient } from "../generated/prisma/index.js"

export const client  = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});