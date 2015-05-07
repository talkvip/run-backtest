function fixedFloat(a, b) {
    "number" != typeof b && (b = 6);
    var c = parseFloat(a.toFixed(Math.max(10, b + 5)));
    if (s = c.toString().split("."), s.length < 2 || s[1].length <= b) return c;
    var d = Math.pow(10, b);
    return Math.floor(c * d) / d
}

function clone(a) {
    var b;
    if (a instanceof Array) {
        b = [];
        for (var c = a.length; c--;) b[c] = clone(a[c]);
        return b
    }
    if (a instanceof Object) {
        b = {};
        for (var d in a) 0 != d.indexOf("__") && (b[d] = clone(a[d]));
        return b
    }
    return a
}
//a: platformType b: coinType c: startTime d: endTime e: period
function fetchRecords(a, b, c, d, e) {
    function f() {
        __count++, recordsMap[g] = [], __count == __pairs.length && __finishCallBack(backtest_do(__startTime, __endTime, __period, __pairs, __script))
    }
    var g = "" + a + b;
    __usedMap[g] = !0;
    var h = a;
    h == PLATFORM_BITVC && (h = PLATFORM_HUOBI);
    var i = "//getticker.sinaapp.com/fetch/" + h + "/" + b.toLowerCase() + "/" + e + "/" + c.replace(/[\-\/\s:]/g, "") + "/" + d.replace(/[\-\/\s:]/g, "") + "/kline.json";
    return "undefined" != typeof recordsCache[i] ? (recordsMap[g] = recordsCache[i], __count++,
        console.log('-----类型'+g+'的recordsMap-----'), 
        console.log(recordsMap[g]), void(__count == __pairs.length && __finishCallBack(backtest_do(__startTime, __endTime, __period, __pairs, __script)))) : void atomic.get(i).success(function(a, b) {
        console.log('-------');
        console.log(a);
        console.log('--------');
        console.log(b);
        if ("string" == typeof a) return void f(a, b);
        for (var c = [], d = 0; d < a.length; d++) {
            var e = a[d],
                h = e[0].toString(),
                j = new Date(h.slice(0, 4) + "/" + h.slice(4, 6) + "/" + h.slice(6, 8) + " " + h.slice(8, 10) + ":" + h.slice(10, 12) + ":" + h.slice(12, 14));
            c.push({
                Time: j.getTime(),
                Open: e[1],
                High: e[2],
                Low: e[3],
                Close: e[4],
                Volume: e[5]
            })
        }
        recordsMap[g] = c, c.length > 0 && (recordsCache[i] = c), __count++, __count == __pairs.length && __finishCallBack(backtest_do(__startTime, __endTime, __period, __pairs, __script))
    }).error(f)
}

function formatDate(a) {
    var b = a.getFullYear(),
        c = a.getMonth() + 1,
        d = a.getDate(),
        e = a.getHours(),
        f = a.getMinutes(),
        g = a.getSeconds();
    return 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), 10 > e && (e = "0" + e), 10 > f && (f = "0" + f), 10 > g && (g = "0" + g), b + "-" + c + "-" + d + " " + e + ":" + f + ":" + g
}

