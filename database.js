const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const connect = mongoose.connect('mongodb+srv://sampleAdmin:' + process.env.PASSWORD + '@cluster0.8dqclut.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

const urlSchema = new Schema({
    original_url: { type:String, required:true },
    short_url: Number
})

const url = Model("url", urlSchema)

exports.url = url