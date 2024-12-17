import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Appliance Schema
const applianceSchema = new Schema({
    name: { type: String, required: true },
    wattage: { type: Number, required: true, min: 1 },
    qty: { type: Number, required: true, min: 1, default: 1 },
});

// Room Schema
const roomSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    appliances: { type: [applianceSchema], required: true, validate: (v) => v.length > 0 },
});

// Energy Bill Schema
const energyBillSchema = new Schema({
    amount: { type: String, required: true, match: /^\d+$/ },
    startDate: { type: String, required: true },
    band: {
        type: String,
        required: true,
        enum: ["Band A", "Band B", "Band C", "Band D", "Band E"],
    },
});

// Base Personalization Schema
const baseSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tied to a User
        type: {
            type: String,
            required: true,
            enum: ["Home", "Business"], // Discriminator key
        },
        name: { type: String, required: true }, // HomeName or BusinessName
        address: { type: String, required: true },
    },
    { discriminatorKey: "type", timestamps: true }
);

// Create Base Model
const Personalization = model("Personalization", baseSchema);

// Home-Specific Schema
const homeSchema = new Schema({
    homeType: { type: String, required: true }, // Apartment Type
    rooms: { type: [roomSchema], required: true, validate: (v) => v.length > 0 },
    energyBill: { type: energyBillSchema, required: true },
});

// Business-Specific Schema
const businessSchema = new Schema({
    businessType: { type: String, required: true }, // e.g., Retail, Office, Restaurant
    operatingHours: {
        open: { type: String, required: true }, // e.g., "09:00"
        close: { type: String, required: true }, // e.g., "18:00"
    },
    electricityUsage: { type: Number, required: true }, // Total kWh consumption
});

// Create Discriminators
const Home = Personalization.discriminator("Home", homeSchema);
const Business = Personalization.discriminator("Business", businessSchema);

export { Personalization, Home, Business };
