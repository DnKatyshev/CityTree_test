import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    type: String, // city, district, street, ...
    name: String,
}, { _id: false });

const CitizenSchema = new mongoose.Schema({
    id: Number,
    name: String,
    city_id: Number,
    groups: [GroupSchema],
});

export default mongoose.model("Citizen", CitizenSchema);