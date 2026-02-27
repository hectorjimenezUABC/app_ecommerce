module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        // ❌ Quita el plugin de reanimated, ya no va aquí
    };
};