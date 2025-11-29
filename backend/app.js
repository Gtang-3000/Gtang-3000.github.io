const express = require("express");
const fetch = globalThis.fetch;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());  // 解決前端跨網域問題

// ESP32 IP
const ESP32_IP = ${{ secrets.ESP32_IP }}; // ← 改成你的 ESP32 IP

// 借雨傘 API
app.post("/api/borrow", async (req, res) => {
    console.log("收到借雨傘請求", req.body);

    try {
        // 呼叫 ESP32
        const response = await fetch(`${ESP32_IP}/api/borrow`, { method: "POST" });
        const data = await response.json();
        console.log("ESP32 回應:", data);

        res.json({status: "ok", message: "雨傘已解鎖"});
    } catch (err) {
        console.error("呼叫 ESP32 失敗", err);
        res.status(500).json({status: "error", message: "ESP32 未連線"});
    }
});

// 還雨傘 API
app.post("/api/return", async (req, res) => {
    console.log("收到還雨傘請求", req.body);

    try {
        const response = await fetch(`${ESP32_IP}/api/return`, { method: "POST" });
        const data = await response.json();
        console.log("ESP32 回應:", data);

        res.json({status: "ok", message: "雨傘已上鎖"});
    } catch (err) {
        console.error("呼叫 ESP32 失敗", err);
        res.status(500).json({status: "error", message: "ESP32 未連線"});
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Node.js 後端運行");
});
