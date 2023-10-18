const express = require("express");

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = 5000;

const TARGET_URL = "http://localhost:8080";

function authMiddleware(req, res, next) {
  next();
  // if (req.headers.authorization) {
  //   next();
  // } else {
  //   res.status(401).send("Unauthorized");
  // }
}

const proxyOptions = {
  target: TARGET_URL,

  changeOrigin: true,

  onProxyReq: (proxyReq, req, res) => {
    // This function can be used to modify proxy request headers, etc.
    console.log("Proxy Request");
  },
};

app.use(authMiddleware);

app.use("/", createProxyMiddleware(proxyOptions));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
