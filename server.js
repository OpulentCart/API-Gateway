const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// Define microservices
const services = {
  auth: "http://localhost:8000",
  //order: "http://localhost:5002",
  //payment: "http://localhost:5003",
  cart: "http://localhost:5007",  // ✅ Cart service running on 5007
  vendor: "http://localhost:5005",
  product: "http://localhost:5006",
};

app.use(
    "/api/cart-items",
    createProxyMiddleware({
      target: "http://localhost:5007/cart-items", // Backend service for chat
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' prefix before forwarding to chat backend
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying /api/cart-items request to backend at port 8002`);
      },
    })
  );
// Start the API Gateway
const port = process.env.API_GATEWAY_PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 API Gateway running on port ${port}`);
});
