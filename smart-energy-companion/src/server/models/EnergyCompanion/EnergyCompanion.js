// src/lib/models/EnergyCompanion.js
import mongoose from "mongoose";
import dbClient from "@/server/db/mongoDb";

const { Schema, model } = mongoose;

// Ensure DB is connected before model initialization
const connectDB = async () => {
    if (mongoose.connection.readyState !== 1) {
        await dbClient.connect();
    }
};

// Base EnergyCompanion schema
const options = {
    discriminatorKey: 'role',
    timestamps: true,
};

const EnergyCompanionSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.githubId;
        },
    },
    firstName: { type: String, default: null },
    middleName: { type: String, default: null },
    lastName: { type: String, default: null },
    fullName: { type: String },
    status: {
        type: String,
        enum: ['online', 'offline', 'deactivated', 'suspended', 'pending', 'banned', 'deleted', 'blocked','busy'],
        default: 'offline',
    },
    avatar: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    ctrlFlag: { type: Boolean, default: false },
    resetPwd: Boolean,
    resetTTL: Date,
    resetOTP: String,
    googleId: { type: String, default: null },
    githubId: { type: String, default: null },
}, options);

// Middleware to dynamically generate and update fullName
EnergyCompanionSchema.pre('save', function (next) {
    if (this.firstName && this.lastName) {
        this.fullName = `${this.firstName} ${this.middleName || ''} ${this.lastName}`.trim();
    } else {
        this.fullName = null;
    }
    next();
});


EnergyCompanionSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    const firstName = update.firstName || this._update.firstName;
    const middleName = update.middleName || this._update.middleName;
    const lastName = update.lastName || this._update.lastName;

    if (firstName || middleName || lastName) {
        const fullName = `${firstName || ''} ${middleName || ''} ${lastName || ''}`.trim();
        this.setUpdate({ ...update, fullName });
    }
    next();
});


// User-specific schema with addresses
const UserSchema = new Schema({
    address: [{
        type: String,
        default: []
    }],
});

// Admin-specific schema with permissions
const AdminSchema = new Schema({
    permissions: {
        type: [String],
        default: ["manage-users"],
    },
    accessLevel: {
        type: String,
        enum: ['SuperAdmin', 'Moderator', 'Support'],
        default: 'SuperAdmin',
    },
});

// Model Initialization
const getEnergyCompanionModels = async () => {
    await connectDB();

    const EnergyCompanion = mongoose.models.EnergyCompanion || model("EnergyCompanion", EnergyCompanionSchema);
    const User = mongoose.models.User || EnergyCompanion.discriminator('User', UserSchema);
    const Admin = mongoose.models.Admin || EnergyCompanion.discriminator('Admin', AdminSchema);

    return { EnergyCompanion, User, Admin };
};

export default getEnergyCompanionModels;