document.addEventListener("DOMContentLoaded", () => {
    const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

    const resultEl = document.getElementById("result");
    const statusEl = document.getElementById("status");
    const loadButton = document.getElementById("loadButton");

    loadButton.addEventListener("click", () => {
        loadButton.disabled = true;
        loadButton.textContent = "載入中...";
        statusEl.textContent = "";
        resultEl.innerHTML = "";
        fetchData();
    });

    async function fetchData() {
        try {
            const response = await fetch(openUrl);
            if (!response.ok) {
                throw new Error("HTTP 錯誤：" + response.status);
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                statusEl.textContent = "回傳資料不是陣列格式。";
                return;
            }

            if (data.length === 0) {
                statusEl.textContent = "沒有資料。";
                return;
            }

            renderTable(data);
            statusEl.textContent = `共找到 ${data.length} 筆資料。`;
        } catch (error) {
            statusEl.textContent = "發生錯誤：" + error.message;
        } finally {
            loadButton.disabled = false;
            loadButton.textContent = "載入 API 資料";
        }
    }

    function renderTable(items) {
        const rows = items.map(item => {
            const title = item.title || item.name || "無標題";
            const info = Array.isArray(item.showInfo) && item.showInfo.length ? item.showInfo[0] : {};
            const location = info.locationName || info.location || item.address || "無地址";
            const price = info.price || item.charge || "無票價";

            return `
                <tr>
                    <td>${escapeHtml(title)}</td>
                    <td>${escapeHtml(location)}</td>
                    <td>${escapeHtml(price)}</td>
                </tr>`;
        }).join("");

        resultEl.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>地點</th>
                        <th>票價</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
});