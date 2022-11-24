const $ = {}, fe = (e, t) => e === t, ce = Symbol("solid-track"), U = {
  equals: fe
};
let ae = ne;
const C = 1, k = 2, Z = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var h = null;
let S = null, a = null, p = null, b = null, G = 0;
function R(e, t) {
  const n = a, s = h, l = e.length === 0, o = l ? Z : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t || s
  }, u = l ? e : () => e(() => _(() => Q(o)));
  h = o, a = null;
  try {
    return I(u, !0);
  } finally {
    a = n, h = s;
  }
}
function B(e, t) {
  t = t ? Object.assign({}, U, t) : U;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, s = (l) => (typeof l == "function" && (l = l(n.value)), z(n, l));
  return [D.bind(n), s];
}
function L(e, t, n) {
  const s = ee(e, t, !1, C);
  F(s);
}
function H(e, t, n) {
  n = n ? Object.assign({}, U, n) : U;
  const s = ee(e, t, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = n.equals || void 0, F(s), D.bind(s);
}
function _(e) {
  const t = a;
  a = null;
  try {
    return e();
  } finally {
    a = t;
  }
}
function he(e) {
  return h === null || (h.cleanups === null ? h.cleanups = [e] : h.cleanups.push(e)), e;
}
function de(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: Ae(n),
    defaultValue: e
  };
}
function pe(e) {
  let t;
  return (t = ie(h, e.id)) !== void 0 ? t : e.defaultValue;
}
function ge(e) {
  const t = H(e), n = H(() => K(t()));
  return n.toArray = () => {
    const s = n();
    return Array.isArray(s) ? s : s != null ? [s] : [];
  }, n;
}
function D() {
  const e = S;
  if (this.sources && (this.state || e))
    if (this.state === C || e)
      F(this);
    else {
      const t = p;
      p = null, I(() => q(this), !1), p = t;
    }
  if (a) {
    const t = this.observers ? this.observers.length : 0;
    a.sources ? (a.sources.push(this), a.sourceSlots.push(t)) : (a.sources = [this], a.sourceSlots = [t]), this.observers ? (this.observers.push(a), this.observerSlots.push(a.sources.length - 1)) : (this.observers = [a], this.observerSlots = [a.sources.length - 1]);
  }
  return this.value;
}
function z(e, t, n) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, t)) && (e.value = t, e.observers && e.observers.length && I(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const o = e.observers[l], u = S && S.running;
      u && S.disposed.has(o), (u && !o.tState || !u && !o.state) && (o.pure ? p.push(o) : b.push(o), o.observers && se(o)), u || (o.state = C);
    }
    if (p.length > 1e6)
      throw p = [], new Error();
  }, !1)), t;
}
function F(e) {
  if (!e.fn)
    return;
  Q(e);
  const t = h, n = a, s = G;
  a = h = e, ye(e, e.value, s), a = n, h = t;
}
function ye(e, t, n) {
  let s;
  try {
    s = e.fn(t);
  } catch (l) {
    e.pure && (e.state = C), le(l);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? z(e, s) : e.value = s, e.updatedAt = n);
}
function ee(e, t, n, s = C, l) {
  const o = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: h,
    context: null,
    pure: n
  };
  return h === null || h !== Z && (h.owned ? h.owned.push(o) : h.owned = [o]), o;
}
function te(e) {
  const t = S;
  if (e.state === 0 || t)
    return;
  if (e.state === k || t)
    return q(e);
  if (e.suspense && _(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < G); )
    (e.state || t) && n.push(e);
  for (let s = n.length - 1; s >= 0; s--)
    if (e = n[s], e.state === C || t)
      F(e);
    else if (e.state === k || t) {
      const l = p;
      p = null, I(() => q(e, n[0]), !1), p = l;
    }
}
function I(e, t) {
  if (p)
    return e();
  let n = !1;
  t || (p = []), b ? n = !0 : b = [], G++;
  try {
    const s = e();
    return me(n), s;
  } catch (s) {
    p || (b = null), le(s);
  }
}
function me(e) {
  if (p && (ne(p), p = null), e)
    return;
  const t = b;
  b = null, t.length && I(() => ae(t), !1);
}
function ne(e) {
  for (let t = 0; t < e.length; t++)
    te(e[t]);
}
function q(e, t) {
  const n = S;
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const l = e.sources[s];
    l.sources && (l.state === C || n ? l !== t && te(l) : (l.state === k || n) && q(l, t));
  }
}
function se(e) {
  const t = S;
  for (let n = 0; n < e.observers.length; n += 1) {
    const s = e.observers[n];
    (!s.state || t) && (s.state = k, s.pure ? p.push(s) : b.push(s), s.observers && se(s));
  }
}
function Q(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), s = e.sourceSlots.pop(), l = n.observers;
      if (l && l.length) {
        const o = l.pop(), u = n.observerSlots.pop();
        s < l.length && (o.sourceSlots[u] = s, l[s] = o, n.observerSlots[s] = u);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Q(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function we(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function le(e) {
  throw e = we(e), e;
}
function ie(e, t) {
  return e ? e.context && e.context[t] !== void 0 ? e.context[t] : ie(e.owner, t) : void 0;
}
function K(e) {
  if (typeof e == "function" && !e.length)
    return K(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = K(e[n]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function Ae(e, t) {
  return function(s) {
    let l;
    return L(() => l = _(() => (h.context = {
      [e]: s.value
    }, ge(() => s.children))), void 0), l;
  };
}
const xe = Symbol("fallback");
function J(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function Se(e, t, n = {}) {
  let s = [], l = [], o = [], u = 0, i = t.length > 1 ? [] : null;
  return he(() => J(o)), () => {
    let c = e() || [], f, r;
    return c[ce], _(() => {
      let d = c.length, y, x, T, O, P, m, w, A, v;
      if (d === 0)
        u !== 0 && (J(o), o = [], s = [], l = [], u = 0, i && (i = [])), n.fallback && (s = [xe], l[0] = R((ue) => (o[0] = ue, n.fallback())), u = 1);
      else if (u === 0) {
        for (l = new Array(d), r = 0; r < d; r++)
          s[r] = c[r], l[r] = R(g);
        u = d;
      } else {
        for (T = new Array(d), O = new Array(d), i && (P = new Array(d)), m = 0, w = Math.min(u, d); m < w && s[m] === c[m]; m++)
          ;
        for (w = u - 1, A = d - 1; w >= m && A >= m && s[w] === c[A]; w--, A--)
          T[A] = l[w], O[A] = o[w], i && (P[A] = i[w]);
        for (y = /* @__PURE__ */ new Map(), x = new Array(A + 1), r = A; r >= m; r--)
          v = c[r], f = y.get(v), x[r] = f === void 0 ? -1 : f, y.set(v, r);
        for (f = m; f <= w; f++)
          v = s[f], r = y.get(v), r !== void 0 && r !== -1 ? (T[r] = l[f], O[r] = o[f], i && (P[r] = i[f]), r = x[r], y.set(v, r)) : o[f]();
        for (r = m; r < d; r++)
          r in T ? (l[r] = T[r], o[r] = O[r], i && (i[r] = P[r], i[r](r))) : l[r] = R(g);
        l = l.slice(0, u = d), s = c.slice(0);
      }
      return l;
    });
    function g(d) {
      if (o[r] = d, i) {
        const [y, x] = B(r);
        return i[r] = x, t(c[r], y);
      }
      return t(c[r]);
    }
  };
}
function M(e, t) {
  return _(() => e(t || {}));
}
function be(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return H(Se(() => e.each, e.children, t || void 0));
}
function Ce(e, t, n) {
  let s = n.length, l = t.length, o = s, u = 0, i = 0, c = t[l - 1].nextSibling, f = null;
  for (; u < l || i < o; ) {
    if (t[u] === n[i]) {
      u++, i++;
      continue;
    }
    for (; t[l - 1] === n[o - 1]; )
      l--, o--;
    if (l === u) {
      const r = o < s ? i ? n[i - 1].nextSibling : n[o - i] : c;
      for (; i < o; )
        e.insertBefore(n[i++], r);
    } else if (o === i)
      for (; u < l; )
        (!f || !f.has(t[u])) && t[u].remove(), u++;
    else if (t[u] === n[o - 1] && n[i] === t[l - 1]) {
      const r = t[--l].nextSibling;
      e.insertBefore(n[i++], t[u++].nextSibling), e.insertBefore(n[--o], r), t[l] = n[o];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let g = i;
        for (; g < o; )
          f.set(n[g], g++);
      }
      const r = f.get(t[u]);
      if (r != null)
        if (i < r && r < o) {
          let g = u, d = 1, y;
          for (; ++g < l && g < o && !((y = f.get(t[g])) == null || y !== r + d); )
            d++;
          if (d > r - i) {
            const x = t[u];
            for (; i < r; )
              e.insertBefore(n[i++], x);
          } else
            e.replaceChild(n[i++], t[u++]);
        } else
          u++;
      else
        t[u++].remove();
    }
  }
}
function ve(e, t, n, s = {}) {
  let l;
  return R((o) => {
    l = o, t === document ? e() : N(t, e(), t.firstChild ? null : void 0, n);
  }, s.owner), () => {
    l(), t.textContent = "";
  };
}
function W(e, t, n) {
  const s = document.createElement("template");
  s.innerHTML = e;
  let l = s.content.firstChild;
  return n && (l = l.firstChild), l;
}
function Ee(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function N(e, t, n, s) {
  if (n !== void 0 && !s && (s = []), typeof t != "function")
    return j(e, t, s, n);
  L((l) => j(e, t(), l, n), s);
}
function j(e, t, n, s, l) {
  for ($.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const o = typeof t, u = s !== void 0;
  if (e = u && n[0] && n[0].parentNode || e, o === "string" || o === "number") {
    if ($.context)
      return n;
    if (o === "number" && (t = t.toString()), u) {
      let i = n[0];
      i && i.nodeType === 3 ? i.data = t : i = document.createTextNode(t), n = E(e, n, s, i);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || o === "boolean") {
    if ($.context)
      return n;
    n = E(e, n, s);
  } else {
    if (o === "function")
      return L(() => {
        let i = t();
        for (; typeof i == "function"; )
          i = i();
        n = j(e, i, n, s);
      }), () => n;
    if (Array.isArray(t)) {
      const i = [], c = n && Array.isArray(n);
      if (V(i, t, n, l))
        return L(() => n = j(e, i, n, s, !0)), () => n;
      if ($.context) {
        if (!i.length)
          return n;
        for (let f = 0; f < i.length; f++)
          if (i[f].parentNode)
            return n = i;
      }
      if (i.length === 0) {
        if (n = E(e, n, s), u)
          return n;
      } else
        c ? n.length === 0 ? X(e, i, s) : Ce(e, n, i) : (n && E(e), X(e, i));
      n = i;
    } else if (t instanceof Node) {
      if ($.context && t.parentNode)
        return n = u ? [t] : t;
      if (Array.isArray(n)) {
        if (u)
          return n = E(e, n, s, t);
        E(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function V(e, t, n, s) {
  let l = !1;
  for (let o = 0, u = t.length; o < u; o++) {
    let i = t[o], c = n && n[o];
    if (i instanceof Node)
      e.push(i);
    else if (!(i == null || i === !0 || i === !1))
      if (Array.isArray(i))
        l = V(e, i, c) || l;
      else if (typeof i == "function")
        if (s) {
          for (; typeof i == "function"; )
            i = i();
          l = V(e, Array.isArray(i) ? i : [i], Array.isArray(c) ? c : [c]) || l;
        } else
          e.push(i), l = !0;
      else {
        const f = String(i);
        c && c.nodeType === 3 && c.data === f ? e.push(c) : e.push(document.createTextNode(f));
      }
  }
  return l;
}
function X(e, t, n = null) {
  for (let s = 0, l = t.length; s < l; s++)
    e.insertBefore(t[s], n);
}
function E(e, t, n, s) {
  if (n === void 0)
    return e.textContent = "";
  const l = s || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let u = t.length - 1; u >= 0; u--) {
      const i = t[u];
      if (l !== i) {
        const c = i.parentNode === e;
        !o && !u ? c ? e.replaceChild(l, i) : e.insertBefore(l, n) : c && i.remove();
      } else
        o = !0;
    }
  } else
    e.insertBefore(l, n);
  return [l];
}
const Ne = (e) => !!(e && e.nodeName && e.nodeType === 1), Te = (e) => Ne(e) ? e : typeof e == "string" ? document.querySelector(e) : document.createElement("div"), Y = (e) => {
  if (e instanceof Function)
    return e;
  {
    const t = document.createElement("div");
    return () => t;
  }
}, oe = de();
function $e(e) {
  const [t, n] = B(e.slots.headerSlot || null), [s, l] = B(e.slots.footerSlot || null), [o, u] = B(e.props.expand || !0), [i, c] = B(e.props.data || []), f = {
    headerSlot: {
      value: t,
      change: n
    },
    footerSlot: {
      value: s,
      change: l
    },
    expand: {
      value: o,
      change: (r) => u(r === !0 || r === !1 ? r : !o)
    },
    data: {
      value: i,
      change: (r) => c(r)
    }
  };
  return Object.keys(f).forEach((r) => {
    e.methods[`update${r}`] = f[r].change;
  }), M(oe.Provider, {
    value: f,
    get children() {
      return e.children;
    }
  });
}
function re() {
  return pe(oe);
}
const Be = /* @__PURE__ */ W('<ul class="cy-menu-list"></ul>'), Le = /* @__PURE__ */ W("<li></li>"), Me = () => {
  const {
    data: e
  } = re();
  return (() => {
    const t = Be.cloneNode(!0);
    return N(t, M(be, {
      get each() {
        return e.value();
      },
      children: (n) => (() => {
        const s = Le.cloneNode(!0);
        return N(s, () => n.title), s;
      })()
    })), t;
  })();
}, _e = /* @__PURE__ */ W("<div></div>"), Ie = (e) => {
  const {
    headerSlot: t,
    footerSlot: n,
    expand: s
  } = re();
  return (() => {
    const l = _e.cloneNode(!0);
    return N(
      l,
      () => Y(t)("123"),
      null
    ), N(l, M(Me, {
      get name() {
        return e.name;
      }
    }), null), N(l, Y(n), null), L(() => Ee(l, `cy-menu ${s.value() ? "cy-menu-expand" : "cy-menu-shrink"}`)), l;
  })();
};
const Oe = (e, t, n) => M($e, {
  props: e,
  slots: t,
  methods: n,
  get children() {
    return M(Ie, {});
  }
}), Pe = (e, t, n) => {
  const s = {}, l = ve(() => Oe(t, n, s), Te(e));
  return s.disposer = l, s;
};
export {
  Pe as renderApp
};
