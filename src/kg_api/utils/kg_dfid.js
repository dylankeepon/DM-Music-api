import {CryptoJS} from './Crypto.js'
import axios from "axios";
import {fileURLToPath} from "url";
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
var file_path = path.join(__dirname, "./kg_dfid_cookie.json");


var cookie_dic = {}
var v = {
    Cookie: {
        write: function (e, t, n, i, r, a) {
            /^\w*$/.test(e) || alert("cookie格式不正确"),
            /; /.test(t) && alert("cookie格式不正确");

            var o = e + "=" + t;
            if (n) {
                var s = new Date;
                s.setTime(s.getTime() + 1e3 * n),
                    o += "; expires=" + s.toGMTString()
            }
            i && (o += "; path=" + i),
            r && (o += "; domain=" + r),
            a && (o += "; secure")
            cookie_dic[e] = o
            var writeStream = fs.createWriteStream(file_path, {
                encoding: 'utf8',
            })
            writeStream.write(JSON.stringify(cookie_dic))
        },
        rewriteKey: function (e, t, n, i, r, a, o) {
            var s = t;
            if (n) {
                var c = this.read(e)
                    , l = new RegExp("\\b" + t + "=([^&]*)\\b", "g");
                s = c.replace(l, function (e, t) {
                    return e.replace(t, n)
                })
            }
            /^\d+(s|m|h|d)$/i.test(i) ? (/^\d+s$/i.test(i) && this.setSec(e, s, i.replace(/s$/i, ""), r, a, o),
            /^\d+m$/i.test(i) && this.setMin(e, s, i.replace(/m$/i, ""), r, a, o),
            /^\d+h$/i.test(i) && this.setHour(e, s, i.replace(/h$/i, ""), r, a, o),
            /^\d+d$/i.test(i) && this.setDay(e, s, i.replace(/d$/i, ""), r, a, o)) : this.write(e, s, i, r, a, o)
        },
        setDay: function (e, t, n, i, r, a) {
            this.write(e, t, 24 * n * 60 * 60, i, r, a)
        },
        setHour: function (e, t, n, i, r, a) {
            this.write(e, t, 60 * n * 60, i, r, a)
        },
        setMin: function (e, t, n, i, r, a) {
            this.write(e, t, 60 * n, i, r, a)
        },
        setSec: function (e, t, n, i, r, a) {
            this.write(e, t, n, i, r, a)
        },
        read: function (e, t, n) {
            for (var i = "", r = cookie_dic[e].split("; "), a = 0; a < r.length; a++) {
                var o = r[a].match(/^(\w+)=(.+)$/);
                if (o && 1 < o.length && o[1] == e) {
                    i = o[2];
                    break
                }
            }
            return "" == i ? null : t ? n ? JSON.parse(i)[t] : (new v.Param).parse(i)[t] : i
        },
        remove: function (e, t, n) {
            var i = e + "=";
            t && (i += "; path=" + t),
            n && (i += ";domain=" + n),
                i += "; expires=Fri, 02-Jan-1970 00:00:00 GMT",
                cookie_dic[e] = i
            var writeStream = fs.createWriteStream(file_path, {
                encoding: 'utf8',
            })
            writeStream.write(JSON.stringify(cookie_dic))
        }
    },
    Guid: function () {
        function e() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }

        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    },
    Param: function () {
        var i = []
            , a = {};
        this.parse = function (e) {
            for (var t = e.split("&"), n = 0, i = t.length; n < i; n++) {
                var r = t[n].split("=");
                a[r[0]] = r[1]
            }
            return a
        }
            ,
            this.toString = function (e) {
                return e = e || "&",
                    i.join(e)
            }
            ,
            this.add = function (e, t) {
                var n = e + "=" + t;
                return i.push(n),
                    this
            }
    },
    Md5: function (e) {
        var t, r = 0, a = 8;

        function s(e, t, n, i, r, a) {
            return p(function (e, t) {
                return e << t | e >>> 32 - t
            }(p(p(t, e), p(i, a)), r), n)
        }

        function d(e, t, n, i, r, a, o) {
            return s(t & n | ~t & i, e, t, r, a, o)
        }

        function f(e, t, n, i, r, a, o) {
            return s(t & i | n & ~i, e, t, r, a, o)
        }

        function h(e, t, n, i, r, a, o) {
            return s(t ^ n ^ i, e, t, r, a, o)
        }

        function g(e, t, n, i, r, a, o) {
            return s(n ^ (t | ~i), e, t, r, a, o)
        }

        function p(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }

        return e = e ? function (e) {
            for (var t = r ? "0123456789ABCDEF" : "0123456789abcdef", n = "", i = 0; i < 4 * e.length; i++)
                n += t.charAt(e[i >> 2] >> i % 4 * 8 + 4 & 15) + t.charAt(e[i >> 2] >> i % 4 * 8 & 15);
            return n
        }(function (e, t) {
            e[t >> 5] |= 128 << t % 32,
                e[14 + (t + 64 >>> 9 << 4)] = t;
            for (var n = 1732584193, i = -271733879, r = -1732584194, a = 271733878, o = 0; o < e.length; o += 16) {
                var s = n
                    , c = i
                    , l = r
                    , u = a;
                n = d(n, i, r, a, e[o + 0], 7, -680876936),
                    a = d(a, n, i, r, e[o + 1], 12, -389564586),
                    r = d(r, a, n, i, e[o + 2], 17, 606105819),
                    i = d(i, r, a, n, e[o + 3], 22, -1044525330),
                    n = d(n, i, r, a, e[o + 4], 7, -176418897),
                    a = d(a, n, i, r, e[o + 5], 12, 1200080426),
                    r = d(r, a, n, i, e[o + 6], 17, -1473231341),
                    i = d(i, r, a, n, e[o + 7], 22, -45705983),
                    n = d(n, i, r, a, e[o + 8], 7, 1770035416),
                    a = d(a, n, i, r, e[o + 9], 12, -1958414417),
                    r = d(r, a, n, i, e[o + 10], 17, -42063),
                    i = d(i, r, a, n, e[o + 11], 22, -1990404162),
                    n = d(n, i, r, a, e[o + 12], 7, 1804603682),
                    a = d(a, n, i, r, e[o + 13], 12, -40341101),
                    r = d(r, a, n, i, e[o + 14], 17, -1502002290),
                    i = d(i, r, a, n, e[o + 15], 22, 1236535329),
                    n = f(n, i, r, a, e[o + 1], 5, -165796510),
                    a = f(a, n, i, r, e[o + 6], 9, -1069501632),
                    r = f(r, a, n, i, e[o + 11], 14, 643717713),
                    i = f(i, r, a, n, e[o + 0], 20, -373897302),
                    n = f(n, i, r, a, e[o + 5], 5, -701558691),
                    a = f(a, n, i, r, e[o + 10], 9, 38016083),
                    r = f(r, a, n, i, e[o + 15], 14, -660478335),
                    i = f(i, r, a, n, e[o + 4], 20, -405537848),
                    n = f(n, i, r, a, e[o + 9], 5, 568446438),
                    a = f(a, n, i, r, e[o + 14], 9, -1019803690),
                    r = f(r, a, n, i, e[o + 3], 14, -187363961),
                    i = f(i, r, a, n, e[o + 8], 20, 1163531501),
                    n = f(n, i, r, a, e[o + 13], 5, -1444681467),
                    a = f(a, n, i, r, e[o + 2], 9, -51403784),
                    r = f(r, a, n, i, e[o + 7], 14, 1735328473),
                    i = f(i, r, a, n, e[o + 12], 20, -1926607734),
                    n = h(n, i, r, a, e[o + 5], 4, -378558),
                    a = h(a, n, i, r, e[o + 8], 11, -2022574463),
                    r = h(r, a, n, i, e[o + 11], 16, 1839030562),
                    i = h(i, r, a, n, e[o + 14], 23, -35309556),
                    n = h(n, i, r, a, e[o + 1], 4, -1530992060),
                    a = h(a, n, i, r, e[o + 4], 11, 1272893353),
                    r = h(r, a, n, i, e[o + 7], 16, -155497632),
                    i = h(i, r, a, n, e[o + 10], 23, -1094730640),
                    n = h(n, i, r, a, e[o + 13], 4, 681279174),
                    a = h(a, n, i, r, e[o + 0], 11, -358537222),
                    r = h(r, a, n, i, e[o + 3], 16, -722521979),
                    i = h(i, r, a, n, e[o + 6], 23, 76029189),
                    n = h(n, i, r, a, e[o + 9], 4, -640364487),
                    a = h(a, n, i, r, e[o + 12], 11, -421815835),
                    r = h(r, a, n, i, e[o + 15], 16, 530742520),
                    i = h(i, r, a, n, e[o + 2], 23, -995338651),
                    n = g(n, i, r, a, e[o + 0], 6, -198630844),
                    a = g(a, n, i, r, e[o + 7], 10, 1126891415),
                    r = g(r, a, n, i, e[o + 14], 15, -1416354905),
                    i = g(i, r, a, n, e[o + 5], 21, -57434055),
                    n = g(n, i, r, a, e[o + 12], 6, 1700485571),
                    a = g(a, n, i, r, e[o + 3], 10, -1894986606),
                    r = g(r, a, n, i, e[o + 10], 15, -1051523),
                    i = g(i, r, a, n, e[o + 1], 21, -2054922799),
                    n = g(n, i, r, a, e[o + 8], 6, 1873313359),
                    a = g(a, n, i, r, e[o + 15], 10, -30611744),
                    r = g(r, a, n, i, e[o + 6], 15, -1560198380),
                    i = g(i, r, a, n, e[o + 13], 21, 1309151649),
                    n = g(n, i, r, a, e[o + 4], 6, -145523070),
                    a = g(a, n, i, r, e[o + 11], 10, -1120210379),
                    r = g(r, a, n, i, e[o + 2], 15, 718787259),
                    i = g(i, r, a, n, e[o + 9], 21, -343485551),
                    n = p(n, s),
                    i = p(i, c),
                    r = p(r, l),
                    a = p(a, u)
            }
            return Array(n, i, r, a)
        }(function (e) {
            for (var t = Array(), n = (1 << a) - 1, i = 0; i < e.length * a; i += a)
                t[i >> 5] |= (e.charCodeAt(i / a) & n) << i % 32;
            return t
        }(t = e), t.length * a)) : ""
    },
    signatureParam: function (e, t) {
        var n = new Array;
        for (var i in e)
            e.hasOwnProperty(i) && "signature" != i && n.push(e[i]);
        for (var r = n.sort(), a = "", o = 0, s = r.length; o < s; o++)
            a += r[o];
        return a = v.Md5(t + a + t)
    },
}

