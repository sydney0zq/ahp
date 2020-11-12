"use strict";
!(function() {
  window.NodeList &&
    !NodeList.prototype.forEach &&
    (NodeList.prototype.forEach = function(e, t) {
      t = t || window;
      for (var r = 0; r < this.length; r++) e.call(t, this[r], r, this);
    }),
    window.addEventListener("setIframeHeight", function(e) {
      var o,
        f = e.detail;
      (o = (function(e) {
        var t = null;
        return (
          document.querySelectorAll("iframe").forEach(function(r) {
            t || r.dataset.setIframeHeightId !== e || (t = r);
          }),
          t
        );
      })(f.iframeId)) || (o = r(f.iframeSrc));
      !o && f.iframeReferrer && (o = r(f.iframeReferrer));
      if (o) {
        (o.dataset.setIframeHeightId = f.iframeId),
          (o.style.height = f.height + "px");
        var d =
          n(o.dataset.iframeAutoHeightCurrentSrc || o.src) !== n(f.iframeSrc);
        o.dataset.iframeAutoHeightCurrentSrc = f.iframeSrc;
        var c = t[f.iframeId],
          s = f.height;
        if (
          (void 0 === c
            ? a(window, "setIframeHeight:determined", f)
            : c > s
              ? a(window, "setIframeHeight:shrinked", f)
              : c < s && a(window, "setIframeHeight:enlarged", f),
          (t[f.iframeId] = s),
          window.history.replaceState &&
            o.dataset.iframeAutoHeightDeepLinkPattern &&
            d)
        ) {
          var h = i(
            o.dataset.iframeAutoHeightDeepLinkPattern.replace(
              /%deepLinkIframeSrc%/,
              encodeURIComponent(f.iframeSrc)
            )
          );
          n(document.location.href) !== n(h) &&
            (window.history.replaceState({}, "", h),
            a(window, "setIframeHeight:deepLink:changed", {
              childUrl: f.iframeSrc,
              parentUrl: h
            })),
            o.contentWindow &&
              o.contentWindow.postMessage &&
              o.contentWindow.postMessage(
                'setIframeHeight:deepLink:changed::{ "parentUrl": "' +
                  h +
                  '", "childUrl": "' +
                  f.iframeSrc +
                  '"}',
                "*"
              );
        }
      }
    }),
    window.addEventListener("message", function(t) {
      if ("string" == typeof (r = t.data) && r.indexOf("::")) {
        var r = r.split("::");
        if (2 === r.length && "setIframeHeight" === r[0]) {
          var i = JSON.parse(r[1]);
          e.setHeight(i);
        }
      }
    });
  var e = {
      setHeight: function(e) {
        (e.height = parseInt(e.height, 10)), a(window, "setIframeHeight", e);
      }
    },
    t = {};
  function r(e) {
    var t = null;
    return (
      document.querySelectorAll("iframe").forEach(function(r) {
        var n = r.dataset.iframeAutoHeightCurrentSrc || r.src;
        if (n && (n = i(n)) === e) return (t = r), !1;
      }),
      t
    );
  }
  function i(e) {
    0 === e.indexOf("/") &&
      (e = (document.location.href.match(/https?:\/\/.[^/]+/) || [])[0] + e);
    return e;
  }
  function n(e) {
    return e.replace(/^https?:\/\//, "//");
  }
  function a(e, t, r) {
    var i = document.createEvent("CustomEvent");
    i.initCustomEvent(t, !0, !0, r), e.dispatchEvent(i);
  }
})();
