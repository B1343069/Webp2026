// 取得容器元素
const container = document.getElementById('container');

// 產生指定長度的隨機小寫英文字串的函式
function getRandomChars(length) {
    let result = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 2. window.onload 時：隨機產生 0 到 2 個字元
window.onload = function() {
    const initialCount = Math.floor(Math.random() * 3); // 產生 0, 1, 2
    container.innerHTML = getRandomChars(initialCount);
    container.focus(); // 讓頁面載入後自動聚焦，方便直接打字
};

// 4. keyup event 時的邏輯
window.addEventListener("keyup", function(e) {
    let currentStr = container.innerHTML;
    console.log("按下的鍵:", e.key);

    // 3. 如果按下的鍵和第一個字相等，消除該字元
    if (currentStr.length > 0 && e.key === currentStr[0]) {
        container.innerHTML = currentStr.substring(1); // 從第二個字開始保留
    }

    // 4. 隨機產生 1 到 3 個字元接在字串後
    const addCount = Math.floor(Math.random() * 3) + 1; // 產生 1, 2, 3
    container.innerHTML += getRandomChars(addCount);
});