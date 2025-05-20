const express = require("express")
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

userRouter.post("/", async (req, res) => {
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