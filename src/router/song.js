import express from "express"
//router object
const router = express.Router()

import {kg_group_info_api, kg_group_list_api} from "../router_handler/song_handler.js";

router.get('/song/group', kg_group_info_api)
router.get('/song/group/list', kg_group_list_api)

export {router}