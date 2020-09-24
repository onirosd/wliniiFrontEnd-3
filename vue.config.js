module.exports = {
    // ...
    // publicPath: process.env.NODE_ENV === 'production' ? '/Front/' : '/',
    publicPath: '/',
    assetsDir: './',
    runtimeCompiler: true,
    css: {
        loaderOptions: {
           css: {
              url: false,
             }
         }
     }
};