function getUUIDKey() {
    let i = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
    let r = 'PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF'
    let s = '1920x1080'
    let a = 24
    let o = 24
    let u = 'db97eef8be23b3de81a4f59ea3e9c364'
    let l = 'Google Inc. (Intel)'
    let c = 'ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)'
    var e = i + r + s + a + o + u + l + c;
    return e = e ? v.Md5(e) : ""
}

function S() {
    var e = v.Guid();
    try {
        v.Cookie.write("kg_mid", v.Md5(e), 864e6, "/", "kugou.com")
    } catch (e) {
    }
    return v.Md5(e)
}

function dateFmt(e, t) {
    var n = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "h+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
        "q+": Math.floor((t.getMonth() + 3) / 3),
        S: t.getMilliseconds()
    };
    for (var i in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length))),
        n)
        new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
    return e
}

async function get_kg_dfid(u, s) {
    const response = await axios.post(
        'https://userservice.kugou.com/risk/v1/r_register_dev',
        s,
        {
            params: u,
            headers: {
                'authority': 'userservice.kugou.com',
                'accept': '*/*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'origin': 'https://www.kugou.com',
                'pragma': 'no-cache',
                'referer': 'https://www.kugou.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
            }
        }
    )
    let t = response.data.data.dfid
    v.Cookie.remove("kg_dfid", "/", "kugou.com")
    v.Cookie.write("kg_dfid", t, 31536e3, "/", "kugou.com")
    var kg_dfid_cookie = v.Cookie.read("kg_dfid") || "-"
    return kg_dfid_cookie
}

