const C = {};
function ge(e) {
  C.context = e;
}
const me = (e, t) => e === t, ve = Symbol("solid-track"), H = {
  equals: me
};
let ie = ce;
const _ = 1, K = 2, le = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var g = null;
let P = null, p = null, m = null, E = null, J = 0;
function I(e, t) {
  const n = p, s = g, i = e.length === 0, r = i ? le : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t || s
  }, o = i ? e : () => e(() => O(() => D(r)));
  g = r, p = null;
  try {
    return j(o, !0);
  } finally {
    p = n, g = s;
  }
}
function A(e, t) {
  t = t ? Object.assign({}, H, t) : H;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, s = (i) => (typeof i == "function" && (i = i(n.value)), oe(n, i));
  return [re.bind(n), s];
}
function T(e, t, n) {
  const s = Z(e, t, !1, _);
  R(s);
}
function ye(e, t, n) {
  ie = $e;
  const s = Z(e, t, !1, _);
  s.user = !0, E ? E.push(s) : R(s);
}
function Y(e, t, n) {
  n = n ? Object.assign({}, H, n) : H;
  const s = Z(e, t, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = n.equals || void 0, R(s), re.bind(s);
}
function O(e) {
  const t = p;
  p = null;
  try {
    return e();
  } finally {
    p = t;
  }
}
function be(e) {
  ye(() => O(e));
}
function we(e) {
  return g === null || (g.cleanups === null ? g.cleanups = [e] : g.cleanups.push(e)), e;
}
function xe(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: Le(n),
    defaultValue: e
  };
}
function Ae(e) {
  let t;
  return (t = fe(g, e.id)) !== void 0 ? t : e.defaultValue;
}
function Se(e) {
  const t = Y(e), n = Y(() => G(t()));
  return n.toArray = () => {
    const s = n();
    return Array.isArray(s) ? s : s != null ? [s] : [];
  }, n;
}
function re() {
  const e = P;
  if (this.sources && (this.state || e))
    if (this.state === _ || e)
      R(this);
    else {
      const t = m;
      m = null, j(() => W(this), !1), m = t;
    }
  if (p) {
    const t = this.observers ? this.observers.length : 0;
    p.sources ? (p.sources.push(this), p.sourceSlots.push(t)) : (p.sources = [this], p.sourceSlots = [t]), this.observers ? (this.observers.push(p), this.observerSlots.push(p.sources.length - 1)) : (this.observers = [p], this.observerSlots = [p.sources.length - 1]);
  }
  return this.value;
}
function oe(e, t, n) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, t)) && (e.value = t, e.observers && e.observers.length && j(() => {
    for (let i = 0; i < e.observers.length; i += 1) {
      const r = e.observers[i], o = P && P.running;
      o && P.disposed.has(r), (o && !r.tState || !o && !r.state) && (r.pure ? m.push(r) : E.push(r), r.observers && ue(r)), o || (r.state = _);
    }
    if (m.length > 1e6)
      throw m = [], new Error();
  }, !1)), t;
}
function R(e) {
  if (!e.fn)
    return;
  D(e);
  const t = g, n = p, s = J;
  p = g = e, Ce(e, e.value, s), p = n, g = t;
}
function Ce(e, t, n) {
  let s;
  try {
    s = e.fn(t);
  } catch (i) {
    e.pure && (e.state = _), ae(i);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? oe(e, s) : e.value = s, e.updatedAt = n);
}
function Z(e, t, n, s = _, i) {
  const r = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: g,
    context: null,
    pure: n
  };
  return g === null || g !== le && (g.owned ? g.owned.push(r) : g.owned = [r]), r;
}
function U(e) {
  const t = P;
  if (e.state === 0 || t)
    return;
  if (e.state === K || t)
    return W(e);
  if (e.suspense && O(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < J); )
    (e.state || t) && n.push(e);
  for (let s = n.length - 1; s >= 0; s--)
    if (e = n[s], e.state === _ || t)
      R(e);
    else if (e.state === K || t) {
      const i = m;
      m = null, j(() => W(e, n[0]), !1), m = i;
    }
}
function j(e, t) {
  if (m)
    return e();
  let n = !1;
  t || (m = []), E ? n = !0 : E = [], J++;
  try {
    const s = e();
    return Ee(n), s;
  } catch (s) {
    m || (E = null), ae(s);
  }
}
function Ee(e) {
  if (m && (ce(m), m = null), e)
    return;
  const t = E;
  E = null, t.length && j(() => ie(t), !1);
}
function ce(e) {
  for (let t = 0; t < e.length; t++)
    U(e[t]);
}
function $e(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? e[n++] = s : U(s);
  }
  for (C.context && ge(), t = 0; t < n; t++)
    U(e[t]);
}
function W(e, t) {
  const n = P;
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const i = e.sources[s];
    i.sources && (i.state === _ || n ? i !== t && U(i) : (i.state === K || n) && W(i, t));
  }
}
function ue(e) {
  const t = P;
  for (let n = 0; n < e.observers.length; n += 1) {
    const s = e.observers[n];
    (!s.state || t) && (s.state = K, s.pure ? m.push(s) : E.push(s), s.observers && ue(s));
  }
}
function D(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), s = e.sourceSlots.pop(), i = n.observers;
      if (i && i.length) {
        const r = i.pop(), o = n.observerSlots.pop();
        s < i.length && (r.sourceSlots[o] = s, i[s] = r, n.observerSlots[s] = o);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      D(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function _e(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function ae(e) {
  throw e = _e(e), e;
}
function fe(e, t) {
  return e ? e.context && e.context[t] !== void 0 ? e.context[t] : fe(e.owner, t) : void 0;
}
function G(e) {
  if (typeof e == "function" && !e.length)
    return G(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = G(e[n]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function Le(e, t) {
  return function(s) {
    let i;
    return T(() => i = O(() => (g.context = {
      [e]: s.value
    }, Se(() => s.children))), void 0), i;
  };
}
const Pe = Symbol("fallback");
function ee(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function Te(e, t, n = {}) {
  let s = [], i = [], r = [], o = 0, l = t.length > 1 ? [] : null;
  return we(() => ee(r)), () => {
    let u = e() || [], a, c;
    return u[ve], O(() => {
      let d = u.length, h, v, L, k, M, y, b, x, S;
      if (d === 0)
        o !== 0 && (ee(r), r = [], s = [], i = [], o = 0, l && (l = [])), n.fallback && (s = [Pe], i[0] = I((w) => (r[0] = w, n.fallback())), o = 1);
      else if (o === 0) {
        for (i = new Array(d), c = 0; c < d; c++)
          s[c] = u[c], i[c] = I(f);
        o = d;
      } else {
        for (L = new Array(d), k = new Array(d), l && (M = new Array(d)), y = 0, b = Math.min(o, d); y < b && s[y] === u[y]; y++)
          ;
        for (b = o - 1, x = d - 1; b >= y && x >= y && s[b] === u[x]; b--, x--)
          L[x] = i[b], k[x] = r[b], l && (M[x] = l[b]);
        for (h = /* @__PURE__ */ new Map(), v = new Array(x + 1), c = x; c >= y; c--)
          S = u[c], a = h.get(S), v[c] = a === void 0 ? -1 : a, h.set(S, c);
        for (a = y; a <= b; a++)
          S = s[a], c = h.get(S), c !== void 0 && c !== -1 ? (L[c] = i[a], k[c] = r[a], l && (M[c] = l[a]), c = v[c], h.set(S, c)) : r[a]();
        for (c = y; c < d; c++)
          c in L ? (i[c] = L[c], r[c] = k[c], l && (l[c] = M[c], l[c](c))) : i[c] = I(f);
        i = i.slice(0, o = d), s = u.slice(0);
      }
      return i;
    });
    function f(d) {
      if (r[c] = d, l) {
        const [h, v] = A(c);
        return l[c] = v, t(u[c], h);
      }
      return t(u[c]);
    }
  };
}
function N(e, t) {
  return O(() => e(t || {}));
}
function Ne(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Y(Te(() => e.each, e.children, t || void 0));
}
function Oe(e, t, n) {
  let s = n.length, i = t.length, r = s, o = 0, l = 0, u = t[i - 1].nextSibling, a = null;
  for (; o < i || l < r; ) {
    if (t[o] === n[l]) {
      o++, l++;
      continue;
    }
    for (; t[i - 1] === n[r - 1]; )
      i--, r--;
    if (i === o) {
      const c = r < s ? l ? n[l - 1].nextSibling : n[r - l] : u;
      for (; l < r; )
        e.insertBefore(n[l++], c);
    } else if (r === l)
      for (; o < i; )
        (!a || !a.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[r - 1] && n[l] === t[i - 1]) {
      const c = t[--i].nextSibling;
      e.insertBefore(n[l++], t[o++].nextSibling), e.insertBefore(n[--r], c), t[i] = n[r];
    } else {
      if (!a) {
        a = /* @__PURE__ */ new Map();
        let f = l;
        for (; f < r; )
          a.set(n[f], f++);
      }
      const c = a.get(t[o]);
      if (c != null)
        if (l < c && c < r) {
          let f = o, d = 1, h;
          for (; ++f < i && f < r && !((h = a.get(t[f])) == null || h !== c + d); )
            d++;
          if (d > c - l) {
            const v = t[o];
            for (; l < c; )
              e.insertBefore(n[l++], v);
          } else
            e.replaceChild(n[l++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
const te = "_$DX_DELEGATE";
function ke(e, t, n, s = {}) {
  let i;
  return I((r) => {
    i = r, t === document ? e() : $(t, e(), t.firstChild ? null : void 0, n);
  }, s.owner), () => {
    i(), t.textContent = "";
  };
}
function F(e, t, n) {
  const s = document.createElement("template");
  s.innerHTML = e;
  let i = s.content.firstChild;
  return n && (i = i.firstChild), i;
}
function Me(e, t = window.document) {
  const n = t[te] || (t[te] = /* @__PURE__ */ new Set());
  for (let s = 0, i = e.length; s < i; s++) {
    const r = e[s];
    n.has(r) || (n.add(r), t.addEventListener(r, je));
  }
}
function Be(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function z(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function Re(e, t, n) {
  return O(() => e(t, n));
}
function $(e, t, n, s) {
  if (n !== void 0 && !s && (s = []), typeof t != "function")
    return q(e, t, s, n);
  T((i) => q(e, t(), i, n), s);
}
function je(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), C.registry && !C.done && (C.done = !0, document.querySelectorAll("[id^=pl-]").forEach((s) => s.remove())); n !== null; ) {
    const s = n[t];
    if (s && !n.disabled) {
      const i = n[`${t}Data`];
      if (i !== void 0 ? s.call(n, i, e) : s.call(n, e), e.cancelBubble)
        return;
    }
    n = n.host && n.host !== n && n.host instanceof Node ? n.host : n.parentNode;
  }
}
function q(e, t, n, s, i) {
  for (C.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const r = typeof t, o = s !== void 0;
  if (e = o && n[0] && n[0].parentNode || e, r === "string" || r === "number") {
    if (C.context)
      return n;
    if (r === "number" && (t = t.toString()), o) {
      let l = n[0];
      l && l.nodeType === 3 ? l.data = t : l = document.createTextNode(t), n = B(e, n, s, l);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || r === "boolean") {
    if (C.context)
      return n;
    n = B(e, n, s);
  } else {
    if (r === "function")
      return T(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        n = q(e, l, n, s);
      }), () => n;
    if (Array.isArray(t)) {
      const l = [], u = n && Array.isArray(n);
      if (Q(l, t, n, i))
        return T(() => n = q(e, l, n, s, !0)), () => n;
      if (C.context) {
        if (!l.length)
          return n;
        for (let a = 0; a < l.length; a++)
          if (l[a].parentNode)
            return n = l;
      }
      if (l.length === 0) {
        if (n = B(e, n, s), o)
          return n;
      } else
        u ? n.length === 0 ? ne(e, l, s) : Oe(e, n, l) : (n && B(e), ne(e, l));
      n = l;
    } else if (t instanceof Node) {
      if (C.context && t.parentNode)
        return n = o ? [t] : t;
      if (Array.isArray(n)) {
        if (o)
          return n = B(e, n, s, t);
        B(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Q(e, t, n, s) {
  let i = !1;
  for (let r = 0, o = t.length; r < o; r++) {
    let l = t[r], u = n && n[r];
    if (l instanceof Node)
      e.push(l);
    else if (!(l == null || l === !0 || l === !1))
      if (Array.isArray(l))
        i = Q(e, l, u) || i;
      else if (typeof l == "function")
        if (s) {
          for (; typeof l == "function"; )
            l = l();
          i = Q(e, Array.isArray(l) ? l : [l], Array.isArray(u) ? u : [u]) || i;
        } else
          e.push(l), i = !0;
      else {
        const a = String(l);
        u && u.nodeType === 3 && u.data === a ? e.push(u) : e.push(document.createTextNode(a));
      }
  }
  return i;
}
function ne(e, t, n = null) {
  for (let s = 0, i = t.length; s < i; s++)
    e.insertBefore(t[s], n);
}
function B(e, t, n, s) {
  if (n === void 0)
    return e.textContent = "";
  const i = s || document.createTextNode("");
  if (t.length) {
    let r = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (i !== l) {
        const u = l.parentNode === e;
        !r && !o ? u ? e.replaceChild(i, l) : e.insertBefore(i, n) : u && l.remove();
      } else
        r = !0;
    }
  } else
    e.insertBefore(i, n);
  return [i];
}
const Ie = (e) => !!(e && e.nodeName && e.nodeType === 1), He = (e) => Ie(e) ? e : typeof e == "string" ? document.querySelector(e) : document.createElement("div"), se = (e) => {
  if (e instanceof Function)
    return e;
  {
    const t = document.createElement("div");
    return () => t;
  }
}, X = (e = [], t = 0, n = "children") => {
  const s = [];
  return !e || e.length < 1 ? [] : (e.forEach((i) => {
    const r = Object.assign(i, { level: t });
    i[n] && (r[n] = X(i[n], t + 1)), s.push(r);
  }), s);
}, de = xe();
function Ke(e) {
  const [t, n] = A(e.slots.headerSlot || null), [s, i] = A(e.slots.footerSlot || null), [r, o] = A(e.props.expand || !0), [l, u] = A(e.props.data || []), [a, c] = A(e.props.labelProp || "label"), [f, d] = A(e.props.keyProp || "key"), [h, v] = A(e.props.childProp || "children"), [L, k] = A(e.props.openKeys || []), [M, y] = A(e.props.height || "100%"), [b, x] = A(e.props.width || "240px");
  u(() => [...X(l(), 0, h())]);
  const S = {
    headerSlot: {
      value: t,
      change: n
    },
    footerSlot: {
      value: s,
      change: i
    },
    expand: {
      value: r,
      change: (w) => o(w === !0 || w === !1 ? w : !r)
    },
    data: {
      value: l,
      change: (w) => {
        const V = X(w);
        u(() => [...V]);
      }
    },
    labelProp: {
      value: a,
      change: c
    },
    keyProp: {
      value: f,
      change: d
    },
    childProp: {
      value: h,
      change: v
    },
    openKeys: {
      value: L,
      change: k
    },
    height: {
      value: M,
      change: y
    },
    width: {
      value: b,
      change: x
    }
  };
  return Object.keys(S).forEach((w) => {
    const V = w.slice(0, 1).toLocaleUpperCase() + w.slice(1);
    e.methods[`update${V}`] = S[w].change;
  }), N(de.Provider, {
    value: S,
    get children() {
      return e.children;
    }
  });
}
function he() {
  return Ae(de);
}
const Ue = /* @__PURE__ */ F('<li class="cy-menu-item"><div class="cy-menu-item-box"><div class="cy-menu-item-label"></div></div></li>'), We = /* @__PURE__ */ F("<div></div>"), qe = (e) => {
  const {
    openKeys: t,
    keyProp: n,
    labelProp: s
  } = he(), i = e.data.children && e.data.children.length > 0 ? e.data.children : null, r = (o) => {
    if (!i)
      return;
    const l = o[n.value()], u = t.value(), a = u.findIndex((c) => c === l);
    a > -1 ? u.splice(a, 1) : u.push(l), t.change(() => [...u]);
  };
  return (() => {
    const o = Ue.cloneNode(!0), l = o.firstChild, u = l.firstChild;
    return l.$$click = () => r(e.data), $(u, () => e.data[s.value()]), $(o, i ? (() => {
      const a = We.cloneNode(!0);
      return $(a, N(pe, {
        get list() {
          return e.data.children;
        },
        get level() {
          return e.level + 1;
        }
      })), T(() => z(a, `cy-menu-item-child-list ${t.value().includes(e.data[n.value()]) ? "cy-menu-item-child-list-open" : ""}`)), a;
    })() : null, null), o;
  })();
};
Me(["click"]);
const Fe = /* @__PURE__ */ F("<ul></ul>"), pe = (e) => (() => {
  const t = Fe.cloneNode(!0);
  return $(t, N(Ne, {
    get each() {
      return e.list;
    },
    children: (n) => N(qe, {
      data: n,
      get level() {
        return e.level;
      }
    })
  })), T((n) => {
    const s = `cy-menu-list ${e.isContent ? "cy-menu-content-list" : ""}`, i = e.level;
    return s !== n._v$ && z(t, n._v$ = s), i !== n._v$2 && Be(t, "data-level", n._v$2 = i), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
function Ve(e = window, t = document) {
  function n(u) {
    Object.prototype.hasOwnProperty.call(u, "data-simple-scrollbar") || Object.defineProperty(
      u,
      "data-simple-scrollbar",
      {
        value: new l(u)
      }
    );
  }
  function s(u, a) {
    function c(h) {
      var v = h.pageY - d;
      d = h.pageY, o(function() {
        a.el.scrollTop += v / a.scrollRatio;
      });
    }
    function f() {
      u.classList.remove("cy-menu-grabbed"), t.body.classList.remove("cy-menu-grabbed"), t.removeEventListener(
        "mousemove",
        c
      ), t.removeEventListener("mouseup", f);
    }
    var d;
    u.addEventListener("mousedown", function(h) {
      return d = h.pageY, u.classList.add("cy-menu-grabbed"), t.body.classList.add("cy-menu-grabbed"), t.addEventListener(
        "mousemove",
        c
      ), t.addEventListener("mouseup", f), !1;
    });
  }
  function i(u) {
    for (this.target = u, this.direction = window.getComputedStyle(this.target).direction, this.bar = '<div class="cy-menu-scroll">', this.wrapper = t.createElement("div"), this.wrapper.setAttribute(
      "class",
      "cy-menu-wrapper"
    ), this.el = t.createElement("div"), this.el.setAttribute("class", "cy-menu-content"), this.direction === "rtl" && this.el.classList.add("rtl"), this.wrapper.appendChild(this.el); this.target.firstChild; )
      this.el.appendChild(this.target.firstChild);
    this.target.appendChild(this.wrapper), this.target.insertAdjacentHTML("beforeend", this.bar), this.bar = this.target.lastChild, s(this.bar, this), this.moveBar(), this.el.addEventListener("scroll", this.moveBar.bind(this)), this.el.addEventListener("mouseenter", this.moveBar.bind(this)), this.target.classList.add("cy-menu-container");
    var a = window.getComputedStyle(u);
    a.height === "0px" && a["max-height"] !== "0px" && (u.style.height = a["max-height"]);
  }
  function r() {
    for (var u = t.querySelectorAll("*[cy-menu-container]"), a = 0; a < u.length; a++)
      n(u[a]);
  }
  var o = e.requestAnimationFrame || e.setImmediate || function(u) {
    return setTimeout(u, 0);
  };
  i.prototype = {
    moveBar: function(u) {
      var a = this.el.scrollHeight, c = this.el.clientHeight, f = this;
      this.scrollRatio = c / a;
      var d = f.direction === "rtl", h = d ? f.target.clientWidth - f.bar.clientWidth + 18 : -1 * (f.target.clientWidth - f.bar.clientWidth);
      o(function() {
        f.scrollRatio >= 1 ? f.bar.classList.add("cy-menu-hidden") : (f.bar.classList.remove(
          "cy-menu-hidden"
        ), f.bar.style.cssText = "height:" + Math.max(
          100 * f.scrollRatio,
          10
        ) + "%; top:" + f.el.scrollTop / a * 100 + "%;right:" + h + "px;");
      });
    }
  }, t.addEventListener("DOMContentLoaded", r), i.initEl = n, i.initAll = r;
  var l = i;
  return l;
}
const Ye = /* @__PURE__ */ F('<div><div class="cy-menu-header"></div><div class="cy-menu-footer"></div></div>'), Ge = () => {
  const {
    headerSlot: e,
    footerSlot: t,
    expand: n,
    data: s,
    height: i,
    width: r
  } = he();
  let o = document.createElement("div", {});
  return be(() => {
    Ve().initEl(o);
  }), (() => {
    const l = Ye.cloneNode(!0), u = l.firstChild, a = u.nextSibling, c = o;
    return typeof c == "function" ? Re(c, l) : o = l, $(
      u,
      () => se(e.value())("123")
    ), $(l, N(pe, {
      isContent: !0,
      get list() {
        return s.value();
      },
      level: 0
    }), a), $(a, se(t.value())), T((f) => {
      const d = `cy-menu ${n.value() ? "cy-menu-expand" : "cy-menu-shrink"}`, h = i.value(), v = r.value();
      return d !== f._v$ && z(l, f._v$ = d), h !== f._v$2 && l.style.setProperty("--cy-menu-height", f._v$2 = h), v !== f._v$3 && l.style.setProperty("--cy-menu-width", f._v$3 = v), f;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0
    }), l;
  })();
};
const Qe = (e, t, n) => N(Ke, {
  props: e,
  slots: t,
  methods: n,
  get children() {
    return N(Ge, {});
  }
}), Xe = (e, t, n) => {
  const s = {}, i = ke(() => Qe(t, n, s), He(e));
  return s.disposer = i, s;
};
export {
  Xe as renderApp
};