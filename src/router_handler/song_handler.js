import {get_group_info} from "../kg_api/song/group_info/group_info.js";
import {get_group_list} from "../kg_api/song/group_list/group_list.js";

var kg_group_info_api = async (req, res) => {
    var response = await get_group_info(req.query['id'])
    res.send(response)
}

var kg_group_list_api = async (req, res) => {
    var response = await get_group_list()
    res.send(response)
}

export {kg_group_info_api, kg_group_list_api}