import {get_mv_list} from "../kg_api/mv/mv_list/mv_list.js"
import {get_more_mv} from "../kg_api/mv/more/more.js";
import {download_mv} from "../kg_api/mv/download/download.js";

var kg_mv_list_api = async (req, res) => {
    var response = await get_mv_list()
    res.send(response)
}

var kg_mv_more_api = async (req, res) => {
    var response = await get_more_mv()
    res.send(response)
}
var kg_mv_download_api = async (req, res) => {
    var response = await download_mv(req.query['mventityid'])
    res.send(response)
}
export {kg_mv_list_api, kg_mv_more_api, kg_mv_download_api}
