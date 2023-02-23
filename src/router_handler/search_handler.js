import {get_mv_group_search_list} from "../kg_api/search/mv_group_list/mv_group_list.js";
import {get_song_list} from "../kg_api/search/song_list/song_list.js";

var kg_mv_group_search_api = async (req, res) => {
    var response = await get_mv_group_search_list(req.query['searchtype'], req.query['keyword'])
    res.send(response)
}

var kg_song_search_api = async (req, res) => {
    var response = await get_song_list(req.query['keyword'])
    res.send(response)
}

export {kg_mv_group_search_api, kg_song_search_api}