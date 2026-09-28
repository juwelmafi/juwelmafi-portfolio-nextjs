import mongoose from "mongoose";
import dns from "node:dns";

// Global cache to reuse connection in dev (hot reload)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  // Workaround for Windows Node.js DNS SRV lookup failure with Atlas
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch {
    // ignore if not allowed in specific environment
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}
