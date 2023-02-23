import express from "express"
//router object
const router = express.Router()

import {kg_mv_group_search_api, kg_song_search_api} from "../router_handler/search_handler.js";


router.get('/search', kg_mv_group_search_api)
router.get('/search/song', kg_song_search_api)
export {router}