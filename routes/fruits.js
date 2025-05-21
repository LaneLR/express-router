const express = require("express")
const {check, validationResult} = require("express-validator")
const fruitRouter = express.Router()
const {Fruit} = require("../models/index")

fruitRouter.get("/", async (req, res) => {
    const fruits = await Fruit.findAll();
    res.json(fruits)
})

fruitRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruit.findByPk(id)
    res.json(fruit) 
})

fruitRouter.post("/", [check("name").not().isEmpty().isLength({min: 5, max: 20}).trim()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({error: errors.array()})
    }
    const {name, color} = req.body
    const fruit = await Fruit.create({name, color})
    res.json(fruit) 
})

fruitRouter.put("/:id", [check("age").not().isEmpty().trim(), check("name").not().isEmpty().trim()], async (req, res) => {
    const id = req.params.id;
    const {name, color} = req.body
    const fruit = await Fruit.update({name, color}, {where: {id}})
    res.json(fruit)
})

fruitRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruit.findByPk(id)
    await fruit.destroy()
    res.json({message: "Fruit deleted: ", fruit})
})

module.exports = fruitRouter