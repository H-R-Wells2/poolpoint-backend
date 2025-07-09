import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "PoolPoint",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;

  return cached.conn;
}