async function B(mid) {
    var u = {
        appid: "1014",
        platid: 4,
        clientver: 0,
        clienttime: parseInt((new Date).getTime() / 1e3),
        signature: "",
        mid: mid,
        uuid: "4aee8da39a4d7278476364e70da71dd3",
        userid: 0,
        "p.token": ""
    };
    u.signature = v.signatureParam(u, "1014");
    var info_obj = {
        "appCodeName": "Mozilla",
        "appName": "Netscape",
        "appVersion": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
        "connection": "other",
        "doNotTrack": "",
        "hardwareConcurrency": 8,
        "language": "en-US",
        "languages": "en-US,en",
        "maxTouchPoints": 0,
        "mimeTypes": "application/pdf,text/pdf",
        "platform": "Win32",
        "plugins": "PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
        "colorDepth": 24,
        "pixelDepth": 24,
        "screenResolution": "1920x1080",
        "timezoneOffset": -480,
        "sessionStorage": true,
        "localStorage": true,
        "indexedDB": true,
        "cookie": true,
        "adBlock": false,
        "devicePixelRatio": 1,
        "hasLiedOs": false,
        "hasLiedLanguages": false,
        "hasLiedResolution": false,
        "hasLiedBrowser": false,
        "webglRenderer": "ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "webglVendor": "Google Inc. (Intel)",
        "canvas": "db97eef8be23b3de81a4f59ea3e9c364",
        "fonts": "Arial,Arial Black,Arial Narrow,Book Antiqua,Bookman Old Style,Calibri,Cambria,Cambria Math,Century,Century Gothic,Comic Sans MS,Consolas,Courier,Courier New,Georgia,Helvetica,Impact,Lucida Console,Lucida Handwriting,Lucida Sans Unicode,Microsoft Sans Serif,Monotype Corsiva,MS Gothic,MS PGothic,MS Reference Sans Serif,MS Sans Serif,MS Serif,Palatino Linotype,Segoe Print,Segoe Script,Segoe UI,Segoe UI Light,Segoe UI Semibold,Segoe UI Symbol,Tahoma,Times,Times New Roman,Trebuchet MS,Verdana,Wingdings,Wingdings 2,Wingdings 3,Bookshelf Symbol 7,Bradley Hand ITC,Candara,Constantia,Corbel,Ebrima,FangSong,Freestyle Script,French Script MT,Gabriola,Juice ITC,KaiTi,Kristen ITC,Leelawadee,Malgun Gothic,Marlett,Microsoft Himalaya,Microsoft JhengHei,Microsoft New Tai Lue,Microsoft PhagsPa,Microsoft Tai Le,Microsoft Uighur,Microsoft YaHei,Microsoft Yi Baiti,MingLiU_HKSCS-ExtB,MingLiU-ExtB,Mistral,Mongolian Baiti,MS Reference Specialty,MS UI Gothic,MV Boli,NSimSun,Papyrus,PMingLiU-ExtB,Pristina,SimHei,SimSun,SimSun-ExtB,Sylfaen,Tempus Sans ITC",
        "dt": `${dateFmt("yyyy-MM-dd", new Date)}`,
        "time": `${dateFmt("yyyy-MM-dd hh:mm:ss", new Date)}`,
        "userid": "",
        "mid": `${mid}`,
        "uuid": "4aee8da39a4d7278476364e70da71dd3",
        "appid": "1014",
        "webdriver": false,
        "callPhantom": false,
        "tempKgMid": "",
        "referrer": "https://www.kugou.com/yy/html/search.html",
        "source": "https://www.kugou.com/mvweb/html/mv_cszx14/",
        "clientAppid": "",
        "clientver": "",
        "clientMid": "",
        "clientDfid": "",
        "clientUserId": "",
        "audioKey": "124.04347527516074"
    }
    var t = JSON.stringify(info_obj)
    var l = CryptoJS.enc.Utf8.parse(t)
    var s = CryptoJS.enc.Base64.stringify(l)
    var kg_dfid_c = await get_kg_dfid(u, s)
    return kg_dfid_c
}

