import express from "express"
//router object
const router = express.Router()

import {kg_recommend_api} from "../router_handler/recommend_handler.js";

router.get('/recommend', kg_recommend_api)
export {router}