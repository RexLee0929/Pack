(()=>{
    "use strict";
    const e = self.Ultraviolet
      , t = ["cross-origin-embedder-policy", "cross-origin-opener-policy", "cross-origin-resource-policy", "content-security-policy", "content-security-policy-report-only", "expect-ct", "feature-policy", "origin-isolation", "strict-transport-security", "upgrade-insecure-requests", "x-content-type-options", "x-download-options", "x-frame-options", "x-permitted-cross-domain-policies", "x-powered-by", "x-xss-protection"]
      , n = ["GET", "HEAD"];
    class r extends e.EventEmitter {
        constructor(t=__uv$config) {
            super(),
            t.bare || (t.bare = "/bare/"),
            t.prefix || (t.prefix = "/service/"),
            this.config = t;
            const n = (Array.isArray(t.bare) ? t.bare : [t.bare]).map((e=>new URL(e,location).toString()));
            this.address = n[~~(Math.random() * n.length)],
            this.bareClient = new e.BareClient(this.address)
        }
        async fetch({request: r}) {
            let a;
            try {
                if (!r.url.startsWith(location.origin + this.config.prefix))
                    return await fetch(r);
                const c = new e(this.config,this.address);
                "function" == typeof this.config.construct && this.config.construct(c, "service");
                const l = await c.cookie.db();
                c.meta.origin = location.origin,
                c.meta.base = c.meta.url = new URL(c.sourceUrl(r.url));
                const d = new s(r,this,c,n.includes(r.method.toUpperCase()) ? null : await r.blob());
                if ("blob:" === c.meta.url.protocol && (d.blob = !0,
                d.base = d.url = new URL(d.url.pathname)),
                r.referrer && r.referrer.startsWith(location.origin)) {
                    const e = new URL(c.sourceUrl(r.referrer));
                    (d.headers.origin || c.meta.url.origin !== e.origin && "cors" === r.mode) && (d.headers.origin = e.origin),
                    d.headers.referer = e.href
                }
                const h = await c.cookie.getCookies(l) || []
                  , u = c.cookie.serialize(h, c.meta, !1);
                d.headers["user-agent"] = navigator.userAgent,
                u && (d.headers.cookie = u);
                const m = new o(d,null,null);
                if (this.emit("request", m),
                m.intercepted)
                    return m.returnValue;
                a = d.blob ? "blob:" + location.origin + d.url.pathname : d.url;
                const p = await this.bareClient.fetch(a, {
                    headers: d.headers,
                    method: d.method,
                    body: d.body,
                    credentials: d.credentials,
                    mode: location.origin !== d.address.origin ? "cors" : d.mode,
                    cache: d.cache,
                    redirect: d.redirect
                })
                  , b = new i(d,p)
                  , f = new o(b,null,null);
                if (this.emit("beforemod", f),
                f.intercepted)
                    return f.returnValue;
                for (const e of t)
                    b.headers[e] && delete b.headers[e];
                if (b.headers.location && (b.headers.location = c.rewriteUrl(b.headers.location)),
                "document" === r.destination) {
                    const e = b.headers["content-disposition"];
                    if (!/\s*?((inline|attachment);\s*?)filename=/i.test(e)) {
                        const t = /^\s*?attachment/i.test(e) ? "attachment" : "inline"
                          , [n] = new URL(p.finalURL).pathname.split("/").slice(-1);
                        b.headers["content-disposition"] = `${t}; filename=${JSON.stringify(n)}`
                    }
                }
                if (b.headers["set-cookie"] && (Promise.resolve(c.cookie.setCookies(b.headers["set-cookie"], l, c.meta)).then((()=>{
                    self.clients.matchAll().then((function(e) {
                        e.forEach((function(e) {
                            e.postMessage({
                                msg: "updateCookies",
                                url: c.meta.url.href
                            })
                        }
                        ))
                    }
                    ))
                }
                )),
                delete b.headers["set-cookie"]),
                b.body)
                    switch (r.destination) {
                    case "script":
                    case "worker":
                        {
                            const e = [c.bundleScript, c.clientScript, c.configScript, c.handlerScript].map((e=>JSON.stringify(e))).join(",");
                            b.body = `if (!self.__uv && self.importScripts) { ${c.createJsInject(this.address, this.bareClient.manfiest, c.cookie.serialize(h, c.meta, !0), r.referrer)} importScripts(${e}); }\n`,
                            b.body += c.js.rewrite(await p.text())
                        }
                        break;
                    case "style":
                        b.body = c.rewriteCSS(await p.text());
                        break;
                    case "iframe":
                    case "document":
                        (function(t, n="") {
                            return "text/html" === (e.mime.contentType(n || t.pathname) || "text/html").split(";")[0]
                        }
                        )(c.meta.url, b.headers["content-type"] || "") && (b.body = c.rewriteHtml(await p.text(), {
                            document: !0,
                            injectHead: c.createHtmlInject(c.handlerScript, c.bundleScript, c.clientScript, c.configScript, this.address, this.bareClient.manfiest, c.cookie.serialize(h, c.meta, !0), r.referrer)
                        }))
                    }
                return "text/event-stream" === d.headers.accept && (b.headers["content-type"] = "text/event-stream"),
                crossOriginIsolated && (b.headers["Cross-Origin-Embedder-Policy"] = "require-corp"),
                this.emit("response", f),
                f.intercepted ? f.returnValue : new Response(b.body,{
                    headers: b.headers,
                    status: b.status,
                    statusText: b.statusText
                })
            } catch (e) {
                return ["document", "iframe"].includes(r.destination) ? (console.error(e),
                function(e, t, n) {
                    let r, i, s, o, a = "";
                    !function(e) {
                        return e instanceof Error && "object" == typeof e.body
                    }(e) ? (r = 500,
                    i = "Error processing your request",
                    o = "Internal Server Error",
                    s = e instanceof Error ? e.name : "UNKNOWN") : (r = e.status,
                    i = "Error communicating with the Bare server",
                    o = e.body.message,
                    s = e.body.code,
                    a = e.body.id);
                    return new Response(function(e, t, n, r, i, s, o) {
                        if ("The specified host could not be resolved." === r)
                            return function(e, t) {
                                const n = new URL(e)
                                  , r = `remoteHostname.textContent = ${JSON.stringify(n.hostname)};bareServer.href = ${JSON.stringify(t)};uvHostname.textContent = ${JSON.stringify(location.hostname)};reload.addEventListener("click", () => location.reload());uvVersion.textContent = ${JSON.stringify("2.0.0")};`;
                                return `\n    <!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="keywords" content="hideipnetwork,github/hideipnetwork,proxy,online web,hnet">\n    <title>Error</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n            font-size: 16px;\n        }\n\n        /* ban */\n        .ban {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n            background: rgba(0, 0, 0, 1);\n        }\n\n        .ban .ban-title {\n            position: absolute;\n            left: 50%;\n            top: 40%;\n            width: 100%;\n            text-align: center;\n            transform: translate(-50%, -60%);\n            color: #fff;\n            font-size: 5rem;\n            letter-spacing: 4px;\n        }\n\n        .ban .ban-text {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: 100%;\n            text-align: center;\n            transform: translate(-50%, -50%);\n            color: #fff;\n            font-size: 1rem;\n            letter-spacing: 2px;\n        }\n\n        .ban .ban-time {\n            position: absolute;\n            left: 50%;\n            top: 60%;\n            width: 100%;\n            text-align: center;\n            transform: translate(-50%, -40%);\n            color: #fff;\n            font-size: 5rem;\n        }\n        .ban .ads{\n            position: absolute;\n            top: 60%;\n            left: 50%;\n            transform: translate(-50%,-40%);\n            color: #fff;\n        }\n    </style>\n</head>\n\n<body>\n    <div class="ban">\n        <div class="ban-title">Ops ~</div>\n        <div class="ban-text">Sir,<b style="color: #b83941;" id="remoteHostname"></b> server IP address could not be found ~</div>\n        <div class="ads">Advertisement please contact\n            <b style="color: #b83941;">\n                <a style="text-decoration: none;color: #2a73b0;" href="https://t.me/Jesmora">@t.me/Jesmora</a>\n            </b>\n        </div>\n    </div>\n    <script src="${"data:application/javascript," + encodeURIComponent(r)}"><\/script>\n</body>\n\n</html>\n    `
                            }(s, o);
                        const a = `errorMessage.textContent =  ${JSON.stringify(r)};`;
                        return `\n        <!DOCTYPE html>\n    <html lang="en">\n    \n    <head>\n        <meta charset="UTF-8">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <meta name="description" content="">\n        <meta name="keywords" content="hideipnetwork,github/hideipnetwork,proxy,online web,hnet">\n        <title>Error</title>\n        <style>\n            * {\n                margin: 0;\n                padding: 0;\n                box-sizing: border-box;\n                font-size: 16px;\n            }\n    \n            /* ban */\n            .ban {\n                position: absolute;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                background: rgba(0, 0, 0, 1);\n            }\n    \n            .ban .ban-title {\n                position: absolute;\n                left: 50%;\n                top: 40%;\n                width: 100%;\n                text-align: center;\n                transform: translate(-50%, -60%);\n                color: #fff;\n                font-size: 5rem;\n                letter-spacing: 4px;\n            }\n    \n            .ban .ban-text {\n                position: absolute;\n                left: 50%;\n                top: 50%;\n                width: 100%;\n                text-align: center;\n                transform: translate(-50%, -50%);\n                color: #fff;\n                font-size: 1rem;\n                letter-spacing: 2px;\n            }\n    \n            .ban .ban-time {\n                position: absolute;\n                left: 50%;\n                top: 60%;\n                width: 100%;\n                text-align: center;\n                transform: translate(-50%, -40%);\n                color: #fff;\n                font-size: 5rem;\n            }\n            .ban .ads{\n                position: absolute;\n                top: 60%;\n                left: 50%;\n                transform: translate(-50%,-40%);\n                color: #fff;\n            }\n        </style>\n    </head>\n    \n    <body>\n        <div class="ban">\n            <div class="ban-title">Service Error</div>\n            <div class="ban-text"><b style="color: #b83941;" id="errorMessage">Internal Server Error</b> </div>\n            <div class="ads">Advertisement please contact\n                <b style="color: #b83941;">\n                    <a style="text-decoration: none;color: #2a73b0;" href="https://t.me/Jesmora">@t.me/Jesmora</a>\n                </b>\n            </div>\n        </div>\n        <script src="${"data:application/javascript," + encodeURIComponent(a)}"><\/script>\n    </body>\n    \n    </html>\n        `
                    }(0, 0, 0, o, String(e), t, n),{
                        status: r,
                        headers: {
                            "content-type": "text/html"
                        }
                    })
                }(e, a, this.address)) : new Response(void 0,{
                    status: 500
                })
            }
        }
        static Ultraviolet = e
    }
    self.UVServiceWorker = r;
    class i {
        constructor(e, t) {
            this.request = e,
            this.raw = t,
            this.ultraviolet = e.ultraviolet,
            this.headers = {};
            for (const e in t.rawHeaders)
                this.headers[e.toLowerCase()] = t.rawHeaders[e];
            this.status = t.status,
            this.statusText = t.statusText,
            this.body = t.body
        }
        get url() {
            return this.request.url
        }
        get base() {
            return this.request.base
        }
        set base(e) {
            this.request.base = e
        }
    }
    class s {
        constructor(e, t, n, r=null) {
            this.ultraviolet = n,
            this.request = e,
            this.headers = Object.fromEntries(e.headers.entries()),
            this.method = e.method,
            this.address = t.address,
            this.body = r || null,
            this.cache = e.cache,
            this.redirect = e.redirect,
            this.credentials = "omit",
            this.mode = "cors" === e.mode ? e.mode : "same-origin",
            this.blob = !1
        }
        get url() {
            return this.ultraviolet.meta.url
        }
        set url(e) {
            this.ultraviolet.meta.url = e
        }
        get base() {
            return this.ultraviolet.meta.base
        }
        set base(e) {
            this.ultraviolet.meta.base = e
        }
    }
    class o {
        #e;
        #t;
        constructor(e={}, t=null, n=null) {
            this.#e = !1,
            this.#t = null,
            this.data = e,
            this.target = t,
            this.that = n
        }
        get intercepted() {
            return this.#e
        }
        get returnValue() {
            return this.#t
        }
        respondWith(e) {
            this.#t = e,
            this.#e = !0
        }
    }
}
)();
//# sourceMappingURL=uv.sw.js.map
