import axios from "axios"
import cheerio from 'cheerio'

async function get_group_info(group_id) {
    var song_group_info_dic = {}
    var song_name_list = []
    // 定义目标网址
    var url = `https://www.kugou.com/songlist/${group_id}/`
    const {data: res} = await axios.get(url)
    const $ = cheerio.load(res)
    var song_list = $('#songs').find('li')
    song_list.each((index, item) => {
        song_name_list.push($(item).text().trim().replace(/[\r\n]/g, "").replace(/^(\d+)/g, "").trim())
    })
    var song_group_info = $('p.detail').text().trim().replace(/[\r\n]/g, "").split("   ")
    var song_group_title = song_group_info[0].replace('名称：', "").trim()
    var song_group_auth = song_group_info[song_group_info.length - 1].trim()
    var song_group_des = $('div.intro').text().trim().replace(/[\r\n]/g, "").replace("简介：", "")
    var song_group_img = $('div.pic').find('img')
    var song_group_img_url = song_group_img.attr('src')
    var song_group_img__url = song_group_img.attr('_src')
    var song_group_img_def = song_group_img.attr('_def')
    var song_group_img_dic = {
        url: song_group_img_url,
        _url: song_group_img__url,
        def: song_group_img_def
    }
    var song_group_auth_img = $('p.detail').find('img')
    var song_group_auth_img_url = song_group_auth_img.attr('src')
    var song_group_auth_img__url = song_group_auth_img.attr('_src')
    var song_group_auth_img_def = song_group_auth_img.attr('_def')
    var song_group_auth_img_dic = {
        url: song_group_auth_img_url,
        _url: song_group_auth_img__url,
        def: song_group_auth_img_def
    }
    song_group_info_dic.title = song_group_title
    song_group_info_dic.des = song_group_des
    song_group_info_dic.auth = song_group_auth
    song_group_info_dic.songs = song_name_list
    song_group_info_dic.img = song_group_img_dic
    song_group_info_dic.atuthImag = song_group_auth_img_dic
    var response = {
        "status": 1,
        "message": "OK",
        "data": song_group_info_dic
    }
    return response

}
export {get_group_info}