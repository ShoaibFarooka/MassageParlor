const mongoose = require("mongoose");
const Gallery = require("../models/galleryModel"); // ✅ Ensure correct model import
require("dotenv").config();

async function seedGallery(serviceProviderId, images) {
    // const DB = 'mongodb+srv://shoaibfarooka:Welcome5home.@cluster0.hrpczac.mongodb.net/MassageParlor?retryWrites=true&w=majority';

    if (!DB) {
        console.error("Error: MongoDB URI is undefined. Check your .env file.");
        process.exit(1);
    }

    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Delete existing gallery for the provider
        await Gallery.deleteMany({ serviceProvider: serviceProviderId });
        console.log("Deleted existing gallery images for this provider");

        // Create a new gallery entry
        console.log("Seeding new gallery images...");
        const galleryEntry = new Gallery({
            serviceProvider: serviceProviderId,
            images: images,
        });

        await galleryEntry.save();
        console.log("Gallery images seeded successfully!");
    } catch (error) {
        console.error("Error seeding gallery images:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

// ✅ Replace with a real serviceProvider ID from your database
const serviceProviderId = "67c79db760a12718c68a4d07";

const images = [
    "https://example.com/images/massage1.jpg",
    "https://example.com/images/massage2.jpg",
    "https://example.com/images/massage3.jpg",
    "https://example.com/images/massage4.jpg",
];

// ✅ Run the seeder
seedGallery(serviceProviderId, images);
