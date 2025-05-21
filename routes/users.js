const express = require("express")
const {check, validationResult} = require("express-validator")
const userRouter = express.Router()
const {User} = require("../models/index")

userRouter.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users)
})

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    res.json(user) 
})

userRouter.post("/", [check("name").not().isEmpty().isLength({min: 5, max: 15}).trim(), check("age").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({error: errors.array()})
    }
    const {name, age} = req.body
    const user = await User.create({name, age})
    res.json(user) 
})

userRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {name, age} = req.body
    const user = await User.update({name, age}, {where: {id}})
    res.json(user)
})

userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    await user.destroy()
    res.json({message: "User deleted: ", user})
})

module.exports = userRouter