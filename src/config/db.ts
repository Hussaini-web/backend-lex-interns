import env from "./env";
import mongoose from "mongoose";
const MongoDB = {
    URI: env.MONGODB_URI
};
mongoose.connect(MongoDB.URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
export default MongoDB;