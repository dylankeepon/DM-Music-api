import {kg_mid,kg_dfid} from "./kg_dfid.js"
var cookie = ""
var e = {
    Cookie: {
        write: function(e, n, t, i, r, o) {
            /^\w*$/.test(e) || alert("cookie格式不正确"),
            /; /.test(n) && alert("cookie格式不正确");
            var a = e + "=" + n;
            if (t) {
                var l = new Date;
                l.setTime(l.getTime() + 1e3 * t),
                a += "; expires=" + l.toGMTString()
            }
            i && (a += "; path=" + i),
            r && (a += "; domain=" + r),
            o && (a += "; secure"),
            cookie = a
        },
        rewriteKey: function(e, n, t, i, r, o, a) {
            var l = n;
            if (t) {
                var s = this.read(e)
                  , c = new RegExp("\\b" + n + "=([^&]*)\\b","g");
                l = s.replace(c, function(e, n) {
                    return e.replace(n, t)
                })
            }
            /^\d+(s|m|h|d)$/i.test(i) ? (/^\d+s$/i.test(i) && this.setSec(e, l, i.replace(/s$/i, ""), r, o, a),
            /^\d+m$/i.test(i) && this.setMin(e, l, i.replace(/m$/i, ""), r, o, a),
            /^\d+h$/i.test(i) && this.setHour(e, l, i.replace(/h$/i, ""), r, o, a),
            /^\d+d$/i.test(i) && this.setDay(e, l, i.replace(/d$/i, ""), r, o, a)) : this.write(e, l, i, r, o, a)
        },
        setDay: function(e, n, t, i, r, o) {
            this.write(e, n, 24 * t * 60 * 60, i, r, o)
        },
        setHour: function(e, n, t, i, r, o) {
            this.write(e, n, 60 * t * 60, i, r, o)
        },
        setMin: function(e, n, t, i, r, o) {
            this.write(e, n, 60 * t, i, r, o)
        },
        setSec: function(e, n, t, i, r, o) {
            this.write(e, n, t, i, r, o)
        },
        read: function(n, t, i) {
            for (var r = "", o = cookie.split("; "), a = 0; a < o.length; a++) {
                var l = o[a].match(/^(\w+)=(.+)$/);
                if (l && l.length > 1 && l[1] == n) {
                    r = l[2];
                    break
                }
            }
            return "" == r ? null : t ? i ? JSON.parse(r)[t] : (new e.Param).parse(r)[t] : r
        },
        remove: function(e, n, t) {
            var i = e + "=";
            n && (i += "; path=" + n),
            t && (i += ";domain=" + t),
            i += "; expires=Fri, 02-Jan-1970 00:00:00 GMT",
            cookie = i
        }
    },
    Md5: function(e) {
        function n(e, n) {
            e[n >> 5] |= 128 << n % 32,
            e[14 + (n + 64 >>> 9 << 4)] = n;
            for (var t = 1732584193, s = -271733879, c = -1732584194, u = 271733878, d = 0; d < e.length; d += 16) {
                var f = t
                  , m = s
                  , g = c
                  , p = u;
                s = a(s = a(s = a(s = a(s = o(s = o(s = o(s = o(s = r(s = r(s = r(s = r(s = i(s = i(s = i(s = i(s, c = i(c, u = i(u, t = i(t, s, c, u, e[d + 0], 7, -680876936), s, c, e[d + 1], 12, -389564586), t, s, e[d + 2], 17, 606105819), u, t, e[d + 3], 22, -1044525330), c = i(c, u = i(u, t = i(t, s, c, u, e[d + 4], 7, -176418897), s, c, e[d + 5], 12, 1200080426), t, s, e[d + 6], 17, -1473231341), u, t, e[d + 7], 22, -45705983), c = i(c, u = i(u, t = i(t, s, c, u, e[d + 8], 7, 1770035416), s, c, e[d + 9], 12, -1958414417), t, s, e[d + 10], 17, -42063), u, t, e[d + 11], 22, -1990404162), c = i(c, u = i(u, t = i(t, s, c, u, e[d + 12], 7, 1804603682), s, c, e[d + 13], 12, -40341101), t, s, e[d + 14], 17, -1502002290), u, t, e[d + 15], 22, 1236535329), c = r(c, u = r(u, t = r(t, s, c, u, e[d + 1], 5, -165796510), s, c, e[d + 6], 9, -1069501632), t, s, e[d + 11], 14, 643717713), u, t, e[d + 0], 20, -373897302), c = r(c, u = r(u, t = r(t, s, c, u, e[d + 5], 5, -701558691), s, c, e[d + 10], 9, 38016083), t, s, e[d + 15], 14, -660478335), u, t, e[d + 4], 20, -405537848), c = r(c, u = r(u, t = r(t, s, c, u, e[d + 9], 5, 568446438), s, c, e[d + 14], 9, -1019803690), t, s, e[d + 3], 14, -187363961), u, t, e[d + 8], 20, 1163531501), c = r(c, u = r(u, t = r(t, s, c, u, e[d + 13], 5, -1444681467), s, c, e[d + 2], 9, -51403784), t, s, e[d + 7], 14, 1735328473), u, t, e[d + 12], 20, -1926607734), c = o(c, u = o(u, t = o(t, s, c, u, e[d + 5], 4, -378558), s, c, e[d + 8], 11, -2022574463), t, s, e[d + 11], 16, 1839030562), u, t, e[d + 14], 23, -35309556), c = o(c, u = o(u, t = o(t, s, c, u, e[d + 1], 4, -1530992060), s, c, e[d + 4], 11, 1272893353), t, s, e[d + 7], 16, -155497632), u, t, e[d + 10], 23, -1094730640), c = o(c, u = o(u, t = o(t, s, c, u, e[d + 13], 4, 681279174), s, c, e[d + 0], 11, -358537222), t, s, e[d + 3], 16, -722521979), u, t, e[d + 6], 23, 76029189), c = o(c, u = o(u, t = o(t, s, c, u, e[d + 9], 4, -640364487), s, c, e[d + 12], 11, -421815835), t, s, e[d + 15], 16, 530742520), u, t, e[d + 2], 23, -995338651), c = a(c, u = a(u, t = a(t, s, c, u, e[d + 0], 6, -198630844), s, c, e[d + 7], 10, 1126891415), t, s, e[d + 14], 15, -1416354905), u, t, e[d + 5], 21, -57434055), c = a(c, u = a(u, t = a(t, s, c, u, e[d + 12], 6, 1700485571), s, c, e[d + 3], 10, -1894986606), t, s, e[d + 10], 15, -1051523), u, t, e[d + 1], 21, -2054922799), c = a(c, u = a(u, t = a(t, s, c, u, e[d + 8], 6, 1873313359), s, c, e[d + 15], 10, -30611744), t, s, e[d + 6], 15, -1560198380), u, t, e[d + 13], 21, 1309151649), c = a(c, u = a(u, t = a(t, s, c, u, e[d + 4], 6, -145523070), s, c, e[d + 11], 10, -1120210379), t, s, e[d + 2], 15, 718787259), u, t, e[d + 9], 21, -343485551),
                t = l(t, f),
                s = l(s, m),
                c = l(c, g),
                u = l(u, p)
            }
            return Array(t, s, c, u)
        }
        function t(e, n, t, i, r, o) {
            return l(s(l(l(n, e), l(i, o)), r), t)
        }
        function i(e, n, i, r, o, a, l) {
            return t(n & i | ~n & r, e, n, o, a, l)
        }
        function r(e, n, i, r, o, a, l) {
            return t(n & r | i & ~r, e, n, o, a, l)
        }
        function o(e, n, i, r, o, a, l) {
            return t(n ^ i ^ r, e, n, o, a, l)
        }
        function a(e, n, i, r, o, a, l) {
            return t(i ^ (n | ~r), e, n, o, a, l)
        }
        function l(e, n) {
            var t = (65535 & e) + (65535 & n);
            return (e >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t
        }
        function s(e, n) {
            return e << n | e >>> 32 - n
        }
        function c(e) {
            for (var n = Array(), t = (1 << d) - 1, i = 0; i < e.length * d; i += d)
                n[i >> 5] |= (e.charCodeAt(i / d) & t) << i % 32;
            return n
        }
        function u(e) {
            for (var n = "", t = 0; t < 4 * e.length; t++)
                n += "0123456789abcdef".charAt(e[t >> 2] >> t % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(e[t >> 2] >> t % 4 * 8 & 15);
            return n
        }
        var d = 8;
        return e = e ? function(e) {
            return u(n(c(e), e.length * d))
        }(e) : ""
    },
    Param: function() {
        var e = []
          , n = {};
        this.parse = function(e) {
            for (var t = e.split("&"), i = 0, r = t.length; i < r; i++) {
                var o = t[i].split("=");
                n[o[0]] = o[1]
            }
            return n
        }
        ,
        this.toString = function(n) {
            return n = n || "&",
            e.join(n)
        }
        ,
        this.add = function(n, t) {
            var i = n + "=" + t;
            return e.push(i),
            this
        }
    },
    IsEmpty: function(e) {
        return void 0 === e || null == e || "" == e
    },
    Guid: function() {
        function e() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    },
    getKgMid: function() {
        var n = e.Cookie.read("kg_mid");
        if (e.IsEmpty(n)) {
            var t = e.Guid();
            n = e.Md5(t);
            try {
                e.Cookie.write("kg_mid", e.Md5(t), 864e6, "/", "kugou.com")
            } catch (e) {}
        }
        return n
    },
}
function get_data(t) {
    var o = {}
    // o.appid = `${t}` || null,
    // o.dfid = kg_dfid,
    // o.mid = e.getKgMid(),
    // o.token = "",
    // o.userid = "0",
    // o.uuid = o.mid;




    o.appid = t || null,
    o.mid = kg_mid,
    o.uuid = kg_mid,
    o.plat = 4,
    o.dfid = kg_dfid,
    o.userid = e.Cookie.read("KuGoo", "KugooID"),
    o.userpic = e.Cookie.read("KuGoo", "Pic"),
    o.userNickName = e.Cookie.read("KuGoo", "NickName"),
    o.token = e.Cookie.read("KuGoo", "t");
    var a = e.Cookie.read("KuGoo", "a_id");
    a && a != o.appid && o.appid && (o.userid = null,
    o.token = null,
    o.userpic = null,
    o.userNickName = null),
    o.clientver = 1e3,
    o.userNickName = o.userNickName ? unescape(o.userNickName) : ""
    return o
    // i && i(o)
}
var encode_cookie = get_data(1014)
export {encode_cookie}

