// src/main/frontend/src/setProxy.js
import API_URL from './contraints';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: API_URL,
            changeOrigin: true,
        })
    );
};