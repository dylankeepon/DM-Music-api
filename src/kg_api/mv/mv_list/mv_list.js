import axios from "axios"
import cheerio from 'cheerio'

async function get_mv_list() {
    // 定义目标网址
    var url = 'https://www.kugou.com/mvweb/html/'
    const {data: res} = await axios.get(url)
    const $ = cheerio.load(res)
    // 轮播图
    var slide_show_list = []
    var slide_show_section = $('div.picchangebox')
    var slide_show_imgUrl_list = slide_show_section.find('img')
    var slide_show_id_list = slide_show_section.find('a')
    var slide_show_length = slide_show_imgUrl_list.length
    for (let i = 0; i < slide_show_length; i++) {
        let slide_show_info = {}
        slide_show_info.title = $(slide_show_imgUrl_list[i]).attr('title')
        slide_show_info.id = $(slide_show_id_list[2 * i]).attr('href').split('/')[5]
        slide_show_info.imgSrc = $(slide_show_imgUrl_list[i]).attr('src')
        slide_show_list.push(slide_show_info)
    }

    // mv排行
    var mv_rank_list = []
    var mv_rank_section = $('div.mvhotlist')
    var mv_rank_title_list = mv_rank_section.find('li')
    var mv_rank_id_list = mv_rank_section.find('a')
    var mv_rank_length = mv_rank_title_list.length
    for (let i = 0; i < mv_rank_length; i++) {
        let mv_rank_info = {}
        mv_rank_info.title = $(mv_rank_title_list[i]).text().trim()
        mv_rank_info.id = $(mv_rank_id_list[i + 1]).attr('href').split('/')[4]
        mv_rank_list.push(mv_rank_info)
    }

    // mv类别
    var mv_cate_list = []
    var mv_cate_section = $('div.radiowrap .leftCon')
    var mv_cate_title_list = mv_cate_section.find('.radiolist dl dd')
    var mv_cate_id_list = mv_cate_section.find('.radiolist dl a')
    var mv_cate_length = mv_cate_title_list.length
    for (let i = 0; i < mv_cate_length; i++) {
        let mv_cate_info = {}
        mv_cate_info.title = $(mv_cate_title_list[i]).text().trim()
        mv_cate_info.id = $(mv_cate_id_list[i]).attr('href').split('/')[3].replace("1.html", "")
        mv_cate_list.push(mv_cate_info)
    }

    // mv类别列表
    var mv_list = []
    var mv_section = $('div.radiowrap .rightCon')
    var mv_info_list = mv_section.find('li a')
    var mv_imgUrl_list = mv_section.find('li img')
    var mv_length = mv_info_list.length
    for (let i = 0; i < mv_length; i++) {
        let mv_info = {}
        mv_info.title = $(mv_info_list[i]).attr('title')
        mv_info.id = $(mv_info_list[i]).attr('href').split('/')[4]
        mv_info.imgSrc = $(mv_imgUrl_list[i]).attr('src')
        mv_info.img_Src = $(mv_imgUrl_list[i]).attr('_src')
        mv_list.push(mv_info)
    }
    var response = {
        "status": 1,
        "message": "OK",
        "data": {
            "slide_show_list": slide_show_list,
            "mv_rank_list": mv_rank_list,
            "mv_cate_list": mv_cate_list,
            "mv_list": mv_list
        }
    }
    return response
}
export {get_mv_list}