var container = document.getElementById('container');
var counter = 0; // 追蹤連續打錯的次數

// 初始化：網頁載入後先產生 3 個隨機字元
window.onload = function() {
    container.textContent = add_new_chars(3);
}

/**
 * 產生隨機小寫英文字串
 * @param {number} x - 欲產生的字元數量
 * @param {boolean} b - true: 隨機產 1 到 x 個字元; false: 固定產 x 個字元
 */
function add_new_chars(x, b = true) {
    var n = x;
    if (b) {
        n = Math.floor(Math.random() * x) + 1;
    }
    var str = '';
    for (let i = 0; i < n; i++) {
        // 產生 a-z (ASCII 97-122)
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return str;
};

// 監聽鍵盤放開事件
window.addEventListener("keyup", function(e) {
    // 取得畫面上目前的第一個字元
    var firstone = container.textContent.substring(0, 1);

    if (e.key === firstone) {
        // --- 情況 A：打對了 ---
        // 1. 移除第一個字 (消消樂)
        container.textContent = container.textContent.substring(1);
        // 2. 正常增加一段亂數 (原本的遊戲邏輯)
        container.textContent += add_new_chars(3);
        // 3. 重設打錯計數器
        counter = 0;
    } else {
        // --- 情況 B：打錯了 ---
        // 1. 將打錯的字加到字串末端
        container.textContent += e.key;
        // 2. 增加錯誤計數
        counter++;

        // 3. 判斷是否連續打錯三次
        if (counter >= 3) {
            // 題目要求：額外增加 3 個亂數產生的字串
            container.textContent += add_new_chars(3, false);
            // 4. 觸發後重設計數器，重新開始計算「連續」次數
            counter = 0;
        }
    }
});