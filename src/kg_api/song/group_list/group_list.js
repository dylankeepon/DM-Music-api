import axios from "axios"
import cheerio from 'cheerio'

async function get_group_list() {
    // 定义目标网址
    var url = 'https://www.kugou.com/yy/html/special.html'
    const {data: res} = await axios.get(url)
    const $ = cheerio.load(res)
    // 歌单列表
    var song_group_list = []
    var song_group_section = $('div.album')
    var song_group_cate_list = song_group_section.find('dt')
    var song_group_imgUrl_list = song_group_section.find('img')
    var song_group_auth_list = song_group_section.find('em')
    var song_group_title_list = song_group_section.find('strong')
    var song_group_id_list = $('div.top').find('a')
    var song_group_des_list = song_group_section.find('div.text')
    var song_group_length = song_group_cate_list.length
    var group_length = song_group_imgUrl_list.length
    for (let i = 0; i < song_group_length; i++) {
        let song_group_info = {}
        song_group_info.cate = $(song_group_cate_list[i]).text().trim()
        let group_list = []
        for (let j = 0; j < group_length; j++) {
            let group_info = {}
            group_info.title = $(song_group_title_list[j]).text().trim()
            group_info.id = $(song_group_id_list[j]).attr('href').split('/')[6].replace(".html", "")
            group_info.auth = $(song_group_auth_list[j]).text().trim()
            group_info.des = $(song_group_des_list[j]).text().trim()
            group_info.imgSrc = $(song_group_imgUrl_list[j]).attr('src')
            group_info.img_Src = $(song_group_imgUrl_list[j]).attr('_src')
            group_info.img_Def = $(song_group_imgUrl_list[j]).attr('_def')
            group_list.push(group_info)
        }
        song_group_info.groups = group_list
        song_group_list.push(song_group_info)
    }
    var response = {
        "status": 1,
        "message": "OK",
        "data": {
            "song_group_list": song_group_list
        }
    }
    return response
}
export {get_group_list}