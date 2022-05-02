// module.exports = (app) => {
//     app.use((_, res, next) => {
//       res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//       res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//       next();
//     });
//   };

  // next.config.js
module.exports = {
  async headers() {
    // asdasd
   return [
     {
       source: '/',
       headers: [
         { key: 'Access-Control-Allow-Origin', value: '*' },
         { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
         { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
         { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' }
       ]
     }
   ]
 }
}