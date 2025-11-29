
const NODEJS_IP = "http://192.168.56.1:3000";  // ← 改成 Node.js 所在電腦的 IP

function borrowUmbrella() {
    fetch(`${NODEJS_IP}/api/borrow`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({station: 1})
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert("前端呼叫 Node.js 失敗：" + err));
}

function returnUmbrella() {
    fetch(`${NODEJS_IP}/api/return`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({station: 1})
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert("前端呼叫 Node.js 失敗：" + err));
}