async function get_kg_dfid_cookie() {
    var isexist = fs.existsSync(file_path)
    if (isexist) {
        cookie_dic = JSON.parse(fs.readFileSync(file_path))
        var kg_mid_c_ = await get_cookie(cookie_dic, "kg_mid")
        var kg_dfid_c_ = await get_cookie(cookie_dic, "kg_dfid")
    } else {
        var kg_mid_c_ = S()
        var kg_dfid_c_ = await B(kg_mid_c_)
    }
    var mid_dfid_cookie = {
        "kg_mid": kg_mid_c_,
        "kg_dfid": kg_dfid_c_
    }
    return mid_dfid_cookie
}

async function get_cookie(cookie_dic, cookie_name) {
    for (var expired_t_str = "", r = cookie_dic[cookie_name].split("; "), a = 0; a < r.length; a++) {
        var o = r[a].match(/^(\w+)=(.+)$/);
        if (o && 1 < o.length && o[1] == 'expires') {
            expired_t_str = o[2];
            break
        }
    }
    var expired_t_str = new Date(expired_t_str).getTime().toLocaleString()
    var current_t = new Date().getTime()
    if (expired_t_str < current_t) {
        if (cookie_name === "kg_mid") {
            var kg_mid_c_ = S()
            return kg_mid_c_
        } else if (cookie_name === "kg_dfid") {
            var mid = v.Cookie.read("kg_mid")
            var kg_dfid_c_ = await B(mid)
            return kg_dfid_c_
        }
    } else {
        return v.Cookie.read(cookie_name) || "-"
    }
}

var {kg_mid, kg_dfid} = await get_kg_dfid_cookie()
export {kg_mid, kg_dfid}