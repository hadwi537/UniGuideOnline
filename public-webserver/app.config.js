module.exports = {
    apps: [{
        name: "public-webserver",
        script: "./src/App.js",
        watch: true,
        env: {
            "NODE_ENV": "development",
        },
        env_production : {
            "NODE_ENV": "production"
        }
    }]
}