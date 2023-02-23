import {get_recommendation} from "../kg_api/recommend/recommend.js";
var kg_recommend_api = async (req, res) => {
    var response = await get_recommendation()
    res.send(response)
}

export {kg_recommend_api}