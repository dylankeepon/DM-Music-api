import axios from "axios"
import cheerio from 'cheerio'

async function get_more_mv() {
    // 定义目标网址
    var url = 'https://www.kugou.com/mvweb/html/mvlist.html'
    const {data: res} = await axios.get(url)
    const $ = cheerio.load(res)
    // mv热播排行
    var mv_hot_list = []
    var mv_hot_section = $('div.mvlist ul')
    var mv_hot_info_list = mv_hot_section.find('li a')
    var mv_hot_imgUrl_list = mv_hot_section.find('li img')
    var mv_hot_length = mv_hot_info_list.length
    for (let i = 0; i < mv_hot_length; i++) {
        let mv_hot_info = {}
        mv_hot_info.title = $(mv_hot_info_list[i]).attr('title')
        mv_hot_info.id = $(mv_hot_info_list[i]).attr('href').split('/')[4]
        mv_hot_info.imgSrc = $(mv_hot_imgUrl_list[i]).attr('src')
        mv_hot_info.img_Src = $(mv_hot_imgUrl_list[i]).attr('_src')
        mv_hot_list.push(mv_hot_info)
    }

    // mv列表
    var mv_more_list = []
    var mv_more_section = $('div.mvlist .dlwrap')
    var mv_more_info_list = mv_more_section.find('a')
    var mv_more_length = mv_more_info_list.length
    for (let i = 0; i < mv_more_length; i++) {
        let mv_more_info = {}
        mv_more_info.title = $(mv_more_info_list[i]).text().trim().replace(/\d+\./, "").trim()
        mv_more_info.id = $(mv_more_info_list[i]).attr('href').split('/')[4]
        mv_more_list.push(mv_more_info)
    }

    var response = {
        "status": 1,
        "message": "OK",
        "data": {
            "mv_hot_list": mv_hot_list,
            "mv_more_list": mv_more_list
        }
    }
    return response
}
export {get_more_mv}