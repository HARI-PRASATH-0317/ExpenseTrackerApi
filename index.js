const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { Expense } = require("./schema.js"); // Importing the model
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors())

async function connectionToDb() {
    try {
        // Connect using environment variables for security
        await mongoose.connect( 'mongodb://localhost:27017/Expense');
        console.log("Connected to DB");
        const port=process.env.PORT||8000
        app.listen(8000, () => {
            console.log(`Listening to port ${port}...`);
        });
    } catch (e) {
        console.error("Error has occurred");
        console.error(e);
    }
}

// Call to establish database connection
connectionToDb();

// Route to add an expense
app.post("/add-expense", async (request, response) => {
    try {
        const expense = await Expense.create({
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date,
        });
        response.status(201).json({
            "status": "success",
           " message": "Entry created",
            "data": expense,
        });
    } catch (error) {
        response.status(400).json({
            "status": "Error",
            "message": "Could not create the entry",
        });
    }
});

// Route to get all expenses
app.get('/get-data', async (request, response) => {
    try {
        const expenseDetails = await Expense.find();
        response.status(200).json(expenseDetails);
    } catch (error) {
        response.status(400).json({
            "status": "Error",
            "message": "Could not fetch the data",
        });
    }
});

app.delete("/delete-expense/:id", async function (request, response) {
    // console.log(request.params.id);
    try {
        const expenseEntry = await Expense.findById(request.params.id);

        if (expenseEntry) {
            await Expense.findByIdAndDelete(request.params.id);
            response.status(200).json({
                "status": "sucess",
                "message": "Entry deleted",
            });
        } else {
            response.status(404).json({
                "status ": "failure",
                "message": "Entry not found",
            });
        }
    } catch (error) {
        response.status(404).json({
            "status": "Some error has occured",
            "error": error,
        });
    }
});

app.patch("/update-expense/:id", async function (request, response) {
    // console.log(request.params.id);
    try {
        const expenseEntry = await Expense.findById(request.params.id);

        if (expenseEntry) {
          await  expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category": request.body.category,
                "date": request.body.date,
            })
           
            
            response.status(200).json({
                "status": "sucess",
                "message": "Entry updated",
            });
        } else {
            response.status(404).json({
                "status ": "failure",
                "message": "Entry not found",
            });
        }
    } catch (error) {
        response.status(404).json({
            "status": "Some error has occured",
            "error": error,
        });
    }
});

