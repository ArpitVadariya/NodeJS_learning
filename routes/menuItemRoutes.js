const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const MenuItem = require("./../models/menuitem");

router.post("/", async (req, res) => {
  try {
    // Assuming request body contains the menu data
    const data = req.body;

    // Create a new newMenuItem document using the Mongoose model
    const newMenuItem = new MenuItem(data);

    // save the new newMenuItem to the database
    const response = await newMenuItem.save();
    console.log("data saved ");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// get menu data from database
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "salty" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id; // Extract id from URL parameter
    const updatedItemData = req.body;

    const response = await MenuItem.findByIdAndUpdate(itemId, updatedItemData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("item updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id; // Extract id from URL parameter

    const response = await MenuItem.findByIdAndDelete(itemId);

    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("item deleted");
    res.status(200).json({ message: "item Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

module.exports = router;
