# TODO - ex13 React OX Game

# 作業目標

使用 React Class Component 製作 OX 遊戲（Tic-Tac-Toe）。

參考老師投影片 page 32 ~ page 46。

---

# 老師投影片重點（必須實作）

根據投影片內容，以下功能必須存在：

## 1. React Class Component

必須使用：

```jsx
class Game extends React.Component
```

不可只用 function component 完成整份作業。

---

## 2. Component 拆分

投影片有：

* Game
* Board
* Square

因此必須拆成：

```txt
src/
├── App.js
├── Game.js
├── Board.js
└── Square.js
```

---

## 3. history 機制

投影片有提到：

```txt
history
stepNumber
```

因此 state 必須包含：

```js
this.state = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
};
```

---

## 4. handleClick(i)

投影片有：

```txt
handleClick
```

功能要求：

* 點擊棋盤
* 更新 squares
* 更新 history
* 切換玩家
* 已下過的位置不能再下
* 分出勝負後不能繼續下

---

## 5. jumpTo(step)

投影片有：

```txt
jumpTo
```

因此必須實作：

* 回到之前步數
* 更新：

  * stepNumber
  * xIsNext

---

## 6. Moves List

投影片有：

```txt
遊戲開始
回到第 X 步
```

因此畫面必須顯示：

```txt
遊戲開始
回到第1步
回到第2步
...
```

按下後能回到該步。

---

## 7. calculateWinner()

投影片有：

```txt
calculateWinner
```

因此必須：

* 檢查橫排
* 檢查直排
* 檢查對角線

並回傳：

```txt
X
O
null
```

---

# GitHub / 繳交要求

根據老師最後一頁：

---

## 專案名稱

必須為：

```txt
react_game
```

---

## GitHub 結構

必須：

```txt
ex13/
└── react_game/
```

不是：

```txt
react_game/
```

---

## 禁止上傳

不得包含：

```txt
node_modules/
build/
```

---

## 必須使用 .gitignore

`.gitignore` 必須包含：

```txt
node_modules
build
```

---

# 建立專案

## Step 1

建立 ex13：

```bash
mkdir ex13
cd ex13
```

---

## Step 2

建立 React 專案：

```bash
npx create-react-app react_game
```

---

## Step 3

進入專案：

```bash
cd react_game
```

---

## Step 4

啟動：

```bash
npm start
```

---

# React Component 規格

# Square.js

功能：

* 顯示單一格子
* 顯示 X/O
* 被點擊時呼叫 onClick

Props：

```js
value
onClick
```

Square 不可擁有自己的 state。

---

# Board.js

功能：

* 排列 9 個 Square
* 呼叫 renderSquare(i)

必須使用：

```js
this.props.squares
this.props.onClick
```

---

# Game.js

主控制元件。

負責：

* state
* history
* handleClick
* jumpTo
* winner 判定

---

# 必須實作的方法

# handleClick(i)

功能：

* 更新 squares
* 更新 history
* 更新 xIsNext

需要：

```js
slice()
concat()
setState()
```

---

# jumpTo(step)

功能：

* 回到指定步數

更新：

```js
stepNumber
xIsNext
```

---

# calculateWinner(squares)

檢查：

* 橫排
* 直排
* 對角線

回傳：

```txt
X
O
null
```

---

# App.js

只需要：

```jsx
import React from "react";
import Game from "./Game";

function App() {
  return <Game />;
}

export default App;
```

---

# 畫面需求

至少要有：

## 1. 3x3 棋盤

## 2. 顯示目前玩家

例如：

```txt
Next player: X
```

---

## 3. 顯示 Winner

例如：

```txt
Winner: O
```

---

## 4. Moves List

例如：

```txt
遊戲開始
回到第1步
回到第2步
```

---

# CSS

至少：

```css
.square {
  width: 60px;
  height: 60px;
  font-size: 24px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}
```

---

# 建議開發順序

1. 建立 React 專案
2. 建立 Square
3. 建立 Board
4. 建立 Game
5. 完成棋盤點擊
6. 完成 X/O 輪流
7. 完成 winner 判定
8. 完成 history
9. 完成 jumpTo
10. 完成 moves list
11. 加 CSS
12. 測試 npm start
13. push GitHub

---

# 最終提交前檢查

確認：

```bash
npm install
npm start
```

能正常執行。

---

# 禁止事項

不要：

* 上傳 node_modules
* 上傳 build
* 使用純 function component 完成整份作業
* 把 react_game 放錯層級
* 缺少 history / jumpTo 功能
