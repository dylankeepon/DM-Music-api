import {infoSign} from '../../utils/infSign.js'
import {kg_mid, kg_dfid} from "../../utils/kg_dfid.js"
import axios from "axios";


async function get_song_list(keyword) {
    var response = infoSign({
        keyword: `${keyword}`,
        page: 1,
        pagesize: 30,
        bitrate: 0,
        isfuzzy: 0,
        inputtype: 0,
        platform: "WebFilter",
        userid: "0",
        clientver: 1000,
        iscorrection: 1,
        privilege_filter: 0,
        callback: "callback123",
        filter: 10,
        mid: kg_mid,
        uuid: kg_mid,
        dfid: kg_dfid,
        token: "",
        appid: 1014
    }, null, {
        useH5: !0,
        postType: "json",
        callback: async function (data) {
            let {data: res} = await axios.get('https://complexsearch.kugou.com/v2/search/song', {
                params: data,
                headers: {
                    'authority': 'complexsearch.kugou.com',
                    'accept': '*/*',
                    'accept-language': 'en-US,en;q=0.9',
                    'cache-control': 'no-cache',
                    'cookie': 'kg_mid=cc898610a7059e1976be7e82e7980270; kg_dfid=4FIS3T4A6GqA15noLX4PUcAY; kg_dfid_collect=d41d8cd98f00b204e9800998ecf8427e; Hm_lvt_aedee6983d4cfc62f509129360d6bb3d=1676339869,1676540904,1676604048,1676604145; kg_mid_temp=cc898610a7059e1976be7e82e7980270; Hm_lpvt_aedee6983d4cfc62f509129360d6bb3d=1676617177',
                    'pragma': 'no-cache',
                    'referer': 'https://www.kugou.com/',
                    'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Linux"',
                    'sec-fetch-dest': 'script',
                    'sec-fetch-mode': 'no-cors',
                    'sec-fetch-site': 'same-site',
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
                }
            })
            res = res.replace('callback123(', "")
            res = res.substring(0, res.length - 2)
            res = JSON.parse(res)
            return res
        }
    })
    return response
}

export {get_song_list}

