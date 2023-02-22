const T = {};
function Oe(e) {
  T.context = e;
}
const Be = (e, t) => e === t, je = Symbol("solid-track"), Z = {
  equals: Be
};
let ge = $e;
const K = 1, z = 2, ye = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var b = null;
let R = null, w = null, x = null, O = null, ue = 0;
function Y(e, t) {
  const n = w, s = b, l = e.length === 0, i = l ? ye : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t || s
  }, u = l ? e : () => e(() => V(() => ae(i)));
  b = i, w = null;
  try {
    return J(u, !0);
  } finally {
    w = n, b = s;
  }
}
function m(e, t) {
  t = t ? Object.assign({}, Z, t) : Z;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, s = (l) => (typeof l == "function" && (l = l(n.value)), _e(n, l));
  return [me.bind(n), s];
}
function B(e, t, n) {
  const s = ce(e, t, !1, K);
  X(s);
}
function He(e, t, n) {
  ge = Ve;
  const s = ce(e, t, !1, K);
  s.user = !0, O ? O.push(s) : X(s);
}
function U(e, t, n) {
  n = n ? Object.assign({}, Z, n) : Z;
  const s = ce(e, t, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = n.equals || void 0, X(s), me.bind(s);
}
function V(e) {
  const t = w;
  w = null;
  try {
    return e();
  } finally {
    w = t;
  }
}
function Ke(e) {
  return b === null || (b.cleanups === null ? b.cleanups = [e] : b.cleanups.push(e)), e;
}
function Re(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: Qe(n),
    defaultValue: e
  };
}
function Ue(e) {
  let t;
  return (t = xe(b, e.id)) !== void 0 ? t : e.defaultValue;
}
function qe(e) {
  const t = U(e), n = U(() => oe(t()));
  return n.toArray = () => {
    const s = n();
    return Array.isArray(s) ? s : s != null ? [s] : [];
  }, n;
}
function me() {
  const e = R;
  if (this.sources && (this.state || e))
    if (this.state === K || e)
      X(this);
    else {
      const t = x;
      x = null, J(() => ee(this), !1), x = t;
    }
  if (w) {
    const t = this.observers ? this.observers.length : 0;
    w.sources ? (w.sources.push(this), w.sourceSlots.push(t)) : (w.sources = [this], w.sourceSlots = [t]), this.observers ? (this.observers.push(w), this.observerSlots.push(w.sources.length - 1)) : (this.observers = [w], this.observerSlots = [w.sources.length - 1]);
  }
  return this.value;
}
function _e(e, t, n) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, t)) && (e.value = t, e.observers && e.observers.length && J(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const i = e.observers[l], u = R && R.running;
      u && R.disposed.has(i), (u && !i.tState || !u && !i.state) && (i.pure ? x.push(i) : O.push(i), i.observers && we(i)), u || (i.state = K);
    }
    if (x.length > 1e6)
      throw x = [], new Error();
  }, !1)), t;
}
function X(e) {
  if (!e.fn)
    return;
  ae(e);
  const t = b, n = w, s = ue;
  w = b = e, Fe(e, e.value, s), w = n, b = t;
}
function Fe(e, t, n) {
  let s;
  try {
    s = e.fn(t);
  } catch (l) {
    e.pure && (e.state = K), be(l);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? _e(e, s) : e.value = s, e.updatedAt = n);
}
function ce(e, t, n, s = K, l) {
  const i = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: b,
    context: null,
    pure: n
  };
  return b === null || b !== ye && (b.owned ? b.owned.push(i) : b.owned = [i]), i;
}
function D(e) {
  const t = R;
  if (e.state === 0 || t)
    return;
  if (e.state === z || t)
    return ee(e);
  if (e.suspense && V(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ue); )
    (e.state || t) && n.push(e);
  for (let s = n.length - 1; s >= 0; s--)
    if (e = n[s], e.state === K || t)
      X(e);
    else if (e.state === z || t) {
      const l = x;
      x = null, J(() => ee(e, n[0]), !1), x = l;
    }
}
function J(e, t) {
  if (x)
    return e();
  let n = !1;
  t || (x = []), O ? n = !0 : O = [], ue++;
  try {
    const s = e();
    return Ge(n), s;
  } catch (s) {
    x || (O = null), be(s);
  }
}
function Ge(e) {
  if (x && ($e(x), x = null), e)
    return;
  const t = O;
  O = null, t.length && J(() => ge(t), !1);
}
function $e(e) {
  for (let t = 0; t < e.length; t++)
    D(e[t]);
}
function Ve(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? e[n++] = s : D(s);
  }
  for (T.context && Oe(), t = 0; t < n; t++)
    D(e[t]);
}
function ee(e, t) {
  const n = R;
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const l = e.sources[s];
    l.sources && (l.state === K || n ? l !== t && D(l) : (l.state === z || n) && ee(l, t));
  }
}
function we(e) {
  const t = R;
  for (let n = 0; n < e.observers.length; n += 1) {
    const s = e.observers[n];
    (!s.state || t) && (s.state = z, s.pure ? x.push(s) : O.push(s), s.observers && we(s));
  }
}
function ae(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), s = e.sourceSlots.pop(), l = n.observers;
      if (l && l.length) {
        const i = l.pop(), u = n.observerSlots.pop();
        s < l.length && (i.sourceSlots[u] = s, l[s] = i, n.observerSlots[s] = u);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      ae(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function We(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function be(e) {
  throw e = We(e), e;
}
function xe(e, t) {
  return e ? e.context && e.context[t] !== void 0 ? e.context[t] : xe(e.owner, t) : void 0;
}
function oe(e) {
  if (typeof e == "function" && !e.length)
    return oe(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = oe(e[n]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function Qe(e, t) {
  return function(s) {
    let l;
    return B(() => l = V(() => (b.context = {
      [e]: s.value
    }, qe(() => s.children))), void 0), l;
  };
}
const Xe = Symbol("fallback");
function he(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function Je(e, t, n = {}) {
  let s = [], l = [], i = [], u = 0, o = t.length > 1 ? [] : null;
  return Ke(() => he(i)), () => {
    let c = e() || [], f, r;
    return c[je], V(() => {
      let a = c.length, v, g, p, P, L, S, A, C, h;
      if (a === 0)
        u !== 0 && (he(i), i = [], s = [], l = [], u = 0, o && (o = [])), n.fallback && (s = [Xe], l[0] = Y((_) => (i[0] = _, n.fallback())), u = 1);
      else if (u === 0) {
        for (l = new Array(a), r = 0; r < a; r++)
          s[r] = c[r], l[r] = Y(y);
        u = a;
      } else {
        for (p = new Array(a), P = new Array(a), o && (L = new Array(a)), S = 0, A = Math.min(u, a); S < A && s[S] === c[S]; S++)
          ;
        for (A = u - 1, C = a - 1; A >= S && C >= S && s[A] === c[C]; A--, C--)
          p[C] = l[A], P[C] = i[A], o && (L[C] = o[A]);
        for (v = /* @__PURE__ */ new Map(), g = new Array(C + 1), r = C; r >= S; r--)
          h = c[r], f = v.get(h), g[r] = f === void 0 ? -1 : f, v.set(h, r);
        for (f = S; f <= A; f++)
          h = s[f], r = v.get(h), r !== void 0 && r !== -1 ? (p[r] = l[f], P[r] = i[f], o && (L[r] = o[f]), r = g[r], v.set(h, r)) : i[f]();
        for (r = S; r < a; r++)
          r in p ? (l[r] = p[r], i[r] = P[r], o && (o[r] = L[r], o[r](r))) : l[r] = Y(y);
        l = l.slice(0, u = a), s = c.slice(0);
      }
      return l;
    });
    function y(a) {
      if (i[r] = a, o) {
        const [v, g] = m(r);
        return o[r] = g, t(c[r], v);
      }
      return t(c[r]);
    }
  };
}
function j(e, t) {
  return V(() => e(t || {}));
}
function Ye(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return U(Je(() => e.each, e.children, t || void 0));
}
function Ze(e, t, n) {
  let s = n.length, l = t.length, i = s, u = 0, o = 0, c = t[l - 1].nextSibling, f = null;
  for (; u < l || o < i; ) {
    if (t[u] === n[o]) {
      u++, o++;
      continue;
    }
    for (; t[l - 1] === n[i - 1]; )
      l--, i--;
    if (l === u) {
      const r = i < s ? o ? n[o - 1].nextSibling : n[i - o] : c;
      for (; o < i; )
        e.insertBefore(n[o++], r);
    } else if (i === o)
      for (; u < l; )
        (!f || !f.has(t[u])) && t[u].remove(), u++;
    else if (t[u] === n[i - 1] && n[o] === t[l - 1]) {
      const r = t[--l].nextSibling;
      e.insertBefore(n[o++], t[u++].nextSibling), e.insertBefore(n[--i], r), t[l] = n[i];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let y = o;
        for (; y < i; )
          f.set(n[y], y++);
      }
      const r = f.get(t[u]);
      if (r != null)
        if (o < r && r < i) {
          let y = u, a = 1, v;
          for (; ++y < l && y < i && !((v = f.get(t[y])) == null || v !== r + a); )
            a++;
          if (a > r - o) {
            const g = t[u];
            for (; o < r; )
              e.insertBefore(n[o++], g);
          } else
            e.replaceChild(n[o++], t[u++]);
        } else
          u++;
      else
        t[u++].remove();
    }
  }
}
const ve = "_$DX_DELEGATE";
function ze(e, t, n, s = {}) {
  let l;
  return Y((i) => {
    l = i, t === document ? e() : N(t, e(), t.firstChild ? null : void 0, n);
  }, s.owner), () => {
    l(), t.textContent = "";
  };
}
function k(e, t, n) {
  const s = document.createElement("template");
  s.innerHTML = e;
  let l = s.content.firstChild;
  return n && (l = l.firstChild), l;
}
function De(e, t = window.document) {
  const n = t[ve] || (t[ve] = /* @__PURE__ */ new Set());
  for (let s = 0, l = e.length; s < l; s++) {
    const i = e[s];
    n.has(i) || (n.add(i), t.addEventListener(i, et));
  }
}
function Se(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Q(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function Ae(e, t, n) {
  return V(() => e(t, n));
}
function N(e, t, n, s) {
  if (n !== void 0 && !s && (s = []), typeof t != "function")
    return te(e, t, s, n);
  B((l) => te(e, t(), l, n), s);
}
function et(e) {
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
  }), T.registry && !T.done && (T.done = !0, document.querySelectorAll("[id^=pl-]").forEach((s) => s.remove())); n !== null; ) {
    const s = n[t];
    if (s && !n.disabled) {
      const l = n[`${t}Data`];
      if (l !== void 0 ? s.call(n, l, e) : s.call(n, e), e.cancelBubble)
        return;
    }
    n = n.host && n.host !== n && n.host instanceof Node ? n.host : n.parentNode;
  }
}
function te(e, t, n, s, l) {
  for (T.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const i = typeof t, u = s !== void 0;
  if (e = u && n[0] && n[0].parentNode || e, i === "string" || i === "number") {
    if (T.context)
      return n;
    if (i === "number" && (t = t.toString()), u) {
      let o = n[0];
      o && o.nodeType === 3 ? o.data = t : o = document.createTextNode(t), n = G(e, n, s, o);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || i === "boolean") {
    if (T.context)
      return n;
    n = G(e, n, s);
  } else {
    if (i === "function")
      return B(() => {
        let o = t();
        for (; typeof o == "function"; )
          o = o();
        n = te(e, o, n, s);
      }), () => n;
    if (Array.isArray(t)) {
      const o = [], c = n && Array.isArray(n);
      if (ie(o, t, n, l))
        return B(() => n = te(e, o, n, s, !0)), () => n;
      if (T.context) {
        if (!o.length)
          return n;
        for (let f = 0; f < o.length; f++)
          if (o[f].parentNode)
            return n = o;
      }
      if (o.length === 0) {
        if (n = G(e, n, s), u)
          return n;
      } else
        c ? n.length === 0 ? pe(e, o, s) : Ze(e, n, o) : (n && G(e), pe(e, o));
      n = o;
    } else if (t instanceof Node) {
      if (T.context && t.parentNode)
        return n = u ? [t] : t;
      if (Array.isArray(n)) {
        if (u)
          return n = G(e, n, s, t);
        G(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function ie(e, t, n, s) {
  let l = !1;
  for (let i = 0, u = t.length; i < u; i++) {
    let o = t[i], c = n && n[i];
    if (o instanceof Node)
      e.push(o);
    else if (!(o == null || o === !0 || o === !1))
      if (Array.isArray(o))
        l = ie(e, o, c) || l;
      else if (typeof o == "function")
        if (s) {
          for (; typeof o == "function"; )
            o = o();
          l = ie(e, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || l;
        } else
          e.push(o), l = !0;
      else {
        const f = String(o);
        c && c.nodeType === 3 && c.data === f ? e.push(c) : e.push(document.createTextNode(f));
      }
  }
  return l;
}
function pe(e, t, n = null) {
  for (let s = 0, l = t.length; s < l; s++)
    e.insertBefore(t[s], n);
}
function G(e, t, n, s) {
  if (n === void 0)
    return e.textContent = "";
  const l = s || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let u = t.length - 1; u >= 0; u--) {
      const o = t[u];
      if (l !== o) {
        const c = o.parentNode === e;
        !i && !u ? c ? e.replaceChild(l, o) : e.insertBefore(l, n) : c && o.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(l, n);
  return [l];
}
const tt = (e) => !!(e && e.nodeName && e.nodeType === 1), nt = (e) => tt(e) ? e : typeof e == "string" ? document.querySelector(e) : document.createElement("div"), ne = (e) => {
  if (e instanceof Function)
    return e;
  {
    const t = document.createElement("div");
    return () => t;
  }
}, re = (e = [], t = 0, n = "children", s = "key", l = []) => {
  const i = [];
  return !e || e.length < 1 ? [] : (e.forEach((u) => {
    const o = [...l, u[s]], c = Object.assign(u, { level: t, parentKeyList: o });
    u[n] && (c[n] = re(u[n], t + 1, n, s, o)), i.push(c);
  }), i);
}, Pe = (e = [], t = [], n, s, l = []) => (e.forEach((i) => {
  t.includes(i[n]) && l.push(i), i[s] && i[s].length && Pe(i[s], t, n, s, l);
}), l), Ce = Re();
function st(e) {
  const [t, n] = m(e.slots.headerSlot || null), [s, l] = m(e.slots.footerSlot || null), [i, u] = m(e.slots.menuSlot || null), [o, c] = m(e.slots.menuIconSlot || null), [f, r] = m(e.props.activeMenu || null), [y, a] = m([]), [v, g] = m(e.props.footerHeight || "0"), [p, P] = m(e.props.expand || !0), [L, S] = m(e.props.unique || !0), [A, C] = m(e.props.data || []), [h, _] = m(e.props.labelProp || "label"), [d, $] = m(e.props.keyProp || "key"), [E, H] = m(e.props.childProp || "children"), [W, I] = m(e.props.openKeys || []), [se, de] = m([]), [Me, Ne] = m(e.props.height || "100%"), [Le, ke] = m(e.props.width || "240px"), [Te, Ie] = m(e.props.alwaysPopover || !1);
  C(() => [...re(A(), 0, E(), d())]);
  const q = {
    headerSlot: {
      value: t,
      change: n
    },
    footerSlot: {
      value: s,
      change: l
    },
    menuSlot: {
      value: i,
      change: u
    },
    menuIconSlot: {
      value: o,
      change: c
    },
    activeMenu: {
      value: f,
      change: r
    },
    activeList: {
      value: y,
      change: a
    },
    footerHeight: {
      value: v,
      change: g
    },
    expand: {
      value: p,
      change: (M) => P(M === !0 || M === !1 ? M : !p)
    },
    unique: {
      value: L,
      change: S
    },
    data: {
      value: A,
      change: (M) => {
        const F = re(M, 0, E(), d());
        C(() => [...F]);
      }
    },
    labelProp: {
      value: h,
      change: _
    },
    keyProp: {
      value: d,
      change: $
    },
    childProp: {
      value: E,
      change: H
    },
    openKeys: {
      value: W,
      change: I
    },
    openMenus: {
      value: se,
      change: de
    },
    height: {
      value: Me,
      change: Ne
    },
    width: {
      value: Le,
      change: ke
    },
    alwaysPopover: {
      value: Te,
      change: Ie
    },
    onMenuClick: e.props.onMenuClick
  };
  return Object.keys(q).forEach((M) => {
    if (q[M] instanceof Object) {
      const F = M.slice(0, 1).toLocaleUpperCase() + M.slice(1);
      e.methods[`update${F}`] = q[M].change, e.methods[`get${F}`] = q[M].value;
    }
  }), He(() => {
    const M = W(), F = Pe(q.data.value(), M, d(), E());
    de(() => F);
  }), j(Ce.Provider, {
    value: q,
    get children() {
      return e.children;
    }
  });
}
function Ee() {
  return Ue(Ce);
}
const lt = /* @__PURE__ */ k('<div class="cy-menu-item-popover"></div>'), ot = /* @__PURE__ */ k('<div class="cy-menu-popover-arrow"></div>'), it = /* @__PURE__ */ k('<div class="cy-menu-popover-content"></div>'), rt = /* @__PURE__ */ k('<div class="cy-menu-popover-name"></div>'), ut = (e) => {
  let t = null;
  const [n, s] = m(!1), l = 6, [i, u] = m({
    stopClose: !1,
    x: 0,
    y: 0,
    gap: l
  }), o = (r, y) => {
    if (e.disabled)
      return;
    if (y === "leave") {
      u(() => ({
        ...i(),
        stopClose: !1
      })), c(!1);
      return;
    }
    const {
      right: a,
      top: v
    } = r.target.getBoundingClientRect(), g = {
      x: a,
      y: v,
      stopClose: !0,
      gap: i().gap
    };
    if (u(() => ({
      ...g
    })), !t)
      return;
    const p = t.offsetHeight + v - window.screen.height;
    if (p > 0) {
      const L = v - p < 0;
      u(() => ({
        ...i(),
        y: L ? 0 : v - p,
        gap: L ? l + v : l + p
      }));
    } else
      u(() => ({
        ...i(),
        gap: l
      }));
  }, c = (r) => {
    if (!e.disabled) {
      if (!r) {
        setTimeout(() => {
          i().stopClose || s(() => r);
        }, 200);
        return;
      }
      s(() => r);
    }
  }, f = (r) => {
    e.disabled || (u(() => ({
      ...i(),
      stopClose: r
    })), r || c(!1));
  };
  return e.ref({
    changePopover: c,
    setMouseEvent: o
  }), (() => {
    const r = lt.cloneNode(!0);
    r.addEventListener("mouseleave", () => f(!1)), r.addEventListener("mouseenter", () => f(!0));
    const y = t;
    return typeof y == "function" ? Ae(y, r) : t = r, N(r, (() => {
      const a = U(() => !!(n() && !e.disabled));
      return () => a() ? [ot.cloneNode(!0), (() => {
        const v = it.cloneNode(!0);
        return N(v, (() => {
          const g = U(() => !!e.childList);
          return () => g() ? j(fe, {
            isPopover: !0,
            get list() {
              return e.childList;
            }
          }) : (() => {
            const p = rt.cloneNode(!0);
            return N(p, () => e.name), p;
          })();
        })()), v;
      })()] : [];
    })()), B((a) => {
      const v = le(i().x), g = le(i().y), p = le(i().gap);
      return v !== a._v$ && r.style.setProperty("--cy-menu-x", a._v$ = v), g !== a._v$2 && r.style.setProperty("--cy-menu-y", a._v$2 = g), p !== a._v$3 && r.style.setProperty("--cy-menu-popover-gap", a._v$3 = p), a;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0
    }), r;
  })();
}, le = (e) => typeof e != "number" ? e : `${e}px`, ct = /* @__PURE__ */ k("<li><div></div></li>"), at = /* @__PURE__ */ k('<div class="cy-menu-item-icon"></div>'), ft = /* @__PURE__ */ k('<div class="cy-menu-item-label"></div>'), dt = /* @__PURE__ */ k('<div class="cy-menu-item-arrow"><svg width="100%" height="100%" viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="#787878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'), ht = /* @__PURE__ */ k("<div></div>"), vt = (e) => {
  const {
    expand: t,
    unique: n,
    openKeys: s,
    openMenus: l,
    activeList: i,
    activeMenu: u,
    keyProp: o,
    labelProp: c,
    childProp: f,
    menuSlot: r,
    menuIconSlot: y,
    alwaysPopover: a,
    onMenuClick: v
  } = Ee(), g = e.data.children && e.data.children.length > 0 ? e.data.children : null;
  let p = null;
  const P = (h) => {
    if (v(h), g || (u.change(() => u.value() instanceof Object ? h : h[o.value()]), i.change(() => h.parentKeyList)), !g || e.isPopover)
      return;
    const _ = {
      ...h,
      level: e.level
    }, d = h[o.value()];
    if (n.value()) {
      const H = l.value().find((I) => I[o.value()] === d), W = l.value().findIndex((I) => I.level === e.level);
      if (H) {
        s.change(() => [...s.value()].filter((I) => I !== h[o.value()]));
        return;
      }
      if (W > -1) {
        const I = l.value()[W];
        s.change(() => [_[o.value()]].concat(s.value().filter((se) => se !== I[o.value()])));
        return;
      }
      s.change(() => [...s.value(), d]);
      return;
    }
    const $ = s.value(), E = $.findIndex((H) => H === d);
    E > -1 ? $.splice(E, 1) : $.push(d), s.change(() => [...$]);
  }, L = (h) => {
    const _ = h[o.value()];
    return s.value().findIndex((E) => E === _) > -1;
  }, S = (h, _) => {
    !C(h) || (p.changePopover(h), p.setMouseEvent(_, h ? "enter" : "leave"));
  }, A = (h) => {
    const _ = h[o.value()], d = u.value() instanceof Object ? u.value()[o.value()] : u.value();
    return _ === d || i.value().includes(h[o.value()]);
  }, C = (h) => {
    if (h === !1)
      return !0;
    if (!p)
      return !1;
    const _ = e.isPopover, d = a.value();
    if (h === !0) {
      if (d)
        return !0;
      if (L(e.data) || t.value() || !g && _)
        return !1;
    }
    return !0;
  };
  return (() => {
    const h = ct.cloneNode(!0), _ = h.firstChild;
    return _.addEventListener("mouseleave", (d) => S(!1, d)), _.addEventListener("mouseenter", (d) => S(!0, d)), _.$$click = () => P(e.data), N(_, (() => {
      const d = U(() => !!r.value());
      return () => d() ? ne(r.value())(e.data) : [(() => {
        const $ = at.cloneNode(!0);
        return N($, (() => {
          const E = U(() => !!y.value());
          return () => E() ? ne(r.value())(e.data) : "";
        })()), $;
      })(), (() => {
        const $ = ft.cloneNode(!0);
        return N($, () => e.data[c.value()]), $;
      })(), g ? dt.cloneNode(!0) : []];
    })()), N(h, g ? (() => {
      const d = ht.cloneNode(!0);
      return N(d, j(fe, {
        get list() {
          return e.data[f.value()];
        },
        get level() {
          return e.level + 1;
        }
      })), B(() => Q(d, `cy-menu-item-child-list ${s.value().includes(e.data[o.value()]) ? "cy-menu-item-child-list-open" : ""}`)), d;
    })() : null, null), N(h, j(ut, {
      ref(d) {
        const $ = p;
        typeof $ == "function" ? $(d) : p = d;
      },
      get name() {
        return e.data[c.value()];
      },
      childList: g,
      get disabled() {
        return e.level > 0;
      }
    }), null), B((d) => {
      const $ = `cy-menu-item ${L(e.data) ? "cy-menu-item-expand" : ""} ${A(e.data) ? "cy-menu-item-active" : ""}`, E = e.level, H = `cy-menu-item-box  ${L(e.data) ? "cy-menu-item-box-expand" : ""}`;
      return $ !== d._v$ && Q(h, d._v$ = $), E !== d._v$2 && Se(h, "data-level", d._v$2 = E), H !== d._v$3 && Q(_, d._v$3 = H), d;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0
    }), h;
  })();
};
De(["click"]);
const pt = /* @__PURE__ */ k("<ul></ul>"), fe = (e) => (() => {
  const t = pt.cloneNode(!0);
  return N(t, j(Ye, {
    get each() {
      return e.list;
    },
    children: (n) => j(vt, {
      data: n,
      get level() {
        return e.level;
      },
      get isPopover() {
        return e.isPopover;
      }
    })
  })), B((n) => {
    const s = `cy-menu-list ${e.isContent ? "cy-menu-content-list" : ""} ${e.isPopover ? "cy-menu-popover-list" : ""}`, l = e.isPopover ? null : e.level;
    return s !== n._v$ && Q(t, n._v$ = s), l !== n._v$2 && Se(t, "data-level", n._v$2 = l), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), gt = /* @__PURE__ */ k('<div><div class="cy-menu-header"></div><div class="cy-menu-footer"></div></div>'), yt = () => {
  const {
    headerSlot: e,
    footerSlot: t,
    expand: n,
    data: s,
    height: l,
    width: i,
    footerHeight: u
  } = Ee();
  let o = {};
  return (() => {
    const c = gt.cloneNode(!0), f = c.firstChild, r = f.nextSibling, y = o;
    return typeof y == "function" ? Ae(y, c) : o = c, N(
      f,
      () => ne(e.value())("header")
    ), N(c, j(fe, {
      isContent: !0,
      get list() {
        return s.value();
      },
      level: 0
    }), r), N(
      r,
      () => ne(t.value())("footer")
    ), B((a) => {
      const v = `cy-menu cy-menu-container ${n.value() ? "cy-menu-expand" : "cy-menu-shrink"} cy-menu-theme-blue`, g = l.value(), p = i.value(), P = u.value();
      return v !== a._v$ && Q(c, a._v$ = v), g !== a._v$2 && c.style.setProperty("--cy-menu-height", a._v$2 = g), p !== a._v$3 && c.style.setProperty("--cy-menu-width", a._v$3 = p), P !== a._v$4 && c.style.setProperty("--cy-menu-footer-height", a._v$4 = P), a;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), c;
  })();
};
const mt = (e = {
  data: [],
  expand: !1
}, t = {}, n = {}) => j(st, {
  props: e,
  slots: t,
  methods: n,
  get children() {
    return j(yt, {});
  }
}), _t = (e, t, n) => {
  const s = {}, l = ze(
    () => mt(
      t,
      n,
      s
    ),
    nt(e)
  );
  return s.disposer = l, s;
};
export {
  _t as renderApp
};
