var CryptoJS = require("crypto-js");
var base64js = require('base64-js')
var body = $response.body;
var obj = JSON.parse(body);
console.log(obj)
obj['result'] = 0;
body = JSON.stringify(obj);

console.log(body);

$done(body);


function decrypt(t) {
    var e = Array.from(base64js.toByteArray(t))
    var n = e.splice(0, 12)
    var c = function (text) {
        for (var code = encodeURIComponent(text), t = [], i = 0; i < code.length; i++) {
            var e = code.charAt(i);
            if ("%" === e) {
                var n = code.charAt(i + 1) + code.charAt(i + 2)
                    , r = parseInt(n, 16);
                t.push(r),
                    i += 2
            } else
                t.push(e.charCodeAt(0))
        }
        return t
    }("rTukA&w1578VAD3#AY3fkL#rBnU^DDuO")
    var f = [].concat(c, n)
    var d = parseInt(f.length / 2)
    var m = base64js.fromByteArray(f)
    var v = CryptoJS.enc.Base64.parse(m)

    function T(t) {
        var e = 0
            , n = t.length;
        if (n % 2 != 0)
            return null;
        n /= 2;
        for (var r = [], i = 0; i < n; i++) {
            var s = t.substr(e, 2)
                , o = parseInt(s, 16);
            r.push(o),
                e += 2
        }
        return r
    }

    var y = T(CryptoJS.SHA256(v).toString()).splice(8, 16)
    var w = [].concat(y, f.splice(0, d))
    var _ = base64js.fromByteArray(w)
    var M = CryptoJS.enc.Base64.parse(_)
    var k = T(CryptoJS.SHA256(M).toString())
    console.log(k)
    var S = [].concat(f, y)
    var x = base64js.fromByteArray(S)
    var B = CryptoJS.enc.Base64.parse(x)
    var E = T(CryptoJS.SHA256(B).toString())
    console.log(E)
    var C = [].concat(k.splice(0, 8), E.splice(8, 16), k.splice(16, 24))
    var O = [].concat(E.splice(0, 4), k.splice(4, 8), E.splice(8, 12))
    var data = base64js.fromByteArray(e)
    var A = CryptoJS.enc.Base64.parse(base64js.fromByteArray(C))
    var P = CryptoJS.enc.Base64.parse(base64js.fromByteArray(O))
    console.log(P.toString())
    return CryptoJS.AES.decrypt(data, A, {iv: P, mode: CryptoJS.mode.CBC}).toString(CryptoJS.enc.Utf8)
}