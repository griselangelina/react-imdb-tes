define('./workbox-468c4d03.js', ['exports'], function (e) {
  'use strict';
  try {
    // eslint-disable-next-line no-undef
    self['workbox:core:5.1.3'] && _();
    // eslint-disable-next-line no-empty
  } catch (e) {}
  const t = {
      googleAnalytics: 'googleAnalytics',
      precache: 'precache-v2',
      prefix: 'workbox',
      runtime: 'runtime',
      // eslint-disable-next-line no-undef
      suffix: 'undefined' != typeof registration ? registration.scope : '',
    },
    n = (e) => [t.prefix, e, t.suffix].filter((e) => e && e.length > 0).join('-'),
    s = (e) => e || n(t.precache),
    i = (e) => new URL(String(e), location.href).href.replace(new RegExp('^' + location.origin), ''),
    c = (e, ...t) => {
      let n = e;
      return t.length > 0 && (n += ' :: ' + JSON.stringify(t)), n;
    };
  class o extends Error {
    constructor(e, t) {
      super(c(e, t)), (this.name = e), (this.details = t);
    }
  }
  const r = new Set();
  const a = (e, t) => e.filter((e) => t in e),
    u = async ({ request: e, mode: t, plugins: n = [] }) => {
      const s = a(n, 'cacheKeyWillBeUsed');
      let i = e;
      for (const e of s)
        (i = await e.cacheKeyWillBeUsed.call(e, { mode: t, request: i })), 'string' == typeof i && (i = new Request(i));
      return i;
    },
    l = async ({ cacheName: e, request: t, event: n, matchOptions: s, plugins: i = [] }) => {
      const c = await self.caches.open(e),
        o = await u({ plugins: i, request: t, mode: 'read' });
      let r = await c.match(o, s);
      for (const t of i)
        if ('cachedResponseWillBeUsed' in t) {
          const i = t.cachedResponseWillBeUsed;
          r = await i.call(t, { cacheName: e, event: n, matchOptions: s, cachedResponse: r, request: o });
        }
      return r;
    },
    h = async ({ cacheName: e, request: t, response: n, event: s, plugins: c = [], matchOptions: h }) => {
      const f = await u({ plugins: c, request: t, mode: 'write' });
      if (!n) throw new o('cache-put-with-no-response', { url: i(f.url) });
      const w = await (async ({ request: e, response: t, event: n, plugins: s = [] }) => {
        let i = t,
          c = !1;
        for (const t of s)
          if ('cacheWillUpdate' in t) {
            c = !0;
            const s = t.cacheWillUpdate;
            if (((i = await s.call(t, { request: e, response: i, event: n })), !i)) break;
          }
        return c || (i = i && 200 === i.status ? i : void 0), i || null;
      })({ event: s, plugins: c, response: n, request: f });
      if (!w) return;
      const d = await self.caches.open(e),
        p = a(c, 'cacheDidUpdate'),
        y = p.length > 0 ? await l({ cacheName: e, matchOptions: h, request: f }) : null;
      try {
        await d.put(f, w);
      } catch (e) {
        throw (
          ('QuotaExceededError' === e.name &&
            (await (async function () {
              for (const e of r) await e();
            })()),
          e)
        );
      }
      for (const t of p)
        await t.cacheDidUpdate.call(t, { cacheName: e, event: s, oldResponse: y, newResponse: w, request: f });
    },
    f = async ({ request: e, fetchOptions: t, event: n, plugins: s = [] }) => {
      // eslint-disable-next-line no-undef
      if (('string' == typeof e && (e = new Request(e)), n instanceof FetchEvent && n.preloadResponse)) {
        const e = await n.preloadResponse;
        if (e) return e;
      }
      const i = a(s, 'fetchDidFail'),
        c = i.length > 0 ? e.clone() : null;
      try {
        for (const t of s)
          if ('requestWillFetch' in t) {
            const s = t.requestWillFetch,
              i = e.clone();
            e = await s.call(t, { request: i, event: n });
          }
      } catch (e) {
        throw new o('plugin-error-request-will-fetch', { thrownError: e });
      }
      const r = e.clone();
      try {
        let i;
        i = 'navigate' === e.mode ? await fetch(e) : await fetch(e, t);
        for (const e of s)
          'fetchDidSucceed' in e && (i = await e.fetchDidSucceed.call(e, { event: n, request: r, response: i }));
        return i;
      } catch (e) {
        for (const t of i)
          await t.fetchDidFail.call(t, { error: e, event: n, originalRequest: c.clone(), request: r.clone() });
        throw e;
      }
    };
  let w;
  async function d(e, t) {
    const n = e.clone(),
      s = { headers: new Headers(n.headers), status: n.status, statusText: n.statusText },
      i = t ? t(s) : s,
      c = (function () {
        if (void 0 === w) {
          const e = new Response('');
          if ('body' in e)
            try {
              new Response(e.body), (w = !0);
            } catch (e) {
              w = !1;
            }
          w = !1;
        }
        return w;
      })()
        ? n.body
        : await n.blob();
    return new Response(c, i);
  }
  try {
    // eslint-disable-next-line no-undef
    self['workbox:precaching:5.1.3'] && _();
    // eslint-disable-next-line no-empty
  } catch (e) {}
  function p(e) {
    if (!e) throw new o('add-to-cache-list-unexpected-type', { entry: e });
    if ('string' == typeof e) {
      const t = new URL(e, location.href);
      return { cacheKey: t.href, url: t.href };
    }
    const { revision: t, url: n } = e;
    if (!n) throw new o('add-to-cache-list-unexpected-type', { entry: e });
    if (!t) {
      const e = new URL(n, location.href);
      return { cacheKey: e.href, url: e.href };
    }
    const s = new URL(n, location.href),
      i = new URL(n, location.href);
    return s.searchParams.set('__WB_REVISION__', t), { cacheKey: s.href, url: i.href };
  }
  class y {
    constructor(e) {
      (this.t = s(e)), (this.s = new Map()), (this.i = new Map()), (this.o = new Map());
    }
    addToCacheList(e) {
      const t = [];
      for (const n of e) {
        'string' == typeof n ? t.push(n) : n && void 0 === n.revision && t.push(n.url);
        const { cacheKey: e, url: s } = p(n),
          i = 'string' != typeof n && n.revision ? 'reload' : 'default';
        if (this.s.has(s) && this.s.get(s) !== e)
          throw new o('add-to-cache-list-conflicting-entries', { firstEntry: this.s.get(s), secondEntry: e });
        if ('string' != typeof n && n.integrity) {
          if (this.o.has(e) && this.o.get(e) !== n.integrity)
            throw new o('add-to-cache-list-conflicting-integrities', { url: s });
          this.o.set(e, n.integrity);
        }
        if ((this.s.set(s, e), this.i.set(s, i), t.length > 0)) {
          const e = `Workbox is precaching URLs without revision info: ${t.join(
            ', ',
          )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
          console.warn(e);
        }
      }
    }
    async install({ event: e, plugins: t } = {}) {
      const n = [],
        s = [],
        i = await self.caches.open(this.t),
        c = await i.keys(),
        o = new Set(c.map((e) => e.url));
      for (const [e, t] of this.s) o.has(t) ? s.push(e) : n.push({ cacheKey: t, url: e });
      const r = n.map(({ cacheKey: n, url: s }) => {
        const i = this.o.get(n),
          c = this.i.get(s);
        return this.u({ cacheKey: n, cacheMode: c, event: e, integrity: i, plugins: t, url: s });
      });
      return await Promise.all(r), { updatedURLs: n.map((e) => e.url), notUpdatedURLs: s };
    }
    async activate() {
      const e = await self.caches.open(this.t),
        t = await e.keys(),
        n = new Set(this.s.values()),
        s = [];
      for (const i of t) n.has(i.url) || (await e.delete(i), s.push(i.url));
      return { deletedURLs: s };
    }
    async u({ cacheKey: e, url: t, cacheMode: n, event: s, plugins: i, integrity: c }) {
      const r = new Request(t, { integrity: c, cache: n, credentials: 'same-origin' });
      let a,
        u = await f({ event: s, plugins: i, request: r });
      for (const e of i || []) 'cacheWillUpdate' in e && (a = e);
      if (!(a ? await a.cacheWillUpdate({ event: s, request: r, response: u }) : u.status < 400))
        throw new o('bad-precaching-response', { url: t, status: u.status });
      u.redirected && (u = await d(u)),
        await h({
          event: s,
          plugins: i,
          response: u,
          request: e === t ? r : new Request(e),
          cacheName: this.t,
          matchOptions: { ignoreSearch: !0 },
        });
    }
    getURLsToCacheKeys() {
      return this.s;
    }
    getCachedURLs() {
      return [...this.s.keys()];
    }
    getCacheKeyForURL(e) {
      const t = new URL(e, location.href);
      return this.s.get(t.href);
    }
    async matchPrecache(e) {
      const t = e instanceof Request ? e.url : e,
        n = this.getCacheKeyForURL(t);
      if (n) {
        return (await self.caches.open(this.t)).match(n);
      }
    }
    createHandler(e = !0) {
      return async ({ request: t }) => {
        try {
          const e = await this.matchPrecache(t);
          if (e) return e;
          throw new o('missing-precache-entry', { cacheName: this.t, url: t instanceof Request ? t.url : t });
        } catch (n) {
          if (e) return fetch(t);
          throw n;
        }
      };
    }
    createHandlerBoundToURL(e, t = !0) {
      if (!this.getCacheKeyForURL(e)) throw new o('non-precached-url', { url: e });
      const n = this.createHandler(t),
        s = new Request(e);
      return () => n({ request: s });
    }
  }
  let g;
  const R = () => (g || (g = new y()), g);
  const q = (e, t) => {
    const n = R().getURLsToCacheKeys();
    for (const s of (function* (
      e,
      { ignoreURLParametersMatching: t, directoryIndex: n, cleanURLs: s, urlManipulation: i } = {},
    ) {
      const c = new URL(e, location.href);
      (c.hash = ''), yield c.href;
      const o = (function (e, t = []) {
        for (const n of [...e.searchParams.keys()]) t.some((e) => e.test(n)) && e.searchParams.delete(n);
        return e;
      })(c, t);
      if ((yield o.href, n && o.pathname.endsWith('/'))) {
        const e = new URL(o.href);
        (e.pathname += n), yield e.href;
      }
      if (s) {
        const e = new URL(o.href);
        (e.pathname += '.html'), yield e.href;
      }
      if (i) {
        const e = i({ url: c });
        for (const t of e) yield t.href;
      }
    })(e, t)) {
      const e = n.get(s);
      if (e) return e;
    }
  };
  let U = !1;
  function m(e) {
    U ||
      ((({
        ignoreURLParametersMatching: e = [/^utm_/],
        directoryIndex: t = 'index.html',
        cleanURLs: n = !0,
        urlManipulation: i,
      } = {}) => {
        const c = s();
        self.addEventListener('fetch', (s) => {
          const o = q(s.request.url, {
            cleanURLs: n,
            directoryIndex: t,
            ignoreURLParametersMatching: e,
            urlManipulation: i,
          });
          if (!o) return;
          let r = self.caches
            .open(c)
            .then((e) => e.match(o))
            .then((e) => e || fetch(o));
          s.respondWith(r);
        });
      })(e),
      (U = !0));
  }
  const v = [],
    L = {
      get: () => v,
      add(e) {
        v.push(...e);
      },
    },
    x = (e) => {
      const t = R(),
        n = L.get();
      e.waitUntil(
        t.install({ event: e, plugins: n }).catch((e) => {
          throw e;
        }),
      );
    },
    K = (e) => {
      const t = R();
      e.waitUntil(t.activate());
    };
  (e.clientsClaim = function () {
    self.addEventListener('activate', () => self.clients.claim());
  }),
    (e.precacheAndRoute = function (e, t) {
      !(function (e) {
        R().addToCacheList(e),
          e.length > 0 && (self.addEventListener('install', x), self.addEventListener('activate', K));
      })(e),
        m(t);
    }),
    (e.skipWaiting = function () {
      self.addEventListener('install', () => self.skipWaiting());
    });
});
