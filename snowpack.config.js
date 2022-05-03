/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        /* ... */
        // directory name: 'build directory'
        public: "/",
        src: "/dist",
    },
    alias: {
        "@app": "./src",
        components: "./src/components",
        styles: "./src/styles",
    },
    plugins: [
        "@snowpack/plugin-postcss",
        "@snowpack/plugin-react-refresh",
        "@snowpack/plugin-babel",
    ],
    routes: [
        /* Enable an SPA Fallback in development: */
        // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    // optimize: {
    //     treeshake: true,
    //     splitting: true,
    // },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        /* ... */
    },
};
