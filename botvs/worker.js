self.onmessage = function(a) {
    var b = a.data,
        c = 0,
        d = "";
    "function" != typeof backtest && importScripts("sandbox.js"), backtest(b[0], b[1], b[2], b[3], b[4], function(a) {
        self.postMessage({
            progress: 100,
            ret: a,
            cache: recordsCache,
            summary: d
        })
    }, function(a, b) {
        var e = parseFloat((100 * a).toFixed(1));
        e != c && (c = e, d = b, self.postMessage({
            progress: c,
            summary: b
        }))
    }, b[5])
};