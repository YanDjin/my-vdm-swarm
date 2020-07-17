module.exports = {
    "devServer": {
        "port": 3000,
        "disableHostCheck": true,
        overlay: {
            warnings: false,
            errors: false
        }
    },
    lintOnSave: false,
    "transpileDependencies": [
        "vuetify"
    ]
}