import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    id: Number,
    name: String,
    data: String,
});

export default mongoose.model("City", CitySchema);
