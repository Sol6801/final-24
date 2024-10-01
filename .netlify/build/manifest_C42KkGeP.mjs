import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'devalue';
import 'html-escaper';
import 'clsx';
import { g as decodeKey } from './chunks/astro/server_BAo5IgvU.mjs';
import { compile } from 'path-to-regexp';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/suga/Dev/final-24/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":"@media (max-width: 768px){.active-icon[data-astro-cid-ymhdp2rl] img[data-astro-cid-ymhdp2rl]{transform:translateY(-8px)}}\n"}],"routeData":{"route":"/alert","isIndex":false,"type":"page","pattern":"^\\/alert\\/?$","segments":[[{"content":"alert","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/alert.astro","pathname":"/alert","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.js","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.js","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.js","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/user/[userid]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/user\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}],[{"content":"userId","dynamic":true,"spread":false}]],"params":["userId"],"component":"src/pages/api/user/[userId].js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":".switch-container[data-astro-cid-tcsrer47]{position:fixed;display:flex;align-items:center;gap:10px;margin-top:1em;margin-left:1em;z-index:9999}.switch[data-astro-cid-tcsrer47]{position:relative;display:inline-flex;align-items:center;cursor:pointer}.switch[data-astro-cid-tcsrer47] input[data-astro-cid-tcsrer47]{opacity:0;width:0;height:0}.slider[data-astro-cid-tcsrer47]{position:relative;width:60px;height:34px;background:#ccc;border-radius:34px;transition:background-color .3s;display:flex;align-items:center;padding:2px}.slider[data-astro-cid-tcsrer47]:before{content:\"\";position:absolute;top:2px;left:2px;width:26px;height:26px;background:#fff;border-radius:50%;transition:transform .3s}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]{background:#4caf50}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]:before{transform:translate(26px)}.sun-moon-container[data-astro-cid-tcsrer47]{display:flex;align-items:center;gap:5px;color:#fff;font-size:24px}.sun[data-astro-cid-tcsrer47],.moon[data-astro-cid-tcsrer47]{flex-shrink:0}\n"}],"routeData":{"route":"/change-password","isIndex":false,"type":"page","pattern":"^\\/change-password\\/?$","segments":[[{"content":"change-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/change-password.astro","pathname":"/change-password","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":".slide-in{transition:max-height .5s ease-out,opacity .5s ease-out,transform .5s ease-out;max-height:0;opacity:0;transform:translateY(10px);overflow:hidden}.slide-in-open{max-height:400px;opacity:1;transform:translateY(0)}.message{margin-bottom:20px}.message.you{text-align:right}.message-info{display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px}.message-text{background-color:#e0e7ff;padding:10px;border-radius:5px;display:inline-block}.message.you .message-text{background-color:#b2c5ff}.message-image{max-width:150px;border-radius:10px}.input-container{display:flex;border-top:1px solid #ccc;padding-top:10px;margin-top:10px}.input-container input{flex:1;padding:10px;border:1px solid #ccc;border-radius:40px;margin-right:10px}.input-container button{padding:10px 20px;background-color:#4a6ef5;color:#fff;border:none;border-radius:40px;cursor:pointer}.input-container button:hover{background-color:#3b58c9}.app-container{display:flex;flex-direction:column;justify-content:space-between;min-height:100vh}.chat-wrapper{width:100%;max-width:600px;margin:0 auto}.user-info{display:flex;justify-content:space-between;margin-bottom:10px}.chat-box{flex-grow:1;overflow-y:auto;max-height:calc(100vh - 200px)}.message-container{display:flex;margin-bottom:10px}.message-content{display:flex;gap:10px;padding:10px;border-radius:10px}.sent{justify-content:flex-end}@media (min-width: 1024px){.chat-box{max-height:calc(100vh - 150px);padding-top:3em}}.received{justify-content:flex-start}.input-container{display:flex;gap:10px}\n@media (max-width: 768px){.active-icon[data-astro-cid-ymhdp2rl] img[data-astro-cid-ymhdp2rl]{transform:translateY(-8px)}}\n"}],"routeData":{"route":"/chat/[chatid]","isIndex":false,"type":"page","pattern":"^\\/chat\\/([^/]+?)\\/?$","segments":[[{"content":"chat","dynamic":false,"spread":false}],[{"content":"chatId","dynamic":true,"spread":false}]],"params":["chatId"],"component":"src/pages/chat/[chatId].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":".switch-container[data-astro-cid-tcsrer47]{position:fixed;display:flex;align-items:center;gap:10px;margin-top:1em;margin-left:1em;z-index:9999}.switch[data-astro-cid-tcsrer47]{position:relative;display:inline-flex;align-items:center;cursor:pointer}.switch[data-astro-cid-tcsrer47] input[data-astro-cid-tcsrer47]{opacity:0;width:0;height:0}.slider[data-astro-cid-tcsrer47]{position:relative;width:60px;height:34px;background:#ccc;border-radius:34px;transition:background-color .3s;display:flex;align-items:center;padding:2px}.slider[data-astro-cid-tcsrer47]:before{content:\"\";position:absolute;top:2px;left:2px;width:26px;height:26px;background:#fff;border-radius:50%;transition:transform .3s}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]{background:#4caf50}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]:before{transform:translate(26px)}.sun-moon-container[data-astro-cid-tcsrer47]{display:flex;align-items:center;gap:5px;color:#fff;font-size:24px}.sun[data-astro-cid-tcsrer47],.moon[data-astro-cid-tcsrer47]{flex-shrink:0}\n"}],"routeData":{"route":"/forgot-password","isIndex":false,"type":"page","pattern":"^\\/forgot-password\\/?$","segments":[[{"content":"forgot-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/forgot-password.astro","pathname":"/forgot-password","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":"@media (max-width: 768px){.active-icon[data-astro-cid-ymhdp2rl] img[data-astro-cid-ymhdp2rl]{transform:translateY(-8px)}}\n"}],"routeData":{"route":"/help","isIndex":false,"type":"page","pattern":"^\\/help\\/?$","segments":[[{"content":"help","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/help.astro","pathname":"/help","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":"@media (max-width: 768px){.active-icon[data-astro-cid-ymhdp2rl] img[data-astro-cid-ymhdp2rl]{transform:translateY(-8px)}}\n.switch-container[data-astro-cid-tcsrer47]{position:fixed;display:flex;align-items:center;gap:10px;margin-top:1em;margin-left:1em;z-index:9999}.switch[data-astro-cid-tcsrer47]{position:relative;display:inline-flex;align-items:center;cursor:pointer}.switch[data-astro-cid-tcsrer47] input[data-astro-cid-tcsrer47]{opacity:0;width:0;height:0}.slider[data-astro-cid-tcsrer47]{position:relative;width:60px;height:34px;background:#ccc;border-radius:34px;transition:background-color .3s;display:flex;align-items:center;padding:2px}.slider[data-astro-cid-tcsrer47]:before{content:\"\";position:absolute;top:2px;left:2px;width:26px;height:26px;background:#fff;border-radius:50%;transition:transform .3s}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]{background:#4caf50}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]:before{transform:translate(26px)}.sun-moon-container[data-astro-cid-tcsrer47]{display:flex;align-items:center;gap:5px;color:#fff;font-size:24px}.sun[data-astro-cid-tcsrer47],.moon[data-astro-cid-tcsrer47]{flex-shrink:0}\n.slide-in{transition:max-height .5s ease-out,opacity .5s ease-out,transform .5s ease-out;max-height:0;opacity:0;transform:translateY(10px);overflow:hidden}.slide-in-open{max-height:400px;opacity:1;transform:translateY(0)}.message{margin-bottom:20px}.message.you{text-align:right}.message-info{display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px}.message-text{background-color:#e0e7ff;padding:10px;border-radius:5px;display:inline-block}.message.you .message-text{background-color:#b2c5ff}.message-image{max-width:150px;border-radius:10px}.input-container{display:flex;border-top:1px solid #ccc;padding-top:10px;margin-top:10px}.input-container input{flex:1;padding:10px;border:1px solid #ccc;border-radius:40px;margin-right:10px}.input-container button{padding:10px 20px;background-color:#4a6ef5;color:#fff;border:none;border-radius:40px;cursor:pointer}.input-container button:hover{background-color:#3b58c9}.app-container{display:flex;flex-direction:column;justify-content:space-between;min-height:100vh}.chat-wrapper{width:100%;max-width:600px;margin:0 auto}.user-info{display:flex;justify-content:space-between;margin-bottom:10px}.chat-box{flex-grow:1;overflow-y:auto;max-height:calc(100vh - 200px)}.message-container{display:flex;margin-bottom:10px}.message-content{display:flex;gap:10px;padding:10px;border-radius:10px}.sent{justify-content:flex-end}@media (min-width: 1024px){.chat-box{max-height:calc(100vh - 150px);padding-top:3em}}.received{justify-content:flex-start}.input-container{display:flex;gap:10px}\n"}],"routeData":{"route":"/home","isIndex":false,"type":"page","pattern":"^\\/home\\/?$","segments":[[{"content":"home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/home.astro","pathname":"/home","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.querySelectorAll(\"button\"),a=async o=>{o.preventDefault();const n=o.target.id,t=await fetch(`/api/user/${userId}`,{method:\"PUT\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({communityId:n})}),e=await t.json();t.ok?window.location.assign(\"/home\"):console.error(\"Error:\",e)};s.forEach(o=>{o.addEventListener(\"click\",a)});\n"}],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"}],"routeData":{"route":"/join-community","isIndex":false,"type":"page","pattern":"^\\/join-community\\/?$","segments":[[{"content":"join-community","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/join-community.astro","pathname":"/join-community","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":"@media (max-width: 768px){.active-icon[data-astro-cid-ymhdp2rl] img[data-astro-cid-ymhdp2rl]{transform:translateY(-8px)}}\n"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":"@media (max-width: 768px){.active-icon[data-astro-cid-ymhdp2rl] img[data-astro-cid-ymhdp2rl]{transform:translateY(-8px)}}\n"}],"routeData":{"route":"/reports","isIndex":false,"type":"page","pattern":"^\\/reports\\/?$","segments":[[{"content":"reports","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reports.astro","pathname":"/reports","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"}],"routeData":{"route":"/terms-and-conditions","isIndex":false,"type":"page","pattern":"^\\/terms-and-conditions\\/?$","segments":[[{"content":"terms-and-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-and-conditions.astro","pathname":"/terms-and-conditions","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"}],"routeData":{"route":"/user-created","isIndex":false,"type":"page","pattern":"^\\/user-created\\/?$","segments":[[{"content":"user-created","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/user-created.astro","pathname":"/user-created","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":".switch-container[data-astro-cid-tcsrer47]{position:fixed;display:flex;align-items:center;gap:10px;margin-top:1em;margin-left:1em;z-index:9999}.switch[data-astro-cid-tcsrer47]{position:relative;display:inline-flex;align-items:center;cursor:pointer}.switch[data-astro-cid-tcsrer47] input[data-astro-cid-tcsrer47]{opacity:0;width:0;height:0}.slider[data-astro-cid-tcsrer47]{position:relative;width:60px;height:34px;background:#ccc;border-radius:34px;transition:background-color .3s;display:flex;align-items:center;padding:2px}.slider[data-astro-cid-tcsrer47]:before{content:\"\";position:absolute;top:2px;left:2px;width:26px;height:26px;background:#fff;border-radius:50%;transition:transform .3s}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]{background:#4caf50}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]:before{transform:translate(26px)}.sun-moon-container[data-astro-cid-tcsrer47]{display:flex;align-items:center;gap:5px;color:#fff;font-size:24px}.sun[data-astro-cid-tcsrer47],.moon[data-astro-cid-tcsrer47]{flex-shrink:0}\n"}],"routeData":{"route":"/welcome","isIndex":false,"type":"page","pattern":"^\\/welcome\\/?$","segments":[[{"content":"welcome","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/welcome.astro","pathname":"/welcome","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BZ-5DomP.js"}],"styles":[{"type":"external","src":"/_astro/alert.DBp2lP_u.css"},{"type":"inline","content":".switch-container[data-astro-cid-tcsrer47]{position:fixed;display:flex;align-items:center;gap:10px;margin-top:1em;margin-left:1em;z-index:9999}.switch[data-astro-cid-tcsrer47]{position:relative;display:inline-flex;align-items:center;cursor:pointer}.switch[data-astro-cid-tcsrer47] input[data-astro-cid-tcsrer47]{opacity:0;width:0;height:0}.slider[data-astro-cid-tcsrer47]{position:relative;width:60px;height:34px;background:#ccc;border-radius:34px;transition:background-color .3s;display:flex;align-items:center;padding:2px}.slider[data-astro-cid-tcsrer47]:before{content:\"\";position:absolute;top:2px;left:2px;width:26px;height:26px;background:#fff;border-radius:50%;transition:transform .3s}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]{background:#4caf50}input[data-astro-cid-tcsrer47]:checked+.slider[data-astro-cid-tcsrer47]:before{transform:translate(26px)}.sun-moon-container[data-astro-cid-tcsrer47]{display:flex;align-items:center;gap:5px;color:#fff;font-size:24px}.sun[data-astro-cid-tcsrer47],.moon[data-astro-cid-tcsrer47]{flex-shrink:0}\n.flag-image[data-astro-cid-fb4xz3fc]{position:absolute;width:4rem;height:auto;left:1em;top:50%;transform:translateY(-90%) rotate(25deg);opacity:.6;z-index:-1}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/suga/Dev/final-24/src/pages/alert.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/change-password.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/chat/[chatId].astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/forgot-password.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/help.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/home.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/join-community.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/reports.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/terms-and-conditions.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/user-created.astro",{"propagation":"none","containsHead":true}],["/home/suga/Dev/final-24/src/pages/welcome.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/alert@_@astro":"pages/alert.astro.mjs","\u0000@astro-page:src/pages/api/auth/register@_@js":"pages/api/auth/register.astro.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@js":"pages/api/auth/signin.astro.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@js":"pages/api/auth/signout.astro.mjs","\u0000@astro-page:src/pages/api/user/[userId]@_@js":"pages/api/user/_userid_.astro.mjs","\u0000@astro-page:src/pages/change-password@_@astro":"pages/change-password.astro.mjs","\u0000@astro-page:src/pages/chat/[chatId]@_@astro":"pages/chat/_chatid_.astro.mjs","\u0000@astro-page:src/pages/forgot-password@_@astro":"pages/forgot-password.astro.mjs","\u0000@astro-page:src/pages/help@_@astro":"pages/help.astro.mjs","\u0000@astro-page:src/pages/home@_@astro":"pages/home.astro.mjs","\u0000@astro-page:src/pages/join-community@_@astro":"pages/join-community.astro.mjs","\u0000@astro-page:src/pages/profile@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/reports@_@astro":"pages/reports.astro.mjs","\u0000@astro-page:src/pages/terms-and-conditions@_@astro":"pages/terms-and-conditions.astro.mjs","\u0000@astro-page:src/pages/user-created@_@astro":"pages/user-created.astro.mjs","\u0000@astro-page:src/pages/welcome@_@astro":"pages/welcome.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C42KkGeP.mjs","/home/suga/Dev/final-24/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.BZ-5DomP.js","/astro/hoisted.js?q=0":"_astro/hoisted.CB3j0rDj.js","/home/suga/Dev/final-24/src/components/AlertButton.jsx":"_astro/AlertButton.CBGZCzlS.js","@/components/EmergencyMenu":"_astro/EmergencyMenu.wpQwmDEL.js","@astrojs/react/client.js":"_astro/client.BY2mA-CD.js","@/components/ChatApp.jsx":"_astro/ChatApp.DJkDmUhz.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/alert.DBp2lP_u.css","/_astro/AlertButton.CBGZCzlS.js","/_astro/ChatApp.DJkDmUhz.js","/_astro/EmergencyMenu.wpQwmDEL.js","/_astro/_chatId_.DgeaTziX.css","/_astro/client.BBHKR2b6.js","/_astro/client.BY2mA-CD.js","/_astro/hoisted.BZ-5DomP.js","/_astro/index.B52nOzfP.js","/_astro/jsx-runtime.CRkqtJS5.js","/scripts/alertModal.js","/scripts/changePasswordVerify.js","/scripts/joinCommunity.js","/scripts/loginModal.js","/scripts/modal.js","/scripts/toggleDarkMode.js","/assets/audio/siren.mp3","/assets/icons/alarm-icon.webp","/assets/icons/chat-icon.webp","/assets/icons/eye-icon.svg","/assets/icons/eye-slash-icon.svg","/assets/icons/help-icon.webp","/assets/icons/home.webp","/assets/icons/login-icon.webp","/assets/icons/logout-icon.webp","/assets/icons/profile-icon.webp","/assets/icons/registration-icon.webp","/assets/icons/report-icon.webp","/assets/img/Flag_of_Argentina.webp","/assets/img/apple.webp","/assets/img/argentina.webp","/assets/img/argentina2.webp","/assets/img/arrow-back.webp","/assets/img/change-password.webp","/assets/img/fb.webp","/assets/img/google.webp","/assets/img/logo-global-learning.webp","/assets/img/logo-integrar.webp","/assets/img/logo.webp","/assets/img/moon.webp","/assets/img/reset-password.webp"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"A8SDeTMOQ5mJucoLDI/1zMoEi/NZ57fN/daErU+DKkw=","experimentalEnvGetSecretEnabled":false});

export { manifest };