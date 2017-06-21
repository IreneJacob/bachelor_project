// Copyright 2011 Google Inc. All Rights Reserved.
(function() {
    var h, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (c.get || c.set)
            throw new TypeError("ES3 does not support getters and setters.");
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
    , ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, ca = function(a, b) {
        if (b) {
            var c = ba;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && aa(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    };
    ca("Object.assign", function(a) {
        return a ? a : function(a, c) {
            for (var b = 1; b < arguments.length; b++) {
                var e = arguments[b];
                if (e)
                    for (var f in e)
                        Object.prototype.hasOwnProperty.call(e, f) && (a[f] = e[f])
            }
            return a
        }
    });
    ca("Array.prototype.fill", function(a) {
        return a ? a : function(a, c, d) {
            var b = this.length || 0;
            0 > c && (c = Math.max(0, b + c));
            if (null == d || d > b)
                d = b;
            d = Number(d);
            0 > d && (d = Math.max(0, b + d));
            for (c = Number(c || 0); c < d; c++)
                this[c] = a;
            return this
        }
    });
    var m = this
      , p = function(a) {
        return void 0 !== a
    }
      , q = function(a, b, c) {
        a = a.split(".");
        c = c || m;
        a[0]in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            !a.length && p(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {}
    }
      , ea = function(a, b) {
        a = a.split(".");
        b = b || m;
        for (var c; c = a.shift(); )
            if (null != b[c])
                b = b[c];
            else
                return null;
        return b
    }
      , fa = function() {}
      , ga = function(a) {
        a.Bb = void 0;
        a.getInstance = function() {
            return a.Bb ? a.Bb : a.Bb = new a
        }
    }
      , ha = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }
      , ia = function(a) {
        return "array" == ha(a)
    }
      , ka = function(a) {
        var b = ha(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , r = function(a) {
        return "string" == typeof a
    }
      , t = function(a) {
        return "number" == typeof a
    }
      , v = function(a) {
        return "function" == ha(a)
    }
      , ma = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , na = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , oa = 0
      , pa = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , ra = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , w = function(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? w = pa : w = ra;
        return w.apply(null, arguments)
    }
      , sa = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
      , ta = Date.now || function() {
        return +new Date
    }
      , x = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.R = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.$k = function(a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
                d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d)
        }
    };
    var ua = document
      , y = window;
    var va;
    var wa = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
      , xa = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }
      , Fa = function(a) {
        if (!ya.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(za, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(Aa, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(Ba, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(Ca, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(Da, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(Ea, "&#0;"));
        return a
    }
      , za = /&/g
      , Aa = /</g
      , Ba = />/g
      , Ca = /"/g
      , Da = /'/g
      , Ea = /\x00/g
      , ya = /[\x00&<>"']/
      , Ga = function(a, b) {
        a.length > b && (a = a.substring(0, b - 3) + "...");
        return a
    }
      , z = function(a, b) {
        return -1 != a.toLowerCase().indexOf(b.toLowerCase())
    }
      , Ha = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    }
    : function(a, b) {
        return Array(b + 1).join(a)
    }
      , Ja = function(a) {
        return null == a ? "" : String(a)
    }
      , La = function(a, b) {
        var c = 0;
        a = xa(String(a)).split(".");
        b = xa(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length)
                    break;
                c = Ka(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || Ka(0 == f[2].length, 0 == g[2].length) || Ka(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    }
      , Ka = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
      , Ma = 2147483648 * Math.random() | 0
      , Na = function(a) {
        var b = Number(a);
        return 0 == b && wa(a) ? NaN : b
    }
      , Oa = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    }
      , Pa = function(a) {
        var b = r(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])","g"), function(a, b, e) {
            return b + e.toUpperCase()
        })
    };
    var Qa = function(a, b) {
        if (r(a))
            return r(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , A = function(a, b, c) {
        for (var d = a.length, e = r(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
      , Ra = function(a, b, c) {
        for (var d = a.length, e = [], f = 0, g = r(a) ? a.split("") : a, k = 0; k < d; k++)
            if (k in g) {
                var l = g[k];
                b.call(c, l, k, a) && (e[f++] = l)
            }
        return e
    }
      , Sa = function(a, b, c) {
        for (var d = a.length, e = Array(d), f = r(a) ? a.split("") : a, g = 0; g < d; g++)
            g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }
      , Ta = function(a, b, c) {
        for (var d = a.length, e = r(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return !0;
        return !1
    }
      , Ua = function(a, b) {
        var c = 0;
        A(a, function(a, e, f) {
            b.call(void 0, a, e, f) && ++c
        }, void 0);
        return c
    }
      , Wa = function(a, b, c) {
        b = Va(a, b, c);
        return 0 > b ? null : r(a) ? a.charAt(b) : a[b]
    }
      , Va = function(a, b, c) {
        for (var d = a.length, e = r(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return f;
        return -1
    }
      , Xa = function(a, b) {
        return 0 <= Qa(a, b)
    }
      , Za = function() {
        var a = Ya;
        if (!ia(a))
            for (var b = a.length - 1; 0 <= b; b--)
                delete a[b];
        a.length = 0
    }
      , $a = function(a, b) {
        b = Qa(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
      , ab = function(a) {
        return Array.prototype.concat.apply([], arguments)
    }
      , bb = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
      , cb = function(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    }
      , db = function(a) {
        for (var b = [], c = 0; c < a; c++)
            b[c] = 0;
        return b
    }
      , eb = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            if (ia(d))
                for (var e = 0; e < d.length; e += 8192)
                    for (var f = eb.apply(null, cb(d, e, e + 8192)), g = 0; g < f.length; g++)
                        b.push(f[g]);
            else
                b.push(d)
        }
        return b
    };
    var B;
    a: {
        var fb = m.navigator;
        if (fb) {
            var ib = fb.userAgent;
            if (ib) {
                B = ib;
                break a
            }
        }
        B = ""
    }
    var D = function(a) {
        return -1 != B.indexOf(a)
    };
    var jb = function(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
      , kb = function(a, b) {
        var c = {}, d;
        for (d in a)
            b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }
      , nb = function(a) {
        var b = lb, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return !0;
        return !1
    }
      , ob = function(a) {
        var b = 0, c;
        for (c in a)
            b++;
        return b
    }
      , pb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }
      , qb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
      , rb = function(a, b) {
        for (var c = ka(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]],
        p(a)); c++)
            ;
        return a
    }
      , sb = function(a, b) {
        return null !== a && b in a
    }
      , vb = function(a) {
        var b = ub, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return c
    }
      , wb = function(a) {
        for (var b in a)
            return !1;
        return !0
    }
      , xb = function(a, b, c) {
        return null !== a && b in a ? a[b] : c
    }
      , yb = function(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
      , zb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
      , Ab = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < zb.length; f++)
                c = zb[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var Cb = function() {
        return D("Safari") && !(Bb() || D("Coast") || D("Opera") || D("Edge") || D("Silk") || D("Android"))
    }
      , Bb = function() {
        return (D("Chrome") || D("CriOS")) && !D("Edge")
    };
    var Db = function() {
        return D("iPhone") && !D("iPod") && !D("iPad")
    }
      , Eb = function() {
        return Db() || D("iPad") || D("iPod")
    };
    var Fb = function(a) {
        Fb[" "](a);
        return a
    };
    Fb[" "] = fa;
    var Gb = function(a, b) {
        try {
            return Fb(a[b]),
            !0
        } catch (c) {}
        return !1
    }
      , Ib = function(a, b) {
        var c = Hb;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var Jb = D("Opera"), E = D("Trident") || D("MSIE"), Mb = D("Edge"), Nb = D("Gecko") && !(z(B, "WebKit") && !D("Edge")) && !(D("Trident") || D("MSIE")) && !D("Edge"), Ob = z(B, "WebKit") && !D("Edge"), Pb = D("Macintosh"), Qb = D("Windows"), Rb = D("Android"), Sb = Db(), Tb = D("iPad"), Ub = D("iPod"), Vb = Eb(), Wb = function() {
        var a = m.document;
        return a ? a.documentMode : void 0
    }, Xb;
    a: {
        var Zb = ""
          , $b = function() {
            var a = B;
            if (Nb)
                return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (Mb)
                return /Edge\/([\d\.]+)/.exec(a);
            if (E)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Ob)
                return /WebKit\/(\S+)/.exec(a);
            if (Jb)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        $b && (Zb = $b ? $b[1] : "");
        if (E) {
            var ac = Wb();
            if (null != ac && ac > parseFloat(Zb)) {
                Xb = String(ac);
                break a
            }
        }
        Xb = Zb
    }
    var bc = Xb, Hb = {}, F = function(a) {
        return Ib(a, function() {
            return 0 <= La(bc, a)
        })
    }, cc;
    var dc = m.document;
    cc = dc && E ? Wb() || ("CSS1Compat" == dc.compatMode ? parseInt(bc, 10) : 5) : void 0;
    var G = function(a, b) {
        this.x = p(a) ? a : 0;
        this.y = p(b) ? b : 0
    };
    G.prototype.clone = function() {
        return new G(this.x,this.y)
    }
    ;
    var ec = function(a, b) {
        return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
    };
    G.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    G.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    G.prototype.scale = function(a, b) {
        b = t(b) ? b : a;
        this.x *= a;
        this.y *= b;
        return this
    }
    ;
    var fc = !E || 9 <= Number(cc);
    !Nb && !E || E && 9 <= Number(cc) || Nb && F("1.9.1");
    E && F("9");
    var gc = E || Jb || Ob;
    var hc = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    var jc = function() {
        this.g = "";
        this.h = ic
    };
    jc.prototype.Ba = !0;
    jc.prototype.ya = function() {
        return this.g
    }
    ;
    jc.prototype.toString = function() {
        return "Const{" + this.g + "}"
    }
    ;
    var kc = function(a) {
        return a instanceof jc && a.constructor === jc && a.h === ic ? a.g : "type_error:Const"
    }
      , ic = {}
      , lc = function(a) {
        var b = new jc;
        b.g = a;
        return b
    };
    lc("");
    var nc = function() {
        this.g = "";
        this.h = mc
    };
    nc.prototype.Ba = !0;
    var mc = {};
    nc.prototype.ya = function() {
        return this.g
    }
    ;
    var oc = function(a) {
        var b = new nc;
        b.g = a;
        return b
    }
      , pc = oc("")
      , qc = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
    var sc = function() {
        this.g = "";
        this.h = rc
    };
    sc.prototype.Ba = !0;
    sc.prototype.ya = function() {
        return this.g
    }
    ;
    sc.prototype.Ab = !0;
    sc.prototype.Pa = function() {
        return 1
    }
    ;
    var rc = {}
      , tc = function(a) {
        var b = new sc;
        b.g = a;
        return b
    };
    var vc = function() {
        this.g = "";
        this.h = uc
    };
    vc.prototype.Ba = !0;
    vc.prototype.ya = function() {
        return this.g
    }
    ;
    vc.prototype.Ab = !0;
    vc.prototype.Pa = function() {
        return 1
    }
    ;
    var wc = function(a) {
        if (a instanceof vc && a.constructor === vc && a.h === uc)
            return a.g;
        ha(a);
        return "type_error:SafeUrl"
    }
      , xc = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i
      , Ac = function(a) {
        if (a instanceof vc)
            return a;
        a = a.Ba ? a.ya() : String(a);
        xc.test(a) || (a = "about:invalid#zClosurez");
        return yc(a)
    }
      , uc = {}
      , yc = function(a) {
        var b = new vc;
        b.g = a;
        return b
    };
    yc("about:blank");
    var Cc = function() {
        this.g = "";
        this.l = Bc;
        this.h = null
    };
    Cc.prototype.Ab = !0;
    Cc.prototype.Pa = function() {
        return this.h
    }
    ;
    Cc.prototype.Ba = !0;
    Cc.prototype.ya = function() {
        return this.g
    }
    ;
    var Dc = function(a) {
        if (a instanceof Cc && a.constructor === Cc && a.l === Bc)
            return a.g;
        ha(a);
        return "type_error:SafeHtml"
    }
      , Fc = function(a) {
        if (a instanceof Cc)
            return a;
        var b = null;
        a.Ab && (b = a.Pa());
        a = Fa(a.Ba ? a.ya() : String(a));
        return Ec(a, b)
    }
      , Gc = /^[a-zA-Z0-9-]+$/
      , Hc = {
        action: !0,
        cite: !0,
        data: !0,
        formaction: !0,
        href: !0,
        manifest: !0,
        poster: !0,
        src: !0
    }
      , Ic = function(a) {
        var b = 0
          , c = ""
          , d = function(a) {
            ia(a) ? A(a, d) : (a = Fc(a),
            c += Dc(a),
            a = a.Pa(),
            0 == b ? b = a : 0 != a && b != a && (b = null))
        };
        A(arguments, d);
        return Ec(c, b)
    }
      , Bc = {}
      , Ec = function(a, b) {
        var c = new Cc;
        c.g = a;
        c.h = b;
        return c
    }
      , Jc = function(a, b, c) {
        var d = null
          , e = "";
        if (b)
            for (Z in b) {
                if (!Gc.test(Z))
                    throw Error('Invalid attribute name "' + Z + '".');
                var f = b[Z];
                if (null != f) {
                    var g = a;
                    var k = Z;
                    var l = f;
                    if (l instanceof jc)
                        l = kc(l);
                    else if ("style" == k.toLowerCase()) {
                        f = void 0;
                        g = l;
                        if (!ma(g))
                            throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof g + " given: " + g);
                        if (!(g instanceof nc)) {
                            l = "";
                            for (f in g) {
                                if (!/^[-_a-zA-Z0-9]+$/.test(f))
                                    throw Error("Name allows only [-_a-zA-Z0-9], got: " + f);
                                var n = g[f];
                                if (null != n) {
                                    if (n instanceof jc)
                                        n = kc(n);
                                    else if (qc.test(n)) {
                                        for (var u = !0, C = !0, T = 0; T < n.length; T++) {
                                            var qa = n.charAt(T);
                                            "'" == qa && C ? u = !u : '"' == qa && u && (C = !C)
                                        }
                                        u && C || (n = "zClosurez")
                                    } else
                                        n = "zClosurez";
                                    l += f + ":" + n + ";"
                                }
                            }
                            g = l ? oc(l) : pc
                        }
                        g instanceof nc && g.constructor === nc && g.h === mc ? f = g.g : (ha(g),
                        f = "type_error:SafeStyle");
                        l = f
                    } else {
                        if (/^on/i.test(k))
                            throw Error('Attribute "' + k + '" requires goog.string.Const value, "' + l + '" given.');
                        if (k.toLowerCase()in Hc)
                            if (l instanceof sc)
                                l instanceof sc && l.constructor === sc && l.h === rc ? l = l.g : (ha(l),
                                l = "type_error:TrustedResourceUrl");
                            else if (l instanceof vc)
                                l = wc(l);
                            else if (r(l))
                                l = Ac(l).ya();
                            else
                                throw Error('Attribute "' + k + '" on tag "' + g + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + l + '" given.');
                    }
                    l.Ba && (l = l.ya());
                    k = k + '="' + Fa(String(l)) + '"';
                    e += " " + k
                }
            }
        var Z = "<" + a + e;
        null != c ? ia(c) || (c = [c]) : c = [];
        !0 === hc[a.toLowerCase()] ? Z += ">" : (d = Ic(c),
        Z += ">" + Dc(d) + "</" + a + ">",
        d = d.Pa());
        (a = b && b.dir) && (/^(ltr|rtl|auto)$/i.test(a) ? d = 0 : d = null);
        return Ec(Z, d)
    }
      , Kc = function(a, b, c) {
        var d = {}, e;
        for (e in a)
            d[e] = a[e];
        for (e in b)
            d[e] = b[e];
        for (e in c) {
            var f = e.toLowerCase();
            if (f in a)
                throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
            f in b && delete d[f];
            d[e] = c[e]
        }
        return d
    };
    Ec("<!DOCTYPE html>", 0);
    Ec("", 0);
    Ec("<br>", 0);
    var H = function(a, b) {
        this.width = a;
        this.height = b
    };
    h = H.prototype;
    h.clone = function() {
        return new H(this.width,this.height)
    }
    ;
    h.isEmpty = function() {
        return !(this.width * this.height)
    }
    ;
    h.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    h.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    h.scale = function(a, b) {
        b = t(b) ? b : a;
        this.width *= a;
        this.height *= b;
        return this
    }
    ;
    var Rc = function(a) {
        return a ? new Lc(Qc(a)) : va || (va = new Lc)
    }
      , Tc = function(a, b) {
        jb(b, function(b, d) {
            b && b.Ba && (b = b.ya());
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Sc.hasOwnProperty(d) ? a.setAttribute(Sc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }
      , Sc = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }
      , Uc = function(a) {
        a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new H(a.clientWidth,a.clientHeight)
    }
      , Vc = function(a) {
        var b = a.scrollingElement ? a.scrollingElement : Ob || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return E && F("10") && a.pageYOffset != b.scrollTop ? new G(b.scrollLeft,b.scrollTop) : new G(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
      , I = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    }
      , Xc = function(a, b, c) {
        var d = arguments
          , e = document
          , f = String(d[0])
          , g = d[1];
        if (!fc && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', Fa(g.name), '"');
            if (g.type) {
                f.push(' type="', Fa(g.type), '"');
                var k = {};
                Ab(k, g);
                delete k.type;
                g = k
            }
            f.push(">");
            f = f.join("")
        }
        f = e.createElement(f);
        g && (r(g) ? f.className = g : ia(g) ? f.className = g.join(" ") : Tc(f, g));
        2 < d.length && Wc(e, f, d);
        return f
    }
      , Wc = function(a, b, c) {
        function d(c) {
            c && b.appendChild(r(c) ? a.createTextNode(c) : c)
        }
        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !ka(f) || ma(f) && 0 < f.nodeType ? d(f) : A(Yc(f) ? bb(f) : f, d)
        }
    }
      , Zc = function(a) {
        for (var b; b = a.firstChild; )
            a.removeChild(b)
    }
      , $c = function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }
      , ad = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
      , Qc = function(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
      , bd = function(a) {
        try {
            return a.contentWindow || (a.contentDocument ? I(a.contentDocument) : null)
        } catch (b) {}
        return null
    }
      , Yc = function(a) {
        if (a && "number" == typeof a.length) {
            if (ma(a))
                return "function" == typeof a.item || "string" == typeof a.item;
            if (v(a))
                return "function" == typeof a.item
        }
        return !1
    }
      , Lc = function(a) {
        this.g = a || m.document || document
    };
    Lc.prototype.xa = function(a) {
        return r(a) ? this.g.getElementById(a) : a
    }
    ;
    Lc.prototype.createElement = function(a) {
        return this.g.createElement(String(a))
    }
    ;
    Lc.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    }
    ;
    Lc.prototype.contains = ad;
    var J = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    h = J.prototype;
    h.Za = function() {
        return this.right - this.left
    }
    ;
    h.Ya = function() {
        return this.bottom - this.top
    }
    ;
    h.clone = function() {
        return new J(this.top,this.right,this.bottom,this.left)
    }
    ;
    h.contains = function(a) {
        return this && a ? a instanceof J ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    h.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    h.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    var cd = function(a, b, c) {
        b instanceof G ? (a.left += b.x,
        a.right += b.x,
        a.top += b.y,
        a.bottom += b.y) : (a.left += b,
        a.right += b,
        t(c) && (a.top += c,
        a.bottom += c));
        return a
    };
    J.prototype.scale = function(a, b) {
        b = t(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    }
    ;
    var dd = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    dd.prototype.clone = function() {
        return new dd(this.left,this.top,this.width,this.height)
    }
    ;
    var ed = function(a) {
        return new J(a.top,a.left + a.width,a.top + a.height,a.left)
    };
    dd.prototype.contains = function(a) {
        return a instanceof G ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    dd.prototype.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    dd.prototype.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    dd.prototype.scale = function(a, b) {
        b = t(b) ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    }
    ;
    var fd = {}
      , gd = function(a, b) {
        var c = fd[b];
        if (!c) {
            var d = Oa(b)
              , c = d;
            void 0 === a.style[d] && (d = (Ob ? "Webkit" : Nb ? "Moz" : E ? "ms" : Jb ? "O" : null) + Pa(d),
            void 0 !== a.style[d] && (c = d));
            fd[b] = c
        }
        return c
    }
      , hd = function(a, b) {
        var c = a.style[Oa(b)];
        return "undefined" !== typeof c ? c : a.style[gd(a, b)] || ""
    }
      , jd = function(a, b) {
        if (b instanceof G) {
            var c = b.x;
            b = b.y
        } else
            c = b,
            b = void 0;
        a.style.left = id(c, !1);
        a.style.top = id(b, !1)
    }
      , kd = function(a) {
        return new G(a.offsetLeft,a.offsetTop)
    }
      , ld = function(a) {
        try {
            var b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        E && a.ownerDocument.body && (a = a.ownerDocument,
        b.left -= a.documentElement.clientLeft + a.body.clientLeft,
        b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }
      , md = function(a) {
        var b = Qc(a)
          , c = new G(0,0);
        var d = b ? Qc(b) : document;
        d = !E || 9 <= Number(cc) || "CSS1Compat" == Rc(d).g.compatMode ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = ld(a);
        b = Vc(Rc(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
      , nd = function(a, b) {
        var c = new G(0,0)
          , d = I(Qc(a));
        if (!Gb(d, "parent"))
            return c;
        do {
            if (d == b)
                var e = md(a);
            else
                e = ld(a),
                e = new G(e.left,e.top);
            c.x += e.x;
            c.y += e.y
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));return c
    }
      , od = function(a, b, c) {
        if (b instanceof H)
            c = b.height,
            b = b.width;
        else if (void 0 == c)
            throw Error("missing height argument");
        a.style.width = id(b, !0);
        a.style.height = id(c, !0)
    }
      , id = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    }
      , pd = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = Ob && !b && !c;
        return p(b) && !d || !a.getBoundingClientRect ? new H(b,c) : (a = ld(a),
        new H(a.right - a.left,a.bottom - a.top))
    };
    var qd = function(a) {
        try {
            return !!a && null != a.location.href && Gb(a, "foo")
        } catch (b) {
            return !1
        }
    }
      , rd = function(a, b) {
        for (var c in a)
            Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    }
      , td = function() {
        var a = [];
        rd(sd, function(b) {
            a.push(b)
        });
        return a
    }
      , ud = /https?:\/\/[^\/]+/
      , vd = function() {
        var a = m;
        try {
            for (var b = null; b != a; b = a,
            a = a.parent)
                switch (a.location.protocol) {
                case "https:":
                    return !0;
                case "file:":
                    return !1;
                case "http:":
                    return !1
                }
        } catch (c) {}
        return !0
    }
      , xd = function() {
        var a = wd;
        if (!a)
            return "";
        var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
        try {
            var c = b.exec(decodeURIComponent(a));
            if (c)
                return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
        } catch (d) {}
        return ""
    };
    var yd = function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            m.addEventListener("test", null, b)
        } catch (c) {}
        return a
    }()
      , zd = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, yd ? d : d ? d.capture || !1 : !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }
      , Ad = function(a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, yd ? void 0 : !1) : a.detachEvent && a.detachEvent("on" + b, c)
    };
    var Bd = function(a) {
        a = a || m;
        var b = a.context;
        if (!b)
            try {
                b = a.parent.context
            } catch (c) {}
        try {
            if (b && "pageViewId"in b && "canonicalUrl"in b)
                return b
        } catch (c) {}
        return null
    };
    var Cd = function(a, b, c) {
        a.google_image_requests || (a.google_image_requests = []);
        var d = a.document.createElement("img");
        if (c) {
            var e = function(a) {
                c(a);
                Ad(d, "load", e);
                Ad(d, "error", e)
            };
            zd(d, "load", e);
            zd(d, "error", e)
        }
        d.src = b;
        a.google_image_requests.push(d)
    };
    var Dd = !!window.google_async_iframe_id
      , Ed = Dd && window.parent || window
      , Fd = function() {
        if (Dd && !qd(Ed)) {
            var a = "." + ua.domain;
            try {
                for (; 2 < a.split(".").length && !qd(Ed); )
                    ua.domain = a = a.substr(a.indexOf(".") + 1),
                    Ed = window.parent
            } catch (b) {}
            qd(Ed) || (Ed = window)
        }
        return Ed
    };
    var Gd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
      , Hd = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
      , Nd = function(a, b, c) {
        if (ia(b))
            for (var d = 0; d < b.length; d++)
                Nd(a, String(b[d]), c);
        else
            null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }
      , Od = function(a, b, c) {
        for (c = c || 0; c < b.length; c += 2)
            Nd(b[c], b[c + 1], a);
        return a
    }
      , Pd = function(a, b) {
        var c = 2 == arguments.length ? Od([a], arguments[1], 0) : Od([a], arguments, 1);
        if (c[1]) {
            var d = c[0]
              , e = d.indexOf("#");
            0 <= e && (c.push(d.substr(e)),
            c[0] = d = d.substr(0, e));
            e = d.indexOf("?");
            0 > e ? c[1] = "?" : e == d.length - 1 && (c[1] = void 0)
        }
        return c.join("")
    }
      , Qd = /#|$/
      , Rd = function(a, b) {
        var c = a.search(Qd);
        a: {
            var d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)
                    if (f = a.charCodeAt(d + e),
                    !f || 61 == f || 38 == f || 35 == f)
                        break a;
                d += e + 1
            }
            d = -1
        }
        if (0 > d)
            return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
    };
    var Sd = function(a, b) {
        this.g = a;
        this.h = b
    }
      , Td = function(a, b, c) {
        this.url = a;
        this.Vb = b;
        this.Oc = !!c;
        this.depth = t(void 0) ? void 0 : null
    }
      , Vd = function(a) {
        a = a ? a : Ud();
        for (var b = new Td(m.location.href,m,!1), c = a.length - 1, d = c; 0 <= d; --d) {
            var e = a[d];
            if (e.url && !e.Oc) {
                b = e;
                break
            }
        }
        d = null;
        e = a.length && a[c].url;
        0 != b.depth && e && (d = a[c]);
        return new Sd(b,d)
    }
      , Ud = function() {
        var a = m
          , b = []
          , c = null;
        do {
            var d = a;
            if (qd(d)) {
                var e = d.location.href;
                c = d.document && d.document.referrer || null
            } else
                e = c,
                c = null;
            b.push(new Td(e || "",d));
            try {
                a = d.parent
            } catch (f) {
                a = null
            }
        } while (a && d != a);a = 0;
        for (d = b.length - 1; a <= d; ++a)
            b[a].depth = d - a;
        d = m;
        if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
            for (a = 1; a < b.length; ++a)
                e = b[a],
                e.url || (e.url = d.location.ancestorOrigins[a - 1] || "",
                e.Oc = !0);
        return b
    };
    var Wd = function(a, b, c, d, e) {
        this.C = c || 4E3;
        this.l = a || "&";
        this.A = b || ",$";
        this.o = p(d) ? d : "trn";
        this.B = e || null;
        this.w = !1;
        this.h = {};
        this.G = 0;
        this.g = []
    }
      , Xd = function(a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }
      , Zd = function(a, b, c, d, e) {
        var f = [];
        rd(a, function(a, k) {
            (a = Yd(a, b, c, d, e)) && f.push(k + "=" + a)
        });
        return f.join(b)
    }
      , Yd = function(a, b, c, d, e) {
        if (null == a)
            return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0,
            d < c.length) {
                for (var f = [], g = 0; g < a.length; g++)
                    f.push(Yd(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)
            return e = e || 0,
            2 > e ? encodeURIComponent(Zd(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }
      , $d = function(a, b, c, d) {
        a.g.push(b);
        a.h[b] = Xd(c, d)
    }
      , be = function(a, b, c, d) {
        b = b + "//" + c + d;
        var e = ae(a) - d.length - 0;
        if (0 > e)
            return "";
        a.g.sort(function(a, b) {
            return a - b
        });
        d = null;
        c = "";
        for (var f = 0; f < a.g.length; f++)
            for (var g = a.g[f], k = a.h[g], l = 0; l < k.length; l++) {
                if (!e) {
                    d = null == d ? g : d;
                    break
                }
                var n = Zd(k[l], a.l, a.A);
                if (n) {
                    n = c + n;
                    if (e >= n.length) {
                        e -= n.length;
                        b += n;
                        c = a.l;
                        break
                    } else
                        a.w && (c = e,
                        n[c - 1] == a.l && --c,
                        b += n.substr(0, c),
                        c = a.l,
                        e = 0);
                    d = null == d ? g : d
                }
            }
        f = "";
        a.o && null != d && (f = c + a.o + "=" + (a.B || d));
        return b + f + ""
    }
      , ae = function(a) {
        if (!a.o)
            return a.C;
        var b = 1, c;
        for (c in a.h)
            b = c.length > b ? c.length : b;
        return a.C - a.o.length - b - a.l.length - 1
    };
    var ce = function(a, b, c, d, e, f) {
        if ((d ? a.w : Math.random()) < (e || a.g))
            try {
                if (c instanceof Wd)
                    var g = c;
                else
                    g = new Wd,
                    rd(c, function(a, b) {
                        var c = g
                          , d = c.G++;
                        a = Xd(b, a);
                        c.g.push(d);
                        c.h[d] = a
                    });
                var k = be(g, a.o, a.h, a.l + b + "&");
                k && ("undefined" === typeof f ? Cd(m, k) : Cd(m, k, f))
            } catch (l) {}
    };
    var ee = function(a, b) {
        var c = de();
        this.h = a;
        this.type = b;
        this.value = c;
        this.duration = 0;
        this.g = this.h + "_" + this.type + "_" + Math.random()
    };
    var fe = !(!m.chrome || m.setImmediate)
      , ge = function(a, b) {
        this.events = [];
        this.l = b || m;
        var c = null;
        b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [],
        this.events = b.google_js_reporting_queue,
        c = b.w);
        this.g = null != c ? c : Math.random() < a
    }
      , he = function(a, b) {
        (a = fe && a.l.performance) && a.mark && a.mark(b)
    };
    ge.prototype.h = function(a) {
        var b = fe && this.l.performance;
        a && b && b.clearMarks && (b.clearMarks("goog_" + a.g + "_start"),
        b.clearMarks("goog_" + a.g + "_end"))
    }
    ;
    ge.prototype.start = function(a, b) {
        if (!this.g)
            return null;
        a = new ee(a,b);
        he(this, "goog_" + a.g + "_start");
        return a
    }
    ;
    var de = function() {
        var a = m.performance;
        return a && a.now ? a.now() : ta()
    };
    var ie = function(a, b, c, d) {
        this.o = a;
        this.C = b;
        this.l = c;
        this.w = this.h;
        this.g = void 0 === d ? null : d
    }
      , ke = function(a, b, c, d, e) {
        try {
            if (a.g && a.g.g) {
                var f = a.g.start(b.toString(), 3);
                var g = c();
                var k = a.g;
                c = f;
                k.g && (c.duration = de() - c.value,
                he(k, "goog_" + c.g + "_end"),
                k.g && k.events.push(c))
            } else
                g = c()
        } catch (n) {
            k = a.l;
            try {
                a.g && f && a.g.h(f);
                var l = je(n)
                  , k = (e || a.w).call(a, b, l, void 0, d)
            } catch (u) {
                a.h(217, u)
            }
            if (!k)
                throw n;
        }
        return g
    }
      , me = function(a, b, c, d) {
        var e = le;
        return function(f) {
            for (var g = [], k = 0; k < arguments.length; ++k)
                g[k - 0] = arguments[k];
            return ke(e, a, function() {
                return b.apply(c, g)
            }, d, void 0)
        }
    };
    ie.prototype.h = function(a, b, c, d, e) {
        e = e || this.C;
        try {
            var f = new Wd;
            f.w = !0;
            $d(f, 1, "context", a);
            b instanceof ne || (b = je(b));
            $d(f, 2, "msg", b.message.substring(0, 512));
            b.fileName && $d(f, 3, "file", b.fileName);
            0 < b.lineNumber && $d(f, 4, "line", b.lineNumber.toString());
            b = {};
            if (d)
                try {
                    d(b)
                } catch (k) {}
            d = [b];
            f.g.push(5);
            f.h[5] = d;
            var g = Vd();
            g.h && $d(f, 6, "top", g.h.url || "");
            $d(f, 7, "url", g.g.url || "");
            ce(this.o, e, f, !1, c)
        } catch (k) {
            try {
                ce(this.o, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: oe(k),
                    url: g.g.url
                }, !1, c)
            } catch (l) {}
        }
        return this.l
    }
    ;
    var je = function(a) {
        return new ne(oe(a),a.fileName,a.lineNumber)
    }
      , oe = function(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d; )
                    d = a,
                    a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    }
      , ne = function(a, b, c) {
        this.message = a;
        this.fileName = b || "";
        this.lineNumber = c || -1
    };
    var pe, le, qe = Fd(), re = new ge(1,qe), se = function() {
        qe.w || (fe && A(re.events, re.h, re),
        re.events.length = 0,
        re.g = !1)
    };
    pe = new function() {
        this.o = "http:" === y.location.protocol ? "http:" : "https:";
        this.h = "pagead2.googlesyndication.com";
        this.l = "/pagead/gen_204?id=";
        this.g = .01;
        this.w = Math.random()
    }
    ;
    le = new ie(pe,"jserror",!0,re);
    "complete" == qe.document.readyState ? se() : re.g && zd(qe, "load", function() {
        se()
    });
    var ue = function(a, b) {
        return ke(le, a, b, void 0, te)
    }
      , ve = function(a, b, c, d) {
        return me(a, b, c, d)
    }
      , te = le.h
      , we = function(a, b) {
        le.h(a, b, void 0, void 0)
    };
    var xe = function(a) {
        for (var b = 0, c = a, d = 0; a && a != a.parent; )
            a = a.parent,
            d++,
            qd(a) && (c = a,
            b = d);
        return {
            Vb: c,
            level: b
        }
    };
    var ye = function(a) {
        this.h = {};
        this.g = {};
        a = a || [];
        for (var b = 0, c = a.length; b < c; ++b)
            this.g[a[b]] = ""
    }
      , Ae = function() {
        var a = ze()
          , b = new ye;
        rd(a.h, function(a, d) {
            b.h[d] = a
        });
        rd(a.g, function(a, d) {
            b.g[d] = a
        });
        return b
    };
    var Be = function(a) {
        ye.call(this, a);
        this.dfltBktExt = this.h;
        this.lrsExt = this.g
    };
    x(Be, ye);
    var Ce = function() {
        this.S = {}
    }
      , Ee = function() {
        if (De)
            return De;
        var a;
        (a = Bd()) ? (a = a.master,
        a = qd(a) ? a : null) : a = null;
        a = a || Fd();
        var b = a.google_persistent_state_async;
        return null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? De = b : a.google_persistent_state_async = De = new Ce
    }
      , De = null
      , Fe = {
        8: "google_prev_ad_formats_by_region",
        9: "google_prev_ad_slotnames_by_region"
    };
    var sd = {
        Uh: 5,
        Fh: 7,
        jk: 14,
        ai: 17,
        fh: 19,
        Qg: 41,
        ti: 44,
        Bh: 48,
        gh: 49,
        Lj: 55,
        xi: 56,
        yg: 59,
        Ij: 61,
        Hj: 62,
        gj: 67,
        Cj: 69,
        Hh: 70,
        Zh: 74,
        $i: 75,
        Jj: 77,
        zk: 79,
        Yk: 80,
        ei: 81,
        Mj: 82,
        Nj: 83,
        Qk: 84,
        ik: 86,
        qj: 87,
        Tj: 88,
        Xg: 89,
        rj: 90,
        Ak: 92,
        zg: 93,
        Gj: 94
    }
      , Ge = null
      , He = function(a) {
        try {
            return !!a && Fb(!0)
        } catch (b) {
            return !1
        }
    }
      , Ie = function() {
        if (He(Ge))
            return !0;
        var a = Ee();
        var b = Fe[3] || "google_ps_3";
        var a = a.S
          , c = a[b];
        b = void 0 === c ? a[b] = null : c;
        b && (b && b.dfltBktExt && b.lrsExt ? (a = new Be,
        a.h = b.dfltBktExt,
        a.dfltBktExt = a.h,
        a.g = b.lrsExt,
        a.lrsExt = a.g,
        b = a) : b = null,
        b || (b = new Be,
        a = {
            context: "ps::gpes::cf",
            url: Fd().location.href
        },
        ce(pe, "jserror", a, !1, void 0, void 0)));
        return He(b) ? (Ge = b,
        !0) : !1
    }
      , ze = function() {
        if (Ie())
            return Ge;
        var a = Ee()
          , b = new Be(td());
        return Ge = a.S[Fe[3] || "google_ps_3"] = b
    }
      , Je = null;
    var Ke = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    var Le = function(a, b, c) {
        this.l = b;
        this.h = c;
        this.o = a
    };
    x(Le, Error);
    h = Le.prototype;
    h.oe = function() {
        return this.g
    }
    ;
    h.pe = function() {
        return this.l
    }
    ;
    h.ne = function() {
        return this.h
    }
    ;
    h.Ld = function() {
        return 1E3 > this.h ? this.h : 900
    }
    ;
    h.qe = function() {
        return this.o
    }
    ;
    h.toString = function() {
        return "AdError " + this.h + ": " + this.l + (null != this.g ? " Caused by: " + this.g : "")
    }
    ;
    var Me = function() {
        this.X = this.X;
        this.L = this.L
    };
    Me.prototype.X = !1;
    Me.prototype.P = function() {
        this.X || (this.X = !0,
        this.N())
    }
    ;
    var Ne = function(a, b) {
        a.X ? p(void 0) ? b.call(void 0) : b() : (a.L || (a.L = []),
        a.L.push(p(void 0) ? w(b, void 0) : b))
    };
    Me.prototype.N = function() {
        if (this.L)
            for (; this.L.length; )
                this.L.shift()()
    }
    ;
    var K = function(a) {
        a && "function" == typeof a.P && a.P()
    };
    var L = function(a, b) {
        this.type = a;
        this.h = this.o = b;
        this.l = !1;
        this.Zc = !0
    };
    L.prototype.C = function() {
        this.l = !0
    }
    ;
    L.prototype.w = function() {
        this.Zc = !1
    }
    ;
    var Oe = function(a) {
        a.C()
    };
    var Pe = function(a, b) {
        L.call(this, "adError");
        this.g = a;
        this.A = b ? b : null
    };
    x(Pe, L);
    Pe.prototype.G = function() {
        return this.g
    }
    ;
    Pe.prototype.B = function() {
        return this.A
    }
    ;
    var M = function(a, b, c) {
        L.call(this, a);
        this.G = b;
        this.A = null != c ? c : null
    };
    x(M, L);
    M.prototype.D = function() {
        return this.G
    }
    ;
    M.prototype.F = function() {
        return this.A
    }
    ;
    var Qe = function(a) {
        this.g = a
    }
      , Te = function() {
        var a = Re(N);
        return Se(a, "disableExperiments")
    }
      , Se = function(a, b) {
        return sb(a.g, b) && (a = a.g[b],
        "boolean" == typeof a) ? a : !1
    }
      , Ue = function(a) {
        if (sb(a.g, "forceExperimentIds")) {
            a = a.g.forceExperimentIds;
            var b = []
              , c = 0;
            ia(a) && A(a, function(a) {
                t(a) && (b[c++] = a)
            });
            return b
        }
        return null
    };
    var Ve = function(a) {
        return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }
      , Xe = function(a) {
        a = String(a);
        if (Ve(a))
            try {
                return eval("(" + a + ")")
            } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }
      , ff = function(a) {
        var b = [];
        df(new ef, a, b);
        return b.join("")
    }
      , ef = function() {}
      , df = function(a, b, c) {
        if (null == b)
            c.push("null");
        else {
            if ("object" == typeof b) {
                if (ia(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++)
                        c.push(e),
                        df(a, d[f], c),
                        e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)
                    b = b.valueOf();
                else {
                    c.push("{");
                    e = "";
                    for (d in b)
                        Object.prototype.hasOwnProperty.call(b, d) && (f = b[d],
                        "function" != typeof f && (c.push(e),
                        gf(d, c),
                        c.push(":"),
                        df(a, f, c),
                        e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
            case "string":
                gf(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                break;
            case "boolean":
                c.push(String(b));
                break;
            case "function":
                c.push("null");
                break;
            default:
                throw Error("Unknown type: " + typeof b);
            }
        }
    }
      , hf = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }
      , jf = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g
      , gf = function(a, b) {
        b.push('"', a.replace(jf, function(a) {
            var b = hf[a];
            b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1),
            hf[a] = b);
            return b
        }), '"')
    };
    var kf = function(a) {
        return function() {
            return a
        }
    };
    var lf = "StopIteration"in m ? m.StopIteration : {
        message: "StopIteration",
        stack: ""
    }
      , mf = function() {};
    mf.prototype.next = function() {
        throw lf;
    }
    ;
    mf.prototype.Ca = function() {
        return this
    }
    ;
    var nf = function(a) {
        if (a instanceof mf)
            return a;
        if ("function" == typeof a.Ca)
            return a.Ca(!1);
        if (ka(a)) {
            var b = 0
              , c = new mf;
            c.next = function() {
                for (; ; ) {
                    if (b >= a.length)
                        throw lf;
                    if (b in a)
                        return a[b++];
                    b++
                }
            }
            ;
            return c
        }
        throw Error("Not implemented");
    }
      , of = function(a, b, c) {
        if (ka(a))
            try {
                A(a, b, c)
            } catch (d) {
                if (d !== lf)
                    throw d;
            }
        else {
            a = nf(a);
            try {
                for (; ; )
                    b.call(c, a.next(), void 0, a)
            } catch (d) {
                if (d !== lf)
                    throw d;
            }
        }
    };
    var pf = function(a, b) {
        this.h = {};
        this.g = [];
        this.o = this.l = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof pf ? (c = a.Ea(),
            d = a.ba()) : (c = qb(a),
            d = pb(a));
            for (var e = 0; e < c.length; e++)
                this.set(c[e], d[e])
        }
    };
    h = pf.prototype;
    h.wa = function() {
        return this.l
    }
    ;
    h.ba = function() {
        qf(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.h[this.g[b]]);
        return a
    }
    ;
    h.Ea = function() {
        qf(this);
        return this.g.concat()
    }
    ;
    h.isEmpty = function() {
        return 0 == this.l
    }
    ;
    h.clear = function() {
        this.h = {};
        this.o = this.l = this.g.length = 0
    }
    ;
    h.Ia = function(a) {
        return rf(this.h, a) ? (delete this.h[a],
        this.l--,
        this.o++,
        this.g.length > 2 * this.l && qf(this),
        !0) : !1
    }
    ;
    var qf = function(a) {
        var b, c;
        if (a.l != a.g.length) {
            for (b = c = 0; c < a.g.length; ) {
                var d = a.g[c];
                rf(a.h, d) && (a.g[b++] = d);
                c++
            }
            a.g.length = b
        }
        if (a.l != a.g.length) {
            var e = {};
            for (b = c = 0; c < a.g.length; )
                d = a.g[c],
                rf(e, d) || (a.g[b++] = d,
                e[d] = 1),
                c++;
            a.g.length = b
        }
    };
    h = pf.prototype;
    h.get = function(a, b) {
        return rf(this.h, a) ? this.h[a] : b
    }
    ;
    h.set = function(a, b) {
        rf(this.h, a) || (this.l++,
        this.g.push(a),
        this.o++);
        this.h[a] = b
    }
    ;
    h.forEach = function(a, b) {
        for (var c = this.Ea(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    h.clone = function() {
        return new pf(this)
    }
    ;
    h.Ca = function(a) {
        qf(this);
        var b = 0
          , c = this.o
          , d = this
          , e = new mf;
        e.next = function() {
            if (c != d.o)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.g.length)
                throw lf;
            var e = d.g[b++];
            return a ? e : d.h[e]
        }
        ;
        return e
    }
    ;
    var rf = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var sf = function(a) {
        if (a.ba && "function" == typeof a.ba)
            return a.ba();
        if (r(a))
            return a.split("");
        if (ka(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        return pb(a)
    };
    var tf = function(a, b) {
        this.g = this.G = this.l = "";
        this.A = null;
        this.w = this.C = "";
        this.o = !1;
        var c;
        a instanceof tf ? (this.o = p(b) ? b : a.o,
        uf(this, a.l),
        this.G = a.G,
        this.g = a.g,
        vf(this, a.A),
        this.C = a.C,
        wf(this, a.h.clone()),
        this.w = a.w) : a && (c = String(a).match(Gd)) ? (this.o = !!b,
        uf(this, c[1] || "", !0),
        this.G = xf(c[2] || ""),
        this.g = xf(c[3] || "", !0),
        vf(this, c[4]),
        this.C = xf(c[5] || "", !0),
        wf(this, c[6] || "", !0),
        this.w = xf(c[7] || "")) : (this.o = !!b,
        this.h = new yf(null,0,this.o))
    };
    tf.prototype.toString = function() {
        var a = []
          , b = this.l;
        b && a.push(zf(b, Af, !0), ":");
        var c = this.g;
        if (c || "file" == b)
            a.push("//"),
            (b = this.G) && a.push(zf(b, Af, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.A,
            null != c && a.push(":", String(c));
        if (c = this.C)
            this.g && "/" != c.charAt(0) && a.push("/"),
            a.push(zf(c, "/" == c.charAt(0) ? Bf : Cf, !0));
        (c = this.h.toString()) && a.push("?", c);
        (c = this.w) && a.push("#", zf(c, Df));
        return a.join("")
    }
    ;
    tf.prototype.clone = function() {
        return new tf(this)
    }
    ;
    var uf = function(a, b, c) {
        a.l = c ? xf(b, !0) : b;
        a.l && (a.l = a.l.replace(/:$/, ""))
    }
      , vf = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.A = b
        } else
            a.A = null
    }
      , wf = function(a, b, c) {
        b instanceof yf ? (a.h = b,
        Ef(a.h, a.o)) : (c || (b = zf(b, Ff)),
        a.h = new yf(b,0,a.o))
    }
      , xf = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
      , zf = function(a, b, c) {
        return r(a) ? (a = encodeURI(a).replace(b, Gf),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
      , Gf = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
      , Af = /[#\/\?@]/g
      , Cf = /[\#\?:]/g
      , Bf = /[\#\?]/g
      , Ff = /[\#\?@]/g
      , Df = /#/g
      , yf = function(a, b, c) {
        this.h = this.g = null;
        this.l = a || null;
        this.o = !!c
    }
      , Hf = function(a) {
        a.g || (a.g = new pf,
        a.h = 0,
        a.l && Hd(a.l, function(b, c) {
            b = decodeURIComponent(b.replace(/\+/g, " "));
            Hf(a);
            a.l = null;
            b = If(a, b);
            var d = a.g.get(b);
            d || a.g.set(b, d = []);
            d.push(c);
            a.h += 1
        }))
    };
    yf.prototype.wa = function() {
        Hf(this);
        return this.h
    }
    ;
    var Jf = function(a, b) {
        Hf(a);
        b = If(a, b);
        rf(a.g.h, b) && (a.l = null,
        a.h -= a.g.get(b).length,
        a.g.Ia(b))
    };
    yf.prototype.clear = function() {
        this.g = this.l = null;
        this.h = 0
    }
    ;
    yf.prototype.isEmpty = function() {
        Hf(this);
        return 0 == this.h
    }
    ;
    var Kf = function(a, b) {
        Hf(a);
        b = If(a, b);
        return rf(a.g.h, b)
    };
    h = yf.prototype;
    h.Ea = function() {
        Hf(this);
        for (var a = this.g.ba(), b = this.g.Ea(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    h.ba = function(a) {
        Hf(this);
        var b = [];
        if (r(a))
            Kf(this, a) && (b = ab(b, this.g.get(If(this, a))));
        else {
            a = this.g.ba();
            for (var c = 0; c < a.length; c++)
                b = ab(b, a[c])
        }
        return b
    }
    ;
    h.set = function(a, b) {
        Hf(this);
        this.l = null;
        a = If(this, a);
        Kf(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    h.get = function(a, b) {
        a = a ? this.ba(a) : [];
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    h.toString = function() {
        if (this.l)
            return this.l;
        if (!this.g)
            return "";
        for (var a = [], b = this.g.Ea(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.ba(d), f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        return this.l = a.join("&")
    }
    ;
    h.clone = function() {
        var a = new yf;
        a.l = this.l;
        this.g && (a.g = this.g.clone(),
        a.h = this.h);
        return a
    }
    ;
    var If = function(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }
      , Ef = function(a, b) {
        b && !a.o && (Hf(a),
        a.l = null,
        a.g.forEach(function(a, b) {
            var c = b.toLowerCase();
            b != c && (Jf(this, b),
            Jf(this, c),
            0 < a.length && (this.l = null,
            this.g.set(If(this, c), bb(a)),
            this.h += a.length))
        }, a));
        a.o = b
    };
    var Mf = function(a) {
        var b = a || Ud();
        a = b.length - 1;
        var c = Vd(b)
          , b = c.g
          , d = c.h
          , c = [];
        d ? (b && c.push(Lf(a, [d.url, 2], 0, [b.url, 0], b.depth)),
        c.push(Lf(a, [d.url, 2], 0))) : b.url && (c.push(Lf(a, void 0, void 0, [b.url, 0], b.depth)),
        (d = (d = ud.exec(b.url)) && d[0] || "") && c.push(Lf(a, [d, 1], b.depth)));
        c.push(Lf(a));
        return c
    }
      , Lf = function(a, b, c, d, e) {
        a = [a];
        if (p(b) && p(c)) {
            for (var f = 0; f < c; f++)
                a.push("");
            a.push(b)
        }
        if (p(d) && p(e)) {
            b = e - a.length + 1;
            for (f = 0; f < b; f++)
                a.push("");
            a.push(d)
        }
        return a
    }
      , Nf = function() {
        var a = Mf();
        return Sa(a, function(a) {
            return Yd(a)
        })
    };
    var O = function() {
        this.A = "always";
        this.F = 4;
        this.I = 1;
        this.o = !0;
        this.l = this.O = this.g = !1;
        this.C = "en";
        this.K = this.D = !1;
        this.L = this.B = "";
        this.H = null;
        this.G = !1;
        this.M = this.J = -1;
        this.h = !1;
        try {
            this.T = Mf(void 0)[0]
        } catch (a) {}
    }
      , Of = "af am ar bg bn ca cs da de el en en_gb es es_419 et eu fa fi fil fr fr_ca gl gu he hi hr hu id in is it iw ja kn ko lt lv ml mr ms nb nl no pl pt_br pt_pt ro ru sk sl sr sv sw ta te th tr uk ur vi zh_cn zh_hk zh_tw zu".split(" ")
      , Pf = function(a) {
        a = Ja(a);
        wa(a) || (a = a.substring(0, 20));
        return a
    };
    h = O.prototype;
    h.tf = function(a) {
        this.A = a
    }
    ;
    h.hf = function() {
        return this.A
    }
    ;
    h.yf = function(a) {
        this.F = a
    }
    ;
    h.lf = function() {
        return this.F
    }
    ;
    h.Cf = function(a) {
        this.X = a
    }
    ;
    h.pf = function() {
        return this.X
    }
    ;
    h.Ff = function(a) {
        "boolean" == typeof a && (this.I = a ? 1 : 0)
    }
    ;
    h.Gf = function(a) {
        this.I = a
    }
    ;
    h.sf = function(a) {
        this.o = a
    }
    ;
    h.qf = function() {
        return this.o
    }
    ;
    h.Df = function(a) {
        this.g = a
    }
    ;
    h.Qf = function() {
        return this.g
    }
    ;
    h.La = function() {
        return this.O
    }
    ;
    h.kg = function() {
        return !0
    }
    ;
    h.ha = function() {
        return !1
    }
    ;
    h.Nc = function() {
        return !1
    }
    ;
    h.wf = function(a) {
        this.D = a
    }
    ;
    h.rf = function() {
        return this.D
    }
    ;
    h.xf = function(a) {
        this.K = a
    }
    ;
    h.Db = function() {
        return this.K
    }
    ;
    h.ga = function() {
        return !1
    }
    ;
    h.Pf = function() {
        return !1
    }
    ;
    h.Cb = function() {
        return !1
    }
    ;
    h.gg = function() {
        return !1
    }
    ;
    h.ig = function(a) {
        if (null != a) {
            a = a.toLowerCase().replace("-", "_");
            if (!Xa(Of, a) && (a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "",
            !Xa(Of, a)))
                return;
            this.C = a
        }
    }
    ;
    h.Jd = function() {
        return this.C
    }
    ;
    h.Af = function(a) {
        this.B = Pf(a)
    }
    ;
    h.mf = function() {
        return this.B
    }
    ;
    h.Bf = function(a) {
        this.L = Pf(a)
    }
    ;
    h.nf = function() {
        return this.L
    }
    ;
    var Re = function(a) {
        if (null == a.H) {
            var b = {};
            var c = (new tf(I().location.href)).h;
            if (Kf(c, "tcnfp"))
                try {
                    b = Xe(c.get("tcnfp"))
                } catch (d) {}
            a.H = new Qe(b)
        }
        return a.H
    };
    h = O.prototype;
    h.vf = function(a) {
        this.G = a
    }
    ;
    h.kf = function() {
        return this.G
    }
    ;
    h.lg = function() {
        return !1
    }
    ;
    h.zf = function(a) {
        this.J = a
    }
    ;
    h.Ef = function(a) {
        this.M = a
    }
    ;
    h.uf = function(a) {
        this.h = a
    }
    ;
    h.jf = function() {
        return this.h
    }
    ;
    var N = new O;
    window.console && "function" === typeof window.console.log && w(window.console.log, window.console);
    var Qf = function() {
        return Math.round(ta() / 1E3)
    }
      , Rf = function(a) {
        var b = window.performance && window.performance.timing && window.performance.timing.domLoading && 0 < window.performance.timing.domLoading ? Math.round(window.performance.timing.domLoading / 1E3) : null;
        return null != b ? b : null != a ? a : Qf()
    };
    var Sf = function(a) {
        for (var b = [], c = a = I(a.ownerDocument); c != a.top; c = c.parent)
            if (c.frameElement)
                b.push(c.frameElement);
            else
                break;
        return b
    };
    var Tf = null
      , Uf = function() {
        this.g = {};
        this.h = 0
    }
      , Vf = function(a, b) {
        this.w = a;
        this.l = !0;
        this.g = b
    };
    Vf.prototype.h = function() {
        return String(this.g)
    }
    ;
    var Wf = function(a, b) {
        Vf.call(this, String(a), b);
        this.o = a;
        this.g = !!b
    };
    x(Wf, Vf);
    Wf.prototype.h = function() {
        return this.g ? "1" : "0"
    }
    ;
    var Xf = function(a, b) {
        Vf.call(this, a, b)
    };
    x(Xf, Vf);
    Xf.prototype.h = function() {
        return this.g ? Math.round(this.g.top) + "." + Math.round(this.g.left) + "." + (Math.round(this.g.top) + Math.round(this.g.height)) + "." + (Math.round(this.g.left) + Math.round(this.g.width)) : ""
    }
    ;
    var Yf = function(a) {
        if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
            a = a.split(".");
            var b = Number(a[0])
              , c = Number(a[1]);
            return new Xf("",new dd(c,b,Number(a[3]) - c,Number(a[2]) - b))
        }
        return new Xf("",new dd(0,0,0,0))
    }
      , Zf = function() {
        Tf || (Tf = new Uf);
        return Tf
    }
      , $f = function(a, b) {
        a.g[b.w] = b
    };
    var ag = function(a) {
        var b = new dd(-Number.MAX_VALUE / 2,-Number.MAX_VALUE / 2,Number.MAX_VALUE,Number.MAX_VALUE)
          , c = new dd(0,0,0,0);
        if (!a || 0 == a.length)
            return c;
        for (var d = 0; d < a.length; d++) {
            a: {
                var e = b;
                var f = a[d]
                  , g = Math.max(e.left, f.left)
                  , k = Math.min(e.left + e.width, f.left + f.width);
                if (g <= k) {
                    var l = Math.max(e.top, f.top)
                      , f = Math.min(e.top + e.height, f.top + f.height);
                    if (l <= f) {
                        e.left = g;
                        e.top = l;
                        e.width = k - g;
                        e.height = f - l;
                        e = !0;
                        break a
                    }
                }
                e = !1
            }
            if (!e)
                return c
        }
        return b
    }
      , bg = function(a, b) {
        var c = a.getBoundingClientRect();
        a = nd(a, b);
        return new dd(Math.round(a.x),Math.round(a.y),Math.round(c.right - c.left),Math.round(c.bottom - c.top))
    }
      , cg = function(a, b, c) {
        if (b && c) {
            a: {
                var d = Math.max(b.left, c.left);
                var e = Math.min(b.left + b.width, c.left + c.width);
                if (d <= e) {
                    var f = Math.max(b.top, c.top)
                      , g = Math.min(b.top + b.height, c.top + c.height);
                    if (f <= g) {
                        d = new dd(d,f,e - d,g - f);
                        break a
                    }
                }
                d = null
            }
            e = d ? d.height * d.width : 0;
            f = d ? b.height * b.width : 0;
            d = d && f ? Math.round(e / f * 100) : 0;
            $f(a, new Vf("vp",d));
            d && 0 < d ? (e = ed(b),
            f = ed(c),
            e = e.top >= f.top && e.top < f.bottom) : e = !1;
            $f(a, new Wf(512,e));
            d && 0 < d ? (e = ed(b),
            f = ed(c),
            e = e.bottom <= f.bottom && e.bottom > f.top) : e = !1;
            $f(a, new Wf(1024,e));
            d && 0 < d ? (e = ed(b),
            f = ed(c),
            e = e.left >= f.left && e.left < f.right) : e = !1;
            $f(a, new Wf(2048,e));
            d && 0 < d ? (b = ed(b),
            c = ed(c),
            c = b.right <= c.right && b.right > c.left) : c = !1;
            $f(a, new Wf(4096,c))
        }
    };
    var dg = !E || 9 <= Number(cc)
      , eg = E && !F("9");
    !Ob || F("528");
    Nb && F("1.9b") || E && F("8") || Jb && F("9.5") || Ob && F("528");
    Nb && !F("8") || E && F("9");
    var fg = function(a) {
        return Ob ? "webkit" + a : Jb ? "o" + a.toLowerCase() : a.toLowerCase()
    }
      , gg = {
        CLICK: "click",
        Sj: "rightclick",
        bh: "dblclick",
        yi: "mousedown",
        Ei: "mouseup",
        Di: "mouseover",
        Ci: "mouseout",
        Bi: "mousemove",
        zi: "mouseenter",
        Ai: "mouseleave",
        Yj: "selectionchange",
        Zj: "selectstart",
        Xk: "wheel",
        ci: "keypress",
        bi: "keydown",
        di: "keyup",
        Kg: "blur",
        Ih: "focus",
        eh: "deactivate",
        Jh: E ? "focusin" : "DOMFocusIn",
        Kh: E ? "focusout" : "DOMFocusOut",
        Og: "change",
        Oj: "reset",
        Xj: "select",
        nk: "submit",
        Yh: "input",
        Ej: "propertychange",
        xh: "dragstart",
        sh: "drag",
        uh: "dragenter",
        wh: "dragover",
        vh: "dragleave",
        yh: "drop",
        th: "dragend",
        Ek: "touchstart",
        Dk: "touchmove",
        Ck: "touchend",
        Bk: "touchcancel",
        Ig: "beforeunload",
        Wg: "consolemessage",
        Yg: "contextmenu",
        hh: "devicemotion",
        ih: "deviceorientation",
        mh: "DOMContentLoaded",
        jd: "error",
        Qh: "help",
        hi: "load",
        pi: "losecapture",
        fj: "orientationchange",
        Kj: "readystatechange",
        Pj: "resize",
        Uj: "scroll",
        Lk: "unload",
        Lg: "canplay",
        Mg: "canplaythrough",
        zh: "durationchange",
        Ah: "emptied",
        ENDED: "ended",
        ki: "loadeddata",
        li: "loadedmetadata",
        ob: "pause",
        qd: "play",
        PLAYING: "playing",
        Fj: "ratechange",
        Vj: "seeked",
        Wj: "seeking",
        kk: "stalled",
        pk: "suspend",
        vk: "timeupdate",
        Tk: "volumechange",
        Vk: "waiting",
        hk: "sourceopen",
        gk: "sourceended",
        fk: "sourceclosed",
        og: "abort",
        Nk: "update",
        Pk: "updatestart",
        Ok: "updateend",
        Ph: "hashchange",
        oj: "pagehide",
        pj: "pageshow",
        Bj: "popstate",
        Zg: "copy",
        sj: "paste",
        $g: "cut",
        Dg: "beforecopy",
        Eg: "beforecut",
        Gg: "beforepaste",
        dj: "online",
        aj: "offline",
        wi: "message",
        Vg: "connect",
        Cg: fg("AnimationStart"),
        Ag: fg("AnimationEnd"),
        Bg: fg("AnimationIteration"),
        Fk: fg("TransitionEnd"),
        uj: "pointerdown",
        Aj: "pointerup",
        tj: "pointercancel",
        xj: "pointermove",
        zj: "pointerover",
        yj: "pointerout",
        vj: "pointerenter",
        wj: "pointerleave",
        Oh: "gotpointercapture",
        ri: "lostpointercapture",
        Ji: "MSGestureChange",
        Ki: "MSGestureEnd",
        Li: "MSGestureHold",
        Mi: "MSGestureStart",
        Ni: "MSGestureTap",
        Oi: "MSGotPointerCapture",
        Pi: "MSInertiaStart",
        Qi: "MSLostPointerCapture",
        Ri: "MSPointerCancel",
        Si: "MSPointerDown",
        Ti: "MSPointerEnter",
        Ui: "MSPointerHover",
        Vi: "MSPointerLeave",
        Wi: "MSPointerMove",
        Xi: "MSPointerOut",
        Yi: "MSPointerOver",
        Zi: "MSPointerUp",
        rk: "text",
        sk: E ? "textinput" : "textInput",
        Tg: "compositionstart",
        Ug: "compositionupdate",
        Sg: "compositionend",
        Fg: "beforeinput",
        Eh: "exit",
        ii: "loadabort",
        ji: "loadcommit",
        mi: "loadredirect",
        ni: "loadstart",
        oi: "loadstop",
        Rj: "responsive",
        ck: "sizechanged",
        Mk: "unresponsive",
        Rk: "visibilitychange",
        mk: "storage",
        rh: "DOMSubtreeModified",
        nh: "DOMNodeInserted",
        ph: "DOMNodeRemoved",
        qh: "DOMNodeRemovedFromDocument",
        oh: "DOMNodeInsertedIntoDocument",
        kh: "DOMAttrModified",
        lh: "DOMCharacterDataModified",
        Hg: "beforeprint",
        xg: "afterprint"
    };
    var hg = function(a, b) {
        L.call(this, a ? a.type : "");
        this.relatedTarget = this.h = this.o = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.g = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches ? a.changedTouches[0] : null;
            this.o = a.target || a.srcElement;
            this.h = b;
            (b = a.relatedTarget) ? Nb && (Gb(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.g = a;
            a.defaultPrevented && this.w()
        }
    };
    x(hg, L);
    hg.prototype.C = function() {
        hg.R.C.call(this);
        this.g.stopPropagation ? this.g.stopPropagation() : this.g.cancelBubble = !0
    }
    ;
    hg.prototype.w = function() {
        hg.R.w.call(this);
        var a = this.g;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        eg)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    var ig = "closure_listenable_" + (1E6 * Math.random() | 0)
      , jg = function(a) {
        return !(!a || !a[ig])
    }
      , kg = 0;
    var lg = function(a, b, c, d, e) {
        this.listener = a;
        this.g = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.$a = e;
        this.key = ++kg;
        this.Ja = this.Va = !1
    }
      , mg = function(a) {
        a.Ja = !0;
        a.listener = null;
        a.g = null;
        a.src = null;
        a.$a = null
    };
    var ng = function(a) {
        this.src = a;
        this.g = {};
        this.h = 0
    }
      , pg = function(a, b, c, d, e, f) {
        var g = b.toString();
        b = a.g[g];
        b || (b = a.g[g] = [],
        a.h++);
        var k = og(b, c, e, f);
        -1 < k ? (a = b[k],
        d || (a.Va = !1)) : (a = new lg(c,a.src,g,!!e,f),
        a.Va = d,
        b.push(a));
        return a
    }
      , qg = function(a, b) {
        var c = b.type;
        c in a.g && $a(a.g[c], b) && (mg(b),
        0 == a.g[c].length && (delete a.g[c],
        a.h--))
    }
      , rg = function(a, b, c, d, e) {
        a = a.g[b.toString()];
        b = -1;
        a && (b = og(a, c, d, e));
        return -1 < b ? a[b] : null
    }
      , og = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Ja && f.listener == b && f.capture == !!c && f.$a == d)
                return e
        }
        return -1
    };
    var sg = "closure_lm_" + (1E6 * Math.random() | 0)
      , tg = {}
      , ug = 0
      , vg = function(a, b, c, d, e) {
        if (ia(b)) {
            for (var f = 0; f < b.length; f++)
                vg(a, b[f], c, d, e);
            return null
        }
        c = wg(c);
        return jg(a) ? a.h(b, c, d, e) : xg(a, b, c, !1, d, e)
    }
      , xg = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = !!e
          , k = yg(a);
        k || (a[sg] = k = new ng(a));
        c = pg(k, b, c, d, e, f);
        if (c.g)
            return c;
        d = zg();
        c.g = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            a.addEventListener(b.toString(), d, g);
        else if (a.attachEvent)
            a.attachEvent(Ag(b.toString()), d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        ug++;
        return c
    }
      , zg = function() {
        var a = Bg
          , b = dg ? function(c) {
            return a.call(b.src, b.listener, c)
        }
        : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c)
                return c
        }
        ;
        return b
    }
      , Cg = function(a, b, c, d, e) {
        if (ia(b)) {
            for (var f = 0; f < b.length; f++)
                Cg(a, b[f], c, d, e);
            return null
        }
        c = wg(c);
        return jg(a) ? pg(a.G, String(b), c, !0, d, e) : xg(a, b, c, !0, d, e)
    }
      , Dg = function(a, b, c, d, e) {
        if (ia(b))
            for (var f = 0; f < b.length; f++)
                Dg(a, b[f], c, d, e);
        else
            c = wg(c),
            jg(a) ? a.C(b, c, d, e) : a && (a = yg(a)) && (b = rg(a, b, c, !!d, e)) && Eg(b)
    }
      , Eg = function(a) {
        if (!t(a) && a && !a.Ja) {
            var b = a.src;
            if (jg(b))
                qg(b.G, a);
            else {
                var c = a.type
                  , d = a.g;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(Ag(c), d);
                ug--;
                (c = yg(b)) ? (qg(c, a),
                0 == c.h && (c.src = null,
                b[sg] = null)) : mg(a)
            }
        }
    }
      , Ag = function(a) {
        return a in tg ? tg[a] : tg[a] = "on" + a
    }
      , Gg = function(a, b, c, d) {
        var e = !0;
        if (a = yg(a))
            if (b = a.g[b.toString()])
                for (b = b.concat(),
                a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.Ja && (f = Fg(f, d),
                    e = e && !1 !== f)
                }
        return e
    }
      , Fg = function(a, b) {
        var c = a.listener
          , d = a.$a || a.src;
        a.Va && Eg(a);
        return c.call(d, b)
    }
      , Bg = function(a, b) {
        if (a.Ja)
            return !0;
        if (!dg) {
            var c = b || ea("window.event");
            b = new hg(c,this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == c.keyCode)
                        try {
                            c.keyCode = -1;
                            break a
                        } catch (g) {
                            e = !0
                        }
                    if (e || void 0 == c.returnValue)
                        c.returnValue = !0
                }
                c = [];
                for (e = b.h; e; e = e.parentNode)
                    c.push(e);
                a = a.type;
                for (var f = c.length - 1; !b.l && 0 <= f; f--)
                    b.h = c[f],
                    e = Gg(c[f], a, !0, b),
                    d = d && e;
                for (f = 0; !b.l && f < c.length; f++)
                    b.h = c[f],
                    e = Gg(c[f], a, !1, b),
                    d = d && e
            }
            return d
        }
        return Fg(a, new hg(b,this))
    }
      , yg = function(a) {
        a = a[sg];
        return a instanceof ng ? a : null
    }
      , Hg = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , wg = function(a) {
        if (v(a))
            return a;
        a[Hg] || (a[Hg] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[Hg]
    };
    var P = function() {
        Me.call(this);
        this.G = new ng(this);
        this.Oa = this;
        this.ca = null
    };
    x(P, Me);
    P.prototype[ig] = !0;
    P.prototype.Ob = function(a) {
        this.ca = a
    }
    ;
    P.prototype.addEventListener = function(a, b, c, d) {
        vg(this, a, b, c, d)
    }
    ;
    P.prototype.removeEventListener = function(a, b, c, d) {
        Dg(this, a, b, c, d)
    }
    ;
    var Q = function(a, b) {
        var c, d = a.ca;
        if (d)
            for (c = []; d; d = d.ca)
                c.push(d);
        a = a.Oa;
        d = b.type || b;
        if (r(b))
            b = new L(b,a);
        else if (b instanceof L)
            b.o = b.o || a;
        else {
            var e = b;
            b = new L(d,a);
            Ab(b, e)
        }
        var e = !0;
        if (c)
            for (var f = c.length - 1; !b.l && 0 <= f; f--) {
                var g = b.h = c[f];
                e = Ig(g, d, !0, b) && e
            }
        b.l || (g = b.h = a,
        e = Ig(g, d, !0, b) && e,
        b.l || (e = Ig(g, d, !1, b) && e));
        if (c)
            for (f = 0; !b.l && f < c.length; f++)
                g = b.h = c[f],
                e = Ig(g, d, !1, b) && e
    };
    P.prototype.N = function() {
        P.R.N.call(this);
        if (this.G) {
            var a = this.G, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    mg(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.ca = null
    }
    ;
    P.prototype.h = function(a, b, c, d) {
        return pg(this.G, String(a), b, !1, c, d)
    }
    ;
    P.prototype.C = function(a, b, c, d) {
        var e = this.G;
        a = String(a).toString();
        if (a in e.g) {
            var f = e.g[a];
            b = og(f, b, c, d);
            -1 < b ? (mg(f[b]),
            Array.prototype.splice.call(f, b, 1),
            0 == f.length && (delete e.g[a],
            e.h--),
            e = !0) : e = !1
        } else
            e = !1;
        return e
    }
    ;
    var Ig = function(a, b, c, d) {
        b = a.G.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Ja && g.capture == c) {
                var k = g.listener
                  , l = g.$a || g.src;
                g.Va && qg(a.G, g);
                e = !1 !== k.call(l, d) && e
            }
        }
        return e && 0 != d.Zc
    };
    var Jg = function(a, b) {
        P.call(this);
        this.o = a || 1;
        this.l = b || m;
        this.A = w(this.D, this);
        this.B = ta()
    };
    x(Jg, P);
    Jg.prototype.w = !1;
    Jg.prototype.g = null;
    Jg.prototype.D = function() {
        if (this.w) {
            var a = ta() - this.B;
            0 < a && a < .8 * this.o ? this.g = this.l.setTimeout(this.A, this.o - a) : (this.g && (this.l.clearTimeout(this.g),
            this.g = null),
            Q(this, "tick"),
            this.w && (this.g = this.l.setTimeout(this.A, this.o),
            this.B = ta()))
        }
    }
    ;
    Jg.prototype.start = function() {
        this.w = !0;
        this.g || (this.g = this.l.setTimeout(this.A, this.o),
        this.B = ta())
    }
    ;
    var Kg = function(a) {
        a.w = !1;
        a.g && (a.l.clearTimeout(a.g),
        a.g = null)
    };
    Jg.prototype.N = function() {
        Jg.R.N.call(this);
        Kg(this);
        delete this.l
    }
    ;
    var Lg = function(a, b, c) {
        if (v(a))
            c && (a = w(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = w(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : m.setTimeout(a, b || 0)
    };
    var Mg = function(a) {
        return Sa(a, function(a) {
            a = a.toString(16);
            return 1 < a.length ? a : "0" + a
        }).join("")
    };
    var Ng = D("Firefox")
      , Og = Db() || D("iPod")
      , Pg = D("iPad")
      , Qg = D("Android") && !(Bb() || D("Firefox") || D("Opera") || D("Silk"))
      , Rg = Bb()
      , Sg = Cb() && !Eb();
    var Tg = null
      , Ug = null;
    var Vg = function() {
        this.h = -1
    };
    var Wg = function() {
        this.g = {};
        return this
    };
    Wg.prototype.set = function(a, b) {
        this.g[a] = b
    }
    ;
    var Xg = function(a, b) {
        a.g.eb = xb(a.g, "eb", 0) | b
    };
    Wg.prototype.get = function(a) {
        return xb(this.g, a, null)
    }
    ;
    var Yg = function(a, b) {
        var c = 0;
        rb(I(), "ima", "video", "client", "tagged") && (c = 1);
        var d = null;
        a && (d = a());
        if (d) {
            a = Zf();
            a.g = {};
            var e = new Wf(32,!0);
            e.l = !1;
            $f(a, e);
            e = I().document;
            e = e.webkitVisibilityState || e.mozVisibilityState || e.visibilityState || e.msVisibilityState || "";
            $f(a, new Wf(64,"hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1));
            try {
                var f = I().top;
                try {
                    var g = !!f.location.href || "" === f.location.href
                } catch (u) {
                    g = !1
                }
                if (g) {
                    var k = Sf(d);
                    var l = k && 0 != k.length ? "1" : "0"
                } else
                    l = "2"
            } catch (u) {
                l = "2"
            }
            $f(a, new Wf(256,"2" == l));
            $f(a, new Wf(128,"1" == l));
            k = g = I().top;
            "2" == l && (k = I());
            f = bg(d, k);
            $f(a, new Xf("er",f));
            try {
                var n = k.document && !k.document.body ? null : Uc(k || window)
            } catch (u) {
                n = null
            }
            n ? (k = Vc(Rc(k.document).g),
            $f(a, new Wf(16384,!!k)),
            n = k ? new dd(k.x,k.y,n.width,n.height) : null) : n = null;
            $f(a, new Xf("vi",n));
            if (n && "1" == l) {
                l = Sf(d);
                d = [];
                for (k = 0; k < l.length; k++)
                    (e = bg(l[k], g)) && d.push(e);
                d.push(n);
                n = ag(d)
            }
            cg(a, f, n);
            a.h && (l = Qf() - a.h,
            $f(a, new Vf("ts",l)));
            a.h = Qf()
        } else
            a = Zf(),
            a.g = {},
            a.h = Qf(),
            $f(a, new Wf(32,!1));
        this.l = a;
        this.g = new Wg;
        this.g.set("ve", 4);
        c && Xg(this.g, 1);
        rb(I(), "ima", "video", "client", "crossdomainTag") && Xg(this.g, 4);
        rb(I(), "ima", "video", "client", "sdkTag") && Xg(this.g, 8);
        rb(I(), "ima", "video", "client", "jsTag") && Xg(this.g, 2);
        b && xb(b, "fullscreen", !1) && Xg(this.g, 16);
        this.h = b = null;
        if (c && (c = rb(I(), "ima", "video", "client"),
        c.getEData)) {
            this.h = c.getEData();
            if (c = rb(I(), "ima", "video", "client", "getLastSnapshotFromTop"))
                if (a = c())
                    this.h.extendWithDataFromTopIframe(a.tagstamp, a.playstamp, a.lactstamp),
                    c = this.l,
                    b = a.er,
                    a = a.vi,
                    b && a && (b = Yf(b).g,
                    a = Yf(a).g,
                    l = null,
                    xb(c.g, "er", null) && (l = xb(c.g, "er", null).g,
                    l.top += b.top,
                    l.left += b.left,
                    $f(c, new Xf("er",l))),
                    xb(c.g, "vi", null) && (n = xb(c.g, "vi", null).g,
                    n.top += b.top,
                    n.left += b.left,
                    d = [],
                    d.push(n),
                    d.push(b),
                    d.push(a),
                    b = ag(d),
                    cg(c, l, b),
                    $f(c, new Xf("vi",a))));
            a: {
                if (this.h) {
                    if (this.h.getTagLoadTimestamp) {
                        b = this.h.getTagLoadTimestamp();
                        break a
                    }
                    if (this.h.getTimeSinceTagLoadSeconds) {
                        b = this.h.getTimeSinceTagLoadSeconds();
                        break a
                    }
                }
                b = null
            }
        }
        this.g.set("td", Qf() - Rf(b))
    };
    var Zg = new Jg(200)
      , $g = function(a, b) {
        try {
            var c = new Yg(a,b);
            a = [];
            var d = Number(c.g.get("eb"))
              , e = c.g.g;
            "eb"in e && delete e.eb;
            var f, g = c.g, e = [], k;
            for (k in g.g)
                e.push(k + g.g[k]);
            (f = e.join("_")) && a.push(f);
            if (c.h) {
                var l = c.h.serialize();
                l && a.push(l)
            }
            var n, u = c.l;
            f = d;
            g = [];
            f || (f = 0);
            for (var C in u.g) {
                var T = u.g[C];
                if (T instanceof Wf)
                    T.g && (f |= T.o);
                else {
                    var qa, Z = u.g[C];
                    (qa = Z.l ? Z.h() : "") && g.push(C + qa)
                }
            }
            g.push("eb" + String(f));
            (n = g.join("_")) && a.push(n);
            c.g.set("eb", d);
            return a.join("_")
        } catch (da) {
            return "tle;" + Ga(da.name, 12) + ";" + Ga(da.message, 40)
        }
    }
      , ah = function(a) {
        vg(Zg, "tick", function() {
            var b = $g(a)
              , c = ea("ima.common.updateEngagementDetectionValue");
            c && v(c) && c(b)
        });
        Zg.start();
        Q(Zg, "tick")
    };
    var bh = {
        currentTime: 1,
        duration: 2,
        isVpaid: 4,
        volume: 8,
        isYouTube: 16,
        isPlaying: 32
    }
      , ub = {
        rc: "start",
        FIRST_QUARTILE: "firstquartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdquartile",
        COMPLETE: "complete",
        od: "metric",
        ob: "pause",
        sd: "resume",
        SKIPPED: "skip",
        VIEWABLE_IMPRESSION: "viewable_impression",
        pd: "mute",
        wd: "unmute",
        FULLSCREEN: "fullscreen",
        kd: "exitfullscreen",
        md: "fully_viewable_audible_half_duration_impression",
        nd: "measurable_impression",
        dd: "abandon",
        hd: "engagedview",
        IMPRESSION: "impression",
        gd: "creativeview",
        LOADED: "loaded",
        Dj: "progress",
        Pg: "close",
        Rg: "collapse",
        jj: "overlay_resize",
        kj: "overlay_unmeasurable_impression",
        lj: "overlay_unviewable_impression",
        nj: "overlay_viewable_immediate_impression",
        mj: "overlay_viewable_end_of_session_impression"
    }
      , ch = "start firstquartile midpoint thirdquartile resume loaded".split(" ")
      , dh = ["abandon"]
      , eh = {
        Kk: -1,
        rc: 0,
        FIRST_QUARTILE: 1,
        MIDPOINT: 2,
        THIRD_QUARTILE: 3,
        COMPLETE: 4,
        od: 5,
        ob: 6,
        sd: 7,
        SKIPPED: 8,
        VIEWABLE_IMPRESSION: 9,
        pd: 10,
        wd: 11,
        FULLSCREEN: 12,
        kd: 13,
        md: 14,
        nd: 15,
        dd: 16,
        hd: 17,
        IMPRESSION: 18,
        gd: 19,
        LOADED: 20
    };
    var fh = function() {
        return {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4
        }[ua.webkitVisibilityState || ua.mozVisibilityState || ua.visibilityState || ""] || 0
    };
    var gh = {}
      , hh = null;
    gh.le = 0;
    gh.nt = 2;
    gh.Fr = 3;
    gh.Po = 5;
    gh.me = 1;
    gh.om = 4;
    var ih = function() {
        var a = y && y.document;
        gh.e = -1;
        gh.i = 6;
        gh.n = 7;
        gh.t = 8;
        if (!hh) {
            var b = [];
            rd(gh, function(a, c) {
                b[a + 1] = c
            });
            var c = b.join("");
            hh = (c = a && a[c]) && w(c, a)
        }
        return hh
    };
    var jh = !1
      , kh = ""
      , lh = function(a) {
        a = a.match(/[\d]+/g);
        if (!a)
            return "";
        a.length = 3;
        return a.join(".")
    };
    (function() {
        if (navigator.plugins && navigator.plugins.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && (jh = !0,
            a.description)) {
                kh = lh(a.description);
                return
            }
            if (navigator.plugins["Shockwave Flash 2.0"]) {
                jh = !0;
                kh = "2.0.0.11";
                return
            }
        }
        if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"],
        jh = !(!a || !a.enabledPlugin))) {
            kh = lh(a.enabledPlugin.description);
            return
        }
        try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            jh = !0;
            kh = lh(b.GetVariable("$version"));
            return
        } catch (c) {}
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            jh = !0;
            kh = "6.0.21";
            return
        } catch (c) {}
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
            jh = !0,
            kh = lh(b.GetVariable("$version"))
        } catch (c) {}
    })();
    var mh = jh
      , nh = kh;
    var oh = function() {
        if (Qb) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec(B)) ? a[1] : "0"
        }
        return Pb ? (a = /10[_.][0-9_.]+/,
        (a = a.exec(B)) ? a[0].replace(/_/g, ".") : "10") : Rb ? (a = /Android\s+([^\);]+)(\)|;)/,
        (a = a.exec(B)) ? a[1] : "") : Sb || Tb || Ub ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/,
        (a = a.exec(B)) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var ph = function(a) {
        return (a = a.exec(B)) ? a[1] : ""
    }
      , qh = function() {
        if (Ng)
            return ph(/Firefox\/([0-9.]+)/);
        if (E || Mb || Jb)
            return bc;
        if (Rg)
            return Eb() ? ph(/CriOS\/([0-9.]+)/) : ph(/Chrome\/([0-9.]+)/);
        if (Sg && !Eb())
            return ph(/Version\/([0-9.]+)/);
        if (Og || Pg) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(B);
            if (a)
                return a[1] + "." + a[2]
        } else if (Qg)
            return (a = ph(/Android\s+([0-9.]+)/)) ? a : ph(/Version\/([0-9.]+)/);
        return ""
    }();
    var rh = function() {
        var a;
        !(a = E && 9 > bc || Nb) && (a = Pb && Sg) && (a = 0 <= La(qh, "6.0.1"));
        return a ? !1 : 0 <= La(nh, "11")
    }
      , sh = function(a) {
        a = a || !1;
        var b;
        if (b = Vb)
            b = 0 <= La(oh, 9);
        var c = Sg && F(601);
        return !a && (b || c)
    };
    var Dh = function() {
        this.g = 0;
        this.C = !1;
        this.h = -1;
        this.A = 0;
        this.l = !1
    }
      , Eh = function(a) {
        return a.l ? .3 <= a.g : .5 <= a.g
    };
    var Fh = function(a, b) {
        a = a || y;
        null !== a && a.top != a && (a = a.top);
        try {
            return a.document && !a.document.body ? new H(-1,-1) : b ? (new H(a.innerWidth,a.innerHeight)).round() : Uc(a || window).round()
        } catch (c) {
            return new H(-12245933,-12245933)
        }
    }
      , Gh = 0
      , Mh = function(a) {
        var b = 0 <= Hh ? Ih() - Hh : -1
          , c = Jh ? Ih() - Kh : -1
          , d = 0 <= Lh ? Ih() - Lh : -1;
        if (79463068 == a)
            return 500;
        if (947190538 == a) {
            a = [4E3];
            var e = [250, 1E3]
        } else if (947190541 == a)
            a = [4E3],
            e = [100, 1E3];
        else {
            if (947190542 == a)
                return 100;
            if (79463069 == a)
                return 200;
            a = [2E3, 4E3];
            e = [250, 500, 1E3]
        }
        var f = b;
        -1 != c && c < b && (f = c);
        for (var g, b = 0; b < a.length; ++b)
            if (f < a[b]) {
                g = e[b];
                break
            }
        void 0 === g && (g = e[a.length]);
        return -1 != d && 1500 < d && 4E3 > d ? 500 : g
    }
      , Nh = (new Date).getTime()
      , Hh = -1
      , Jh = !1
      , Kh = -1
      , Lh = -1
      , Ih = function() {
        return (new Date).getTime() - Nh
    }
      , Oh = function() {
        var a = Xc("DIV");
        a.style.cssText = "position:relative;left:0px;top:0px;width:0;height:0;";
        return a
    }
      , Rh = function(a) {
        return Ph(a, function(a, c) {
            return !(!Gb(c, "style") || !c.style || "none" !== hd(c, "display"))
        }, function(a) {
            return a
        }, !1) ? !0 : Qh(a)
    }
      , Qh = function(a) {
        var b = !E || F(8);
        return Ph(a, function(a, d) {
            a = Gb(d, "style") && d.style && hd(d, "visibility");
            return {
                hidden: "hidden" === a,
                visible: b && "visible" === a
            }
        }, function(a) {
            return a.hidden || a.visible
        }, {
            hidden: !1,
            visible: !1
        }).hidden
    }
      , Ph = function(a, b, c, d) {
        if (!a)
            return d;
        d = Sh(a, b, c, d);
        if (!d.done)
            try {
                var e = Qc(a)
                  , f = e && I(e);
                return Ph(f && f.frameElement, b, c, d.value)
            } catch (g) {}
        return d.value
    }
      , Sh = function(a, b, c, d) {
        if (!a)
            return {
                value: d,
                done: !1
            };
        d = b(d, a);
        var e = c(d, a);
        if (!e && Gb(a, "parentElement")) {
            e = Sh;
            a: {
                var f;
                if (gc && !(E && F("9") && !F("10") && m.SVGElement && a instanceof m.SVGElement) && (f = a.parentElement)) {
                    a = f;
                    break a
                }
                f = a.parentNode;
                a = ma(f) && 1 == f.nodeType ? f : null
            }
            b = e(a, b, c, d)
        } else
            b = {
                done: e,
                value: d
            };
        return b
    }
      , Th = function(a) {
        return new J(a.top,a.right,a.bottom,a.left)
    }
      , Uh = function(a) {
        return null != a && 0 <= a && 1 >= a
    };
    var Vh = function() {
        Dh.call(this);
        this.w = !1;
        this.volume = void 0;
        this.o = !1
    };
    x(Vh, Dh);
    var Wh = function(a) {
        return Uh(a.volume) && .1 <= a.volume
    };
    var Xh = function() {
        this.aa = [0, 0, 0, 0, 0];
        this.l = [0, 0, 0, 0, 0];
        this.ca = [0, 0, 0, 0, 0];
        this.L = this.ea = 0;
        this.Y = this.w = -1;
        this.fa = 1E3
    };
    Xh.prototype.A = function(a, b, c, d, e, f) {
        e = Yh(c.g);
        var g = Yh(b.g);
        g = -1 == e || -1 == g ? -1 : Math.max(e, g);
        e = d ? g : e;
        this.w = -1 != this.w ? Math.min(this.w, b.g) : b.g;
        f && (this.Y = Math.max(this.Y, b.g));
        -1 != e && (this.aa[e] += a);
        Zh(this.ca, e, a);
        f = this.l;
        g = this.ca;
        for (var k = [0, 0, 0, 0, 0], l = 0; 4 >= l; l++)
            k[l] = Math.max(f[l], g[l]);
        this.l = k;
        f = this.ca;
        g = Yh(b.g);
        for (k = 0; 4 >= k; ++k)
            if (k < g || b.C || -1 == g)
                f[k] = 0;
        (d ? Eh(c) && Eh(b) : Eh(c)) ? (this.L += a,
        this.ea = Math.max(this.ea, this.L)) : this.L = 0;
        return e
    }
    ;
    var Zh = function(a, b, c) {
        for (; 0 <= b && 4 >= b; b++)
            a[b] += c
    }
      , Yh = function(a) {
        var b = -1;
        1 <= a ? b = 0 : .75 <= a ? b = 1 : .5 <= a ? b = 2 : .3 <= a ? b = 3 : 0 < a && (b = 4);
        return b
    };
    var $h = function(a, b) {
        this.l = null;
        this.A = a;
        this.B = b || 1;
        this.h = "u"
    }
      , ai = function(a, b) {
        var c = b.right - b.left;
        b = b.bottom - b.top;
        var d = Math.floor(c / 2)
          , e = Math.floor(b / 2);
        switch (a.B) {
        case 4:
            return a.A ? (a = Math.floor(.3 * c),
            d = Math.floor(.3 * b),
            [new G(a,d), new G(c - a,d), new G(a,b - d), new G(c - a,b - d)]) : [new G(d,0), new G(0,e), new G(d,b - 1), new G(c - 1,e)];
        case 3:
            return [new G(c - 1,0), new G(d,e), new G(0,b - 1)];
        default:
            return [new G(d,e)]
        }
    }
      , bi = function(a, b) {
        try {
            var c = b || a.l.getBoundingClientRect()
        } catch (d) {
            c = new J(0,0,0,0)
        }
        a = ai(a, c);
        A(a, function(a) {
            a.x += c.left;
            a.y += c.top
        });
        return a
    }
      , ci = function(a, b) {
        $h.call(this, a, b);
        this.g = [];
        this.G = !1;
        this.o = -1;
        this.w = this.C = 0
    };
    x(ci, $h);
    var di = function(a, b, c) {
        this.g = a;
        this.l = b;
        this.h = c
    }
      , gi = function(a, b, c) {
        if (!(b && b.getBoundingClientRect && 0 <= La(nh, "11") && c) || E && 9 > bc || 0 < a.g.length)
            return !1;
        try {
            var d = b.getBoundingClientRect()
        } catch (n) {
            return !1
        }
        var e = "DIV" == b.tagName || "INS" == b.tagName
          , f = Qc(b)
          , g = [];
        if (e) {
            var k = Oh();
            d = ai(a, d);
            A(d, function(a, b) {
                b = new ei("e",f,c,String(b));
                this.g.push(b);
                g.push(w(b.B, b, k, a))
            }, a);
            b.insertBefore(k, b.childNodes[0] || null)
        } else
            d = bi(a, d),
            A(d, function(a, d) {
                d = new ei("e",f,c,String(d));
                this.g.push(d);
                g.push(w(d.G, d, b, a))
            }, a);
        var l = !0;
        A(g, function(a) {
            l = l && a()
        });
        l ? (a.h = "l",
        a.l = b,
        a.G = !e) : (A(a.g, function(a) {
            fi(a)
        }),
        a.g = []);
        return l
    }
      , ii = function(a) {
        if (a.l && a.G) {
            var b = bi(a);
            A(b, function(a, b) {
                this.g[b] && hi(this.g[b], a)
            }, a)
        }
    }
      , ji = function(a) {
        A(a.g, function(a) {
            fi(a)
        });
        a.g = [];
        a.h = "d"
    }
      , pi = function(a) {
        var b = ta()
          , c = a.C ? b - a.C : 0
          , d = -1
          , e = Sa(a.g, function(a) {
            return ki(a, b)
        });
        4 == a.g.length ? d = a.A ? li(e) : mi(e) : 3 == a.g.length ? d = ni(e) : 1 == a.g.length && (d = [-1, 0, 1, 2, 3, 5][ki(a.g[0], b) + 1]);
        a.w = d == a.o ? a.w + c : 0;
        c = new di(d,a.o,c);
        a.o = d;
        a.C = b;
        oi(a, d);
        ii(a);
        return c
    }
      , ri = function(a) {
        var b = db(ob(qi));
        A(a, function(a) {
            0 <= a && ++b[a]
        });
        return b
    }
      , mi = function(a) {
        a = ri(a);
        return 4 == a[4] ? 6 : 3 <= a[4] ? 5 : 0 < a[4] ? 4 : 4 == a[2] ? 2 : 4 == a[1] ? 1 : 4 == a[0] ? 0 : 3
    }
      , ni = function(a) {
        var b = ri(a);
        return 4 == a[0] && 4 == a[2] ? 6 : 4 == a[1] ? 5 : 0 < b[4] ? 4 : 3 == b[2] ? 2 : 3 == b[1] ? 1 : 3 == b[0] ? 0 : 3
    }
      , li = function(a) {
        a = ri(a);
        return 3 <= a[4] ? 5 : 2 == a[4] ? 8 : 0 < a[4] ? 7 : 4 == a[2] ? 2 : 4 == a[1] ? 1 : 4 == a[0] ? 0 : 3
    }
      , oi = function(a, b) {
        if (0 == b && si(a))
            a.h = "n";
        else
            switch (b) {
            case -1:
                a.h = "d";
                break;
            case 0:
                a.h = "l";
                break;
            case 1:
                a.h = "f";
                break;
            case 2:
                a.h = "c";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
                a.h = "r"
            }
    }
      , si = function(a) {
        return "n" == a.h ? !0 : "l" == a.h && 3E3 <= a.w
    }
      , ei = function(a, b, c, d) {
        this.g = null;
        this.A = a;
        this.C = "e" == a ? String(c) + "~" + String(d) : "";
        this.h = [];
        this.l = -1;
        this.w = 0;
        this.o = db(ob(ti));
        this.F = db(ob(qi));
        "e" == this.A && (ui[this.C] = w(this.D, this));
        E ? (a = b.createElement("div"),
        a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="opacity:0;-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(opacity=0)\';filter:alpha(opacity=0)"><param name="movie" value="' + vi(this, !0) + '"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param></object>',
        a = a.firstChild,
        a.id = String(Math.random())) : a = wi(this, b);
        a.width = 1;
        a.height = 1;
        a.style.zIndex = -999999;
        this.g = a
    }
      , qi = {
        Jk: -1,
        LOADING: 0,
        ld: 1,
        fd: 2,
        $h: 3,
        Sk: 4
    }
      , ti = {
        LOADING: 0,
        ld: 1,
        fd: 2,
        yk: 3,
        bj: 4,
        Hk: 5,
        Ik: 6,
        Gk: 7,
        ej: 8,
        xk: 9
    }
      , ui = {}
      , wi = function(a, b) {
        var c = function(a, c, d) {
            var e = b.createElement("param");
            e.name = c;
            e.value = d;
            a.appendChild(e)
        };
        a = vi(a);
        var d = b.createElement("object");
        d.type = "application/x-shockwave-flash";
        d.data = a;
        c(d, "movie", a);
        c(d, "allowscriptaccess", "always");
        c(d, "wmode", "opaque");
        d.style.visibility = "hidden";
        d.style.opacity = 0;
        return d
    }
      , vi = function(a, b) {
        a = Pd("//pagead2.googlesyndication.com/osd/hbe.swf", "id", a.C);
        b && (a = Pd(a, "delay", "1"));
        return a
    };
    ei.prototype.B = function(a, b) {
        if (!this.g)
            return !1;
        this.g.style.position = "absolute";
        hi(this, b);
        b = !0;
        try {
            a.appendChild(this.g)
        } catch (c) {
            b = !1
        }
        return b
    }
    ;
    ei.prototype.G = function(a, b) {
        if (!this.g || !a.parentNode)
            return !1;
        this.g.style.position = "fixed";
        hi(this, b);
        b = !0;
        try {
            a.parentNode && a.parentNode.insertBefore(this.g, a.nextSibling)
        } catch (c) {
            b = !1
        }
        return b
    }
    ;
    var hi = function(a, b) {
        a.g && !ec(b, kd(a.g)) && jd(a.g, b)
    }
      , fi = function(a) {
        if (a.g)
            try {
                $c(a.g)
            } catch (b) {}
        a.g = null
    };
    ei.prototype.D = function(a) {
        this.l = a ? 3 : 4
    }
    ;
    var ki = function(a, b) {
        if ("e" == a.A) {
            b = null;
            try {
                b = a.g.it()
            } catch (e) {}
            null === b ? (b = 0,
            0 < a.l && (b = 2)) : b = b ? 3 : 4;
            ++a.F[b + 1];
            a.l = b
        } else {
            var c = Number(b);
            b = null;
            try {
                b = a.g.fc()
            } catch (e) {}
            var d = b;
            xi(a, d, c);
            b = a.h[a.h.length - 1];
            if (null === d) {
                if (d = c = 0,
                0 < a.l || t(b.lb))
                    d = c = 2
            } else
                null === b.lb || b.Qb >= c ? (c = 10 <= d ? 4 : 0,
                d = 0) : d > b.lb ? (b = (d - b.lb) / (c - b.Qb) * 1E3,
                c = 10 <= b ? 4 : 3,
                b = 0 == b ? 1 : 1 > b ? 3 : 4 > b ? 4 : 23 > b ? 6 : 26 > b ? 8 : 9,
                6 == a.w && 6 == b && (b = 7),
                d = b) : d = c = 1;
            6 == a.w && (--a.o[6],
            4 == d || 8 == d ? ++a.o[5] : ++a.o[7]);
            ++a.o[d];
            a.l = c;
            a.w = d
        }
        return a.l
    }
      , xi = function(a, b, c) {
        var d = c - 1E3
          , e = a.h.length;
        A(a.h, function(a, b) {
            a.Qb <= d && (e = Math.min(e, b + 1))
        });
        var f = a.h.length - e;
        0 < f && a.h.splice(e, f);
        a.h.unshift({
            lb: b,
            Qb: c
        })
    };
    q("gteh", ve(145, function(a, b) {
        a = ui[a];
        v(a) && a(b)
    }), void 0);
    var yi = function(a, b) {
        $h.call(this, a, b);
        this.g = [];
        this.C = !1;
        this.w = 0;
        this.o = -1
    };
    x(yi, $h);
    var zi = [3, 7, 8, 5, 5]
      , Ai = [3, 4, 4, 5, 6]
      , Bi = [3, 4, 5, 6]
      , Ci = [3, 5]
      , Gi = function(a, b) {
        var c = b.getBoundingClientRect();
        var d = "DIV" == b.tagName || "INS" == b.tagName
          , e = Qc(b)
          , f = !0
          , g = a.g;
        if (d) {
            var k = Oh();
            c = ai(a, c);
            b.insertBefore(k, b.childNodes[0] || null);
            A(c, function(a) {
                var b = new Di(e);
                g.push(b);
                var c;
                if (c = f)
                    if (b.g) {
                        b.g.style.position = "absolute";
                        Ei(b, a);
                        a = !0;
                        try {
                            k.appendChild(b.g)
                        } catch (C) {
                            a = !1
                        }
                        c = a
                    } else
                        c = !1;
                f = c
            })
        } else
            c = bi(a, c),
            A(c, function(a) {
                var c = new Di(e);
                g.push(c);
                var d;
                if (d = f)
                    if (c.g && b.parentNode) {
                        c.g.style.position = "fixed";
                        Ei(c, a);
                        a = !0;
                        try {
                            b.parentNode && b.parentNode.insertBefore(c.g, b.nextSibling)
                        } catch (C) {
                            a = !1
                        }
                        d = a
                    } else
                        d = !1;
                f = d
            });
        f ? (a.l = b,
        a.C = !d) : (A(g, function(a) {
            Fi(a)
        }),
        a.g = []);
        return f
    }
      , Hi = function(a) {
        if (a.l && a.C) {
            var b = bi(a);
            A(b, function(a, b) {
                this.g[b] && Ei(this.g[b], a)
            }, a)
        }
    }
      , Ii = function(a) {
        A(a.g, function(a) {
            Fi(a)
        });
        a.g = []
    }
      , Ji = function(a) {
        var b = ta()
          , c = a.w ? b - a.w : 0
          , d = Ua(a.g, function(a) {
            return 50 > b - a.h - a.l
        })
          , d = 4 == a.g.length ? a.A ? zi[d] : Ai[d] : 3 == a.g.length ? Bi[d] : 1 == a.g.length ? Ci[d] : -1
          , c = new di(d,a.o,c);
        a.o = d;
        a.w = b;
        Hi(a);
        return c
    }
      , Di = function(a) {
        this.g = null;
        this.l = this.h = 0;
        Ki(this, a)
    }
      , Ki = function(a, b) {
        var c = b.createElement("iframe");
        c.srcdoc = "";
        c.frameBorder = 0;
        c.style.width = "1px";
        c.style.height = "1px";
        c.style.opacity = "0";
        c.style.zIndex = -999999;
        a.g = c;
        var d = me(245, a.o, a, void 0);
        c.addEventListener("load", ve(244, function() {
            c.contentWindow.requestAnimationFrame(d)
        }))
    };
    Di.prototype.o = function(a) {
        this.g && this.g.contentWindow && (this.g.contentWindow.requestAnimationFrame(me(245, this.o, this, void 0)),
        this.h || (this.h = ta() - a),
        this.l = a)
    }
    ;
    var Ei = function(a, b) {
        a.g && !ec(b, kd(a.g)) && jd(a.g, b)
    }
      , Fi = function(a) {
        try {
            $c(a.g)
        } catch (b) {}
        a.g = null
    };
    if (ua && ua.URL) {
        var wd = ua.URL
          , Li = !(wd && 0 < xd().length);
        le.l = Li
    }
    var Mi = function(a, b, c, d) {
        c = me(d, c, void 0, void 0);
        zd(a, b, c, {
            capture: void 0
        });
        return c
    };
    var Ni = function() {};
    ga(Ni);
    var R = function() {
        this.L = !1;
        this.A = void 0;
        this.l = !qd(y.top);
        var a = Ud();
        a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(Gd)[3] || null) ? decodeURI(a) : a) || "" : "";
        this.D = a;
        this.w = this.B = this.G = this.h = null;
        this.H = 0;
        this.o = !1;
        this.C = new J(0,0,0,0);
        this.F = 0;
        this.g = "geo"
    }
      , Oi = function(a, b) {
        b && (b = b.split("-"),
        4 == b.length && (a.C = new J(Na(b[0]),Na(b[3]),Na(b[2]),Na(b[1]))))
    };
    ga(R);
    var Qi = function(a, b, c) {
        this.position = Pi.clone();
        this.B = 0;
        this.Hb = this.Xa();
        this.Gb = -2;
        this.yd = ta();
        this.hc = -1;
        this.X = b;
        this.J = -1 != b;
        this.pa = null;
        this.ec = c;
        this.kc = this.Ib = fa;
        this.D = this.element = a;
        this.K = this.o = null;
        this.W = 1;
        this.Ub = this.ca = this.da = !1;
        this.Qa = 1;
        this.Tb = !0;
        this.C = !1;
        this.rd = R.getInstance().H++;
        this.$b = 0;
        this.h = this.ub();
        this.gc = -1;
        this.va = new J(0,0,0,0)
    }
      , Pi = new J(0,0,0,0)
      , Ri = {
        threshold: [0, .3, .5, .75, 1]
    }
      , Si = function(a, b) {
        return null === a || null === b ? Pi.clone() : new J(Math.max(a.top, b.top),Math.min(a.right, b.right),Math.min(a.bottom, b.bottom),Math.max(a.left, b.left))
    };
    Qi.prototype.Xa = function() {
        return new Xh
    }
    ;
    Qi.prototype.ma = function() {
        return this.Hb
    }
    ;
    var Ti = function(a, b, c, d, e) {
        if (a.J) {
            var f = y.innerWidth
              , g = y.innerHeight
              , k = new J(Math.round(y.mozInnerScreenY),Math.round(y.mozInnerScreenX + f),Math.round(y.mozInnerScreenY + g),Math.round(y.mozInnerScreenX));
            c = new J(y.screenY + d,y.screenX + c.width,y.screenY + c.height,y.screenX);
            e || (d = new J(k.top - c.top,k.right - c.left,k.bottom - c.top,k.left - c.left),
            d.top > a.position.top ? a.position = d : (a.position.right = a.position.left + f,
            a.position.bottom = a.position.top + g),
            a.B = f * g);
            a.ua(k, c, b, e, !0, !0)
        }
    }
      , Wi = function(a, b, c) {
        var d;
        if (a.J && (d = ih())) {
            c || Ui(a, y, !0);
            if (a.Ub) {
                d = Vi(a, d);
                var e = !0
            } else {
                e = Math.floor((a.position.left + a.position.right) / 2);
                var f = Math.floor((a.position.top + a.position.bottom) / 2)
                  , g = Vc(document);
                d = d(e - g.x, f - g.y) ? .5 : 0;
                e = !1
            }
            a.ua(a.position, d, b, c, !0, e)
        }
    }
      , Xi = function(a, b, c) {
        if (c(b))
            return b;
        for (; ; ) {
            var d = Math.floor((a + b) / 2);
            if (d == a || d == b)
                return a;
            c(d) ? a = d : b = d
        }
    }
      , Vi = function(a, b) {
        var c = Vc(document)
          , d = a.Qa
          , e = Math.floor(a.position.left - c.x) + 1
          , f = Math.floor(a.position.top - c.y) + 1
          , g = Math.floor(a.position.right - c.x) - d
          , k = Math.floor(a.position.bottom - c.y) - d;
        a = (k - f) * (g - e);
        if (f > k || e > g)
            return 0;
        c = !!b(e, f);
        d = !!b(g, k);
        if (c && d)
            return 1;
        var l = !!b(g, f)
          , n = !!b(e, k);
        if (c)
            k = Xi(f, k, function(a) {
                return !!b(e, a)
            }),
            g = Xi(e, g, function(a) {
                return !!b(a, f)
            });
        else if (l)
            k = Xi(f, k, function(a) {
                return !!b(g, a)
            }),
            e = Xi(g, e, function(a) {
                return !!b(a, f)
            });
        else if (n)
            f = Xi(k, f, function(a) {
                return !!b(e, a)
            }),
            g = Xi(e, g, function(a) {
                return !!b(a, k)
            });
        else if (d)
            f = Xi(k, f, function(a) {
                return !!b(g, a)
            }),
            e = Xi(g, e, function(a) {
                return !!b(a, k)
            });
        else {
            var u = Math.floor((e + g) / 2)
              , C = Math.floor((f + k) / 2);
            if (!b(u, C))
                return 0;
            f = Xi(C, f, function(a) {
                return !!b(u, a)
            });
            k = Xi(C, k, function(a) {
                return !!b(u, a)
            });
            e = Xi(u, e, function(a) {
                return !!b(a, C)
            });
            g = Xi(u, g, function(a) {
                return !!b(a, C)
            })
        }
        return (k - f) * (g - e) / a
    }
      , Yi = function(a, b, c, d, e) {
        a.J && (d || Ui(a, y, e),
        a.ua(a.position, c, b, d, !1, !0))
    };
    Qi.prototype.cc = fa;
    Qi.prototype.bc = fa;
    Qi.prototype.Cc = fa;
    Qi.prototype.nb = fa;
    var Zi = function(a, b, c) {
        if (a.J) {
            var d = c ? a.h.g : a.$b, e;
            if (e = a.va) {
                e = a.va;
                var f = new J(0,0,0,0);
                e = !(e == f || e && f && e.top == f.top && e.right == f.right && e.bottom == f.bottom && e.left == f.left)
            }
            e && (d = cd(a.va.clone(), a.position.left, a.position.top));
            a.ua(a.position, d, b, c, !0, !0)
        }
    }
      , $i = function(a, b, c) {
        if (a.J && a.O) {
            var d = Fd()
              , e = R.getInstance();
            Ui(a, d, e.l);
            d = a.O.h();
            a.ua(a.position, d.g(), b, c, !0, d.h() || d.l())
        }
    };
    h = Qi.prototype;
    h.ua = function(a, b, c, d, e, f, g) {
        var k = g || {};
        g = this.Ac(c, k);
        k = this.sb(a, b, d, k);
        t(b) || (this.pa = new H(b.right - b.left,b.bottom - b.top));
        this.Sb(g, k, e && .5 <= this.h.g, f);
        this.X = c;
        0 < k.g && -1 === this.gc && (this.gc = c);
        -1 == this.hc && aj(this) && (this.hc = c);
        if (-2 == this.Gb)
            try {
                a: {
                    var l = t(b) ? null : b;
                    if (a && a != Pi && 0 != this.B) {
                        if (!l) {
                            if (!this.pa) {
                                var n = -1;
                                break a
                            }
                            l = new J(0,this.pa.width,this.pa.height,0)
                        }
                        n = l.Za && 0 < l.Za() && l.Ya && 0 < l.Ya() ? this.Na(a, l) : -1
                    } else
                        n = -1
                }
                this.Gb = n
            } catch (u) {
                we(207, u)
            }
        this.h = k;
        d && (this.h.g = 0);
        this.Ib(this)
    }
    ;
    h.Sb = function(a, b, c, d) {
        this.ma().A(a, b, this.h, c, .5, d)
    }
    ;
    h.ub = function() {
        return new Dh
    }
    ;
    h.sb = function(a, b, c) {
        var d = this.ub();
        d.C = c;
        c = fh();
        d.h = 0 == c ? -1 : 1 == c ? 0 : 1;
        if (t(b))
            d.g = this.Na(b);
        else {
            var e = b;
            d.g = this.Na(a, e)
        }
        (a = e || null) ? (a = (a.bottom - a.top) * (a.right - a.left),
        a = 0 < a ? Math.min(this.B * d.g / a, 1) : 0) : a = 0;
        d.A = a;
        d.l = !1;
        return d
    }
    ;
    h.Ac = function(a) {
        if (-1 == this.X)
            return 0;
        a = a - this.X || 1;
        return 1E4 < a ? 1 : a
    }
    ;
    h.Na = function(a, b) {
        return t(a) ? a : b ? (a = Si(a, b),
        b = 0 >= this.B || 0 >= a.Za() || 0 >= a.Ya() ? !0 : !1,
        b ? 0 : (a.bottom - a.top) * (a.right - a.left) / this.B) : 0
    }
    ;
    h.qb = function(a) {
        if (this.o)
            return !0;
        if (this.da)
            return !1;
        this.W = a || 1;
        if (!this.D || !rh())
            return this.da = !0,
            !1;
        a = new ci(!1,this.W);
        var b = gi(a, this.D, String(this.rd));
        b ? this.o = a : this.da = !0;
        return b
    }
    ;
    var Ui = function(a, b, c, d) {
        if (d)
            a.position = d;
        else {
            b = c ? b : b.top;
            try {
                var e = Pi.clone()
                  , f = new G(0,0);
                if (a.D) {
                    var g = 1 == a.ec;
                    !c && g && Rh(a.D) || (e = a.D.getBoundingClientRect());
                    f = nd(a.D, b)
                }
                var k = f.x
                  , l = f.y;
                a.position = new J(Math.round(l),Math.round(k + (e.right - e.left)),Math.round(l + (e.bottom - e.top)),Math.round(k))
            } catch (n) {
                a.position = Pi.clone()
            }
        }
        a.B = (a.position.bottom - a.position.top) * (a.position.right - a.position.left)
    };
    Qi.prototype.Aa = function() {
        return 0
    }
    ;
    var aj = function(a) {
        a = a.Hb;
        var b = Yh(.5);
        return -1 == b ? !1 : a.l[b] >= a.fa
    }
      , bj = function(a, b) {
        b = Math.pow(10, b);
        return Math.floor(a * b) / b
    }
      , cj = function(a) {
        a.O || a.o && ji(a.o)
    }
      , fj = function(a, b) {
        var c = !1
          , d = a.D;
        b.document && b.document.body && 12 == a.ec && (d = b.document.body);
        if (null === d)
            return !1;
        ue(152, function() {
            var e = new b.IntersectionObserver(function(c) {
                try {
                    dj(b, c, a)
                } catch (g) {
                    try {
                        e.unobserve(d),
                        we("osd_adblock::nioc", g)
                    } catch (k) {}
                }
            }
            ,Ri);
            e.observe(d);
            ej(d);
            c = !0
        });
        return c
    }
      , ej = function(a) {
        if (a && (a = a.style)) {
            var b = a.opacity;
            a.opacity = .98;
            a.opacity = .99;
            a.opacity = b
        }
    }
      , gj = function(a, b) {
        var c = !1;
        ue(151, function() {
            var d = Bd(b).Zk(function(c) {
                try {
                    dj(b, c, a)
                } catch (f) {
                    try {
                        d(),
                        we("osd_adblock::aioc", f)
                    } catch (g) {}
                }
            });
            c = !0
        });
        return c
    }
      , dj = function(a, b, c) {
        if (!b || !b.length || 0 >= b.length)
            var d = null;
        else {
            d = b[0];
            for (var e = 1; e < b.length; e++)
                b[e].time > d.time && (d = b[e])
        }
        d && (b = Th(d.boundingClientRect),
        e = Th(d.intersectionRect),
        c.h.g = Math.min(Math.max(d.intersectionRect.width * d.intersectionRect.height / (d.boundingClientRect.width * d.boundingClientRect.height), 0), 1),
        c.$b = c.h.g,
        Ui(c, a, !0, b),
        a = Si(b, e),
        c.va = 0 >= c.B || a.top >= a.bottom || a.left >= a.right ? new J(0,0,0,0) : cd(a, -b.left, -b.top))
    };
    Qi.prototype.Rb = function(a) {
        if (!this.D)
            return !1;
        a = a || 1;
        var b = new yi(!1,a)
          , c = Gi(b, this.D);
        c && (this.W = a,
        this.K = b);
        return c
    }
    ;
    var hj = function(a, b, c, d) {
        d && (a.kc = d);
        switch (c) {
        case "nio":
            return fj(a, b);
        case "aio":
            return gj(a, b);
        case "swf":
            return a.qb();
        case "raf":
            return a.Rb();
        case "geo":
        case "xde":
        case "iem":
            return !0
        }
        return !1
    };
    var ij = function() {
        this.g = {};
        this.g.vs = [1, 0];
        this.g.vw = [0, 1];
        this.g.am = [2, 2];
        this.g.a = [4, 4];
        this.g.f = [8, 8];
        this.g.bm = [16, 16];
        this.g.b = [32, 32];
        this.g.avw = [0, 64];
        this.g.cm = [128, 128];
        this.g.pv = [256, 256];
        this.g.gdr = [0, 512];
        this.g.p = [0, 1024];
        this.g.r = [0, 2048];
        this.g.m = [0, 4096];
        this.g.um = [0, 8192];
        this.g.ef = [0, 16384];
        this.g.s = [0, 32768];
        this.h = {};
        for (var a in this.g)
            0 < this.g[a][1] && (this.h[a] = 0);
        this.l = 0
    }
      , jj = function(a, b) {
        var c = a.g[b]
          , d = c[1];
        a.l += c[0];
        0 < d && 0 == a.h[b] && (a.h[b] = 1)
    }
      , lj = function(a) {
        return kj(a, qb(a.g))
    }
      , kj = function(a, b) {
        var c = 0, d;
        for (d in a.h)
            Xa(b, d) && 1 == a.h[d] && (c += a.g[d][1],
            a.h[d] = 2);
        return c
    }
      , mj = function(a) {
        var b = 0, c;
        for (c in a.h) {
            var d = a.h[c];
            if (1 == d || 2 == d)
                b += a.g[c][1]
        }
        return b
    };
    var nj = function() {
        this.g = []
    };
    ga(nj);
    var oj = function() {
        Xh.call(this);
        this.da = this.J = this.M = this.K = this.X = this.h = 0;
        this.C = -1;
        this.G = this.F = this.D = this.B = this.T = this.Z = this.H = 0;
        this.O = [0, 0, 0, 0, 0];
        this.o = this.g = -1;
        this.I = this.W = 0;
        this.fa = 2E3
    };
    x(oj, Xh);
    var pj = function(a, b, c) {
        var d = a.da;
        Jh || c || -1 == a.C || (d += b - a.C);
        return d
    };
    oj.prototype.A = function(a, b, c, d, e, f) {
        if (b.o)
            return -1;
        d = oj.R.A.call(this, a, b, c, d, e, f);
        e = Yh(e);
        e = -1 != d && d <= e;
        f = Wh(b) && Wh(c);
        Uh(b.volume) && (this.g = -1 != this.g ? Math.min(this.g, b.volume) : b.volume,
        this.o = Math.max(this.o, b.volume));
        e && (this.K += a,
        this.M += a);
        this.h += a;
        this.X += a;
        c.w && (this.W += a,
        this.I += a);
        0 == d && (this.J += a);
        f && (this.T += a,
        this.B += a,
        Zh(this.O, d, a),
        0 == d && (this.G += a),
        e ? (this.D += a,
        this.F += a) : this.H += a,
        this.Z = Math.max(this.H, this.Z));
        if (e || !Wh(b))
            this.H = 0;
        return d
    }
    ;
    var qj = function(a, b, c, d) {
        Qi.call(this, b, c, d);
        this.Da = 0;
        this.G = {};
        this.l = new ij;
        this.ad = {};
        this.Ka = this.w = "";
        this.lc = !1;
        this.A = [];
        this.cd = this.pc = this.qc = this.H = !1;
        this.F = void 0;
        this.L = -1;
        this.Fb = void 0;
        this.Oa = !1;
        this.fa = this.ea = 0;
        this.ia = 1;
        this.oa = -1;
        this.Eb = this.Xb = !1;
        this.I = this.jc = 0;
        this.Kb = !1;
        this.Zb = this.ac = -1;
        this.ka = this.aa = this.g = 0;
        this.zd = this.vd = -1;
        this.xd = 0;
        this.td = [0, 0, 0, 0, 0];
        this.T = this.Lb = this.ud = 0;
        this.Y = -1;
        this.Mb = 0;
        this.Yb = !1;
        this.wb = null;
        this.oc = !1;
        this.za = fa;
        this.Z = [this.Xa()];
        this.dc = !1;
        this.Ub = !0;
        this.Qa = 2;
        b = R.getInstance();
        Ui(this, a, b.l);
        this.M = {};
        this.M.pause = "p";
        this.M.resume = "r";
        this.M.skip = "s";
        this.M.mute = "m";
        this.M.unmute = "um";
        this.M.exitfullscreen = "ef"
    };
    x(qj, Qi);
    qj.prototype.Rb = function(a) {
        R.getInstance();
        var b = nj.getInstance()
          , c = Xa(b.g, 509445011);
        return Xa(b.g, 509445013) || c ? (this.dc = !0,
        qj.R.Rb.call(this, a || 3)) : !1
    }
    ;
    qj.prototype.qb = function(a) {
        return qj.R.qb.call(this, a || 3)
    }
    ;
    qj.prototype.cc = function(a) {
        if (!this.Kb || 1E3 < a - this.ac) {
            var b = ea("ima.bridge.getNativeViewability");
            v(b) && (b(this.w, w(this.Pd, this)),
            this.Kb = !0,
            this.ac = a)
        }
    }
    ;
    qj.prototype.bc = function(a) {
        var b = R.getInstance();
        a - this.Zb > Mh(b.A) && (a = ea("ima.admob.getViewability"),
        v(a) && a(this.w))
    }
    ;
    var rj = function(a) {
        return p(a) ? Number(a) ? bj(a, 3) : 0 : a
    };
    h = qj.prototype;
    h.Pd = function(a) {
        this.Kb = !1;
        wb(a) && this.Mb++;
        this.nb(a)
    }
    ;
    h.Cc = function(a) {
        this.Zb = Ih();
        this.nb(a)
    }
    ;
    h.nb = function(a) {
        var b = a.opt_nativeViewBounds || {}
          , c = a.opt_nativeViewVisibleBounds || {}
          , d = a.opt_nativeTime || -1
          , e = a.opt_nativeVolume
          , f = a.opt_nativeViewAttached;
        a = a.opt_nativeViewHidden;
        void 0 !== f && (this.wb = !!f);
        b = new J(b.top || 0,b.left + b.width || 0,b.top + b.height || 0,b.left || 0);
        c = a ? Pi.clone() : new J(c.top || 0,c.left + c.width || 0,c.top + c.height || 0,c.left || 0);
        f = void 0;
        "n" == this.F && (f = {},
        f.volume = e);
        this.B = (b.bottom - b.top) * (b.right - b.left);
        this.position = b;
        this.ua(b, c, d, !1, !0, !0, f)
    }
    ;
    h.ua = function(a, b, c, d, e, f, g) {
        var k = this.za(this) || {};
        Ab(k, g || {});
        this.L = k.duration || this.L;
        this.Fb = k.isVpaid || this.Fb;
        this.Oa = f;
        qj.R.ua.call(this, a, b, c, d, e, f, k)
    }
    ;
    h.Sb = function(a, b, c, d) {
        qj.R.Sb.call(this, a, b, c, d);
        this.Z[this.Z.length - 1].A(a, b, this.h, c, .5, d);
        this.Eb = Wh(this.h) && Wh(b);
        -1 == this.oa && this.Xb && (this.oa = this.ma().h);
        this.l.l = 0;
        a = this.h;
        b = aj(this);
        .5 <= a.g && jj(this.l, "vs");
        b && jj(this.l, "vw");
        Uh(a.volume) && jj(this.l, "am");
        this.Eb && jj(this.l, "a");
        this.C && jj(this.l, "f");
        -1 != a.h && (jj(this.l, "bm"),
        1 == a.h && jj(this.l, "b"));
        this.Eb && b && jj(this.l, "avw");
        this.Oa && jj(this.l, "cm");
        this.Oa && 0 < a.g && jj(this.l, "pv");
        sj(this, this.ma().h, !0) && jj(this.l, "gdr")
    }
    ;
    h.Xa = function() {
        return new oj
    }
    ;
    h.ma = function() {
        return this.Hb
    }
    ;
    h.ub = function() {
        return new Vh
    }
    ;
    h.sb = function(a, b, c, d) {
        a = qj.R.sb.call(this, a, b, c, d);
        a.w = this.C;
        a.o = this.H;
        a.volume = d.volume;
        Uh(a.volume) || (this.jc++,
        d = this.h,
        Uh(d.volume) && (a.volume = d.volume));
        return a
    }
    ;
    h.Ac = function(a, b) {
        var c = p(b.currentTime) ? b.currentTime : this.ea
          , d = tj(this, a)
          , e = c - this.ea
          , f = b.isYouTube;
        b = p(b.isPlaying) ? b.isPlaying : !0;
        var g = 0;
        2 != this.ia ? (0 <= e ? (this.fa += d,
        this.T += Math.max(d - e, 0),
        g = Math.min(e, this.fa)) : this.Lb += Math.abs(e),
        0 != e && (this.fa = 0),
        -1 == this.Y && 0 < e && (this.Y = 0 <= Lh ? Ih() - Lh : -1)) : (b || this.H || (this.T += d),
        -1 == this.Y && b && (this.Y = 0 <= Lh ? Ih() - Lh : -1));
        this.ea = c;
        if (f) {
            if (1 == this.ia)
                return g;
            if (2 == this.ia)
                return b ? d : 0
        }
        return tj(this, a)
    }
    ;
    var tj = function(a, b) {
        if (-1 == a.X)
            return 0;
        b = b - a.X || 1;
        var c = 1E4;
        p(a.L) && -1 != a.L && (c = Math.max(c, a.L / 3));
        return b > c ? 1 : b
    };
    qj.prototype.Na = function(a, b) {
        return this.Yb ? 0 : this.C ? 1 : qj.R.Na.call(this, a, b)
    }
    ;
    qj.prototype.Aa = function() {
        return 1
    }
    ;
    var sj = function(a, b, c) {
        return 15E3 <= b ? !0 : a.Xb ? c ? !0 : -1 != a.L ? b >= a.L / 2 : -1 != a.oa ? b >= a.oa : !1 : !1
    }
      , uj = function(a, b) {
        for (var c = a.A, d = kf({
            ng: 0,
            gb: void 0
        }), e = c.length; e < b + 1; )
            c.push(d()),
            e++;
        a.A[b] = {
            viewableArea: bj(a.h.g, 2),
            instantaneousState: a.l.l
        }
    }
      , wj = function(a, b) {
        var c = a.ad[b];
        if (null != c)
            return c;
        a: if (Xa(dh, b))
            c = !0;
        else {
            c = a.G[b];
            if (p(c) && (a.G[b] = !0,
            !c)) {
                c = !0;
                break a
            }
            c = !1
        }
        c = vj(a, c, c);
        "fully_viewable_audible_half_duration_impression" == b && (c.std = "csm",
        c.ic = kj(a.l, ["gdr"]));
        return c
    }
      , vj = function(a, b, c) {
        if (a.ca)
            return {
                "if": 0
            };
        var d = a.position.clone();
        d.round();
        var e = Sa(a.A, function(a) {
            return 100 * a.ng | 0
        })
          , f = R.getInstance()
          , g = a.ma()
          , k = {};
        a.dc && (k.avms = "raf");
        k["if"] = f.l ? 1 : void 0;
        k.sdk = a.F ? a.F : void 0;
        k.t = a.yd;
        k.p = [d.top, d.left, d.bottom, d.right];
        k.tos = g.aa;
        k.mtos = g.l;
        k.ps = void 0;
        k.pt = e;
        k.vht = pj(g, Ih(), !!a.H);
        k.mut = g.Z;
        k.a = rj(a.h.volume);
        k.mv = rj(g.o);
        k.fs = a.C ? 1 : 0;
        k.ft = g.W;
        k.at = g.T;
        k.as = .1 <= g.g ? 1 : 0;
        k.atos = g.O;
        k.uac = a.jc;
        k.vpt = g.h;
        "nio" == f.g && (k.nio = 1,
        k.avms = "nio");
        k.gmm = "4";
        k.gdr = sj(a, g.h, !0) ? 1 : 0;
        a.Ub && (k.efpf = a.Qa);
        a.o && (k.swf = a.o.h,
        k.px = a.W,
        k.avms = "swf");
        0 < a.Mb && (k.nnut = a.Mb);
        k.tcm = a.ia;
        k.nmt = a.Lb;
        k.bt = a.T;
        k.pst = a.Y;
        k.vpaid = a.Fb;
        k.dur = a.L;
        k.vmtime = a.ea;
        k.is = a.l.l;
        1 <= a.A.length && (k.i0 = a.A[0].gb);
        2 <= a.A.length && (k.i1 = a.A[1].gb);
        3 <= a.A.length && (k.i2 = a.A[2].gb);
        4 <= a.A.length && (k.i3 = a.A[3].gb);
        k.cs = mj(a.l);
        b && (k.ic = lj(a.l),
        k.dvpt = g.X,
        k.dvs = g.M,
        k.dfvs = g.J,
        k.davs = g.F,
        k.dafvs = g.G,
        c && (g.X = 0,
        g.M = 0,
        g.J = 0,
        g.F = 0,
        g.G = 0),
        aj(a) && (k.dtos = g.K,
        k.dav = g.D,
        k.dtoss = a.Da + 1,
        c && (g.K = 0,
        g.D = 0,
        a.Da++)),
        k.dat = g.B,
        k.dft = g.I,
        c && (g.B = 0,
        g.I = 0));
        f.w && (k.ps = [f.w.width, f.w.height]);
        f.h && (k.bs = [f.h.width, f.h.height]);
        f.G && (k.scs = [f.G.width, f.G.height]);
        k.dom = f.D;
        a.da && (k.fmf = "1",
        k.px = a.W);
        a.I && (k.vds = a.I);
        a.g && (k.vmer = a.g);
        a.aa && (k.vmmk = a.aa);
        a.ka && (k.vmiec = a.ka);
        a.O && (k.avms = a.O.l(),
        Ab(k, a.O.g()));
        "exc" == f.g && (k.femt = a.vd,
        k.femvt = a.zd,
        k.emc = a.xd,
        k.emb = a.td,
        k.emuc = a.ud,
        k.avms = "exc");
        xj() ? (k.c = bj(a.h.g, 2),
        k.ss = bj(yj(a), 2)) : k.tth = Ih() - Gh;
        k.mc = bj(g.Y, 2);
        k.nc = bj(g.w, 2);
        k.mv = rj(g.o);
        k.nv = rj(g.g);
        k.lte = bj(a.Gb, 2);
        b = a.Z[a.Z.length - 1];
        k.qmtos = b.l;
        k.qnc = bj(b.w, 2);
        k.qmv = rj(b.o);
        k.qnv = rj(b.g);
        k.qas = .1 <= b.g ? 1 : 0;
        k.qi = a.w;
        null !== a.wb && (k.nvat = a.wb ? 1 : 0);
        k.avms || (k.avms = "geo");
        return k
    }
      , yj = function(a) {
        if (a.C)
            return 1;
        var b = y.screen.width * y.screen.height;
        return 0 >= b ? -1 : Math.min(a.B * a.h.g / b, 1)
    };
    var zj = function(a, b) {
        this.h = a || 0;
        this.g = b || ""
    }
      , Aj = function(a) {
        return !!a.h || !!a.g
    }
      , Bj = function(a, b) {
        a.h && (b[4] = a.h);
        a.g && (b[12] = a.g)
    };
    zj.prototype.match = function(a) {
        return Aj(this) && Aj(a) ? this.g || a.g ? this.g == a.g : this.h || a.h ? this.h == a.h : !1 : !1
    }
    ;
    zj.prototype.toString = function() {
        var a = "" + this.h;
        this.g && (a += "-" + this.g);
        return a
    }
    ;
    var Cj = function(a) {
        var b = [];
        jb(a, function(a, d) {
            d = encodeURIComponent(d);
            r(a) && (a = encodeURIComponent(a));
            b.push(d + "=" + a)
        });
        b.push("24=" + (new Date).getTime());
        return b.join("\n")
    }
      , Dj = 0
      , Ej = 0
      , Fj = function() {
        var a = 0
          , b = y;
        try {
            if (b && b.Goog_AdSense_getAdAdapterInstance)
                return b
        } catch (c) {}
        for (; b && 5 > a; ) {
            try {
                if (b.google_osd_static_frame)
                    return b
            } catch (c) {}
            try {
                if (b.aswift_0 && b.aswift_0.google_osd_static_frame)
                    return b.aswift_0
            } catch (c) {}
            a++;
            b = b != b.parent ? b.parent : null
        }
        return null
    }
      , Gj = function(a, b, c, d, e, f, g, k) {
        g = g || fa;
        if (10 < Ej)
            y.clearInterval(Dj),
            g();
        else if (++Ej,
        y.postMessage && Aj(b)) {
            if (g = Fj()) {
                var l = {};
                Bj(b, l);
                l[0] = "goog_request_monitoring";
                l[6] = a;
                c && (l[27] = c);
                l[16] = !!d;
                e && e.length && (l[17] = e.join(","));
                f && (l[19] = f);
                k && (l[28] = k);
                try {
                    var n = Cj(l);
                    g.postMessage(n, "*")
                } catch (u) {}
            }
        } else
            y.clearInterval(Dj),
            g()
    };
    var Hj = function(a) {
        var b = []
          , c = [];
        jb(a, function(a, e) {
            if (!(e in Object.prototype) && "undefined" != typeof a)
                switch (ia(a) && (a = a.join(",")),
                a = [e, "=", a].join(""),
                e) {
                case "r":
                case "tt":
                case "error":
                case "mtos":
                case "tos":
                case "p":
                case "bs":
                case "aio":
                case "nio":
                case "swf":
                case "iem":
                    b.unshift(a);
                    break;
                case "req":
                case "url":
                case "referrer":
                case "iframe_loc":
                    c.push(a);
                    break;
                default:
                    b.push(a)
                }
        });
        return b.concat(c)
    };
    var Ij = function(a, b, c) {
        Me.call(this);
        this.o = null != c ? w(a, c) : a;
        this.l = b;
        this.h = w(this.cg, this);
        this.g = []
    };
    x(Ij, Me);
    h = Ij.prototype;
    h.jb = !1;
    h.Ha = null;
    h.yc = function(a) {
        this.g = arguments;
        this.Ha ? this.jb = !0 : Jj(this)
    }
    ;
    h.N = function() {
        Ij.R.N.call(this);
        this.Ha && (m.clearTimeout(this.Ha),
        this.Ha = null,
        this.jb = !1,
        this.g = [])
    }
    ;
    h.cg = function() {
        this.Ha = null;
        this.jb && (this.jb = !1,
        Jj(this))
    }
    ;
    var Jj = function(a) {
        a.Ha = Lg(a.h, a.l);
        a.o.apply(null, a.g)
    };
    var Lj = function() {
        return !Kj() && (D("iPod") || D("iPhone") || D("Android") || D("IEMobile"))
    }
      , Kj = function() {
        return D("iPad") || D("Android") && !D("Mobile") || D("Silk")
    };
    var Mj = null
      , Nj = null
      , Oj = null
      , Pj = null
      , Qj = null
      , Rj = !1
      , Sj = function() {
        var a = R.getInstance().g;
        return "nio" == a || "aio" == a
    }
      , Xj = function() {
        if (!Rj) {
            Rj = !0;
            var a = m.requestAnimationFrame || m.webkitRequestAnimationFrame || m.mozRequestAnimationFrame || m.oRequestAnimationFrame || m.msRequestAnimationFrame;
            if (!Mj && !Sj()) {
                if (a) {
                    var b = me(136, Tj, void 0, void 0);
                    var c = function() {
                        a(function() {
                            y.setTimeout(b, 0)
                        })
                    }
                } else
                    c = Tj;
                Nj = new Ij(me(137, c, void 0, void 0),100);
                c = w(Nj.yc, Nj);
                Mj = Mi(y, "scroll", c, 138)
            }
            if (!Oj && !Sj()) {
                if (a) {
                    var d = me(139, Uj, void 0, void 0);
                    c = function() {
                        a(function() {
                            y.setTimeout(d, 0)
                        })
                    }
                } else
                    c = Uj;
                Pj = new Ij(me(140, c, void 0, void 0),100);
                c = w(Pj.yc, Pj);
                Oj = Mi(y, "resize", c, 141)
            }
            Vj();
            Wj()
        }
    }
      , Uj = function() {
        Yj(!1);
        Tj()
    }
      , Tj = function() {
        Zj(ak(), !1)
    }
      , ek = function() {
        var a = R.getInstance();
        bk && !a.o && (a.h = Fh(y, bk));
        var b = new ck;
        switch (a.g) {
        case "xde":
            var c = dk;
            Yj(!1);
            var d = R.getInstance()
              , e = d.B
              , a = e.height - c;
            0 >= a && (a = e.height,
            c = 0);
            d.h = new H(e.width,a);
            a = new ck;
            a.l = d.h;
            a.g = e;
            a.o = c;
            return a;
        case "geo":
            a: {
                a = a.h;
                b = new ck;
                b.l = a;
                if (null != a && -1 != a.width && -1 != a.height && -12245933 != a.width && -12245933 != a.height) {
                    var f = R.getInstance();
                    if (f.o)
                        c = f.C;
                    else
                        try {
                            var f = bk
                              , g = y || y
                              , g = g.top
                              , d = a || Fh(g, f)
                              , e = Vc(Rc(g.document).g)
                              , c = -1 == d.width || -12245933 == d.width ? new J(d.width,d.width,d.width,d.width) : new J(e.y,e.x + d.width,e.y + d.height,e.x)
                        } catch (k) {
                            c = b;
                            break a
                        }
                    b.h = c
                }
                c = b
            }
            return c;
        default:
            return b
        }
    }
      , fk = function(a) {
        for (a = a.length - 1; 0 <= a; a--)
            ;
    }
      , Zj = function(a, b, c) {
        if (!gk)
            if (window.clearTimeout(hk),
            hk = null,
            fk(a),
            0 == a.length)
                b || ik();
            else {
                var d = ek()
                  , e = R.getInstance();
                try {
                    var f = Ih();
                    if (null != Ni.getInstance().g)
                        for (var g = 0; g < a.length; g++)
                            $i(a[g], f, b);
                    else
                        switch (e.g) {
                        case "exc":
                            for (g = 0; g < a.length; g++)
                                Zi(a[g], f, b);
                            break;
                        case "nis":
                            for (g = 0; g < a.length; g++)
                                p(c) ? a[g].nb(c) : a[g].cc(f);
                            break;
                        case "gsv":
                            for (g = 0; g < a.length; g++)
                                p(c) ? a[g].Cc(c) : a[g].bc(f);
                            break;
                        case "aio":
                        case "nio":
                            for (g = 0; g < a.length; g++)
                                Zi(a[g], f, b);
                            break;
                        case "xde":
                            if (d.g)
                                for (g = 0; g < a.length; g++)
                                    Ti(a[g], f, d.g, d.o, b);
                            break;
                        case "iem":
                            for (g = 0; g < a.length; g++)
                                Wi(a[g], f, b);
                            break;
                        case "swf":
                            A(a, function(a) {
                                if (b) {
                                    if (a.o) {
                                        var c = a.o;
                                        3 <= c.o && (c.o = 3);
                                        a.h.g = 0
                                    }
                                } else if (a.o && "d" != a.o.h) {
                                    var c = pi(a.o)
                                      , d = [0, 0, 0, 0, 0, .01, .5, 1, .01, .3]
                                      , e = d[c.g + 1];
                                    a.h.g = d[c.l + 1];
                                    a.ua(a.position, e, a.X + c.h, !1, !0, !1);
                                    aj(a) && 1 != a.Aa() && !a.Tb && a.o && ji(a.o);
                                    (c = 2 == c.g || si(a.o)) || (c = a.o,
                                    c = "f" == c.h && 3E3 <= c.w);
                                    c && (a.kc(a),
                                    a.Tb = !1,
                                    a.o && ji(a.o))
                                }
                            });
                            break;
                        case "raf":
                            A(a, function(a) {
                                if (b)
                                    a.K && (a.K.o = 3,
                                    a.h.g = 0);
                                else if (a.K) {
                                    var c = Ji(a.K)
                                      , d = [0, 0, 0, 0, 0, .01, .5, 1, .01, .3]
                                      , e = d[c.g + 1];
                                    a.h.g = d[c.l + 1];
                                    a.ua(a.position, e, a.X + c.h, !1, !0, !1);
                                    aj(a) && 1 != a.Aa() && !a.Tb && a.K && Ii(a.K)
                                }
                            });
                            break;
                        case "geo":
                            if (d.h)
                                for (g = 0; g < a.length; g++)
                                    Yi(a[g], f, d.h, b, e.l)
                        }
                    ++jk
                } finally {
                    b ? A(a, function(a) {
                        a.h.g = 0
                    }) : ik()
                }
            }
    }
      , Vj = function() {
        var a = Wj, b;
        ua.mozVisibilityState ? b = "mozvisibilitychange" : ua.webkitVisibilityState ? b = "webkitvisibilitychange" : ua.visibilityState && (b = "visibilitychange");
        b && (Qj = Qj || Mi(ua, b, a, 142))
    }
      , Wj = function() {
        var a = xj()
          , b = Ih();
        a ? (Jh || (Kh = b,
        A(kk, function(a) {
            var c = a.ma();
            c.da = pj(c, b, !!a.H)
        })),
        Jh = !0,
        Yj(!0)) : (Jh = !1,
        Gh = b,
        A(kk, function(a) {
            a.J && (a.ma().C = b)
        }));
        Zj(ak(), !a)
    }
      , xj = function() {
        if (lk())
            return !0;
        var a = fh()
          , b = 1 === a
          , a = 0 === a;
        return R.getInstance(),
        b || a
    }
      , ik = function() {
        y && (hk = y.setTimeout(ve(143, function() {
            Zj(ak(), !1)
        }), Mh(R.getInstance().A)))
    }
      , mk = function(a) {
        return null != a && Ta(kk, function(b) {
            return b.element == a
        })
    }
      , nk = function(a) {
        return Wa(kk, function(b) {
            return b.w == a
        })
    }
      , kk = []
      , ok = []
      , ak = function() {
        return 0 == kk.length ? ok : 0 == ok.length ? kk : ab(ok, kk)
    }
      , gk = !1
      , hk = null
      , dk = 0
      , bk = Kj() || Lj()
      , jk = 0
      , Yj = function(a) {
        var b = R.getInstance();
        b.h = b.o ? (new H(b.C.Za(),b.C.Ya())).round() : Fh(y, bk);
        if (!a) {
            b.B = y && y.outerWidth ? new H(y.outerWidth,y.outerHeight) : new H(-12245933,-12245933);
            a = y;
            null !== a && a.top != a && (a = a.top);
            var c = 0
              , d = 0
              , e = R.getInstance().h;
            try {
                var f = a.document
                  , g = f.body
                  , k = f.documentElement;
                if ("CSS1Compat" == f.compatMode && k.scrollHeight)
                    c = k.scrollHeight != e.height ? k.scrollHeight : k.offsetHeight,
                    d = k.scrollWidth != e.width ? k.scrollWidth : k.offsetWidth;
                else {
                    var l = k.scrollHeight
                      , n = k.scrollWidth
                      , u = k.offsetHeight
                      , C = k.offsetWidth;
                    k.clientHeight != u && (l = g.scrollHeight,
                    n = g.scrollWidth,
                    u = g.offsetHeight,
                    C = g.offsetWidth);
                    l > e.height ? l > u ? (c = l,
                    d = n) : (c = u,
                    d = C) : l < u ? (c = l,
                    d = n) : (c = u,
                    d = C)
                }
                var T = new H(d,c)
            } catch (qa) {
                T = new H(-12245933,-12245933)
            }
            b.w = T
        }
    }
      , qk = function(a, b, c) {
        if (a = pk(a, "swf", b, c))
            R.getInstance().g = "swf",
            R.getInstance().g = "swf",
            A(b, function(a) {
                a.o || c(a)
            });
        return a
    }
      , rk = function() {
        var a = pk(y, "raf", ak());
        a && (R.getInstance().g = "raf");
        return a
    }
      , pk = function(a, b, c, d) {
        var e = !1;
        A(c, function(c) {
            hj(c, a, b, d) && (e = !0)
        });
        return e
    }
      , sk = function(a) {
        var b = [];
        A(a, function(a) {
            mk(a.element) || (kk.push(a),
            b.push(a))
        })
    }
      , tk = function(a) {
        var b = [];
        A(a, function(a) {
            null == Wa(kk, function(b) {
                return b.element == a.element && b.Ka == a.Ka
            }) && (kk.push(a),
            b.push(a))
        })
    }
      , lk = function() {
        return Ta(ak(), function(a) {
            return a.C
        })
    }
      , ck = function() {
        this.g = this.l = null;
        this.o = 0;
        this.h = null
    }
      , uk = function(a) {
        var b = [];
        jb(a, function(a, d) {
            d in Object.prototype || "undefined" == typeof a || (ia(a) && (a = a.join(",")),
            b.push([d, "=", a].join("")))
        });
        return b.join("&")
    };
    var vk = null
      , wk = ""
      , xk = !1
      , yk = function(a) {
        if (!a)
            return "";
        var b = a.document
          , c = [];
        c.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
        b && b.referrer && c.push("referrer=" + encodeURIComponent(b.referrer.substring(0, 512)));
        return c.join("&")
    };
    var zk = function(a) {
        return function(b) {
            return !p(b[a]) && p(0) ? 0 : b[a]
        }
    }
      , Bk = function() {
        var a = [0, 2, 4];
        return function(b) {
            b = b.tos;
            if (ia(b)) {
                for (var c = Array(b.length), d = 0; d < b.length; d++)
                    c[d] = 0 < d ? c[d - 1] + b[d] : b[d];
                return p(a) ? Ak(c, a) : c
            }
        }
    }
      , Ck = function(a, b) {
        return function(c) {
            c = c[a];
            if (ia(c))
                return Ak(c, b)
        }
    }
      , Ak = function(a, b) {
        return Ra(a, function(a, d) {
            return Xa(b, d)
        })
    };
    var Dk = {
        sv: "sv",
        cb: "cb",
        e: "e",
        nas: "nas",
        msg: "msg",
        "if": "if",
        sdk: "sdk",
        p: "p",
        tos: "tos",
        mtos: "mtos",
        ps: "ps",
        scs: "scs",
        bs: "bs",
        pt: "pt",
        vht: "vht",
        mut: "mut",
        a: "a",
        ft: "ft",
        dft: "dft",
        at: "at",
        dat: "dat",
        as: "as",
        vpt: "vpt",
        gmm: "gmm",
        std: "std",
        efpf: "efpf",
        swf: "swf",
        nio: "nio",
        px: "px",
        nnut: "nnut",
        vmer: "vmer",
        vmmk: "vmmk",
        vmiec: "vmiec",
        nmt: "nmt",
        tcm: "tcm",
        bt: "bt",
        pst: "pst",
        vpaid: "vpaid",
        dur: "dur",
        vmtime: "vmtime",
        dtos: "dtos",
        dtoss: "dtoss",
        dvs: "dvs",
        dfvs: "dfvs",
        dvpt: "dvpt",
        fmf: "fmf",
        vds: "vds",
        is: "is",
        i0: "i0",
        i1: "i1",
        i2: "i2",
        i3: "i3",
        ic: "ic",
        cs: "cs",
        c: "c",
        mc: "mc",
        nc: "nc",
        mv: "mv",
        nv: "nv",
        qmt: "qmtos",
        qnc: "qnc",
        qmv: "qmv",
        qnv: "qnv",
        raf: "raf",
        rafc: "rafc",
        lte: "lte",
        tth: "tth",
        femt: "femt",
        femvt: "femvt",
        emc: "emc",
        emuc: "emuc",
        emb: "emb",
        avms: "avms",
        nvat: "nvat",
        qi: "qi"
    }
      , Ek = {
        c: zk("c"),
        at: "at",
        atos: Ck("atos", [0, 2, 4]),
        ta: function(a, b) {
            return function(c) {
                if (!p(c[a]))
                    return b
            }
        }("tth", "1"),
        a: "a",
        dur: "dur",
        p: "p",
        tos: Bk(),
        j: "dom",
        mtos: Ck("mtos", [0, 2, 4]),
        gmm: "gmm",
        gdr: "gdr",
        ss: zk("ss"),
        vsv: kf("w2"),
        t: "t"
    }
      , Fk = {
        atos: "atos",
        avt: Ck("atos", [2]),
        davs: "davs",
        dafvs: "dafvs",
        dav: "dav",
        ss: zk("ss"),
        t: "t"
    }
      , Gk = {
        a: "a",
        tos: Bk(),
        at: "at",
        c: zk("c"),
        mtos: Ck("mtos", [0, 2, 4]),
        dur: "dur",
        fs: "fs",
        p: "p",
        vpt: "vpt",
        vsv: kf("ias_w2"),
        dom: "dom",
        gmm: "gmm",
        gdr: "gdr",
        t: "t"
    }
      , Hk = {
        tos: Bk(),
        at: "at",
        c: zk("c"),
        mtos: Ck("mtos", [0, 2, 4]),
        p: "p",
        vpt: "vpt",
        vsv: kf("dv_w4"),
        gmm: "gmm",
        gdr: "gdr",
        dom: "dom",
        t: "t",
        mv: "mv",
        qmpt: Ck("qmtos", [0, 2, 4]),
        qvs: function(a, b) {
            return function(c) {
                var d = c[a];
                if (t(d))
                    return Sa(b, function(a) {
                        return 0 < d && d >= a ? 1 : 0
                    })
            }
        }("qnc", [1, .5, 0]),
        qmv: "qmv",
        qa: "qas",
        a: "a"
    };
    var Ik = function() {
        this.w = this.D = !1;
        this.h = null;
        this.H = "";
        this.g = {};
        this.g.start = this.ge;
        this.g.firstquartile = this.Wd;
        this.g.midpoint = this.ae;
        this.g.thirdquartile = this.he;
        this.g.complete = this.Sd;
        this.g.pause = this.ce;
        this.g.resume = this.ee;
        this.g.skip = this.fe;
        this.g.viewable_impression = this.je;
        this.g.mute = this.be;
        this.g.unmute = this.ie;
        this.g.fullscreen = this.Xd;
        this.g.exitfullscreen = this.Vd;
        this.g.fully_viewable_audible_half_duration_impression = this.Yd;
        this.g.measurable_impression = this.$d;
        this.g.abandon = this.Rd;
        this.g.engagedview = this.Ud;
        this.g.impression = this.Zd;
        this.g.creativeview = this.Td;
        this.g.progress = this.de;
        this.l = {};
        this.l.overlay_resize = this.J;
        this.l.abandon = this.C;
        this.l.close = this.C;
        this.l.collapse = this.C;
        R.getInstance().F = 3;
        var a = nj.getInstance().g;
        Xa(a, 111541711) || a.push(111541711)
    };
    h = Ik.prototype;
    h.vb = function() {}
    ;
    h.Dc = fa;
    h.Xc = fa;
    h.vc = fa;
    h.sc = fa;
    var Jk = function(a, b, c) {
        c || (b = -1);
        return new qj(y,a,b,7)
    };
    Ik.prototype.F = function(a) {
        window.clearTimeout(hk);
        hk = null;
        wk = a;
        gk = !0
    }
    ;
    var Lk = function(a) {
        var b = R.getInstance()
          , c = nj.getInstance()
          , d = w(function() {
            b.o = !1;
            Kk(this)
        }, a);
        if (a.h && Aj(a.h)) {
            var e = y.document.domain;
            Mi(y, "message", w(a.I, a), 179);
            Dj = y.setInterval(me(197, sa(Gj, 4, a.h, e, !1, c.g, a.H, d, void 0), void 0, void 0), 500)
        } else
            d()
    };
    Ik.prototype.I = function(a) {
        if (a && a.data && r(a.data)) {
            var b = a.data;
            if (r(b)) {
                var c = {};
                for (var b = b.split("\n"), d = 0; d < b.length; d++) {
                    var e = b[d].indexOf("=");
                    if (!(0 >= e)) {
                        var f = Number(b[d].substr(0, e))
                          , e = b[d].substr(e + 1);
                        switch (f) {
                        case 5:
                        case 8:
                        case 11:
                        case 15:
                        case 16:
                        case 18:
                        case 26:
                            e = "true" == e;
                            break;
                        case 4:
                        case 7:
                        case 6:
                        case 14:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                            e = Number(e);
                            break;
                        case 3:
                        case 19:
                            if (v(decodeURIComponent))
                                try {
                                    e = decodeURIComponent(e)
                                } catch (k) {
                                    throw Error("Error: URI malformed: " + e);
                                }
                            break;
                        case 17:
                            e = Sa(decodeURIComponent(e).split(","), Number)
                        }
                        c[f] = e
                    }
                }
                c = c[0] ? c : null
            } else
                c = null;
            if (c && (b = new zj(c[4],c[12]),
            this.h && this.h.match(b)))
                if (b = c[0],
                "goog_acknowledge_monitoring" == b) {
                    a = c;
                    y.clearInterval(Dj);
                    var g = R.getInstance();
                    a[8] ? (g.o = !1,
                    Kk(this)) : (Oi(g, a[9]),
                    Xj())
                } else if ("goog_get_mode" == b) {
                    b = {};
                    this.h && Bj(this.h, b);
                    b[0] = "goog_provide_mode";
                    b[6] = 4;
                    b[19] = this.H;
                    b[16] = !1;
                    try {
                        g = Cj(b),
                        a.source.postMessage(g, a.origin)
                    } catch (k) {}
                    a = c[9];
                    Oi(R.getInstance(), a);
                    y.clearInterval(Dj)
                } else if ("goog_update_data" == b || "goog_image_request" == b)
                    a = c,
                    g = R.getInstance(),
                    b = c = 0,
                    isNaN(a[22]) || isNaN(a[23]) || (c = a[22],
                    b = a[23]),
                    g.h = (new H(Number(c),Number(b))).round(),
                    Oi(g, a[9])
        }
    }
    ;
    var Kk = function(a) {
        var b;
        if (b = null != y.IntersectionObserver)
            if (b = pk(y, "nio", ak()))
                R.getInstance().g = "nio";
        if (b)
            Xj();
        else if (sh() && rk())
            Xj();
        else {
            if (Nb && t(y.screenX) && t(y.mozInnerScreenX) && t(y.outerWidth)) {
                b = y.navigator.userAgent;
                var c = b.indexOf("Firefox/");
                if (0 <= c) {
                    var c = Math.floor(b.substr(c + 8)) || -1
                      , d = b.indexOf("Mac OS X 10.")
                      , e = -1;
                    0 <= d && (e = Number(b.substr(d + 12, 1)) || -1);
                    var f = 0 < e ? -1 : b.indexOf("Windows NT ")
                      , d = -1;
                    0 <= f && (d = {
                        "6.0": 0,
                        "6.1": 1,
                        "6.2": 2
                    }[b.substr(f + 11, 3)] || -1);
                    b = 148;
                    5 <= e ? b = 4 <= c ? 108 : 3 <= c ? 127 : 108 : 0 <= d && (16 == c || 17 == c || 18 == c) && (b = [[146, 146, 146], [148, 147, 148], [131, 130, 136]][d][c - 16])
                } else
                    b = null;
                null !== b && (dk = b,
                R.getInstance().g = "xde");
                b = !0
            } else
                b = !1;
            b ? Xj() : (E && F(8) && v(ih()) ? (R.getInstance().g = "iem",
            b = !0) : b = !1,
            b ? Xj() : rh() && qk(y, kk, w(a.L, a)) ? Xj() : a.F("i"))
        }
    };
    Ik.prototype.L = function(a) {
        a && (Mk(a, "fp"),
        a.ca = !0,
        this.B(a))
    }
    ;
    var Mk = function(a, b) {
        if (!a.lc) {
            var c = wj(a, "start")
              , c = Nk(c, Dk)
              , d = vk || y
              , e = [];
            e.push("v=576v");
            e.push("r=" + b);
            b = 0;
            "swf" == R.getInstance().g && (b = 1);
            e.push("efm=" + b);
            e.push(c);
            e.push(yk(d));
            Cd(y, ("//pagead2.googlesyndication.com/pagead/gen_204?id=lidarvf&" + e.join("&")).substring(0, 2E3), void 0);
            a.lc = !0
        }
    };
    h = Ik.prototype;
    h.ge = function(a) {
        uj(a, 0);
        return wj(a, "start")
    }
    ;
    h.de = function(a, b) {
        Zj([a], !xj(), b);
        return wj(a, "progress")
    }
    ;
    h.Wd = function(a, b) {
        return Ok(a, "firstquartile", 1, b)
    }
    ;
    h.ae = function(a, b) {
        a.Xb = !0;
        return Ok(a, "midpoint", 2, b)
    }
    ;
    h.he = function(a, b) {
        return Ok(a, "thirdquartile", 3, b)
    }
    ;
    h.Sd = function(a, b) {
        b = Ok(a, "complete", 4, b);
        a.C = !1;
        Pk(1, a.w);
        return b
    }
    ;
    var Ok = function(a, b, c, d) {
        Zj([a], !xj(), d);
        uj(a, c);
        b = wj(a, b);
        if (4 != c) {
            d = a.Z;
            a = a.Xa;
            for (var e = d.length; e < c + 1; )
                d.push(a()),
                e++
        }
        return b
    };
    h = Ik.prototype;
    h.ce = function(a, b) {
        return Qk(a, "pause", b)
    }
    ;
    h.Rd = function(a, b) {
        return Qk(a, "abandon", b)
    }
    ;
    h.ee = function(a, b) {
        var c = xj();
        a.H && !c && (a.ma().C = Ih());
        Zj([a], !c, b);
        a.H = !1;
        return wj(a, "resume")
    }
    ;
    h.je = function(a) {
        return wj(a, "viewable_impression")
    }
    ;
    h.fe = function(a, b) {
        var c = !xj();
        Zj([a], c, b);
        b = wj(a, "skip");
        a.C = !1;
        Pk(1, a.w);
        return b
    }
    ;
    h.be = function(a, b) {
        Zj([a], !xj(), b);
        return wj(a, "mute")
    }
    ;
    h.ie = function(a, b) {
        Zj([a], !xj(), b);
        return wj(a, "unmute")
    }
    ;
    h.Xd = function(a, b) {
        a.C = !0;
        Zj([a], !xj(), b);
        return wj(a, "fullscreen")
    }
    ;
    h.Vd = function(a, b) {
        a.C = !1;
        Zj([a], !xj(), b);
        return wj(a, "exitfullscreen")
    }
    ;
    h.Yd = function(a) {
        return wj(a, "fully_viewable_audible_half_duration_impression")
    }
    ;
    h.$d = function(a) {
        return wj(a, "measurable_impression")
    }
    ;
    h.Ud = function(a) {
        return wj(a, "engagedview")
    }
    ;
    h.Zd = function(a) {
        return wj(a, "impression")
    }
    ;
    h.Td = function(a) {
        return wj(a, "creativeview")
    }
    ;
    var Qk = function(a, b, c) {
        var d = a.ma();
        d.da = pj(d, Ih(), !!a.H);
        d = !xj();
        Zj([a], d, c);
        a.H = !0;
        return wj(a, b)
    };
    Ik.prototype.J = function(a, b) {
        Zj([a], !xj(), b);
        return a.g()
    }
    ;
    Ik.prototype.C = function(a, b) {
        Zj([a], !xj(), b);
        Pk(2, a.w);
        return a.g()
    }
    ;
    var Pk = function(a, b) {
        if (r(b)) {
            if (1 == a)
                var c = kk;
            else if (2 == a)
                c = ok;
            else
                return;
            var d = Va(c, function(c) {
                return c.Aa() != a ? !1 : c.w == b
            });
            0 <= d && (cj(c[d]),
            Array.prototype.splice.call(c, d, 1))
        }
    }
      , Sk = function(a, b, c) {
        var d = Wa(kk, function(a) {
            return a.element == c
        });
        null !== d && d.w != b && (Pk(1, d.w),
        d = null);
        d || (d = Rk(a, c),
        d.w = b,
        d.F = "h");
        return d
    }
      , Rk = function(a, b) {
        b = Jk(b, Ih(), !1);
        b.Ib = w(a.o, a);
        R.getInstance().A = 79463069;
        tk([b]);
        Xj();
        return b
    };
    Ik.prototype.o = function(a) {
        aj(a) && !a.qc && this.Xc(a);
        this.vc(a)
    }
    ;
    var Tk = function(a, b) {
        var c = vb(function(b) {
            return b == a
        })
          , c = {
            sv: "576",
            cb: "j",
            e: eh[c]
        }
          , d = wj(b, a);
        Ab(c, d);
        b.ad[a] = d;
        return 2 == b.Aa() ? Hj(c).join("&") : Nk(c, Dk)
    }
      , Nk = function(a, b, c, d, e) {
        var f = {};
        if (p(a))
            for (var g in b) {
                var k = b[g];
                g in Object.prototype || null != k && (v(k) ? f[g] = k(a) : f[g] = a[k])
            }
        p(c) && Ab(f, c);
        a = uk(f);
        0 != a.length && p(d) && p(e) && (e = e(a),
        a += "&" + d + "=" + e);
        return a
    }
      , Vk = function(a, b) {
        var c = {
            sv: "576",
            cb: "j"
        };
        c.nas = kk.length;
        c.msg = a;
        p(b) && (a = Uk(b)) && (c.e = eh[a]);
        return c
    }
      , Uk = function(a) {
        var b = a.toLowerCase();
        return vb(function(a) {
            return a == b
        })
    };
    Ik.prototype.B = fa;
    var Wk = function(a, b) {
        var c = a[b];
        p(c) && (a[b] = Math.floor(1E3 * c))
    };
    var Xk = (new Date).getTime()
      , Yk = !1
      , Zk = !1
      , $k = !1
      , S = function(a) {
        return !a || "function" !== typeof a || 0 > String(Function.prototype.toString).indexOf("[native code]") ? !1 : 0 <= String(a).indexOf("[native code]") && !0 || !1
    }
      , al = function(a) {
        return !!(1 << a & Xk)
    }
      , bl = [function(a) {
        return !(!a.chrome || !a.chrome.webstore)
    }
    , function(a) {
        return !!a.document.documentMode
    }
    , function(a) {
        return !!a.document.fonts.ready
    }
    , function() {
        return al(0)
    }
    , function(a) {
        return !!a.ActiveXObject
    }
    , function(a) {
        return !!a.chrome
    }
    , function(a) {
        return !!a.navigator.serviceWorker
    }
    , function(a) {
        return !!a.opera
    }
    , function(a) {
        return !!a.sidebar
    }
    , function() {
        return !+"\v1"
    }
    , function() {
        return al(1)
    }
    , function(a) {
        return !a.ActiveXObject
    }
    , function(a) {
        return "-ms-ime-align"in a.document.documentElement.style
    }
    , function(a) {
        return "-ms-scroll-limit"in a.document.documentElement.style
    }
    , function(a) {
        return "-webkit-font-feature-settings"in a.document.body.style
    }
    , function() {
        return al(2)
    }
    , function(a) {
        return "ActiveXObject"in a
    }
    , function(a) {
        return "MozAppearance"in a.document.documentElement.style
    }
    , function(a) {
        return "_phantom"in a
    }
    , function(a) {
        return "callPhantom"in a
    }
    , function(a) {
        return "content"in a.document.createElement("template")
    }
    , function(a) {
        return "getEntriesByType"in a.performance
    }
    , function() {
        return al(3)
    }
    , function(a) {
        return "image-rendering"in a.document.body.style
    }
    , function(a) {
        return "object-fit"in a.document.body.style
    }
    , function(a) {
        return "open"in a.document.createElement("details")
    }
    , function(a) {
        return "orientation"in a.screen
    }
    , function(a) {
        return "performance"in a
    }
    , function(a) {
        return "shape-image-threshold"in a.document.body.style
    }
    , function() {
        return al(4)
    }
    , function(a) {
        return "srcset"in a.document.createElement("img")
    }
    , function() {
        return Zk
    }
    , function() {
        return $k
    }
    , function() {
        return al(5)
    }
    , function(a) {
        a = a.document.createElement("div");
        a.style.width = "1px";
        a.style.width = "-webkit-min-content";
        a.style.width = "min-content";
        return "1px" != a.style.width
    }
    , function(a) {
        a = a.document.createElement("div");
        a.style.width = "1px";
        a.style.width = "calc(1px - 1px)";
        a.style.width = "-webkit-calc(1px - 1px)";
        return "1px" != a.style.width
    }
    , function() {
        var a = !1;
        eval('var DummyFunction1 = function(x){ "use strict"; var a = 12; b = a + x*35; }');
        try {
            DummyFunction1()
        } catch (b) {
            a = !0
        }
        return a
    }
    , function() {
        var a = !1;
        try {
            DummyFunction2()
        } catch (b) {
            a = !0
        }
        return a
    }
    , function() {
        return !1
    }
    , function() {
        return al(6)
    }
    , function(a) {
        var b = a.document.createElement("canvas");
        b.width = b.height = 1;
        b = b.getContext("2d");
        b.globalCompositeOperation = "multiply";
        b.fillStyle = "rgb(0,255,255)";
        b.fillRect(0, 0, 1, 1);
        b.fill();
        b.fillStyle = "rgb(255,255,0)";
        b.fillRect(0, 0, 1, 1);
        b.fill();
        b = b.getImageData(0, 0, 1, 1).data;
        return b[0] == b[2] && b[1] == b[3] || S(a.navigator.vibrate)
    }
    , function(a) {
        a = a.document.createElement("canvas");
        a.width = a.height = 1;
        a = a.getContext("2d");
        a.globalCompositeOperation = "multiply";
        a.fillStyle = "rgb(0,255,255)";
        a.fillRect(0, 0, 1, 1);
        a.fill();
        a.fillStyle = "rgb(255,255,0)";
        a.fillRect(0, 0, 1, 1);
        a.fill();
        a = a.getImageData(0, 0, 1, 1).data;
        return a[0] == a[2] && a[1] == a[3]
    }
    , function(a) {
        return S(a.document.createElement("div").matches)
    }
    , function(a) {
        a = a.document.createElement("input");
        a.setAttribute("type", "range");
        return "text" !== a.type
    }
    , function(a) {
        return a.CSS.supports("image-rendering", "pixelated")
    }
    , function(a) {
        return a.CSS.supports("object-fit", "contain")
    }
    , function() {
        return al(7)
    }
    , function(a) {
        return a.CSS.supports("object-fit", "inherit")
    }
    , function(a) {
        return a.CSS.supports("shape-image-threshold", "0.9")
    }
    , function(a) {
        return a.CSS.supports("word-break", "keep-all")
    }
    , function() {
        return eval("1 == [for (item of [1,2,3]) item][0]")
    }
    , function(a) {
        return S(a.CSS.supports)
    }
    , function() {
        return S(Intl.Collator)
    }
    , function(a) {
        return S(a.document.createElement("dialog").show)
    }
    , function() {
        return al(8)
    }
    , function(a) {
        return S(a.document.createElement("div").animate([{
            transform: "scale(1)",
            Fd: "ease-in"
        }, {
            transform: "scale(1.3)",
            Fd: "ease-in"
        }], {
            duration: 1300,
            al: 1
        }).reverse)
    }
    , function(a) {
        return S(a.document.createElement("div").animate)
    }
    , function(a) {
        return S(a.document.documentElement.webkitRequestFullScreen)
    }
    , function(a) {
        return S(a.navigator.getBattery)
    }
    , function(a) {
        return S(a.navigator.permissions.query)
    }
    , function() {
        return !1
    }
    , function() {
        return al(9)
    }
    , function() {
        return S(webkitRequestAnimationFrame)
    }
    , function(a) {
        return S(a.BroadcastChannel.call)
    }
    , function(a) {
        return S(a.FontFace)
    }
    , function(a) {
        return S(a.Gamepad)
    }
    , function() {
        return al(10)
    }
    , function(a) {
        return S(a.MutationEvent)
    }
    , function(a) {
        return S(a.MutationObserver)
    }
    , function(a) {
        return S(a.crypto.getRandomValues)
    }
    , function(a) {
        return S(a.document.body.createShadowRoot)
    }
    , function(a) {
        return S(a.document.body.webkitCreateShadowRoot)
    }
    , function(a) {
        return S(a.fetch)
    }
    , function() {
        return al(11)
    }
    , function(a) {
        return S(a.navigator.serviceWorker.register)
    }
    , function(a) {
        return S(a.navigator.webkitGetGamepads)
    }
    , function(a) {
        return S(a.speechSynthesis.speak)
    }
    , function(a) {
        return S(a.webkitRTCPeerConnection)
    }
    , function(a) {
        return a.CSS.supports("--fake-var", "0")
    }
    , function() {
        return al(12)
    }
    , function(a) {
        return a.CSS.supports("cursor", "grab")
    }
    , function(a) {
        return a.CSS.supports("cursor", "zoom-in")
    }
    , function(a) {
        return a.CSS.supports("image-orientation", "270deg")
    }
    , function() {
        return al(13)
    }
    , function(a) {
        return a.CSS.supports("position", "sticky")
    }
    , function(a) {
        return void 0 === a.document.createElement("style").scoped
    }
    , function(a) {
        return a.performance.getEntriesByType("resource")instanceof Array
    }
    , function() {
        return "undefined" == typeof InstallTrigger
    }
    , function() {
        return "object" == typeof (new Intl.Collator).resolvedOptions()
    }
    , function(a) {
        return "boolean" == typeof a.navigator.onLine
    }
    , function() {
        return al(14)
    }
    , function(a) {
        return "undefined" == typeof a.navigator.bl
    }
    , function(a) {
        return "number" == typeof a.performance.now()
    }
    , function() {
        return 0 == (new Uint16Array(1))[0]
    }
    , function(a) {
        return -1 == a.ActiveXObject.toString().indexOf("native")
    }
    , function(a) {
        return -1 == Object.prototype.toString.call(a.HTMLElement).indexOf("Constructor")
    }
    ]
      , cl = [function(a) {
        a = a.document.createElement("div");
        var b = null
          , c = ["{45EA75A0-A269-11D1-B5BF-0000F8051515}", "{3AF36230-A269-11D1-B5BF-0000F8051515}", "{89820200-ECBD-11CF-8B85-00AA005B4383}"];
        try {
            a.style.behavior = "url(#default#clientcaps)"
        } catch (e) {}
        for (var d = 0; d < c.length; d++) {
            try {
                b = a.getComponentVersion(c[d], "componentid").replace(/,/g, ".")
            } catch (e) {}
            if (b)
                return b.split(".")[0]
        }
        return !1
    }
    , function() {
        return (new Date).getTimezoneOffset()
    }
    , function(a) {
        return (a.innerWidth || a.document.documentElement.clientWidth || a.document.body.clientWidth) / (a.innerHeight || a.document.documentElement.clientHeight || a.document.body.clientHeight)
    }
    , function(a) {
        return (a.outerWidth || a.document && a.document.body && a.document.body.offsetWidth) / (a.outerHeight || a.document && a.document.body && a.document.body.offsetHeight)
    }
    , function(a) {
        return a.screen.availWidth / a.screen.availHeight
    }
    , function(a) {
        return a.screen.width / a.screen.height
    }
    ]
      , dl = [function(a) {
        return a.navigator.userAgent
    }
    , function(a) {
        return a.navigator.platform
    }
    , function(a) {
        return a.navigator.vendor
    }
    ]
      , fl = function() {
        try {
            el()
        } catch (d) {}
        var a = "a=1&b=" + Xk + "&"
          , b = []
          , c = 99;
        A(bl, function(a, c) {
            var d = !1;
            try {
                d = a(y)
            } catch (g) {}
            b[c / 32 >>> 0] |= d << c % 32
        });
        A(b, function(b, e) {
            a += String.fromCharCode(c + e) + "=" + (b >>> 0).toString(16) + "&"
        });
        c = 105;
        A(cl, function(b) {
            var d = "false";
            try {
                d = b(y)
            } catch (f) {}
            a += String.fromCharCode(c++) + "=" + d + "&"
        });
        A(dl, function(b) {
            var d = "";
            try {
                var f = b(y);
                b = [];
                for (var g = 0, k = 0; k < f.length; k++) {
                    for (var l = f.charCodeAt(k); 255 < l; )
                        b[g++] = l & 255,
                        l >>= 8;
                    b[g++] = l
                }
                if (!Tg)
                    for (Tg = {},
                    Ug = {},
                    f = 0; 65 > f; f++)
                        Tg[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f),
                        Ug[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(f);
                f = Ug;
                l = [];
                for (g = 0; g < b.length; g += 3) {
                    var n = b[g]
                      , u = g + 1 < b.length
                      , C = u ? b[g + 1] : 0
                      , T = g + 2 < b.length
                      , qa = T ? b[g + 2] : 0
                      , k = n >> 2
                      , Z = (n & 3) << 4 | C >> 4
                      , da = (C & 15) << 2 | qa >> 6
                      , Yb = qa & 63;
                    T || (Yb = 64,
                    u || (da = 64));
                    l.push(f[k], f[Z], f[da], f[Yb])
                }
                d = l.join("")
            } catch (zc) {}
            a += String.fromCharCode(c++) + "=" + d + "&"
        });
        return a.slice(0, -1)
    }
      , el = function() {
        if (!Yk) {
            var a = function() {
                Zk = !0;
                y.document.removeEventListener("webdriver-evaluate", a, !0)
            };
            y.document.addEventListener("webdriver-evaluate", a, !0);
            var b = function() {
                $k = !0;
                y.document.removeEventListener("webdriver-evaluate-response", b, !0)
            };
            y.document.addEventListener("webdriver-evaluate-response", b, !0);
            Yk = !0
        }
    };
    var gl = function() {
        this.h = 64;
        this.g = Array(4);
        this.w = Array(this.h);
        this.o = this.l = 0;
        this.reset()
    };
    x(gl, Vg);
    gl.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.o = this.l = 0
    }
    ;
    var hl = function(a, b, c) {
        c || (c = 0);
        var d = Array(16);
        if (r(b))
            for (var e = 0; 16 > e; ++e)
                d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
        else
            for (e = 0; 16 > e; ++e)
                d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
        b = a.g[0];
        c = a.g[1];
        var e = a.g[2]
          , f = a.g[3];
        var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
        a.g[0] = a.g[0] + b & 4294967295;
        a.g[1] = a.g[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
        a.g[2] = a.g[2] + e & 4294967295;
        a.g[3] = a.g[3] + f & 4294967295
    }
      , il = function(a, b) {
        if (!p(c))
            var c = b.length;
        for (var d = c - a.h, e = a.w, f = a.l, g = 0; g < c; ) {
            if (0 == f)
                for (; g <= d; )
                    hl(a, b, g),
                    g += a.h;
            if (r(b))
                for (; g < c; ) {
                    if (e[f++] = b.charCodeAt(g++),
                    f == a.h) {
                        hl(a, e);
                        f = 0;
                        break
                    }
                }
            else
                for (; g < c; )
                    if (e[f++] = b[g++],
                    f == a.h) {
                        hl(a, e);
                        f = 0;
                        break
                    }
        }
        a.l = f;
        a.o += c
    };
    var jl = function() {
        Ik.call(this);
        this.G = void 0;
        this.A = null
    };
    x(jl, Ik);
    ga(jl);
    jl.prototype.vb = function(a, b) {
        switch (R.getInstance().g) {
        case "nis":
            var c = nk(a);
            c || (c = kl(this, a, "n", b.opt_nativeTime || -1),
            c.Yb = R.getInstance().L);
            b = c;
            break;
        case "gsv":
            (c = nk(a)) || (c = kl(this, a, "m", b.opt_nativeTime || -1));
            b = c;
            break;
        case "exc":
            (b = nk(a)) || (b = kl(this, a, "h", -1));
            break;
        default:
            b.opt_adElement ? b = Sk(this, a, b.opt_adElement) : (b = ll(this, a, b.opt_sdkID || "")) || (b = nk(a) || void 0)
        }
        b && b.za == fa && (b.za = w(this.sc, this));
        return b
    }
    ;
    jl.prototype.sc = function(a) {
        var b = R.getInstance();
        a.g = 0;
        a.ka = 0;
        if ("as" == a.F)
            if (b = "getVideoMetadata" + a.Ka,
            v(a.element[b]))
                try {
                    var c = a.element[b]()
                } catch (e) {
                    a.g |= 4
                }
            else
                a.g |= 2;
        else if ("h" == a.F)
            if (b = ea("exc" == b.g ? "ima.bridge.getVideoMetadata" : "ima.common.getVideoMetadata"),
            v(b))
                try {
                    c = b(a.w)
                } catch (e) {
                    a.g |= 4
                }
            else
                a.g |= 2;
        else
            a.g |= 1;
        a.g || (p(c) ? null === c ? a.g |= 16 : wb(c) ? a.g |= 32 : null != c.errorCode && (a.ka = c.errorCode,
        a.g |= 64) : a.g |= 8);
        null != c || (c = {});
        b = c;
        a.aa = 0;
        for (var d in bh)
            null == b[d] && (a.aa |= bh[d]);
        Wk(b, "currentTime");
        Wk(b, "duration");
        Uh(c.volume) && Uh(this.G) && (c.volume *= this.G);
        return c
    }
    ;
    var kl = function(a, b, c, d) {
        d = Jk(null, d, !0);
        d.F = c;
        d.Ib = w(a.o, a);
        sk([d]);
        d.w = b;
        return d
    }
      , ll = function(a, b, c) {
        var d = Wa(kk, w(function(a) {
            return a.element ? ml(a.element, c) == b && a.Ka == c : !1
        }, a));
        null !== d && d.w != b && (Pk(1, d.w),
        d = void 0);
        if (d)
            return d;
        d = nl(c);
        if (d = Wa(d, w(function(a) {
            return ml(a, c) == b
        }, a)))
            return d = Rk(a, d),
            d.F = "as",
            d.w = b,
            d.Ka = c,
            d
    }
      , nl = function(a) {
        var b = y.document
          , c = eb(Sa(["embed", "object"], function(a) {
            return bb(b.getElementsByTagName(a))
        }))
          , d = "metricID" + a;
        return c = Ra(c, function(a) {
            if (!a || !ma(a) || 1 != a.nodeType || !v(a.getBoundingClientRect))
                return !1;
            var b = a.getBoundingClientRect();
            return 0 != b.width && 0 != b.height && a[d] && v(a[d]) ? !0 : !1
        })
    }
      , ml = function(a, b) {
        b = "metricID" + b;
        if (!a || !a[b] || !v(a[b]))
            return null;
        try {
            var c = a[b]()
        } catch (d) {
            return null
        }
        return c.queryID
    }
      , ol = function(a, b) {
        var c = R.getInstance();
        switch (a.F) {
        case "h":
            var d = ea("exc" == c.g ? "ima.bridge.triggerExternalActivityEvent" : "ima.common.triggerExternalActivityEvent");
            break;
        case "m":
            d = ea("ima.common.triggerExternalActivityEvent");
            break;
        case "n":
            d = ea("ima.bridge.triggerExternalActivityEvent");
            break;
        case "as":
            var e = "triggerExternalActivityEvent" + a.Ka;
            a.element && v(a.element[e]) && (d = function(b, c, d) {
                a.element[e](d)
            }
            );
            break;
        default:
            return a.I |= 4,
            !1
        }
        if (v(d)) {
            c = Tk(b, a);
            try {
                return d(a.w, c, b),
                !0
            } catch (f) {
                a.I |= 2
            }
        } else
            a.I |= 1;
        return !1
    };
    jl.prototype.Xc = function(a) {
        ol(a, "viewable_impression") && (a.qc = !0)
    }
    ;
    jl.prototype.vc = function(a) {
        sj(a, a.ma().O[0]) && !a.cd && ol(a, "fully_viewable_audible_half_duration_impression") && (a.cd = !0)
    }
    ;
    jl.prototype.Dc = function(a) {
        a.pc || a.ca || this.w || !ol(a, "measurable_impression") || (a.pc = !0)
    }
    ;
    var pl = function(a) {
        return kb(yb(a || {}), function(a, c) {
            return "qmtos" == c || "qnc" == c || "qmv" == c || "qnv" == c ? !1 : !0
        })
    }
      , rl = function(a, b, c) {
        var d = {};
        d.viewability = c ? Nk(b, Dk) : Nk(pl(b), Dk);
        c = Xk = (new Date).getTime();
        var e = al(5);
        c = (Zk ? !e : e) ? c | 2 : c & -3;
        e = al(2);
        c = ($k ? !e : e) ? c | 8 : c & -9;
        c = {
            s1: (c >>> 0).toString(16)
        };
        a.A || (a.A = fl());
        d.moatInit = a.A;
        d.moatViewability = Nk(b, Ek, c, "h", ql("kArwaWEsTs"));
        d.integralAdsViewability = Nk(b, Gk, {}, "h", ql("b96YPMzfnx"));
        d.doubleVerifyViewability = Nk(b, Hk, {}, "h", ql("yb8Wev6QDg"));
        d.googleViewability = Nk(b, Fk);
        return d
    }
      , ql = function(a) {
        return function(b) {
            var c = new gl;
            il(c, b + a);
            var d = Array((56 > c.l ? c.h : 2 * c.h) - c.l);
            d[0] = 128;
            for (b = 1; b < d.length - 8; ++b)
                d[b] = 0;
            var e = 8 * c.o;
            for (b = d.length - 8; b < d.length; ++b)
                d[b] = e & 255,
                e /= 256;
            il(c, d);
            d = Array(16);
            for (b = e = 0; 4 > b; ++b)
                for (var f = 0; 32 > f; f += 8)
                    d[e++] = c.g[b] >>> f & 255;
            return Mg(d).slice(-8)
        }
    }
      , sl = function(a, b, c) {
        var d = jl.getInstance()
          , e = {};
        Ab(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c || {});
        if (e.opt_bounds)
            a = rl(d, Vk("ol", a), !1);
        else {
            b: {
                if (Uk(a)) {
                    if (xk) {
                        e = Vk("ue", a);
                        break b
                    }
                    b = d.vb(b, e);
                    if (!b) {
                        e = Vk("nf", a);
                        break b
                    }
                    if (!d.D) {
                        d.D = !0;
                        try {
                            var f = Ih()
                              , g = R.getInstance();
                            Hh = f;
                            vk = xe(y).Vb;
                            Yj(!1);
                            var k = R.getInstance();
                            y.screen && (k.G = new H(y.screen.width,y.screen.height));
                            if ("nis" != g.g && "gsv" != g.g) {
                                var l = y.document;
                                l.body && l.body.getBoundingClientRect ? (w(d.F, d),
                                Ni.getInstance(),
                                !g.l && sh() && rk() ? Xj() : g.l && "exc" != g.g ? g.o ? Lk(d) : Kk(d) : Xj()) : xk = !0
                            }
                        } catch (u) {
                            throw kk = [],
                            ok = [],
                            u;
                        }
                    }
                    "i" == wk && (b.ca = !0,
                    d.B(b));
                    f = e.opt_fullscreen;
                    p(f) && (b.C = !!f);
                    f = nj.getInstance();
                    if (f = Xa(f.g, 111541711))
                        f = R.getInstance().g,
                        f = y && y.A || "nis" === f || "gsv" === f ? !1 : 0 === fh();
                    (g = f) && Mk(b, "pvu");
                    f = a.toLowerCase();
                    !g && Xa(ch, f) && (b.oc || ("i" != wk && (gk = !1),
                    g = Ni.getInstance(),
                    null != g.g && (g = null != g.g ? new g.g.constructor : null,
                    b.O = g),
                    hj(b, y, R.getInstance().g, w(d.L, d)),
                    g = p(e) ? e.opt_nativeTime : void 0,
                    Lh = g = t(g) ? g : Ih(),
                    b.J = !0,
                    k = xj(),
                    b.oc = !0,
                    b.G = {},
                    b.G.firstquartile = !1,
                    b.G.midpoint = !1,
                    b.G.thirdquartile = !1,
                    b.G.complete = !1,
                    b.G.pause = !1,
                    b.G.skip = !1,
                    b.G.viewable_impression = !1,
                    b.Da = 0,
                    k || (b.ma().C = g),
                    Zj([b], !k, e)),
                    d.Dc(b));
                    (g = b.M[f]) && jj(b.l, g);
                    var n;
                    1 == b.Aa() ? n = d.g[f] : 2 == b.Aa() && (n = d.l[f]);
                    if (n && (e = n.call(d, b, e),
                    p(e))) {
                        n = Vk(void 0, f);
                        Ab(n, e);
                        e = n;
                        break b
                    }
                }
                e = void 0
            }
            a = rl(d, e, "firstquartile" == a || "midpoint" == a || "thirdquartile" == a || "complete" == a || "skip" == a || "abandon" == a ? !0 : !1)
        }
        return a
    };
    jl.prototype.o = function(a) {
        this.w ? tl(this, a) : jl.R.o.call(this, a)
    }
    ;
    jl.prototype.B = function(a) {
        this.w && 1 == a.Aa() && tl(this, a)
    }
    ;
    var tl = function(a, b) {
        var c = ea("ima.common.triggerViewabilityMeasurementUpdate");
        if (v(c)) {
            var d = {};
            d.insideIframe = R.getInstance().l;
            d.unmeasurable = b.ca;
            d.position = b.position;
            d.coverage = b.h.g;
            d.nativeVolume = a.G;
            c(b.w, d)
        }
    }
      , ul = function(a) {
        jl.getInstance();
        var b = nj.getInstance().g;
        Xa(b, a) || b.push(a)
    };
    q("Goog_AdSense_Lidar_sendVastEvent", ve(193, sl, void 0, function() {
        return {
            v: "576",
            "if": R.getInstance().l ? "1" : "0",
            nas: String(kk.length)
        }
    }), void 0);
    q("Goog_AdSense_Lidar_getViewability", ve(194, function(a, b) {
        var c = jl.getInstance();
        var d = {};
        Ab(d, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, b || {});
        d.opt_bounds ? c = rl(c, Vk("ol"), !1) : (xk ? a = Vk("ue") : (a = c.vb(a, d)) ? (b = Vk(),
        Ab(b, vj(a, !0, !1)),
        a = b) : a = Vk("nf"),
        c = rl(c, a, !0));
        return c
    }), void 0);
    q("Goog_AdSense_Lidar_getUrlSignalsArray", ve(195, function() {
        return Nf()
    }), void 0);
    q("Goog_AdSense_Lidar_getUrlSignalsList", ve(196, function() {
        return ff(Nf())
    }), void 0);
    q("Goog_AdSense_Lidar_addExperimentId", me(249, ul, void 0, void 0), void 0);
    var vl = {
        ah: "application/dash+xml",
        Gi: "video/mp4",
        Ii: "video/mpeg",
        si: "application/x-mpegURL",
        cj: "video/ogg",
        tk: "video/3gpp",
        Wk: "video/webm",
        Fi: "audio/mpeg",
        Hi: "audio/mp4"
    };
    var wl = function() {};
    wl.prototype.allowCustom = !0;
    var xl = {
        Xh: "Image",
        Gh: "Flash",
        ed: "All"
    }
      , bm = {
        Rh: "Html",
        Vh: "IFrame",
        lk: "Static",
        ed: "All"
    }
      , cm = {
        Wh: "IgnoreSize",
        $j: "SelectExactMatch",
        ak: "SelectNearMatch"
    }
      , dm = {
        jh: "DisallowResize",
        Qj: "ResizeSmaller"
    };
    var em = "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/sul www.google.com/pagead/xsul www.youtube.com/pagead/sul www.youtube.com/pagead/psul www.youtube.com/pagead/slav".split(" ")
      , fm = /\bocr\b/
      , gm = 0
      , hm = {}
      , im = function(a) {
        return wa(Ja(a)) ? !1 : 0 <= a.indexOf("://pagead2.googlesyndication.com/pagead/gen_204?id=yt3p&sr=1&") || (new tf(a)).w.match(fm) ? !0 : null != Wa(em, function(b) {
            return null != a.match(b)
        })
    }
      , mm = function(a, b) {
        if (a && (a = jm(a),
        !wa(a))) {
            var c = 'javascript:"<body><img src=\\""+' + a + '+"\\"></body>"';
            b ? km(function(b) {
                lm(b ? c : 'javascript:"<body><object data=\\""+' + a + '+"\\" width=1 height=1 style=\\"visibility:hidden;\\"></body>"')
            }) : lm(c)
        }
    }
      , lm = function(a) {
        var b = Xc("IFRAME", {
            src: a,
            style: "display:none"
        });
        a = Qc(b).body;
        var c = Lg(function() {
            Eg(d);
            $c(b)
        }, 15E3);
        var d = Cg(b, ["load", "error"], function() {
            Lg(function() {
                m.clearTimeout(c);
                $c(b)
            }, 5E3)
        });
        a.appendChild(b)
    }
      , km = function(a) {
        var b = hm.imageLoadingEnabled;
        if (null != b)
            a(b);
        else {
            var c = !1;
            nm(function(b, e) {
                delete hm[e];
                c || (c = !0,
                null != hm.imageLoadingEnabled || (hm.imageLoadingEnabled = b),
                a(b))
            })
        }
    }
      , nm = function(a) {
        var b = new Image
          , c = "" + gm++;
        hm[c] = b;
        b.onload = function() {
            clearTimeout(d);
            a(!0, c)
        }
        ;
        var d = setTimeout(function() {
            a(!1, c)
        }, 300);
        b.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    }
      , om = function(a) {
        if (a) {
            var b = document.createElement("OBJECT");
            b.data = a;
            b.width = "1";
            b.height = "1";
            b.style.visibility = "hidden";
            var c = "" + gm++;
            hm[c] = b;
            b.onload = b.onerror = function() {
                delete hm[c]
            }
            ;
            document.body.appendChild(b)
        }
    }
      , pm = function(a) {
        if (a) {
            var b = new Image
              , c = "" + gm++;
            hm[c] = b;
            b.onload = b.onerror = function() {
                delete hm[c]
            }
            ;
            b.src = a
        }
    }
      , qm = function(a, b, c) {
        if (a) {
            if (c)
                try {
                    if (m.navigator && m.navigator.sendBeacon && m.navigator.sendBeacon(a, ""))
                        return
                } catch (d) {}
            b ? km(function(b) {
                b ? pm(a) : om(a)
            }) : pm(a)
        }
    }
      , jm = function(a) {
        a = wc(Ac(a));
        if ("about:invalid#zClosurez" === a)
            return "";
        a = Dc(Fc(a));
        return encodeURIComponent(String(ff(a)))
    };
    var rm = /(?:\[|%5B)([a-zA-Z0-9_]+)(?:\]|%5D)/g
      , sm = function(a, b) {
        return a.replace(rm, function(a, d) {
            try {
                var c = xb(b, d);
                if (null == c)
                    return a;
                c = c.toString();
                if ("" == c || !wa(Ja(c)))
                    return encodeURIComponent(c).replace(/%2C/g, ",")
            } catch (f) {}
            return a
        })
    };
    var tm = function(a, b, c, d) {
        this.l = a;
        this.g = Math.min(Math.max(c || 0, 0), 1);
        this.h = null != d ? d : !0
    };
    tm.prototype.getId = function() {
        return this.l
    }
    ;
    var um = function(a) {
        this.l = a;
        this.h = new pf;
        this.g = null
    };
    um.prototype.getId = function() {
        return this.l
    }
    ;
    var vm = function(a) {
        var b = Math.random()
          , c = 0
          , d = a.h.ba();
        A(d, function(a) {
            c += a.g
        }, a);
        var e = 1 < c ? c : 1;
        a.g = null;
        for (var f = 0, g = 0; g < d.length; ++g)
            if (f += d[g].g,
            f / e >= b) {
                a.g = d[g];
                break
            }
    };
    var ym = function() {
        this.h = null != m.G_testRunner;
        this.g = new pf;
        if (!N.ga()) {
            U(this, "GvnExternalLayer", 31061774, .01);
            U(this, "GvnExternalLayer", 31061775, .01);
            U(this, "GvnExternalLayer", 41351088, .01);
            U(this, "GvnExternalLayer", 41351089, .01);
            U(this, "GvnExternalLayer", 420706008, .05);
            U(this, "GvnExternalLayer", 420706009, .05);
            U(this, "GvnExternalLayer", 420706024, .01);
            U(this, "GvnExternalLayer", 420706025, .01);
            U(this, "GvnExternalLayer", 420706029, .01);
            U(this, "GvnExternalLayer", 41351073, .01);
            U(this, "GvnExternalLayer", 41351074, .01);
            U(this, "GvnExternalLayer", 41351075, .01);
            U(this, "GvnExternalLayer", 634360101, 0);
            U(this, "GvnExternalLayer", 634360102, 0);
            U(this, "GvnExternalLayer", 21592080, .1);
            U(this, "GvnExternalLayer", 21592081, .1);
            U(this, "GvnExternalLayer", 21592082, .01);
            U(this, "GvnExternalLayer", 413051059, .05);
            U(this, "GvnExternalLayer", 413051060, .05);
            U(this, "GvnExternalLayer", 324123E3, .05);
            U(this, "GvnExternalLayer", 324123001, .05);
            U(this, "GvnExternalLayer", 420706068, .01);
            U(this, "GvnExternalLayer", 420706069, .01);
            U(this, "ActiveViewExternalLayer", 111541710, .1);
            U(this, "ActiveViewExternalLayer", 111541711, .1);
            U(this, "GvnExternalLayer", 324123020, .01);
            U(this, "GvnExternalLayer", 324123021, .01);
            U(this, "GvnExternalLayer", 420706081, .01);
            U(this, "GvnExternalLayer", 420706082, .01);
            var a = N.ha();
            sh(a) && (qd(y.top) ? (U(this, "ActiveViewExternalLayer", 509445010, .01),
            U(this, "ActiveViewExternalLayer", 509445011, .01)) : (U(this, "ActiveViewExternalLayer", 509445012, .01),
            U(this, "ActiveViewExternalLayer", 509445013, .01)))
        }
        wm(this);
        a = Re(N);
        a = Ue(a);
        null != a && (this.h = !1,
        xm(this, a.map(String)))
    }
      , zm = ["ActiveViewExternalLayer"]
      , Am = null
      , Bm = function() {
        Am || (Am = new ym);
        return Am
    }
      , U = function(a, b, c, d) {
        wa(Ja(b)) || isNaN(c) || 0 >= c || (c = new tm(c,0,d),
        Cm(a, b).h.set(c.getId(), c))
    }
      , wm = function(a) {
        Te() || N.Cb() || A(a.g.ba(), function(a) {
            vm(a)
        }, a)
    }
      , xm = function(a, b) {
        A(b, function(a) {
            var b = Number(a);
            a = "FORCED_PUB_EXP_LAYER_" + a;
            isNaN(b) || 0 >= b || wa(Ja(a)) || (Cm(this, a).g = new tm(b,0,0,!0))
        }, a)
    }
      , Dm = function() {
        var a = Bm()
          , b = {};
        A(a.g.ba(), function(a) {
            var c = a.g;
            if (c) {
                var e = {};
                e.experimentId = c.getId();
                e.shouldReport = c.h;
                b[a.getId()] = e
            } else
                b[a.getId()] = {}
        });
        return b
    }
      , Em = function(a, b) {
        return a.h ? !1 : Ta(a.g.ba(), function(a) {
            return !!a.g && a.g.getId() == b
        })
    }
      , Fm = function() {
        var a = Bm();
        if (a.h)
            return "";
        var b = [];
        A(a.g.ba(), function(a) {
            (a = a.g) && a.h && b.push(a.getId())
        });
        return b.sort().join(",")
    }
      , Cm = function(a, b) {
        var c = a.g.get(b);
        null == c && (c = new um(b),
        a.g.set(b, c));
        return c
    }
      , Gm = function() {
        var a = []
          , b = Bm();
        A(zm, function(c) {
            (c = (c = Cm(b, c)) ? c.g : null) && a.push(c.getId())
        });
        return a
    };
    var Hm = ["*.googlesyndication.com", "gcdn.2mdn.net"]
      , Im = ["*.youtu.be", "*.youtube.com"]
      , Jm = "ad.doubleclick.net bid.g.doubleclick.net corp.google.com ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" ")
      , Km = ["c.googlesyndication.com"]
      , Mm = function(a, b) {
        try {
            var c = (new tf(b)).g
              , c = c.replace(/^www./i, "");
            return Ta(a, function(a) {
                return Lm(a, c)
            })
        } catch (d) {
            return !1
        }
    }
      , Lm = function(a, b) {
        if (wa(Ja(b)))
            return !1;
        a = a.toLowerCase();
        b = b.toLowerCase();
        return "*." == a.substr(0, 2) ? (a = a.substr(2),
        a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
    }
      , Nm = function(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)","i")).test(a)
    };
    var Om = function(a) {
        try {
            a: {
                var b = a
                  , c = void 0
                  , d = b.length - 11 - 2;
                if (!(-1 == b.indexOf("URL_SIGNALS") || 2048 <= d || !c && !window.Goog_AdSense_Lidar_getUrlSignalsArray))
                    for (var c = c || window.Goog_AdSense_Lidar_getUrlSignalsArray(), d = {}, e = 0; e < c.length; ++e) {
                        d.URL_SIGNALS = c[e];
                        var f = sm(b, d);
                        if (2048 > f.length) {
                            a = f;
                            break a
                        }
                    }
                a = b
            }
        } catch (n) {}
        try {
            f = a;
            b = !1;
            Nm(f, Km) ? b = !1 : null != f && Mm(Im, f) ? b = !0 : "https:" == window.location.protocol && (Nm(f, Jm) || N.ga()) && (b = !0);
            if (b) {
                var g = new tf(f);
                "https" == g.l ? a = f : (uf(g, "https"),
                a = g.toString())
            } else
                a = f;
            var k = Bm()
              , l = !N.ha() && (!N.ga() || Em(k, 41351089))
              , g = !1;
            N.ha() || N.ga() || !Em(Bm(), 634360102) || (g = !0);
            (k = a) && (im(k) ? mm(k, l) : qm(k, l, g))
        } catch (n) {}
    };
    var Pm = function(a, b) {
        this.message = a;
        this.g = b
    }
      , Qm = new Pm("Invalid usage of the API. Cause: {0}",900)
      , Rm = new Pm("Failed to initialize ad playback element before starting ad playback.",400)
      , Sm = new Pm("The provided {0} information: {1} is invalid.",1101)
      , Tm = function(a, b, c) {
        var d = b || null;
        if (!(d instanceof Le)) {
            var e = a.g
              , f = a.message
              , g = cb(arguments, 2);
            if (0 < g.length)
                for (var k = 0; k < g.length; k++)
                    f = f.replace(new RegExp("\\{" + k + "\\}","ig"), g[k]);
            e = new Le("adPlayError",f,e);
            e.g = d;
            d = e
        }
        return d
    };
    var Vm = function(a, b) {
        if (null == a || 0 >= a.width || 0 >= a.height)
            throw Tm(Sm, null, "ad slot size", a.toString());
        this.h = a;
        this.g = null != b ? b : new wl;
        this.w = Um(bm, this.g.resourceType) ? this.g.resourceType : "All";
        this.o = Um(xl, this.g.creativeType) ? this.g.creativeType : "All";
        this.A = Um(cm, this.g.sizeCriteria) ? this.g.sizeCriteria : "SelectExactMatch";
        this.G = Um(dm, this.g.g) ? this.g.g : "DisallowResize";
        this.l = null != this.g.adSlotIds ? this.g.adSlotIds : [];
        this.C = t(this.g.nearMatchPercent) && 0 < this.g.nearMatchPercent && 100 >= this.g.nearMatchPercent ? this.g.nearMatchPercent : 90
    }
      , Ym = function(a, b) {
        var c = [];
        A(b, function(a) {
            if (this.g.allowCustom || a.F)
                !wa(a.h) && (isNaN(a.C) || isNaN(a.w) || a.w == a.C) && Wm(this, a) ? c.push(a) : (a = Xm(this, a),
                null != a && !wa(a.h) && c.push(a))
        }, a);
        return c
    }
      , Wm = function(a, b) {
        var c;
        if (c = "Flash" != b.g || mh) {
            if (c = "All" == a.w || a.w == b.D)
                c = b.g,
                c = null != c ? "All" == a.o || a.o == c : !0;
            c && (c = b.L,
            c = 0 == a.l.length ? !0 : null != c ? 0 <= Qa(a.l, c) : !1)
        }
        if (c)
            if (b = b.l,
            (c = "IgnoreSize" == a.A) || (c = a.h,
            c = c == b ? !0 : c && b ? c.width == b.width && c.height == b.height : !1),
            c)
                a = !0;
            else {
                if (c = "SelectNearMatch" == a.A)
                    "ResizeSmaller" != a.G || b.width <= a.h.width && b.height <= a.h.height || (c = a.h,
                    c = Math.min(c.width / b.width, c.height / b.height),
                    b = new H(c * b.width,c * b.height)),
                    c = b.width,
                    b = b.height,
                    c = c > a.h.width || b > a.h.height || c < a.C / 100 * a.h.width || b < a.C / 100 * a.h.height ? !1 : !0;
                a = c
            }
        else
            a = !1;
        return a
    }
      , Xm = function(a, b) {
        b = b.o;
        return null != b ? Wa(b, function(a) {
            return Wm(this, a)
        }, a) : null
    }
      , Um = function(a, b) {
        var c;
        if (c = null != b)
            a: {
                for (var d in a)
                    if (a[d] == b) {
                        c = !0;
                        break a
                    }
                c = !1
            }
        return c
    };
    var Zm = function(a) {
        var b = {};
        A(a.split(","), function(a) {
            var c = a.split("=");
            2 == c.length && (a = xa(c[0]),
            c = xa(c[1]),
            0 < a.length && (b[a] = c))
        });
        return b
    };
    var $m = function() {
        this.C = 1;
        this.l = -1;
        this.g = 1;
        this.w = this.o = 0;
        this.h = !1
    };
    h = $m.prototype;
    h.we = function() {
        return this.C
    }
    ;
    h.te = function() {
        return this.l
    }
    ;
    h.re = function() {
        return this.g
    }
    ;
    h.ue = function() {
        return this.o
    }
    ;
    h.ve = function() {
        return this.w
    }
    ;
    h.se = function() {
        return this.h
    }
    ;
    var an = function(a) {
        this.h = a.content;
        this.g = a.contentType;
        this.F = a.isSynthetic;
        this.l = a.size;
        this.w = a.masterSequenceNumber;
        this.D = a.resourceType;
        this.C = a.sequenceNumber;
        this.L = a.adSlotId;
        this.o = [];
        a = a.backupCompanions;
        null != a && (this.o = Sa(a, function(a) {
            return new an(a)
        }))
    };
    an.prototype.getContent = function() {
        return this.h
    }
    ;
    an.prototype.A = function() {
        return this.g
    }
    ;
    an.prototype.B = function() {
        return this.l.width
    }
    ;
    an.prototype.G = function() {
        return this.l.height
    }
    ;
    var V = function(a) {
        this.g = a
    };
    V.prototype.h = function() {
        return this.g.adId
    }
    ;
    V.prototype.l = function() {
        return this.g.creativeAdId
    }
    ;
    V.prototype.o = function() {
        return this.g.creativeId
    }
    ;
    var bn = function(a) {
        return a.g.adQueryId
    };
    h = V.prototype;
    h.ye = function() {
        return this.g.adSystem
    }
    ;
    h.ze = function() {
        return this.g.advertiserName
    }
    ;
    h.Ae = function() {
        return this.g.apiFramework
    }
    ;
    h.Oe = function() {
        return this.g.adWrapperIds
    }
    ;
    h.Qe = function() {
        return this.g.adWrapperCreativeIds
    }
    ;
    h.Pe = function() {
        return this.g.adWrapperSystems
    }
    ;
    h.Re = function() {
        return this.g.linear
    }
    ;
    h.Se = function() {
        return this.g.skippable
    }
    ;
    h.Ce = function() {
        return this.g.contentType
    }
    ;
    h.Id = function() {
        return this.g.description
    }
    ;
    h.Kd = function() {
        return this.g.title
    }
    ;
    h.xb = function() {
        return this.g.duration
    }
    ;
    h.Me = function() {
        return this.g.vastMediaWidth
    }
    ;
    h.Le = function() {
        return this.g.vastMediaHeight
    }
    ;
    h.Ne = function() {
        return this.g.width
    }
    ;
    h.Ee = function() {
        return this.g.height
    }
    ;
    h.Ie = function() {
        return this.g.uiElements
    }
    ;
    h.Fe = function() {
        return this.g.minSuggestedDuration
    }
    ;
    h.xe = function() {
        var a = this.g.adPodInfo
          , b = new $m;
        b.o = a.podIndex;
        b.w = a.timeOffset;
        b.C = a.totalAds;
        b.g = a.adPosition;
        b.h = a.isBumper;
        b.l = a.maxDuration;
        return b
    }
    ;
    h.Be = function(a, b, c) {
        var d = Sa(this.g.companions, function(a) {
            return new an(a)
        });
        return Ym(new Vm(new H(a,b),c), d)
    }
    ;
    h.He = function() {
        return Zm(Ja(this.g.traffickingParameters))
    }
    ;
    h.Fc = function() {
        return this.g.traffickingParameters
    }
    ;
    h.Ec = function() {
        return this.g.mediaUrl
    }
    ;
    h.Ge = function() {
        return this.g.surveyUrl
    }
    ;
    h.De = function() {
        return this.g.dealId
    }
    ;
    h.Ke = function() {
        return this.g.universalAdIdValue
    }
    ;
    h.Je = function() {
        return this.g.universalAdIdRegistry
    }
    ;
    var W = function(a) {
        Me.call(this);
        this.w = a;
        this.l = {}
    };
    x(W, Me);
    var cn = [];
    W.prototype.h = function(a, b, c, d) {
        return dn(this, a, b, c, d)
    }
    ;
    var dn = function(a, b, c, d, e, f) {
        ia(c) || (c && (cn[0] = c.toString()),
        c = cn);
        for (var g = 0; g < c.length; g++) {
            var k = vg(b, c[g], d || a.handleEvent, e || !1, f || a.w || a);
            if (!k)
                break;
            a.l[k.key] = k
        }
        return a
    }
      , en = function(a, b, c, d, e, f) {
        if (ia(c))
            for (var g = 0; g < c.length; g++)
                en(a, b, c[g], d, e, f);
        else
            (b = Cg(b, c, d || a.handleEvent, e, f || a.w || a)) && (a.l[b.key] = b)
    };
    W.prototype.C = function(a, b, c, d, e) {
        if (ia(b))
            for (var f = 0; f < b.length; f++)
                this.C(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            e = e || this.w || this,
            c = wg(c),
            d = !!d,
            b = jg(a) ? rg(a.G, String(b), c, d, e) : a ? (a = yg(a)) ? rg(a, b, c, d, e) : null : null,
            b && (Eg(b),
            delete this.l[b.key]);
        return this
    }
    ;
    var fn = function(a) {
        jb(a.l, function(a, c) {
            this.l.hasOwnProperty(c) && Eg(a)
        }, a);
        a.l = {}
    };
    W.prototype.N = function() {
        W.R.N.call(this);
        fn(this)
    }
    ;
    W.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    var gn = "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(" ");
    var hn = {}
      , jn = ""
      , kn = /OS (\S+) like/
      , ln = /Android ([\d\.]+)/
      , nn = function() {
        return !mn() && (Lj() || Kj())
    }
      , on = function() {
        return Sb && !Tb || z(B, "iPod")
    }
      , pn = function() {
        return on() || Tb
    }
      , rn = function(a) {
        return pn() && qn(kn, a)
    }
      , sn = function(a) {
        return Rb && qn(ln, a)
    }
      , qn = function(a, b) {
        null == hn[b] && (wa(jn) && (a = a.exec(B)) && (jn = a[1]),
        (a = jn) ? (a = a.replace(/_/g, "."),
        hn[b] = 0 <= La(a, b)) : hn[b] = !1);
        return hn[b]
    }
      , mn = function() {
        return N.ha() || !1
    }
      , tn = function() {
        var a = B;
        return a ? z(a, "Nintendo WiiU") : !1
    }
      , un = function() {
        var a;
        (a = z(B, "CrKey") || z(B, "PlayStation") || z(B, "Roku")) || (a = (a = B) ? z(a, "AppleTV") || z(a, "GoogleTV") || z(a, "HbbTV") || z(a, "NetCast.TV") || z(a, "Opera TV") || z(a, "POV_TV") || z(a, "SMART-TV") || z(a, "SmartTV") || z(a, "TV Store") || z(a, "OMI/") || z(a, "Presto") && z(a, "Linux") && !z(a, "X11") && !z(a, "Android") && !z(a, "Mobi") : !1);
        return a || z(B, "Xbox")
    }
      , vn = function() {
        return Qg || mn() && Rb && !sn(4.4)
    }
      , wn = function(a) {
        return mn() || N.Db() && nn() || pn() && !(Sb && !Tb && rn(10) && N.h && (Lj() || Kj()) && Cb() && a) || Rb && !sn(4) || un() ? !0 : !1
    }
      , xn = function() {
        return !mn() && !N.La() && nn() || mn() && Rb && !sn(4.2) || un() ? !1 : !0
    };
    var yn = function() {
        this.l = -1;
        this.g = null;
        this.o = "";
        this.h = null;
        this.w = 0
    }
      , zn = new yn;
    yn.prototype.clear = function() {
        this.g = null;
        this.o = "";
        this.h = null
    }
    ;
    var An = function() {
        var a = "h." + zn.o;
        null != zn.h ? (a += "/n." + zn.h,
        null != zn.g && (a += "/" + zn.g)) : N.ha() && (a += "/o.0.0.0");
        return a
    };
    var Bn = function() {
        this.h = .01 > Math.random();
        this.g = Math.floor(4503599627370496 * Math.random())
    };
    ga(Bn);
    var En = function(a, b, c, d) {
        if (a.h || d) {
            c = c || {};
            c.lid = b;
            c.sdkv = An();
            b = Fm();
            wa(Ja(b)) || (c.e = b);
            c = Cn(a, c);
            var e = new tf("http://pagead2.googlesyndication.com/pagead/gen_204");
            jb(c, function(a, b) {
                e.h.set(b, null != a ? "boolean" == typeof a ? a ? "t" : "f" : "" + a : "")
            }, a);
            a = Dn();
            uf(e, a.l);
            N.Cb() || Om(e.toString())
        }
    }
      , Cn = function(a, b) {
        b.id = "ima_html5";
        var c = Dn();
        b.c = a.g;
        b.domain = c.g;
        return b
    }
      , Dn = function() {
        var a = I()
          , b = document;
        return new tf(a.parent == a ? a.location.href : b.referrer)
    };
    var Fn = function() {
        P.call(this);
        this.g = null;
        this.H = new W(this);
        Ne(this, sa(K, this.H));
        this.l = new pf;
        this.A = new pf;
        this.D = this.B = !1;
        this.o = null;
        this.w = !1;
        this.F = null
    };
    x(Fn, P);
    var Gn = null
      , Hn = function() {
        null != Gn || (Gn = new Fn);
        return Gn
    };
    Fn.prototype.N = function() {
        this.H.C(this.g, "activityMonitor", this.I);
        this.w = !1;
        this.l.clear();
        Fn.R.N.call(this)
    }
    ;
    var Kn = function(a, b) {
        a.w || (a.g = b || null,
        a.g && (a.H.h(a.g, "activityMonitor", a.I),
        In(a)),
        Jn(),
        N.ga() || N.D || (a.B = !0,
        jl.getInstance().w = !0),
        a.F = (v(null),
        null),
        N.ha() && (R.getInstance().g = "gsv",
        R.getInstance().A = 79463068),
        a.w = !0,
        a = Gm(),
        A(a, function(a) {
            ul(a)
        }))
    }
      , Mn = function(a) {
        if (null == a)
            return !1;
        if (on() && null != a.webkitDisplayingFullscreen)
            return a.webkitDisplayingFullscreen;
        var b = window.screen.availWidth || window.screen.width
          , c = window.screen.availHeight || window.screen.height;
        a = Ln(a);
        return 0 >= b - a.width && 42 >= c - a.height
    }
      , Ln = function(a) {
        return v(a.getBoundingClientRect) && ad(Qc(a), a) ? a.getBoundingClientRect() : {
            left: a.offsetLeft,
            top: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight
        }
    }
      , Nn = function(a, b, c, d, e) {
        if (a.w) {
            if (a.F)
                return a.F(b, c, e);
            e = e || {};
            if (a = d ? a.A.get(d) : N.w)
                null != e.opt_fullscreen || (e.opt_fullscreen = Mn(a)),
                null != e.opt_adElement || (e.opt_adElement = a);
            return ue("lidar::handlevast_html5", sa(sl, b, c, e)) || {}
        }
        return {}
    };
    Fn.prototype.K = function(a) {
        this.D = a
    }
    ;
    Fn.prototype.J = function() {
        return this.D
    }
    ;
    Fn.prototype.M = function(a) {
        a ? this.o = new zj(a.adk,a.awbidKey) : this.o = null
    }
    ;
    var On = function(a, b) {
        var c = String(Math.floor(1E9 * Math.random()));
        a.A.set(c, b);
        if (Em(Bm(), 31061775))
            try {
                ah(function() {
                    return b
                })
            } catch (d) {}
        return c
    }
      , Pn = function(a, b, c) {
        c ? a.l.get(c) == b && a.l.Ia(c) : (c = [],
        a.l.forEach(sa(function(a, b, c, g) {
            c == b && a.push(g)
        }, c, b)),
        A(c, a.l.Ia, a.l))
    }
      , In = function(a) {
        if (v(window.Goog_AdSense_Lidar_getUrlSignalsArray)) {
            var b = {};
            b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
            Qn(a.g, "activityMonitor", "pageSignals", b)
        }
    };
    Fn.prototype.I = function(a) {
        var b = a.U
          , c = b.queryId
          , d = {};
        d.eventId = b.eventId;
        switch (a.$) {
        case "getPageSignals":
            In(this);
            break;
        case "reportVastEvent":
            var e = b.vastEvent;
            a = b.osdId;
            var f = {};
            f.opt_fullscreen = b.isFullscreen;
            b.isOverlay && (f.opt_bounds = b.overlayBounds);
            d.viewabilityData = Nn(this, e, c, a, f);
            Qn(this.g, "activityMonitor", "viewability", d);
            break;
        case "fetchAdTagUrl":
            d = {},
            d.eventId = b.eventId,
            a = b.osdId,
            c = null,
            sb(b, "isFullscreen") && (c = b.isFullscreen),
            sb(b, "loggingId") && (b = b.loggingId,
            d.loggingId = b,
            En(Bn.getInstance(), 43, {
                step: "beforeLookup",
                logid: b,
                time: ta()
            }, !0)),
            d.engagementString = Rn(this, a, c),
            Qn(this.g, "activityMonitor", "engagement", d)
        }
    }
    ;
    var Jn = function() {
        if (!(m.ima && m.ima.video && m.ima.video.client && m.ima.video.client.tagged)) {
            q("ima.video.client.sdkTag", !0, void 0);
            var a = m.document
              , b = a.createElement("script")
              , c = a.location.protocol;
            "http:" != c && "https:" != c && (c = "");
            b.src = c + "//s0.2mdn.net/instream/video/client.js";
            b.async = !0;
            b.type = "text/javascript";
            a = a.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(b, a)
        }
    }
      , Rn = function(a, b, c) {
        var d = b ? a.A.get(b) : N.w;
        a = {};
        null != c && (a.fullscreen = c);
        c = "";
        try {
            c = $g(function() {
                return d
            }, a)
        } catch (e) {
            c = "sdktle;" + Ga(e.name, 12) + ";" + Ga(e.message, 40)
        }
        return c
    };
    q("ima.common.getVideoMetadata", function(a) {
        a = Hn().l.get(a);
        return v(a) ? a() : {}
    }, void 0);
    q("ima.common.triggerViewEvent", function(a, b) {
        var c = {};
        c.queryId = a;
        c.viewabilityString = b;
        (a = Hn().g) ? Qn(a, "activityMonitor", "viewableImpression", c) : Q(Hn(), new M("viewable_impression",null,c))
    }, void 0);
    q("ima.common.triggerViewabilityMeasurementUpdate", function(a, b) {
        var c = Hn().g
          , d = {};
        d.queryId = a;
        d.viewabilityData = b;
        c && Qn(c, "activityMonitor", "viewabilityMeasurement", d)
    }, void 0);
    q("ima.common.triggerMeasurableEvent", function(a, b) {
        var c = {};
        c.queryId = a;
        c.viewabilityString = b;
        (a = Hn().g) ? Qn(a, "activityMonitor", "measurableImpression", c) : Q(Hn(), new M("measurable_impression",null,c))
    }, void 0);
    q("ima.common.triggerExternalActivityEvent", function(a, b, c) {
        var d = {};
        d.queryId = a;
        d.viewabilityString = b;
        d.eventName = c;
        (a = Hn().g) ? Qn(a, "activityMonitor", "externalActivityEvent", d) : Q(Hn(), new M("externalActivityEvent",null,d))
    }, void 0);
    q("ima.common.updateEngagementDetectionValue", function(a) {
        var b = Hn().g;
        if (b) {
            var c = {};
            c.engagementString = a;
            Qn(b, "activityMonitor", "engagementData", c)
        }
    }, void 0);
    var Sn = Hn();
    var Tn = function(a, b, c) {
        this.h = c;
        0 == b.length && (b = [[]]);
        this.g = Sa(b, function(b) {
            b = a.concat(b);
            for (var c, d, g = [], k = 0, l = 0; k < b.length; ) {
                var n = b[k++];
                if (128 > n)
                    g[l++] = String.fromCharCode(n);
                else if (191 < n && 224 > n)
                    d = b[k++],
                    g[l++] = String.fromCharCode((n & 31) << 6 | d & 63);
                else if (239 < n && 365 > n) {
                    d = b[k++];
                    c = b[k++];
                    var u = b[k++];
                    c = ((n & 7) << 18 | (d & 63) << 12 | (c & 63) << 6 | u & 63) - 65536;
                    g[l++] = String.fromCharCode(55296 + (c >> 10));
                    g[l++] = String.fromCharCode(56320 + (c & 1023))
                } else
                    d = b[k++],
                    c = b[k++],
                    g[l++] = String.fromCharCode((n & 15) << 12 | (d & 63) << 6 | c & 63)
            }
            return new RegExp(g.join(""))
        })
    };
    Tn.prototype.match = function(a) {
        return Ta(this.g, function(b) {
            b = a.match(b);
            return null == b ? !1 : !this.h || 1 <= b.length && "3.168.0" == b[1] || 2 <= b.length && "3.168.0" == b[2] ? !0 : !1
        }, this)
    }
    ;
    var Un = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47]
      , Vn = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47]
      , Wn = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47]
      , Xn = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 99, 111, 114, 101, 47, 97, 100, 109, 111, 98, 47]
      , Yn = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115, 101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 47]
      , Zn = [[105, 109, 97, 51, 92, 46, 106, 115], [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115], [105, 109, 97, 51, 95, 116, 101, 115, 116, 92, 46, 106, 115], [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 92, 46, 106, 115], [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , $n = [[98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 116, 101, 115, 116, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]]
      , ao = [[111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115], [111, 117, 116, 115, 116, 114, 101, 97, 109, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , bo = [[104, 116, 109, 108, 53, 95, 103, 97, 109, 101, 115, 92, 46, 106, 115], [104, 116, 109, 108, 53, 95, 103, 97, 109, 101, 115, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , co = new Tn(Un,Zn,!1)
      , eo = new Tn(Un,$n,!0)
      , fo = new Tn(Vn,Zn,!1)
      , go = new Tn(Vn,$n,!0)
      , ho = new Tn(Wn,[],!1)
      , io = new Tn(Wn,$n,!0)
      , jo = new Tn(Xn,$n,!1)
      , ko = new Tn(Xn,[[97, 112, 112, 95, 112, 114, 111, 109, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115], [97, 112, 112, 95, 112, 114, 111, 109, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 95, 99, 97, 110, 97, 114, 121, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115], [118, 105, 100, 101, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115], [118, 105, 100, 101, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 95, 99, 97, 110, 97, 114, 121, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115]],!1)
      , lo = new Tn([104, 116, 116, 112, 115, 63, 58, 47, 47, 103, 111, 111, 103, 108, 101, 97, 100, 115, 92, 46, 103, 92, 46, 100, 111, 117, 98, 108, 101, 99, 108, 105, 99, 107, 92, 46, 110, 101, 116, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47],[],!1)
      , mo = new Tn([104, 116, 116, 112, 115, 63, 58, 47, 47, 119, 119, 119, 92, 46, 103, 115, 116, 97, 116, 105, 99, 92, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 106, 115, 47],[],!1)
      , no = new Tn([104, 116, 116, 112, 115, 63, 58, 47, 47, 109, 105, 110, 116, 45, 109, 97, 100, 92, 46, 115, 97, 110, 100, 98, 111, 120, 92, 46, 103, 111, 111, 103, 108, 101, 92, 46, 99, 111, 109, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47, 102, 111, 114, 109, 97, 116, 115, 47],[],!1)
      , oo = new Tn([104, 116, 116, 112, 115, 63, 58, 47, 47, 118, 105, 100, 101, 111, 45, 97, 100, 45, 116, 101, 115, 116, 92, 46, 97, 112, 112, 115, 112, 111, 116, 92, 46, 99, 111, 109, 47],[],!1)
      , po = new Tn(Yn,Zn,!1)
      , qo = new Tn([104, 116, 116, 112, 115, 63, 58, 47, 47, 40, 112, 97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111, 111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92, 46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97, 100, 103, 101, 116, 115, 124, 106, 115, 41, 47],[],!1)
      , ro = new Tn(Un,ao,!1)
      , so = new Tn(Yn,ao,!1)
      , to = new Tn(Un,bo,!1)
      , uo = new Tn(Yn,bo,!1)
      , lb = {
        Mh: co,
        Lh: eo,
        gi: fo,
        fi: go,
        ug: ho,
        rg: io,
        qg: jo,
        sg: ko,
        vg: lo,
        tg: mo,
        pg: no,
        wg: oo,
        Nh: po,
        qk: qo,
        hj: ro,
        ij: so,
        Sh: to,
        Th: uo
    };
    var vo = function(a) {
        this.h = a
    };
    vo.prototype.g = function() {
        return this.h
    }
    ;
    var wo = function() {
        P.call(this);
        this.currentTime = 0
    };
    x(wo, P);
    var xo = function(a) {
        wo.call(this);
        this.currentTime = a.currentTime;
        if (!("currentTime"in a) || isNaN(a.currentTime))
            throw Tm(Sm, null, "content", "currentTime");
        this.duration = "duration"in a && !isNaN(a.duration) ? a.duration : -1;
        this.l = a;
        this.g = new Jg(250);
        this.o = new W(this);
        dn(this.o, this.g, "tick", this.w, !1, this)
    };
    x(xo, wo);
    xo.prototype.start = function() {
        this.g.start()
    }
    ;
    xo.prototype.N = function() {
        xo.R.N.call(this);
        this.o.P();
        this.g.P()
    }
    ;
    xo.prototype.w = function() {
        if ("currentTime"in this.l && !isNaN(this.l.currentTime)) {
            var a = this.currentTime;
            this.currentTime = this.l.currentTime;
            a != this.currentTime && Q(this, new L("currentTimeUpdate"))
        } else
            Q(this, new L("contentWrapperError")),
            Kg(this.g)
    }
    ;
    var yo = function(a, b) {
        M.call(this, "adMetadata", a);
        this.g = b || null
    };
    x(yo, M);
    yo.prototype.B = function() {
        return this.g
    }
    ;
    var Ao = function() {
        this.loadVideoTimeout = zo()
    };
    Ao.prototype.disableClickThrough = !1;
    Ao.prototype.mimeTypes = null;
    Ao.prototype.restoreCustomPlaybackStateOnAdBreakComplete = !1;
    Ao.prototype.loadVideoTimeout = 8E3;
    var zo = function() {
        return N.ga() || N.ha() || Em(Bm(), 420706082) ? 15E3 : 8E3
    };
    var Bo = ["classid", "data", "movie", "type", "typemustmatch"]
      , Co = function(a, b) {
        var c = function(a, b) {
            for (var c in a)
                for (var d = c.toLowerCase(), e = 0; e < Bo.length; e++) {
                    var l = Bo[e];
                    if (d == l)
                        throw Error('Cannot override "' + l + '" ' + b + ', got "' + c + '" with value "' + a[c] + '"');
                }
        };
        c(a, "attribute");
        c(b, "param")
    };
    var Do = function() {};
    ga(Do);
    Do.prototype.g = 0;
    var Eo = function(a) {
        P.call(this);
        this.D = a || Rc();
        this.K = null;
        this.Fa = !1;
        this.g = null;
        this.w = void 0;
        this.A = this.B = this.l = null
    };
    x(Eo, P);
    h = Eo.prototype;
    h.ke = Do.getInstance();
    h.getId = function() {
        return this.K || (this.K = ":" + (this.ke.g++).toString(36))
    }
    ;
    h.xa = function() {
        return this.g
    }
    ;
    h.Ob = function(a) {
        if (this.l && this.l != a)
            throw Error("Method not supported");
        Eo.R.Ob.call(this, a)
    }
    ;
    h.Bc = function() {
        this.g = this.D.createElement("DIV")
    }
    ;
    h.Wa = function() {
        this.Fa = !0;
        Fo(this, function(a) {
            !a.Fa && a.xa() && a.Wa()
        })
    }
    ;
    var Go = function(a) {
        Fo(a, function(a) {
            a.Fa && Go(a)
        });
        a.w && fn(a.w);
        a.Fa = !1
    };
    Eo.prototype.N = function() {
        this.Fa && Go(this);
        this.w && (this.w.P(),
        delete this.w);
        Fo(this, function(a) {
            a.P()
        });
        this.g && $c(this.g);
        this.l = this.g = this.A = this.B = null;
        Eo.R.N.call(this)
    }
    ;
    var Fo = function(a, b) {
        a.B && A(a.B, b, void 0)
    };
    Eo.prototype.removeChild = function(a, b) {
        if (a) {
            var c = r(a) ? a : a.getId();
            a = this.A && c ? xb(this.A, c) || null : null;
            if (c && a) {
                var d = this.A;
                c in d && delete d[c];
                $a(this.B, a);
                b && (Go(a),
                a.g && $c(a.g));
                b = a;
                if (null == b)
                    throw Error("Unable to set parent component");
                b.l = null;
                Eo.R.Ob.call(b, null)
            }
        }
        if (!a)
            throw Error("Child is not in parent component");
        return a
    }
    ;
    var Ho = function(a, b) {
        Eo.call(this, b);
        this.J = a;
        this.F = new W(this);
        this.o = new pf
    };
    x(Ho, Eo);
    h = Ho.prototype;
    h.Wb = "window";
    h.rb = "sameDomain";
    h.setSize = function(a, b) {
        this.I = r(a) ? a : Math.round(a) + "px";
        this.H = r(b) ? b : Math.round(b) + "px";
        this.xa() && od(this.xa() ? this.xa().firstChild : null, this.I, this.H);
        return this
    }
    ;
    h.Wa = function() {
        Ho.R.Wa.call(this);
        for (var a = this.xa(), b = this.o.Ea(), c = this.o.ba(), d = [], e = 0; e < b.length; e++)
            d.push(encodeURIComponent(String(b[e])) + "=" + encodeURIComponent(String(c[e])));
        var b = d.join("&");
        if (!E || 11 <= Number(cc)) {
            var f = {
                AllowScriptAccess: this.rb,
                allowFullScreen: "true",
                allowNetworking: "all",
                bgcolor: "#000000",
                "class": "goog-ui-media-flash-object",
                FlashVars: b,
                id: this.getId(),
                name: this.getId(),
                quality: "high",
                SeamlessTabbing: "false",
                wmode: this.Wb
            };
            f = Kc({
                src: this.J,
                type: "application/x-shockwave-flash",
                pluginspage: "https://www.macromedia.com/go/getflashplayer"
            }, {
                allownetworking: "none",
                allowscriptaccess: "never"
            }, f);
            f = Jc("embed", f)
        } else {
            d = this.J;
            c = {
                allowFullScreen: "true",
                AllowScriptAccess: this.rb,
                allowNetworking: "all",
                bgcolor: "#000000",
                FlashVars: b,
                quality: "high",
                SeamlessTabbing: "false",
                wmode: this.Wb
            };
            b = {
                "class": "goog-ui-media-flash-object",
                id: this.getId(),
                name: this.getId()
            };
            Co(b, c);
            e = {
                allownetworking: "none",
                allowscriptaccess: "never",
                movie: d
            };
            d = {};
            for (f in e)
                d[f] = e[f];
            for (f in c) {
                var g = f.toLowerCase();
                g in e && delete d[g];
                d[f] = c[f]
            }
            c = [];
            for (f in d)
                c.push(Jc("param", {
                    name: f,
                    value: d[f]
                }));
            f = Kc({
                classid: "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
            }, {}, b);
            f = Jc("object", f, c)
        }
        a.innerHTML = Dc(f);
        this.I && this.H && this.setSize(this.I, this.H);
        this.F.h(this.xa(), pb(gg), Oe)
    }
    ;
    h.Bc = function() {
        if (null != this.M && !(0 <= La(nh, this.M)))
            throw Error("Method not supported");
        var a = this.D.createElement("DIV");
        a.className = "goog-ui-media-flash";
        this.g = a
    }
    ;
    h.N = function() {
        Ho.R.N.call(this);
        this.o = null;
        this.F.P();
        this.F = null
    }
    ;
    var Io = function(a, b) {
        L.call(this, "vpaidEventType");
        this.g = a;
        this.data = b
    };
    x(Io, L);
    var Jo = function(a) {
        P.call(this);
        this.B = a;
        this.l = null;
        this.w = -1;
        this.A = !1;
        this.o = "goog_" + Ma++
    };
    x(Jo, P);
    var Ko = tc(kc(lc("https://imasdk.googleapis.com/flash/sdkloader/flashinhtml.swf")))
      , Lo = tc(kc(lc("http://imasdk.googleapis.com/flash/sdkloader/flashinhtml.swf")));
    h = Jo.prototype;
    h.P = function() {
        this.g && (this.g.P(),
        this.l = null);
        window[this.o] && delete window[this.o];
        m.clearTimeout(this.w)
    }
    ;
    h.load = function(a, b, c, d) {
        window[this.o] = w(this.Gd, this);
        this.g = new Ho(N.Nc() ? Lo : Ko);
        this.g.setSize(b, c);
        this.g.rb = "always";
        this.g.Wb = "transparent";
        this.g.o.set("vpaid", a);
        this.g.o.set("vpaidEventHandler", this.o);
        a = this.g;
        b = this.B;
        if (a.Fa)
            throw Error("Component already rendered");
        a.g || a.Bc();
        b ? b.insertBefore(a.g, null) : a.D.g.body.appendChild(a.g);
        a.l && !a.l.Fa || a.Wa();
        a = this.g;
        this.l = a.xa() ? a.xa().firstChild : null;
        this.w = Lg(this.Vf, d, this)
    }
    ;
    h.tb = function(a) {
        if (!this.l)
            return null;
        var b = Array.prototype.slice.call(arguments)
          , c = b.shift();
        if (!this.A && "handshakeVersion" != c && "initAd" != c)
            return null;
        try {
            if (this.l[c])
                return this.l[c].apply(this.l, b)
        } catch (d) {}
        return null
    }
    ;
    h.Gd = function(a, b) {
        "AdLoaded" == a && (m.clearTimeout(this.w),
        this.A = !0);
        Q(this, new Io(a,b || null))
    }
    ;
    h.Vf = function() {
        Q(this, "loadError")
    }
    ;
    var Mo = function() {
        P.call(this);
        this.B = this.F = this.J = this.H = !1;
        this.l = 0;
        this.w = [];
        this.D = !1;
        this.M = this.K = Infinity;
        this.o = 0;
        this.A = new W(this);
        this.I = {}
    };
    x(Mo, P);
    Mo.prototype.Ga = function(a) {
        null == a || this.H || (this.g = a,
        No(this),
        this.H = !0)
    }
    ;
    Mo.prototype.la = function() {
        null != this.g && this.H && (Oo(this),
        this.B = this.F = this.H = !1,
        this.l = 0,
        this.w = [],
        this.D = !1)
    }
    ;
    var No = function(a) {
        Oo(a);
        !(a.g instanceof P) && "ontouchstart"in document.documentElement && pn() ? (a.I = {
            touchstart: w(a.Z, a),
            touchmove: w(a.Y, a),
            touchend: w(a.W, a)
        },
        jb(a.I, function(a, c) {
            this.g.addEventListener(c, a, !1)
        }, a)) : a.A.h(a.g, "click", a.T)
    }
      , Oo = function(a) {
        a.A.C(a.g, "click", a.T);
        jb(a.I, function(a, c) {
            this.g.removeEventListener(c, a, !1)
        }, a);
        a.I = {}
    };
    Mo.prototype.Z = function(a) {
        this.F = !0;
        this.l = a.touches.length;
        this.o && (window.clearTimeout(this.o),
        this.o = 0,
        this.J = !0);
        (this.D = Po(this, a.touches) || 1 != a.touches.length) ? this.M = this.K = Infinity : (this.K = a.touches[0].clientX,
        this.M = a.touches[0].clientY);
        Qo(this, a.touches)
    }
    ;
    Mo.prototype.Y = function(a) {
        this.l = a.touches.length;
        if (!rn(8) || Math.pow(a.changedTouches[0].clientX - this.K, 2) + Math.pow(a.changedTouches[0].clientY - this.M, 2) > Math.pow(5, 2))
            this.B = !0
    }
    ;
    Mo.prototype.W = function(a) {
        !this.F || 1 != this.l || this.B || this.J || this.D || !Po(this, a.changedTouches) || (this.o = window.setTimeout(w(this.O, this), 300));
        this.l = a.touches.length;
        0 == this.l && (this.B = this.F = !1,
        this.w = []);
        this.J = !1
    }
    ;
    Mo.prototype.T = function() {
        this.O()
    }
    ;
    var Qo = function(a, b) {
        a.w = [];
        A(b, function(a) {
            var b = this.w;
            a = a.identifier;
            Xa(b, a) || b.push(a)
        }, a)
    }
      , Po = function(a, b) {
        return Ta(b, function(a) {
            return Xa(this.w, a.identifier)
        }, a)
    };
    Mo.prototype.O = function() {
        this.o = 0;
        Q(this, new L("click"))
    }
    ;
    Mo.prototype.N = function() {
        this.la();
        this.A.P();
        this.A = null;
        Mo.R.N.call(this)
    }
    ;
    var Ro = function() {
        this.g = [];
        this.h = []
    };
    h = Ro.prototype;
    h.wa = function() {
        return this.g.length + this.h.length
    }
    ;
    h.isEmpty = function() {
        return 0 == this.g.length && 0 == this.h.length
    }
    ;
    h.clear = function() {
        this.g = [];
        this.h = []
    }
    ;
    h.contains = function(a) {
        return Xa(this.g, a) || Xa(this.h, a)
    }
    ;
    h.ba = function() {
        for (var a = [], b = this.g.length - 1; 0 <= b; --b)
            a.push(this.g[b]);
        for (var c = this.h.length, b = 0; b < c; ++b)
            a.push(this.h[b]);
        return a
    }
    ;
    var So = function(a) {
        if (wa(Ja(a)))
            return null;
        var b = a.match(/^https?:\/\/[^\/]*youtu\.be\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)
            return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/video\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)
            return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/watch\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)
            return b[1];
        a = (new tf(a)).h;
        return Kf(a, "v") ? a.get("v").toString() : Kf(a, "video_id") ? a.get("video_id").toString() : null
    };
    var To = function(a) {
        this.h = 0;
        this.l = a || 100;
        this.g = []
    };
    h = To.prototype;
    h.get = function(a) {
        a = Uo(this, a);
        return this.g[a]
    }
    ;
    h.set = function(a, b) {
        a = Uo(this, a);
        this.g[a] = b
    }
    ;
    h.wa = function() {
        return this.g.length
    }
    ;
    h.isEmpty = function() {
        return 0 == this.g.length
    }
    ;
    h.clear = function() {
        this.h = this.g.length = 0
    }
    ;
    h.ba = function() {
        for (var a = this.wa(), b = this.wa(), c = [], a = this.wa() - a; a < b; a++)
            c.push(this.get(a));
        return c
    }
    ;
    h.Ea = function() {
        for (var a = [], b = this.wa(), c = 0; c < b; c++)
            a[c] = c;
        return a
    }
    ;
    var Uo = function(a, b) {
        if (b >= a.g.length)
            throw Error("Out of bounds exception");
        return a.g.length < a.l ? b : (a.h + Number(b)) % a.l
    };
    var Vo = function() {
        P.call(this)
    };
    x(Vo, P);
    var Wo = {
        Jg: "beginFullscreen",
        CLICK: "click",
        Ch: "end",
        Dh: "endFullscreen",
        jd: "error",
        LOADED: "loaded",
        ui: "mediaLoadTimeout",
        ob: "pause",
        qd: "play",
        dk: "skip",
        ek: "skipShown",
        bk: "shareClicked",
        rc: "start",
        wk: "timeUpdate",
        Ng: "cardsStateChange",
        uk: "timedMetadata",
        Uk: "volumeChange"
    };
    Vo.prototype.Pc = function() {
        return !0
    }
    ;
    Vo.prototype.oa = fa;
    var Xo = function(a) {
        P.call(this);
        this.g = a;
        this.W = "";
        this.H = -1;
        this.Y = new To(4);
        this.o = 0;
        this.T = this.w = this.O = this.D = !1;
        this.K = this.Sa();
        this.J = this.Ta();
        this.Z = zo();
        this.M = !1
    };
    x(Xo, Vo);
    h = Xo.prototype;
    h.zc = function() {
        return Ra(pb(vl), function(a) {
            return !wa(this.g.canPlayType(a))
        }, this)
    }
    ;
    h.Pb = function(a) {
        this.Z = 0 < a.g ? a.g : zo()
    }
    ;
    h.Rc = function(a) {
        this.g.seekable.length ? this.g.seekable.end(0) > this.H && (this.g.currentTime = this.H,
        a()) : setTimeout(w(this.Rc, this, a), 100)
    }
    ;
    h.$c = function() {
        this.W = this.g.currentSrc;
        this.H = this.g.ended ? -1 : this.g.currentTime
    }
    ;
    h.Yc = function(a) {
        if (0 <= this.H) {
            var b = this;
            this.g.addEventListener("loadedmetadata", function d() {
                b.Rc(a);
                b.g.removeEventListener("loadedmetadata", d, !1)
            }, !1);
            this.g.src = this.W;
            this.g.load()
        } else
            a()
    }
    ;
    h.load = function(a, b) {
        Yo(this);
        b && N.ha() && v(this.g.g) && this.g.g(b);
        a && (this.g.src = a);
        this.g.load()
    }
    ;
    h.fb = function(a) {
        this.g.volume = a;
        this.g.muted = 0 == a ? !0 : !1
    }
    ;
    h.Ic = function() {
        return this.g.volume
    }
    ;
    h.bb = function() {
        this.M = !1;
        this.g.play();
        this.I || (this.I = Lg(this.Cd, this.Z, this))
    }
    ;
    h.Kc = function() {
        this.M = !0;
        this.g.pause();
        Zo(this)
    }
    ;
    h.Jc = function() {
        return this.g.paused ? pn() || Rg ? this.g.currentTime < this.g.duration : !0 : !1
    }
    ;
    h.xc = function() {
        on() && this.g.webkitDisplayingFullscreen && this.g.webkitExitFullscreen()
    }
    ;
    h.Ta = function() {
        return Mn(this.g)
    }
    ;
    h.Ua = function(a) {
        this.g.currentTime = a
    }
    ;
    h.ra = function() {
        return this.g.currentTime
    }
    ;
    h.Ra = function() {
        return isNaN(this.g.duration) ? -1 : this.g.duration
    }
    ;
    h.ib = function() {
        return this.g.ended
    }
    ;
    h.Sa = function() {
        return new H(this.g.offsetWidth,this.g.offsetHeight)
    }
    ;
    h.N = function() {
        this.la();
        Xo.R.N.call(this)
    }
    ;
    h.Ga = function() {
        this.la();
        this.l = new W(this);
        this.l.h(this.g, gn, this.aa);
        this.l.h(this.g, "canplay", this.Sf);
        this.l.h(this.g, "ended", this.Uf);
        this.l.h(this.g, "webkitbeginfullscreen", this.zb);
        this.l.h(this.g, "webkitendfullscreen", this.Lc);
        this.l.h(this.g, "pause", this.Yf);
        this.l.h(this.g, "playing", this.$f);
        this.l.h(this.g, "timeupdate", this.bg);
        this.l.h(this.g, "volumechange", this.fg);
        this.l.h(this.g, "error", this.Tc);
        this.l.h(this.g, vn() || pn() && !rn(8) ? "loadeddata" : "canplay", this.Wf);
        this.B = new Mo;
        this.l.h(this.B, "click", this.Hf);
        this.B.Ga(this.g);
        this.F = new Jg(1E3);
        this.l.h(this.F, "tick", this.If);
        this.F.start()
    }
    ;
    h.la = function() {
        null != this.B && (this.B.la(),
        this.B = null);
        null != this.F && this.F.P();
        null != this.l && (this.l.P(),
        this.l = null);
        Yo(this)
    }
    ;
    var Yo = function(a) {
        a.O = !1;
        a.w = !1;
        a.D = !1;
        a.o = 0;
        a.T = !1;
        a.Y.clear();
        Zo(a);
        K(a.A)
    };
    Xo.prototype.aa = function(a) {
        Q(this, a.type)
    }
    ;
    var $o = function(a) {
        if (!a.w) {
            a.w = !0;
            Zo(a);
            Q(a, "start");
            var b = v(a.g.getAttribute) && null != a.g.getAttribute("playsinline");
            Bm();
            (Sb && !Tb && rn(10) && N.ga(),
            !N.ga() && Sb && !Tb && rn(10) && N.h && (Lj() || Kj()) && Cb() && b) || !(on() && !mn() || Rb && !sn(4) || !N.ga() && un()) || !Rb || sn(3) || on() && !rn(4) || a.zb()
        }
    };
    h = Xo.prototype;
    h.Sf = function() {
        var a;
        if (a = Sg)
            a = B,
            a = !(a && (z(a, "SMART-TV") || z(a, "SmartTV")));
        a && !this.T && (this.Ua(.001),
        this.T = !0)
    }
    ;
    h.Wf = function() {
        this.O || (this.O = !0,
        Q(this, "loaded"))
    }
    ;
    h.$f = function() {
        Q(this, "play");
        pn() || vn() || $o(this)
    }
    ;
    h.bg = function() {
        if (!this.w && (pn() || vn())) {
            if (0 >= this.ra())
                return;
            if (vn() && this.ib() && 1 == this.Ra()) {
                this.Tc();
                return
            }
            $o(this)
        }
        if (pn() || tn()) {
            if (1.5 < this.ra() - this.o) {
                this.D = !0;
                this.Ua(this.o);
                return
            }
            this.D = !1;
            this.ra() > this.o && (this.o = this.ra())
        }
        var a = this.Y;
        a.g[a.h] = this.g.currentTime;
        a.h = (a.h + 1) % a.l;
        Q(this, "timeUpdate")
    }
    ;
    h.fg = function() {
        Q(this, "volumeChange")
    }
    ;
    h.Yf = function() {
        if (this.w && pn() && !this.M && (2 > ap(this) || this.D)) {
            this.A = new Jg(250);
            this.l.h(this.A, "tick", this.Rf);
            this.A.start();
            var a = !0
        } else
            a = !1;
        a || Q(this, "pause")
    }
    ;
    h.Uf = function() {
        var a = !0;
        if (pn() || tn())
            a = this.o >= this.g.duration - 1.5;
        !this.D && a && Q(this, "end")
    }
    ;
    h.zb = function() {
        Q(this, "beginFullscreen")
    }
    ;
    h.Lc = function() {
        Q(this, "endFullscreen")
    }
    ;
    h.Tc = function() {
        Zo(this);
        Q(this, "error")
    }
    ;
    h.Hf = function() {
        Q(this, "click")
    }
    ;
    h.If = function() {
        var a = this.Sa()
          , b = this.Ta();
        if (a.width != this.K.width || a.height != this.K.height)
            !this.J && b ? this.zb() : this.J && !b && this.Lc(),
            this.K = a,
            this.J = b
    }
    ;
    h.Cd = function() {
        if (!this.w) {
            try {
                En(Bn.getInstance(), 16)
            } catch (a) {}
            Yo(this);
            Q(this, "mediaLoadTimeout")
        }
    }
    ;
    h.Rf = function() {
        if (this.ib() || !this.Jc())
            K(this.A);
        else {
            var a = this.g.duration - this.g.currentTime
              , b = ap(this);
            0 < b && (2 <= b || 2 > a) && (K(this.A),
            this.bb())
        }
    }
    ;
    var ap = function(a) {
        var b;
        a: {
            for (b = a.g.buffered.length - 1; 0 <= b; ) {
                if (a.g.buffered.start(b) <= a.g.currentTime) {
                    b = a.g.buffered.end(b);
                    break a
                }
                b--
            }
            b = 0
        }
        return b - a.g.currentTime
    }
      , Zo = function(a) {
        a.I && (m.clearTimeout(a.I),
        a.I = null)
    };
    var cp = function() {
        P.call(this);
        this.l = new bp;
        this.g = new W(this);
        var a = Re(N);
        if (a) {
            a: {
                if (sb(a.g, "videoElementMockDuration") && (a = a.g.videoElementMockDuration,
                t(a)))
                    break a;
                a = NaN
            }
            this.duration = a
        }
    };
    x(cp, P);
    var dp = new pf
      , ep = function() {
        var a = ["video/mp4"]
          , b = ["video/ogg"]
          , c = new cp;
        c.canPlayType = function(c) {
            return Xa(a, c) ? "probably" : Xa(b, c) ? "maybe" : ""
        }
        ;
        c.width = 0;
        c.height = 0;
        c.offsetWidth = 0;
        c.offsetHeight = 0;
        return c
    }
      , fp = function() {}
      , bp = function() {
        this.length = 0;
        this.g = []
    };
    bp.prototype.start = function() {
        return 0
    }
    ;
    h = cp.prototype;
    h.readyState = 0;
    h.currentTime = 0;
    h.duration = NaN;
    h.volume = 1;
    h.muted = !1;
    h.src = "";
    h.Ma = null;
    h.kb = null;
    h.load = function() {
        this.readyState = 0;
        Q(this, "loadstart");
        this.duration = Number(isNaN(this.duration) ? 10 + 20 * Math.random() : this.duration);
        Q(this, "durationchange");
        var a = this.l;
        a.g.push(new fp);
        a.length = a.g.length;
        Q(this, "loadedmetadata");
        0 < this.currentTime && Q(this, "timeupdate");
        Q(this, "loadeddata");
        Q(this, "canplay");
        Q(this, "canplaythrough");
        Q(this, "progress")
    }
    ;
    h.setAttribute = function(a, b) {
        null != a && dp.set(a, b)
    }
    ;
    h.N = function() {
        this.g.P()
    }
    ;
    h.eg = function(a) {
        var b = null
          , c = null;
        switch (a.type) {
        case "loadeddata":
            b = "Loaded";
            break;
        case "playing":
            b = "Playing";
            c = "#00f";
            break;
        case "pause":
            b = "Paused";
            break;
        case "ended":
            b = "Ended",
            c = "#000"
        }
        b && this.kb && (this.kb.innerText = b);
        c && this.Ma && (this.Ma.style.backgroundColor = c)
    }
    ;
    E && F(8);
    var gp = function() {
        throw Error("Do not instantiate directly");
    };
    gp.prototype.g = null;
    gp.prototype.getContent = function() {
        return this.content
    }
    ;
    gp.prototype.toString = function() {
        return this.content
    }
    ;
    var hp = function() {
        gp.call(this)
    };
    x(hp, gp);
    (function(a) {
        function b(a) {
            this.content = a
        }
        b.prototype = a.prototype;
        return function(a, d) {
            a = new b(String(a));
            void 0 !== d && (a.g = d);
            return a
        }
    })(hp);
    var ip = {}
      , jp = function(a, b) {
        var c = "key_" + a + ":" + b
          , d = ip[c];
        if (void 0 === d || 0 > d)
            ip[c] = 0;
        else if (0 == d)
            throw Error('Encountered two active delegates with the same priority ("' + a + ":" + b + '").');
    };
    (function(a) {
        function b(a) {
            this.content = a
        }
        b.prototype = a.prototype;
        return function(a, d) {
            a = String(a);
            if (!a)
                return "";
            a = new b(a);
            void 0 !== d && (a.g = d);
            return a
        }
    })(hp);
    jp("a", "");
    jp("a", "fixedDirectionality");
    jp("a", "redesign2014q4");
    jp("b", "");
    jp("b", "redesign2014q4");
    jp("b", "forcedlinebreak");
    var kp = function(a, b, c, d) {
        if (null == a || !ad(Qc(a), a))
            throw Tm(Sm, null, "containerElement", "element");
        this.w = a;
        this.h = this.g = null;
        this.o = b;
        this.A = !d;
        this.C = c || !1;
        this.l = null;
        this.g = Xc("DIV", {
            style: "display:none;"
        });
        this.w.appendChild(this.g);
        if (this.A) {
            a = Re(N);
            if (Se(a, "useVideoElementMock")) {
                a = ep();
                b = Xc("DIV", {
                    style: "position:absolute;width:100%;height:100%;top:0px;left:0px;"
                });
                for (e in a)
                    b[e] = a[e];
                a.Ma = Xc("DIV", {
                    style: "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000"
                });
                a.kb = Xc("P", {
                    style: "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;"
                });
                a.Ma.appendChild(a.kb);
                b.appendChild(a.Ma);
                a.g.h(a, ["loadeddata", "playing", "pause", "ended"], a.eg);
                var e = b
            } else
                e = Xc("VIDEO", {
                    style: "background-color:#000;position:absolute;width:100%;height:100%;",
                    title: "Advertisement"
                });
            e.setAttribute("webkit-playsinline", !0);
            e.setAttribute("playsinline", !0);
            this.h = e;
            this.g.appendChild(this.h)
        }
        this.o && (e = "display:none;position:absolute;width:100%;height:100%;",
        N.La() || (e += "background-color:#000;"),
        e = Xc("DIV", {
            id: this.o,
            style: e
        }),
        this.g.appendChild(e));
        this.C && (this.l = Xc("DIV", {
            style: "position:absolute;width:100%;height:100%;"
        }),
        this.g.appendChild(this.l))
    };
    x(kp, Me);
    kp.prototype.N = function() {
        $c(this.g);
        kp.R.N.call(this)
    }
    ;
    kp.prototype.show = function() {
        lp(this.g, !0)
    }
    ;
    var lp = function(a, b) {
        null != a && (a.style.display = b ? "block" : "none")
    };
    var mp = function(a, b, c, d) {
        Me.call(this);
        this.C = b || null;
        this.B = "*";
        this.o = c || null;
        this.l = null;
        this.h = d || null;
        this.H = !!a;
        this.A = w(this.D, this);
        window.addEventListener("message", this.A)
    };
    x(mp, Me);
    mp.prototype.D = function(a) {
        if (!("*" != this.o && a.origin != this.o || this.C && a.source != this.C) && r(a.data)) {
            try {
                var b = Xe(a.data)
            } catch (c) {
                return
            }
            if (!(null == b || this.H && (this.l && this.l != b.id || this.h && this.h != b.channel)) && b)
                switch (b.event) {
                case "syn":
                    np(this, a);
                    op(this);
                    this.sendMessage({
                        event: "ack"
                    });
                    break;
                case "ack":
                    np(this, a);
                    op(this);
                    break;
                case "command":
                    a = b.func,
                    a in this.g && this.g[a].apply(null, b.args)
                }
        }
    }
    ;
    var np = function(a, b) {
        "null" != b.origin && (a.o = a.B = b.origin);
        a.C = b.source
    };
    mp.prototype.sendMessage = function(a, b) {
        if (b = b || this.C) {
            this.l && (a.id = this.l);
            this.h && (a.channel = this.h);
            try {
                var c = ff(a);
                b.postMessage(c, this.B)
            } catch (d) {}
        }
    }
    ;
    mp.prototype.N = function() {
        window.removeEventListener("message", this.A);
        mp.R.N.call(this)
    }
    ;
    var pp = function(a) {
        mp.call(this, !0);
        this.l = a;
        this.h = "remoteplayer";
        this.o = "*";
        this.g = {};
        this.w = [];
        this.G = !1
    };
    x(pp, mp);
    pp.prototype.F = function(a, b) {
        var c = {
            event: "command",
            func: a
        }
          , d = Array.prototype.slice.call(arguments, 1);
        0 < d.length && (c.args = d);
        this.G ? this.sendMessage(c) : 100 > this.w.length && this.w.push(c)
    }
    ;
    var op = function(a) {
        a.G = !0;
        A(a.w, function(a) {
            this.sendMessage(a)
        }, a);
        a.w.length = 0
    }
      , qp = function() {};
    var sp = function(a) {
        this.g = new pf;
        if (a) {
            a = sf(a);
            for (var b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                this.g.set(rp(d), d)
            }
        }
    }
      , rp = function(a) {
        var b = typeof a;
        return "object" == b && a || "function" == b ? "o" + (a[na] || (a[na] = ++oa)) : b.substr(0, 1) + a
    };
    h = sp.prototype;
    h.wa = function() {
        return this.g.wa()
    }
    ;
    h.clear = function() {
        this.g.clear()
    }
    ;
    h.isEmpty = function() {
        return this.g.isEmpty()
    }
    ;
    h.contains = function(a) {
        a = rp(a);
        return rf(this.g.h, a)
    }
    ;
    h.ba = function() {
        return this.g.ba()
    }
    ;
    h.clone = function() {
        return new sp(this)
    }
    ;
    h.Ca = function() {
        return this.g.Ca(!1)
    }
    ;
    var tp = function(a, b) {
        this.g = a;
        this.w = new sp;
        this.G = w(this.B, this);
        this.A = Math.floor(2147483646 * Math.random()) + 1;
        this.h = b || new pp(this.A);
        Ne(this, sa(K, this.h));
        this.l = new W(this);
        Ne(this, sa(K, this.l));
        b = w(a.play, a);
        this.h.g.play = b;
        b = w(a.load, a);
        this.h.g.load = b;
        a = w(a.pause, a);
        this.h.g.pause = a;
        a = w(this.C, this);
        this.h.g.listen = a;
        a = w(this.D, this);
        this.h.g.unlisten = a;
        a = w(this.o, this, "src");
        this.h.g.setSource = a;
        a = w(this.o, this, "muted");
        this.h.g.setMuted = a;
        a = w(this.o, this, "volume");
        this.h.g.setVolume = a
    };
    x(tp, Me);
    tp.prototype.B = function(a) {
        a = a.type;
        var b = new qp;
        b.duration = this.g.duration;
        b.currentTime = this.g.currentTime;
        b.readyState = this.g.readyState;
        this.g.error && (b.h = this.g.error.code);
        b.muted = this.g.muted;
        b.l = this.g.paused;
        b.g = this.g.ended;
        b.volume = this.g.volume;
        this.h.F("notify", a, b)
    }
    ;
    tp.prototype.C = function(a) {
        this.w.g.set(rp(a), a);
        this.l.h(this.g, a, this.G)
    }
    ;
    tp.prototype.D = function(a) {
        this.w.g.Ia(rp(a));
        this.l.C(this.g, a)
    }
    ;
    tp.prototype.o = function(a, b) {
        this.g[a] = b
    }
    ;
    var up = function(a, b) {
        fn(a.l);
        a.g = b;
        A(a.w.ba(), a.C, a)
    };
    var vp = function(a, b, c, d, e, f, g, k, l, n, u, C, T) {
        this.l = a;
        this.o = l;
        this.w = b;
        this.C = c;
        this.G = g;
        this.B = n;
        this.D = d;
        this.L = e;
        this.F = u;
        this.g = f;
        this.h = k;
        this.A = C;
        this.H = T
    };
    var xp = function(a) {
        P.call(this);
        this.M = "ima-chromeless-video";
        var b = null;
        null != a && (r(a) ? this.M = a : b = a);
        this.O = new W(this);
        this.A = null;
        this.w = !1;
        this.ea = this.Sa();
        this.da = this.Ta();
        this.I = -1;
        this.Y = !1;
        this.B = -1;
        this.l = this.W = this.J = null;
        this.ka = "";
        this.o = !1;
        this.aa = null != b;
        this.ia = this.K = this.Z = this.g = null;
        this.D = void 0;
        this.H = this.fa = null;
        this.F = 0;
        this.aa ? (this.o = !0,
        this.g = b,
        this.D = 2) : (a = w(this.Dd, this),
        wp ? a() : (Ya.push(a),
        a = document.createElement("script"),
        a.src = "https://www.youtube.com/iframe_api",
        b = document.getElementsByTagName("script")[0],
        b.parentNode.insertBefore(a, b)))
    };
    x(xp, Vo);
    var yp = {
        el: "adunit",
        controls: 0,
        html5: 1,
        playsinline: 1,
        ps: "gvn",
        showinfo: 0
    }
      , Ya = []
      , wp = !1;
    h = xp.prototype;
    h.Pb = function(a) {
        this.l = a
    }
    ;
    h.load = function(a, b) {
        null !== a && (this.ka = a,
        this.o ? zp(this, a, b) : (this.J = a,
        this.W = b))
    }
    ;
    h.fb = function(a) {
        this.aa ? Q(this, "volumeChange") : this.o ? (a = Math.min(Math.max(100 * a, 0), 100),
        this.g.setVolume(a),
        this.B = -1,
        Q(this, "volumeChange")) : this.B = a
    }
    ;
    h.Ic = function() {
        return this.o ? this.g.getVolume() / 100 : this.B
    }
    ;
    h.bb = function() {
        if (!wa(Ja(this.ka))) {
            if (!this.w) {
                Ap(this);
                var a = zo();
                null != this.l && 0 < this.l.g && (a = this.l.g);
                this.va = Lg(this.Da, a, this)
            }
            this.o ? (this.Y = !1,
            !this.w && this.l && this.l.h ? this.g.loadVideoByPlayerVars(this.fa) : this.g.playVideo()) : this.Y = !0
        }
    }
    ;
    h.Kc = function() {
        this.o && this.w && this.g.pauseVideo()
    }
    ;
    h.Jc = function() {
        return this.o ? 2 == this.g.getPlayerState(this.D) : !1
    }
    ;
    h.xc = function() {}
    ;
    h.Ta = function() {
        var a = document.getElementById(this.M);
        return a ? Mn(a) : !1
    }
    ;
    h.Ua = function(a) {
        this.o ? this.g.seekTo(a, !1) : this.I = a
    }
    ;
    h.ra = function(a) {
        return this.o ? this.g.getCurrentTime(a || this.D) : -1
    }
    ;
    h.Ra = function() {
        return this.o && this.w ? this.g.getDuration(this.D) : -1
    }
    ;
    h.zc = function() {
        return pb(vl)
    }
    ;
    h.ib = function() {
        return this.o ? 0 == this.g.getPlayerState(this.D) : !1
    }
    ;
    h.Sa = function() {
        var a = document.getElementById(this.M);
        return a ? new H(a.offsetWidth,a.offsetHeight) : new H(0,0)
    }
    ;
    h.Pc = function() {
        return this.o ? 1 == this.g.getPlayerState(this.D) : !1
    }
    ;
    h.Jf = function() {
        var a = this.Sa()
          , b = this.Ta();
        if (a.width != this.ea.width || a.height != this.ea.height)
            !this.da && b ? Q(this, "beginFullscreen") : this.da && !b && Q(this, "endFullscreen"),
            this.ea = a,
            this.da = b
    }
    ;
    h.Ga = function() {
        this.Z = w(this.Uc, this);
        this.K = w(this.Jb, this);
        this.ia = w(this.Vc, this);
        this.za = w(this.ag, this);
        this.aa && (this.g.addEventListener("onAdStateChange", this.K),
        this.g.addEventListener("onReady", this.Z),
        this.g.addEventListener("onStateChange", this.K),
        this.g.addEventListener("onVolumeChange", this.ia),
        this.g.addEventListener("onSharePanelOpened", this.za));
        this.T = new Jg(1E3);
        this.O.h(this.T, "tick", this.Jf);
        this.T.start()
    }
    ;
    h.la = function() {
        this.aa && (this.g.removeEventListener("onAdStateChange", this.K),
        this.g.removeEventListener("onReady", this.Z),
        this.g.removeEventListener("onStateChange", this.K),
        this.g.removeEventListener("onVolumeChange", this.ia),
        this.g.removeEventListener("onSharePanelOpened", this.za));
        null != this.T && this.T.P()
    }
    ;
    h.Dd = function() {
        var a = yb(yp);
        N.La() && (a.ps = "gvn",
        a.remoteve = zn.w,
        a.remotevewin = "discover");
        var b = this.M
          , a = {
            playerVars: a,
            events: {
                cardstatechange: w(this.Tf, this),
                onError: w(this.Zf, this),
                onReady: w(this.Uc, this),
                onAdStateChange: w(this.Jb, this),
                onStateChange: w(this.Jb, this),
                onVolumeChange: w(this.Vc, this)
            }
        }
          , c = ea("YT");
        this.g = null != c && null != c.Player ? new c.Player(b,a) : null
    }
    ;
    var zp = function(a, b, c) {
        var d = {
            autoplay: "1"
        };
        N.La() && (d.dash = 0);
        if (null != a.l) {
            var e = a.l.w;
            null != e && (d.agcid = e);
            e = a.l.l;
            null != e && (d.adformat = e);
            e = a.l.o;
            null != e && (d.ad_query_id = e);
            (e = a.l.C) && (d.cta_conversion_urls = e);
            (e = a.l.A) && (d.endscreen_ad_tracking_data = e);
            (e = a.l.H) && (d.wait_for_vast_info_cards_xml = e);
            a.l.B && (d.is_pharma = 1);
            d.iv_load_policy = a.l.D ? 1 : 3;
            a.l.G && (d.noiba = 1);
            a.l.L && (d.utpsa = 1);
            a.l.F && (d.autoplay = "1")
        }
        null != b ? Mm(Hm, b) ? (e = b.match(/yt_vid\/([a-zA-Z0-9_-]{11})/),
        e = null != e && 1 < e.length ? e[1] : null) : e = null != b && Mm(Im, b) ? So(b) : null : e = null;
        null === e ? d.url_encoded_third_party_media = "url=" + encodeURIComponent(b) + "&type=" + encodeURIComponent(null === c ? "" : c) : d.videoId = e;
        !N.ga() && (d.enabled_engage_types = "3,4,5,6");
        a.w = !1;
        a.l && a.l.h ? (a.fa = d,
        a.g.preloadVideoByPlayerVars(a.fa)) : a.g.cueVideoByPlayerVars(d);
        Q(a, "loaded")
    };
    h = xp.prototype;
    h.Zf = function() {
        Q(this, "error")
    }
    ;
    h.Uc = function() {
        this.o = !0;
        this.H && this.oa(this.H.mg, this.H.Bd, this.H.jg);
        -1 != this.B && (this.fb(this.B),
        this.B = -1);
        null != this.J && (zp(this, this.J, this.W),
        this.W = this.J = null);
        -1 != this.I && (this.Ua(this.I),
        this.I = -1);
        this.Y && this.bb()
    }
    ;
    h.Tf = function() {
        Q(this, "cardsStateChange")
    }
    ;
    h.Jb = function(a) {
        switch (a.data) {
        case 0:
            this.w ? Q(this, "end") : Q(this, "error");
            break;
        case 1:
            this.w || (Ap(this),
            this.w = !0,
            this.F = 0,
            Q(this, "start"));
            Q(this, "play");
            Bp(this);
            this.A = new Jg(100);
            this.O.h(this.A, "tick", this.pa);
            this.A.start();
            break;
        case 2:
            Q(this, "pause"),
            Bp(this)
        }
    }
    ;
    h.Vc = function() {
        Q(this, "volumeChange")
    }
    ;
    h.ag = function() {
        Q(this, "shareClicked")
    }
    ;
    var Bp = function(a) {
        a.O.C(a.A, "tick", a.pa);
        null != a.A && (Kg(a.A),
        a.A = null)
    }
      , Ap = function(a) {
        null != a.va && m.clearTimeout(a.va)
    };
    xp.prototype.pa = function() {
        if (Og || tn()) {
            if (1.5 < this.ra() - this.F) {
                this.o && this.g.seekTo(this.F, !0);
                return
            }
            this.ra() > this.F && (this.F = this.ra())
        }
        Q(this, "timeUpdate")
    }
    ;
    xp.prototype.Da = function() {
        Q(this, "mediaLoadTimeout")
    }
    ;
    xp.prototype.oa = function(a, b, c) {
        if (b || c)
            this.o ? this.g.addInfoCardXml(a, b, c) : this.H = {
                mg: a,
                Bd: b,
                jg: c
            }
    }
    ;
    xp.prototype.N = function() {
        Bp(this);
        Ap(this);
        this.la();
        this.o = !1;
        this.O.P();
        this.I = -1;
        this.W = null;
        this.Y = !1;
        this.J = null;
        this.B = -1;
        this.Z = this.g = this.l = null;
        this.w = !1;
        this.ka = "";
        xp.R.N.call(this)
    }
    ;
    q("onYouTubeIframeAPIReady", function() {
        wp = !0;
        A(Ya, function(a) {
            a()
        });
        Za()
    }, window);
    var Cp = function(a) {
        P.call(this);
        this.g = a || "goog_" + Ma++;
        this.o = []
    };
    x(Cp, P);
    Cp.prototype.l = !1;
    Cp.prototype.connect = function() {
        for (this.l = !0; 0 != this.o.length; ) {
            var a = this.o.shift();
            this.sendMessage(a.name, a.type, a.data)
        }
    }
    ;
    var Qn = function(a, b, c, d) {
        a.l ? a.sendMessage(b, c, d) : a.o.push({
            name: b,
            type: c,
            data: d
        })
    }
      , Dp = function(a, b, c, d, e) {
        L.call(this, a);
        this.$ = b;
        this.U = c;
        this.ab = d;
        this.Wc = e
    };
    x(Dp, L);
    Dp.prototype.toString = function() {
        return ""
    }
    ;
    var Ep = function(a, b) {
        Cp.call(this, b);
        this.w = a;
        this.na = null;
        this.A = new W(this);
        this.A.h(I(), "message", this.B)
    };
    x(Ep, Cp);
    var Fp = function(a) {
        if (null == a || !r(a) || 0 != a.lastIndexOf("ima://", 0))
            return null;
        a = a.substr(6);
        try {
            return Xe(a)
        } catch (b) {
            return null
        }
    };
    Ep.prototype.sendMessage = function(a, b, c) {
        null != this.na && null != this.na.postMessage && this.na.postMessage(Gp(this, a, b, c), "*");
        null != this.na && null == this.na.postMessage && En(Bn.getInstance(), 11)
    }
    ;
    Ep.prototype.N = function() {
        this.A.P();
        Ep.R.N.call(this)
    }
    ;
    Ep.prototype.B = function(a) {
        a = a.g;
        var b = Fp(a.data);
        if (Hp(this, b)) {
            if (null == this.na)
                this.na = a.source,
                this.l || this.connect();
            else if (this.na != a.source)
                return;
            Hp(this, b) && Q(this, new Dp(b.name,b.type,b.data || {},b.sid,a.origin))
        }
    }
    ;
    var Gp = function(a, b, c, d) {
        var e = {};
        e.name = b;
        e.type = c;
        null != d && (e.data = d);
        e.sid = a.g;
        e.channel = a.w;
        return "ima://" + ff(e)
    }
      , Hp = function(a, b) {
        if (null == b)
            return !1;
        var c = b.channel;
        if (null == c || c != a.w)
            return !1;
        b = b.sid;
        return null == b || "*" != a.g && b != a.g ? !1 : !0
    };
    var Ip = function(a, b) {
        P.call(this);
        this.w = a;
        this.o = b;
        this.g = {};
        this.l = new W(this);
        this.l.h(I(), "message", this.A)
    };
    x(Ip, P);
    var Jp = function(a, b) {
        var c = b.g;
        a.g.hasOwnProperty(c) && Qn(a.g[c], b.type, b.$, b.U)
    }
      , Lp = function(a, b, c, d) {
        a.g.hasOwnProperty(b) || (c = new Ep(b,c),
        a.l.h(c, a.w, function(a) {
            Q(this, new Kp(a.type,a.$,a.U,a.ab,a.Wc,b))
        }),
        c.na = d,
        c.connect(),
        a.g[b] = c)
    };
    Ip.prototype.N = function() {
        this.l.P();
        for (var a in this.g)
            K(this.g[a]);
        Ip.R.N.call(this)
    }
    ;
    Ip.prototype.A = function(a) {
        a = a.g;
        var b = Fp(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.o && !this.g.hasOwnProperty(c)) {
                var d = b.sid;
                Lp(this, c, d, a.source);
                Q(this, new Kp(b.name,b.type,b.data || {},d,a.origin,c))
            }
        }
    }
    ;
    var Kp = function(a, b, c, d, e, f) {
        Dp.call(this, a, b, c, d, e);
        this.g = f
    };
    x(Kp, Dp);
    var Np = function() {
        var a = ea("google.ima.gptProxyInstance", I());
        if (null != a)
            return a;
        W.call(this);
        this.o = new Ip("gpt",!0);
        Ne(this, sa(K, this.o));
        this.h(this.o, "gpt", this.G);
        this.g = null;
        Mp() || I().top === I() || (this.g = new Ip("gpt",!1),
        Ne(this, sa(K, this.g)),
        this.h(this.g, "gpt", this.A))
    };
    x(Np, W);
    var Mp = function() {
        return !!ea("googletag.cmd", I())
    }
      , Op = function() {
        var a = ea("googletag.console", I());
        return null != a ? a : null
    };
    Np.prototype.G = function(a) {
        var b = a.Wc
          , c = "//imasdk.googleapis.com".match(Gd)
          , b = b.match(Gd);
        if (c[3] == b[3] && c[4] == b[4])
            if (null != this.g)
                Lp(this.g, a.g, a.ab, I().parent),
                null != this.g && Jp(this.g, a);
            else if (c = a.U,
            null != c && p(c.scope)) {
                var b = c.scope, c = c.args, d;
                if ("proxy" == b)
                    c = a.$,
                    "isGptPresent" == c ? d = Mp() : "isConsolePresent" == c && (d = null != Op());
                else if (Mp())
                    if ("pubads" == b || "companionAds" == b) {
                        d = a.$;
                        var e = I().googletag;
                        if (null != e && null != e[b] && (e = e[b](),
                        null != e && (d = e[d],
                        null != d)))
                            try {
                                var f = d.apply(e, c)
                            } catch (g) {}
                        d = f
                    } else if ("console" == b) {
                        if (e = a.$,
                        f = Op(),
                        null != f && (e = f[e],
                        null != e))
                            try {
                                e.apply(f, c)
                            } catch (g) {}
                    } else if (null === b) {
                        f = a.$;
                        d = I();
                        if (Xa(["googleGetCompanionAdSlots", "googleSetCompanionAdContents"], f) && (f = d[f],
                        null != f))
                            try {
                                e = f.apply(d, c)
                            } catch (g) {}
                        d = e
                    }
                p(d) && (a.U.returnValue = d,
                Jp(this.o, a))
            }
    }
    ;
    Np.prototype.A = function(a) {
        Jp(this.o, a)
    }
    ;
    var Qp = function(a, b) {
        var c = Array.prototype.slice.call(arguments)
          , d = c.shift();
        if ("undefined" == typeof d)
            throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, k, l, n, u, C) {
            if ("%" == n)
                return "%";
            var e = c.shift();
            if ("undefined" == typeof e)
                throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = e;
            return Pp[n].apply(null, arguments)
        })
    }
      , Pp = {
        s: function(a, b, c) {
            return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ? a + Ha(" ", Number(c) - a.length) : Ha(" ", Number(c) - a.length) + a
        },
        f: function(a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
            var f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= Number(a) && (d = f + d);
            if (isNaN(c) || d.length >= Number(c))
                return d;
            d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
            a = Number(c) - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ? f + d + Ha(" ", a) : f + Ha(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
        },
        d: function(a, b, c, d, e, f, g, k) {
            return Pp.f(parseInt(a, 10), b, c, d, 0, f, g, k)
        }
    };
    Pp.i = Pp.d;
    Pp.u = Pp.d;
    var Sp = function(a, b) {
        P.call(this);
        this.l = new W(this);
        this.H = !1;
        this.I = "goog_" + Ma++;
        this.F = new pf;
        var c = this.I
          , d = N.ha() ? (vd() ? "https:" : "http:") + Qp("//imasdk.googleapis.com/js/core/admob/bridge_%s.html", N.C) : (vd() ? "https:" : "http:") + Qp("//imasdk.googleapis.com/js/core/bridge3.168.0_%s.html", N.C);
        a: {
            var e = window;
            try {
                do {
                    try {
                        if (0 == e.location.href.indexOf(d) || 0 == e.document.referrer.indexOf(d)) {
                            var f = !0;
                            break a
                        }
                    } catch (g) {}
                    e = e.parent
                } while (e != e.top)
            } catch (g) {}
            f = !1
        }
        f && (d += "?f=" + c);
        c = Xc("IFRAME", {
            src: d + "#" + c,
            allowFullscreen: !0,
            style: "border:0; opacity:0; margin:0; padding:0; position:relative;"
        });
        en(this.l, c, "load", this.Hd, void 0);
        a.appendChild(c);
        this.o = c;
        this.D = Rp(this);
        this.B = b;
        this.g = this.B.h;
        this.w = this.A = null;
        this.l.h(this.D, "mouse", this.J);
        this.l.h(this.D, "touch", this.M);
        null != this.g && (this.l.h(this.D, "displayContainer", this.Od),
        this.l.h(this.D, "videoDisplay", this.K),
        this.l.h(this.D, "preloadVideoDisplay", this.Qd),
        this.l.h(this.g, pb(Wo), this.sa),
        this.l.h(this.g, gn, this.sa));
        a = I();
        b = ea("google.ima.gptProxyInstance", a);
        null == b && (b = new Np,
        q("google.ima.gptProxyInstance", b, a))
    };
    x(Sp, P);
    var Rp = function(a, b) {
        b = b || "*";
        var c = a.F.get(b);
        null == c && (c = new Ep(a.I,b),
        a.H && (c.na = bd(a.o),
        c.connect()),
        a.F.set(b, c));
        return c
    }
      , Tp = function(a, b) {
        null != a.g && (a.l.C(a.g, pb(Wo), a.sa),
        a.l.C(a.g, gn, a.sa));
        a.g = b;
        a.l.h(a.g, pb(Wo), a.sa);
        a.l.h(a.g, gn, a.sa)
    };
    Sp.prototype.N = function() {
        this.l.P();
        null !== this.w && (this.w.P(),
        this.w = null);
        of(this.F.Ca(!1), function(a) {
            a.P()
        });
        this.F.clear();
        $c(this.o);
        Sp.R.N.call(this)
    }
    ;
    Sp.prototype.J = function(a) {
        var b = a.U
          , c = md(this.o)
          , d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.$, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        if (!Sg || pn() || 0 == document.webkitIsFullScreen)
            this.o.blur(),
            window.focus();
        this.o.dispatchEvent(d)
    }
    ;
    var Up = function(a, b) {
        var c = md(a.o)
          , d = !!("TouchEvent"in window && 0 < TouchEvent.length);
        a = Sa(b, function(a) {
            return d ? new Touch({
                identifier: a.identifier,
                target: this.o,
                clientX: a.clientX,
                clientY: a.clientY,
                screenX: a.screenX,
                screenY: a.screenY,
                pageX: a.pageX + c.x,
                pageY: a.pageY + c.y
            }) : document.createTouch(window, this.o, a.identifier, a.pageX + c.x, a.pageY + c.y, a.screenX, a.screenY)
        }, a);
        return document.createTouchList.apply(document, a)
    };
    Sp.prototype.M = function(a) {
        var b = a.U
          , c = md(this.o);
        if ("TouchEvent"in window && 0 < TouchEvent.length) {
            var d = {
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: b.detail,
                ctrlKey: b.ctrlKey,
                altKey: b.altKey,
                shiftKey: b.shiftKey,
                metaKey: b.metaKey,
                touches: Up(this, b.touches),
                targetTouches: Up(this, b.targetTouches),
                changedTouches: Up(this, b.changedTouches)
            };
            d = new TouchEvent(a.$,d);
            this.o.dispatchEvent(d)
        } else
            d = document.createEvent("TouchEvent"),
            d.initTouchEvent(a.$, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, Up(this, b.touches), Up(this, b.targetTouches), Up(this, b.changedTouches), b.scale, b.rotation),
            this.o.dispatchEvent(d)
    }
    ;
    Sp.prototype.K = function(a) {
        if (null != this.g) {
            var b = a.U;
            switch (a.$) {
            case "startTracking":
                this.g.Ga();
                break;
            case "stopTracking":
                this.g.la();
                break;
            case "exitFullscreen":
                this.g.xc();
                break;
            case "play":
                this.g.bb();
                break;
            case "pause":
                this.g.Kc();
                break;
            case "load":
                this.g.load(b.videoUrl, b.mimeType);
                break;
            case "setCurrentTime":
                this.g.Ua(b.currentTime);
                break;
            case "setPlaybackOptions":
                this.g.Pb(Vp(b));
                break;
            case "setVolume":
                this.g.fb(b.volume)
            }
        }
    }
    ;
    var Vp = function(a) {
        a = a.playbackOptions;
        return new vp(a.adFormat,a.adSenseAgcid,a.ctaAnnotationTrackingEvents,a.showAnnotations,a.viewCountsDisabled,a.loadVideoTimeout,a.ibaDisabled,a.enablePreloading,a.adQemId,a.isPharma,a.useAutoplayFlag,a.endscreenAdTracking,a.waitForVastInfoCardsXml)
    };
    h = Sp.prototype;
    h.Qd = function(a) {
        if (null != this.A) {
            var b = a.U;
            switch (a.$) {
            case "startTracking":
                this.A.Ga();
                break;
            case "stopTracking":
                this.A.la();
                break;
            case "setPlaybackOptions":
                this.A.Pb(Vp(b));
                break;
            case "load":
                this.A.load(b.videoUrl, b.mimeType)
            }
        }
    }
    ;
    h.sa = function(a) {
        var b = {};
        switch (a.type) {
        case "beginFullscreen":
            a = "fullscreen";
            break;
        case "endFullscreen":
            a = "exitFullscreen";
            break;
        case "click":
            a = "click";
            break;
        case "end":
            a = "end";
            break;
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        case "mediaLoadTimeout":
            a = "mediaLoadTimeout";
            break;
        case "pause":
            a = "pause";
            b.ended = this.g.ib();
            break;
        case "play":
            a = "play";
            break;
        case "skip":
            a = "skip";
            break;
        case "start":
            a = "start";
            break;
        case "timeUpdate":
            a = "timeupdate";
            b.currentTime = this.g.ra();
            b.duration = this.g.Ra();
            break;
        case "volumeChange":
            a = "volumeChange";
            b.volume = this.g.Ic();
            break;
        case "loadedmetadata":
            a = a.type;
            b.duration = this.g.Ra();
            break;
        case "abort":
        case "canplay":
        case "canplaythrough":
        case "durationchange":
        case "emptied":
        case "loadstart":
        case "loadeddata":
        case "progress":
        case "ratechange":
        case "seeked":
        case "seeking":
        case "stalled":
        case "suspend":
        case "waiting":
            a = a.type;
            break;
        default:
            return
        }
        Qn(this.D, "videoDisplay", a, b)
    }
    ;
    h.Od = function(a) {
        switch (a.$) {
        case "showVideo":
            null != this.w ? this.w.la() : (this.w = new Mo,
            this.l.h(this.w, "click", this.dg));
            this.w.Ga(Wp(this.B));
            a = this.B;
            null != a.g && a.g.show();
            break;
        case "hide":
            null !== this.w && (this.w.P(),
            this.w = null);
            a = this.B;
            null != a.g && lp(a.g.g, !1);
            break;
        case "getPreloadDisplay":
            null != this.g && null == this.A && (this.A = this.B.G);
            break;
        case "swapVideoDisplays":
            if (null != this.g && null != this.A) {
                this.l.C(this.g, pb(Wo), this.sa);
                this.l.C(this.g, gn, this.sa);
                a = this.B;
                if (a.g && a.h && a.o && a.G) {
                    var b = a.h;
                    a.h = a.G;
                    a.G = b;
                    b = a.g;
                    a.g = a.o;
                    a.o = b;
                    a.F && a.h instanceof Xo && up(a.F, a.h.g);
                    null != a.A && Tp(a.A, a.h)
                }
                this.g = this.B.h;
                this.A = this.B.G;
                this.l.h(this.g, pb(Wo), this.sa);
                this.l.h(this.g, gn, this.sa)
            }
        }
    }
    ;
    h.dg = function() {
        Qn(this.D, "displayContainer", "videoClick")
    }
    ;
    h.Hd = function() {
        of(this.F.Ca(!1), function(a) {
            a.na = bd(this.o);
            a.connect()
        }, this);
        this.H = !0
    }
    ;
    var Yp = function(a, b, c, d, e) {
        if (!(e || null != a && ad(Qc(a), a)))
            throw Tm(Sm, null, "containerElement", "element");
        this.J = !1;
        this.B = a;
        var f = null != b || null != d;
        if (!f && N.g)
            throw Tm(Qm, null, "Custom video element was not provided even though the setting restrictToCustomPlayback is set to true.");
        Em(Bm(), 136961005) && (N.l = !0);
        this.H = Xp(b ? b : null);
        var g = f;
        e = !1;
        if (N.l) {
            N.g || wn(this.H) && f || (g = !1);
            if (f = !g)
                f = N.l && !N.ha() && !0 && !N.ga() && (nn() || N.g);
            f && (N.O = !0);
            xn() && (e = !0)
        } else
            N.g || wn(this.H) && f || (xn() && (e = !0),
            g = !1);
        this.D = g;
        this.W = (this.ca = e) || g && null != d;
        g = Xc("DIV", {
            style: "position:absolute"
        });
        a.insertBefore(g, a.firstChild);
        this.l = g;
        this.g = !this.D && this.l && nn() ? new kp(this.l,null,!0) : null;
        g = a = null;
        this.D ? b ? (a = new Xo(b),
        g = b) : d && (a = new xp(d)) : this.g && (a = new Xo(this.g.h),
        g = this.g.h);
        f = null;
        g && N.La() && e && (f = new tp(g));
        this.F = f;
        this.h = a;
        this.G = this.o = null;
        e = Rb && !sn(4);
        a = on() && nn();
        (N.ha() || this.g && this.h && this.l && !this.D && N.o && !un() && !e && !a) && this.l && (this.o = new kp(this.l,null,!0),
        this.G = new Xo(this.o.h));
        this.C = this.h ? c || null : null;
        this.X = null != this.C;
        En(Bn.getInstance(), 8, {
            enabled: this.D,
            yt: null != d,
            customClick: null != this.C
        });
        null === this.l ? (b = this.B,
        N.w = b) : this.D && b ? v(b.getBoundingClientRect) || (b = this.B,
        N.w = b) : b = this.l;
        this.I = b;
        this.A = null != this.l ? new Sp(this.l,this) : null;
        this.L = new H(0,0)
    };
    Yp.prototype.O = function() {
        this.J = !0;
        if (null != this.g) {
            var a = this.g;
            a.h && (a = a.h,
            nn() && a.load())
        }
        null != this.o && (a = this.o,
        a.h && (a = a.h,
        nn() && a.load()))
    }
    ;
    Yp.prototype.M = function() {
        K(this.g);
        K(this.o);
        K(this.A);
        K(this.h);
        K(this.G);
        K(this.F);
        $c(this.l)
    }
    ;
    var Wp = function(a) {
        return a.X && a.C ? a.C : null != a.g ? a.g.l : null
    };
    Yp.prototype.w = function() {
        return this.D
    }
    ;
    Yp.prototype.T = function() {
        return this.ca
    }
    ;
    Yp.prototype.K = function() {
        return this.W
    }
    ;
    Yp.prototype.setSize = function(a, b) {
        var c = this.l;
        null != c && (-1 == a ? (c.style.right = "0",
        c.style.left = "0") : c.style.width = a + "px",
        -1 == b ? (c.style.bottom = "0",
        c.style.top = "0") : c.style.height = b + "px");
        null != this.A && (c = this.A,
        c.o.width = -1 == a ? "100%" : a,
        c.o.height = -1 == b ? "100%" : b);
        this.L = new H(a,b)
    }
    ;
    var Xp = function(a) {
        return null != a && v(a.getAttribute) && null != a.getAttribute("playsinline") ? !0 : !1
    };
    var Zp = Ob && "srcdoc"in document.createElement("iframe")
      , $p = Nb || Ob || E && F(11)
      , aq = function(a, b) {
        a.open("text/html", "replace");
        a.write(b);
        a.close()
    }
      , fq = function(a, b) {
        E && F(7) && !F(10) && 6 > bq() && cq(b) && (b = dq(b));
        var c = function() {
            a.contentWindow.goog_content = b;
            a.contentWindow.location.replace("javascript:window.goog_content")
        }, d;
        if (d = E) {
            try {
                var e = qd(a.contentWindow)
            } catch (f) {
                e = !1
            }
            d = !e
        }
        d ? eq(a, c) : c()
    }
      , bq = function() {
        var a = navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
        return a ? parseFloat(a[1]) : 0
    }
      , gq = 0
      , eq = function(a, b) {
        var c = "goog_rendering_callback" + gq++;
        m[c] = b;
        a.src = "javascript:'<script>(function() {document.domain = \"" + document.domain + '";var continuation = window.parent.' + c + ";window.parent." + c + " = null;continuation();})()\x3c/script>'"
    }
      , cq = function(a) {
        for (var b = 0; b < a.length; ++b)
            if (127 < a.charCodeAt(b))
                return !0;
        return !1
    }
      , dq = function(a) {
        a = unescape(encodeURIComponent(a));
        for (var b = Math.floor(a.length / 2), c = [], d = 0; d < b; ++d)
            c[d] = String.fromCharCode(256 * a.charCodeAt(2 * d + 1) + a.charCodeAt(2 * d));
        1 == a.length % 2 && (c[b] = a.charAt(a.length - 1));
        return c.join("")
    };
    var hq = function(a, b) {
        this.o = a;
        this.l = null;
        this.D = "";
        this.F = 0;
        this.w = this.g = null;
        this.J = b;
        this.B = null;
        this.A = ""
    };
    x(hq, P);
    hq.prototype.I = function(a) {
        try {
            var b = a.g.data;
            try {
                var c = Xe(b)
            } catch (Mc) {
                return
            }
            var d = c.session;
            if (null != d && this.A == d) {
                if ("friendlyReady" == c.type) {
                    var e = iq(this);
                    if ((Lj() || Kj()) && null != e) {
                        this.l = e;
                        this.D = e.currentSrc;
                        this.F = e.currentTime;
                        var f = this.o;
                        null != f.g && f.g.show()
                    } else {
                        var g = this.o.B
                          , k = this.o.L;
                        var l = "border: 0; margin: 0; padding: 0; position: absolute; " + ("width:" + k.width + "px; ");
                        l += "height:" + k.height + "px;";
                        this.l = Xc("VIDEO", {
                            style: l
                        });
                        null != iq(this) && t(iq(this).volume) && (this.l.volume = iq(this).volume);
                        g.appendChild(this.l)
                    }
                    var n = this.o.B;
                    a = "border: 0; margin: 0; padding: 0;position: absolute; ";
                    var u = this.l;
                    b: {
                        var C = Qc(u);
                        if (C.defaultView && C.defaultView.getComputedStyle) {
                            var T = C.defaultView.getComputedStyle(u, null);
                            if (T) {
                                var qa = T.display || T.getPropertyValue("display") || "";
                                break b
                            }
                        }
                        qa = ""
                    }
                    if ("none" != (qa || (u.currentStyle ? u.currentStyle.display : null) || u.style && u.style.display))
                        var Z = pd(u);
                    else {
                        var da = u.style
                          , Yb = da.display
                          , zc = da.visibility
                          , Id = da.position;
                        da.visibility = "hidden";
                        da.position = "absolute";
                        da.display = "inline";
                        var We = pd(u);
                        da.display = Yb;
                        da.position = Id;
                        da.visibility = zc;
                        Z = We
                    }
                    a += "width:" + Z.width + "px; ";
                    a += "height:" + Z.height + "px;";
                    this.w = Xc("DIV", {
                        style: a
                    });
                    n.appendChild(this.w);
                    try {
                        this.g.contentWindow.loader.initFriendly(this.l, this.w)
                    } catch (Mc) {
                        jq(this)
                    }
                }
                Qn(this.J, "vpaid", "", b)
            }
        } catch (Mc) {
            jq(this)
        }
    }
    ;
    var jq = function(a) {
        var b = {
            type: "error"
        };
        b.session = a.A;
        a = ff(b);
        window.postMessage(a, "*")
    }
      , iq = function(a) {
        a = a.o.h;
        return a instanceof Xo && a.g instanceof HTMLVideoElement ? a.g : null
    };
    hq.prototype.N = function() {
        P.R.N.call(this);
        K(this.H);
        this.H = null;
        $c(this.w);
        this.w = null;
        $c(this.g);
        this.g = null;
        var a = iq(this);
        (Lj() || Kj()) && null != a ? (a.src = this.D,
        a.currentTime = this.F,
        a = this.o,
        null != a.g && lp(a.g.g, !1)) : ($c(this.l),
        this.l = null)
    }
    ;
    var X = function(a, b, c, d, e, f) {
        P.call(this);
        this.g = a;
        this.M = b;
        this.za = d;
        this.w = null;
        this.da = f;
        this.W = !1;
        this.T = 1;
        this.va = c;
        this.ka = this.ea = this.aa = -1;
        this.B = this.o = null;
        this.I = new Ro;
        this.pa = !1;
        this.Y = new pf;
        this.Z = this.oa = !1;
        this.A = this.l = this.D = null;
        this.fa = e && null != this.g.C;
        this.O = w(this.Md, this);
        this.K = new W(this);
        this.K.h(this.da, "adsManager", this.Da)
    };
    x(X, P);
    X.prototype.Da = function(a) {
        switch (a.$) {
        case "error":
            kq(this, a.U);
            break;
        case "contentPauseRequested":
            var b = this.g.h;
            this.g.w() && null != this.w && this.w.restoreCustomPlaybackStateOnAdBreakComplete && null != b.$c && b.$c();
            this.H(a.$, a.U);
            break;
        case "contentResumeRequested":
            a = w(X.prototype.H, this, a.$, a.U);
            b = this.g.h;
            this.g.w() && null != this.w && this.w.restoreCustomPlaybackStateOnAdBreakComplete && null != b.Yc ? b.Yc(a) : a();
            break;
        case "remainingTime":
            b = a.U;
            this.aa = b.currentTime;
            this.ea = b.duration;
            this.ka = b.remainingTime;
            break;
        case "skip":
            this.H(a.$, a.U);
            break;
        case "log":
            var b = a.U
              , c = b.adData;
            this.H(a.$, c, b.logData);
            break;
        case "companionBackfill":
            a = ea("window.google_show_companion_ad");
            null != a && a();
            break;
        case "skipshown":
            this.W = !0;
            this.H(a.$, a.U);
            break;
        case "vpaidEvent":
            try {
                var d = a.U;
                switch (d.vpaidEventType) {
                case "createFriendlyIframe":
                    b = this.D = new hq(this.g,this.da);
                    b.A = d.session;
                    a = "about:self";
                    E && (a = "");
                    b.g = Xc("IFRAME", {
                        src: a,
                        allowtransparency: !0,
                        background: "transparent"
                    });
                    c = b.g;
                    a = {
                        display: "none",
                        width: "0",
                        height: "0"
                    };
                    if (r(a)) {
                        var e = gd(c, a);
                        e && (c.style[e] = void 0)
                    } else
                        for (var f in a) {
                            var e = c
                              , g = a[f]
                              , k = gd(e, f);
                            k && (e.style[k] = g)
                        }
                    b.o.B.appendChild(b.g);
                    var l = '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>' + ('loader = new VPAIDLoader(false, "' + b.A + '");') + "\x3c/script></body>";
                    null == b.B && (b.B = new W(b));
                    b.B.h(window, "message", b.I);
                    if (Rg || Ng || Mb) {
                        var n = b.g;
                        $p ? aq(n.contentWindow.document, l) : fq(n, l)
                    } else {
                        var u = b.g;
                        Zp ? u.srcdoc = l : $p ? aq(u.contentWindow.document, l) : fq(u, l)
                    }
                    break;
                case "destroyFriendlyIframe":
                    null != this.D && (this.D.P(),
                    this.D = null)
                }
            } catch (C) {
                kq(this, C.U)
            }
            break;
        case "skippableStateChanged":
            b = a.U;
            c = b.adData;
            null != c.skippable && (this.W = c.skippable);
            this.H(a.$, a.U);
            break;
        case "initInsecureFlashVpaid":
            this.o = a = null != a.U.adData ? new V(a.U.adData) : null;
            a = a.Ec();
            this.A = Xc("DIV", {
                style: "position:absolute;visibility:visible;width:100%;height:100%;top:0;left:0;"
            });
            this.g.B.appendChild(this.A);
            this.l = new Jo(this.A);
            this.K.h(this.l, "loadError", this.Qa);
            this.K.h(this.l, "vpaidEventType", this.ia);
            b = null != this.w ? this.w.loadVideoTimeout : zo();
            this.l.load(a, this.g.L.width, this.g.L.height, b);
            break;
        case "destroyInsecureFlashVpaid":
            null !== this.l && (this.l.P(),
            this.l = null);
            null !== this.A && (Zc(this.A),
            this.A = null);
            break;
        case "callFlashVpaidMethod":
            if (null !== this.l) {
                b = [];
                c = a.U.methodData;
                a = c.methodName;
                c = c.args;
                b.push(a);
                for (f = 0; f < c.length; f++)
                    b.push(c[f]);
                (b = this.l.tb.apply(this.l, b)) && this.ia(new Io("flashVpaidMethodResults",{
                    methodName: a,
                    result: b
                }))
            }
            break;
        case "cacheAbandonUrls":
            break;
        default:
            this.H(a.$, a.U)
        }
    }
    ;
    X.prototype.Qa = function() {
        this.ia(new Io("AdError",{
            message: "Flash VPAID loader failed to load."
        }))
    }
    ;
    X.prototype.ia = function(a) {
        var b = a.g;
        a = a.data;
        "flashReady" == b ? (this.l.tb("handshakeVersion", "2.0"),
        this.l.tb("initAd", this.g.L.width, this.g.L.height, "normal", -2, this.o.Fc())) : lq(this, "onFlashVpaidEvent", {
            eventType: b,
            data: a
        })
    }
    ;
    X.prototype.H = function(a, b, c) {
        if (null == b.companions) {
            var d = this.Y.get(b.adId);
            b.companions = null != d ? d : []
        }
        this.o = d = null != b.adData ? new V(b.adData) : null;
        switch (a) {
        case "adBreakReady":
        case "trackingUrlPinged":
        case "mediaUrlPinged":
            a = new M(a,null,b);
            break;
        case "adMetadata":
            a = null;
            null != b.adCuePoints && (a = new vo(b.adCuePoints));
            a = new yo(d,a);
            break;
        case "allAdsCompleted":
            this.o = null;
            this.oa = !0;
            a = new M(a,d);
            break;
        case "contentPauseRequested":
            this.Z = !1;
            a = new M(a,d);
            break;
        case "contentResumeRequested":
            this.o = null;
            this.Z = !0;
            a = new M(a,d);
            break;
        case "loaded":
            this.aa = 0;
            this.ea = d.xb();
            this.ka = d.xb();
            c = Hn();
            var e = this.O
              , f = this.za
              , g = jl.getInstance();
            c.l.set(bn(d), e);
            c.D && c.o && (R.getInstance().o = !0,
            g.h = c.o);
            c.B && Nn(c, "loaded", bn(d), f);
            a = new M(a,d,b.adData);
            break;
        case "start":
            this.Y.set(b.adId, b.companions);
            null != Wp(this.g) && (null != this.B ? this.B.la() : (this.B = new Mo,
            this.K.h(this.B, "click", this.Xf)),
            this.B.Ga(Wp(this.g)));
            a = new M(a,d);
            break;
        case "complete":
            null != this.B && this.B.la();
            Pn(Hn(), this.O, bn(d));
            this.o = null;
            this.Y.Ia(b.adId);
            a = new M(a,d);
            break;
        case "log":
            b = null;
            null != c && null != c.type ? (e = c.type,
            e = "adLoadError" == e || "adPlayError" == e) : e = !1;
            e && (b = {
                adError: mq(c)
            });
            a = new M(a,d,b);
            break;
        case "urlNavigationRequested":
            a = new M(a,d,b.urlNavigationData);
            break;
        default:
            a = new M(a,d)
        }
        Q(this, a);
        this.oa && this.Z && this.Gc()
    }
    ;
    var kq = function(a, b) {
        var c = new Pe(mq(b));
        a.pa ? (Q(a, c),
        a.o && Pn(Hn(), a.O, bn(a.o)),
        a.o = null) : a.I.h.push(c);
        En(Bn.getInstance(), 7, {
            error: b.errorCode
        }, !0)
    }
      , mq = function(a) {
        var b = new Le(a.type,a.errorMessage,a.errorCode);
        null != a.innerError && (b.g = Error(a.innerError));
        return b
    }
      , lq = function(a, b, c) {
        Qn(a.da, "adsManager", b, c)
    };
    h = X.prototype;
    h.Sc = function() {
        lq(this, "contentTimeUpdate", {
            currentTime: this.F.currentTime
        })
    }
    ;
    h.cf = function() {
        lq(this, "sendImpressionUrls")
    }
    ;
    h.$e = function(a, b, c, d) {
        if (this.I.isEmpty()) {
            var e = this.g;
            null != d && (En(Bn.getInstance(), 54, {}, !0),
            e.H = Xp(d),
            N.g || wn(e.H) ? (e.D = !0,
            K(e.g),
            K(e.o),
            K(e.G),
            e.g = null,
            e.o = null,
            e.G = null,
            K(e.h),
            e.h = new Xo(d),
            null !== e.l && (v(d.getBoundingClientRect) ? e.I = d : (e.I = e.B,
            N.w = e.I)),
            null != e.A && Tp(e.A, e.h),
            e.F && up(e.F, d)) : e.D = !1);
            this.pa = !0;
            this.Hc(a, b, c);
            lq(this, "init", {
                width: a,
                height: b,
                viewMode: c
            })
        } else {
            for (; !this.I.isEmpty(); )
                b = a = this.I,
                0 == b.g.length && (b.g = b.h,
                b.g.reverse(),
                b.h = []),
                a = a.g.pop(),
                Q(this, a);
            this.P()
        }
    }
    ;
    h.Of = function() {
        return this.g.w()
    }
    ;
    h.Nf = function() {
        return this.fa
    }
    ;
    h.Ye = function() {
        return this.ka
    }
    ;
    h.Ve = function() {
        return this.W
    }
    ;
    h.Ed = function() {
        lq(this, "discardAdBreak")
    }
    ;
    h.hg = function() {
        lq(this, "requestNextAdBreak")
    }
    ;
    h.gf = function(a) {
        null != a && (this.w = a,
        lq(this, "updateAdsRenderingSettings", {
            adsRenderingSettings: nq(this)
        }))
    }
    ;
    h.Md = function() {
        var a = null != this.o ? this.o.g.vpaid : !1
          , b = this.g.h
          , c = null != b ? b.ra() : this.aa
          , d = null != b ? b.Ra() : this.ea;
        return {
            currentTime: c,
            duration: d,
            isPlaying: null != b ? b.Pc() : !1,
            isVpaid: a,
            isYouTube: N.ga(),
            volume: this.T
        }
    }
    ;
    h.df = function() {
        lq(this, "skip")
    }
    ;
    h.start = function() {
        if (this.M && !N.ha()) {
            !on() || N.ga() || En(Bn.getInstance(), 50, {
                customPlayback: this.g.w()
            });
            nn() && !this.g.J && En(Bn.getInstance(), 26, {
                adtagurl: this.M,
                customPlayback: this.g.w()
            });
            Rh(this.g.l) && En(Bn.getInstance(), 30, {
                adtagurl: this.M,
                customPlayback: this.g.w()
            });
            var a = this.g.C, b = this.g.l, c;
            if (c = a && b && !Rh(a))
                a = Ln(a),
                b = Ln(b),
                c = 0 < a.width && 0 < a.height && 0 < b.width && 0 < b.height && a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
            c && En(Bn.getInstance(), 31, {
                adtagurl: this.M,
                customPlayback: this.g.w()
            })
        }
        if (nn() && !this.g.J && !this.g.w())
            throw Tm(Rm);
        b = this.g;
        b.X = this.fa && null != b.C;
        this.g.A.o.style.opacity = 1;
        null != this.F && 1 == this.T && ("boolean" == typeof this.F.muted && this.F.muted ? this.yb(0) : t(this.F.volume) && (b = this.F.volume,
        0 <= b && 1 >= b && this.yb(this.F.volume)));
        lq(this, "start")
    }
    ;
    h.Xf = function() {
        if ((null == this.w || !this.w.disableClickThrough) && null != this.o) {
            var a = this.o.g.clickThroughUrl;
            null != a && (wa(Ja(a)) || window.open(a, "_blank"))
        }
    }
    ;
    h.Hc = function(a, b, c) {
        if (null !== this.l) {
            var d = this.l;
            d.g && d.g.setSize(a, b);
            od(this.A, a, b)
        }
        this.g.setSize(a, b);
        lq(this, "resize", {
            width: a,
            height: b,
            viewMode: c
        })
    }
    ;
    h.ff = function() {
        lq(this, "stop")
    }
    ;
    h.Ue = function() {
        lq(this, "expand")
    }
    ;
    h.Te = function() {
        lq(this, "collapse")
    }
    ;
    h.Ze = function() {
        return this.T
    }
    ;
    h.yb = function(a) {
        this.T = a;
        if (!N.ha()) {
            var b = this.g.h;
            null != b && b.fb(a)
        }
        lq(this, "volume", {
            volume: a
        })
    }
    ;
    h.af = function() {
        lq(this, "pause")
    }
    ;
    h.bf = function() {
        lq(this, "resume")
    }
    ;
    h.Gc = function() {
        null != this.D && (this.D.P(),
        this.D = null);
        null !== this.l && (this.l.P(),
        this.l = null);
        null !== this.A && (Zc(this.A),
        this.A = null);
        this.P()
    }
    ;
    h.We = function() {
        return this.va
    }
    ;
    h.Xe = function() {
        return this.o
    }
    ;
    h.N = function() {
        lq(this, "destroy");
        null != this.B && this.B.P();
        this.K.P();
        this.I.clear();
        this.J && (Kg(this.J.g),
        this.J.P());
        Pn(Hn(), this.O);
        X.R.N.call(this)
    }
    ;
    var nq = function(a) {
        var b = {};
        null != a.w && Ab(b, a.w);
        a.fa && (N.ga() ? b.useVideoAdUi = !1 : b.useClickElement = !1,
        b.disableClickThrough = !0);
        return b
    };
    var oq = function(a, b, c) {
        L.call(this, "adsManagerLoaded");
        this.g = a;
        this.A = b;
        this.F = c || ""
    };
    x(oq, L);
    oq.prototype.G = function(a, b) {
        var c = this.g;
        c.F = a;
        null != b && (c.w = b);
        null != a.currentTime && (c.J = new xo(a),
        c.J.h("currentTimeUpdate", c.Sc, !1, c),
        c.J.start(),
        c.Sc());
        lq(c, "configure", {
            adsRenderingSettings: nq(c)
        });
        return this.g
    }
    ;
    oq.prototype.D = function() {
        return this.A
    }
    ;
    oq.prototype.B = function() {
        return this.F
    }
    ;
    var pq;
    if (pq = !nb(function(a) {
        return a.match(I().location.href)
    })) {
        var qq = document;
        pq = null == Wa(qq.querySelectorAll && qq.querySelector ? qq.querySelectorAll("SCRIPT") : qq.getElementsByTagName("SCRIPT"), function(a) {
            return nb(function(b) {
                return b.match(a.src)
            })
        })
    }
    if (pq)
        throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
    var rq = function(a) {
        P.call(this);
        this.g = a;
        this.w = new pf;
        this.l = this.g.A;
        this.A = new W(this);
        this.l && (a = Hn(),
        Kn(a, Rp(this.l)),
        this.o = On(a, this.g.I));
        a: {
            try {
                var b = window.top.location.href
            } catch (c) {
                b = 2;
                break a
            }
            b = null != b ? b == window.document.location.href ? 0 : 1 : 2
        }
        zn.l = b
    };
    x(rq, P);
    h = rq.prototype;
    h.N = function() {
        this.A.P();
        Hn().A.Ia(this.o);
        rq.R.N.call(this)
    }
    ;
    h.Lf = function() {
        this.P()
    }
    ;
    h.Mf = function(a, b) {
        a.adTagUrl && En(Bn.getInstance(), 8, {
            adtagurl: a.adTagUrl,
            customPlayback: this.g.w(),
            customClick: null != this.g.C,
            restrict: N.g
        });
        var c = ""
          , d = Vd()
          , e = d.h
          , f = d.g;
        e && e.url ? c = e.url : f && f.url && (c = f.url);
        a.location = c;
        a.referrer = window.document.referrer;
        a.supportsYouTubeHosted = this.g.K();
        var g = a.adTagUrl
          , k = this.g.B
          , l = []
          , n = ""
          , u = "";
        if (null != k) {
            for (var C = k, T = [], qa = 0; C && 25 > qa; ++qa) {
                a: {
                    if (C && C.nodeName && C.parentElement)
                        for (var Z = C.nodeName.toString().toLowerCase(), da = C.parentElement.childNodes, Yb = 0, zc = 0; zc < da.length; ++zc) {
                            var Id = da[zc];
                            if (Id.nodeName && Id.nodeName.toString().toLowerCase() === Z) {
                                if (C === Id) {
                                    var We = "." + Yb;
                                    break a
                                }
                                ++Yb
                            }
                        }
                    We = ""
                }
                T.push((C.nodeName && C.nodeName.toString().toLowerCase()) + "" + We);
                C = C.parentElement
            }
            n = T.join();
            if (k) {
                var Mc = k.ownerDocument
                  , Nc = Mc && (Mc.defaultView || Mc.parentWindow) || null
                  , yl = [];
                if (Nc)
                    try {
                        for (var Jd = Nc.parent, zl = 0; Jd && Jd !== Nc && 25 > zl; ++zl) {
                            for (var Al = Jd.frames, Ye = 0; Ye < Al.length; ++Ye)
                                if (Nc === Al[Ye]) {
                                    yl.push(Ye);
                                    break
                                }
                            Nc = Jd;
                            Jd = Nc.parent
                        }
                    } catch (sq) {}
                u = yl.join()
            } else
                u = ""
        }
        l.push(n, u);
        if (null != g) {
            for (var th = 0; th < Ke.length - 1; ++th)
                l.push(Rd(g, Ke[th]) || "");
            var Bl = Rd(g, "videoad_start_delay")
              , Cl = "";
            if (Bl)
                var Dl = parseInt(Bl, 10)
                  , Cl = 0 > Dl ? "postroll" : 0 == Dl ? "preroll" : "midroll";
            l.push(Cl)
        } else
            for (var El = 0; El < Ke.length; ++El)
                l.push("");
        var Fl = l.join(":")
          , Gl = Fl.length;
        if (0 == Gl)
            var Hl = 0;
        else {
            for (var Oc = 305419896, uh = 0; uh < Gl; uh++)
                Oc ^= (Oc << 5) + (Oc >> 2) + Fl.charCodeAt(uh) & 4294967295;
            Hl = 0 < Oc ? Oc : 4294967296 + Oc
        }
        a.videoAdKey = Hl.toString();
        var Il = a.adTagUrl;
        if (null != Il && "ca-pub-6219811747049371" != Rd(Il, "client"))
            var Jl = null;
        else {
            var Kl = ea("window.yt.util.activity.getTimeSinceActive");
            Jl = null != Kl ? Kl().toString() : null
        }
        var Ll = Jl;
        null != Ll && (a.lastActivity = Ll);
        var Ml = a.adTagUrl;
        if (null == Ml)
            var Nl = !1;
        else {
            var Ol = new tf(Ml)
              , Pl = Ol.C
              , Ql = Ol.g
              , vh = Ql.length - 27;
            Nl = 0 <= vh && Ql.indexOf("googleads.g.doubleclick.net", vh) == vh && (wa(Ja(Pl)) ? !1 : /\/pagead\/(live\/)?ads/.test(Pl))
        }
        if (Nl) {
            var tb = window
              , la = Fd().document
              , Ia = {};
            var gb = xe(tb).Vb;
            var Kd = gb.location.href;
            if (gb == gb.top)
                var Rl = {
                    url: Kd,
                    Qc: !0
                };
            else {
                var wh = !1
                  , xh = gb.document;
                xh && xh.referrer && (Kd = xh.referrer,
                gb.parent == gb.top && (wh = !0));
                var yh = gb.location.ancestorOrigins;
                if (yh) {
                    var zh = yh[yh.length - 1];
                    zh && -1 == Kd.indexOf(zh) && (wh = !1,
                    Kd = zh)
                }
                Rl = {
                    url: Kd,
                    Qc: wh
                }
            }
            var tq = Rl;
            a: {
                var Kb = Fd()
                  , Sl = tb.o || Kb.o
                  , Tl = tb.l || Kb.l;
                if (Kb && Kb.top == Kb)
                    var Ah = !1;
                else {
                    var Ze = la.documentElement;
                    if (Sl && Tl) {
                        var $e = 1
                          , af = 1;
                        Kb.innerHeight ? ($e = Kb.innerWidth,
                        af = Kb.innerHeight) : Ze && Ze.clientHeight ? ($e = Ze.clientWidth,
                        af = Ze.clientHeight) : la.body && ($e = la.body.clientWidth,
                        af = la.body.clientHeight);
                        if (af > 2 * Tl || $e > 2 * Sl) {
                            Ah = !1;
                            break a
                        }
                    }
                    Ah = !0
                }
            }
            var Lb = Ah;
            var uq = tq.Qc
              , Bh = Fd()
              , bf = Bh.top == Bh ? 0 : qd(Bh.top) ? 1 : 2
              , Pc = 4;
            Lb || 1 != bf ? Lb || 2 != bf ? Lb && 1 == bf ? Pc = 7 : Lb && 2 == bf && (Pc = 8) : Pc = 6 : Pc = 5;
            uq && (Pc |= 16);
            var Ch = !!tb.g;
            Ia.iframing = "" + Pc;
            if (!Ch && "ad.yieldmanager.com" == la.domain) {
                for (var Ld = la.URL.substring(la.URL.lastIndexOf("http")); -1 < Ld.indexOf("%"); )
                    try {
                        Ld = decodeURIComponent(Ld)
                    } catch (sq) {
                        break
                    }
                tb.g = Ld;
                Ch = !!Ld
            }
            Je || (Je = Ae());
            var cf = Je;
            var Ul = cf.g.hasOwnProperty(92) ? cf.g[92] : "";
            if (Ch)
                Ia.page_url = tb.g,
                Ia.page_location = (Lb ? la.referrer : la.URL) || "EMPTY";
            else if (Ul && Lb && qd(tb.top) && tb.top.document.referrer === la.referrer)
                if ("21060298" === Ul) {
                    var Vl = tb.top.document.URL;
                    Ia.page_url = Vl;
                    Ia.page_location = null;
                    cf.h["21060300"] = !0;
                    ce(pe, "pgtar", {
                        nurl: Vl,
                        ourl: la.referrer,
                        v: 2
                    }, !0, 1, void 0)
                } else
                    cf.h["21060299"] = !0,
                    Ia.page_url = Lb ? la.referrer : la.URL,
                    Ia.page_location = null;
            else
                Ia.page_url = Lb ? la.referrer : la.URL,
                Ia.page_location = null;
            Ia.last_modified_time = la.URL == Ia.page_url ? Date.parse(la.lastModified) / 1E3 : null;
            if (gb == gb.top)
                var Wl = gb.document.referrer;
            else {
                var Xl = Bd();
                Wl = (Xl ? Xl.referrer : null) || ""
            }
            Ia.referrer_url = Wl;
            a.adSenseParams = Ia
        }
        var Yl = "goog_" + Ma++;
        this.w.set(Yl, b || null);
        var Md = {};
        Ab(Md, a);
        var vq = this.V().o
          , wq = this.V().A
          , xq = this.V().J
          , yq = this.V().h
          , zq = this.V().G
          , Aq = this.V().kg()
          , Bq = this.V().ha()
          , Cq = this.V().Nc() || !1
          , Dq = this.V().Cb()
          , Eq = this.V().Db()
          , Fq = this.V().ga()
          , Gq = this.V().Pf()
          , Hq = this.V().F
          , Iq = this.V().B
          , Jq = this.V().L
          , Kq = this.V().X
          , Lq = this.V().gg()
          , Mq = Hn();
        Md.settings = {
            autoPlayAdBreaks: vq,
            chromelessPlayer: !0,
            companionBackfill: wq,
            pageCorrelator: xq,
            disableCustomPlaybackForIOS10Plus: yq,
            disableFlashAds: zq,
            enableTrvBillOnClick: !0,
            engagementDetection: !0,
            unloadAbandonPingEnabled: Aq,
            cacheAbandonUrls: !1,
            isAdMob: Bq,
            isInChina: Cq,
            isFunctionalTest: Dq,
            isVpaidAdapter: Eq,
            isYouTube: Fq,
            isKevlar: Gq,
            numRedirects: Hq,
            onScreenDetection: !0,
            playbackQualityWindowMinimumLength: 3E3,
            playerType: Iq,
            playerVersion: Jq,
            ppid: Kq,
            preSkipFx: "",
            reportMediaRequests: Lq,
            activeViewPushUpdates: Mq.B,
            restrictToCustomPlayback: this.V().g,
            streamCorrelator: this.V().M,
            urlSignals: this.V().T,
            useCompanionsAsEndSlate: !1,
            usePlaybackQualityWindow: this.V().lg(),
            vpaidMode: this.V().I,
            useChromelessRemoteMode: this.V().La(),
            useRedesignedSkipButton: !1,
            useRefactoredDelayLearnMore: !1,
            useFixedDirectionality: !1,
            remoteYtExperiment: this.V().l,
            testingConfig: Re(this.V()).g
        };
        var Zl = this.g.h
          , Nq = null != this.g.C
          , Oq = zn.l
          , Pq = this.o
          , Qq = null != Zl ? Zl.zc() : null
          , Rq = this.g.T()
          , Sq = this.g.w()
          , Tq = this.g.K()
          , $l = this.g;
        Md.videoEnvironment = {
            customClickTrackingProvided: Nq,
            iframeState: Oq,
            osdId: Pq,
            supportedMimeTypes: Qq,
            usesChromelessPlayer: Rq,
            usesCustomVideoPlayback: Sq,
            usesYouTubePlayer: Tq,
            usesInlinePlayback: this.g.H,
            youTubeRendererId: $l.F ? $l.F.A : 0
        };
        Md.experimentState = Dm();
        var am = Rp(this.l, Yl);
        this.A.h(am, "adsLoader", this.Nd);
        Qn(am, "adsLoader", "requestAds", Md)
    }
    ;
    h.V = function() {
        return N
    }
    ;
    h.Kf = function() {
        Qn(Rp(this.l), "adsLoader", "contentComplete")
    }
    ;
    h.Nd = function(a) {
        var b = a.$;
        switch (b) {
        case "adsLoaded":
            b = a.U;
            a = a.ab;
            var c = new X(this.g,b.adTagUrl || "",b.adCuePoints,this.o,b.isCustomClickTrackingAllowed,Rp(this.l, a));
            Q(this, new oq(c,this.w.get(a),b.response));
            break;
        case "error":
            b = a.U;
            a = a.ab;
            c = new Le(b.type,b.errorMessage,b.errorCode);
            null != b.innerError && (c.g = Error(b.innerError));
            Q(this, new Pe(c,this.w.get(a)));
            En(Bn.getInstance(), 7, {
                error: b.errorCode
            }, !0);
            break;
        case "trackingUrlPinged":
            Q(this, new M(b,null,a.U))
        }
    }
    ;
    var Y = function() {};
    h = Y.prototype;
    h.clone = function() {
        var a = new Y;
        "auto" == this.videoPlayActivation ? a.Nb(!0) : "click" == this.videoPlayActivation && a.Nb(!1);
        a.adTagUrl = this.adTagUrl;
        a.adSenseParams = yb(this.adSenseParams);
        a.adsResponse = this.adsResponse;
        a.uc = this.uc;
        a.contentDuration = this.contentDuration;
        a.contentKeywords = this.contentKeywords ? bb(this.contentKeywords) : null;
        a.contentTitle = this.contentTitle;
        a.customMacros = yb(this.customMacros);
        a.g = this.g;
        a.location = this.location;
        a.referrer = this.referrer;
        a.lastActivity = this.lastActivity;
        a.language = this.language;
        a.linearAdSlotWidth = this.linearAdSlotWidth;
        a.linearAdSlotHeight = this.linearAdSlotHeight;
        a.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth;
        a.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight;
        a.videoAdKey = this.videoAdKey;
        a.tagForChildDirectedContent = this.tagForChildDirectedContent;
        a.usePostAdRequests = this.usePostAdRequests;
        a.supportsYouTubeHosted = this.supportsYouTubeHosted;
        a.youTubeAdType = this.youTubeAdType;
        a.youTubeVideoAdStartTime = this.youTubeVideoAdStartTime;
        a.wc = this.wc;
        a.tc = this.tc;
        a.l = this.l;
        a.h = this.h;
        a.forceNonLinearFullSlot = this.forceNonLinearFullSlot;
        a.bd = this.bd;
        a.liveStreamPrefetchSeconds = this.liveStreamPrefetchSeconds;
        a.Mc = this.Mc;
        a.pb = this.pb ? this.pb.clone() : null;
        return a
    }
    ;
    h.adSenseParams = null;
    h.uc = null;
    h.customMacros = null;
    h.videoPlayActivation = "unknown";
    h.liveStreamPrefetchSeconds = 0;
    h.linearAdSlotWidth = 0;
    h.linearAdSlotHeight = 0;
    h.nonLinearAdSlotWidth = 0;
    h.nonLinearAdSlotHeight = 0;
    h.forceNonLinearFullSlot = !1;
    h.videoAdKey = null;
    h.tagForChildDirectedContent = !1;
    h.usePostAdRequests = !1;
    h.supportsYouTubeHosted = !0;
    h.bd = new function() {}
    ;
    h.youTubeVideoAdStartTime = 0;
    h.wc = null;
    h.tc = !1;
    h.Nb = function(a) {
        this.videoPlayActivation = a ? "auto" : "click"
    }
    ;
    h.Mc = !0;
    h.pb = null;
    V.prototype.getCompanionAds = V.prototype.Be;
    V.prototype.isLinear = V.prototype.Re;
    V.prototype.isSkippable = V.prototype.Se;
    V.prototype.getAdId = V.prototype.h;
    V.prototype.getAdSystem = V.prototype.ye;
    V.prototype.getAdvertiserName = V.prototype.ze;
    V.prototype.getApiFramework = V.prototype.Ae;
    V.prototype.getContentType = V.prototype.Ce;
    V.prototype.getCreativeId = V.prototype.o;
    V.prototype.getCreativeAdId = V.prototype.l;
    V.prototype.getDescription = V.prototype.Id;
    V.prototype.getTitle = V.prototype.Kd;
    V.prototype.getDuration = V.prototype.xb;
    V.prototype.getHeight = V.prototype.Ee;
    V.prototype.getWidth = V.prototype.Ne;
    V.prototype.getVastMediaHeight = V.prototype.Le;
    V.prototype.getVastMediaWidth = V.prototype.Me;
    V.prototype.getWrapperCreativeIds = V.prototype.Qe;
    V.prototype.getWrapperAdIds = V.prototype.Oe;
    V.prototype.getWrapperAdSystems = V.prototype.Pe;
    V.prototype.getTraffickingParameters = V.prototype.He;
    V.prototype.getTraffickingParametersString = V.prototype.Fc;
    V.prototype.getAdPodInfo = V.prototype.xe;
    V.prototype.getUiElements = V.prototype.Ie;
    V.prototype.getMinSuggestedDuration = V.prototype.Fe;
    V.prototype.getMediaUrl = V.prototype.Ec;
    V.prototype.getSurveyUrl = V.prototype.Ge;
    V.prototype.getDealId = V.prototype.De;
    V.prototype.getUniversalAdIdValue = V.prototype.Ke;
    V.prototype.getUniversalAdIdRegistry = V.prototype.Je;
    vo.prototype.getCuePoints = vo.prototype.g;
    q("google.ima.AdCuePoints.PREROLL", 0, window);
    q("google.ima.AdCuePoints.POSTROLL", -1, window);
    q("google.ima.AdDisplayContainer", Yp, window);
    Yp.prototype.initialize = Yp.prototype.O;
    Yp.prototype.destroy = Yp.prototype.M;
    $m.prototype.getPodIndex = $m.prototype.ue;
    $m.prototype.getTimeOffset = $m.prototype.ve;
    $m.prototype.getTotalAds = $m.prototype.we;
    $m.prototype.getMaxDuration = $m.prototype.te;
    $m.prototype.getAdPosition = $m.prototype.re;
    $m.prototype.getIsBumper = $m.prototype.se;
    q("google.ima.AdError.ErrorCode.VIDEO_PLAY_ERROR", 400, window);
    q("google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS", 1005, window);
    q("google.ima.AdError.ErrorCode.REQUIRED_LISTENERS_NOT_ADDED", 900, window);
    q("google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT", 301, window);
    q("google.ima.AdError.ErrorCode.VAST_NO_ADS_AFTER_WRAPPER", 303, window);
    q("google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT", 402, window);
    q("google.ima.AdError.ErrorCode.VAST_TOO_MANY_REDIRECTS", 302, window);
    q("google.ima.AdError.ErrorCode.VAST_ASSET_MISMATCH", 403, window);
    q("google.ima.AdError.ErrorCode.VAST_LINEAR_ASSET_MISMATCH", 403, window);
    q("google.ima.AdError.ErrorCode.VAST_NONLINEAR_ASSET_MISMATCH", 503, window);
    q("google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND", 1007, window);
    q("google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION", 102, window);
    q("google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR", 101, window);
    q("google.ima.AdError.ErrorCode.VAST_TRAFFICKING_ERROR", 200, window);
    q("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_LINEARITY", 201, window);
    q("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_DURATION_ERROR", 202, window);
    q("google.ima.AdError.ErrorCode.VAST_WRAPPER_ERROR", 300, window);
    q("google.ima.AdError.ErrorCode.NONLINEAR_DIMENSIONS_ERROR", 501, window);
    q("google.ima.AdError.ErrorCode.COMPANION_REQUIRED_ERROR", 602, window);
    q("google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE", 1009, window);
    q("google.ima.AdError.ErrorCode.UNSUPPORTED_LOCALE", 1011, window);
    q("google.ima.AdError.ErrorCode.INVALID_ADX_EXTENSION", 1105, window);
    q("google.ima.AdError.ErrorCode.INVALID_ARGUMENTS", 1101, window);
    q("google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE", 1010, window);
    q("google.ima.AdError.ErrorCode.UNKNOWN_ERROR", 900, window);
    q("google.ima.AdError.ErrorCode.OVERLAY_AD_PLAYING_FAILED", 500, window);
    q("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    q("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    q("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    q("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    q("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    q("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    q("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    q("google.ima.AdError.Type.AD_LOAD", "adLoadError", window);
    q("google.ima.AdError.Type.AD_PLAY", "adPlayError", window);
    Le.prototype.getErrorCode = Le.prototype.ne;
    Le.prototype.getVastErrorCode = Le.prototype.Ld;
    Le.prototype.getInnerError = Le.prototype.oe;
    Le.prototype.getMessage = Le.prototype.pe;
    Le.prototype.getType = Le.prototype.qe;
    q("google.ima.AdErrorEvent.Type.AD_ERROR", "adError", window);
    Pe.prototype.getError = Pe.prototype.G;
    Pe.prototype.getUserRequestContext = Pe.prototype.B;
    q("google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED", "contentResumeRequested", window);
    q("google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED", "contentPauseRequested", window);
    q("google.ima.AdEvent.Type.CLICK", "click", window);
    q("google.ima.AdEvent.Type.DURATION_CHANGE", "durationChange", window);
    q("google.ima.AdEvent.Type.EXPANDED_CHANGED", "expandedChanged", window);
    q("google.ima.AdEvent.Type.STARTED", "start", window);
    q("google.ima.AdEvent.Type.IMPRESSION", "impression", window);
    q("google.ima.AdEvent.Type.PAUSED", "pause", window);
    q("google.ima.AdEvent.Type.RESUMED", "resume", window);
    q("google.ima.AdEvent.Type.FIRST_QUARTILE", "firstquartile", window);
    q("google.ima.AdEvent.Type.MIDPOINT", "midpoint", window);
    q("google.ima.AdEvent.Type.THIRD_QUARTILE", "thirdquartile", window);
    q("google.ima.AdEvent.Type.COMPLETE", "complete", window);
    q("google.ima.AdEvent.Type.USER_CLOSE", "userClose", window);
    q("google.ima.AdEvent.Type.LINEAR_CHANGED", "linearChanged", window);
    q("google.ima.AdEvent.Type.LOADED", "loaded", window);
    q("google.ima.AdEvent.Type.AD_CAN_PLAY", "adCanPlay", window);
    q("google.ima.AdEvent.Type.AD_METADATA", "adMetadata", window);
    q("google.ima.AdEvent.Type.AD_BREAK_READY", "adBreakReady", window);
    q("google.ima.AdEvent.Type.ALL_ADS_COMPLETED", "allAdsCompleted", window);
    q("google.ima.AdEvent.Type.SKIPPED", "skip", window);
    q("google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED", "skippableStateChanged", window);
    q("google.ima.AdEvent.Type.LOG", "log", window);
    q("google.ima.AdEvent.Type.VIEWABLE_IMPRESSION", "viewable_impression", window);
    q("google.ima.AdEvent.Type.VOLUME_CHANGED", "volumeChange", window);
    q("google.ima.AdEvent.Type.VOLUME_MUTED", "mute", window);
    M.prototype.type = M.prototype.type;
    M.prototype.getAd = M.prototype.D;
    M.prototype.getAdData = M.prototype.F;
    yo.prototype.getAdCuePoints = yo.prototype.B;
    q("google.ima.AdsLoader", rq, window);
    rq.prototype.getSettings = rq.prototype.V;
    rq.prototype.requestAds = rq.prototype.Mf;
    rq.prototype.contentComplete = rq.prototype.Kf;
    rq.prototype.destroy = rq.prototype.Lf;
    q("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED", "adsManagerLoaded", window);
    oq.prototype.getAdsManager = oq.prototype.G;
    oq.prototype.getUserRequestContext = oq.prototype.D;
    oq.prototype.getResponse = oq.prototype.B;
    q("google.ima.CompanionAdSelectionSettings", wl, window);
    q("google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE", "Image", void 0);
    q("google.ima.CompanionAdSelectionSettings.CreativeType.FLASH", "Flash", void 0);
    q("google.ima.CompanionAdSelectionSettings.CreativeType.ALL", "All", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.HTML", "Html", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.IFRAME", "IFrame", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.STATIC", "Static", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.ALL", "All", void 0);
    q("google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE", "IgnoreSize", void 0);
    q("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH", "SelectExactMatch", void 0);
    q("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH", "SelectNearMatch", void 0);
    q("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    q("ima.ImaSdkSettings", O, window);
    q("google.ima.settings", N, window);
    O.prototype.setCompanionBackfill = O.prototype.tf;
    O.prototype.getCompanionBackfill = O.prototype.hf;
    O.prototype.setAutoPlayAdBreaks = O.prototype.sf;
    O.prototype.isAutoPlayAdBreak = O.prototype.qf;
    O.prototype.setPpid = O.prototype.Cf;
    O.prototype.getPpid = O.prototype.pf;
    O.prototype.setVpaidAllowed = O.prototype.Ff;
    O.prototype.setVpaidMode = O.prototype.Gf;
    O.prototype.setIsVpaidAdapter = O.prototype.xf;
    O.prototype.isVpaidAdapter = O.prototype.Db;
    O.prototype.setRestrictToCustomPlayback = O.prototype.Df;
    O.prototype.isRestrictToCustomPlayback = O.prototype.Qf;
    O.prototype.setNumRedirects = O.prototype.yf;
    O.prototype.getNumRedirects = O.prototype.lf;
    O.prototype.getLocale = O.prototype.Jd;
    O.prototype.setLocale = O.prototype.ig;
    O.prototype.getPlayerType = O.prototype.mf;
    O.prototype.setPlayerType = O.prototype.Af;
    O.prototype.getDisableFlashAds = O.prototype.kf;
    O.prototype.setDisableFlashAds = O.prototype.vf;
    O.prototype.getPlayerVersion = O.prototype.nf;
    O.prototype.setPlayerVersion = O.prototype.Bf;
    O.prototype.setPageCorrelator = O.prototype.zf;
    O.prototype.setStreamCorrelator = O.prototype.Ef;
    O.prototype.setIsOutstreamVideo = O.prototype.wf;
    O.prototype.isOutstreamVideo = O.prototype.rf;
    O.prototype.setDisableCustomPlaybackForIOS10Plus = O.prototype.uf;
    O.prototype.getDisableCustomPlaybackForIOS10Plus = O.prototype.jf;
    q("google.ima.ImaSdkSettings.CompanionBackfillMode.ALWAYS", "always", void 0);
    q("google.ima.ImaSdkSettings.CompanionBackfillMode.ON_MASTER_AD", "on_master_ad", void 0);
    q("google.ima.ImaSdkSettings.VpaidMode.DISABLED", 0, void 0);
    q("google.ima.ImaSdkSettings.VpaidMode.ENABLED", 1, void 0);
    q("google.ima.ImaSdkSettings.VpaidMode.INSECURE", 2, void 0);
    q("google.ima.common.adTrackingMonitor", Sn, window);
    Fn.prototype.setActiveViewUseOsdGeometry = Fn.prototype.K;
    Fn.prototype.getActiveViewUseOsdGeometry = Fn.prototype.J;
    Fn.prototype.setBlockId = Fn.prototype.M;
    q("google.ima.AdsRenderingSettings", Ao, window);
    q("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    q("google.ima.AdsRequest", Y, window);
    Y.prototype.adTagUrl = Y.prototype.adTagUrl;
    Y.prototype.adsResponse = Y.prototype.adsResponse;
    Y.prototype.nonLinearAdSlotHeight = Y.prototype.nonLinearAdSlotHeight;
    Y.prototype.nonLinearAdSlotWidth = Y.prototype.nonLinearAdSlotWidth;
    Y.prototype.linearAdSlotHeight = Y.prototype.linearAdSlotHeight;
    Y.prototype.linearAdSlotWidth = Y.prototype.linearAdSlotWidth;
    Y.prototype.setAdWillAutoPlay = Y.prototype.Nb;
    Y.prototype.contentDuration = Y.prototype.contentDuration;
    Y.prototype.contentKeywords = Y.prototype.contentKeywords;
    Y.prototype.contentTitle = Y.prototype.contentTitle;
    q("google.ima.VERSION", "3.168.0", void 0);
    q("google.ima.UiElements.AD_ATTRIBUTION", "adAttribution", void 0);
    q("google.ima.UiElements.COUNTDOWN", "countdown", void 0);
    q("google.ima.ViewMode.NORMAL", "normal", void 0);
    q("google.ima.ViewMode.FULLSCREEN", "fullscreen", void 0);
    X.prototype.isCustomPlaybackUsed = X.prototype.Of;
    X.prototype.isCustomClickTrackingUsed = X.prototype.Nf;
    X.prototype.destroy = X.prototype.Gc;
    X.prototype.init = X.prototype.$e;
    X.prototype.start = X.prototype.start;
    X.prototype.stop = X.prototype.ff;
    X.prototype.pause = X.prototype.af;
    X.prototype.resume = X.prototype.bf;
    X.prototype.getCuePoints = X.prototype.We;
    X.prototype.getCurrentAd = X.prototype.Xe;
    X.prototype.getRemainingTime = X.prototype.Ye;
    X.prototype.expand = X.prototype.Ue;
    X.prototype.collapse = X.prototype.Te;
    X.prototype.getAdSkippableState = X.prototype.Ve;
    X.prototype.resize = X.prototype.Hc;
    X.prototype.skip = X.prototype.df;
    X.prototype.getVolume = X.prototype.Ze;
    X.prototype.setVolume = X.prototype.yb;
    X.prototype.sendImpressionUrls = X.prototype.cf;
    X.prototype.discardAdBreak = X.prototype.Ed;
    X.prototype.requestNextAdBreak = X.prototype.hg;
    X.prototype.updateAdsRenderingSettings = X.prototype.gf;
    an.prototype.getContent = an.prototype.getContent;
    an.prototype.getContentType = an.prototype.A;
    an.prototype.getHeight = an.prototype.G;
    an.prototype.getWidth = an.prototype.B;
})();
