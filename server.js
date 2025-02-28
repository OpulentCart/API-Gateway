const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

app.use(
    "/api/cart-items",
    createProxyMiddleware({
      target: "http://localhost:5007/cart-items", // Backend service for cart
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' prefix 
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying /api/cart-items request to backend at port 8002`);
      },
    })
  );

  app.use(
    "/api/vendors",
    createProxyMiddleware({
      target: "http://localhost:5002/vendors", // Backend service for vendors
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' prefix 
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying /api/vendors request to backend at port 8002`);
      },
    })
  );

  app.use(
    "/api/products",
    createProxyMiddleware({
      target: "http://localhost:5004/products", // Backend service for product
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' prefix 
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying /api/products request to backend at port 8002`);
      },
    })
  );

  app.use(
    "/api/notifications",
    createProxyMiddleware({
      target: "http://localhost:5008/notifications", // Backend service for notifications
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' prefix 
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying /api/notifications request to backend at port 8002`);
      },
    })
  );

// Start the API Gateway
const port = process.env.API_GATEWAY_PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 API Gateway running on port ${port}`);
});
