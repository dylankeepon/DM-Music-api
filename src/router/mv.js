// import express
// const express = require('express')
import express from "express"
//router object
const router = express.Router()


import {kg_mv_list_api, kg_mv_more_api, kg_mv_download_api} from "../router_handler/mv_handler.js";
router.get('/mv', kg_mv_list_api)
router.get('/mv/more', kg_mv_more_api)
router.get('/mv/download', kg_mv_download_api)
export {router}