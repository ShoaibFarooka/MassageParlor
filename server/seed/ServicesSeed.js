const mongoose = require("mongoose");
const serviceModel = require("../models/serviceModel");
require("dotenv").config();

async function seedServices(providerId, servicesData) {
  // const DB = process.env.DB_URI;
  console.log("Connecting to MongoDB...");
  await mongoose.connect(DB);
  console.log("Connected to MongoDB");

  try {
    // await Service.deleteMany({ serviceProvider: providerId });
    // console.log("Deleted existing services for this provider");

    console.log("Seeding new services...");
    const servicesWithProviderId = servicesData.map((service) => ({
      ...service,
      serviceProvider: providerId,
    }));

    await serviceModel.insertMany(servicesWithProviderId);
    console.log("Services Seeded Successfully!");
  } catch (error) {
    console.error("Error seeding services:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Replace this with an actual serviceProvider ID from your database
const serviceProviderId = "67c79e7460a12718c68a4d13";

const services = [
  {
    name: "Deep Tissue Massage",
    gallery: "67c821c1039b0cee42639a53",
    price: 80,
    duration: "1h",
    calendarColor: "#FF5733",
    description:
      "A massage focused on deep muscle tissue for pain relief and relaxation.",
    status: "Approved",
  },
  {
    name: "Swedish Massage",
    gallery: "67c821c1039b0cee42639a53",

    price: 60,
    duration: "45m",
    calendarColor: "#33A1FF",
    description:
      "A classic massage technique designed to improve circulation and relaxation.",
    status: "Approved",
  },
  {
    gallery: "67c821c1039b0cee42639a53",
    name: "Hot Stone Therapy",
    price: 100,
    duration: "30m",
    calendarColor: "#FF33A8",
    description:
      "A therapy that uses heated stones to relax muscles and promote healing.",
    status: "Pending",
  },
  {
    gallery: "67c821c1039b0cee42639a53",
    name: "Aromatherapy Massage",
    price: 75,
    duration: "1h",
    calendarColor: "#33FFA5",
    description:
      "A relaxing massage using essential oils to enhance physical and emotional well-being.",
    status: "Approved",
  },
  {
    gallery: "67c821c1039b0cee42639a53",
    name: "Sports Massage",
    price: 90,
    duration: "1h",
    calendarColor: "#FFC133",
    description:
      "Designed for athletes to prevent and treat injuries and improve performance.",
    status: "Rejected",
  },
];

// Call the function to seed the services
seedServices(serviceProviderId, services);
