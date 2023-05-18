import mongoose from "mongoose";
import {error} from '@node_modules/next/dist/build/output/log';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
  
  try {
    // 1:28:30
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}