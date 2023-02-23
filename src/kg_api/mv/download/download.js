import {infoSign} from "../../utils/infSign.js";
import {encode_cookie} from '../../utils/getBaseInfo.js'
import axios from "axios";

async function download_mv(mv_entity_id) {
    var t = encode_cookie
    var o = {
        fields: "base,h264",
        data: [{
            entity_id: mv_entity_id
        }]
    }
    var response = infoSign({
        appid: 1014,
        dfid: t.dfid,
        mid: t.mid,
        uuid: t.mid,
        token: t.token ? t.token : "",
        userid: "0"
    }, o, {
        useH5: !0,
        postType: "json",
        callback: async function (t, o) {
            var {data: res} = await axios.post(
                'https://gateway.kugou.com/openapi/kmr/v1/mv',
                o,
                {
                    params: t,
                    headers: {
                        'authority': 'gateway.kugou.com',
                        'accept': '*/*',
                        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'kg-tid': '317',
                        'origin': 'https://www.kugou.com',
                        'referer': 'https://www.kugou.com/',
                        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Linux"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-site',
                        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
                    }
                }
            );
            if (0 == res.error_code && 1 == res.status && res.data[0]) {
                var o = res.data[0].h264
                var mv_hash = o.fhd_hash || o.hd_hash || o.qhd_hash || o.sd_hash || o.ld_hash
                var mv_timelength = res.data[0].base.duration
            }
            var response = infoSign({
                cmd: 123,
                ext: "mp4",
                hash: mv_hash,
                ismp3: 0,
                key: "kugoumvcloud",
                pid: 6,
                ssl: 1,
                appid: 1014
            }, null, {
                callback: async function (e) {
                    var t = (new Date).getTime();
                    const {data: res} = await axios.get('https://gateway.kugou.com/v2/interface/index', {
                        params: e,
                        headers: {
                            'authority': 'gateway.kugou.com',
                            'accept': '*/*',
                            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                            'origin': 'https://www.kugou.com',
                            'referer': 'https://www.kugou.com/',
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-site',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
                            'x-router': 'trackermv.kugou.com'
                        }
                    })
                    return res
                }
            })
            return response
        }
    })
    return response
}

export {download_mv}