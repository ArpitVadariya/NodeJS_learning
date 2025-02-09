const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const Person = require("./../models/person");

// Post route to add a person
router.post("/", async (req, res) => {
  try {
    // Assuming request body contains the person data
    const data = req.body;

    // Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person to the database
    const response = await newPerson.save();
    console.log("data saved ");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// get person data from database
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await Person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid worktype" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract id from URL parameter
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract id from URL parameter

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "person Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

module.exports = router;
