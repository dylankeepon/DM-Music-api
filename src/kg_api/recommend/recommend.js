import axios from "axios"
import cheerio from 'cheerio'

async function get_recommendation() {
    // 定义目标网址
    var url = 'https://www.kugou.com/'
    const {data: res} = await axios.get(url)
    const $ = cheerio.load(res)
    // 歌单推荐
    var song_group_list = []
    var song_group_section = $('div.homep_d1_d1_d1')
    var song_group_name_el_list = song_group_section.find('a.homep_cm_item_st1_a2')
    var song_group_favorite_el_list = song_group_section.find('span.homep_cm_item_st1_sp2')
    var song_group_imgUrl_el_list = song_group_section.find('img')
    var song_group_length = song_group_name_el_list.length
    for (let i = 0; i < song_group_length; i++) {
        let song_group_info = {}
        song_group_info.title = $(song_group_name_el_list[i]).text().trim()
        song_group_info.id = $(song_group_name_el_list[i]).attr('href').split('/')[4]
        song_group_info.favorite = $(song_group_favorite_el_list[i]).text().trim()
        song_group_info.imgSrc = $(song_group_imgUrl_el_list[i]).attr('src')
        song_group_info.img_Src = $(song_group_imgUrl_el_list[i]).attr('_src')
        song_group_info.img_Def = $(song_group_imgUrl_el_list[i]).attr('_def')
        song_group_list.push(song_group_info)
    }

    //排行推荐
    var rank_list = []
    var rank_section = $('div.homep_d1_d2_d1')
    var rank_id_list = rank_section.find('a')
    var rank_rec_song_list = rank_section.find('span.homep_d1_d2_d1_d1_sp2')
    var rank_imgUrl_list = rank_section.find('img')
    var rank_length = rank_id_list.length
    for (let i = 0; i < rank_length; i++) {
        let rank_info = {}
        rank_info.id = $(rank_id_list[i]).attr('href').split('/')[6].replace(".html?from=homepage", "")
        let rank_song_list = []
        rank_song_list.push($(rank_rec_song_list[3 * i]).text().trim(), $(rank_rec_song_list[3 * i + 1]).text().trim(), $(rank_rec_song_list[3 * i + 2]).text().trim())
        rank_info.recSong = rank_song_list
        rank_info.imgUrl = $(rank_imgUrl_list[i]).attr('src')
        rank_list.push(rank_info)
    }

    // 新歌推荐
    var new_song_list = []
    var new_song_section = $('div.homep_d1_d3')
    var new_song_cate_list = new_song_section.find('li._newsonglist_li')
    var new_song_info_list = new_song_section.find('span.homep_cm_title_sp1')
    var new_song_length = new_song_cate_list.length
    for (let i = 0; i < new_song_length; i++) {
        let new_song_info = {}
        new_song_info.cate = $(new_song_cate_list[i]).text().trim()
        new_song_info.song = JSON.parse($(new_song_info_list[i]).attr('dataobj'))
        new_song_list.push(new_song_info)
    }

    // MV推荐
    var mv_list = []
    var mv_section = $('div.homep_d1_d2')
    var mv_title_list = mv_section.find('p.homep_cm_item_st1_p1')
    var mv_id_list = mv_section.find('a.homep_cm_item_st1_a2')
    var mv_auth_list = mv_section.find('p.homep_cm_item_st1_p2')
    var mv_imgUrl_list = mv_section.find('img')
    var mv_length = mv_title_list.length
    for (let i = 0; i < mv_length; i++) {
        let mv_info = {}
        mv_info.title = $(mv_title_list[i]).text().trim()
        mv_info.id = $(mv_id_list[i]).attr('href').split('/')[4]
        mv_info.auth = $(mv_auth_list[i]).text().trim()
        mv_info.imgSrc = $(mv_imgUrl_list[i + 3]).attr('src')
        mv_info.img_Src = $(mv_imgUrl_list[i + 3]).attr('_src')
        mv_info.img_Def = $(mv_imgUrl_list[i + 3]).attr('_def')
        mv_list.push(mv_info)
    }

    // 歌手推荐
    var singer_list = []
    var singer_section = $('div.homep_d1_d6')
    var singer_cate_list = $('li._newsinger')
    var singers_list = singer_section.find('li')
    var singer_length = singer_cate_list.length
    for (let i = 0; i < singer_length; i++) {
        let singer_info = {}
        singer_info.cate = $(singer_cate_list[i]).text().trim()
        let singers = []
        singers.push(
            JSON.parse($(singers_list[5 * i]).attr('data')),
            JSON.parse($(singers_list[5 * i + 1]).attr('data')),
            JSON.parse($(singers_list[5 * i + 2]).attr('data')),
            JSON.parse($(singers_list[5 * i + 3]).attr('data')),
            JSON.parse($(singers_list[5 * i + 4]).attr('data')),
        )
        singer_info.singers = singers
        singer_list.push(singer_info)
    }
    var response = {
        "status": 1,
        "message": "OK",
        "data": {
            "song_group_list": song_group_list,
            "rank_list": rank_list,
            "new_song_list": new_song_list,
            "mv_list": mv_list,
            "singer_list": singer_list
        }
    }
    return response
}
export {get_recommendation}