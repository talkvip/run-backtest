function onReady() {
    angular.bootstrap(document, ["botvsApp"])
}

function showToast(a) {
    "undefined" != typeof window.plugins && window.plugins.toast.showShortCenter(a)
}

function initWebSocket() {
        showToast("undefined" == typeof window.WebSocket ? "不支持WebSocket, 无法使用, 请升级浏览器 !" : "初始化成功!")
    }
    ! function(a) {
        function b(a, b) {
            var c, e, f = 9,
                g = [],
                h = [],
                i = [],
                j = [],
                k = [];
            c = d(a, b, 12), e = d(a, b, 26);
            for (var l = 0; l < c.length; l++) g.push(null == e[l][1] ? [a[l], null] : [a[l], c[l][1] - e[l][1]]);
            for (var l = 0; l < g.length; l++) h.push(g[l][0]), i.push(g[l][1]);
            j = d(h, i, f);
            for (var l = 0; l < g.length; l++) k.push(null == g[l][1] ? [g[l][0], null] : [g[l][0], g[l][1] - j[l][1]]);
            return [g, j, k]
        }

        function c(a, b) {
            var c, d = [],
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0;
            c = a.length;
            for (var p = 0; c > p; p++) e += a[p] * b[p], g += a[p], h += b[p], i += Math.pow(a[p], 2), k += a[p], m += b[p];
            return e = c * e, f = g * h, i = c * i, j = Math.pow(k, 2), l = (e - f) / (i - j), n = l * k, o = (m - n) / c, d.push([a[0], b[0]]), step10 = l * a[c - 1] + o, d.push([a[c - 1], step10]), d
        }

        function d(a, b, c) {
            for (var d, e, g = !1, h = c, i = 2 / (h + 1), j = [], k = [], l = b.length, m = (a[0], 0); l > m; m++) b[m - 1] && k.push(b[m]), h == k.length ? (d = b[m], g ? (e = d * i + g * (1 - i), g = e) : g = f(k), j.push([a[m], g]), k.splice(0, 1)) : j.push([a[m], null]);
            return j
        }

        function e(a, b, c) {
            for (var d = [], e = [], g = b.length, h = (a[0], 0); g > h; h++) d.push(b[h]), c == d.length ? (e.push([a[h], f(d)]), d.splice(0, 1)) : e.push([a[h], null]);
            return e
        }

        function f(a) {
            for (var b = 0, c = a.length, d = c; d--;) b += a[d];
            return b / c
        }
        var g = a.getOptions(),
            h = g.plotOptions,
            i = a.seriesTypes;
        h.trendline = a.merge(h.line, {
            marker: {
                enabled: !1
            },
            tooltip: {
                valueDecimals: 2
            }
        }), i.trendline = a.extendClass(i.line, {
            type: "trendline",
            animate: null,
            requiresSorting: !1,
            processData: function() {
                var b;
                this.linkedParent && (b = [].concat(this.linkedParent.options.data), this.setData(this.runAlgorithm(), !1)), a.Series.prototype.processData.call(this)
            },
            runAlgorithm: function() {
                for (var a = [], b = this.linkedParent.xData, c = this.options.periods || 100, d = this.options.algorithm || "linear", e = 0; e < this.linkedParent.yData.length; e++) a[e] = this.linkedParent.yData[e][3];
                return this[d](b, a, c)
            },
            MACD: function(a, c, d) {
                return b(a, c, d)[0]
            },
            signalLine: function(a, c, d) {
                return b(a, c, d)[1]
            },
            SMA: function(a, b, c) {
                return e(a, b, c)
            },
            EMA: function(a, b, c) {
                return d(a, b, c)
            },
            linear: function(a, b, d) {
                return c(a, b, d)
            }
        }), h.histogram = a.merge(h.column, {
            borderWidth: 0,
            tooltip: {
                valueDecimals: 2
            }
        }), i.histogram = a.extendClass(i.column, {
            type: "histogram",
            animate: null,
            requiresSorting: !1,
            processData: function() {
                var b;
                this.linkedParent && (b = [].concat(this.linkedParent.options.data), this.setData(this.runAlgorithm(), !1)), a.Series.prototype.processData.call(this)
            },
            runAlgorithm: function() {
                for (var a = [], b = this.linkedParent.xData, c = this.options.periods || 100, d = this.options.algorithm || "histogram", e = 0; e < this.linkedParent.yData.length; e++) a[e] = this.linkedParent.yData[e][3];
                return this[d](b, a, c)
            },
            histogram: function(a, c, d) {
                return b(a, c, d)[2]
            }
        })
    }(Highcharts),
    function(a, b) {
        "function" == typeof define && define.amd ? define([], b) : "undefined" != typeof module && module.exports ? module.exports = b() : a.ReconnectingWebSocket = b()
    }(this, function() {
        function a(d, f, g) {
            function h(a, b) {
                var c;
                return "undefined" != typeof window.CustomEvent ? (c = document.createEvent("CustomEvent"), c.initCustomEvent(a, !1, !1, b)) : (c = document.createEvent("Event"), c.initEvent(a, !1, !1)), c
            }
            var i = {
                debug: !1,
                automaticOpen: !0,
                reconnectInterval: 1e3,
                maxReconnectInterval: 3e4,
                reconnectDecay: 1.5,
                timeoutInterval: 2e3,
                maxReconnectAttempts: null
            };
            g || (g = {});
            for (var j in i) this[j] = "undefined" != typeof g[j] ? g[j] : i[j];
            this.url = d, this.reconnectAttempts = 0, this.readyState = b, this.protocol = null;
            var k, l = this,
                m = !1,
                n = !1,
                o = document.createElement("div");
            o.addEventListener("open", function(a) {
                l.onopen(a)
            }), o.addEventListener("close", function(a) {
                l.onclose(a)
            }), o.addEventListener("connecting", function(a) {
                l.onconnecting(a)
            }), o.addEventListener("message", function(a) {
                l.onmessage(a)
            }), o.addEventListener("error", function(a) {
                l.onerror(a)
            }), this.addEventListener = o.addEventListener.bind(o), this.removeEventListener = o.removeEventListener.bind(o), this.dispatchEvent = o.dispatchEvent.bind(o), this.open = function(d) {
                if (k = new WebSocket(l.url, f || []), d) {
                    if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) return
                } else o.dispatchEvent(h("connecting")), this.reconnectAttempts = 0;
                (l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "attempt-connect", l.url);
                var g = k,
                    i = setTimeout(function() {
                        (l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "connection-timeout", l.url), n = !0, g.close(), n = !1
                    }, l.timeoutInterval);
                k.onopen = function() {
                    clearTimeout(i), (l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "onopen", l.url), l.protocol = k.protocol, l.readyState = c, l.reconnectAttempts = 0;
                    var b = h("open");
                    b.isReconnect = d, d = !1, o.dispatchEvent(b)
                }, k.onclose = function(c) {
                    if (clearTimeout(g), k = null, m) l.readyState = e, o.dispatchEvent(h("close"));
                    else {
                        l.readyState = b;
                        var f = h("connecting");
                        f.code = c.code, f.reason = c.reason, f.wasClean = c.wasClean, o.dispatchEvent(f), d || n || ((l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "onclose", l.url), o.dispatchEvent(h("close")));
                        var g = l.reconnectInterval * Math.pow(l.reconnectDecay, l.reconnectAttempts);
                        setTimeout(function() {
                            l.reconnectAttempts++, l.open(!0)
                        }, g > l.maxReconnectInterval ? l.maxReconnectInterval : g)
                    }
                }, k.onmessage = function(b) {
                    (l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "onmessage", l.url, b.data);
                    var c = h("message");
                    c.data = b.data, o.dispatchEvent(c)
                }, k.onerror = function(b) {
                    (l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "onerror", l.url, b), o.dispatchEvent(h("error"))
                }
            }, 1 == this.automaticOpen && this.open(!1), this.send = function(b) {
                if (k) return (l.debug || a.debugAll) && console.debug("ReconnectingWebSocket", "send", l.url, b), k.send(b);
                throw "INVALID_STATE_ERR : Pausing to reconnect websocket"
            }, this.close = function(a, b) {
                "undefined" == typeof a && (a = 1e3), m = !0, k && k.close(a, b)
            }, this.refresh = function() {
                k && k.close()
            }
        }
        "function" != typeof Function.prototype.bind && (Function.prototype.bind = function(a) {
            var b = Array.prototype.slice,
                c = this;
            return function() {
                var d = b.call(arguments, 1);
                return d.length ? arguments.length ? c.apply(a, d.concat(b.call(arguments))) : c.apply(a, d) : arguments.length ? c.apply(a, arguments) : c.call(a)
            }
        });
        var b = 0,
            c = 1,
            d = 2,
            e = 3;
        return a.prototype.onopen = function() {}, a.prototype.onclose = function() {}, a.prototype.onconnecting = function() {}, a.prototype.onmessage = function() {}, a.prototype.onerror = function() {}, a.debugAll = !1, a.CONNECTING = b, a.OPEN = c, a.CLOSING = d, a.CLOSED = e, a
    }), angular.module("botvsApp", ["ngAnimate", "ngResource", "ngRoute", "ngSanitize", "LocalStorageModule", "duScroll", "templates-all", "ui.bootstrap", "ng-sortable"]).config(["$routeProvider", "$locationProvider", "localStorageServiceProvider", function(a, b, c) {
        b.html5Mode(!1).hashPrefix("!"), c.setPrefix("botvsApp"), a.when("/", {
            templateUrl: "views/main.html",
            controller: "MainCtrl"
        }).when("/login", {
            title: "登陆",
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        }).when("/api", {
            title: "API 文档",
            templateUrl: "views/api.html",
            controller: "ApiCtrl"
        }).when("/sign-up", {
            title: "注册",
            templateUrl: "views/sign-up.html",
            controller: "SignUpCtrl"
        }).when("/reset-password", {
            title: "找回密码",
            templateUrl: "views/reset-password.html",
            controller: "ResetPasswordCtrl"
        }).when("/reset-twofactor", {
            title: "重置二次验证码",
            templateUrl: "views/reset-twofactor.html",
            controller: "ResetTwofactorCtrl"
        }).when("/disable-twofactor/:token", {
            title: "关闭二次验证",
            templateUrl: "views/disable-twofactor.html",
            controller: "DisableTwofactorCtrl"
        }).when("/set-password/:token", {
            title: "重置密码",
            templateUrl: "views/set-password.html",
            controller: "SetPasswordCtrl"
        }).when("/square", {
            title: "策略广场",
            templateUrl: "views/square.html",
            controller: "SquareCtrl"
        }).when("/m", {
            title: "Dashboard",
            templateUrl: "views/m/dashboard.html",
            controller: "MDashboardCtrl"
        }).when("/m/dashboard", {
            title: "Dashboard",
            templateUrl: "views/m/dashboard.html",
            controller: "MDashboardCtrl"
        }).when("/m/security", {
            title: "账户安全",
            templateUrl: "views/m/security.html",
            controller: "MSecurityCtrl"
        }).when("/m/robot/:id", {
            templateUrl: "views/m/robot.html",
            controller: "MRobotCtrl"
        }).when("/m/add-robot", {
            title: "添加机器人",
            templateUrl: "views/m/add-robot.html",
            controller: "MAddRobotCtrl"
        }).when("/m/add-platform", {
            title: "添加交易所",
            templateUrl: "views/m/add-platform.html",
            controller: "MAddPlatformCtrl"
        }).when("/m/edit-platform/:id", {
            title: "编辑交易所",
            templateUrl: "views/m/add-platform.html",
            controller: "MAddPlatformCtrl"
        }).when("/m/add-node", {
            title: "添加托管者",
            templateUrl: "views/m/add-node.html",
            controller: "MAddNodeCtrl"
        }).when("/m/edit-strategy/:id", {
            title: "编辑策略",
            templateUrl: "views/m/add-strategy.html",
            controller: "MAddStrategyCtrl"
        }).when("/m/add-strategy", {
            title: "添加策略",
            templateUrl: "views/m/add-strategy.html",
            controller: "MAddStrategyCtrl"
        }).when("/m/copy-strategy/:id", {
            title: "复制策略",
            templateUrl: "views/m/add-strategy.html",
            controller: "MAddStrategyCtrl"
        }).when("/strategy/:id", {
            title: "查看公开策略",
            templateUrl: "views/strategy.html",
            controller: "StrategyCtrl"
        }).when("/robot/:id", {
            title: "围观机器人",
            templateUrl: "views/robot.html",
            controller: "RobotCtrl"
        }).when("/bbs/:id", {
            title: "BBS",
            templateUrl: "views/bbs.html",
            controller: "BbsCtrl"
        }).when("/bbs", {
            title: "BBS",
            templateUrl: "views/bbs.html",
            controller: "BbsCtrl"
        }).when("/m/pushhistory", {
            templateUrl: "views/m/pushhistory.html",
            controller: "MPushhistoryCtrl"
        }).when("/m/pushqueue", {
            templateUrl: "views/m/pushqueue.html",
            controller: "MPushqueueCtrl"
        }).otherwise({
            redirectTo: "/"
        })
    }]), $(function() {
        "file:" == document.location.protocol ? (document.addEventListener("deviceready", function() {
            try {
                initWebSocket(), window.plugins.NativeAudio.preloadSimple("beep", "res/beep.mp3", function() {}, function(a) {
                    showToast("beep: " + a)
                }), document.addEventListener("online", function() {
                    showToast("网络已连接")
                }, !1), document.addEventListener("offline", function() {
                    showToast("网络已断开")
                }, !1), onReady(), "iOS" == device.platform && $(".navbar-default").css("padding-top", "12px"), cordova.plugins.notification.local.registerPermission(function(a) {
                    a || showToast("推送开启失败!")
                }), cordova.plugins.backgroundMode.onfailure = function(a) {
                    showToast("切入后台失败: " + a)
                }, cordova.plugins.backgroundMode.ondeactivate = function() {
                    showToast("欢迎回来!")
                }, cordova.plugins.backgroundMode.setDefaults({
                    ticker: "BotVS已切换至后台运行",
                    title: "BotVS正在后台运行",
                    text: "以接收推送通知. 点击切换到前台"
                }), cordova.plugins.backgroundMode.enable()
            } catch (a) {
                alert(a)
            }
        }, !1), $.getScript("cordova.js").fail(onReady)) : onReady(), -1 !== location.host.indexOf("botvs.com") && (document.domain = "botvs.com"), window.top.location !== window.self.location && (window.top.location.href = window.self.location.href), Highcharts.setOptions({
            global: {
                useUTC: !1
            },
            lang: {
                numericSymbols: ["k", "M", "G", "T", "P", "E"]
            },
            credits: {
                enabled: !1
            }
        })
    }), angular.module("templates-all", ["views/api.html", "views/bbs.html", "views/dialog-alert.html", "views/dialog-confirm.html", "views/dialog-prompt.html", "views/disable-twofactor.html", "views/login.html", "views/m/add-node.html", "views/m/add-platform.html", "views/m/add-robot.html", "views/m/add-strategy.html", "views/m/dashboard.html", "views/m/pushhistory.html", "views/m/pushqueue.html", "views/m/robot.html", "views/m/security.html", "views/main.html", "views/reset-password.html", "views/reset-twofactor.html", "views/robot.html", "views/set-password.html", "views/sign-up.html", "views/square.html", "views/strategy.html"]), angular.module("views/api.html", []).run(["$templateCache", function(a) {
        a.put("views/api.html", '<div class="row"> <blockquote class="hidden-xs"> <p> <h3>序言</h3> </p> <blockquote> <p> <h3>BOTVS 自动化交易策略共享交流实战平台</h3> </p> <small>环境: 支持Windows, Mac, Linux, ARM平台的单片机如(RaspberryPI, CubieBoard), 哥虽然是二进制, 但哥是跨平台的, 感谢Golang</small> <small>集群: 如果你创建1000个机器人并发，哥也可以Hold住的，也可以创建多个节点来分散任务</small> <small>特点: 简单, 实时, 分布式, 可视化, 高度定制, 灵活, 可在线回测, 有文档 ...</small> <small>共享: 每个人都可以共享策略或者复制别人共享的策略</small> </blockquote> <blockquote> <p> <h3>我的API密钥会泄漏吗?</h3> </p> <small>完全不会 !!!</small> <small>第一: 密钥保存模式是浏览器加密后托管者再解密，完全本地化, 服务器数据库就是被入侵了, 黑客也没办法解出明文</small> <small>第二: 密钥依赖用户密码加密，使用MD5/AES混合加密后保存到服务端, 而服务端不保存登录密码明文, 就无法解密</small> <small>第三: 网站采用https协议传输, 完全不用担心数据被嗅探泄漏</small> <small>第四: 退一万步讲, 站长要想要你API用不着做个这样功能复杂的网站, 做个钓鱼网页就可以了</small> <small>验证: 如果你懂技术, 可以分析网站登录处的源码和保存API密钥处的源码, 有最好的安全保障</small> </blockquote> <blockquote> <p> <h3>一直免费, 能用多久 ?</h3> </p> <small>第一: 决定做这个项目前一夜, 我已经把服务器续了三年费, 作者决定的事, 没有结果不会结束的.</small> <small>第二: 靠这个发不了财, 所以平台永久免费, 靠平台交流获取的知识是无价的, 所以希望加Q群(<font color="red">309368835</font>)多交流.</small> <small>第三: 收费软件稳定长久是误区, 奔着钱去的软件, 往往因为盈利原因项目夭折, 而免费的, 往往是打不死的小强.</small> <small>第四: 平台为了让苦逼的程序员能够获利, 推出了策略出售功能, 交易双方私下谈价格, 平台不参与也不收手续费.</small> <small>赞助: 你懂的 -:) BTC: <a href="https://blockchain.info/zh-cn/address/1H5VD3howBTN4b81GJWDf5yzTpbyhCz8zF?filter=2" target="_blank"><code>1H5VD3howBTN4b81GJWDf5yzTpbyhCz8zF</code></a> &nbsp; LTC:<a href="http://block-explorer.com/address/LhgPTAupWpG23ADXxeG7wu7kuaepUHgBYp" target="_blank"><code>LhgPTAupWpG23ADXxeG7wu7kuaepUHgBYp</code></a></small> </blockquote> </blockquote> <blockquote> <h3>API 参考文档</h3> <blockquote> <p>代码架构</p> <small> main函数为入口函数，onexit为退出扫尾函数(onexit最长执行时间为5分钟), 也可以不声明, 显示交易平台账户信息的例子: <br> <pre>\nfunction main() {\n    Log(exchange.GetAccount());\n} </pre> 经典模型: <br> <pre>\nfunction onTick() {\n    // TODO something.\n}\n\nfunction main() {\n    while(true) {\n        onTick();\n        Sleep(60000);\n    }\n} </pre> </small> </blockquote> <blockquote> <p>策略自定义参数</p> <small>支持四种类型的参数</small> <blockquote> <p>参数类型</p> <small>字符串</small> <small>数字型</small> <small>布尔型, true或者false</small> <small>列表型, 用\'|\'分开, 如aa|bb|cc表示列表有三个选项, 对应值为0,1,2</small> <pre>参数支持定义显示条件, 比如想让a变量在b变量为1或者true的时候显示, 变量a就定义成a@b或者a@b==1\n如果变量a想在变量b在选择第三个选项的时候显示, 变量a变量名就定义为a@b==3\n@后面是定义语法格式为 变量名+比较符+值(数字)\n操作符支持==, !=, &gt=, &lt=, 变量前直接加!表示取反，比如a@!b,指b为1或者true时候,a不显示</pre> </blockquote> <small>支持五种类型的交互</small> <blockquote> <p>交互类型</p> <small>按钮型</small> <small>字符串</small> <small>数字型</small> <small>布尔型, true或者false</small> <small>列表型, 用\'|\'分开, 如aa|bb|cc表示列表有三个选项, 对应值为0,1,2</small> <pre>如果为按钮, 则发送"按钮名称"做为命令, 其它发送"按钮名称:参数值", 被GetCommand()接收, 如果按钮描述为"@"则隐藏描述, 只显示按钮</pre> </blockquote> </blockquote> <blockquote> <p>全局常量</p> <small>扩展的一些全局常量</small> <blockquote> <p>交易所常量</p> <small>用来操作交易平台的对像</small> <pre>\nexchange  : 默认主交易所对像, 添加交易平台时排列第一的交易所, 可以这样直接使用: exchange.GetAccount()\nexchanges : 交易所数组, 如果添加多个交易所, 可以访问此变量获取交易所对像, 第一个为主交易所, 如exchanges[0].GetAccount()</pre> </blockquote> <blockquote> <p>订单状态</p> <small>Order结构里的Status值</small> <pre>\nORDER_STATE_PENDING  : 未完成\nORDER_STATE_CLOSED   : 已关闭\nORDER_STATE_CANCELED : 已取消\nORDER_STATE_UNKNOWN  : 未知(这个一般不考虑)</pre> </blockquote> <blockquote> <p>订单类型</p> <small>Order结构里的Type值</small> <pre>\nORDER_TYPE_BUY  : 买单\nORDER_TYPE_SELL : 卖单</pre> </blockquote> </blockquote> <blockquote> <p>数据结构</p> <small>一些常用的数组结构，由交易函数返回</small> <blockquote> <p>Record</p> <small>标准OHLC结构, 用来画K线和指标分析用的，由GetRecords()函数返回此结构数组</small> <pre>{\nTime   : 一个时间戳, 精确到毫秒，与Javascript的 new Date().getTime() 得到的结果格式一样\nOpen   : 开盘价\nHigh   : 最高价\nLow    : 最低价\nClose  : 收盘价\nVolume : 交易量\n}</pre> </blockquote> <blockquote> <p>MarketOrder</p> <small>市场深度单</small> <pre>{\nPrice  : 价格\nAmount : 数量\n}</pre> </blockquote> <blockquote> <p>Ticker</p> <small>市场行情结构</small> <pre>{\nHigh   : 最高价\nLow    : 最低价\nSell   : 卖一价\nBuy    : 买一价\nLast   : 最后成交价\nVolume : 最近成交量\n}</pre> </blockquote> <blockquote> <p>Order</p> <small>订单结构, 由GetOrder函数返回</small> <pre>{\nId         : 交易单唯一标识\nAmount     : 下单数量\nDealAmount : 成交数量\nPrice      : 下单价格\nStatus     : 订单状态, 参考常量里的订单状态\nType       : 订单类型, 参考常量里的订单类型\n}</pre> </blockquote> <blockquote> <p>Depth</p> <small>市场深度,由GetDepth函数返回</small> <pre>{\nAsks : 卖单数组, MarketOrder数组, 按价格从低向高排序\nBids : 买单数组, MarketOrder数组, 按价格从高向低排序\n}</pre> </blockquote> <blockquote> <p>Trade</p> <small>交易历史,由GetTrades函数返回</small> <pre>{\nTime   : 时间(Unix timestamp 毫秒)\nAmount : 数量\nPrice  : 价格\nType   : 订单类型, 参考常量里的订单类型\n}</pre> </blockquote> <blockquote> <p>Fee</p> <small>手续费结构, 由GetFee函数返回(如国外平台bitfinex买入卖出手续费跟账户交易量相关)</small> <pre>{\nSell : 卖出手续费, 为一个浮点数, 如0.2表示0.2%的手续费\nBuy  : 买入手续费, 格式同上\n}</pre> </blockquote> <blockquote> <p>Account</p> <small>账户信息, 由GetAccount函数返回</small> <pre>{\nStocks        : BTC/LTC数量, 现货为当前可操作币的余额(去掉冻结的币), 期货的话为合约当前可用保证金\nFrozenStocks  : 冻结的BTC/LTC数量\nBalance       : 余额(人民币或者美元)\nFrozenBalance : 冻结的余额\n}</pre> </blockquote> </blockquote> <blockquote> <p>交易所函数</p> <small>exchange或者exchanges里保存的交易所对像所拥有的函数</small> <blockquote> <p><font color="red">Go(Method, args...)</font></p> <small><font color="red">多线程异步支持函数, 可以把所有支持的函数的操作变成异步并发的.</font></small> <small>支持GetTicker, GetDepth, GetTrades, GetRecords, GetAccount, GetOrders, GetOrder, CancelOrder, Buy, Sell, GetPosition <pre>\nvar a = exchange.Go("GetTicker"); // GetTicker 异步多线程执行\nvar b = exchange.Go("GetDepth"); // GetDepth 开始放入另一个线程并发执行\nvar c = exchange.Go("Buy", 1000, 0.1); // 同上, 买单并发异步执行\nvar d = exchange.Go("GetRecords", PERIOD_H1); // 同上, 返回周期为1小时的K线\n\n// 上面四种操作是并发多线程异步执行, 不会耗时, 立即返回的\n\nvar ticker = a.wait(); // 调用wait方法等待返回异步获取ticker结果\nvar depth = b.wait(); // 返回深度, 如果获取失败也是有可能返回null的\nvar orderId = c.wait(1000); // 返回订单号, 限定1秒超时, 超时返回undefined, 此对像可以继续调用wait等待如果上次wait超时\n// 注意: 判断undefiend要用typeof(xx) == \'undefined\', 因为null==undefined在JavaScript里是成立的\n\nvar records = d.wait(); // 等待K线结果\nvar ret = d.wait(); // 这里wait了一个已经wait过且结束的异步操作, 会返回null, 并记录出错信息.\n                    </pre> </small> </blockquote> <blockquote> <p>GetName()</p> <small>返回交易所名称(string), 如exchange.GetName()</small> </blockquote> <blockquote> <p>GetRate()</p> <small>返回交易所使用的流通货币与人民币的汇率, 国外盘就是USD/EUR对CNY</small> <small>汇率接口调用雅虎提供的接口, 5分钟更新一次</small> <small>所有函数自动经过汇率转换,在脚本层,自动都转换为人民币,下单也是用人民币价格,不管内盘外盘</small> </blockquote> <blockquote> <p>SetLimit(Millisecond)</p> <small>设置交易所的交易API的调用频率限制, 毫秒为单位</small> <small>exchange.SetLimit(2000); 为交易API两秒钟内只能调用一次, 过快程序将自动延迟</small> </blockquote> <blockquote> <p>SetRate()</p> <small>设置交易所的流通货币与人民币的汇率, 国外盘就是USD/EUR对CNY, 返回设置前的汇率</small> <small>比如796期货设置SetRate(6.13), 就是设定USD/EUR对CNY的汇率为6.13, 程序所有价格会自动用这个汇率计算</small> <small>SetRate(), 如果不加参数，则恢复系统内置汇率</small> <small>SetRate(1), 就是禁用汇率转换</small> <small>模拟回测的时候此函数不起作用, 因为历史价格已经提前汇率转换</small> </blockquote> <blockquote> <p>GetCurrency()</p> <small>返回交易所操作的货币名称(string)</small> </blockquote> <blockquote> <p>GetTicker()&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>返回一个Ticker结构</small> </blockquote> <blockquote> <p>GetDepth()&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>返回一个Depth结构</small> </blockquote> <blockquote> <p>GetTrades()&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>返回一个Trade数组, 按时间从低到高的顺序</small> </blockquote> <blockquote> <p>GetRecords(Period)&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>返回一个K线历史, K线周期在创建机器人时指定, Record数组结构</small> <small>不加参数, 默认返回添加机器人时时指量的K线周期, 但也可以自定义K线周期</small> <small>支持: PERIOD_M1 指1分钟, PERIOD_M5 指5分钟, PERIOD_M15 指15分钟, PERIOD_M30 指30分钟, PERIOD_H1 指1小时, PERIOD_D1 指一天</small> </blockquote> <blockquote> <p>GetAccount()&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>返回一个Account结构, 如exchange.GetAccount(), 将返回主交易所账户信息</small> </blockquote> <blockquote> <p>Buy(Price, Amount)&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>下买单, Price为买单价格,Amount为数量, 返回一个订单ID</small> <small>可以跟多余的参数做为附加消息显示到日志, 如exchange.Buy(1000,0.1, "OK", 123)</small> <small>支持现货(火币/BitVC/OKCoin/OKCoin国际/BTCChina/BitYes)市价单, 市价单只传一个参数为买入的总钱, BTCChina只传一个参数为买入的总币</small> <small>exchange.Buy(1000), 指买市价1000元的币, BTCChina例外exchange.Buy(0.3)指市价买0.3个币</small> <small>注意: <font color="red">市价单只能传一个参数</font></small> </blockquote> <blockquote> <p>Sell(Price, Amount)&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>下卖单, Price为卖单价格,Amount为数量, 返回一个订单ID</small> <small>可以跟多余的参数做为附加消息显示到日志, 如exchange.Sell(8000, 0.1, "ticker:", exchange.GetTicker())</small> <small>支持现货(火币/BitVC/OKCoin/OKCoin国际/BTCChina/BitYes)市价单, 市价单只传一个参数为卖出的总币</small> <small>exchange.Buy(0.3); 指市价卖出0.3个币</small> <small>注意: <font color="red">市价单只能传一个参数</font></small> </blockquote> <blockquote> <p>GetOrder(orderId)&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>根据订单号获取订单详情, 返回一个Order结构</small> </blockquote> <blockquote> <p>GetOrders()&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>获取所有未完成的订单, 返回一个Order数组结构</small> </blockquote> <blockquote> <p>CancelOrder(orderId)&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>根据订单号取消一个订单, 返回true或者false</small> <small>可以跟多余的参数做为附加消息显示到日志, 如exchange.CancelOrder(123, "Canceled")</small> </blockquote> <blockquote> <p>GetMinStock()</p> <small>返回币最小交易数量(number)</small> </blockquote> <blockquote> <p>GetMinPrice()</p> <small>返回一笔订单要求的最小金额(价格*数量), Bitstamp要求5美元(程序会根据汇率自动转换为人民币), 其它没有限制</small> </blockquote> <blockquote> <p>GetFee()</p> <small>返回一个Fee结构, 如exchange.GetFee(), 将返回账户买入卖出的手续费</small> </blockquote> <blockquote> <p>GetRawJSON()</p> <small>返回最后一次REST API请求返回的原始内容(字符串), 用户可以用来自己解析扩展信息</small> <small>注: 模拟测试的话，会一直返回一个空字符串, 只在真实环境下有效</small> <small>如: 在成功调用GetAccount类似函数后, var obj = JSON.parse(exchange.GetRawJSON());</small> </blockquote> </blockquote> <blockquote> <p>全局扩展函数</p> <small>系统提供的一些扩展函数</small> <blockquote> <p>Version()</p> <small>返回系统当前版本号, 字符串值, 如1.7</small> </blockquote> <blockquote> <p><font color="red">Log(Message)</font></p> <small>保存一条信息到日志列表, 如果只希望输出调试信息到托管者控制台, 建议使用内置的console.log函数</small> <small><font color="red">如果在字符串后面加上@字符则消息会进入推送队列, 推送到使用BotVS客户端登陆的移动设备上(50条/小时 限制)</font></small> <small>如: Log("手机你好 !@"); 或Log("手机你接着好, #ff0000@");</small> </blockquote> <blockquote> <p>LogProfit(Profit)</p> <small>记录盈利值,这个为总盈利的值,参数类型为浮点数, 如LogProfit(13.5)</small> <small>可以跟多余的参数做为附加消息显示到日志, 如LogProfit(10, exchange.GetAccount())</small> </blockquote> <blockquote> <p>LogProfitReset()</p> <small>清空所有收益日志</small> </blockquote> <blockquote> <p>LogStatus(Msg)</p> <small>此信息不保存到日志列表里, 只更新当前机器人的状态信息, 在日志上方显示, 可多次调用, 更新状态</small> <small>如: LogStatus("Running");</small> </blockquote> <blockquote> <p>EnableLog(IsEnable)</p> <small>打开或者关闭定单和出错信息的日志记录</small> <small>EnableLog(false)关闭订单与错误信息记录, EnableLog(true)开启, 在高频交易上可以使用</small> </blockquote> <blockquote> <p>EnableLogLocal(IsEnable)</p> <small>打开或者关闭本地定单和出错信息的日志记录, 保存到托管者工作目录的logs文件夹下</small> <small>EnableLogLocal(true), 开启日志本地保存模式, 如果EnableLog(false)则不记录订单与错误信息</small> </blockquote> <blockquote> <p>Chart({...})</p> <small>返回一个可操作的图表对像, 参数为可以JSON序列化的HighStocks的Highcharts.StockChart参数, 比原生的参数增加一个__isStock属性, 如果指定__isStock: false, 则显示为普通图表</small> <small>返回对像可以调用add([series索引(如0), 数据])向指定索引的series添加数据, 调用reset()清空图表数据</small> <small>可以调用add([series索引(如0), 数据, 此数据在series中的索引])来更改数据, 可以为负数, -1指最后一个, -2是倒数第二个, 如chart.add([0, 13.5, -1]), 更改series[0].data的倒数第一个点的数据</small> <small>HighStocks参考地址: http://api.highcharts.com/highstock</small> </blockquote> <blockquote> <p>Mail(smtpServer, smtpUsername, smtpPassword, mailTo, title, body)</p> <small>发送邮件函数</small> <small>如: Mail("smtp.163.com", "asdf@163.com", "password", "111@163.com", "这是标题", "这是内容"), 成功就返回true</small> </blockquote> <blockquote> <p>SetErrorFilter(RegEx)</p> <small>设置错误过滤器, 被此正则表达式匹配的错误将不上传到日志系统, 可多次调用设置多个</small> <small>如: SetErrorFilter("Your request is too frequent")</small> <small>忽略常见的网络错误: <pre>SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused");</pre> </small> </blockquote> <blockquote> <p>_G(K, V)</p> <small>全局KV表, 机器人停止运行后仍然存在, 一直到托管者退出, 可用做机器人之间相互协做的通道</small> <small>K必须为数字或者字符串, 不区分大小写, V可以为数字, 字符串, 布尔三种类型</small> <small>_G("num", 1), 设置一个全局变量num, 值为1</small> <small>_G("num", "ok"), 更改一个全局变量num, 值为字符串ok</small> <small>_G("num", null), 删除全局变量num</small> <small>_G("num"), 返回全局变量num的值</small> <small>_G(), 返回当前机器人的唯一ID</small> <small>_G(123), 查看ID为123的机器人是否正在运行</small> <small>_G(null), 清空所有全局变量</small> </blockquote> <blockquote> <p><font color="red">GetCommand()</font></p> <small>获取策略交互界面发来的命令并清空, 没有命令则返回null, 返回的命令格式为 "按钮名称:参数", 如果没有参数, 则命令就是按钮名称</small> <pre>while (true) {\n    var cmd = GetCommand();\n    if (cmd) {\n        Log(cmd);\n    }\n    Sleep(1000);\n} </pre> </blockquote> <blockquote> <p>Sleep(Millisecond)</p> <small>休眠函数,参数为毫秒数,如Sleep(1000)为休眠一秒</small> </blockquote> <blockquote> <p>GetLastError()</p> <small>获取最近一次出错信息,一般无需使用,因为程序会把出错信息自动上传到日志系统</small> </blockquote> <blockquote> <p>HttpQuery(Url, PostData, Cookies, Headers1, Headers2, ....., IsReturnHeader)</p> <small>获取一个Url的返回内容, 如果有第二个参数PostData就以POST方式提交, 返回字符串结果</small> <small>如: HttpQuery("http://www.baidu.com/"), POST方式如: HttpQuery("http://www.163.com", "xxx")</small> <small>如: HttpQuery("http://www.baidu.com/", null, "a=10; b=20", "User-Agent: Mobile", "Content-Type: text/html"", true);返回一个{Header: 网页HTTP头, Body: 网页内容}的对像</small> <small>传递Cookie字符串需要第三个参数, 但不需要POST请将第二个参数置为null</small> <small>模拟测试的时候因为无法模拟访问URL, 函数就返回固定字符串: "Dummy Data"</small> <small>可以用此接口发送短信, 推荐使用短信宝</small> </blockquote> </blockquote> <blockquote> <p>期货扩展数据结构及交易函数</p> <small>期货支持796, BitVC, OKCoin</small> <blockquote> <p>Position 结构</p> <small>期货交易中的持有仓位信息, 由GetPosition()函数返回此结构数组</small> <pre>{\nMarginLevel  : 杆杠大小, 796期货有可能为 5, 10, 20 三个参数, OKCoin为10或者20, BitVC期货和OK期货的全仓模式返回为固定的10, 因为原生API不支持\nAmount       : 持仓量, 796期货表示持币的数量, BitVC指持仓的总金额(100的倍数), OKCoin表示合约的份数(整数且大于1)\nFrozenAmount : 冻结量, 796专用\nPrice        : 加权均价\nProfit       : 持仓浮动盈亏 (单位：BTC/LTC)\nType         : ORDER_TYPE_BUY为多头仓位, ORDER_TYPE_SELL为空头仓位\nContractType : 合约类型, 796期货为"week" (指浮动杠杆期货USD), "weekcny" (指固定杠杆期货CNY), BitVC可以为"week"或者"next_week"或者"quarter",\n               OKCoin期货合约类型: this_week:当周 next_week:下周 month:当月 quarter:季度\n}</pre> </blockquote> <blockquote> <p>GetPosition()&nbsp;&nbsp;<span class="badge">支持异步</span></p> <small>获取当前持仓信息, 返回一个Position数组, (BitVC和OKCoin)可以传入一个参数, 指定要获取的合约类型</small> </blockquote> <blockquote> <p>SetMarginLevel(MarginLevel)</p> <small>设置Buy(多单)或者Sell(空单)的杆杠大小, MarginLevel有5, 10, 20 三个可选参数</small> <small>796支持5,10,20,50三个选项, BitVC的LTC不支持20倍杠杆, OKCoin支持10倍和20倍</small> <small>如: exchange.SetMarginLevel(5) </small> </blockquote> <blockquote> <p>SetDirection(Direction)</p> <small>设置Buy或者Sell下单类型, Direction可以取buy, closebuy, sell, closesell四个参数</small> <small>buy指买多开仓,closebuy指多头平仓, sell指卖空开仓, closesell指空头平仓</small> <small>如: exchange.SetMarginLevel(5); exchange.SetDirection("buy"); exchange.Buy(1000, 2)</small> <small>如: exchange.SetMarginLevel(5); exchange.SetDirection("closebuy"); exchange.Sell(1000, 2)</small> </blockquote> <blockquote> <p>SetContractType(ContractType)</p> <small>796支持: "week", "weekcny", 默认为子账户A, 要指定子账户是A还是B, 在合约后加"@A"或"@B", 如: "day@A" 为日合约A子账户</small> <small>设置合约的类型, BitVC有week和quarter和next_week三个可选参数, OKCoin期货有this_week, next_week, month, quarter四个参数</small> <small>如: exchange.SetContractType("week") </small> </blockquote> <blockquote> <p>期货交易中Buy, Sell, CancelOrder和现货交易的区别</p> <small>Buy或Sell之前需要调用SetMarginLevel和SetDirection明确操作类型</small> <small>796的 CancelOrder之前需要调用SetDirection明确订单类型</small> <small>如: exchange.SetMarginLevel(5); exchange.SetDirection("sell"); exchange.Sell(1000, 2)</small> <small>如: exchange.SetDirection("buy"); exchange.CancelOrder(123);</small> </blockquote> <blockquote> <p>BitVC期货交易中Buy, Sell, GetOrder, SetMarginLevel与796的区别</p> <small>GetOrder里面的Amount为订单总金额, DealAmount为订单完成的金额, 不是币的个数</small> <small>Buy或Sell第二个参数不是币的数量而是订单的总金额(100的倍数)</small> <small>SetMarginLevel LTC不支持20倍杠杆</small> <small>如: exchange.SetContractType("week"); exchange.SetDirection("sell"); exchange.Sell(1000, 100), 就是以1000元一个币的价格开100元的空头</small> </blockquote> <blockquote> <p>OKCoin期货交易中Buy, Sell, GetOrder, SetMarginLevel与796的区别</p> <small>GetOrder里面的Amount为合约数(一份合约为10$), DealAmount为订单完成的合约数, 不是币的个数</small> <small>Buy或Sell第二个参数不是币的数量而是合约的份数(整数且大于0)</small> <small>SetMarginLevel 只支持10倍和20倍的杠杆</small> <small>如: exchange.SetContractType("this_week"); exchange.SetDirection("sell"); exchange.Sell(1000, 1), 就是以1000元一个币的价格做空一份合约(10$的LTC或者100$的BTC)</small> </blockquote> </blockquote> <blockquote> <p>自定义颜色</p> <small>每个消息字符串都可以用"#ff0000"这样的RGB值结尾, 代表需要显示的前景色, 如果为#ff0000112233这样的格式, 则后六后代表背景色</small> <p>补充说明</p> <small>如果函数返回为空(undefined或者null),表示函数出错,交易所限制了调用频率或网络原因导致, 请一定做好判断, 不然会导致程序出错机器人退出 !</small> <small>由API返回的数据结构的成员变量，为保证唯一性，不允许更改原生成员变量，比如var ticker=GetTicker();后ticker.Last=10;是不允许的,但ticker.xx=10这样的新属性是允许赋值的</small> </blockquote> </blockquote> <div comment="\'api document\'"></div> </div>')
    }]), angular.module("views/bbs.html", []).run(["$templateCache", function(a) {
        a.put("views/bbs.html", '<h1>{{ zone }}</h1> <div comment="zone"></div>')
    }]), angular.module("views/dialog-alert.html", []).run(["$templateCache", function(a) {
        a.put("views/dialog-alert.html", '<div class="modal-header"> <button type="button" class="close" ng-click="ok()">&times;</button> <h3 class="modal-title">{{ title }}</h3> </div> <div class="modal-body"> <div class="row"> <div class="col-md-12"> <div compile="msg"></div> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-success" ng-click="ok()">确定</button> </div>')
    }]), angular.module("views/dialog-confirm.html", []).run(["$templateCache", function(a) {
        a.put("views/dialog-confirm.html", '<div class="modal-header"> <button type="button" class="close" ng-click="cancel()">&times;</button> <h3 class="modal-title">{{ title }}</h3> </div> <div class="modal-body"> <div class="row"> <div class="col-md-12"> <div compile="msg"></div> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-danger" ng-click="cancel()">取消</button> <button class="btn btn-success" ng-disabled="isBusy" ng-click="confirm()">确定</button> </div>')
    }]), angular.module("views/dialog-prompt.html", []).run(["$templateCache", function(a) {
        a.put("views/dialog-prompt.html", '<div class="modal-header"> <button type="button" class="close" ng-click="cancel()">&times;</button> <h3 class="modal-title">{{ cfg.title }}</h3> </div> <div class="modal-body"> <div class="row" ng-if="!error"> <form novalidate name="frm" class="form-horizontal col-md-10 col-md-offset-1" role="form" ng-submit="submit(password)"> <div class="form-group"> <label for="inputBox" class="col-md-4 control-label">{{ cfg.inputname }}</label> <div class="col-md-8"> <input type="{{ cfg.inputtype }}" ng-focus="true" ng-model="inputTxt" class="form-control" id="inputBox" placeholder="{{ cfg.inputname }}" required> </div> </div> <div class="form-group"> <div class="col-md-12"> <div compile="cfg.description"></div> </div> </div> </form> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> <div class="modal-footer"> <button class="btn btn-danger" ng-click="cancel()">关闭</button> <button class="btn btn-success" ng-disabled="isBusy" ng-click="submit(inputTxt)">{{ cfg.confirmname }}</button> </div>')
    }]), angular.module("views/disable-twofactor.html", []).run(["$templateCache", function(a) {
        a.put("views/disable-twofactor.html", '<div class="row"> <div class="col-md-6 col-md-offset-3" ng-show="uncompleted"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">解除二次验证</h3> </div> <div class="panel-body"> <button class="btn btn-warning" type="submit" ng-disabled="pending" ng-click="submit()">解除二次验证</button> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div> <div class="alert alert-success" ng-show="!uncompleted"> 解除二次验证成功! <a class="label label-success" href="#!/login">登录</a> </div>')
    }]), angular.module("views/login.html", []).run(["$templateCache", function(a) {
        a.put("views/login.html", '<div class="row" ng-hide="isLogin"> <div class="col-md-6 col-md-offset-3"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">用户登录</h3> </div> <div class="panel-body"> <form novalidate name="frm" class="form-horizontal col-md-10 col-md-offset-1" role="form" ng-submit="submit()" form-autofill-fix> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input type="text" ng-focus="!detectdUser" ng-model="username" class="form-control" id="inputUsername" placeholder="用户名" required> </div> </div> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" ng-focus="detectdUser" ng-model="password" class="form-control" id="inputPassword" placeholder="密码" required> </div> </div> <div class="form-group"> <button class="btn btn-default" type="submit" ng-disabled="pending">{{ pending ? \'登录中...\' : \'登陆\' }}</button> &nbsp;<a href="#!/sign-up" class="label label-success">注册</a>&nbsp;<a href="#!/reset-password" class="label label-danger">忘记密码</a> </div> </form> </div> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> <div class="row" align="center" ng-if="isShowApp"> <a href="https://itunes.apple.com/us/app/botvs/id980675072?l=zh&ls=1&mt=8" target="_blank"><img src="images/iphone.png" border="0"></a> <a href="http://dn-botvs.qbox.me/botvs.apk" target="_blank"><img src="images/android.png" border="0"></a> </div> <div class="alert alert-danger" ng-show="isLogin">您已经成功登录! <a href="#!/m/dashboard">返回主页</a></div>')
    }]), angular.module("views/m/add-node.html", []).run(["$templateCache", function(a) {
        a.put("views/m/add-node.html", '<div class="row" ng-loading> <blockquote> <p>步骤1: 点击下载托管者</p> <p><font color="red">注意.: 托管者创建一个可以托管多个机器人, 不需要运行多个, 除非需要指定机器人在哪一台上运行, 或者超过10个机器人并发运行!</font></p> <small>最后更新时间: 2015/03/26 00:00:00</small> <small>最后更新版本: 281</small> <blockquote> <p><font color="red">Windows</font> 通用带界面版本</p> <small> <a href="http://dn-botvs.qbox.me/281/robot_windows_gui.zip" class="label label-success">下载</a> </small> </blockquote> <blockquote> <p><b>32</b>&nbsp;位操作系统 (跨平台版)</p> <small> <a href="http://dn-botvs.qbox.me/281/robot_windows_386.zip" class="label label-success">Windows</a> <a href="http://dn-botvs.qbox.me/281/robot_linux_386.tar.gz" class="label label-danger">Linux</a> <a href="http://dn-botvs.qbox.me/281/robot_darwin_386.tar.gz" class="label label-warning">Mac</a> <a href="http://dn-botvs.qbox.me/281/robot_linux_arm.tar.gz" class="label label-default">Linux ARM (Raspberry Pi & CubieBoard)</a> </small> </blockquote> <blockquote> <p><b>64</b>&nbsp;位操作系统 (跨平台版)</p> <small> <a href="http://dn-botvs.qbox.me/281/robot_windows_amd64.zip" class="label label-success">Windows</a> <a href="http://dn-botvs.qbox.me/281/robot_linux_amd64.tar.gz" class="label label-danger">Linux</a> <a href="http://dn-botvs.qbox.me/281/robot_darwin_amd64.tar.gz" class="label label-warning">Mac</a> </small> </blockquote> </blockquote> <blockquote> <p>步骤2: 启动托管者</p> <blockquote> <p>Windows 带界面版本 <small>输入地址: <code>{{ rpcs }} </code></small> <small>输入botvs平台的登陆密码, 然后点击运行</small> </p></blockquote> <blockquote> <p>Windows 命令行 <small><code>robot.exe -s {{ rpcs }} -p [登录密码]</code></small> <small>如果不跟-p参数程序会提示输入密码</small> </p></blockquote> <blockquote> <p>Linux, Mac, ...</p> <small><code>./robot -s {{ rpcs }} -p [登录密码]</code></small> <small>运行之前先chmod +x robot 赋予权限</small> <small>如果不跟-p参数程序会提示输入密码</small> </blockquote> </blockquote> <blockquote> <p>步骤3:</p> <small>完成部署, <a href="#!/m/dashboard">返回首页刷新</a></small> <small><font color="red">关注下方微信号(或搜索公众号botvs或botvs123) 可第一时间收到最新的策略/托管者及平台的提前更新通知 !</font></small> <img height="172" width="172" src="images/weixin.jpg"> </blockquote> <blockquote> <p>注意:</p> <small>退出应用程序一定要用Ctrl + C退出, 不能直接关闭托管者进程, 如果在非windows系统后台运行请用kill -2 [pid] 结束</small> <small>命令行中包含的字符串不能透漏给别人</small> </blockquote> <blockquote> <p>为什么平台不帮着运行机器人, 而要使用托管者模式 ?</p> <small>好处多多, 比如你可以把托管者放在访问交易所速度最快的服务器上, 常年运行</small> <small>如果你想在国外交易所交易, 可以在国外租个服务器跑托管者运行机器人</small> <small>风险可控, 不用担心本平台访问不到影响交易, 托管者只给本平台上传交易日志, 对交易操作不参于</small> <small>这是新型的云控模式, 可以实现分布式管理, 其它优点, 自己体会吧...</small> </blockquote> </div>')
    }]), angular.module("views/m/add-platform.html", []).run(["$templateCache", function(a) {
        a.put("views/m/add-platform.html", '<div class="row" ng-show="!uncompleted"> <div class="col-md-10 col-md-offset-1"> <div class="panel panel-default" ng-show="isEdit || exchanges.length>0"> <div class="panel-heading"> <h3 class="panel-title">添加交易所 - API接口</h3> </div> <div class="panel-body"> <form class="form-horizontal" role="form" novalidate name="frm" ng-submit="submit()"> <div class="form-group"> <label for="id_exchange" class="col-md-2 col-xs-3 control-label">交易所</label> <div class="col-md-3 col-xs-7"> <select ng-show="!isEdit" id="id_exchange" ng-model="exchange" ng-options="m.name for m in exchanges | orderBy:\'eid\'" class="form-control" required></select> <input ng-if="isEdit" ng-model="name" readonly type="text" class="form-control" required> </div> <div class="col-md-1 col-xs-2" ng-if="exchange"> <a target="_blank" href="{{exchange.eid | eid2url}}"><img style="margin-top:8px" border="0" ng-src="images/{{ exchange.eid | eid2png }}"></a> </div> </div> <div class="form-group" ng-show="exchange.eid==8 || exchange.eid==21"> <label for="id_client_id" class="col-md-2 control-label">{{ exchange.eid==21 ? \'Client ID\' : \'APP ID\'}}</label> <div class="col-md-3"> <input type="text" ng-model="client_id" class="form-control" id="id_client_id" placeholder="Client ID" ng-required="exchange.eid==8 || exchange.eid==21"> </div> </div> <div class="form-group" ng-show="exchange.eid==25"> <label for="id_username" class="col-md-2 control-label">Username</label> <div class="col-md-3"> <input type="text" ng-model="username" class="form-control" id="id_username" placeholder="用户名" ng-required="exchange.eid==25"> </div> </div> <div class="form-group" ng-show="exchange.eid==25"> <label for="id_password" class="col-md-2 control-label">Password</label> <div class="col-md-3"> <input type="password" ng-model="password" class="form-control" id="id_password" placeholder="密码" ng-required="exchange.eid==25"> </div> </div> <div class="form-group"> <label for="id_access_key" class="col-md-2 control-label">Access Key</label> <div class="col-md-6"> <input type="text" ng-model="access_key" class="form-control" id="id_access_key" placeholder="Access Key" required> </div> </div> <div class="form-group"> <label for="id_secret_key" class="col-md-2 control-label">Secret Key</label> <div class="col-md-6"> <input type="text" ng-model="secret_key" class="form-control" id="id_secret_key" placeholder="{{ isEdit ? \'密钥已经加密\' : \'Secret Key\'}}" required> </div> </div> <div class="form-group"> <label for="id_label" class="col-md-2 control-label">标签</label> <div class="col-md-3"> <input type="text" popover-trigger="mouseenter" popover="自定义显示名称, 一个交易所可以添加多个账号的API" ng-model="exchange.label" class="form-control" id="id_label" placeholder="标签" required> </div> </div> <div class="form-group"> <div class="col-md-offset-2 col-md-10"> <button class="btn btn-default" type="submit" ng-disabled="pending">{{isEdit ? "保存" : "添加"}}</button> &nbsp;<a href="#!/m/dashboard" class="label label-success">返回</a> </div> </div> </form> </div> </div> <div class="alert alert-success" ng-if="isEdit">密钥为了提高安全度已经加密, 修改配置需重新输入密钥, 点击返回放弃修改. </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div>')
    }]), angular.module("views/m/add-robot.html", []).run(["$templateCache", function(a) {
        a.put("views/m/add-robot.html", '<div class="row" ng-show="complete && strategies.length && platforms.length && nodes.length"> <div class="col-md-10 col-md-offset-1"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">添加机器人</h3> </div> <div class="panel-body"> <form class="form-horizontal" role="form" novalidate name="frm" ng-submit="submit()"> <div class="form-group"> <label class="col-md-2 col-xs-3 control-label">标签名称</label> <div class="col-md-6 col-xs-8"> <input type="text" autocomplete="on" ng-model="name" class="form-control" id="inputName" placeholder="Robot Name" required> </div> </div> <div class="form-group"> <label class="col-md-2 col-xs-3 control-label">预约时间</label> <div class="col-md-4 col-xs-8"> <div class="input-group date form_datetime"> <input type="text" size="16" class="form-control" ng-model="scheduleTime" required> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span> </span> </div> </div> </div> <div class="form-group"> <label class="col-md-2 col-xs-3 control-label">运行策略</label> <div class="col-md-4 col-xs-8"> <select ng-model="strategy_selected" ng-options="m.name for m in strategies" class="form-control" required> </select> </div> </div> <div class="form-group" ng-if="strategy_selected.scriptArgList.length > 0"> <label class="col-md-2 col-xs-3 control-label">策略参数</label> <div class="col-md-6 col-xs-9" style="margin-top:25px"> <div class="row" style="margin-top:2px;margin-bottom:8px" ng-repeat="pair in strategy_selected.scriptArgList" ng-show="showArg(pair)"> <div class="col-md-3 col-xs-4"><span class="label label-success pull-right" style="margin-top:7px">{{ pair[1] }}</span></div> <div ng-class="pair[3].inputType == \'text\' ? \'col-md-9 col-xs-8\' : \'col-md-4 col-xs-6\'" popover-trigger="mouseenter" popover="{{ pair[2] }}" popover-title="{{ pair[3].name }}" popover-placement="right" popover-append-to-body="true"> <input autocomplete="on" ng-if="pair[3].inputType != \'checkbox\' && pair[3].inputType != \'selected\'" type="{{ pair[3].inputType }}" ng-model="pair.value" class="form-control" required> <div class="checkbox" ng-if="pair[3].inputType == \'checkbox\'"> <label> <input type="checkbox" ng-model="pair.value"> (勾上为true) </label> </div> <div ng-if="pair[3].inputType == \'selected\'"> <select ng-model="pair.indexValue" class="form-control"> <option value="{{ $index }}" ng-repeat="item in pair.value.split(\'|\')">{{ item }} </select> </div> </div> </div> </div> </div> <div class="form-group"> <label class="col-md-2 col-xs-3 control-label">K 线周期</label> <div class="col-md-4 col-xs-8"> <select ng-model="ktick_selected" ng-options="m.name for m in kticks" class="form-control" required> </select> </div> </div> <div class="form-group"> <label class="col-md-2 col-xs-3 control-label">交易平台</label> <div class="col-md-2 col-xs-4"> <select ng-model="platform_selected" ng-change="platform_stock_selected=platform_selected.stocks[0]" ng-options="m.label for m in platforms | orderBy:\'eid\'" class="form-control" required> </select> </div> <div class="col-md-2 col-xs-3"> <select ng-model="platform_stock_selected" ng-options="m for m in platform_selected.stocks" class="form-control" required> </select> </div> <div class="col-md-1 col-xs-1"> <a ng-class="pairs_select.length > 0 ? \'btn btn-success\' : \'btn btn-danger\'" ng-click="addPair()"><i class="glyphicon glyphicon-plus"></i></a> </div> </div> <div class="form-group"> <div class="col-md-10 col-md-offset-2"> <div ng-if="pairs_select.length == 0"> <p class="label label-danger">请点击加号添加交易所平台, 红色背景标签为主交易所.</p> </div> <div class="bootstrap-tags" ng-if="pairs_select.length > 0"> <span ng-class="$first ? \'tag label label-danger\' : \'tag label label-info\'" ng-repeat="pair in pairs_select">{{pair.label}} / {{ pair.stock }}<span data-role="remove" ng-click="removePair(pair)"></span></span> </div> </div> </div> <div class="form-group"> <label class="col-md-2 col-xs-3 control-label">托管者</label> <div class="col-md-4 col-xs-8"> <select id="node_selected" class="form-control" required> <option value="-1" selected>自动分配 <option ng-repeat="node in nodes  | orderBy:\'id\'" value="{{node.id}}">{{node.id}}: {{node.ip}} - {{node.os}} </select> </div> </div> <div class="form-group"> <div class="col-md-offset-2 col-xs-offset-3 col-md-10"> <button class="btn btn-default" ng-disabled="name.length == 0 || pairs_select.length == 0" type="submit" ng-disabled="pending">创建机器人</button> <a href="#!/m/dashboard" class="label label-success">取消</a> </div> </div> </form> </div> </div> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> <div ng-if="complete"> <div class="row" ng-show="strategies.length==0"> <div class="alert alert-danger"> 您还没有添加新策略 ! <a href="#!/m/add-strategy" class="label label-success">编写策略</a>&nbsp;&nbsp;<a href="#!/square" class="label label-danger">去广场免费复制</a> </div> </div> <div class="row" ng-show="platforms.length==0"> <div class="alert alert-danger"> 您还没有添加交易所 ! <a href="#!/m/add-platform" class="label label-success">点击添加</a> </div> </div> <div class="row" ng-show="nodes.length==0"> <div class="alert alert-danger"> 您还没有运行托管者 ! <a href="#!/m/add-node" class="label label-success">点击添加</a> </div> </div> </div>')
    }]), angular.module("views/m/add-strategy.html", []).run(["$templateCache", function(a) {
        a.put("views/m/add-strategy.html", '<div class="row" ng-loading> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">策略编辑</h3> </div> <div class="panel-body"> <form class="form-horizontal" role="form" novalidate name="frm" ng-submit="submit()"> <div class="form-group"> <label for="inputName" class="col-md-1 control-label">名称</label> <div class="col-md-11"> <input type="text" ng-model="name" class="form-control" id="inputName" placeholder="策略名称" required> </div> </div> <div class="form-group"> <label class="col-md-1 control-label">描述</label> <div class="col-md-11"> <textarea type="text" ng-model="description" class="form-control" placeholder="策略描述" required></textarea> </div> </div> <div class="form-group"> <label for="inputName" class="col-md-1 control-label">代码</label> <div class="col-md-11"> <div style="height:400px" id="code-area"></div> </div> <div class="col-md-11 col-md-offset-1" style="margin-top:2px"> <div class="pull-right"> <div class="btn-group" role="group"> <span class="btn btn-default btn-xs" ng-click="switchVim()">{{ isVimMode ? \'关闭\' : \'开启\' }} Vim 模式</span> <span class="btn btn-default btn-xs" ng-click="switchFullScreen()">全屏 ESC退出</span> </div> </div> </div> </div> <div class="panel panel-default col-md-offset-1"> <div class="panel-heading"> <h3 class="panel-title">全局变量 - {{ scriptArgList.length }} 个参数 (拖动十字图标排序)</h3> </div> <div class="panel-body"> <div class="form-group"> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">变量</button> </span> <input type="text" ng-model="inputArgName" class="form-control" placeholder="英文"> </div> </div> <div class="col-md-3"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">描述</button> </span> <input type="text" ng-model="inputArgShowName" class="form-control" placeholder="中/英"> </div> </div> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">备注</button> </span> <input type="text" ng-model="inputArgDesc" class="form-control" placeholder="中/英"> </div> </div> <div class="col-md-2"> <select class="form-control" ng-model="inputArgType" ng-options="m.name for m in scriptArgsSelectList"></select> </div> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">默认</button> </span> <input type="text" ng-model="inputArgDef" class="form-control" placeholder="默认值"> </div> </div> <div class="col-md-1"> <a class="btn btn-success btn-sm" ng-click="addArg()"><i class="glyphicon glyphicon-plus"></i></a> </div> </div> <span class="label label-warning" ng-if="scriptArgList.length == 0">请点击加号添加策略参数</span> <table class="table table-condensed" ng-if="scriptArgList.length > 0"> <thead> <th class="col-md-2">变量 <th class="col-md-4">描述 <th class="col-md-2">类型 <th class="col-md-3">默认值 <th class="col-md-1">编辑  <tbody ng-sortable="{handle: \'.glyphicon-move\', scroll:true, animation: 200}"> <tr ng-repeat="pair in scriptArgList"> <td>{{ pair[0] }} <td><span class="glyphicon glyphicon-move pull-right" style="cursor:move" aria-hidden="true"></span><span popover-trigger="mouseenter" popover="{{ pair[2] }}">{{ pair[1] }}</span> <td>{{ pair[3].name }} <td><div>{{ pair[4] }}</div> <td> <a class="btn btn-default btn-xs" ng-click="copyArg($index)" popover-trigger="mouseenter" popover="复制变量到编辑框, 更改后点保存"><i class="glyphicon glyphicon-pencil"></i></a> <a ng-confirm-click="删除参数后有可能会导致脚本不能正常工作，确定要这样做吗?" class="btn btn-danger btn-xs" ng-click="removeArg($index)" popover-trigger="mouseenter" popover="删除变量"><i class="glyphicon glyphicon-remove"></i></a>    </table> </div> </div> <div class="panel panel-default col-md-offset-1"> <div class="panel-heading"> <h3 class="panel-title">策略交互</h3> </div> <div class="panel-body"> <div class="form-group"> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">按钮</button> </span> <input type="text" ng-model="inputCMDName" class="form-control" placeholder="中/英"> </div> </div> <div class="col-md-3"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">描述</button> </span> <input type="text" ng-model="inputCMDShowName" class="form-control" placeholder="中/英"> </div> </div> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">备注</button> </span> <input type="text" ng-model="inputCMDDesc" class="form-control" placeholder="中/英"> </div> </div> <div class="col-md-2"> <select class="form-control" ng-model="inputCMDType" ng-options="m.name for m in scriptCMDSelectList"></select> </div> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">默认</button> </span> <input type="text" ng-model="inputCMDDef" class="form-control" placeholder="默认值"> </div> </div> <div class="col-md-1"> <a class="btn btn-success btn-sm" ng-click="addCMD()"><i class="glyphicon glyphicon-plus"></i></a> </div> </div> <span class="label label-warning" ng-if="scriptCMDList.length == 0">请点击加号添加交互功能</span> <table class="table table-condensed" ng-if="scriptCMDList.length > 0"> <thead> <th class="col-md-2">按钮 <th class="col-md-4">描述 <th class="col-md-2">类型 <th class="col-md-3">默认值 <th class="col-md-1">编辑  <tbody ng-sortable="{handle: \'.glyphicon-move\', scroll:true, animation: 200}"> <tr ng-repeat="pair in scriptCMDList"> <td>{{ pair[0] }} <td><span class="glyphicon glyphicon-move pull-right" style="cursor:move" aria-hidden="true"></span><span popover-trigger="mouseenter" popover="{{ pair[2] }}">{{ pair[1] }}</span> <td>{{ pair[3].name }} <td>{{ pair[4] }} <td> <a class="btn btn-default btn-xs" ng-click="copyCMD($index)" popover-trigger="mouseenter" popover="复制变量到编辑框, 更改后点保存"><i class="glyphicon glyphicon-pencil"></i></a> <a ng-confirm-click="删除后有可能会导致脚本不能正常工作，确定要这样做吗?" class="btn btn-danger btn-xs" ng-click="removeCMD($index)" popover-trigger="mouseenter" popover="删除此功能"><i class="glyphicon glyphicon-remove"></i></a>    </table> </div> </div> <div class="panel panel-default col-md-offset-1" ng-if="scriptCMDList.length > 0"> <div class="panel-heading"> <h3 class="panel-title">交互预览</h3> </div> <div class="panel-body"> <div class="row" style="margin-top:2px;margin-bottom:8px" ng-repeat="pair in scriptCMDList"> <div class="col-md-2" ng-if="pair[1][0]!=\'@\'"><span class="label label-success pull-right" style="margin-top:7px">{{ pair[1] }}</span></div> <div class="col-md-3" ng-if="pair[3].inputType != \'button\'" ng-class="pair[3].inputType == \'text\' ? \'col-md-8\' : \'col-md-3\'" popover-trigger="mouseenter" popover="{{ pair[2] }}" popover-title="{{ pair[3].name }}" popover-placement="right" popover-append-to-body="true"> <input ng-if="pair[3].inputType != \'checkbox\' && pair[3].inputType != \'selected\' && pair[3].inputType != \'button\'" type="{{ pair[3].inputType }}" ng-model="pair.value" class="form-control" required> <div class="checkbox" ng-if="pair[3].inputType == \'checkbox\'"> <label> <input type="checkbox" ng-model="pair.value"> (勾上为true) </label> </div> <div ng-if="pair[3].inputType == \'selected\'"> <select ng-model="pair.indexValue" class="form-control"> <option value="{{ $index }}" ng-repeat="item in pair.value.split(\'|\')">{{ item }} </select> </div> </div> <div class="col-md-2"><label class="btn btn-success btn-sm">{{ pair[0] }}</label></div> </div> </div> </div> <div class="form-group"> <div class="col-md-offset-1 col-md-10"> <button class="btn btn-default" type="submit" ng-disabled="pending || testing">{{isEdit ? "保存策略" : "创建策略"}}</button> <a href="#!/m" class="label label-danger" ng-disabled="pending || testing">返回</a> </div> </div> </form> </div> </div> <div class="panel panel-default" ng-show="!isApp"> <div class="panel-heading"> <h3 class="panel-title">模拟测试</h3> </div> <div class="panel-body"> <form class="form-horizontal" role="form" novalidate name="frmtest"> <div class="form-group"> <label for="inputName" class="col-md-1 control-label">回测</label> <div class="col-md-4"> <div class="input-group date bs_stime" popover-trigger="mouseenter" popover="模拟测试开始时间"> <span class="input-group-btn"> <button class="btn btn-default" type="button">开始</button> </span> <input class="form-control" size="16" type="text" ng-model="stime" data-date-format="YYYY-MM-DD HH:mm:ss" required> <span class="input-group-addon datepickerbutton"> <span class="glyphicon glyphicon-calendar"></span> </span> </div> </div> <div class="col-md-4"> <div class="input-group date bs_etime" popover-trigger="mouseenter" popover="模拟测试结束时间"> <span class="input-group-btn"> <button class="btn btn-default" type="button">结束</button> </span> <input class="form-control" size="16" type="text" ng-model="etime" data-date-format="YYYY-MM-DD HH:mm:ss" required> <span class="input-group-addon datepickerbutton"> <span class="glyphicon glyphicon-calendar"></span> </span> </div> </div> <div class="col-md-2"> <select ng-model="ktick_selected" ng-options="m.name for m in kticks" class="form-control" required></select> </div> </div> <div class="form-group"> <label class="col-md-1 control-label">平台</label> <div class="col-md-2"> <select ng-model="platform_selected" ng-change="platform_stock_selected=platform_selected.stocks[0]" ng-options="m.name for m in platforms" class="form-control" required> </select> </div> <div class="col-md-2"> <select ng-model="platform_stock_selected" ng-options="m for m in platform_selected.stocks" class="form-control" required> </select> </div> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">余额</button> </span> <input type="number" ng-model="accountBalance" class="form-control" placeholder="余额" required> </div> </div> <div class="col-md-2"> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" type="button">余币</button> </span> <input type="number" ng-model="accountStocks" class="form-control" placeholder="币数" required> </div> </div> <div class="col-md-2"> <a ng-class="pairs_select.length > 0 ? \'btn btn-success btn-sm\' : \'btn btn-danger btn-sm\'" popover-trigger="mouseenter" popover="点击添加新平台" ng-click="addPair()"><i class="glyphicon glyphicon-plus"></i></a> </div> </div> <div class="form-group"> <div class="col-md-12 col-md-offset-1"> <div ng-if="pairs_select.length == 0"> <p class="label label-danger">点击加号添加平台, 红色背景标签为主交易所.</p> </div> <div class="bootstrap-tags" ng-if="pairs_select.length > 0"> <span ng-class="$first ? \'tag label label-danger\' : \'tag label label-info\'" popover-trigger="mouseenter" popover="Balance: {{pair.balance}}, Stocks: {{pair.stocks}}" ng-repeat="pair in pairs_select">{{pair.name}} / {{ pair.stock }}<span data-role="remove" ng-click="removePair(pair)"></span></span> </div> </div> </div> <div class="form-group" ng-if="scriptArgList.length > 0"> <label class="col-md-1 control-label">参数</label> <div class="col-md-8"> <div class="row" style="margin-top:2px;margin-bottom:8px" ng-repeat="pair in scriptArgList" ng-show="showArg(pair)"> <div class="col-md-3"><span class="label label-success pull-right" style="margin-top:7px">{{ pair[1] }}</span></div> <div ng-class="pair[3].inputType == \'text\' ? \'col-md-8\' : \'col-md-3\'" popover-trigger="mouseenter" popover="{{ pair[2] }}" popover-title="{{ pair[3].name }}" popover-placement="right" popover-append-to-body="true"> <input ng-if="pair[3].inputType != \'checkbox\' && pair[3].inputType != \'selected\'" type="{{ pair[3].inputType }}" ng-model="pair.value" class="form-control" required> <div class="checkbox" ng-if="pair[3].inputType == \'checkbox\'"> <label> <input type="checkbox" ng-model="pair.value"> (勾上为true) </label> </div> <div ng-if="pair[3].inputType == \'selected\'"> <select ng-model="pair.indexValue" class="form-control"> <option value="{{ $index }}" ng-repeat="item in pair.value.split(\'|\')">{{ item }} </select> </div> </div> </div> </div> </div> <div class="form-group"> <div class="col-md-offset-1 col-md-2"> <a class="btn btn-primary" ng-disabled="pending || testing || pairs_select.length == 0" ng-click="runBacktest()">{{ testing ? \'正在回测, 耐心等待...\' : \'开始回测\' }}</a> </div> <div class="col-md-2"> <a class="btn btn-danger" ng-if="canStop && testing" ng-click="stopBacktest()">停止</a> </div> </div> </form> </div> </div> <div class="panel panel-default" ng-show="!isApp"> <div class="panel-heading"> <h3 class="panel-title" id="progress" ng-style="statusStyle">回测日志</h3> </div> <div class="panel-body"> <p ng-if="logs.length == 0" class="alert alert-success">暂无日志</p> <div id="chart_{{ pair[0] }}_{{ pair[1] }}" style="height: 500px; max-width: 100%" ng-repeat="pair in chartPairs"> <p class="label label-warning">图表正在等待回测结果</p> </div> <div id="sandbox_chart_profit" style="height: 400px; max-width:100%" ng-if="show_chart_profit"> <p class="label label-warning">图表正在加载...</p> </div> <div id="sandbox_chart_chart" style="height: 400px; max-width:100%" ng-if="show_chart_chart"> <p class="label label-warning">图表正在加载...</p> </div> <table ng-if="logs.length>0" class="table table-condensed nowrap" style="table-layout:fixed"> <thead> <tr> <th width="150">日期 <th width="120">平台 <th width="55">类型 <th width="85">价格 <th width="85">数量 <th>信息   <tr ng-repeat="item in logs | orderBy:\'-id\'" ng-style="item.style"> <td width="150">{{ item.date }} <td width="120">{{ item.platform_id | eid2str }} <td><label popover-trigger="mouseenter" popover="{{item.order_id > 0 ? \'订单号: \' + item.order_id : \'\'}}" ng-class="\'label \' + [\'label-primary\',\'label-success\',\'label-default\',\'label-default\',\'label-danger\',\'label-info\',\'label-warning\'][item.log_type]">{{ [\'买入\', \'卖出\', \'撤销\', \'错误\', \'收益\', \'信息\', \'重启\'][item.log_type] }}</label> <td>{{ item.priceStr }} <td>{{ item.amountStr }} <td nowrap>{{ item.extra != \'\' ? item.extra : \'\'}}  </table> </div> </div> <div class="alert alert-danger col-md-4 col-md-offset-4" ng-if="error"> {{ error }} </div> </div>')
    }]), angular.module("views/m/dashboard.html", []).run(["$templateCache", function(a) {
        a.put("views/m/dashboard.html", '<div class="row" ng-loading> <div ng-if="showSlide()" ng-if="(robots.length + privateStrategies.length + platforms.length) > 8" class="visible-lg" style="margin-bottom:10px;position:fixed;margin-left:-115px;width:110px;margin-top:100px"> <div class="list-group"> <a href="#section-robots" class="list-group-item" du-smooth-scroll du-scrollspy offset="10">机器人<span class="badge pull-right">{{ robots.length }}</span></a> <a href="#section-strategies" class="list-group-item" du-smooth-scroll du-scrollspy offset="10">策略库<span class="badge pull-right">{{ privateStrategies.length }}</span></a> <a href="#section-platforms" class="list-group-item" du-smooth-scroll du-scrollspy offset="10">交易所<span class="badge pull-right">{{ platforms.length }}</span></a> <a href="#section-nodes" class="list-group-item" du-smooth-scroll du-scrollspy offset="10">托管者<span class="badge pull-right">{{ nodes.length }}</span></a> <a ng-if="usdcny>0" href="#section-market" class="list-group-item" du-smooth-scroll du-scrollspy offset="10">最新价<span class="badge pull-right">{{ tickers.length }}</span></a> </div> </div> <div id="section-robots" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">机器人</h3> </div> <div class="panel-body"> <a href="#!/m/add-robot" class="label label-success"><i class="glyphicon glyphicon-plus"></i>&nbsp;创建机器人</a>&nbsp; <span ng-if="mobiles.length > 0"> <span class="badge" ng-repeat="mobile in mobiles" style="margin-left:3px" popover-trigger="mouseenter" popover="已绑定, 网络: {{ mobile.net }}, 重试次数: {{ mobile.retry }}">{{ mobile.model }}</span> </span> <span class="pull-right badge" ng-if="robots.length > 0">{{ robots.length }}</span> </div> <table class="table table-condensed table-hover" ng-if="robots.length > 0"> <thead> <tr> <th class="col-lg-5 col-xs-9">名称&nbsp;<a ng-if="robots.length > 1" href="" ng-click="robotsortBy=robotsortBy==\'name\'? \'-name\':\'name\'"><span ng-class="getSortStyle(robotsortBy, \'name\')"></span></a><span class="pull-right text-muted visible-lg">策略</span> <th class="col-lg-1 visible-lg">状态 <th class="col-lg-1 col-xs-2">盈利&nbsp;<a ng-if="robots.length > 1" href="" ng-click="robotsortBy=robotsortBy==\'profit\'? \'-profit\':\'profit\'"><span ng-class="getSortStyle(robotsortBy, \'profit\')"></span></a> <th class="col-lg-1 visible-lg">围观 <th class="col-lg-2 visible-lg">创建日期&nbsp;<a ng-if="robots.length > 1" href="" ng-click="robotsortBy=robotsortBy==\'date\'? \'-date\':\'date\'"><span ng-class="getSortStyle(robotsortBy, \'date\')"></span></a> <th class="col-lg-2 col-xs-1">操作   <tr ng-repeat="item in robots | orderBy:robotsortBy"> <td> <a href="#!/m/robot/{{item.id}}">{{ item.name }}</a> <span class="pull-right text-muted visible-lg">{{ item.strategy_name }}</span>  <td class="visible-lg"><span popover-trigger="mouseenter" popover="{{ stripSummary(item.summary) }}">{{ [\'排队中\', \'运行中\', \'停止中\', \'已完成\', \'已停止\', \'有错误\'][item.status] }}</span> <td>{{ item.profit }} <td class="visible-lg"> <a class="btn btn-danger btn-xs" ng-if="item.public == 1" ng-click="publicRobot(item, 0)">取消</a> <a class="btn btn-warning btn-xs" ng-if="item.public == 0" ng-click="publicRobot(item, 1)">公开</a>  <td class="visible-lg">{{ item.date }} <td> <div class="btn-group hidden-lg"> <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> {{ [\'排队中\', \'运行中\', \'停止中\', \'已完成\', \'已停止\', \'有错误\'][item.status] }}&nbsp;<span class="caret"></span> </button> <ul class="dropdown-menu dropdown-menu-right" role="menu"> <li ng-if="item.status>2"><a href="" ng-click="deleteRobot(item)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</a></li> <li ng-if="item.status<2"><a href="" ng-click="stopRobot(item)"><i class="glyphicon glyphicon-stop"></i>&nbsp;停止</a></li> <li ng-if="item.status>2"><a href="" ng-click="restartRobot(item)"><i class="glyphicon glyphicon-repeat"></i>&nbsp;重启</a></li> <li class="divider"></li> <li ng-if="item.public == 1"><a href="" ng-click="publicRobot(item, 0)"><i class="glyphicon glyphicon-eye-close"></i>&nbsp;取消公开</a></li> <li ng-if="item.public == 0"><a href="" ng-click="publicRobot(item, 1)"><i class="glyphicon glyphicon-eye-open"></i>&nbsp;公开围观</a></li> </ul> </div> <div class="visible-lg"> <span ng-if="item.status==2"></span> <button ng-if="item.status>2" ng-click="deleteRobot(item)" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</button> <button ng-if="item.status<2" ng-click="stopRobot(item)" class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-stop"></i>&nbsp;停止</button> <button ng-if="item.status>2" ng-click="restartRobot(item)" class="btn btn-success btn-xs"><i class="glyphicon glyphicon-repeat"></i>&nbsp;重启</button> </div>   </table> </div> <div id="section-strategies" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">策略</h3> </div> <div class="panel-body"> <a href="#!/m/add-strategy" class="label label-success"><i class="glyphicon glyphicon-plus"></i>&nbsp;编写新策略</a>&nbsp;<a href="#!/square" class="label label-danger"><i class="glyphicon glyphicon-shopping-cart"></i>&nbsp;去策略广场看看</a> <span class="pull-right badge" ng-if="privateStrategies.length > 0">{{ privateStrategies.length }}</span> </div> <table class="table table-condensed table-hover" ng-if="privateStrategies.length > 0"> <thead> <tr> <th class="col-lg-5 col-xs-11">名称 <th class="col-lg-1 visible-lg">分享 <th class="col-lg-2 visible-lg">创建日期 <th class="col-lg-2 visible-lg">最后修改 <th class="col-lg-2 col-xs-1">操作   <tr ng-repeat="item in privateStrategies"> <td> <a ng-if="item.is_owner" ng-href="#!/m/edit-strategy/{{item.id}}">{{ item.name }}</a> <a ng-if="!item.is_owner && (item.public == 2 || item.public == 3)" ng-href="#!/strategy/{{item.id}}">{{ item.name }}</a> <span ng-if="!item.is_owner && item.public == 0"><font color="red">{{ item.name }}</font></span> <span ng-if="item.is_owner && item.public == 1" class="visible-lg pull-right label label-success">已公开</span> <span ng-if="item.is_owner && item.public == 3" class="visible-lg pull-right label label-danger">{{ !item.buy_count ? \'已出售\' : \'已出售\' + item.buy_count + \'次\' }}</span> <span ng-if="item.is_owner && item.public == 2" class="visible-lg pull-right label label-warning">待审核</span> <span ng-if="!item.is_owner && (item.public == 2 || item.public == 3) && item.is_deleted" class="visible-lg pull-right label label-danger">已被作者 {{ item.username }} 删除</span> <span ng-if="!item.is_owner && item.public != 3" class="visible-lg pull-right label label-danger">作者 {{ item.username }} 已取消售卖</span>  <td class="visible-lg"> <div ng-if="!item.is_owner"> <span class="label label-success" popover-trigger="mouseenter" popover="过期时间: {{ item.expire_date }}">{{ item.is_expire ? \'已过期\' : \'已购买\' }}</span> </div> <div ng-if="item.is_owner"> <a class="btn btn-warning btn-xs" ng-if="item.public == 0" ng-click="shareStrategy(item, 1)">公开</a> <a class="btn btn-success btn-xs" ng-if="item.public == 0" ng-click="shareStrategy(item, 2)">售卖</a> <a class="btn btn-danger btn-xs" ng-if="item.public != 0" ng-click="shareStrategy(item, 0)">取消</a> <a class="btn btn-warning btn-xs" popover-trigger="mouseenter" popover="生成注册码" ng-if="item.public == 3" ng-click="createKey(item)">制码</a> </div>  <td class="visible-lg">{{ item.date }} <td class="visible-lg">{{ item.last_modified }} <td> <div class="btn-group hidden-lg"> <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> {{ item.is_owner ? [\'操作项\', \'已公开\', \'待审核\', \'已出售\'][item.public] : (item.is_expire ? \'已过期\' : \'已购买\') }}&nbsp;<span class="caret"></span> </button> <ul class="dropdown-menu dropdown-menu-right" role="menu"> <li><a ng-if="item.is_owner" href="#!/m/edit-strategy/{{item.id}}"><i class="glyphicon glyphicon-pencil"></i>&nbsp;编辑</a></li> <li><a ng-if="item.is_owner" href="#!/m/copy-strategy/{{item.id}}"><i class="glyphicon glyphicon-share-alt"></i>&nbsp;复制</a></li> <li><a href="" ng-click="deleteStrategy(item)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</a></li> <li class="divider"></li> <li ng-if="item.need_rebuy"><a href="" ng-click="rebuyStrategy(item)"><i class="glyphicon glyphicon-yen"></i>&nbsp;续费</a></li> <li><a href="" ng-if="item.public == 0" ng-click="shareStrategy(item, 1)"><i class="glyphicon glyphicon-share-alt"></i>&nbsp;公开</a></li> <li><a href="" ng-if="item.public == 0" ng-click="shareStrategy(item, 2)"><i class="glyphicon glyphicon-yen"></i>&nbsp;售卖</a></li> <li><a href="" ng-if="item.public != 0" ng-click="shareStrategy(item, 0)"><i class="glyphicon glyphicon-eye-close"></i>&nbsp;取消</a></li> <li><a href="" popover-trigger="mouseenter" popover="生成注册码" ng-if="item.public == 3" ng-click="createKey(item)"><i class="glyphicon glyphicon-dashboard"></i>&nbsp;制码</a></li> </ul> </div> <div class="visible-lg"> <a ng-click="deleteStrategy(item)" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</a> <span ng-if="item.need_rebuy">&nbsp;<button class="btn btn-success btn-xs" ng-click="rebuyStrategy(item)"><i class="glyphicon glyphicon-usd"></i>&nbsp;续费</button></span> &nbsp;<a ng-if="item.is_owner" href="#!/m/copy-strategy/{{item.id}}" class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-share-alt"></i>&nbsp;复制</a> &nbsp;<a ng-if="item.is_owner" class="btn btn-success btn-xs" href="#!/m/edit-strategy/{{item.id}}"><i class="glyphicon glyphicon-pencil"></i>&nbsp;编辑</a> </div>   </table> </div> <div id="section-nodes" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">托管者</h3> </div> <div class="panel-body"> <a href="#!/m/add-node" class="label label-success"><i class="glyphicon glyphicon-plus"></i>&nbsp;添加托管者</a> <span class="pull-right badge" ng-if="nodes.length > 0">{{ nodes.length }}</span> </div> <table class="table table-condensed table-hover" ng-if="nodes.length > 0"> <thead> <tr> <th class="col-lg-1 visible-lg">ID <th class="col-lg-2 col-xs-5">IP地址 <th class="col-lg-2 visible-lg">操作系统 <th class="col-lg-1 visible-lg">机器人 <th class="col-lg-2 visible-lg">版本 <th class="col-lg-2 col-xs-6">最近通信 <th class="col-lg-1 col-xs-1">操作   <tr ng-repeat="item in nodes"> <td class="visible-lg">{{ item.id }} <td>{{ item.ip }} <td class="visible-lg">{{ item.os }} <td class="visible-lg">{{ item.loaded }} <td class="visible-lg">{{ item.build }}<span class="pull-right label label-danger" ng-if="item.build!=\'2.81\'"><i class="glyphicon glyphicon-exclamation-sign"></i>&nbsp;不是最新版本</span> <td>{{ item.date }} <td><a ng-click="deleteNode(item)" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</a>  </table> </div> <div id="section-platforms" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">交易所</h3> </div> <div class="panel-body"> <a href="#!/m/add-platform" class="label label-success"><i class="glyphicon glyphicon-plus"></i>&nbsp;添加交易所</a> <span class="pull-right badge" ng-if="platforms.length > 0">{{ platforms.length }}</span> </div> <table class="table table-condensed table-hover" ng-if="platforms.length > 0"> <thead> <tr> <th class="col-lg-3 col-xs-11">名称 <th class="col-lg-7 visible-lg">货币 <th class="col-lg-2 col-xs-1">操作   <tr ng-repeat="item in platforms | orderBy:\'eid\'"> <td>{{ item.label }}&nbsp;&nbsp;<a target="_blank" href="{{item.eid | eid2url}}"><img border="0" class="pull-right" ng-src="images/{{item.eid | eid2png}}"></a> <td class="visible-lg"> <span class="label label-default" style="margin-right:3px" ng-repeat="stock in item.stocks | orderBy: \'toString()\'">{{ stock }}</span>  <td> <div class="btn-group hidden-lg"> <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> 操作项&nbsp;<span class="caret"></span> </button> <ul class="dropdown-menu dropdown-menu-right" role="menu"> <li><a href="" ng-click="deletePlatform(item)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</a></li> <li><a href="#!/m/edit-platform/{{item.id}}"><i class="glyphicon glyphicon-cog"></i>&nbsp;修改</a></li> </ul> </div> <div class="visible-lg"> <a ng-click="deletePlatform(item)" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</a>&nbsp; <a class="btn btn-success btn-xs" href="#!/m/edit-platform/{{item.id}}"><i class="glyphicon glyphicon-cog"></i>&nbsp;修改</a> </div>   </table> </div> <div id="section-market" class="panel panel-default" ng-if="usdcny>0"> <div class="panel-heading"> <h3 class="panel-title">实时行情</h3> </div> <div class="panel-body"> 当前美元对人民币汇率: <span class="badge">{{usdcny}}</span> <span class="pull-right badge" ng-if="tickers.length > 0">{{ tickers.length }}</span> </div> <table class="table table-condensed table-hover"> <thead> <tr> <th class="col-lg-2">平台&nbsp;<a href="" ng-click="sortBy=sortBy==\'eid\'? \'-eid\':\'eid\'"><span class="glyphicon glyphicon-sort"></span></a> <th class="col-lg-2">最近成交&nbsp;<a href="" ng-click="sortBy=sortBy==\'-last\'? \'last\':\'-last\'"><span class="glyphicon glyphicon-sort"></span></a> <th class="col-lg-1">买一&nbsp;<a href="" ng-click="sortBy=sortBy==\'-buy\'? \'buy\':\'-buy\'"><span class="glyphicon glyphicon-sort"></span></a> <th class="col-lg-1">卖一&nbsp;<a href="" ng-click="sortBy=sortBy==\'sell\'? \'-sell\':\'sell\'"><span class="glyphicon glyphicon-sort"></span></a> <th class="col-lg-1 visible-lg">最高&nbsp;<a href="" ng-click="sortBy=sortBy==\'-high\'? \'high\':\'-high\'"><span class="glyphicon glyphicon-sort"></span></a> <th class="col-lg-1 visible-lg">最低&nbsp;<a href="" ng-click="sortBy=sortBy==\'low\'? \'-low\':\'low\'"><span class="glyphicon glyphicon-sort"></span></a> <th class="col-lg-2 visible-lg">成交量 <th class="col-lg-2 visible-lg">更新时间   <tr ng-repeat="ticker in tickers | orderBy:sortBy"> <td>{{ticker.eid | eid2str}}&nbsp;&nbsp;<a target="_blank" href="{{ticker.eid | eid2url }}"><img border="0" class="pull-right" ng-src="images/{{ticker.eid | eid2png}}"></a> <td>{{ticker.last}}<span class="pull-right">{{[\'\', \'↑\', \'↓\'][ticker.trend] }}</span> <td>{{ticker.buy}} <td>{{ticker.sell}} <td class="visible-lg">{{ticker.high}} <td class="visible-lg">{{ticker.low}} <td class="visible-lg">{{ticker.vol}} <td class="visible-lg">{{ticker.time}}  </table> </div> </div>')
    }]), angular.module("views/m/pushhistory.html", []).run(["$templateCache", function(a) {
        a.put("views/m/pushhistory.html", '<div ng-show="messages.length>0"> <div class="row" ng-repeat="item in messages" ng-class="\'slide-left\'"> <div class="panel panel-default"> <div class="panel-body"> <div ng-style="item.data.style">{{ item.data.str }}</div> </div> <div class="panel-footer"><div align="right"><small>{{ item.date }}</small></div></div> </div> </div> <div class="row alert alert-success">只在本地缓存保存 ! <a href="" class="label label-danger pull-right" ng-click="empty()">清空</a></div> </div> <div class="row alert alert-success" ng-if="messages.length==0">接收到的推送消息历史为空 !</div>')
    }]), angular.module("views/m/pushqueue.html", []).run(["$templateCache", function(a) {
        a.put("views/m/pushqueue.html", '<div class="row" style="margin-bottom:10px"> <button class="btn btn-success" ng-click="reload()" ng-disabled="pending"><i class="glyphicon glyphicon-refresh"></i>&nbsp;{{ pending ? \'刷新中...\' : \'刷新\'}}</button> <button ng-show="messages.length>0" class="btn btn-danger pull-right" ng-click="remove(-1)" ng-disabled="pending">清空全部</button> </div> <div ng-show="messages.length>0"> <div class="row" ng-repeat="item in messages" ng-class="\'slide-left\'"> <div class="panel panel-default"> <div class="panel-body"> <div ng-style="item.data.style">{{ item.data.str }}</div> </div> <div class="panel-footer"><div align="right"><small ng-if="item.send_date">发送于: <font color="red">{{item.send_date}}</font>&nbsp(6分钟后重试)</small>&nbsp;<small>创建于: {{ item.date }}</small>&nbsp;&nbsp;<a href="" ng-click="remove(item.id)" class="label label-danger">删除</a></div></div> </div> </div> </div> <div class="row alert alert-success" ng-if="messages.length==0">队列为空, 没有发现推送任务 ! <small class="pull-right">注: 只有在手机端登陆APP后才能收到推送信息, 任务超时3天后自动删除.</small></div>')
    }]), angular.module("views/m/robot.html", []).run(["$templateCache", function(a) {
        a.put("views/m/robot.html", '<div class="row" ng-loading> <blockquote> {{ robot.name }} <small>策略: {{ robot.strategy_name }}</small> <small>日期: <span class="visible-lg-inline">创建于 {{ robot.date }} 预约于 {{ robot.schedule }}</span><span ng-if="robot.start_time"> 最近开始于 {{ robot.start_time }}</span><span ng-if="robot.end_time"> 停止于 {{ robot.end_time }}</span>&nbsp;<span>策略最后更新 <font color="red">{{ robot.strategy_last_modified }}</font></span></small> <small>托管: {{ ktick_selected.name }}&nbsp;<span class="badge">{{ [\'排队中\', \'运行中\', \'停止中\', \'已完成\', \'已停止\', \'有错误\'][robotstatus] }}</span> <button ng-show="robotstatus<2" ng-click="stopRobot(robot)" class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-stop"></i>&nbsp;停止</button> <button ng-show="robotstatus>2" ng-click="restartRobot(robot)" class="btn btn-success btn-xs"><i class="glyphicon glyphicon-repeat"></i>&nbsp;重启</button>&nbsp;<span ng-if="!node_selected"><font color="red">此机器人指定的节点已经离线, 如需重启, 请重新指定并更新参数 !</font></span> <span ng-if="robotstatus == 0 && (!bindNode || bindNode.id == -1)" class="label label-success">等待 {{ node_selected.name }}</span><span ng-if="bindNode && bindNode.id!=-1" class="label label-success">在 {{ bindNode.name }} 上运行</span> </small> <small style="overflow-x:auto;padding-bottom:2px">平台: <span ng-show="pairs_select.length==0" class="label label-danger">请修改配置, 重新添加交易所.</span><span ng-class="$first ? \'label label-danger\' : \'label label-info\'" style="margin-right:3px" ng-repeat="pair in pairs_select">{{ pair.label }}/{{ pair.stock }}</span></small> </blockquote> <blockquote> 修改配置 <small><a href="" ng-init="showArgs=false" ng-click="showArgs=!showArgs" class="label label-warning">{{ !showArgs ? \'显示\' : \'隐藏\' }}</a></small> <form class="form-horizontal" role="form" novalidate name="frm" ng-submit="submit()" ng-show="showArgs"> <div class="row" style="margin-top:2px;margin-bottom:8px"> <div class="col-md-3 col-xs-3"><span class="label label-danger pull-right" style="margin-top:7px">机器人名称</span></div> <div class="col-md-3 col-xs-8"> <input type="text" ng-model="robot.name" class="form-control"> </div> </div> <div class="row" style="margin-top:2px;margin-bottom:8px"> <div class="col-md-3 col-xs-3"><span class="label label-danger pull-right" style="margin-top:7px">K线周期</span></div> <div class="col-md-3 col-xs-8"> <select ng-model="ktick_selected" ng-options="m.name for m in kticks" class="form-control" required> </select> </div> </div> <div class="row" style="margin-top:2px;margin-bottom:8px"> <div class="col-md-3 col-xs-3"><span class="label label-danger pull-right" style="margin-top:7px">交易平台</span></div> <div class="col-md-2 col-xs-4"> <select ng-model="platform_selected" ng-change="platform_stock_selected=platform_selected.stocks[0]" ng-options="m.label for m in platforms | orderBy:\'eid\'" class="form-control" required></select> </div> <div class="col-md-2 col-xs-3"> <select ng-model="platform_stock_selected" ng-options="m for m in platform_selected.stocks" class="form-control" required></select> </div> <div class="col-md-1 col-xs-1"> <a ng-class="pairs_select.length > 0 ? \'btn btn-success\' : \'btn btn-danger\'" ng-click="addPair()"><i class="glyphicon glyphicon-plus"></i></a> </div> </div> <div class="row" style="margin-top:2px;margin-bottom:8px"> <div class="col-md-3 col-md-offset-3" ng-if="pairs_select.length == 0"> <p class="label label-danger">请点击加号添加交易所平台, 红色背景标签为主交易所.</p> </div> <div class="col-md-9 col-md-offset-3"> <div class="bootstrap-tags" style="overflow-x: auto;padding-bottom:2px" ng-if="pairs_select.length > 0"> <span ng-class="$first ? \'tag label label-danger\' : \'tag label label-info\'" ng-repeat="pair in pairs_select">{{pair.label}} / {{ pair.stock }}<span data-role="remove" ng-click="removePair(pair)"></span></span> </div> </div> </div> <div class="row" style="margin-top:2px;margin-bottom:38px"> <div class="col-md-3 col-xs-3"><span class="label label-danger pull-right" style="margin-top:7px">托管者</span></div> <div class="col-md-3 col-xs-8"> <select ng-model="node_selected" ng-options="n.name for n in nodes | orderBy:\'id\'" class="form-control" required></select> </div> </div> <div class="row" style="margin-top:2px;margin-bottom:8px" ng-repeat="pair in scriptArgList" ng-show="showArg(pair)"> <div class="col-md-3 col-xs-5"><span class="label label-success pull-right" style="margin-top:7px">{{ pair[1] }}</span></div> <div ng-class="pair[3].inputType == \'text\' ? \'col-lg-5 col-xs-7\' : \'col-lg-2 col-xs-6\'" popover="{{ pair[2] }}" popover-trigger="mouseenter" popover-title="{{ pair[3].name }}" popover-placement="right"> <input autocomplete="on" ng-if="pair[3].inputType != \'checkbox\' && pair[3].inputType != \'selected\'" type="{{ pair[3].inputType }}" title="{{ pair[3].name }}" ng-model="pair.value" class="form-control" required> <div class="checkbox" ng-if="pair[3].inputType == \'checkbox\'"> <label> <input type="checkbox" ng-model="pair.value"> (勾上为true) </label> </div> <div ng-if="pair[3].inputType == \'selected\'"> <select ng-model="pair.indexValue" class="form-control"> <option value="{{ $index }}" ng-selected="pair.indexValue==$index" ng-repeat="item in pair.value.split(\'|\')">{{ item }} </select> </div> </div> </div> <div class="row" style="margin-top:10px"> <div class="col-md-3 col-md-offset-3 col-xs-offset-3"> <button ng-disabled="btnpending || name.length == 0 || pairs_select.length == 0" popover="更新后请重启机器人以使参数生效" popover-trigger="mouseenter" class="btn btn-success" type="submit">更新参数</button> </div> </div> </form> </blockquote> <blockquote ng-show="show_chart_profit"> 收益曲线 <small><a href="" ng-init="showProfits=true" ng-click="showProfits=!showProfits" class="label label-warning">{{ !showProfits ? \'显示\' : \'隐藏\' }}</a></small> <div id="chart_profit" style="margin-top:3px;height: 400px; max-width:100%" ng-show="showProfits"> <p class="label label-warning">图表正在加载</p> </div> </blockquote> <blockquote ng-show="show_chart_chart"> 策略图表 <small><a href="" ng-init="showChart=true" ng-click="showChart=!showChart" class="label label-warning">{{ !showChart ? \'显示\' : \'隐藏\' }}</a></small> <div id="chart_chart" style="margin-top:3px;min-height: 400px; max-width:100%" ng-show="showChart"> <p class="label label-warning">图表正在加载</p> </div> </blockquote> <blockquote ng-if="scriptCMDList.length > 0"> 策略交互 <small><a href="" ng-init="showCMD=false" ng-click="showCMD=!showCMD" class="label label-warning">{{ !showCMD ? \'显示\' : \'隐藏\' }}</a></small> <div ng-show="showCMD" style="padding-top:10px"> <div class="row" style="margin-top:2px;margin-bottom:8px" ng-repeat="pair in scriptCMDList"> <div class="col-md-2 col-xs-5" ng-if="pair[1][0]!=\'@\'"><span class="label label-success pull-right" style="margin-top:7px">{{ pair[1] }}</span></div> <div ng-if="pair[3].inputType != \'button\'" ng-class="pair[3].inputType == \'text\' ? \'col-md-8 col-xs-3\' : \'col-md-3 col-xs-3\'" popover-trigger="mouseenter" popover="{{ pair[2] }}" popover-title="{{ pair[3].name }}" popover-placement="right" popover-append-to-body="true"> <input ng-if="pair[3].inputType != \'checkbox\' && pair[3].inputType != \'selected\' && pair[3].inputType != \'button\'" type="{{ pair[3].inputType }}" ng-pattern="{{ pair[3].inputPattern }}" ng-model="pair.value" class="form-control" required> <div class="checkbox" ng-if="pair[3].inputType == \'checkbox\'"> <label> <input type="checkbox" ng-model="pair.value"> (勾上为true) </label> </div> <div ng-if="pair[3].inputType == \'selected\'"> <select ng-model="pair.indexValue" class="form-control"> <option value="{{ $index }}" ng-repeat="item in pair.value.split(\'|\')">{{ item }} </select> </div> </div> <div class="col-md-2 col-xs-4"><label class="btn btn-success btn-sm" ng-disabled="isCMDSending" ng-click="cmdRobot(robot, pair)">{{ pair[0] }}</label></div> </div> </div> </blockquote> <blockquote> 日志信息 <small class="hidden-xs">共: {{ log_count }} 条, {{ pageCount }} 页. 日志保留最近{{ robot.log_count_limit }}条, 收益为总累计总收益，不是每次买卖的收益</small> <small> <a href="" ng-click="hideErrors(!isHideErrors)" class="label label-success">点击{{ isHideErrors ? \'显示\' : \'隐藏\' }}错误日志</a>&nbsp; <button ng-disabled="loading" ng-click="go(1)" class="btn btn-warning btn-xs">刷新</button>&nbsp; <input type="checkbox" ng-model="autoRefresh" ng-click="setRefresh(!autoRefresh)">定时刷新(5秒) <input type="checkbox" ng-disabled="!autoRefresh" ng-model="autoPlay">声音提醒&nbsp;<a href="" ng-click="playAudio()" popover="点击试听提示音" popover-trigger="mouseenter"><font size="2"><span ng-class="autoPlay ? \'glyphicon glyphicon-volume-up\' : \'glyphicon glyphicon-volume-off\'"></span></font></a> <div class="btn-group" dropdown ng-if="autoPlay"> <button type="button" class="btn btn-xs btn-default dropdown-toggle" dropdown-toggle>过滤器 <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu"> <li ng-repeat="t in logFilter"><a href="javascript:void(0)"><input type="checkbox" ng-model="t.selected">&nbsp;<label ng-class="\'label \' + [\'label-primary\',\'label-success\',\'label-default\',\'label-default\',\'label-danger\',\'label-info\',\'label-warning\'][$index]">{{ t.name }}</label></a></li> </ul> </div> </small> </blockquote> <blockquote ng-show="summary.length>0"> 状态信息 <small ng-repeat="s in summary" ng-style="s.style">{{ s.str }}</small> </blockquote> <p ng-if="logs.length == 0" class="alert alert-success">正在等待日志回传...</p> <div class="table-responsive nowrap"> <table ng-show="logs.length>0" class="table table-condensed"> <thead> <tr> <th width="150">日期 <th>平台 <th>类型 <th>价格 <th>数量 <th>信息   <tr ng-repeat="item in logs" ng-hide="item.log_type == 3 && isHideErrors" ng-class="\'slide-left\'" ng-style="item.style"> <td width="150">{{ item.date }} <td>{{ item.eid | eid2str }} <td><label popover-trigger="mouseenter" popover="{{item.order_id > 0 ? \'订单号: \' + item.order_id : \'\'}}" ng-class="\'label \' + [\'label-primary\',\'label-success\',\'label-default\',\'label-default\',\'label-danger\',\'label-info\',\'label-warning\'][item.log_type]">{{ logTypes[item.log_type] }}</label> <td>{{ item.priceStr }} <td>{{ item.amountStr }} <td popover-trigger="mouseenter" popover="{{item.realextra}}" nowrap>{{ item.extra != \'\' ? item.extra : \'\'}}  </table> </div> <ul class="pagination" ng-if="pages.length>1"> <li ng-repeat="page in pages" ng-class="page.cls + (loading ? \' disabled\' : \'\')"><a ng-click="go(page.id)" href="">{{page.name}}</a></li> </ul> </div>')
    }]), angular.module("views/m/security.html", []).run(["$templateCache", function(a) {
        a.put("views/m/security.html", '<div class="row" ng-loading> <div class="col-md-6 col-md-offset-3"> <div class="panel-group" id="accordion"> <div class="panel panel-default"> <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"> <a href="" class="label label-success accordion-toggle">修改密码</a><span class="badge pull-right">{{ username }}</span> </div> <div id="collapseOne" class="panel-body panel-collapse in"> <form novalidate name="frm" class="form-horizontal" role="form" ng-submit="changePassword()"> <div class="form-group"> <label for="inputPassword" class="col-md-2 col-xs-4 control-label">旧密码</label> <div class="col-md-9 col-xs-8"> <input type="password" ng-model="oldPassword" class="form-control" id="inputPassword" placeholder="旧密码" required> </div> </div> <div class="form-group"> <label for="inputPassword" class="col-md-2 col-xs-4 control-label">新密码</label> <div class="col-md-9 col-xs-8"> <input type="password" ng-model="password" equals="{{repassword}}" class="form-control" id="inputPassword" placeholder="新密码" required> </div> </div> <div class="form-group"> <label for="inputPasswordAgain" class="col-md-2 col-xs-4 control-label">新密码</label> <div class="col-md-9 col-xs-8"> <input type="password" ng-model="repassword" equals="{{password}}" class="form-control" id="inputPasswordAgain" placeholder="新密码" required> </div> </div> <div class="form-group"> <div class="col-md-offset-2 col-xs-offset-4 col-md-9"> <button ng-confirm-click="修改密码后交易平台API需要重新添加, 确定要这样做吗?" class="btn btn-default" type="submit" ng-disabled="pending || oldPassword == password">修改密码</button> <a href="#!/m/dashboard" class="label label-warning">取消</a> </div> </div> </form> </div> </div> <div class="panel panel-default"> <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"> <a href="" class="label label-danger accordion-toggle">谷歌验证</a> </div> <div id="collapseTwo" class="panel-body panel-collapse collapse"> <div ng-show="!useGoogleAuth"> <div id="qrcode" align="center"></div> <div style="margin-top:10px;margin-bottom:10px"> <b>首先您需要在您的手机上下载并安装GOOGLE身份验证器应用程序：</b> <br> 1. 在您的手机上打开 App Store (iOS) 或 Play 商店 (Android)。<br> 2. 搜“Google Authenticator(身份验证器)”。 WP8搜“验证器”<br> 3. 下载并安装该应用程序。<br> <b>安装完成后，您需要对该应用程序进行如下配置：</b><br> 1. 打开程序, 在应用程序中，点击“添加新账户 (iOS 下是 + 号)”->“扫描条形码”。<br> 2. 将手机上的相机镜头对准上图扫描该条形码。<br> 无法扫描成功可以手动添加账户，输入密匙：<font color="red">{{ googleKey }}</font><br> </div> </div> <div class="alert alert-success" ng-if="useGoogleAuth">已经成功绑定谷歌验证码, 解除绑定请输入谷歌验证码 .</div> <form novalidate name="frmgoogle" class="form-horizontal" role="form" ng-submit="bindGoogle()"> <div class="form-group"> <label for="inputPassword" class="col-md-3 col-xs-5 control-label">谷歌验证码:</label> <div class="col-md-6 col-xs-6"> <input type="text" ng-model="googleCode" class="form-control" placeholder="6位谷歌验证码" required> </div> </div> <div class="form-group"> <div class="col-md-offset-3 col-xs-offset-3 col-md-5"> <button ng-if="!useGoogleAuth" ng-disabled="pending || googleCode.length != 6" ng-confirm-click="绑定Google验证码以后, 如果丢失只能通过邮箱解绑, 确定要这样做吗?" class="btn btn-warning" type="submit">绑定谷歌验证</button> <button ng-if="useGoogleAuth" ng-disabled="pending || googleCode.length != 6" ng-confirm-click="解除Google验证码以后, 账户安全系数将降低, 确定要这样做吗?" class="btn btn-warning" type="submit">解除谷歌验证</button> </div> </div> </form> </div> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div>')
    }]), angular.module("views/main.html", []).run(["$templateCache", function(a) {
        a.put("views/main.html", '<div class="row main-wall"> <div class="col-md-3 hidden-xs" style="padding-top:40px"> <img class="pull-right" src="images/btc.png" width="175" height="175"> <!--<img src="images/logo_normal.png" height=80>--> </div> <div class="col-md-9 promo-content"> <h1><b>BotVS</b></h1> <h3 class="hidden-xs">支持&nbsp;<font color="red">18</font>&nbsp;个交易所的BTC/LTC量化自动交易平台</h3> <h3 class="visible-xs-block">最专业的BTC量化交易平台</h3> <div> <a href="https://itunes.apple.com/us/app/botvs/id980675072?l=zh&ls=1&mt=8" target="_blank"><img src="images/iphone.png" border="0" popover-title="扫码或点击按钮下载" popover-trigger="mouseenter" popover-html-unsafe="<img src=\'images/iphone_url.png\'>"></a> <a href="http://dn-botvs.qbox.me/botvs.apk" target="_blank"><img src="images/android.png" border="0" popover-title="扫码或点击按钮下载" popover-trigger="mouseenter" popover-html-unsafe="<img src=\'images/android_url.png\'>"></a> </div> </div> </div> <div class="row promo-content"> <div class="col-md-10 col-md-offset-1"> <div class="col-md-5"> <div class="pull-right"> <h3><i style="color:#d9453d" class="glyphicon glyphicon-stats"></i>&nbsp;&nbsp;可回测模拟</h3> 平台提供在线模拟回测功能, 让策略无障碍的在真实环境下运行. </div> </div> <div class="col-md-5 col-md-offset-2"> <h3><i style="color:#d9453d" class="glyphicon glyphicon-cog"></i>&nbsp;&nbsp;跨平台 & 多线程</h3> 支持Windows、Mac、Linux 以及 ARM。支持异步多线程并发 ! </div> <div class="col-md-5"> <div class="pull-right"> <h3><i style="color:#d9453d" class="glyphicon glyphicon-send"></i>&nbsp;&nbsp;简单易上手</h3> 已公开大量写好的入门策略模板，数分钟内就可以上手量化交易. </div> </div> <div class="col-md-5 col-md-offset-2"> <h3><i style="color:#d9453d" class="glyphicon glyphicon-retweet"></i>&nbsp;&nbsp;统一接口</h3> 统一简化了API接口, 国外平台最新汇率自动转换价格, 专心写策略. </div> </div> </div> <div class="row" style="padding-top:20px"> <div align="center"> <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=2cec899914b4be9657f4516feca5133bad2cbf268fb51394402d23798a773934"><img border="0" src="images/group.png" alt="BotVS EA交流(www.botvs.com)" title="BotVS EA交流(www.botvs.com)"></a> <br> ©2014 - ∞ BotVS. All Rights Reserved. </div> </div> <img src="images/iphone_url.png" style="display:none"> <img src="images/android_url.png" style="display:none">')
    }]), angular.module("views/reset-password.html", []).run(["$templateCache", function(a) {
        a.put("views/reset-password.html", '<div class="row"> <div class="col-md-6 col-md-offset-3" ng-show="uncompleted"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">找回密码</h3> </div> <div class="panel-body"> <form novalidate name="frm" class="form-horizontal col-md-10 col-md-offset-1" role="form" ng-submit="submit()" form-autofill-fix> <div class="form-group" popover="请输入注册时的邮箱" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span> <input type="email" ng-model="email" class="form-control" id="inputEmail" placeholder="邮箱地址" required> </div> </div> <div class="form-group"> <button class="btn btn-default" type="submit" ng-disabled="pending">找回密码</button>&nbsp;<a href="#!/login" class="label label-success">取消</a> </div> </form> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div> <div class="alert alert-success" ng-show="!uncompleted"> 已经发送重置密码链接到您的邮箱, 如果收件箱里找不到, 有可能被当成垃圾邮件, 请到垃圾箱里找一下. <a href="#!/login" class="label label-success">回到登录界面</a> </div>')
    }]), angular.module("views/reset-twofactor.html", []).run(["$templateCache", function(a) {
        a.put("views/reset-twofactor.html", '<div class="row"> <div class="col-md-6 col-md-offset-3" ng-show="uncompleted"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">解除谷歌二次验证码</h3> </div> <div class="panel-body"> <form novalidate name="frm" class="form-horizontal col-md-10 col-md-offset-1" role="form" ng-submit="submit()" form-autofill-fix> <div class="form-group" popover="请输入用户名" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input type="text" ng-model="username" class="form-control" id="inputUsername" placeholder="用户名" required> </div> </div> <div class="form-group" popover="请输入密码" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" ng-model="password" class="form-control" id="inputPassword" placeholder="密码" required> </div> </div> <div class="form-group" popover="请输入注册时的邮箱" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span> <input type="email" ng-model="email" class="form-control" id="inputEmail" placeholder="邮箱地址" required> </div> </div> <div class="form-group"> <button class="btn btn-default" type="submit" ng-disabled="pending">发送解除邮件</button> &nbsp;<a href="#!/login" class="label label-success">取消</a> </div> </form> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div> <div class="alert alert-success" ng-show="!uncompleted"> 已经发送解除链接到您的邮箱, 如果收件箱里找不到, 有可能被当成垃圾邮件, 请到垃圾箱里找一下. <a href="#!/login" class="label label-success">回到登录界面</a> </div>')
    }]), angular.module("views/robot.html", []).run(["$templateCache", function(a) {
        a.put("views/robot.html", '<div class="row" ng-loading> <blockquote> {{ robot.name }} <small ng-if="robot.end_time">日期: <span> 停止于 {{ robot.end_time }}</span></small> <small>状态: K线周期: {{ ktick_selected.name }}&nbsp;<span class="badge">{{ [\'排队中\', \'运行中\', \'停止中\', \'已完成\', \'已停止\', \'有错误\'][robotstatus] }}</span></small> <small style="overflow-x:auto;padding-bottom:2px">平台: <span ng-show="pairs_select.length==0" class="label label-danger">请修改配置, 重新添加交易所.</span><div ng-class="$first ? \'label label-danger\' : \'label label-info\'" style="margin-right:3px" ng-repeat="pair in pairs_select">{{ pair.label }}/{{ pair.stock }}</div></small> </blockquote> <p class="alert alert-success"> 该机器人由 <b>{{ robot.username }}</b> 公开, 绑定策略: <b><font color="red">{{ robot.strategy_name }}</font></b> , <span ng-if="robot.start_time"> 最近开始于 {{ robot.start_time }}</span>&nbsp;<span>策略最后更新 <font color="red">{{ robot.strategy_last_modified }}</font></span></p> <blockquote ng-show="show_chart_profit"> 收益曲线 <small><a href="" ng-init="showProfits=true" ng-click="showProfits=!showProfits" class="label label-warning">{{ !showProfits ? \'显示\' : \'隐藏\' }}</a></small> <div id="chart_profit" style="margin-top:3px;height: 400px; max-width:100%" ng-show="showProfits"> <p class="label label-warning">图表正在加载</p> </div> </blockquote> <blockquote ng-show="show_chart_chart"> 策略图表 <small><a href="" ng-init="showChart=true" ng-click="showChart=!showChart" class="label label-warning">{{ !showChart ? \'显示\' : \'隐藏\' }}</a></small> <div id="chart_chart" style="margin-top:3px;min-height: 400px; max-width:100%" ng-show="showChart"> <p class="label label-warning">图表正在加载</p> </div> </blockquote> <blockquote> 日志信息 <small class="hidden-xs">共: {{ log_count }} 条, {{ pageCount }} 页. 日志保留最近{{ robot.log_count_limit }}条, 收益为总累计总收益，不是每次买卖的收益</small> <small> <a href="" ng-click="hideErrors(!isHideErrors)" class="label label-success">点击{{ isHideErrors ? \'显示\' : \'隐藏\' }}错误日志</a>&nbsp; <button ng-disabled="loading" ng-click="go(1)" class="btn btn-warning btn-xs">刷新</button>&nbsp; <input type="checkbox" ng-model="autoRefresh" ng-click="setRefresh(!autoRefresh)">定时刷新(5秒) <input type="checkbox" ng-disabled="!autoRefresh" ng-model="autoPlay">声音提醒&nbsp;<a href="" ng-click="playAudio()" popover="点击试听提示音" popover-trigger="mouseenter"><font size="2"><span ng-class="autoPlay ? \'glyphicon glyphicon-volume-up\' : \'glyphicon glyphicon-volume-off\'"></span></font></a> <div class="btn-group" dropdown ng-if="autoPlay"> <button type="button" class="btn btn-xs btn-default dropdown-toggle" dropdown-toggle>过滤器 <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu"> <li ng-repeat="t in logFilter"><a href="javascript:void(0)"><input type="checkbox" ng-model="t.selected">&nbsp;<label ng-class="\'label \' + [\'label-primary\',\'label-success\',\'label-default\',\'label-default\',\'label-danger\',\'label-info\',\'label-warning\'][$index]">{{ t.name }}</label></a></li> </ul> </div> </small> </blockquote> <blockquote ng-show="summary.length>0"> 状态信息 <small ng-repeat="s in summary" ng-style="s.style">{{ s.str }}</small> </blockquote> <p ng-if="logs.length == 0" class="alert alert-success">正在等待日志回传...</p> <div class="table-responsive nowrap"> <table ng-show="logs.length>0" class="table table-condensed"> <thead> <tr> <th width="150">日期 <th>平台 <th>类型 <th>价格 <th>数量 <th>信息   <tr ng-repeat="item in logs" ng-hide="item.log_type == 3 && isHideErrors" ng-class="\'slide-left\'" ng-style="item.style"> <td width="150">{{ item.date }} <td>{{ item.eid | eid2str }} <td><label popover-trigger="mouseenter" popover="{{item.order_id > 0 ? \'订单号: \' + item.order_id : \'\'}}" ng-class="\'label \' + [\'label-primary\',\'label-success\',\'label-default\',\'label-default\',\'label-danger\',\'label-info\',\'label-warning\'][item.log_type]">{{ logTypes[item.log_type] }}</label> <td>{{ item.priceStr }} <td>{{ item.amountStr }} <td popover-trigger="mouseenter" popover="{{item.realextra}}" nowrap>{{ item.extra != \'\' ? item.extra : \'\'}}  </table> </div> <ul class="pagination" ng-if="pages.length>1"> <li ng-repeat="page in pages" ng-class="page.cls + (loading ? \' disabled\' : \'\')"><a ng-click="go(page.id)" href="">{{page.name}}</a></li> </ul> <div comment="\'robot@\' + robot.id"></div> </div>')
    }]), angular.module("views/set-password.html", []).run(["$templateCache", function(a) {
        a.put("views/set-password.html", '<div class="row"> <div class="col-md-6 col-md-offset-3" ng-show="uncompleted"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">重置密码</h3> </div> <div class="panel-body"> <form novalidate name="frm" class="form-horizontal col-md-10 col-md-offset-1" role="form" ng-submit="submit()" form-autofill-fix> <div class="form-group" popover="请输入新密码" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" ng-model="password" equals="{{repassword}}" class="form-control" id="inputPassword" placeholder="请输入新密码" required> </div> </div> <div class="form-group" popover="请再次输入新密码" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" ng-model="repassword" equals="{{password}}" class="form-control" id="inputPasswordAgain" placeholder="请再次输入新密码" required> </div> </div> <div class="form-group"> <button class="btn btn-default" type="submit" ng-disabled="pending">重置密码</button> </div> </form> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div> <div class="alert alert-success" ng-show="!uncompleted"> 修改密码成功! 由于API密钥保存依赖登录密码, 请登录后重新修改平台的密钥信息! <a class="label label-success" href="#!/login">登录</a> </div>')
    }]), angular.module("views/sign-up.html", []).run(["$templateCache", function(a) {
        a.put("views/sign-up.html", '<div class="row"> <div class="col-md-6 col-md-offset-3"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">用户注册</h3> </div> <div class="panel-body"> <form novalidate name="frm" class="form-horizontal col-md-10 col-md-offset-1" role="form" ng-submit="submit()" form-autofill-fix> <div class="form-group" popover="请输入用户名" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input type="text" ng-model="username" class="form-control" id="inputUsername" placeholder="用户名" required> </div> </div> <div class="form-group" popover="请输入真实邮箱(找回密码要用)" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span> <input type="email" ng-model="email" class="form-control" id="inputEmail" placeholder="邮箱, 一定要真实邮箱." required> </div> </div> <div class="form-group" popover="请输入密码" popover-trigger="mouseenter"> <div class="input-group"> <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" ng-model="password" class="form-control" id="inputPassword" placeholder="密码" required> </div> </div> <div class="form-group"> <button class="btn btn-default" type="submit" ng-disabled="pending">注册</button>&nbsp;<a href="#!/login" class="label label-success">我有账号</a> </div> </form> </div> </div> <div class="alert alert-danger" ng-if="error">{{ error }}</div> </div> </div>')
    }]), angular.module("views/square.html", []).run(["$templateCache", function(a) {
        a.put("views/square.html", '<div class="row" ng-loading> <div class="panel panel-default" ng-if="public_robots.length > 0"> <div class="panel-heading"> <h3 class="panel-title">实盘围观</h3> </div> <div class="panel-body"> <small>这里是其它会员公开机器人列表, 点击可以查看机器人的交易信息以及绑定的策略, 如果对此机器人使用的策略感兴趣, 可以在策略广场里联系作者.</small> <span class="pull-right badge">{{ public_robots.length }}</span> </div> <table class="table table-condensed table-hover" ng-if="public_robots.length > 0"> <thead> <tr> <th class="col-lg-6 col-xs-11">机器人<span class="pull-right text-muted visible-lg">策略</span> <th class="col-lg-1 visible-lg">用户 <th class="col-lg-2 visible-lg">创建日期 <th class="col-lg-2 visible-lg">最近开始 <th class="col-lg-1">操作   <tbody> <tr ng-repeat="item in public_robots"> <td> <a href="#!/robot/{{item.id}}">{{ item.name }}</a> <span class="pull-right text-muted visible-lg">{{ item.strategy_name }}</span>  <td class="visible-lg"><span class="label label-default">{{ item.username }}</span> <td class="visible-lg">{{ item.date }} <td class="visible-lg">{{ item.start_time }} <td> <a href="#!/robot/{{item.id}}" class="btn btn-success btn-xs"><i class="glyphicon glyphicon-play-circle"></i>&nbsp;围观</a>    </table> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">策略广场</h3> </div> <div class="panel-body"> <small>这里是其它会员共享的策略, 免费的可以直接点复制占为已有, 策略由共享者维护更新, 但你复制的版本不会同步, 除非是收费版本, 请关注更新.</small> <span class="pull-right badge" ng-if="public_strategies.length > 0">{{ public_strategies.length }}</span> </div> <table class="table table-condensed table-hover" ng-if="public_strategies.length > 0"> <thead> <tr> <th class="col-lg-6 col-xs-11">名称 <th class="col-lg-1 visible-lg">作者 <th class="col-lg-2 visible-lg">创建日期 <th class="col-lg-2 visible-lg">最后修改 <th class="col-lg-1">操作   <tbody> <tr ng-repeat="item in public_strategies"> <td> <a href="#!/strategy/{{item.id}}">{{ item.name }}</a> <span class="visible-lg label label-danger pull-right" ng-if="item.public == 2 || item.public == 3">收费</span>  <td class="visible-lg"><span class="label label-default">{{ item.username }}</span> <td class="visible-lg">{{ item.date }} <td class="visible-lg">{{ item.last_modified }} <td> <a href="#!/m/copy-strategy/{{item.id}}" ng-if="item.public == 1" class="btn btn-success btn-xs"><i class="glyphicon glyphicon-share-alt"></i>&nbsp;复制</a> <span ng-click="buyStrategy(item)" ng-if="!item.is_buy && !item.is_owner && item.public == 3" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-shopping-cart"></i>&nbsp;购买</span> <span ng-if="!item.is_buy && item.public == 2" class="label label-default">待审核</span> <span ng-if="item.is_buy && (item.public == 2 || item.public == 3)" class="label label-default">已购买</span>    </table> </div> <div class="alert alert-danger" role="alert"> 关注下方微信号(或搜索公众号botvs或botvs123) 可第一时间收到最新的策略及平台的提前更新通知 ! </div> <div align="center"><img height="129" width="129" src="images/weixin.jpg"></div> <div comment="\'square\'"></div> </div>')
    }]), angular.module("views/strategy.html", []).run(["$templateCache", function(a) {
        a.put("views/strategy.html", '<div ng-loading> <blockquote> <b>{{ strategy.name }}</b> <small>创建日期: {{ strategy.date }}</small> <small>最后修改: {{ strategy.last_modified }}</small> <small ng-if="strategy.is_deleted"><font color="red">作者已删除该策略, 当前为快照模式</font></small> </blockquote> <blockquote> <b>策略描述</b> <pre style="margin-top:10px">{{ strategy.description }}</pre> </blockquote> <blockquote ng-if="strategy.public==2"> 联系方式 <small>昵称: {{ strategy.username }}</small> <small>邮箱: {{ strategy.email }}</small> </blockquote> <div class="alert alert-danger" ng-if="!strategy.is_buy && strategy.public==3">当前策略为收费策略, 请联系作者 {{ strategy.username }} 获取注册码后使用, 联系邮箱: {{ strategy.email }}</div> <div class="alert alert-success" ng-if="strategy.is_buy && strategy.public==3">已在 {{ strategy.buy_date }} 购买过该策略. 过期时间: {{strategy.expire_date}}</div> <div ng-show="strategy.public==1" style="height:400px" id="code-area"></div> <br> <a ng-if="strategy.public==1 && isLogin" href="#!/m/copy-strategy/{{strategy.id}}" class="btn btn-warning">点击复制并进行在线回测</a> <a href="javascript:history.go(-1)" class="btn btn-default">返回上一页</a> <br> <br> <div comment="strategy.name"></div> </div>')
    }]), angular.module("botvsApp").controller("MainCtrl", ["$scope", "$location", "session", function(a, b, c) {
        return c.isMobile() ? void b.path(c.isLogin() ? "/m/dashboard" : "/login") : void(a.running = !0)
    }]), angular.module("botvsApp").controller("LoginCtrl", ["$scope", "$location", "session", "encrypt", "dialog", function(a, b, c, d, e) {
        a.isShowApp = c.isMobile(), a.isLogin = c.isLogin(), a.username = c.getUser(), a.password = "", a.submit = function() {
            if (!a.frm.$invalid) {
                a.error = "";
                var f = [a.username, d.encryptPassword(a.password), ""];
                a.pending = !0, c.rest("Login", f).then(function(d) {
                    if (c.rememberUser(a.username), 0 === d) b.path("/m/dashboard");
                    else if (-1 === d) a.error = "用户名或者密码错误! (请不要使用邮箱登录)", e.alert(a.error);
                    else if (-2 === d) {
                        var g = {
                            title: "二次验证",
                            inputname: "谷歌验证码",
                            inputtype: "input",
                            description: '<font color=red>用户开启了二次验证机制, 请输入6位谷歌验证码. </font>&nbsp;<a href="" ng-click="jump(\'reset-twofactor\')" class="label label-warning">解除验证?</a>',
                            confirmname: "验证登录",
                            onConfirm: function(d, e) {
                                a.pending = !1, f[2] = d, c.rest("Login", f).then(function(d) {
                                    -3 === d ? e(!1, "验证码错误, 3秒后重试 !", 3e3) : 0 === d ? (e(!0), c.rememberUser(a.username), b.path("/m/dashboard")) : e(!1, "未知错误, 3秒后重试 !", 3e3)
                                }, function(a) {
                                    e(!1, a, 3e3)
                                })
                            }
                        };
                        e.prompt(g)
                    }
                    a.pending = !1
                }, function(b) {
                    a.pending = !1, e.alert(b)
                })
            }
        }
    }]), angular.module("botvsApp").run(["$rootScope", "$window", "$route", "$location", "session", function(a, b, c, d, e) {
        a.loading = !1;
        var f = [
            ["首页", "/", 0, 0, "home"],
            ["控制中心", "/m/dashboard", 1, 0, "dashboard"],
            ["推送历史", "/m/pushhistory", 1, 0, "phone"],
            ["策略广场", "/square", 2, 0, "shopping-cart"],
            ["API文档", "/api", 2, 0, "info-sign"],
            ["账户安全", "/m/security", 1, 1, "cog"],
            ["退出", "/logout", 1, 1, "log-out"],
            ["注册", "/sign-up", 0, 1, "user"],
            ["登录", "/login", 0, 1, "log-in"]
        ];
        e.isCordova() || (f[2] = ["推送队列", "/m/pushqueue", 1, 0, "send"]), a.navs = f, a.icon = function(a) {
            return "glyphicon glyphicon-" + a[4]
        }, a.cls = function(a) {
            return d.path() === a[1] ? "active" : ""
        }, a.isIndex = function() {
            return "/" === d.path()
        }, a.visable = function(a, b) {
            if ("undefined" != typeof b && b !== a[3]) return !1;
            if (2 == a[2]) return !0;
            var c = e.isLogin();
            return 0 == a[2] ? !c : c
        }, a.getUser = e.getUser, a.logout = function() {
            e.logout()
        }, a.$on("titleChange", function(a, c) {
            b.document.title = c
        }), a.$on("$routeChangeSuccess", function(a, d) {
            var e = "BotVS - 支持18个交易所的BTC/LTC量化自动交易平台";
            "undefined" != typeof d && "undefined" != typeof d.title && (e = c.current.title), b.document.title = e;
            var f = $(".navbar-offcanvas");
            return f.hasClass("in") ? (f.removeClass("in"), $("body").css({
                overflow: f.hasClass("in") ? "hidden" : "",
                position: f.hasClass("in") ? "fixed" : ""
            })) : void 0
        })
    }]), angular.module("botvsApp").controller("ApiCtrl", ["$scope", function() {}]), angular.module("botvsApp").controller("SignUpCtrl", ["$scope", "$location", "session", "dialog", "encrypt", function(a, b, c, d, e) {
        a.email = a.password = a.username = "", a.submit = function() {
            if (!a.frm.$invalid) {
                if (a.password.length < 10) return void d.alert("你密码太短了, 大大降低安全系数, 请设置一个超过9位数的密码!!");
                a.pending = !0, c.rest("Signup", [a.username, a.email, e.encryptPassword(a.password)]).then(function(e) {
                    a.pending = !1, 0 === e ? (c.rememberUser(a.username), b.path("/m/dashboard")) : (-1 === e ? a.error = "一小时内最多只能注册3次!" : -2 === e ? a.error = "邮箱不存在!" : -3 === e && (a.error = "用户名或邮箱重复!"), d.alert(a.error))
                }, function(b) {
                    a.pending = !1, d.alert(b)
                })
            }
        }
    }]), angular.module("botvsApp").controller("ResetPasswordCtrl", ["$scope", "session", "dialog", function(a, b, c) {
        a.uncompleted = !0, a.pending = !1, a.email = "", a.submit = function() {
            a.frm.$invalid || (a.pending = !0, b.rest("ResetPassword", a.email).then(function(b) {
                a.pending = !1, b ? a.uncompleted = !1 : (a.error = "邮箱不存在!!", c.alert(a.error))
            }, function(b) {
                a.pending = !1, c.alert(b)
            }))
        }
    }]), angular.module("botvsApp").controller("ResetTwofactorCtrl", ["$scope", "dialog", "session", "encrypt", function(a, b, c, d) {
        a.uncompleted = !0, a.username = "", a.password = "", a.email = "", a.submit = function() {
            a.frm.$invalid || (a.pending = !0, a.error = "", c.rest("ResetTwofactor", [a.username, d.encryptPassword(a.password), a.email]).then(function(c) {
                a.pending = !1, c ? a.uncompleted = !1 : (a.error = "用户名密码错误或邮箱不存在!!", b.alert(a.error))
            }, function(c) {
                a.pending = !1, b.alert(c)
            }))
        }
    }]), angular.module("botvsApp").controller("DisableTwofactorCtrl", ["$scope", "$routeParams", "dialog", "session", function(a, b, c, d) {
        a.uncompleted = !0, a.submit = function() {
            d.rest("DisableTwofactor", b.token).then(function(b) {
                b ? (a.uncompleted = !1, c.alert("解除二次验证成功!")) : (a.error = "链接已经失效，请重新发送解除邮件！", c.alert(a.error))
            }, function(a) {
                c.alert(a)
            })
        }
    }]), angular.module("botvsApp").controller("SetPasswordCtrl", ["$scope", "$routeParams", "dialog", "session", "encrypt", function(a, b, c, d, e) {
        a.uncompleted = !0, a.password = a.repassword = "", a.submit = function() {
            a.frm.$invalid || (a.error = "", d.rest("SetPassword", [b.token, e.encryptPassword(a.password)]).then(function(b) {
                b ? (a.uncompleted = !1, c.alert("修改密码成功!\n由于API密钥保存依赖登录密码, 请登录后重新修改平台的密钥信息!")) : (a.error = "重置密码链接已经失效，请重新找回密码！", c.alert(a.error))
            }, function(a) {
                c.alert(a)
            }))
        }
    }]), angular.module("botvsApp").controller("SquareCtrl", ["$scope", "session", "dialog", function(a, b, c) {
        a.public_strategies = [], a.public_robots = [], b.rest(["GetStrategyList", "GetPublicRobotList"], [
            [-1, -1, -2, 0],
            [-1, -1, -1]
        ], !1, !0).then(function(b) {
            if (b) {
                a.public_robots = b[1].result.robots;
                var d = b[0].result.strategies,
                    e = "zero";
                d.sort(function(a, b) {
                    if (a.username == e && (2 == a["public"] || 3 == a["public"]) && b.username != e) return -1;
                    if (a.username != e && b.username == e && (2 == b["public"] || 3 == b["public"])) return 1;
                    var c = new Date(a.last_modified.replace(/-/g, "/")).getTime() - new Date(b.last_modified.replace(/-/g, "/")).getTime();
                    return 0 == c ? 0 : c > 0 ? -1 : 1
                });
                for (var f = 0; f < d.length; f++) a.public_strategies.push(d[f])
            } else c.alert("Error")
        }, function(a) {
            c.alert(a)
        }), a.buyStrategy = function(a) {
            if (!b.isLogin()) return void b.logout(!0);
            var d = {
                title: "购买 - " + a.name,
                inputname: "注册码",
                inputtype: "input",
                description: "<font color=red>策略作者 " + a.username + " 的联系邮箱: " + a.email + " 请联系作者获取注册码!</font>",
                confirmname: "购买",
                onConfirm: function(c, d) {
                    b.rest("VerifyKey", [a.id, c]).then(function(a) {
                        a ? d(!0) : d(!1, "注册码无效, 3秒后重试 !", 3e3)
                    }, function(a) {
                        d(!1, a, 3e3)
                    })
                },
                onExit: function() {
                    c.alert("购买成功, 请到控制台主页查看购买到的策略!!")
                }
            };
            c.prompt(d)
        }
    }]), angular.module("botvsApp").controller("MDashboardCtrl", ["$scope", "$http", "$timeout", "dialog", "session", function(a, b, c, d, e) {
        function f() {
            b.jsonp("//ticker.sinaapp.com/fetch.php?get=true&r=" + Math.random() + "&callback=JSON_CALLBACK", {
                ignoreLoadingBar: !0
            }).success(function(b) {
                a.tickers = b.tickers, a.usdcny = b.usdcny
            }), k = l ? c(f, 3e4) : null
        }

        function g() {
            for (var b = [], d = 0; d < a.robots.length; d++) a.robots[d].status in [0, 1, 2] && b.push(a.robots[d].id);
            return e.isBackground() ? void(j = c(g, i)) : void(b.length > 0 && l ? e.rest(["GetRobotStatus", "GetNodeList"], [
                [b],
                []
            ]).then(function(b) {
                var d = b[0].result.robots,
                    f = b[1].result.nodes;
                if (f.length !== a.nodes.length) a.nodes = f;
                else
                    for (var h = 0; h < f.length; h++)
                        for (var k = 0; k < a.nodes.length; k++)
                            if (a.nodes[k].id === f[h].id) {
                                a.nodes[k].ip = f[h].ip, a.nodes[k].loaded = f[h].loaded, a.nodes[k].date = e.isCordova() ? moment(f[h].date).fromNow() : f[h].date;
                                break
                            }
                for (var h = 0; h < d.length; h++)
                    for (var k = 0; k < a.robots.length; k++)
                        if (a.robots[k].id === d[h].id) {
                            a.robots[k].status = d[h].status, a.robots[k].summary = d[h].summary, a.robots[k].profit = d[h].profit;
                            break
                        }
                j = c(g, i)
            }, function(a) {
                console.log(a), j = c(g, i)
            }) : j = null)
        }

        function h(a, b) {
            for (var c = 0; c < a.length; c++)
                if (b == a[c].id) {
                    a.splice(c, 1);
                    break
                }
        }
        a.mobiles = [], a.tickers = [], a.usdcny = 0, a.sortBy = "eid", a.robotsortBy = "-date";
        var i = 8e3,
            j = null,
            k = null,
            l = !0;
        a.nodes = [], a.robots = [], a.platforms = [], a.privateStrategies = [], a.isApp = e.isCordova(), a.getSortStyle = function(a, b) {
            return -1 !== a.indexOf(b) ? -1 === a.indexOf("-") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-minus"
        }, a.showSlide = function() {
            var a = $("#section-robots");
            return a.length > 0 ? $("#section-robots").offset().left > 120 : !1
        }, e.isMobile() || e.isCordova() || f();
        var m = {
            "iPhone1,1": "iPhone 1G",
            "iPhone1,2": "iPhone 3G",
            "iPhone2,1": "iPhone 3GS",
            "iPhone3,1": "iPhone 4",
            "iPhone3,2": "iPhone 4",
            "iPhone3,3": "iPhone 4",
            "iPhone4,1": "iPhone 4S",
            "iPhone5,1": "iPhone 5",
            "iPhone5,2": "iPhone 5",
            "iPhone5,3": "iPhone 5c",
            "iPhone5,4": "iPhone 5c",
            "iPhone6,1": "iPhone 5s",
            "iPhone6,2": "iPhone 5s",
            "iPhone7,1": "iPhone 6",
            "iPhone7,2": "iPhone 6 Plus",
            "iPod1,1": "iPod",
            "iPod2,1": "iPod",
            "iPod3,1": "iPod",
            "iPod4,1": "iPod",
            "iPod5,1": "iPod",
            "iPad1,1": "iPad",
            "iPad2,1": "iPad 2",
            "iPad2,2": "iPad 2",
            "iPad2,3": "iPad 2",
            "iPad2,4": "iPad 2",
            "iPad2,5": "iPad mini",
            "iPad2,6": "iPad mini",
            "iPad2,7": "iPad mini",
            "iPad3,1": "iPad-3G",
            "iPad3,2": "iPad-3G",
            "iPad3,3": "iPad-3G",
            "iPad3,4": "iPad-4G",
            "iPad3,5": "iPad-4G",
            "iPad3,6": "iPad-4G",
            "iPad4,1": "iPad Air",
            "iPad4,2": "iPad Air",
            "iPad4,4": "iPad Mini",
            "iPad4,5": "iPad Mini",
            i386: "Simulator",
            x86_64: "Simulator"
        };
        e.rest(["GetPlatformList", "GetNodeList", "GetRobotList", "GetStrategyList", "GetMobileDevice"], [
            [],
            [],
            [-1, -1, -1],
            [-1, -1, -1, 0],
            []
        ]).then(function(b) {
            if (b) {
                if (a.platforms = b[0].result.platforms, a.nodes = b[1].result.nodes, e.isCordova())
                    for (var f = 0; f < a.nodes.length; f++) a.nodes[f].date = moment(a.nodes[f].date).fromNow();
                a.robots = b[2].result.robots;
                var h = b[3].result.strategies;
                if (b[4].result && "undefined" != typeof b[4].result.mobiles) {
                    for (var k = b[4].result.mobiles, f = 0; f < k.length; f++) m.hasOwnProperty(k[f].model) && (k[f].model = m[k[f].model]);
                    a.mobiles = k
                }
                for (var f = 0; f < h.length; f++) h[f].is_owner || (h[f].is_expire = moment(h[f].expire_date).diff(moment()) < 0, h[f].need_rebuy = moment(h[f].expire_date).diff(moment()) < 864e5), a.privateStrategies.push(h[f]);
                a.robots.length > 0 && (j = c(g, i))
            } else d.alert("Error")
        }, function(a) {
            d.alert(a)
        }), a.stopRobot = function(a) {
            d.confirm("确定要停止这个机器人吗?").then(function() {
                e.rest("StopRobot", a.id).then(function(b) {
                    a.status = b
                }, function(a) {
                    d.alert(a), console.log(a)
                })
            })
        }, a.restartRobot = function(a) {
            d.confirm("确定要重启这个机器人吗?").then(function() {
                e.rest("RestartRobot", a.id).then(function(b) {
                    -1 === b ? d.alert("策略已过期,, 请联系作者重新购买!") : (a.status = b, null === j && (j = c(g, i)))
                }, function(a) {
                    d.alert(a), console.log(a)
                })
            })
        }, a.deleteRobot = function(b) {
            d.confirm("确定要删除这个机器人吗?").then(function() {
                e.rest("DeleteRobot", b.id).then(function(c) {
                    c && h(a.robots, b.id)
                }, function(a) {
                    d.alert(a), console.log(a)
                })
            })
        }, a.deletePlatform = function(b) {
            d.confirm("你确定要删除这个交易所的配置吗?").then(function() {
                e.rest("DeletePlatform", b.id).then(function(c) {
                    c && h(a.platforms, b.id)
                }, function(a) {
                    d.alert(a), console.log(a)
                })
            })
        }, a.publicRobot = function(a, b) {
            d.confirm("确定要" + ["取消公开", "公开"][b] + "这个机器人的交易日志吗?").then(function() {
                e.rest("PublicRobot", [a.id, b]).then(function(c) {
                    c && (a["public"] = b)
                }, function(a) {
                    d.alert(a)
                })
            })
        }, a.shareStrategy = function(a, b) {
            d.confirm("确定要" + ["取消公开或者售卖", "公开", "售卖"][b] + "这个策略吗?").then(function() {
                e.rest("ShareStrategy", [a.id, b]).then(function(c) {
                    c && (a["public"] = b)
                }, function(a) {
                    d.alert(a)
                })
            })
        }, a.deleteStrategy = function(b) {
            d.confirm(b.is_owner ? "你确定要删除这个策略吗?" : "此策略为收费策略, 确定要删除吗?").then(function() {
                e.rest("DeleteStrategy", b.id).then(function(c) {
                    -1 === c ? d.alert("请先删除所有使用该策略的机器人!!") : h(a.privateStrategies, b.id)
                }, function(a) {
                    d.alert(a), console.log(a)
                })
            })
        }, a.deleteNode = function(b) {
            d.confirm("删除之前请先停止所有此托管者上的机器人, 你确定要删除这个托管者吗 ?").then(function() {
                e.rest("DeleteNode", b.id).then(function(c) {
                    -1 === c ? d.alert("请先停止所有使用该托管者的机器人 !") : h(a.nodes, b.id)
                }, function(a) {
                    d.alert(a), console.log(a)
                })
            })
        }, a.rebuyStrategy = function(a) {
            var b = {
                title: "续费 - " + a.name,
                inputname: "注册码",
                inputtype: "input",
                description: "<font color=red>策略作者 " + a.username + " 请联系作者获取注册码!</font>",
                confirmname: "续费",
                onConfirm: function(b, c) {
                    e.rest("VerifyKey", [a.id, b]).then(function(a) {
                        a ? c(!0) : c(!1, "注册码无效, 3秒后重试 !", 3e3)
                    }, function(a) {
                        c(!1, a, 1e3)
                    })
                },
                onExit: function() {
                    d.alert("续费成功, 刷新本页面即可看到效果!")
                }
            };
            d.prompt(b)
        }, a.createKey = function(a) {
            var b = {
                title: "生成注册码 - " + a.name,
                inputname: "使用天数",
                inputtype: "number",
                description: "<font color=red>生成的注册码会在指定天数后到期, 每个注册码只可以使用一次.</font>",
                confirmname: "生成注册码",
                onConfirm: function(b, c) {
                    e.rest("CreateKey", [a.id, parseInt(b)]).then(function(a) {
                        a ? c(!1, "注册码:  " + a + "  请在10秒内复制该注册码.", 1e4) : c(!1, "权限不足, 10秒后重试 !", 1e4)
                    }, function(a) {
                        c(!1, a, 3e3)
                    })
                }
            };
            d.prompt(b)
        }, a.$on("$destroy", function() {
            l = !1, null !== j && (c.cancel(j), j = null), null !== k && (c.cancel(k), k = null)
        })
    }]), angular.module("botvsApp").controller("MRobotCtrl", ["$scope", "$timeout", "$routeParams", "session", "util", "dialog", function($scope, $timeout, $routeParams, session, util, dialog) {
        function getPages(a, b, c) {
            var d = 5,
                e = new Array,
                f = Math.ceil(a / b);
            if (f > 1 && f >= c) {
                var g = Math.max(1, c - d),
                    h = Math.min(f, c + d);
                1 != g && e.push({
                    id: 1,
                    name: "首页",
                    cls: "first"
                }), c > 1 && e.push({
                    id: c - 1,
                    name: "« 上页",
                    cls: "prev"
                });
                for (var i = g; h >= i; i++) e.push({
                    id: i,
                    name: i,
                    cls: i === c ? "active" : ""
                });
                f > c && e.push({
                    id: c + 1,
                    name: "下页 »",
                    cls: "next"
                }), h != f && e.push({
                    id: f,
                    name: "未页",
                    cls: "last"
                })
            }
            return e
        }

        function build_chart(a, b) {
            var c = angular.fromJson(a);
            if ("undefined" == typeof c.chart && (c.chart = {}), c.chart.renderTo = "chart_chart", b.length > 0) {
                _limitLogChart = b[b.length - 1].id, _limitCacheTS = (new Date).getTime();
                for (var d = 0; d < b.length; d++) {
                    var e = angular.fromJson(b[d].data);
                    try {
                        c.series[b[d].series_id].data.push(e)
                    } catch (f) {}
                }
            }
            $scope.show_chart_chart = b.length > 0, $timeout(function() {
                _chart_chart = "undefined" == typeof c.__isStock || c.__isStock ? new Highcharts.StockChart(c) : new Highcharts.Chart(c)
            }, 300)
        }

        function updatePages(a) {
            if (a.summary.length > 0) {
                var b = a.summary.split("\n");
                $scope.summary = $scope.summary.slice(0, b.length);
                for (var c = 0; c < b.length; c++) {
                    var d = util.getStrStyle(b[c]);
                    "undefined" != typeof $scope.summary[c] ? ($scope.summary[c].str = d.str, $scope.summary[c].style = d.style) : $scope.summary[c] = d
                }
            }
            if ($scope.robotstatus != a.status && ($scope.robotstatus = a.status, $scope.robot.node_id != a.node_id)) {
                $scope.robot.node_id = a.node_id;
                for (var c = 0; c < $scope.nodes.length; c++) $scope.robot.node_id === $scope.nodes[c].id && ($scope.bindNode = $scope.nodes[c])
            }
            $scope.robot.status = a.status;
            var e = a.log_count;
            e != $scope.log_count && ($scope.log_count = e, $scope.pageCount = Math.ceil(e / $scope.pageSize)), $scope.pages = getPages(e, $scope.pageSize, $scope.currentPage)
        }

        function replaceLogs(a) {
            if ("undefined" != typeof a && "undefined" != typeof a.length)
                for (var b = [": EOF", "unexpected", "read tcp ", "i/o timeout", "WSARecv", "end of JSON", "ConnectEx", "closed network connection", "GetAddrInfo", "no such host", "looking for beginning of value"], c = 0; c < a.length; c++) {
                    a[c].priceStr = a[c].log_type < 2 || 4 == a[c].log_type ? -1 == a[c].price ? "市价单" : a[c].price : "", a[c].amountStr = a[c].log_type < 2 ? a[c].amount : "";
                    for (var d = 0; d < b.length; d++) {
                        var e = a[c].extra.substring(a[c].extra.length - 2);
                        if ("@%" == e ? a[c].extra = a[c].extra.substring(0, a[c].extra.length - 2) + " (推送失败, 超过最大限制 50次/小时)#ff0000" : "@!" == e ? a[c].extra = a[c].extra.substring(0, a[c].extra.length - 2) + " (推送失败, 移动设备没有绑定)#ff0000" : "@" == a[c].extra[a[c].extra.length - 1] && (a[c].extra = a[c].extra.substring(0, a[c].extra.length - 1) + " (推送成功) #0000ff"), -1 != a[c].extra.indexOf(b[d])) {
                            a[c].realextra = a[c].extra, a[c].extra = "访问交易所API时发生网络错误";
                            break
                        }
                    } - 1 != a[c].extra.indexOf("提交时间") && (a[c].extra = a[c].extra + ", 请校对托管者本机时间");
                    var f = util.getStrStyle(a[c].extra);
                    a[c].extra = f.str, a[c].style = f.style
                }
        }

        function syncLog() {
            return $scope.currentPage > 1 || session.isBackground() ? void reloadLog() : ($scope.loading = !0, void session.rest(["GetRobotLogs", "GetRobotProfit", "GetRobotChart"], [
                [robot_id, 0, 10, _limitLogId],
                [robot_id, 0, 200, _limitLogProfit],
                [robot_id, 0, 200, _limitLogChart, _limitCacheTS]
            ]).then(function(a) {
                if (a) {
                    var b = a[0].result,
                        c = a[1].result.logs,
                        d = a[2].result.logs,
                        e = a[2].result.caches;
                    if (updatePages(b), c.length > 0) {
                        _limitLogProfit = c[c.length - 1].id;
                        for (var f = 0; f < c.length; f++) _chart_profit.series[0].addPoint([new Date(c[f].date.replace(/-/g, "/")).getTime(), c[f].profit], !0, !1);
                        $scope.show_chart_profit = !0
                    }
                    if (d.length > 0)
                        if (_limitLogChart = d[d.length - 1].id, _chart_chart) {
                            $scope.show_chart_chart = !0;
                            for (var g = "undefined" != typeof _chart_chart.xAxis[0] && "undefined" != typeof _chart_chart.xAxis[0].categories && "undefined" != typeof _chart_chart.xAxis[0].categories.length, f = 0; f < d.length; f++) {
                                var h = angular.fromJson(d[f].data);
                                try {
                                    if (g && _chart_chart.xAxis[0].categories.length <= _chart_chart.series[d[f].series_id].data.length) continue;
                                    _chart_chart.series[d[f].series_id].addPoint(h, !0, !1)
                                } catch (i) {
                                    console.log(i)
                                }
                            }
                        } else session.rest("GetRobotDetail", robot_id).then(function(a) {
                            build_chart(a.robot.chart_json, d)
                        });
                    if (_chart_chart && e.length > 0) {
                        e.sort(function(a, b) {
                            return a.date - b.date
                        });
                        for (var f = 0; f < e.length; f++) {
                            _limitCacheTS = Math.max(_limitCacheTS, e[f].date);
                            var j = angular.fromJson(e[f].data);
                            if (3 === j.length) {
                                var k = j[0],
                                    l = j[2];
                                0 > l && (l = _chart_chart.series[k].data.length - -l), _chart_chart.series[k].data[l].update(j[1])
                            }
                        }
                    }
                    if (b.logs.length > 0) {
                        var m = !1;
                        replaceLogs(b.logs), _limitLogId = b.logs[0].id;
                        for (var f = b.logs.length - 1; f >= 0; f--) {
                            if (!m)
                                for (var n = 0; n < $scope.logFilter.length; n++) b.logs[f].log_type === $scope.logFilter[n].log_type && $scope.logFilter[n].selected && (m = !0);
                            $scope.logs.unshift(b.logs[f])
                        }
                        for (var o = $scope.logs.length - $scope.pageSize, f = 0; o > f; f++) $scope.logs.pop();
                        m && $scope.autoPlay && $scope.playAudio()
                    }
                }
                $scope.loading = !1, reloadLog()
            }, function() {
                $scope.loading = !1, reloadLog()
            }))
        }

        function reloadLog() {
            $scope.autoRefresh && (_timer = $timeout(syncLog, 5e3))
        }
        $scope.animation = "slide-left";
        var robot_id = parseInt($routeParams.id),
            _timer = null,
            _limitLogId = -1,
            _limitLogProfit = -1,
            _limitLogChart = -1,
            _limitCacheTS = -1,
            _chart_profit = null,
            _chart_chart = null;
        $scope.robot = {}, $scope.scriptArgList = [], $scope.node = null, $scope.logs = [], $scope.profit_logs = [], $scope.currentPage = 1, $scope.autoRefresh = !1, $scope.isHideErrors = !1, $scope.loading = !0, $scope.pageSize = 20, $scope.log_count = 0, $scope.pages = [], $scope.pageCount = 0, $scope.summary = [], $scope.robotstatus = 0, $scope.btnpending = !1, $scope.kticks = util.kticks, $scope.ktick_selected = $scope.kticks[0], $scope.pairs_select = [], $scope.hideErrors = function(a) {
            $scope.isHideErrors = a
        }, $scope.autoPlay = !1, $scope.logTypes = ["买入", "卖出", "撤销", "错误", "收益", "信息", "重启"], $scope.logFilter = [], $scope.isCMDSending = !1;
        for (var i = 0; i < $scope.logTypes.length; i++) $scope.logFilter.push({
            log_type: i,
            name: $scope.logTypes[i],
            selected: !0
        });
        $scope.playAudio = function(a) {
            try {
                "undefined" == typeof a && (a = "1");
                var b = "msg_" + a,
                    c = document.getElementById(b);
                null == c && (c = document.createElement("audio"), c.id = b, c.src = "res/" + a + ".mp3", document.body.appendChild(c)), c.play()
            } catch (d) {}
        }, $scope.setRefresh = function(a) {
            a ? null === _timer && (_timer = $timeout(syncLog, 5e3)) : null !== _timer && ($timeout.cancel(_timer), _timer = null)
        }, $scope.removePair = function(a) {
            for (var b = 0; b < $scope.pairs_select.length; b++)
                if ($scope.pairs_select[b].label === a.label && $scope.pairs_select[b].stock === a.stock) return void $scope.pairs_select.splice(b, 1)
        }, $scope.addPair = function() {
            for (var a = 0; a < $scope.pairs_select.length; a++)
                if ($scope.pairs_select[a].label === $scope.platform_selected.label && $scope.pairs_select[a].stock === $scope.platform_stock_selected) return;
            $scope.pairs_select.push({
                id: $scope.platform_selected.id,
                label: $scope.platform_selected.label,
                stock: $scope.platform_stock_selected
            })
        }, $scope.$on("$destroy", function() {
            null != _timer && ($timeout.cancel(_timer), _timer = null), $scope.autoRefresh = !1
        }), $scope.go = function(a) {
            if ($scope.currentPage !== a) {
                $scope.currentPage = a;
                var b = (a - 1) * $scope.pageSize;
                $scope.loading = !0, session.rest("GetRobotLogs", [robot_id, b, $scope.pageSize, -1]).then(function(a) {
                    a ? (updatePages(a), replaceLogs(a.logs), $scope.logs = a.logs, a.logs.length > 0 && (_limitLogId = a.logs[0].id)) : dialog.alert("Error"), $scope.loading = !1
                }, function(a) {
                    $scope.loading = !1, dialog.alert(a)
                })
            }
        }, session.rest(["GetRobotDetail", "GetRobotProfit", "GetRobotChart", "GetRobotLogs", "GetNodeList", "GetPlatformList"], [
            [robot_id],
            [robot_id, 0, 3e3, -1],
            [robot_id, 0, 3e3, -1, (new Date).getTime()],
            [robot_id, 0, $scope.pageSize, -1],
            [],
            []
        ]).then(function(a) {
            if (a) {
                var b = a[0].result.robot,
                    c = a[1].result.logs,
                    d = a[2].result.logs;
                "undefined" != typeof b.chart_json && build_chart(b.chart_json, d);
                var e = a[3],
                    f = a[4].result.nodes,
                    g = a[5].result.platforms;
                f.splice(0, 0, {
                    id: -1,
                    name: "自动分配"
                });
                for (var h = 0; h < f.length; h++) b.fixed_id === f[h].id && ($scope.node_selected = f[h]), b.node_id === f[h].id && ($scope.bindNode = f[h]), -1 != f[h].id && (f[h].name = f[h].id + ": " + f[h].ip + " - " + f[h].os);
                $scope.nodes = f, $scope.autoRefresh = b.status < 3, reloadLog();
                for (var i = angular.fromJson(b.strategy_exchange_pairs), j = [], h = 0; h < c.length; h++) j.push([new Date(c[h].date.replace(/-/g, "/")).getTime(), c[h].profit]);
                $scope.show_chart_profit = c.length > 0, j.length > 0 && (_limitLogProfit = c[c.length - 1].id), $timeout(function() {
                    _chart_profit = util.newProfitChart("chart_profit", "收益", j)
                }, 300), replaceLogs(e.result.logs), $scope.logs = e.result.logs, updatePages(e.result), $scope.logs.length > 0 && (_limitLogId = $scope.logs[0].id), $scope.ktick_selected = $scope.kticks[0];
                for (var h = 0; h < $scope.kticks.length; h++)
                    if ($scope.kticks[h].id === i[0]) {
                        $scope.ktick_selected = $scope.kticks[h];
                        break
                    }
                for (var k = [], h = 0; h < g.length; h++) {
                    var l = g[h];
                    k.push({
                        id: l.id,
                        eid: l.eid,
                        label: l.label,
                        name: l.name,
                        stocks: l.stocks.sort()
                    })
                }
                k.length > 0 && ($scope.platforms = k, $scope.platform_selected = $scope.platforms[0], $scope.platform_stock_selected = $scope.platforms[0].stocks[0]);
                for (var h = 0; h < i[1].length; h++) {
                    "undefined" == typeof b.plabels[i[1][h]] && dialog.alert("该机器人关联的交易所已被删除 !");
                    var m = {
                        id: i[1][h],
                        label: b.plabels[i[1][h]],
                        stock: i[2][h]
                    };
                    $scope.pairs_select.push(m)
                }
                $scope.robot = b, $scope.scriptArgList = util.argsToList(b.strategy_args, b.robot_args), $scope.scriptCMDList = [], util.parseArgs(b.strategy_args, null, $scope.scriptCMDList), $scope.$emit("titleChange", "Robot - " + b.name)
            } else dialog.alert("Error");
            $scope.loading = !1
        }, function(a) {
            $scope.loading = !1, dialog.alert(a)
        }), $scope.submit = function() {
            var a = $scope.pairs_select;
            if ($scope.frm.$invalid || 0 === a.length) return void dialog.alert("参数错误, 请检测后提交!");
            var b = [],
                c = [];
            angular.forEach(a, function(a) {
                b.push(a.id), c.push(a.stock)
            }), $scope.btnpending = !0;
            var d = [];
            angular.forEach($scope.scriptArgList, function(a) {
                var b = a[0].split("@")[0];
                d.push(3 === a[3].id ? [b, parseInt(a.indexValue)] : [b, a.value])
            }), session.rest("ModifyRobot", [$scope.robot.id, $scope.robot.name, $scope.node_selected.id, $scope.ktick_selected.id, b, c, angular.toJson(d)]).then(function() {
                $scope.btnpending = !1, dialog.alert("更新参数成功, 请重新启动策略以生效!")
            }, function(a) {
                $scope.btnpending = !1, dialog.alert(a)
            })
        }, $scope.showArg = function(pair) {
            if (3 != pair.condition.length) return !0;
            for (var ret = !0, i = 0; i < $scope.scriptArgList.length; i++) {
                var item = $scope.scriptArgList[i],
                    argName = item[0].split("@")[0];
                if (argName === pair.condition[0]) {
                    var val = null;
                    if (3 === item[3].id ? val = item.indexValue : "string" != typeof item.value && (val = item.value), null != val) try {
                        ret = eval(val + pair.condition[1] + pair.condition[2]);
                        break
                    } catch (e) {}
                    break
                }
            }
            return ret
        }, $scope.cmdRobot = function(a, b) {
            if (1 != $scope.robotstatus) return void dialog.alert("必须要在机器人运行的情况下发送指令!");
            if ($scope.bindNode && parseFloat($scope.bindNode.build) < 2.76) return void dialog.alert("要求托管者版本 2.76 以上 !");
            var c = b[0],
                d = b.value,
                e = b[3].id;
            return 0 === e && isNaN(d) ? void dialog.alert("数字参数不正确 !") : 2 === e && 0 === d.length ? void dialog.alert("字符串参数不能为空 !") : (3 === e ? c = c + ":" + b.indexValue : 4 != e && (c = c + ":" + b.value), c.length > 200 ? void dialog.alert("指令过长, 最多支持200个字符 !") : void dialog.confirm("确定要向机器人发送 " + c + " 指令吗? ").then(function() {
                $scope.isCMDSending = !0, session.rest("CommandRobot", [a.id, c]).then(function(a) {
                    $scope.isCMDSending = !1, dialog.alert(a ? "发送指令成功, 请等待机器人响应 !" : "发送命令失败, 可能是命令重复或机器人不在运行状态!")
                }, function(a) {
                    $scope.isCMDSending = !1, dialog.alert(a), console.log(a)
                })
            }))
        }, $scope.stopRobot = function(a) {
            session.rest("StopRobot", a.id).then(function(b) {
                a.status = b, $scope.robotstatus = b
            }, function(a) {
                dialog.alert(a), console.log(a)
            })
        }, $scope.restartRobot = function(a) {
            dialog.confirm("你确定要重启这个机器人吗 ?").then(function() {
                _chart_chart && (_limitLogChart = 0), session.rest("RestartRobot", a.id).then(function(b) {
                    -1 === b ? dialog.alert("策略已过期,, 请联系作者重新购买!") : (a.status = b, $scope.robotstatus = b, $scope.autoRefresh || ($scope.autoRefresh = !0, reloadLog()))
                }, function(a) {
                    dialog.alert(a)
                })
            })
        }
    }]), angular.module("botvsApp").controller("MSecurityCtrl", ["$scope", "dialog", "encrypt", "session", function(a, b, c, d) {
        function e(a) {
            if (a.key.length > 0 && !f) {
                f = !0;
                try {
                    $("#qrcode").qrcode({
                        width: 150,
                        height: 150,
                        text: "otpauth://totp/" + a.username + "@BotVS?secret=" + a.key
                    })
                } catch (b) {
                    $("#qrcode").qrcode({
                        width: 150,
                        height: 150,
                        text: "otpauth://totp/BotVS?secret=" + a.key
                    })
                }
            }
        }
        a.googleKey = "", a.googleCode = "", a.useGoogleAuth = !1, a.username = d.getUser(), a.oldPassword = a.password = a.repassword = "";
        var f = !1;
        d.rest("GetGoogleAuthKey").then(function(b) {
            a.googleKey = b.key, a.useGoogleAuth = "" === b.key, e(b)
        }, function(a) {
            b.alert(a)
        }), a.bindGoogle = function() {
            a.frmgoogle.$invalid || "" === a.googleCode || d.rest("BindGoogleAuth", [a.googleCode, a.useGoogleAuth ? 0 : 1]).then(function(c) {
                c ? (a.useGoogleAuth = "" === c.key, a.googleKey = c.key, e(c), a.googleCode = "", b.alert("操作成功!")) : b.alert("Google验证码错误!!")
            }, function(a) {
                b.alert(a)
            })
        }, a.changePassword = function() {
            a.frm.$invalid || a.oldPassword === a.password || d.rest("ChangePassword", [c.encryptPassword(a.oldPassword), c.encryptPassword(a.password)]).then(function(c) {
                c ? (b.alert("操作成功，请重新登录, 并重新添加交易所!"), window.__passwordCache = "", d.logout()) : (a.error = "旧密码错误！", b.alert(a.error))
            }, function(a) {
                b.alert(a)
            })
        }
    }]), angular.module("botvsApp").controller("MAddRobotCtrl", ["$scope", "$location", "util", "session", "dialog", function($scope, $location, util, session, dialog) {
        var now = moment().format("YYYY-MM-DD HH:mm:ss");
        $scope.scheduleTime = now, $(".form_datetime").datetimepicker({
            locale: "zh-cn",
            minDate: now,
            defaultDate: now,
            format: "YYYY-MM-DD HH:mm:ss"
        }), $(".form_datetime").on("dp.change", function(a) {
            $scope.scheduleTime = a.date.format("YYYY-MM-DD HH:mm:ss")
        }), $scope.complete = !1, $scope.name = "", $scope.strategies = [], $scope.platforms = [], $scope.nodes = [], $scope.kticks = util.kticks, $scope.ktick_selected = $scope.kticks[0], $scope.pairs_select = [], $scope.scriptArgList = [], session.rest(["GetPlatformList", "GetStrategyList", "GetNodeList"], [
            [],
            [-1, -1, -1, 1],
            []
        ]).then(function(a) {
            if ($scope.complete = !0, a) {
                var b = [],
                    c = a[0].result.platforms;
                $scope.nodes = a[2].result.nodes;
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    b.push({
                        id: e.id,
                        eid: e.eid,
                        label: e.label,
                        name: e.name,
                        stocks: e.stocks.sort()
                    })
                }
                b.length > 0 && ($scope.platforms = b, $scope.platform_selected = $scope.platforms[0], $scope.platform_stock_selected = $scope.platforms[0].stocks[0]);
                for (var f = 0; f < a[1].result.strategies.length; f++) {
                    var e = a[1].result.strategies[f];
                    e.scriptArgList = util.argsToList(e.args), $scope.strategies.push(e)
                }
                $scope.strategies.length > 0 && ($scope.strategy_selected = $scope.strategies[0])
            } else dialog.alert("Error")
        }, function(a) {
            $scope.complete = !0, dialog.alert(a)
        }), $scope.removePair = function(a) {
            for (var b = 0; b < $scope.pairs_select.length; b++)
                if ($scope.pairs_select[b].label == a.label && $scope.pairs_select[b].stock == a.stock) return void $scope.pairs_select.splice(b, 1)
        }, $scope.addPair = function() {
            for (var a = 0; a < $scope.pairs_select.length; a++)
                if ($scope.pairs_select[a].label == $scope.platform_selected.label && $scope.pairs_select[a].stock == $scope.platform_stock_selected) return;
            $scope.pairs_select.push({
                id: $scope.platform_selected.id,
                label: $scope.platform_selected.label,
                stock: $scope.platform_stock_selected
            })
        }, $scope.showArg = function(pair) {
            if (3 != pair.condition.length) return !0;
            for (var ret = !0, i = 0; i < $scope.strategy_selected.scriptArgList.length; i++) {
                var item = $scope.strategy_selected.scriptArgList[i],
                    argName = item[0].split("@")[0];
                if (argName == pair.condition[0]) {
                    var val = null;
                    if (3 == item[3].id ? val = item.indexValue : "string" != typeof item.value && (val = item.value), null != val) try {
                        return eval(val + pair.condition[1] + pair.condition[2])
                    } catch (e) {}
                    break
                }
            }
            return ret
        }, $scope.submit = function() {
            var a = $scope.pairs_select;
            if (!$scope.frm.$invalid && 0 != a.length) {
                var b = [],
                    c = [];
                angular.forEach(a, function(a) {
                    b.push(a.id), c.push(a.stock)
                });
                var d = [];
                angular.forEach($scope.strategy_selected.scriptArgList, function(a) {
                    var b = a[0].split("@")[0];
                    d.push(3 == a[3].id ? [b, parseInt(a.indexValue)] : [b, a.value])
                });
                var e = parseInt($("#node_selected").val());
                session.rest("SaveRobot", [$scope.name, $scope.scheduleTime, d.length > 0 ? angular.toJson(d) : "", $scope.strategy_selected.id, $scope.ktick_selected.id, b, c, e]).then(function(a) {
                    0 == a ? (dialog.alert("创建成功!"), $location.path("/m/dashboard")) : -1 == a ? dialog.alert("该策略已过使用期, 请联系作者重新购买!") : -2 == a && dialog.alert("预约时间超过策略有效使用期, 请重新选择预约时间!")
                }, function() {
                    dialog.alert("创建失败, 机器人重名了, 请重新命名!")
                })
            }
        }
    }]), angular.module("botvsApp").controller("MAddPlatformCtrl", ["$scope", "util", "dialog", "encrypt", "session", "$location", "$routeParams", function(a, b, c, d, e, f, g) {
        a.isEdit = !1, a.exchanges = [], a.client_id = "", a.username = "", a.password = "", a.eid2png = b.eid2png;
        var h = -1;
        "undefined" != typeof g.id ? (a.isEdit = !0, e.rest("GetPlatformDetail", parseInt(g.id)).then(function(b) {
            if (b) {
                if (h = b.platform.id, a.name = b.platform.name, a.exchange = b.platform, a.label = b.platform.label, 8 == b.platform.eid || 21 == b.platform.eid) {
                    var d = b.platform.access_key.split(",");
                    a.client_id = d[0], a.access_key = d[1]
                } else a.access_key = b.platform.access_key;
                a.secret_key = b.platform.secret_key
            } else c.alert("Error")
        }, function(a) {
            c.alert(a)
        })) : e.rest(["GetPlatformList", "GetExchangeList"]).then(function(b) {
            if (b) {
                var d = b[0].result.platforms,
                    e = b[1].result.exchanges,
                    f = [];
                for (var g in e) e[g].filled = 0;
                for (var g in e) {
                    for (var h in d) d[h].name == e[g].name && e[g].filled++;
                    e[g].label = e[g].filled > 0 ? e[g].name + " - " + (e[g].filled > 9 ? "" : "0") + (e[g].filled + 1) : e[g].name, f.push(e[g])
                }
                f.length > 0 && (a.exchanges = f, a.exchange = f[0])
            } else c.alert("Error")
        }, function(a) {
            c.alert(a)
        }), a.submit = function() {
            function b(a) {
                window.__passwordCache = a, i = d.encryptByKey("$$$__" + i, d.encryptPassword(a)), e.rest("SavePlatform", [h, k, g, i, j]).then(function(a) {
                    a ? (c.alert("操作成功"), f.path("/m/dashboard")) : c.alert("名称已经存在")
                }, function(a) {
                    c.alert(a)
                })
            }
            if (!a.frm.$invalid) {
                var g = a.access_key,
                    i = a.secret_key,
                    j = a.exchange.label;
                (8 == a.exchange.eid || 21 == a.exchange.eid) && (g = a.client_id + "," + a.access_key), 25 == a.exchange.eid && (i += "," + a.username + "," + a.password);
                var k = a.isEdit ? -1 : a.exchange.id;
                if ("string" == typeof window.__passwordCache && window.__passwordCache.length > 0) b(window.__passwordCache);
                else {
                    var l = {
                        title: "安全验证",
                        inputname: "BotVS登录密码",
                        inputtype: "password",
                        description: "<font color=red>认证后, API密钥会加密后传输到服务器, 不用担心平台泄漏密钥 !</font>",
                        confirmname: "安全验证",
                        onConfirm: function(a, b) {
                            e.rest("VerifyPassword", d.encryptPassword(a)).then(function(a) {
                                b(a)
                            }, function() {
                                b(!1)
                            })
                        },
                        onExit: b
                    };
                    c.prompt(l)
                }
            }
        }
    }]), angular.module("botvsApp").controller("MAddNodeCtrl", ["$scope", "session", "dialog", function(a, b, c) {
        b.rest("GetNodeHash").then(function(b) {
            a.rpcs = "rpcs@a.botvs.com:9002/" + b
        }, function(a) {
            c.alert("获取用户ID失败: " + a)
        })
    }]), angular.module("botvsApp").controller("MAddStrategyCtrl", ["$scope", "$location", "$timeout", "$routeParams", "$filter", "dialog", "util", "session", function($scope, $location, $timeout, $routeParams, $filter, dialog, util, session) {
        //b：平台name_币种 c：时间段
        function newKChart(a, b, c, d) {
            try {
                var e = 0,
                    f = 3,
                    g = [{
                        type: "hour",
                        count: 1,
                        text: "1h"
                    }, {
                        type: "hour",
                        count: 3,
                        text: "3h"
                    }, {
                        type: "hour",
                        count: 8,
                        text: "8h"
                    }, {
                        type: "all",
                        text: "All"
                    }],
                    h = 0;
                c == e ? h = 0 : c > e && f > c ? h = 1 : c == f ? h = 2 : c > f && (h = 3), new Highcharts.StockChart({
                    chart: {
                        renderTo: a,
                        backgroundColor: "#fafafa"
                    },
                    plotOptions: {
                        series: {
                            turboThreshold: 0
                        },
                        candlestick: {
                            color: "#d33",
                            upColor: "#9e4"
                        }
                    },
                    tooltip: {
                        xDateFormat: "%Y-%m-%d %H:%M:%S",
                        color: "#f0f",
                        changeDecimals: 4,
                        borderColor: "#058dc7",
                        crosshairs: !1,
                        shared: !1,
                        snap: 1
                    },
                    rangeSelector: {
                        buttons: g,
                        selected: h,
                        inputEnabled: !1
                    },
                    yAxis: [{
                        opposite: !1,
                        title: {
                            text: b
                        },
                        top: 11,
                        height: 200,
                        lineWidth: 2,
                        gridLineDashStyle: "ShortDot"
                    }, {
                        opposite: !1,
                        title: {
                            text: "交易量"
                        },
                        top: 216,
                        height: 50,
                        offset: 0,
                        lineWidth: 2
                    }, {
                        opposite: !1,
                        title: {
                            text: "MACD(16,26,9)"
                        },
                        top: 271,
                        height: 110,
                        offset: 0,
                        lineWidth: 2
                    }],
                    series: d
                })
            } catch (i) {
                console.log(i)
            }
        }

        function initEditor(a) {
            editor = CodeMirror(document.getElementById("code-area"), {
                lineNumbers: !0,
                value: a,
                insertSoftTab: !0,
                indentUnit: 4,
                theme: "eclipse",
                styleActiveLine: !0,
                gutters: ["CodeMirror-lint-markers"],
                lint: !0,
                showHint: !0,
                matchBrackets: !0,
                mode: "javascript",
                extraKeys: {
                    Esc: function(a) {
                        a.getOption("fullScreen") && a.setOption("fullScreen", !1), editor.focus()
                    },
                    Tab: function(a) {
                        var b = Array(a.getOption("indentUnit") + 1).join(" ");
                        a.replaceSelection(b)
                    },
                    "Ctrl-S": function() {
                        editor.save()
                    }
                }
            });
            var b = !0;
            CodeMirror.on(editor, "vim-mode-change", function(a) {
                b = "insert" == a.mode
            }), editor.on("keyup", function(a, c) {
                if (27 != c.keyCode && ("vim" != a.getOption("keyMap") || b) && !editor.state.completionActive) {
                    var d = a.getTokenAt(a.getCursor()).string;
                    if (d.length > 0) {
                        var e = d[d.length - 1];
                        ("_" == d[0] || d.length > 2 && " " !== e && "	" != e) && CodeMirror.showHint(a, CodeMirror.hint.anyword, {
                            completeSingle: !1
                        })
                    }
                }
            }), editor.save = function() {
                $scope.submit()
            }, editor.setSize("100%", "100%")
        }
        $scope.isApp = session.isCordova();
        var now = moment(),
            startDate = "2014-07-01 00:00:00",
            endDate = now.format("YYYY-MM-DD HH:mm:ss"),
            stime = now.subtract(1, "days").format("YYYY-MM-DD HH:mm:ss");
        $scope.stime = stime, $scope.etime = endDate, $(".bs_stime").datetimepicker({
            locale: "zh-cn",
            minDate: startDate,
            maxDate: endDate,
            defaultDate: endDate,
            format: "YYYY-MM-DD HH:mm:ss"
        }), $(".bs_stime").on("dp.change", function(a) {
            $scope.stime = a.date.format("YYYY-MM-DD HH:mm:ss")
        }), $(".bs_etime").datetimepicker({
            locale: "zh-cn",
            minDate: startDate,
            maxDate: endDate,
            defaultDate: endDate,
            format: "YYYY-MM-DD HH:mm:ss"
        }), $(".bs_etime").on("dp.change", function(a) {
            $scope.etime = a.date.format("YYYY-MM-DD HH:mm:ss")
        }), $scope.scriptArgsSelectList = [];
        for (var i = 0; i < util.scriptArgsSelectList.length - 1; i++) $scope.scriptArgsSelectList.push(util.scriptArgsSelectList[i]);
        $scope.inputArgName = "", $scope.inputArgDesc = "", $scope.inputArgShowName = "", $scope.inputArgDef = "", $scope.inputArgType = $scope.scriptArgsSelectList[0], $scope.scriptArgList = [], $scope.scriptCMDSelectList = util.scriptArgsSelectList, $scope.inputCMDName = "", $scope.inputCMDDesc = "", $scope.inputCMDShowName = "", $scope.inputCMDDef = "", $scope.inputCMDType = $scope.scriptCMDSelectList[0], $scope.scriptCMDList = [], $scope.isVimMode = !1;
        var editor = null;
        $scope.switchVim = function() {
            "vim" != editor.getOption("keyMap") ? (editor.setOption("keyMap", "vim"), $scope.isVimMode = !0) : (editor.setOption("keyMap", "default"), $scope.isVimMode = !1), editor.focus()
        }, $scope.switchFullScreen = function() {
            editor.setOption("fullScreen", !editor.getOption("fullScreen")), editor.focus()
        };
        var addItem = function(a, b, c, d, e, f, g) {
            if (0 == a.length || 0 == b.length || 0 == d.length && 4 != e.id) return void dialog.alert("除了备注所有项都是必填项");
            if (4 == e.id && (d = "__button__"), 3 == e.id && d.split("|").length < 2) return void dialog.alert('下拉框类型必须是以 "|" 隔开的一个字符串, 如aaa|bbb');
            a = a.replace(/\s+/g, "");
            var h = a,
                i = [],
                j = h.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)@([a-zA-Z_$][0-9a-zA-Z_$]*)([=!><]=|>|<)([0-9]*)$/),
                k = h.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)@([!]*[a-zA-Z_$][0-9a-zA-Z_$]*)$/);
            if (j) h = j[1], i = j.slice(2, 5);
            else if (k) h = k[1], i = [k[2].replace(/!/g, ""), "!" == k[2][0] ? "!=" : "==", "1"];
            else if (!g && !/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(h)) return void dialog.alert("非法变量名, 变量名首字母必须为字母(a-z A-Z)，下划线(_)，或者美元符号($)开始");
            for (var l = -1, m = 0; m < f.length; m++)
                if (f[m][0].split("@")[0] == h || f[m][1] == b) {
                    if (!confirm("变量名或者描述重复, 确定要覆盖旧的变量吗?")) return;
                    l = m
                }
            var n = d;
            if (0 == e.id) {
                if (isNaN(d)) return void dialog.alert("不合法的数字: " + d);
                n = parseFloat(d)
            } else if (1 == e.id) {
                if ("boolean" == typeof d && (d = d.toString()), "true" != d && "false" != d) return void dialog.alert("不合法的布尔值: " + d + ", 必须为true或者false");
                n = "true" == d
            }
            var o = [a, b, c, e, n];
            o.value = n, o.condition = i, -1 != l ? f[l] = o : f.push(o)
        };
        $scope.addArg = function() {
            addItem($scope.inputArgName, $scope.inputArgShowName, $scope.inputArgDesc, $scope.inputArgDef, $scope.inputArgType, $scope.scriptArgList, !1)
        }, $scope.addCMD = function() {
            addItem($scope.inputCMDName, $scope.inputCMDShowName, $scope.inputCMDDesc, $scope.inputCMDDef, $scope.inputCMDType, $scope.scriptCMDList, !0)
        }, $scope.copyArg = function(a) {
            var b = $scope.scriptArgList[a];
            $scope.inputArgName = b[0], $scope.inputArgShowName = b[1], $scope.inputArgDesc = b[2], $scope.inputArgType = b[3], $scope.inputArgDef = b[4]
        }, $scope.copyCMD = function(a) {
            var b = $scope.scriptCMDList[a];
            $scope.inputCMDName = b[0], $scope.inputCMDShowName = b[1], $scope.inputCMDDesc = b[2], $scope.inputCMDType = b[3], $scope.inputCMDDef = 4 == $scope.inputCMDType.id ? "" : b[4]
        }, $scope.removeArg = function(a) {
            $scope.scriptArgList.splice(a, 1)
        }, $scope.removeCMD = function(a) {
            $scope.scriptCMDList.splice(a, 1)
        }, $scope.showArg = function(pair) {
            if (3 != pair.condition.length) return !0;
            for (var ret = !0, i = 0; i < $scope.scriptArgList.length; i++) {
                var item = $scope.scriptArgList[i],
                    argName = item[0].split("@")[0];
                if (argName == pair.condition[0]) {
                    var val = null;
                    if (3 == item[3].id ? val = item.indexValue : "string" != typeof item.value && (val = item.value), null != val) return eval(val + pair.condition[1] + pair.condition[2]);
                    break
                }
            }
            return ret
        };
        var fetchList = function(a, b) {
            for (var c = [], d = 0; d < a.length; d++) {
                var e = a[d][4];
                3 == a[d][3].id && (e = util.listMagic + e);
                var f = [a[d][0], a[d][1], a[d][2], e];
                "undefined" != typeof b && (f[0] = b + f[0]), c.push(f)
            }
            return c
        };
        $scope.name = "", $scope.description = "", $scope.isCopy = -1 != $location.path().indexOf("copy-strategy"), $scope.isEdit = "undefined" != typeof $routeParams.id && !$scope.isCopy;
        var strategyId = -1;
        $scope.submit = function() {
            if ($scope.frm.$invalid) return void dialog.alert("表单不完整, 保存失败 !");
            var a = fetchList($scope.scriptArgList),
                b = fetchList($scope.scriptCMDList, util.cmdMagic),
                c = angular.toJson(a.concat(b)),
                d = $scope.name,
                e = $scope.description,
                f = editor.getValue();
            0 != d.length && 0 != e.length && 0 != f.length && ($scope.pending = !0, session.rest("SaveStrategy", [strategyId, d, e, c, f]).then(function(a) {
                $scope.pending = !1, a ? (dialog.alert("保存成功 !"), -1 == strategyId && $location.path("/m/dashboard")) : dialog.alert("策略重名了, 请更改策略名称!")
            }, function(a) {
                $scope.pending = !1, dialog.alert(a)
            }))
        }, $scope.platforms = [{
            eid: 0,
            name: "火币网",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 1,
            name: "OKCoin",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 2,
            name: "BTCChina",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 3,
            name: "云币网",
            stocks: ["BTC", "LTC", "BITSX", "DOGE", "PTS"]
        }, {
            eid: 4,
            name: "中国比特币",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 5,
            name: "比特币交易网",
            stocks: ["BTC"]
        }, {
            eid: 6,
            name: "BTC100",
            stocks: ["BTC", "LTC", "DOG"]
        }, {
            eid: 7,
            name: "BitVC",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 8,
            name: "796期货",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 11,
            name: "BitVC期货",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 12,
            name: "OKCoin期货",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 20,
            name: "BTC-E",
            stocks: ["BTC_CNH", "BTC_USD", "LTC_CNH", "LTC_USD"]
        }, {
            eid: 21,
            name: "Bitstamp",
            stocks: ["BTC"]
        }, {
            eid: 22,
            name: "Bitfinex",
            stocks: ["BTC", "LTC"]
        }, {
            eid: 23,
            name: "OKCoin国际站",
            stocks: ["BTC", "LTC"]
        }], $scope.platform_selected = $scope.platforms[0], $scope.platform_stock_selected = $scope.platforms[0].stocks[0], $scope.kticks = util.kticks, $scope.ktick_selected = $scope.kticks[0], $scope.pairs_select = [], "undefined" != typeof $routeParams.id ? session.rest("GetStrategyDetail", parseInt($routeParams.id)).then(function(a) {
            a ? (util.parseArgs(a.strategy.args, $scope.scriptArgList, $scope.scriptCMDList), $scope.name = a.strategy.name + ($scope.isCopy ? " (复制)" : ""), $scope.$emit("titleChange", $scope.name + " - 编辑"), $scope.description = a.strategy.description, $scope.isCopy || (strategyId = a.strategy.id), $timeout(function() {
                initEditor(a.strategy.source)
            }, 0)) : dialog.alert("Error")
        }, function(a) {
            dialog.alert(a)
        }) : $timeout(function() {
            initEditor("function main() {\n    Log(exchange.GetAccount());\n}")
        }, 0), $scope.removePair = function(a) {
            for (var b = 0; b < $scope.pairs_select.length; b++)
                if ($scope.pairs_select[b].name == a.name && $scope.pairs_select[b].stock == a.stock) return void $scope.pairs_select.splice(b, 1)
        }, $scope.addPair = function() {
            for (var a = [25], b = 0; b < a.length; b++)
                if ($scope.platform_selected.eid == a[b]) return void dialog.alert("暂不支持该平台回测!");
            for (var b = 0; b < $scope.pairs_select.length; b++)
                if ($scope.pairs_select[b].name == $scope.platform_selected.name && $scope.pairs_select[b].stock == $scope.platform_stock_selected) return void dialog.alert("Already exists " + $scope.platform_selected.name + "/" + $scope.platform_stock_selected + " !");
            $scope.pairs_select.push({
                eid: $scope.platform_selected.eid,
                name: $scope.platform_selected.name,
                stock: $scope.platform_stock_selected,
                balance: $scope.accountBalance,
                stocks: $scope.accountStocks
            })
        }, $scope.getBtnClass = function() {
            return $scope.pairs_select.length > 0 ? "btn btn-success" : "btn btn-danger"
        }, $scope.progress = 0, $scope.chartPairs = [], $scope.logs = [], $scope.profit_logs = [], $scope.testing = !1, $scope.accountBalance = 1e4, $scope.accountStocks = 3, $scope.statusStyle = {}, $scope.canStop = "undefined" != typeof Worker, $scope.runBacktest = function() {
            function a(a) {
                var b = 0,
                    c = 1,
                    d = 2,
                    e = 8,
                    f = 9;
                "undefined" != typeof a.error && ($scope.testing = !1, dialog.alert(a.error));
                var g = [];
                for (var h in a.series) g[a.series[h].eid] = [];
                $scope.logs = [], $scope.show_chart_profit = a.profit_logs.length > 0, $scope.show_chart_chart = !1;
                for (var i = 0; i < a.logs.length; i++) {
                    var j = a.logs[i].log_type;
                    if (!a.logs[i].__hide && j != e && j != f) {
                        var k = new Date(a.logs[i].date.replace(/-/g, "/")).getTime(),
                            l = a.logs[i].platform_id; - 1 != l && (j == b ? g[l].push({
                            x: k,
                            title: "买",
                            text: "买入: " + a.logs[i].amount + "<br>价格: " + a.logs[i].price + "<br>单号: " + a.logs[i].order_id
                        }) : j == c ? g[l].push({
                            x: k,
                            title: "卖",
                            text: "卖出: " + a.logs[i].amount + "<br>价格: " + a.logs[i].price + "<br>单号: " + a.logs[i].order_id
                        }) : j == d && g[l].push({
                            x: k,
                            title: "撤",
                            text: "撤消: 单号 " + a.logs[i].order_id
                        }));
                        var m = util.getStrStyle(a.logs[i].extra);
                        a.logs[i].extra = m.str, a.logs[i].style = m.style, a.logs[i].priceStr = a.logs[i].log_type < 2 || 4 == a.logs[i].log_type ? -1 == a.logs[i].price ? "市价单" : a.logs[i].price : "", a.logs[i].amountStr = a.logs[i].log_type < 2 ? a.logs[i].amount : "", $scope.logs.push(a.logs[i])
                    }
                }
                if ("" != a.chart_json) {
                    var n = angular.fromJson(a.chart_json);
                    if ("undefined" == typeof n.chart && (n.chart = {}), n.chart.renderTo = "sandbox_chart_chart", n.chart.backgroundColor = "#fafafa", a.chart_logs.length > 0)
                        for (var i = 0; i < a.chart_logs.length; i++)
                            for (var o = 0; o < a.chart_logs[i].length; o++) {
                                var p = angular.fromJson(a.chart_logs[i][o]);
                                try {
                                    n.series[i].data.push(p)
                                } catch (q) {}
                            }
                    $scope.show_chart_chart = !0, $timeout(function() {
                        "undefined" == typeof n.__isStock || n.__isStock ? new Highcharts.StockChart(n) : new Highcharts.Chart(n)
                    }, 300)
                }
                for (var h in a.series) {
                    var r = $filter("eid2str")(a.series[h].eid) + "_" + a.series[h].currency;
                    newKChart("chart_" + h, r, a.series[h].period, [{
                        type: "candlestick",
                        id: "primary",
                        name: r,
                        data: a.series[h].ohlc,
                        yAxis: 0
                    }, {
                        type: "flags",
                        shape: "circlepin",
                        onSeries: "primary",
                        data: g[a.series[h].eid]
                    }, {
                        type: "trendline",
                        lineWidth: 1,
                        name: "EMA(7)",
                        linkedTo: "primary",
                        showInLegend: !0,
                        algorithm: "EMA",
                        periods: 7
                    }, {
                        type: "trendline",
                        lineWidth: 1,
                        name: "EMA(30)",
                        linkedTo: "primary",
                        showInLegend: !0,
                        algorithm: "EMA",
                        periods: 30
                    }, {
                        type: "column",
                        name: "Volume",
                        data: a.series[h].volumes,
                        yAxis: 1
                    }, {
                        name: "MACD(12,26,9)",
                        lineWidth: 1,
                        linkedTo: "primary",
                        yAxis: 2,
                        showInLegend: !0,
                        type: "trendline",
                        algorithm: "MACD"
                    }, {
                        name: "Signal line",
                        lineWidth: 1,
                        linkedTo: "primary",
                        yAxis: 2,
                        showInLegend: !0,
                        type: "trendline",
                        algorithm: "signalLine"
                    }, {
                        name: "Histogram",
                        lineWidth: 1,
                        linkedTo: "primary",
                        yAxis: 2,
                        showInLegend: !0,
                        type: "histogram"
                    }])
                }
                a.profit_logs.length > 0 && $timeout(function() {
                    util.newProfitChart("sandbox_chart_profit", "收益曲线", a.profit_logs)
                }, 100), $scope.testing = !1
            }

            function b() {
                try {
                    "undefined" != typeof Worker ? (window.worker || (window.worker = new Worker("scripts/misc/sandbox/worker.js"), worker.onmessage = function(b) {
                        var c = b.data,
                            d = "";
                        if ("undefined" == typeof c.ret ? d = "回测日志 - " + c.progress.toFixed(1) + "%" : (d = "回测日志", $scope.$apply(a(c.ret)), window.recordCache = c.cache), "" != c.summary) {
                            var e = util.getStrStyle(c.summary);
                            d += " 状态: " + e.str, $scope.statusStyle = e.style
                        }
                        $("#progress").text(d)
                    }, worker.onerror = function(a) {
                        dialog.alert(a.message)
                    }), worker.postMessage([$scope.stime, $scope.etime, $scope.ktick_selected.id, d, f, window.recordCache])) : ($scope.testing = !1, dailog.alert("不支持Worker, 请升级至支持标准HTML5的浏览器"))
                } catch (b) {
                    "Worker " + JSON.stringify(b))
                }
            }
            var c = $scope.pairs_select;
            if (!$scope.frmtest.$invalid && 0 != c.length) {
                $scope.statusStyle = {};
                var d = [];
                angular.forEach(c, function(a) {
                    d.push([a.eid, a.stock, a.balance, a.stocks])
                });
                var e = "";
                angular.forEach($scope.scriptArgList, function(a) {
                    var b = a[0].split("@")[0];
                    e += "var " + b + " = ", e += 3 == a[3].id ? a.indexValue : "string" == typeof a.value ? angular.toJson(a.value) : a.value, e += ";\n"
                }), $scope.chartPairs = d;
                var f = e + editor.getValue();
                $scope.logs = [], $scope.testing = !0, $timeout(b, 300)
            }
        }, $scope.stopBacktest = function() {
            window.worker && (worker.terminate(), window.worker = null, $scope.testing = !1, $("#progress").text("回测日志"))
        }
    }]), angular.module("botvsApp").controller("MPushhistoryCtrl", ["$scope", "session", "util", "dialog", "$timeout", function(a, b, c, d) {
        function e(b) {
            var d = localStorage.getItem(b),
                e = [];
            d && (e = angular.fromJson(d));
            for (var f = 0; f < e.length; f++) e[f].data = c.getStrStyle(e[f].msg);
            a.messages = e
        }
        a.messages = [];
        var f = "@" + b.getUser();
        e(f), a.empty = function() {
            d.confirm("确定要清空本地消息吗?").then(function() {
                localStorage.setItem(f, "[]"), a.messages = []
            })
        }, a.$on("push", function(b, c) {
            a.$apply(e(c))
        })
    }]), angular.module("botvsApp").controller("StrategyCtrl", ["$scope", "$routeParams", "$timeout", "session", "dialog", function(a, b, c, d, e) {
        a.strategy = {}, a.isLogin = d.isLogin(), d.rest("GetPublicStrategyDetail", parseInt(b.id)).then(function(b) {
            if (b) {
                var d = b.strategy;
                if (a.strategy = d, a.$emit("titleChange", d.name), 1 == d["public"]) {
                    var f = CodeMirror(document.getElementById("code-area"), {
                        lineNumbers: !0,
                        readOnly: !0,
                        value: d.source,
                        mode: "javascript"
                    });
                    f.setSize("100%", "100%"), c(function() {
                        f.refresh()
                    }, 0)
                }
            } else e.alert("Error")
        }, function(a) {
            a.indexOf("rows") && (a = "找不到该策略, 可能该策略已下架 !"), e.alert(a)
        })
    }]), angular.module("botvsApp").controller("RobotCtrl", ["$scope", "$timeout", "$routeParams", "session", "util", "dialog", function(a, b, c, d, e, f) {
        function g(a, b, c) {
            var d = 5,
                e = new Array,
                f = Math.ceil(a / b);
            if (f > 1 && f >= c) {
                var g = Math.max(1, c - d),
                    h = Math.min(f, c + d);
                1 != g && e.push({
                    id: 1,
                    name: "首页",
                    cls: "first"
                }), c > 1 && e.push({
                    id: c - 1,
                    name: "« 上页",
                    cls: "prev"
                });
                for (var i = g; h >= i; i++) e.push({
                    id: i,
                    name: i,
                    cls: i === c ? "active" : ""
                });
                f > c && e.push({
                    id: c + 1,
                    name: "下页 »",
                    cls: "next"
                }), h != f && e.push({
                    id: f,
                    name: "未页",
                    cls: "last"
                })
            }
            return e
        }

        function h(c, d) {
            var e = angular.fromJson(c);
            if ("undefined" == typeof e.chart && (e.chart = {}), e.chart.renderTo = "chart_chart", d.length > 0) {
                q = d[d.length - 1].id, r = (new Date).getTime();
                for (var f = 0; f < d.length; f++) {
                    var g = angular.fromJson(d[f].data);
                    try {
                        e.series[d[f].series_id].data.push(g)
                    } catch (h) {}
                }
            }
            a.show_chart_chart = d.length > 0, b(function() {
                t = "undefined" == typeof e.__isStock || e.__isStock ? new Highcharts.StockChart(e) : new Highcharts.Chart(e)
            }, 300)
        }

        function i(b) {
            if (b.summary.length > 0) {
                var c = b.summary.split("\n");
                a.summary = a.summary.slice(0, c.length);
                for (var d = 0; d < c.length; d++) {
                    var f = e.getStrStyle(c[d]);
                    "undefined" != typeof a.summary[d] ? (a.summary[d].str = f.str, a.summary[d].style = f.style) : a.summary[d] = f
                }
            }
            a.robotstatus != b.status && (a.robotstatus = b.status, a.robot.node_id != b.node_id && (a.robot.node_id = b.node_id)), a.robot.status = b.status;
            var h = b.log_count;
            h != a.log_count && (a.log_count = h, a.pageCount = Math.ceil(h / a.pageSize)), a.pages = g(h, a.pageSize, a.currentPage)
        }

        function j(a) {
            if ("undefined" != typeof a && "undefined" != typeof a.length)
                for (var b = [": EOF", "unexpected", "read tcp ", "i/o timeout", "WSARecv", "end of JSON", "ConnectEx", "closed network connection", "GetAddrInfo", "no such host", "looking for beginning of value"], c = 0; c < a.length; c++) {
                    a[c].priceStr = a[c].log_type < 2 || 4 == a[c].log_type ? -1 == a[c].price ? "市价单" : a[c].price : "", a[c].amountStr = a[c].log_type < 2 ? a[c].amount : "";
                    for (var d = 0; d < b.length; d++) {
                        var f = a[c].extra.substring(a[c].extra.length - 2);
                        if ("@%" == f ? a[c].extra = a[c].extra.substring(0, a[c].extra.length - 2) + " (推送失败, 超过最大限制 50次/小时)#ff0000" : "@!" == f ? a[c].extra = a[c].extra.substring(0, a[c].extra.length - 2) + " (推送失败, 移动设备没有绑定)#ff0000" : "@" == a[c].extra[a[c].extra.length - 1] && (a[c].extra = a[c].extra.substring(0, a[c].extra.length - 1) + " (推送成功) #0000ff"), -1 != a[c].extra.indexOf(b[d])) {
                            a[c].realextra = a[c].extra, a[c].extra = "访问交易所API时发生网络错误";
                            break
                        }
                    } - 1 != a[c].extra.indexOf("提交时间") && (a[c].extra = a[c].extra + ", 请校对托管者本机时间");
                    var g = e.getStrStyle(a[c].extra);
                    a[c].extra = g.str, a[c].style = g.style
                }
        }

        function k() {
            return a.currentPage > 1 || d.isBackground() ? void l() : (a.loading = !0, void d.rest(["GetRobotLogs", "GetRobotProfit", "GetRobotChart"], [
                [m, 0, 10, o],
                [m, 0, 200, p],
                [m, 0, 200, q, r]
            ]).then(function(b) {
                if (b) {
                    var c = b[0].result,
                        e = b[1].result.logs,
                        f = b[2].result.logs,
                        g = b[2].result.caches;
                    if (i(c), e.length > 0) {
                        p = e[e.length - 1].id;
                        for (var k = 0; k < e.length; k++) s.series[0].addPoint([new Date(e[k].date.replace(/-/g, "/")).getTime(), e[k].profit], !0, !1);
                        a.show_chart_profit = !0
                    }
                    if (f.length > 0)
                        if (q = f[f.length - 1].id, t) {
                            a.show_chart_chart = !0;
                            for (var n = "undefined" != typeof t.xAxis[0] && "undefined" != typeof t.xAxis[0].categories && "undefined" != typeof t.xAxis[0].categories.length, k = 0; k < f.length; k++) {
                                var u = angular.fromJson(f[k].data);
                                try {
                                    if (n && t.xAxis[0].categories.length <= t.series[f[k].series_id].data.length) continue;
                                    t.series[f[k].series_id].addPoint(u, !0, !1)
                                } catch (v) {
                                    console.log(v)
                                }
                            }
                        } else d.rest("GetRobotDetail", m).then(function(a) {
                            h(a.robot.chart_json, f)
                        });
                    if (t && g.length > 0) {
                        g.sort(function(a, b) {
                            return a.date - b.date
                        });
                        for (var k = 0; k < g.length; k++) {
                            r = Math.max(r, g[k].date);
                            var w = angular.fromJson(g[k].data);
                            if (3 === w.length) {
                                var x = w[0],
                                    y = w[2];
                                0 > y && (y = t.series[x].data.length - -y), y >= 0 && y < t.series[x].data.length ? t.series[x].data[y].update(w[1]) : y >= t.series[x].data.length ? t.series[x].addPoint(w[1], !0, !1) : console.log("Wrong point:", x, w, t.series[x].data.length)
                            }
                        }
                    }
                    if (c.logs.length > 0) {
                        var z = !1;
                        j(c.logs), o = c.logs[0].id;
                        for (var k = c.logs.length - 1; k >= 0; k--) {
                            if (!z)
                                for (var A = 0; A < a.logFilter.length; A++) c.logs[k].log_type === a.logFilter[A].log_type && a.logFilter[A].selected && (z = !0);
                            a.logs.unshift(c.logs[k])
                        }
                        for (var B = a.logs.length - a.pageSize, k = 0; B > k; k++) a.logs.pop();
                        z && a.autoPlay && a.playAudio()
                    }
                }
                a.loading = !1, l()
            }, function() {
                a.loading = !1, l()
            }))
        }

        function l() {
            a.autoRefresh && (n = b(k, 5e3))
        }
        var m = parseInt(c.id),
            n = null,
            o = -1,
            p = -1,
            q = -1,
            r = -1,
            s = null,
            t = null;
        a.robot = {}, a.scriptArgList = [], a.node = null, a.logs = [], a.profit_logs = [], a.currentPage = 1, a.autoRefresh = !1, a.isHideErrors = !1, a.loading = !0, a.pageSize = 20, a.log_count = 0, a.pages = [], a.pageCount = 0, a.summary = [], a.robotstatus = 0, a.btnpending = !1, a.kticks = e.kticks, a.ktick_selected = a.kticks[0], a.pairs_select = [], a.hideErrors = function(b) {
            a.isHideErrors = b
        }, a.autoPlay = !1, a.logTypes = ["买入", "卖出", "撤销", "错误", "收益", "信息", "重启"], a.logFilter = [], a.isCMDSending = !1;
        for (var u = 0; u < a.logTypes.length; u++) a.logFilter.push({
            log_type: u,
            name: a.logTypes[u],
            selected: !0
        });
        a.playAudio = function(a) {
            try {
                "undefined" == typeof a && (a = "1");
                var b = "msg_" + a,
                    c = document.getElementById(b);
                null == c && (c = document.createElement("audio"), c.id = b, c.src = "res/" + a + ".mp3", document.body.appendChild(c)), c.play()
            } catch (d) {}
        }, a.setRefresh = function(a) {
            a ? null === n && (n = b(k, 5e3)) : null !== n && (b.cancel(n), n = null)
        }, a.$on("$destroy", function() {
            null != n && (b.cancel(n), n = null), a.autoRefresh = !1
        }), a.go = function(b) {
            if (a.currentPage !== b) {
                a.currentPage = b;
                var c = (b - 1) * a.pageSize;
                a.loading = !0, d.rest("GetRobotLogs", [m, c, a.pageSize, -1]).then(function(b) {
                    b ? (i(b), j(b.logs), a.logs = b.logs, b.logs.length > 0 && (o = b.logs[0].id)) : f.alert("Error"), a.loading = !1
                }, function(b) {
                    a.loading = !1, f.alert(b)
                })
            }
        }, d.rest(["GetRobotDetail", "GetRobotProfit", "GetRobotChart", "GetRobotLogs", "GetPlatformList"], [
            [m],
            [m, 0, 3e3, -1],
            [m, 0, 3e3, -1, (new Date).getTime()],
            [m, 0, a.pageSize, -1],
            []
        ]).then(function(c) {
            if (c) {
                var d = c[0].result.robot,
                    g = c[1].result.logs,
                    k = c[2].result.logs;
                "undefined" != typeof d.chart_json && h(d.chart_json, k);
                var m = c[3],
                    n = c[4].result.platforms;
                a.autoRefresh = d.status < 3, l();
                for (var q = angular.fromJson(d.strategy_exchange_pairs), r = [], t = 0; t < g.length; t++) r.push([new Date(g[t].date.replace(/-/g, "/")).getTime(), g[t].profit]);
                a.show_chart_profit = g.length > 0, r.length > 0 && (p = g[g.length - 1].id), b(function() {
                    s = e.newProfitChart("chart_profit", "收益", r)
                }, 300), j(m.result.logs), a.logs = m.result.logs, i(m.result), a.logs.length > 0 && (o = a.logs[0].id), a.ktick_selected = a.kticks[0];
                for (var t = 0; t < a.kticks.length; t++)
                    if (a.kticks[t].id === q[0]) {
                        a.ktick_selected = a.kticks[t];
                        break
                    }
                for (var u = [], t = 0; t < n.length; t++) {
                    var v = n[t];
                    u.push({
                        id: v.id,
                        eid: v.eid,
                        label: v.label,
                        name: v.name,
                        stocks: v.stocks.sort()
                    })
                }
                u.length > 0 && (a.platforms = u, a.platform_selected = a.platforms[0], a.platform_stock_selected = a.platforms[0].stocks[0]);
                for (var t = 0; t < q[1].length; t++) {
                    "undefined" == typeof d.plabels[q[1][t]] && f.alert("该机器人关联的交易所已被删除 !");
                    var w = {
                        id: q[1][t],
                        label: d.plabels[q[1][t]],
                        stock: q[2][t]
                    };
                    a.pairs_select.push(w)
                }
                a.robot = d, a.scriptArgList = e.argsToList(d.strategy_args, d.robot_args), a.scriptCMDList = [], e.parseArgs(d.strategy_args, null, a.scriptCMDList), a.$emit("titleChange", "Robot - " + d.name)
            } else f.alert("Error");
            a.loading = !1
        }, function(b) {
            a.loading = !1, f.alert(b)
        })
    }]), angular.module("botvsApp").controller("BbsCtrl", ["$scope", "$routeParams", function(a, b) {
        a.zone = "bbs", "undefined" != typeof b.id && (a.zone = "bbs@" + b.id), a.$emit("titleChange", a.zone)
    }]), angular.module("botvsApp").factory("session", ["$location", "localStorageService", "$q", "$window", "$timeout", "$rootScope", "encrypt", "dialog", "util", function($location, localStorageService, $q, $window, $timeout, $rootScope, encrypt, dialog, util) {
        function ping() {
            try {
                if (isCordova() && navigator.connection.type == Connection.NONE) tips("网络连接不可用.");
                else {
                    var a = (new Date).getTime();
                    a - lastConnection > keepAlive && (a - lastConnection > 3 * keepAlive ? (tips("网络连接中."), ws.refresh()) : 1 == ws.readyState && (isCordova() && tips("测试网络中."), connectionValid ? ws.send("P") : rest("Ping").then(function() {})))
                }
            } catch (b) {
                tips("异常: " + b)
            }
            $timeout(ping, keepAlive)
        }

        function getCallbackId() {
            return currentCallbackId += 1, currentCallbackId > 1e4 && (currentCallbackId = 0), currentCallbackId.toString()
        }

        function makePayload(a, b) {
            if ("undefined" == typeof b && (b = [], angular.isArray(a)))
                for (var c = 0; c < a.length; c++) b.push([]);
            "string" == typeof a && (a = [a], b = angular.isArray(b) ? [b] : [
                [b]
            ]);
            var d = getToken(),
                e = getCallbackId(),
                f = {
                    method: a,
                    params: b,
                    token: d,
                    callbackId: e
                };
            isCordova() && (f.app = {
                platform: device.platform,
                model: device.model,
                uuid: device.uuid,
                net: navigator.connection.type,
                retry: retryCount.toString(),
                version: "1.0"
            });
            var g = angular.toJson(encrypt.RSAEncrypt(angular.toJson(f)));
            return {
                data: g,
                callbackId: e
            }
        }
        var sname = "JSESSIONID",
            isMobile = function() {
                var a = navigator.userAgent,
                    b = /iPhone/i,
                    c = /iPod/i,
                    d = /iPad/i,
                    e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
                    f = /Android/i,
                    g = /IEMobile/i,
                    h = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
                    i = /BlackBerry/i,
                    j = /BB10/i,
                    k = /Opera Mini/i,
                    l = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
                    m = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
                    n = function(a, b) {
                        return a.test(b)
                    };
                return n(b, a) || n(c, a) || n(d, a) || n(e, a) || n(f, a) || n(g, a) || n(h, a) || n(i, a) || n(j, a) || n(k, a) || n(l, a) || n(m, a)
            },
            isCordova = function() {
                return window.cordova ? !0 : !1
            },
            isBackground = function() {
                return isCordova() && cordova.plugins.backgroundMode.isActive()
            },
            isLogin = function() {
                return "string" == typeof localStorageService.get(sname)
            },
            getUser = function() {
                return localStorageService.get("u")
            },
            getToken = function() {
                var a = localStorageService.get(sname);
                return a || (a = ""), a
            },
            setToken = function(a) {
                "string" != typeof a && (a = "");
                var b = a.indexOf("|");
                return -1 !== b && (a = a.substring(0, b)), localStorageService.set(sname, a)
            },
            logout = function(a) {
                localStorageService.remove(sname), rest("Ping").then(function() {
                    $location.path(a || isMobile() ? "/login" : "/")
                })
            };
        $window.pending = 0;
        var currentCallbackId = 0,
            callbacks = {},
            lastConnection = (new Date).getTime(),
            keepAlive = 6e4,
            connectionValid = !1,
            retryCount = 0,
            ws = new ReconnectingWebSocket("wss://www.lessbase.com/ws_botvs");
        ws.timeoutInterval = 1e4;
        var tips = function(a) {
            isCordova() ? window.plugins.toast.showShortBottom(a) : console.log(a)
        };
        $timeout(ping, keepAlive), ws.onopen = function() {
            retryCount++, connectionValid = !1;
            var a = !1;
            for (var b in callbacks) callbacks[b].pending && (callbacks[b].pending = !1, ws.send(callbacks[b].data), a = !0);
            a || rest("Ping").then(function() {})
        }, ws.onmessage = function(message) {
            if (lastConnection = (new Date).getTime(), "P" != message.data) {
                connectionValid = !0;
                var data = encrypt.RSADecrypt(angular.fromJson(message.data));
                if (callbacks.hasOwnProperty(data.callbackId)) {
                    var task = callbacks[data.callbackId],
                        defer = task.cb;
                    if (delete callbacks[data.callbackId], $window.pending--, "Ping" != task.method && "undefined" != typeof data.error && data.error) {
                        if ("Need Login" === data.error) {
                            if (!isLogin() || dialog.confirm("<font color=red>系统检测到会话发生改变, 为保证安全, 请重新登录 !")) return void $rootScope.$apply(logout(!0))
                        } else "Need Update" === data.error && (data.error = "当前版本过旧, 必须重新下载升级才能正常使用 !");
                        $rootScope.$apply(defer.reject("REST: " + data.error))
                    } else data.token !== getToken() && setToken(data.token), $rootScope.$apply(1 === data.result.length ? defer.resolve(data.result[0].result) : defer.resolve(data.result))
                } else if ("-1" == data.callbackId) {
                    var k = "@" + getUser(),
                        js = localStorage.getItem(k),
                        messages = [];
                    if (js && (messages = angular.fromJson(js)), messages.unshift(data.result), messages.length > 100 && messages.pop(), isCordova()) {
                        var item = data.result;
                        try {
                            var obj = util.getStrStyle(item.msg),
                                notify = {
                                    text: obj.str
                                };
                            cordova.plugins.notification.local.schedule(notify), "undefined" != typeof item.exec && eval(item.exec), window.plugins.NativeAudio.play("beep"), navigator.notification.vibrate(1e3)
                        } catch (e) {
                            console.log("Error: " + e)
                        }
                        rest("DeleteMessage", item.id).then(function() {
                            tips("接收信息完成")
                        })
                    }
                    localStorage.setItem(k, angular.toJson(messages)), $rootScope.$broadcast("push", k)
                }
            }
        }, ws.onclose = function() {
            for (var a in callbacks) callbacks[a].pending || ($rootScope.$apply(callbacks[a].cb.reject("网络连接失败")), delete callbacks[a], $window.pending--)
        };
        var rest = function(a, b) {
            var c = $q.defer(),
                d = makePayload(a, b),
                e = {
                    method: a,
                    cb: c,
                    date: new Date,
                    pending: !1
                };
            return 1 != ws.readyState ? (e.pending = !0, e.data = d.data) : ws.send(d.data), $window.pending++, callbacks[d.callbackId] = e, c.promise
        };
        return {
            isLogin: isLogin,
            isBackground: isBackground,
            getUser: getUser,
            rememberUser: function(a) {
                localStorageService.set("u", a)
            },
            rest: rest,
            logout: logout,
            isMobile: isMobile,
            isCordova: isCordova
        }
    }]), angular.module("botvsApp").factory("encrypt", function() {
        return {
            encryptPassword: function(a) {
                return CryptoJS.MD5(a + "/botvs").toString()
            },
            encryptByKey: function(a, b) {
                for (var c = 0; 5 > c; c++) b = CryptoJS.MD5(b).toString();
                return b = CryptoJS.enc.Utf8.parse(b), CryptoJS.AES.encrypt(a, b, {
                    iv: b
                }).toString()
            },
            decryptByKey: function(a, b) {
                for (var c = 0; 5 > c; c++) b = CryptoJS.MD5(b).toString();
                return b = CryptoJS.enc.Utf8.parse(b), CryptoJS.AES.decrypt(a, b, {
                    iv: b
                }).toString(CryptoJS.enc.Utf8)
            },
            RSADecrypt: function(a) {
                var b = new JSEncrypt;
                b.setPrivateKey("-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQC7xClQhuy2Vmbpm51KHkMBlUOPKDb0ZxdOUkfb/Cmcvet3gWej\nVqu1UQqR4MRar7siJBUpaXXRFhOvh+C0TRuHWAt1e/b6FOUaO5c2BN7nuvE98tUp\njCVFQPaxEyUeUJ9E4nAMLBOxNYKsj79r4WTX7kXgizcMeBsFRAlj4GmNawIDAQAB\nAoGAR4C67vSCniknBZ0B9+CwSaEK2jBJRSchA+1negl72zmjup2n1tbBismyybyb\naaF0FNtCx8NmX1oV4wlOc7rNWUULWuusZhCtSdsQB0Rk8HqWJrdBePXhr/Yft1sE\nwPIIdRT0bz4h5X/orH/xS9aSzSjzZ849k60+2tCM+eCRBPkCQQDhus7jI9VVZ3Cu\nb0W314LYJ2wov3vTdILtadj3H4dWwtb1nVB2ZREfulG2PY8jYvu0+SvUgSQV1A9j\nnRT1r5pVAkEA1PIV/qOM/uPFjRh8voRvoWjxdfhW6upeHHMNMgs7WMAYuyu/PiX8\nrs3rq8VB2md0ZgRkW+VPJZPHggjOA4fIvwJAKS8BEhX2lTdjKqAokyshtzgyFpkh\nCWpnfNNj/2pkMeMofvVtubwkzKocwGgo1mb3z4PqiEHriIQBLsZ5DX41ZQJBANRj\nA+bujtEmskFw+/I1OvWdKr+DyoUQ7n6njbCtHSr+pWwBTQQadTSP849l9bF039Zk\naQhy5IbRJvqd94Pz6RcCQHlbQ7W+5e3oYfJ3g7v71HlZHX65wf0r3moffzbGEfNr\nQfwLBX7lVIzr64pr+32unXvMn1DuV2jQJAF1r+spCOs=\n-----END RSA PRIVATE KEY-----");
                var c = b.decrypt(a.salt);
                return angular.fromJson(this.decryptByKey(a.data, c))
            },
            RSAEncrypt: function(a) {
                var b = new JSEncrypt;
                b.setPublicKey("-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNH4NFsaf8Vx7Acu8mIcTrT8xg\nQbf1eL++f9bAlLOtvdD1yYYLc3GwoRsjFO/wVRYjPx8qjvoP9A5aYw+05N7h9iwh\neYTfQHJhFK4EZtv/9z/SuksMat4/JiVwRH6A4d5fBnsARrZyAqGZk4Gsa5XW97C2\nZ57f5KMOZmoIKFPTAwIDAQAB\n-----END PUBLIC KEY-----");
                for (var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], d = "", e = 0; 30 > e; e++) {
                    var f = Math.ceil(35 * Math.random());
                    d += c[f]
                }
                return {
                    salt: b.encrypt(d),
                    data: this.encryptByKey(a, d)
                }
            }
        }
    }), angular.module("botvsApp").controller("ModalInputCtl", ["$scope", "$timeout", "$location", "$modalInstance", function(a, b, c, d) {
        a.inputTxt = "", a.cfg = d.cfg, "undefined" != typeof a.cfg.defaultvalue && (a.inputTxt = a.cfg.defaultvalue), a.error = "", a.isBusy = !1, a.submit = function() {
            var c = document.getElementById("inputBox");
            0 !== c.value.length && (a.isBusy = !0, a.cfg.onConfirm(c.value, function(e, f, g) {
                e ? d.close(c.value) : (a.error = "undefined" == typeof f ? "你输入的" + a.cfg.inputname + "不正确, 请3秒后重新输入!" : f, b(function() {
                    a.error = "", a.isBusy = !1
                }, "undefined" != typeof g ? g : 3e3))
            }))
        }, a.cancel = function() {
            d.dismiss("cancel")
        }, a.jump = function(a) {
            d.dismiss("cancel"), c.path(a)
        }
    }]).factory("dialog", ["$modal", "$timeout", "$compile", "$rootScope", function(a, b, c, d) {
        return {
            prompt: function(b) {
                var c = a.open({
                    templateUrl: "views/dialog-prompt.html",
                    controller: "ModalInputCtl"
                });
                c.cfg = b, "function" == typeof b.onExit && c.result.then(b.onExit, function() {})
            },
            alert: function(b) {
                a.open({
                    templateUrl: "views/dialog-alert.html",
                    controller: ["$scope", "$modalInstance", function(a, c) {
                        a.title = "消息", a.msg = b, a.cancel = function() {
                            c.dismiss("cancel")
                        }, a.ok = function() {
                            c.close()
                        }
                    }]
                })
            },
            confirm: function(b) {
                var c = a.open({
                    templateUrl: "views/dialog-confirm.html",
                    controller: ["$scope", "$modalInstance", function(a, c) {
                        a.title = "确认提示", a.msg = b, a.cancel = function() {
                            c.dismiss("cancel")
                        }, a.confirm = function() {
                            c.close()
                        }
                    }]
                });
                return c.result
            },
            error: function(a) {
                return this.notify({
                    message: a,
                    classes: "alert-danger"
                })
            },
            notify: function(a) {
                "object" != typeof a && (a = {
                    message: a
                });
                var e = 10,
                    f = 15,
                    g = 7e3,
                    h = "center",
                    i = document.body,
                    j = [];
                a.position = a.position ? a.position : h, a.container = a.container ? a.container : i, a.classes = a.classes ? a.classes : "alert-success";
                var k = a.scope ? a.scope.$new() : d.$new();
                k.$message = a.message, k.$classes = a.classes;
                var l = '<div class="cg-notify-message" ng-class="$classes">\n\n    <div>\n        {{$message}}\n    </div>\n\n    <div class="cg-notify-message-template">\n        \n    </div>\n\n    <button type="button" class="cg-notify-close" ng-click="$close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="cg-notify-sr-only">Close</span>\n    </button>\n\n</div>',
                    m = c(l)(k);
                m.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function(a) {
                    ("opacity" === a.propertyName || a.originalEvent && "opacity" === a.originalEvent.propertyName) && (m.remove(), j.splice(j.indexOf(m), 1), n())
                }), angular.element(a.container).append(m), j.push(m), "center" === a.position && b(function() {
                    m.css("margin-left", "-" + m[0].offsetWidth / 2 + "px")
                }), k.$close = function() {
                    m.css("opacity", 0).attr("data-closing", "true"), n()
                };
                var n = function() {
                    for (var a = 0, b = e, c = j.length - 1; c >= 0; c--) {
                        var d = 10,
                            g = j[c],
                            h = g[0].offsetHeight,
                            i = b + h + d;
                        g.attr("data-closing") ? i += 20 : b += h + f, g.css("top", i + "px").css("margin-top", "-" + (h + d) + "px").css("visibility", "visible"), a++
                    }
                };
                b(function() {
                    n()
                }), g > 0 && b(function() {
                    m.css("opacity", 0).attr("data-closing", "true"), n()
                }, g)
            }
        }
    }]), angular.module("botvsApp").factory("util", function() {
        var a = [{
                id: 0,
                name: "数字型(number)",
                inputType: "number"
            }, {
                id: 1,
                name: "布尔型(true/false)",
                inputType: "checkbox"
            }, {
                id: 2,
                name: "字符串(string)",
                inputType: "text"
            }, {
                id: 3,
                name: "下拉框(selected)",
                inputType: "selected"
            }, {
                id: 4,
                name: "按钮(button)",
                inputType: "button"
            }],
            b = "$$$__list__$$$",
            c = "$$$__cmd__$$$";
        return {
            cmdMagic: c,
            listMagic: b,
            scriptArgsSelectList: a,
            kticks: [{
                name: "1分钟",
                id: 0
            }, {
                name: "5分钟",
                id: 2
            }, {
                name: "15分钟",
                id: 3
            }, {
                name: "30分钟",
                id: 4
            }, {
                name: "1小时",
                id: 5
            }, {
                name: "1天",
                id: 10
            }],
            getStrStyle: function(a) {
                var b = {};
                if ("" !== a) {
                    a = a.toString().replace(/^\s+|\s+$/g, "");
                    var c = a.match(/#[0-9A-Za-z]{6,12}$/gi);
                    if (c) {
                        var d = c[0];
                        b.color = d.slice(0, 7), d.length > 7 && (b["background-color"] = "#" + d.slice(7)), a = a.slice(0, a.length - d.length).replace(/(^\s*)|(\s*$)/g, "")
                    }
                }
                return {
                    style: b,
                    str: a
                }
            },
            argsToList: function(d, e) {
                var f = [];
                if (-1 !== d.indexOf("]")) {
                    var g = angular.fromJson(d),
                        h = [];
                    "string" == typeof e && -1 !== e.indexOf("]") && (h = angular.fromJson(e));
                    for (var i = 0; i < g.length; i++)
                        if (0 !== g[i][0].indexOf(c)) {
                            var j = null;
                            3 === g[i].length ? (j = [g[i][0], g[i][1], "", "", g[i][2]], j.value = g[i][2]) : (j = [g[i][0], g[i][1], g[i][2], "", g[i][3]], j.value = g[i][3]);
                            var k = j[0].split("@")[0],
                                l = j[0].match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)@([a-zA-Z_$][0-9a-zA-Z_$]*)([=!><]=|>|<)([0-9]*)$/),
                                m = j[0].match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)@([!]*[a-zA-Z_$][0-9a-zA-Z_$]*)$/);
                            j.condition = l ? l.slice(2, 5) : m ? [m[2].replace(/!/g, ""), "!" === m[2][0] ? "!=" : "==", "1"] : [];
                            var n = 2;
                            j.indexValue = 0, "number" == typeof j.value ? n = 0 : "boolean" == typeof j.value ? n = 1 : 0 === j.value.indexOf(b) && (n = 3, j.value = j.value.substring(b.length), j[4] = j.value);
                            for (var o = 0; o < h.length; o++) h[o][0] === k && (3 === n ? j.indexValue = h[o][1] : j.value = h[o][1]);
                            j[3] = a[n], f.push(j)
                        }
                }
                return f
            },
            parseArgs: function(d, e, f) {
                if (-1 === d.indexOf("]")) return [];
                for (var g = angular.fromJson(d), h = 0; h < g.length; h++) {
                    var i = null;
                    3 === g[h].length ? (i = [g[h][0], g[h][1], "", "", g[h][2]], i.value = g[h][2]) : (i = [g[h][0], g[h][1], g[h][2], "", g[h][3]], i.value = g[h][3]);
                    var j = i[0].match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)@([a-zA-Z_$][0-9a-zA-Z_$]*)([=!><]=|>|<)([0-9]*)$/),
                        k = i[0].match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)@([!]*[a-zA-Z_$][0-9a-zA-Z_$]*)$/);
                    i.condition = j ? j.slice(2, 5) : k ? [k[2].replace(/!/g, ""), "!" === k[2][0] ? "!=" : "==", "1"] : [], i.indexValue = 0;
                    var l = 2;
                    "number" == typeof i.value ? l = 0 : "boolean" == typeof i.value ? l = 1 : 0 === i.value.indexOf(b) ? (l = 3, i.value = i.value.substring(b.length), i[4] = i.value) : "__button__" === i.value && (l = 4), i[3] = a[l], 0 === g[h][0].indexOf(c) ? (i[0] = i[0].split(c)[1], "undefined" != typeof f && f.push(i)) : e && e.push(i)
                }
            },
            newProfitChart: function(a, b, c) {
                var d = [{
                        type: "hour",
                        count: 1,
                        text: "1h"
                    }, {
                        type: "hour",
                        count: 3,
                        text: "3h"
                    }, {
                        type: "hour",
                        count: 8,
                        text: "8h"
                    }, {
                        type: "all",
                        text: "All"
                    }],
                    e = null;
                try {
                    e = new Highcharts.StockChart({
                        chart: {
                            renderTo: a
                        },
                        plotOptions: {
                            series: {
                                turboThreshold: 0
                            }
                        },
                        rangeSelector: {
                            buttons: d,
                            selected: 3,
                            inputEnabled: !1
                        },
                        tooltip: {
                            xDateFormat: "%Y-%m-%d %H:%M:%S"
                        },
                        xAxis: {
                            type: "datetime"
                        },
                        title: {
                            text: b
                        },
                        series: [{
                            name: "收益",
                            data: c,
                            tooltip: {
                                valueDecimals: 4
                            },
                            yAxis: 0
                        }]
                    })
                } catch (f) {}
                return e
            }
        }
    }), angular.module("botvsApp").service("qupload", ["$http", "$q", "localStorageService", function(a, b, c) {
        function d(a) {
            var b, c, d, e;
            for (b = "", d = a.length, c = 0; d > c; c++) e = a.charCodeAt(c), e >= 1 && 127 >= e ? b += a.charAt(c) : e > 2047 ? (b += String.fromCharCode(224 | e >> 12 & 15), b += String.fromCharCode(128 | e >> 6 & 63), b += String.fromCharCode(128 | e >> 0 & 63)) : (b += String.fromCharCode(192 | e >> 6 & 31), b += String.fromCharCode(128 | e >> 0 & 63));
            return b
        }

        function e(a) {
            var b, c, d, e, g, h;
            for (d = a.length, c = 0, b = ""; d > c;) {
                if (e = 255 & a.charCodeAt(c++), c == d) {
                    b += f.charAt(e >> 2), b += f.charAt((3 & e) << 4), b += "==";
                    break
                }
                if (g = a.charCodeAt(c++), c == d) {
                    b += f.charAt(e >> 2), b += f.charAt((3 & e) << 4 | (240 & g) >> 4), b += f.charAt((15 & g) << 2), b += "=";
                    break
                }
                h = a.charCodeAt(c++), b += f.charAt(e >> 2), b += f.charAt((3 & e) << 4 | (240 & g) >> 4), b += f.charAt((15 & g) << 2 | (192 & h) >> 6), b += f.charAt(63 & h)
            }
            return b
        }
        var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
            g = "https:" == location.protocol ? "https://up.qbox.me" : "http://up.qiniu.com",
            h = {
                chunkSize: 4194304,
                mkblkEndPoint: g + "/mkblk/",
                mkfileEndPoint: g + "/mkfile/",
                maxRetryTimes: 3
            };
        if (this.support = !("undefined" == typeof File || "undefined" == typeof Blob || "undefined" == typeof FileList || !Blob.prototype.slice && !Blob.prototype.webkitSlice && !Blob.prototype.mozSlice), !this.support) return null;
        var i = function(a) {
            return a.name + a.lastModified + a.size + a.type
        };
        this.upload = function(f) {
            var g = b.defer(),
                j = g.promise,
                k = f.file;
            if (k) {
                var l = i(k),
                    m = c.get(l);
                m || (m = []);
                var n, o = k.size + 4194303 >> 22,
                    p = function(a, b, c) {
                        return a[a.slice ? "slice" : a.mozSlice ? "mozSlice" : a.webkitSlice ? "webkitSlice" : "slice"](b, c)
                    },
                    q = function(a, b, c) {
                        return c === b - 1 ? a.size - 4194304 * c : 4194304
                    },
                    r = function(b, i) {
                        if (0 !== i.length) {
                            for (var j, k = "", m = 0; m < i.length - 1; m++) j = angular.fromJson(i[m]), k += j.ctx + ",";
                            j = angular.fromJson(i[i.length - 1]), k += j.ctx;
                            var n = h.mkfileEndPoint + b.size;
                            f && f.key && (n += "/key/" + e(d(f.key))), a({
                                url: n,
                                method: "POST",
                                data: k,
                                headers: {
                                    Authorization: "UpToken " + f.token,
                                    "Content-Type": "text/plain"
                                }
                            }).success(function(a) {
                                g.resolve(a), c.remove(l)
                            }).error(function(a) {
                                g.reject(a)
                            })
                        }
                    },
                    s = function(a, b, d) {
                        if (b === o) return void r(a, m);
                        if (!d) return void g.reject("max retried,still failure");
                        var e = q(a, o, b),
                            i = 4194304 * b,
                            j = p(a, i, i + e);
                        n = new XMLHttpRequest, n.open("POST", h.mkblkEndPoint + e, !0), n.setRequestHeader("Authorization", "UpToken " + f.token), n.upload.addEventListener("progress", function(b) {
                            if (b.lengthComputable) {
                                var c = {
                                    totalSize: a.size,
                                    loaded: b.loaded + i
                                };
                                g.notify(c)
                            }
                        }), n.upload.onerror = function() {
                            s(f.file, b, --d)
                        }, n.onreadystatechange = function(a) {
                            a && 4 === n.readyState && 200 === n.status && (200 === n.status ? (m[b] = n.responseText, c.set(l, m), s(f.file, ++b, h.maxRetryTimes)) : s(f.file, b, --d))
                        }, n.send(j)
                    };
                return s(f.file, m.length, h.maxRetryTimes), j.abort = function() {
                    n.abort(), c.remove(l)
                }, j.pause = function() {
                    n.abort()
                }, j
            }
        }
    }]).directive("ngFileSelect", ["$parse", "$timeout", function(a, b) {
        return function(c, d, e) {
            var f = a(e.ngFileSelect);
            if ("input" !== d[0].tagName.toLowerCase() || "file" !== (d.attr("type") && d.attr("type").toLowerCase())) {
                for (var g = angular.element('<input type="file" accept="image/gif,image/png,image/jpeg,video/mp4,audio/mpeg,application/ogg,audio/ogg">'), h = 0; h < d[0].attributes.length; h++) g.attr(d[0].attributes[h].name, d[0].attributes[h].value);
                d.attr("data-multiple") && g.attr("multiple", "true"), g.css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("width", "100%").css("opacity", 0).css("position", "absolute").css("filter", "alpha(opacity=0)"), d.append(g), ("" === d.css("position") || "static" === d.css("position")) && d.css("position", "relative"), d = g
            }
            d.bind("change", function(a) {
                var d, e, g = [];
                if (d = a.__files_ || a.target.files, null !== d)
                    for (e = 0; e < d.length; e++) g.push(d.item(e));
                b(function() {
                    f(c, {
                        $files: g,
                        $event: a
                    })
                })
            })
        }
    }]), angular.module("botvsApp").directive("compile", ["$compile", function(a) {
        return function(b, c, d) {
            b.$watch(function(a) {
                return a.$eval(d.compile)
            }, function(d) {
                c.html(d), a(c.contents())(b)
            })
        }
    }]), angular.module("botvsApp").directive("equals", function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, c, d) {
                if (d) {
                    a.$watch(c.ngModel, function() {
                        e()
                    }), c.$observe("equals", function() {
                        e()
                    });
                    var e = function() {
                        var a = d.$viewValue,
                            b = c.equals;
                        d.$setValidity("equals", a === b)
                    }
                }
            }
        }
    }), angular.module("botvsApp").directive("ngFocus", ["$timeout", function(a) {
        return {
            link: function(b, c, d) {
                b.$watch(d.ngFocus, function(b) {
                    angular.isDefined(b) && b && a(function() {
                        c[0].focus()
                    })
                }, !0), c.bind("blur", function() {
                    angular.isDefined(d.ngFocusLost) && b.$apply(d.ngFocusLost)
                })
            }
        }
    }]), angular.module("botvsApp").directive("formAutofillFix", function() {
        return function(a, b, c) {
            b.prop("method", "POST"), c.ngSubmit && setTimeout(function() {
                b.unbind("submit").submit(function(d) {
                    d.preventDefault(), b.find("input, textarea, select").trigger("input").trigger("change").trigger("keydown"), a.$apply(c.ngSubmit)
                })
            }, 0)
        }
    }), angular.module("botvsApp").directive("comment", ["$location", "$window", "$log", "dialog", "session", "qupload", function(a, b, c, d, e, f) {
        return {
            template: '<div class="panel panel-default">    <div class="panel-heading">        {{ username ? "以 " + username + " 的身份发表评论": "请登陆后发表评论" }}<span class="pull-right badge" ng-show="comments_count>0">{{ comments_count }}</span>    </div>    <div class="panel-body">        <div>            <div style="margin-bottom:5px"><textarea ng-model="content" class="form-control" rows=2 placeholder="说点什么吧..."></textarea></div>            <div>                <div ng-file-select="onFileSelect($files)" data-multiple="true" title="select file" onclick="this.value = null" class="btn btn-upload"><span class="glyphicon glyphicon-picture"></span></div>                <span ng-repeat="(k,v) in selectFiles">{{v.file.name}} - {{v.progress.p}}% <button ng-click="abort(k)">x</button></span>                <button class="btn btn-success pull-right" ng-disabled="pending || content.length==0" ng-click="reply()">发表评论</button>            </div>        </div>        <div ng-repeat="comment in comments" style="margin-left:{{comment.ident*50}}px">            <blockquote ng-mouseover="comment.mouseMode=true" ng-mouseleave="comment.mouseMode=false">                <p style="font-size:13px" ng-bind-html="comment.content | media"></p>                <footer style="font-size:13px;line-height:1">                    <font color="#337ab7"><b>{{comment.username }}</b></font><font color="#cccccc">&nbsp;•&nbsp;{{comment.timeAgo}}</font><span ng-show="comment.mouseMode || comment.is_edit_mode || comment.is_reply_mode">&nbsp;•&nbsp;<a href="" style="text-decoration:none" ng-click="comment.is_owner ? comment.is_edit_mode=!comment.is_edit_mode : comment.is_reply_mode=!comment.is_reply_mode"><font color="{{ (comment.is_edit_mode || comment.is_reply_mode) ? \'#337ab7\' : \'#cccccc\'}}">{{ comment.is_owner ? "编辑" : "回复" }}</font></a></span><a href="" style="margin-left:10px;text-decoration:none" ng-if="comment.is_owner && (comment.mouseMode || comment.is_edit_mode || comment.is_reply_mode)" ng-click="remove(comment)"><font color="#cccccc">删除</font></a>                </footer>            </blockquote>            <div ng-show="comment.is_reply_mode">                <div style="margin-bottom:5px"><textarea ng-model="comment.reply_content" class="form-control" rows=2 placeholder="@ {{comment.username}}"></textarea></div>                <div>                    <span ng-file-select="onFileSelect($files, comment)" data-multiple="true" title="select file" onclick="this.value = null" class="btn btn-upload">                        <span class="glyphicon glyphicon-picture"></span>                    </span>                    <span ng-repeat="(k,v) in comment.selectFiles">{{v.file.name}} - {{v.progress.p}}% <button ng-click="abort(k, comment)">x</button></span>                    <button class="btn btn-success pull-right" ng-disabled="pending || comment.reply_content.length==0" ng-click="reply(comment)">回复评论</button>                </div>            </div>            <div ng-show="comment.is_edit_mode" style="margin-bottom:10px">                <div style="margin-bottom:5px"><textarea ng-model="comment.content" class="form-control" rows=2></textarea></div>                <div>                    <span ng-file-select="onFileSelect($files, comment)" data-multiple="true" title="select file" onclick="this.value = null" class="btn btn-upload">                        <span class="glyphicon glyphicon-picture"></span>                    </span>                    <span ng-repeat="(k,v) in comment.selectFiles">{{v.file.name}} - {{v.progress.p}}% <button ng-click="abort(k, comment)">x</button></span>                    <button class="btn btn-success pull-right" ng-disabled="pending || comment.content.length==0" ng-click="reply(comment)">编辑评论</button>                </div>            </div>        </div>    </div></div>',
            restrict: "A",
            scope: {
                topic: "=comment"
            },
            link: function(a) {
                a.pending = !1, a.content = "", a.comments_count = 0, a.comments = [], a.username = e.isLogin() ? e.getUser() : "", a.selectFiles = [];
                var b = function(b, g) {
                    var h = "undefined" == typeof g ? a.selectFiles : g.selectFiles;
                    e.rest("GetQiniuToken", h[b].file.name).then(function(e) {
                        return -1 == e ? (h.splice(b, 1), void d.alert("禁止的类型, 请上传图片类型 !")) : (h[b].progress = {
                            p: 0
                        }, h[b].upload = f.upload({
                            file: h[b].file,
                            token: e
                        }), void h[b].upload.then(function(b) {
                            var c = " " + ("https:" == location.protocol ? "https://dn-filebox.qbox.me/" : "http://7xi2n7.com1.z0.glb.clouddn.com/") + b.key + " ";
                            "undefined" != typeof g ? g.is_reply_mode ? g.reply_content += c : g.content += c : a.content += c
                        }, function(a) {
                            c.info("error", a)
                        }, function(a) {
                            h[b].progress.p = Math.floor(100 * a.loaded / a.totalSize)
                        }))
                    }, function(a) {
                        d.alert(a)
                    })
                };
                a.abort = function(b, c) {
                    var d = "undefined" == typeof c ? a.selectFiles : c.selectFiles;
                    d[b].upload.abort(), d.splice(b, 1)
                }, a.onFileSelect = function(c, d) {
                    for (var e = "undefined" == typeof d ? a.selectFiles : d.selectFiles, f = e.length, g = 0; g < c.length; g++) e[g + f] = {
                        file: c[g]
                    }, b(g + f, d)
                }, a.reply = function(b) {
                    if (!e.isLogin()) return void e.logout(!0);
                    var c = -1,
                        f = -1,
                        g = -1,
                        h = "";
                    "undefined" != typeof b ? (c = "undefined" != typeof b.reply_id ? b.reply_id : b.id, f = "undefined" != typeof b.reply_id ? b.id : -1, h = b.is_edit_mode ? b.content : b.reply_content, g = b.is_edit_mode ? b.id : -1) : h = a.content, 0 != h.length && (a.pending = !0, e.rest("SubmitComment", [a.topic, h, c, f, g]).then(function(d) {
                        if (a.pending = !1, "undefined" != typeof b) {
                            if (b.is_edit_mode) return void(b.is_edit_mode = !1);
                            b.is_reply_mode = !1
                        }
                        var g = moment().format("YYYY-MM-DD HH:mm:ss"),
                            i = {
                                id: d,
                                ident: 0,
                                is_owner: !0,
                                selectFiles: [],
                                is_edit_mode: !1,
                                is_reply_mode: !1,
                                reply_content: "",
                                content: h,
                                created: g,
                                timeAgo: moment(g).fromNow(),
                                username: e.getUser()
                            }; - 1 != c && (i.reply_id = c), -1 != f && (i.sub_reply_id = f);
                        var j = 0;
                        if (-1 != c)
                            for (var k = 0; k < a.comments.length; k++)
                                if (-1 == f) {
                                    if (c == a.comments[k].id) {
                                        i.ident = a.comments[k].ident + 1, j = k + 1;
                                        break
                                    }
                                } else if (f == a.comments[k].id) {
                            j = k + 1, i.ident = a.comments[k].ident + 1;
                            break
                        }
                        a.comments.splice(j, 0, i), a.comments_count++
                    }, function(b) {
                        a.pending = !1, d.alert(b)
                    }))
                }, a.remove = function(b) {
                    d.confirm("确定要删除这条评论吗? ").then(function() {
                        a.pending = !0, e.rest("SubmitComment", [a.topic, "", -1, -1, b.id]).then(function(c) {
                            if (a.pending = !1, c) {
                                for (var d = (moment().format("YYYY-MM-DD HH:mm:ss"), 0); d < a.comments.length; d++)
                                    if (b.id == a.comments[d].id) {
                                        a.comments.splice(d, c);
                                        break
                                    }
                                a.comments_count -= c
                            }
                        }, function(b) {
                            a.pending = !1, d.alert(b)
                        })
                    })
                };
                var g = function(b) {
                        a.pending = !0, e.rest("GetCommentList", [b, -1, -1]).then(function(b) {
                            a.pending = !1;
                            for (var c = b.reply.length - 1; c >= 0; c--)
                                for (var d = 0; d < b.comments.length; d++) {
                                    var e = "undefined" != typeof b.reply[c].sub_reply_id;
                                    if (!e && b.reply[c].reply_id == b.comments[d].id || e && b.reply[c].sub_reply_id == b.comments[d].id) {
                                        b.comments.splice(d + 1, 0, b.reply[c]);
                                        break
                                    }
                                }
                            for (var c = 0; c < b.comments.length && (b.comments[c].timeAgo = moment(b.comments[c].created).fromNow(), b.comments[c].reply_content = "", b.comments[c].is_edit_mode = !1, b.comments[c].is_reply_mode = !1, b.comments[c].selectFiles = [], "undefined" == typeof b.comments[c].ident && (b.comments[c].ident = 0), c != b.comments.length - 1); c++)(b.comments[c + 1].reply_id == b.comments[c].id || b.comments[c + 1].sub_reply_id == b.comments[c].id) && (b.comments[c + 1].ident = b.comments[c].ident + 1), b.comments[c + 1].reply_id == b.comments[c].reply_id && b.comments[c + 1].sub_reply_id == b.comments[c].sub_reply_id && (b.comments[c + 1].ident = b.comments[c].ident);
                            a.comments = b.comments, a.comments_count = b.all
                        }, function(b) {
                            a.pending = !1, d.alert(b)
                        })
                    },
                    h = !0;
                a.$watch("topic", function(b) {
                    b && (h = !1, a.topic = b, g(b))
                }, !0)
            }
        }
    }]).filter("media", ["$sanitize", "$sce", function(a, b) {
        var c = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,
            d = /^mailto:/;
        return function(a) {
            function e(a) {
                return a.replace(/&/g, "&amp;").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(a) {
                    var b = a.charCodeAt(0),
                        c = a.charCodeAt(1);
                    return "&#" + (1024 * (b - 55296) + (c - 56320) + 65536) + ";"
                }).replace(/([^\#-~| |!])/g, function(a) {
                    return "&#" + a.charCodeAt(0) + ";"
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
            }

            function f(a) {
                for (var b = {
                        strictMode: !1,
                        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                        q: {
                            name: "queryKey",
                            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                        },
                        parser: {
                            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                        }
                    }, c = b.parser[b.strictMode ? "strict" : "loose"].exec(a), d = {}, e = 14; e--;) d[b.key[e]] = c[e] || "";
                return d[b.q.name] = {}, d[b.key[12]].replace(b.q.parser, function(a, c, e) {
                    c && (d[b.q.name][c] = e)
                }), d
            }

            function g(a) {
                a && m.push(e(a).replace(/&#10;/g, "<br>"))
            }

            function h(a, b) {
                a = a.replace(/"/g, "&quot;");
                var c = f(a),
                    d = c.file.split(".");
                if ("" != c.file && d.length > 0)
                    for (var e = d[d.length - 1].toLowerCase(), h = [
                            ["jpg", "jpeg", "png", "gif", "bmp"],
                            ["mp3", "ogg", "swf", "mp4", "mpg"]
                        ], i = 0; i < h.length; i++)
                        for (var j = 0; j < h[i].length; j++)
                            if (h[i][j] == e) return void(0 == i ? m.push('<a target="_blank" href="', a, '"><img border=0 src="', a, '"></a>') : 1 == i && ("swf" == e ? m.push('<embed src="', a, '" allowFullScreen="true" quality="high" height="600" width="720" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"><param name="play" value="false"></embed>') : "mp3" == e || "ogg" == e ? m.push('<audio src="', a, '" controls preload="none"></audio>') : m.push('<video src="', a, '" controls preload="none"></video>')));
                m.push('<a target="_blank" href="', a, '">'), g(b), m.push("</a>")
            }
            if (!a) return a;
            for (var i, j, k, l = a, m = []; i = l.match(c);) j = i[0], i[2] || i[4] || (j = (i[3] ? "http://" : "mailto:") + j), k = i.index, g(l.substr(0, k)), h(j, i[0].replace(d, "")), l = l.substring(k + i[0].length);
            return g(l), b.trustAsHtml(m.join(""))
        }
    }]), angular.module("botvsApp").filter("eid2png", function() {
        return function(a) {
            return {
                "-1": "default.png",
                0: "huobi.png",
                1: "okcoin.png",
                2: "btcc.png",
                3: "yunbi.png",
                4: "chbtc.png",
                5: "btctrade.png",
                6: "btc100.png",
                7: "huobi.png",
                8: "796.png",
                9: "tfoll.png",
                10: "bter.png",
                11: "huobi.png",
                12: "okcoin.png",
                14: "bityes.png",
                20: "btc-e.png",
                21: "bitstamp.png",
                22: "bitfinex.png",
                23: "okcoin.png",
                24: "virtex.png",
                25: "korbit.png",
                26: "default.png"
            }[a.toString()]
        }
    }), angular.module("botvsApp").filter("eid2str", function() {
        return function(a) {
            return {
                "-1": "",
                0: "火币",
                1: "OKCoin",
                2: "BTCChina",
                3: "云币网",
                4: "中国比特币",
                5: "比特币交易网",
                6: "BTC100",
                7: "BitVC",
                8: "796期货",
                9: "天富网",
                10: "比特儿",
                11: "BitVC期货",
                12: "OKCoin期货",
                14: "BitYes",
                20: "BTC-E",
                21: "Bitstamp",
                22: "Bitfinex",
                23: "OKCoin国际站",
                24: "Virtex",
                25: "Korbit",
                26: "CoinPlus"
            }[a.toString()]
        }
    }), angular.module("botvsApp").filter("eid2url", function() {
        return function(a) {
            return {
                "-1": "",
                0: "http://www.huobi.com/",
                1: "http://www.okcoin.cn/",
                2: "http://www.btcchina.com/",
                3: "http://yunbi.com/",
                4: "http://www.chbtc.com/",
                5: "http://www.btctrade.com/",
                6: "http://www.btc100.org/",
                7: "http://www.bitvc.com/",
                8: "http://www.796.com/",
                9: "http://www.tfoll.com/",
                10: "http://www.bter.com/",
                11: "http://www.bitvc.com/",
                12: "http://www.okcoin.com/",
                14: "http://www.bityes.com/",
                20: "http://btc-e.com",
                21: "http://www.bitstamp.net/",
                22: "http://www.bitfinex.com/",
                23: "http://www.okcoin.com/",
                24: "http://www.virtex.com/",
                25: "http://www.korbit.co.kr/",
                26: "http://www.coinplus.kr/"
            }[a.toString()]
        }
    }), angular.module("botvsApp").directive("ngLoading", ["$window", function(a) {
        return {
            restrict: "A",
            link: function(b, c) {
                c.hide();
                var d = $('<div align="center" style="padding-top:100px"><div class="spinner"><div class="bubble-1"></div><div class="bubble-2"></div></div></div>').insertBefore(c);
                b.isLoading = function() {
                    return "undefined" != typeof a.pending && a.pending > 0
                };
                var e = b.$watch(b.isLoading, function(a) {
                    a || (d.hide(), c.show(), e())
                })
            }
        }
    }]), angular.module("botvsApp").controller("MPushqueueCtrl", ["$scope", "session", "util", "dialog", function(a, b, c, d) {
        a.messages = [], a.pending = !1, a.remove = function(c) {
            d.confirm(-1 == c ? "清空后消息队列将不再推送, 确定吗?" : "删除后此消息将不推送到移动端, 确定吗?").then(function() {
                a.pending = !0, b.rest("DeleteMessage", c).then(function() {
                    if (a.pending = !1, -1 == c) a.messages = [];
                    else
                        for (var b = 0; b < a.messages.length; b++)
                            if (a.messages[b].id == c) {
                                a.messages.splice(b, 1);
                                break
                            }
                }, function(b) {
                    a.pending = !1, d.alert(b)
                })
            })
        }, a.reload = function() {
            a.pending = !0, b.rest("GetPushQueue", [-1, -1]).then(function(b) {
                a.pending = !1;
                for (var d = 0; d < b.messages.length; d++) b.messages[d].data = c.getStrStyle(b.messages[d].text);
                a.messages = b.messages
            }, function(b) {
                a.pending = !1, d.alert(b)
            })
        }, a.reload()
    }]), angular.module("botvsApp").directive("popoverHtmlUnsafePopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                title: "@",
                content: "@",
                placement: "@",
                animation: "&",
                isOpen: "&"
            },
            template: '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }"><div class="arrow"></div><div class="popover-inner">    <div class="popover-title" ng-bind="title" ng-show="title"></div>    <div class="popover-content" bind-html-unsafe="content"></div></div></div>'
        }
    }).directive("popoverHtmlUnsafe", ["$tooltip", function(a) {
        return a("popoverHtmlUnsafe", "popover", "click")
    }]);