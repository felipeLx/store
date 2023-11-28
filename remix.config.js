/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  tailwind: true,
  serverModuleFormat: 'cjs',
  browserNodeBuiltinsPolyfill: { modules: { crypto: true } },
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("about", "routes/marketing/about.tsx");
      route("privacy", "routes/marketing/privacy.tsx");
      route("tos", "routes/marketing/tos.tsx");
      route("buy", "routes/checkout/buy.tsx");
    })
  }
}
