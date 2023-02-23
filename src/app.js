// const express = require("express")
import express from "express"

const app = express()

// const cors = require("cors")
import cors from "cors"

app.use(cors())

var BASE_URL = '/dm/music/api/v1'

// mv
import {router as mvRouter} from "./router/mv.js"

app.use(BASE_URL, mvRouter)

// recommend
import {router as recRouter} from "./router/recommend.js";
app.use(BASE_URL, recRouter)

// mv group search
import {router as mvgroupRouter} from "./router/search.js";
app.use(BASE_URL, mvgroupRouter)

// group info
import {router as groupInfoRouter} from "./router/song.js";
app.use(BASE_URL, groupInfoRouter)

//give port and start server
app.listen('3001', function () {
    console.log('api server running at http://127.0.0.1:3001')
})