## analog-pomodoro
- [analog-pomodoro](https://k2webservice.xsrv.jp/r0105/analog-pomodoro/)

## 概要
アナログ時計なポモドーロタイマー。30分間を表す半月状の視覚画像（25分+5分）で直感的に把握できます。タスク開始と休憩開始時に通知（サウンド）が鳴ります。

### ポモドーロとは
- その日に達成したい1つのタスクを細かく分割する
1. 分割した1つのタスクを**25分**間集中して行う
2. **5分**休憩を取る
3. 1と2を繰り返し、4ポモドーロ（2時間）ごとに15〜30分間の休憩を取る

## ビルド時の注意
- `vite.config.ts`
`base`部分を有効化してビルドする。

```diff
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
+  base: 'r0105/analog-pomodoro'
})
```

## サウンドソース
- [Level Up #3 | universfield](https://pixabay.com/ja/users/universfield-28281460/)
- [Good! | Pixabay](https://pixabay.com/ja/users/pixabay-1/)