function backtest_do(startTime, endTime, period, pairs, script) {
    function delay(a) {
        if ("undefined" == typeof a && (a = 10), timeOffset += a, timeOffset >= maxOffset) throw "Stop"
    }

    function now() {
        return new Date(timeLine + timeOffset)
    }
    //a: log_type b: platform_id c: order_id d: price e: amount f: extra
    function __log(a, b, c, d, e, f) {
        f.length > 0 && "@" === f[f.length - 1] && (f = f.substring(0, f.length - 1) + " (推送成功) #0000ff"), (isEnableLog || a != LOG_TYPE_BUY && a != LOG_TYPE_SELL && a != LOG_TYPE_CANCEL) && (logs.push({
            id: logsCounter + 1,
            platform_id: b,
            order_id: c,
            log_type: a,
            price: d.toFixed(4),
            amount: e.toFixed(4),
            extra: f,
            __hide: !1,
            date: formatDate(now())
        }), logsCounter++, logs.length > 5001 && logs.shift())
    }

    function valuesToString(a) {
        for (var b = "", c = 0; c < a.length; c++) c > 0 && (b += " "), b += "undefined" == typeof a[c] || null === a[c] ? "null" : "[object Object]" == a[c].toString() ? JSON.stringify(a[c]) : a[c].toString();
        return b
    }

    function Version() {
        return "2.77"
    }

    function IsVirtual() {
        return !0
    }

    function _G(a, b) {
        return "undefined" == typeof a ? 1 : "number" == typeof a ? 1 == a : null == a ? (_globalVal = {}, null) : "undefined" != typeof b ? (null == b ? delete _globalVal[a] : _globalVal[a.toLowerCase()] = b, null) : "undefined" == typeof _globalVal[a.toLowerCase()] ? null : _globalVal[a.toLowerCase()]
    }

    function Mail() {
        return !0
    }

    function HttpQuery(a, b) {
        return delay(), Log("undefined" != typeof b && null !== b ? "POST " + a + " Data: " + b : "GET " + a), "Dummy Data"
    }

    function GetCommand() {
        return null
    }

    function Log() {
        __log(LOG_TYPE_LOG, -1, -1, 0, 0, valuesToString(arguments))
    }

    function EnableLog(a) {
        isEnableLog = a
    }

    function EnableLogLocal(a) {
        return a
    }

    function SetErrorFilter(a) {
        errorFilter.push(a)
    }

    function LogProfit(a) {
        __log(LOG_TYPE_PROFIT, -1, -1, a, 0, valuesToString(Array.prototype.slice.call(arguments).slice(1))), profit_logs.push([now().getTime(), a])
    }

    function LogProfitReset() {
        profit_logs = []
    }

    function Chart(a) {
        return chart_json = JSON.stringify(a), {
            add: function(a) {
                var b = a[0];
                if ("undefined" == typeof chart_logs[b] && (chart_logs[b] = []), 3 == a.length) {
                    var c = a[2];
                    0 > c && (c = chart_logs[b].length + c), c = Math.max(0, c), chart_logs[b][c] = JSON.stringify(a[1])
                } else chart_logs[b].push(JSON.stringify(a[1]))
            },
            reset: function() {
                chart_logs = []
            }
        }
    }

    function LogStatus() {
        _summary = valuesToString(Array.prototype.slice.call(arguments))
    }

    function pollOrders() {
        for (var a = 0; a < exchanges.length; a++) exchanges[a].poll()
    }

    function Sleep(a) {
        for (var b = 0; a > b; b += 1e3) timeOffset += 1e3, pollOrders();
        if ("function" == typeof __progressCallBack && __progressCallBack(timeOffset / maxOffset, _summary), timeOffset >= maxOffset) throw "Stop"
    }

    function GetLastError() {
        return lastErrorMsg
    }

    function setGlobalError(a) {
        try {
            "undefined" == typeof a && (a = "undefined"), __log(LOG_TYPE_ERROR, -1, -1, 0, 0, a.toString()), lastErrorMsg = a.toString(), a.stack && (console.log("\nStacktrace:"), console.log("===================="), console.log(a.stack))
        } catch (b) {}
    }
    //a: platformId b: coinType c: 余额 d: 余币
    function newExchange(a, b, c, d) {
        function e(b) {
            __log(LOG_TYPE_ERROR, a, -1, 0, 0, b), lastErrorMsg = b
        }

        function f() {
            return timeLine + timeOffset
        }
        //返回偏移底标
        function g() {
            for (var a = f(), b = l; b < u.length; b++)
                if (u[b].Time + x > a) return l = b, b;
            throw "Stop"
        }

        function h(a) {
            var b = (Math.max(f(), a.Time) - a.Time) / x,
                c = (a.High + a.Low) / 2,
                d = a.Open,
                e = a.Low,
                g = a.Close;
            return .25 >= b ? (g = fixedFloat(a.Open + (a.High - a.Open) * (b / .25)), e = a.Open, d = g) : .5 >= b ? e = g = fixedFloat(a.High - (a.High - c) * ((b - .25) / .25)) : .75 >= b ? e = g = fixedFloat(c - (c - a.Low) * ((b - .5) / .25)) : .95 >= b && (g = fixedFloat(a.Low + (a.Close - a.Low) * ((b - .75) / .2)), e = Math.min(a.Low, g)), {
                High: d,
                Low: e,
                Close: g
            }
        }

        function i(a) {
            var b = (Math.max(f(), a.Time) - a.Time) / x,//x为选择的时间段 秒数*1000
                c = (a.High + a.Low) / 2;
            return fixedFloat(.25 >= b ? a.Open + (a.High - a.Open) * (b / .25) : .5 >= b ? a.High - (a.High - c) * ((b - .25) / .25) : .75 >= b ? c - (c - a.Low) * ((b - .5) / .25) : .95 >= b ? a.Low + (a.Close - a.Low) * ((b - .75) / .2) : a.Close)
        }
        //得到交易(历史)价格
        function j() {
            return i(u[g()])
        }
        var k = {};
        k[PLATFORM_HUOBI] = {
            name: "Huobi",
            stocks: {
                BTC: {
                    minStock: .001,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_OKCOIN] = {
            name: "OKCoin",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .1,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_BTCCHINA] = {
            name: "BTCChina",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .1,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_YUNBI] = {
            name: "Yunbi",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                PTS: {
                    minStock: .1,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                DOG: {
                    minStock: .1,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_CHBTC] = {
            name: "CHBTC",
            stocks: {
                BTC: {
                    minStock: .001,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_BTCTRADE] = {
            name: "BTCTrade",
            stocks: {
                BTC: {
                    minStock: .001,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_BTC100] = {
            name: "BTC100",
            stocks: {
                BTC: {
                    minStock: .001,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .001,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                DOG: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_BITVC] = {
            name: "BitVC",
            stocks: {
                BTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_FUTURES_796] = {
            name: "Futures_796",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: .03,
                        Sell: .03
                    }
                },
                LTC: {
                    minStock: .01,
                    fee: {
                        Buy: .03,
                        Sell: .03
                    }
                }
            }
        }, k[PLATFORM_FUTURES_OKCOIN] = {
            name: "Futures_OKCoin",
            stocks: {
                BTC: {
                    minStock: 1,
                    fee: {
                        Buy: .03,
                        Sell: .03
                    }
                },
                LTC: {
                    minStock: 1,
                    fee: {
                        Buy: .03,
                        Sell: .03
                    }
                }
            }
        }, k[PLATFORM_FUTURES_BITVC] = {
            name: "Futures_BitVC",
            stocks: {
                BTC: {
                    minStock: 100,
                    fee: {
                        Buy: .03,
                        Sell: .03
                    }
                },
                LTC: {
                    minStock: 100,
                    fee: {
                        Buy: .03,
                        Sell: .03
                    }
                }
            }
        }, k[PLATFORM_TFOLL] = {
            name: "TFoll",
            stocks: {
                BTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                CTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_BTER] = {
            name: "Bter",
            stocks: {
                BTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: 1e-4,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_FUTURES_BITVC] = {
            name: "Futures_BitVC",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_BTCE] = {
            name: "BTCE",
            stocks: {
                BTC_CNH: {
                    minStock: .01,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                },
                LTC_CNH: {
                    minStock: .01,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                },
                BTC_USD: {
                    minStock: .01,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                },
                LTC_USD: {
                    minStock: .1,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                }
            }
        }, k[PLATFORM_BITSTAMP] = {
            name: "Bitstamp",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: .5,
                        Sell: .5
                    }
                }
            }
        }, k[PLATFORM_BITFINEX] = {
            name: "Bitfinex",
            stocks: {
                BTC: {
                    minStock: .001,
                    fee: {
                        Buy: .2,
                        Sell: .1
                    }
                },
                LTC: {
                    minStock: .001,
                    fee: {
                        Buy: .1,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_OKCOINEN] = {
            name: "OKCoin_EN",
            stocks: {
                BTC: {
                    minStock: .01,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                },
                LTC: {
                    minStock: .1,
                    fee: {
                        Buy: 0,
                        Sell: 0
                    }
                }
            }
        }, k[PLATFORM_VIRTEX] = {
            name: "Virtex",
            stocks: {
                BTC_USD: {
                    minStock: .01,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                },
                LTC_USD: {
                    minStock: 1,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                },
                BTC_EUR: {
                    minStock: .01,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                },
                LTC_EUR: {
                    minStock: 1,
                    fee: {
                        Buy: .2,
                        Sell: .2
                    }
                }
            }
        };
        var l = 0,//?
            m = [],//GetPosition
            n = 10,//SetMarginLevel
            o = "",//SetDirection
            p = "A",//SetContractType
            q = 0,
            r = [],
            s = [],//?
            t = "" + a + b,//platformId+coinType
            u = recordsMap[t],//例0BTC中数据 Array
            v = [],//ohlc
            w = [],//volumes
            x = 60 * [1, 3, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 180, 420][period] * 1e3;
        for (var y in u) v.push([u[y].Time, u[y].Open, u[y].High, u[y].Low, u[y].Close]), w.push([u[y].Time, u[y].Volume]);
        series[a + "_" + b] = {
            name: k[a].name,
            eid: a,
            currency: b,
            period: period,
            ohlc: v,
            volumes: w
        };
        var z = 6.1405,//GetUSDCNY
            A = 7.7983,//GetEURCNY
            B = k[a],
            C = {};
        return C.newRate = 0, C.rawRate = 8 == a || a >= 20 ? z : 1, C.Account = {
            Stocks: parseFloat(d),
            FrozenStocks: 0,
            Balance: parseFloat(c),
            FrozenBalance: 0
        }, C.SetDirection = function(a) {
            o = a
        }, C.SetContractType = function(a) {
            if ("week" != a && "weekcny" != a && "this_week" != a) throw "模拟测试只支持周合约";
            p = a
        }, C.SetMarginLevel = function(a) {
            n = a
        }, C.IO = function() {}, C.GetPosition = function() {
            delay(), C.poll();
            var a = clone(m);
            if (0 == a.length) return a;
            for (var b = 0; b < a.length; b++)
                if ("Futures_OKCoin" == B.name ? a[b].Amount = parseInt(a[b].Price * a[b].Amount / C.GetRate() / 100 + .2) : "Futures_BitVC" == B.name ? a[b].Amount = 100 * parseInt(a[b].Price * a[b].Amount / 100 + .2) : "Futures_796" == B.name && "weekcny" == p && (a[b].Amount = parseInt(a[b].Price * a[b].Amount / 100 + .2)), 0 == a[b].Amount) return m[b].Amount = 0, C.poll(), C.GetPosition();
            return a
        }, C.IsFutures = function() {
            return -1 != B.name.indexOf("Futures")
        }, C.GetRate = function() {
            return C.newRate > 0 ? C.newRate : C.rawRate
        }, C.GetUSDCNY = function() {
            return z
        }, C.GetEURCNY = function() {
            return A
        }, C.SetLimit = function() {}, C.SetRate = function(a) {
            var b = C.GetRate();
            return C.newRate = "number" == typeof a && a > 0 ? a : 0, b
        }, C.GetName = function() {
            return B.name
        }, C.GetLabel = function() {
            return B.name
        }, C.GetBaseCurrency = function() {
            for (var a = ["OKCoin_EN", "Futures_796", "Futures_OKCoin", "Bitfinex", "BTCE", "Bitstamp"], b = 0, c = a.length; c > b; b++)
                if (B.name == a[b]) return "weekcny" == p ? "CNY" : "USD";
            return "CNY"
        }, C.GetCurrency = function() {
            return b
        }, C.GetRawJSON = function() {
            return "{}"
        }, C.GetMinStock = function() {
            return "Futures_796" == B.name && "weekcny" == p ? 1 : B.stocks[b].minStock
        }, C.GetMinPrice = function() {
            var a = 0;
            return "Bitstamp" == B.name ? a = 31.2 : "Futures_BitVC" == B.name ? a = 100 : "Futures_796" == B.name && "weekcny" == p && (a = 100), a
        }, C.GetFee = function() {
            return B.stocks[b].fee
        }, C.GetAccount = function() {
            delay();
            var a = clone(C.Account),
                b = 0;
            for (var c in s) {
                b = 1;
                break
            }
            return 0 == b && (a.FrozenStocks = 0, a.FrozenBalance = 0), a
        }, C.GetTrades = function() {
            return delay(), [{
                Id: 0,
                Time: f(),//return timeLine + timeOffset
                Amount: 10,
                Price: j(),
                Type: ORDER_TYPE_BUY
            }]
        }, C.Go = function() {
            var a = Array.prototype.slice.call(arguments),
                b = C[a[0]].apply(C, a.slice(1));
            return {
                wait: function() {
                    return b
                }
            }
        }, C.GetRecords = function() {
            if (delay(), timeLine + timeOffset < u[0].Time) return [];
            var a = g(),//偏移底标
                b = a + 1;
            a = b > 1e3 ? b - 1e3 : 0;
            var c = clone(u.slice(a, b));
            if (c.length > 0) {
                var d = h(c[c.length - 1]);
                c[c.length - 1].High = d.High, c[c.length - 1].Low = d.Low, c[c.length - 1].Close = d.Close
            }
            return c
        }, C.GetTicker = function() {
            delay();
            var a = j(),
                b = .001;
            return {
                Sell: fixedFloat(a + b),
                Buy: fixedFloat(a - b),
                Last: a,
                High: a,
                Low: a,
                Volume: 100
            }
        }, C.GetDepth = function() {
            delay();
            var a = j(),
                b = .01;
            a > 100 && (b = .1);
            for (var c = [], d = [], e = 1; 50 > e; e++) c.push({
                Price: fixedFloat(a + b * e),
                Amount: 10 + e
            }), d.push({
                Price: fixedFloat(a - b * e),
                Amount: 10 + e
            });
            return {
                Asks: c,
                Bids: d
            }
        }, C.CancelOrder = function(b) {
            delay(), C.poll();
            var c = s[b];
            if ("object" == typeof c) {
                if (c.Status != ORDER_STATE_PENDING) return void e("Order is already closed");
                if (c.Status = ORDER_STATE_CANCELED, C.IsFutures())
                    if ("closebuy" == c.__direction || "closesell" == c.__direction)
                        for (var d = 0; d < m.length; d++) m[d].MarginLevel == c.__marginLevel && m[d].Type == ("closebuy" == c.__direction ? ORDER_TYPE_BUY : ORDER_TYPE_SELL) && (m[d].FrozenAmount = fixedFloat(m[d].FrozenAmount - c.Amount));
                    else("buy" == c.__direction || "sell" == c.__direction) && (C.Account.Stocks = fixedFloat(C.Account.Stocks + c.Amount / c.__marginLevel));
                else c.Type == ORDER_TYPE_BUY ? (C.Account.FrozenBalance = fixedFloat(C.Account.FrozenBalance - c.Price * c.Amount), C.Account.Balance = fixedFloat(C.Account.Balance + c.Price * c.Amount)) : (C.Account.FrozenStocks = fixedFloat(C.Account.FrozenStocks - c.Amount), C.Account.Stocks = fixedFloat(C.Account.Stocks + c.Amount));
                return __log(LOG_TYPE_CANCEL, a, c.Id, 0, 0, valuesToString(Array.prototype.slice.call(arguments).slice(1))), delete s[b], r[b] = c, !0
            }
            return e("object" == typeof r[b] ? "Order is already closed" : "Order not found"), !1
        }, C.Buy = function(b, c) {
            delay();
            var d = 0,
                f = c,
                g = !1;
            if ("undefined" == typeof c) {
                f = b;
                var h = C.GetTicker(),
                    i = fixedFloat(h.Sell + ("BTC" == C.GetCurrency() ? 1 : .5));
                c = "BTCChina" == C.GetName() ? b : fixedFloat(b / i), b = i, g = !0
            }
            if (C.IsFutures()) {
                var j = C.GetName();
                if ("Futures_796" == j && "weekcny" == p) {
                    if (c != parseInt(c)) return void e("796固定合约期货下单必须为整数!");
                    c = fixedFloat(100 * c / b)
                } else if ("Futures_BitVC" == j) {
                    if (c % 100 != 0) return void e("BitVC期货下单必须为100的倍数");
                    c = fixedFloat(c / b)
                } else if ("Futures_OKCoin" == j) {
                    if (c % 1 != 0) return void e("OKCoin期货下单必须是整数");
                    c = fixedFloat(C.GetRate() * ("BTC" == C.GetCurrency() ? 100 : 10) * c / b)
                }
                if ("buy" == o) {
                    if (d = c / n, d > C.Account.Stocks) return void e("No enough stocks for deposit");
                    C.Account.Stocks = fixedFloat(C.Account.Stocks - d)
                } else {
                    if ("closesell" != o) return void e("Unknown direction");
                    for (var k = !1, l = 0; l < m.length; l++)
                        if (m[l].MarginLevel == n && m[l].Type == ORDER_TYPE_SELL) {
                            if (("Futures_BitVC" == j || "Futures_OKCoin" == j || "weekcny" == p) && (c = Math.min(c, fixedFloat(m[l].Amount - m[l].FrozenAmount))), m[l].Amount - m[l].FrozenAmount < c) return void e("Amount error");
                            k = !0, m[l].FrozenAmount = fixedFloat(m[l].FrozenAmount + c)
                        }
                    if (!k) return void e("Position not found")
                }
            } else {
                if (C.Account.Balance < b * c) return void e("No enough money");
                C.Account.Balance = fixedFloat(C.Account.Balance - b * c), C.Account.FrozenBalance = fixedFloat(C.Account.FrozenBalance + b * c)
            }
            var r = {
                Id: ++q,
                Amount: c,
                DealAmount: 0,
                Price: b,
                Status: ORDER_STATE_PENDING,
                Type: ORDER_TYPE_BUY
            };
            return C.IsFutures() && (r.__deposit = d, r.__direction = o, r.__marginLevel = n, r.__contractType = p), s[r.Id] = r, C.poll(), __log(LOG_TYPE_BUY, a, r.Id, g ? -1 : b, f, valuesToString(Array.prototype.slice.call(arguments).slice(2))), r.Id
        }, C.Sell = function(b, c) {
            delay();
            var d = c,
                f = !1;
            if ("undefined" == typeof c) {
                f = !0, d = b, c = b;
                var g = C.GetTicker(),
                    h = fixedFloat(g.Buy - ("BTC" == C.GetCurrency() ? 1 : .5));
                b = h
            }
            var i = 0;
            if (C.IsFutures()) {
                var j = C.GetName();
                if ("Futures_796" == j && "weekcny" == p) {
                    if (c != parseInt(c)) return void e("796固定合约期货下单必须为整数!");
                    c = fixedFloat(100 * c / b)
                } else if ("Futures_BitVC" == j) {
                    if (c % 100 != 0) return void e("BitVC期货下单必须为100的倍数");
                    c = fixedFloat(c / b)
                } else if ("Futures_OKCoin" == j) {
                    if (c % 1 != 0) return void e("OKCoin期货下单必须是整数");
                    c = fixedFloat(C.GetRate() * ("BTC" == C.GetCurrency() ? 100 : 10) * c / b)
                }
                if ("sell" == o) {
                    if (i = c / n, i > C.Account.Stocks) return void e("No enough stocks for deposit");
                    C.Account.Stocks = fixedFloat(C.Account.Stocks - i)
                } else {
                    if ("closebuy" != o) return void e("Unknown direction");
                    for (var k = !1, l = 0; l < m.length; l++)
                        if (m[l].MarginLevel == n && m[l].Type == ORDER_TYPE_BUY) {
                            if (("Futures_BitVC" == j || "Futures_OKCoin" == j || "weekcny" == p) && (c = Math.min(c, fixedFloat(m[l].Amount - m[l].FrozenAmount))), fixedFloat(m[l].Amount - m[l].FrozenAmount) < c) return console.log(m[l], c, d), void e("Amount error");
                            k = !0, m[l].FrozenAmount = fixedFloat(m[l].FrozenAmount + c)
                        }
                    if (!k) return void e("Position not found")
                }
            } else {
                if (C.Account.Stocks < c) return void e("No enough stocks");
                C.Account.Stocks = fixedFloat(C.Account.Stocks - c), C.Account.FrozenStocks = fixedFloat(C.Account.FrozenStocks + c)
            }
            var r = {
                Id: ++q,
                Amount: c,
                DealAmount: 0,
                Price: b,
                Status: ORDER_STATE_PENDING,
                Type: ORDER_TYPE_SELL
            };
            return C.IsFutures() && (r.__deposit = i, r.__direction = o, r.__marginLevel = n, r.__contractType = p), s[r.Id] = r, C.poll(), __log(LOG_TYPE_SELL, a, r.Id, f ? -1 : b, d, valuesToString(Array.prototype.slice.call(arguments).slice(2))), r.Id
        }, C.GetOrder = function(a) {
            if (delay(), C.poll(), C.IsFutures()) return void e("Not support");
            var b = s[a];
            return "object" == typeof b ? clone(b) : (b = r[a], "object" == typeof b ? clone(b) : void e("Order not found"))
        }, C.GetOrders = function() {
            delay(), C.poll();
            var a = [];
            for (var b in s) a.push(clone(s[b]));
            return a
        }, C.handleFutures = function(a, c) {
            if ("buy" == a.__direction || "sell" == a.__direction) {
                for (var d = !1, e = 0; e < m.length; e++)
                    if (m[e].MarginLevel == a.__marginLevel && m[e].Type == a.Type) {
                        var f = m[e].Price * (m[e].Amount + m[e].FrozenAmount) + a.Amount * c,
                            g = m[e].Amount + m[e].FrozenAmount + a.Amount;
                        m[e].Price = fixedFloat(f / g), m[e].Amount = fixedFloat(g - m[e].FrozenAmount), d = !0;
                        break
                    }
                d || m.push({
                    MarginLevel: a.__marginLevel,
                    Amount: a.Amount,
                    FrozenAmount: 0,
                    Price: c,
                    Profit: 0,
                    Type: a.Type,
                    ContractType: a.__contractType
                })
            }
            if ("closebuy" == a.__direction || "closesell" == a.__direction)
                for (var e = 0; e < m.length; e++)
                    if (m[e].MarginLevel == a.__marginLevel && m[e].Type == ("closebuy" == a.__direction ? ORDER_TYPE_BUY : ORDER_TYPE_SELL)) {
                        var h = c - m[e].Price;
                        m[e].Amount = fixedFloat(m[e].Amount - a.Amount), m[e].FrozenAmount = fixedFloat(m[e].FrozenAmount - a.Amount);
                        var i = 0;
                        if ("Futures_796" == C.GetName() && "week" == p) {
                            var j, k = m[e].Price / C.GetRate();
                            j = "BTC" == b ? 5 * (parseInt(k / 50) + 1) * C.GetRate() : (parseInt(k) / 10 + .1) * C.GetRate(), m[e].Profit = fixedFloat(m[e].Amount / m[e].MarginLevel * ("closesell" == a.__direction ? -h : h) / j), i = fixedFloat(a.Amount / m[e].MarginLevel * ("closesell" == a.__direction ? -h : h) / j)
                        } else i = fixedFloat(a.Amount * ("closesell" == a.__direction ? -h : h) / c), m[e].Profit = i;
                        C.Account.Stocks = fixedFloat(C.Account.Stocks + a.Amount / a.__marginLevel + i), C.Account.Stocks = fixedFloat(C.Account.Stocks - a.Amount * (C.GetFee().Buy / 100)), m[e].Amount < .01 && (C.Account.Stocks = fixedFloat(C.Account.Stocks + m[e].Amount / m[e].MarginLevel + m[e].Profit), m.splice(e, 1));
                        break
                    }
        }, C.poll = function() {
            var a = C.GetTicker(),
                c = !1;
            do {
                c = !1;
                for (var d = 0; d < m.length; d++)
                    if (m[d].Amount < .01) m.splice(d, 1);
                    else {
                        if ("Futures_796" == C.GetName() && "week" == p) {
                            var e, f = m[d].Price / C.GetRate();
                            e = "BTC" == b ? 5 * (parseInt(f / 50) + 1) * C.GetRate() : (parseInt(f) / 10 + .1) * C.GetRate();
                            var g = a.Last - m[d].Price;
                            m[d].Profit = fixedFloat(m[d].Type == ORDER_TYPE_BUY ? m[d].Amount / m[d].MarginLevel * g / e : m[d].Amount / m[d].MarginLevel * -g / e)
                        } else {
                            var g = a.Last - m[d].Price;
                            m[d].Profit = fixedFloat(m[d].Amount * (m[d].Type == ORDER_TYPE_SELL ? -g : g) / a.Last)
                        }
                        if (-m[d].Profit > m[d].Amount / m[d].MarginLevel && -m[d].Profit - m[d].Amount / m[d].MarginLevel > C.Account.Stocks) {
                            Log("Panic: Margin call! ", m[d]), C.Account.Stocks = 0, m.splice(d, 1), c = !0;
                            break
                        }
                    }
            } while (c);
            for (var d in s) s[d].Type == ORDER_TYPE_BUY ? s[d].Price >= a.Sell && (C.IsFutures() ? C.handleFutures(s[d], a.Sell) : (C.Account.Stocks = fixedFloat(C.Account.Stocks + s[d].Amount * (1 - C.GetFee().Buy / 100)), C.Account.FrozenBalance = fixedFloat(C.Account.FrozenBalance - s[d].Amount * s[d].Price), C.Account.Balance += fixedFloat(s[d].Amount * (s[d].Price - a.Sell))), s[d].DealAmount = s[d].Amount, s[d].Status = ORDER_STATE_CLOSED) : s[d].Price <= a.Buy && (C.IsFutures() ? C.handleFutures(s[d], a.Buy) : (C.Account.Balance = fixedFloat(C.Account.Balance + a.Buy * s[d].Amount * (1 - C.GetFee().Sell / 100)), C.Account.FrozenStocks = fixedFloat(C.Account.FrozenStocks - s[d].Amount)), s[d].DealAmount = s[d].Amount, s[d].Status = ORDER_STATE_CLOSED), s[d].Status == ORDER_STATE_CLOSED && (r[d] = s[d], delete s[d])
        }, C
    }
    if (0 == pairs.length) return {
        series: {},
        logs: []
    };
    var startTimeInt = new Date(startTime).getTime(),
        endTimeInt = new Date(endTime).getTime(),
        ts = 0,//api获取的开始时间
        te = 0;//api获取的结束时间
    for (k in recordsMap) {
        if (0 == recordsMap[k].length) return {
            series: [],
            logs: [],
            error: "K线历史数据为空, 请重新获取或者更改时间范围! (" + k + ")"
        };
        if ("undefined" != typeof __usedMap[k]) {
            ts = Math.max(ts, recordsMap[k][0].Time);
            var e = recordsMap[k][recordsMap[k].length - 1].Time;
            te = 0 == te ? e : Math.min(te, e)
        }
    }
    var isEnableLog = !0,
        errorFilter = [],
        series = {},
        logs = [],
        chart_json = "",
        chart_logs = [],
        profit_logs = [],
        exchanges = [],
        timeLine = ts,
        timeOffset = 0,//时间偏移
        maxOffset = te - ts,//最大偏移量
        lastErrorMsg = "",
        logsCounter = 0,
        _globalVal = {},
        _summary = "";
    ts != startTimeInt && Log("已自动对齐K线, 调整开始时间为: " + formatDate(new Date(ts))), te != endTimeInt && Log("已自动对齐K线, 调整结束时间为: " + formatDate(new Date(te)));
    for (var i = 0; i < pairs.length; i++) {
        var ex = newExchange(pairs[i][0], pairs[i][1], pairs[i][2], pairs[i][3]);
        if (!ex) return {
            series: series,
            logs: logs,
            chart_json: chart_json,
            chart_logs: chart_logs,
            profit_logs: profit_logs
        };
        exchanges.push(ex)
    }
    var exchange = exchanges[0],
        __Date = Date;
    Date = function(a) {
        return new __Date("undefined" != typeof a ? a : timeLine + timeOffset)
    };
    try {
        eval(script + "\r\nmain(1);if(typeof(onexit)=='function')onexit();")
    } catch (e) {
        "Stop" != e && setGlobalError(e)
    }
    return Date = __Date, {
        series: series,
        logs: logs,
        chart_json: chart_json,
        chart_logs: chart_logs,
        profit_logs: profit_logs
    }
}
//a: sTime b: eTime c: period d: paris e: script f,g: 回调function g: recordsCache
function backtest(a, b, c, d, e, f, g, h) {
    a = a.replace(/\-/g, "/"), b = b.replace(/\-/g, "/"), __startTime = a, __endTime = b, __period = c, __pairs = d, __script = e, __finishCallBack = f, __progressCallBack = g, __count = 0, __usedMap = {}, recordsMap = {}, "undefined" != typeof h && (recordsCache = h);
    for (var i = 0; i < d.length; i++) fetchRecords(d[i][0], d[i][1], a, b, c)
}
var PLATFORM_HUOBI = 0,
    PLATFORM_OKCOIN = 1,
    PLATFORM_BTCCHINA = 2,
    PLATFORM_YUNBI = 3,
    PLATFORM_CHBTC = 4,
    PLATFORM_BTCTRADE = 5,
    PLATFORM_BTC100 = 6,
    PLATFORM_BITVC = 7,
    PLATFORM_FUTURES_796 = 8,
    PLATFORM_TFOLL = 9,
    PLATFORM_BTER = 10,
    PLATFORM_FUTURES_BITVC = 11,
    PLATFORM_FUTURES_OKCOIN = 12,
    PLATFORM_BTCE = 20,
    PLATFORM_BITSTAMP = 21,
    PLATFORM_BITFINEX = 22,
    PLATFORM_OKCOINEN = 23,
    PLATFORM_VIRTEX = 24,
    PERIOD_M1 = 0,
    PERIOD_M3 = 1,
    PERIOD_M5 = 2,
    PERIOD_M15 = 3,
    PERIOD_M30 = 4,
    PERIOD_H1 = 5,
    PERIOD_H2 = 6,
    PERIOD_H4 = 7,
    PERIOD_H6 = 8,
    PERIOD_H12 = 9,
    PERIOD_D1 = 10,
    PERIOD_D3 = 11,
    PERIOD_W1 = 12,
    ORDER_STATE_PENDING = 0,
    ORDER_STATE_PARTIAL = 1,
    ORDER_STATE_CLOSED = 2,
    ORDER_STATE_CANCELED = 3,
    ORDER_STATE_UNKNOWN = 4,
    ORDER_TYPE_BUY = 0,
    ORDER_TYPE_SELL = 1,
    LOG_TYPE_BUY = 0,
    LOG_TYPE_SELL = 1,
    LOG_TYPE_CANCEL = 2,
    LOG_TYPE_ERROR = 3,
    LOG_TYPE_PROFIT = 4,
    LOG_TYPE_LOG = 5,
    LOG_TYPE_RESTART = 6,
    LOG_TYPE_STATUS = 7,
    LOG_TYPE_CHART_NEW = 8,
    LOG_TYPE_CHART_ADD = 9,
    LOG_TYPE_CHART_DEL = 10,
    LOG_TYPE_PROFIT_DEL = 11,
    recordsCache = {},
    recordsMap = {},
    __usedMap = {},
    __startTime, __endTime, __period, __pairs, __script, __finishCallBack, __progressCallBack, __count = 0;
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b : a.atomic = b(a)
}(this, function(a) {
    "use strict";
    var b = {},
        c = function(a) {
            var b;
            try {
                b = JSON.parse(a.responseText)
            } catch (c) {
                b = a.responseText
            }
            return [b, a]
        },
        d = function(b, d, e) {
            var f = {
                    success: function() {},
                    error: function() {}
                },
                g = a.XMLHttpRequest || ActiveXObject,
                h = new g("MSXML2.XMLHTTP.3.0");
            return h.open(b, d, !0), h.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), h.onreadystatechange = function() {
                4 === h.readyState && (200 === h.status ? f.success.apply(f, c(h)) : f.error.apply(f, c(h)))
            }, h.send(e), {
                success: function(a) {
                    return f.success = a, f
                },
                error: function(a) {
                    return f.error = a, f
                }
            }
        };
    return b.get = function(a) {
        return d("GET", a)
    }, b.put = function(a, b) {
        return d("PUT", a, b)
    }, b.post = function(a, b) {
        return d("POST", a, b)
    }, b["delete"] = function(a) {
        return d("DELETE", a)
    }, b
});