const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");

const PORT = 3000;
const MONGODB_URI =
  "mongodb+srv://buruklynx:1gliU3JyND0sQoKS@3legant-project.ybsdj.mongodb.net/"; // MongoDB connection string

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google signup
  googleId: { type: String, unique: true, sparse: true },
  profilePicture: { type: String }, // Optional
  signupMethod: { type: String, default: "email" },
});

const User = mongoose.model("User", userSchema);

// Product Schema and Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  productUrl: { type: String, required: true },
  categoryUrl: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Image Schema and Model
const imageSchema = new mongoose.Schema({
  image: String,
});

const ImageModel = mongoose.model("Image", imageSchema);

// Email Schema and Model
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Email = mongoose.model("Email", emailSchema);

// API Endpoints

// Check if username exists
app.get("/api/auth/check-username", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check if email exists
app.get("/api/auth/check-email", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Email Signup
app.post("/api/auth/signup", async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Google Signup
app.post("/api/auth/google-signup", async (req, res) => {
  const { googleId, name, email, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ googleId });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this Google account." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const user = new User({
      name,
      email,
      googleId,
      profilePicture: profilePicture || "",
      signupMethod: "google",
    });

    await user.save();

    res.status(201).json({ message: "Google signup successful!", user });
  } catch (error) {
    console.error("Error during Google signup:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Fetch Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Fetch Random Image
app.get("/api/image", async (req, res) => {
  try {
    const images = await ImageModel.find({});
    if (!images || images.length === 0) {
      return res.status(404).send("No images found");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    res.send(randomImage.image);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Serve Static Images
app.use("/images", express.static(path.join(__dirname, "images")));

// Email Subscription Endpoint
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmail = await Email.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already signed up" });
    }

    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: "Email successfully subscribed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});