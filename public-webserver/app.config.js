module.exports = {
    apps: [{
        name: "public-webserver",
        script: "npx",
        watch: true,
        env: {
            "NODE_ENV": "development",
            "PORT": 3001
        },
        env_production : {
            "NODE_ENV": "production",
            "PORT": 3000
        },
    }],
}