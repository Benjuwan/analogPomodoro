## analog-pomodoro
- [analog-pomodoro](https://k2webservice.xsrv.jp/r0105/analog-pomodoro/)

## 概要
デジタルでアナログなポモドーロタイマー。ポモドーロタームを表す視覚画像（デフォルト：25分+5分）で直感的に把握できます。タスク開始と休憩開始時に通知（サウンド）が鳴ります。

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

## 技術構成
- @eslint/js@9.14.0
- @types/react-dom@18.3.1
- @types/react@18.3.12
- @vitejs/plugin-react@4.3.3
- eslint-plugin-react-hooks@5.0.0
- eslint-plugin-react-refresh@0.4.14
- eslint@9.14.0
- globals@15.11.0
- react-dom@18.3.1
- react@18.3.1
- recharts@2.13.3
- styled-components@6.1.13
- typescript-eslint@8.12.2
- typescript@5.6.3
- vite@5.4.10

## サウンドソース
- [Level Up #3 | universfield](https://pixabay.com/ja/users/universfield-28281460/)
- [Good! | Pixabay](https://pixabay.com/ja/users/pixabay-1/)

## 参考情報
[【JavaScript】Safari だけじゃないオーディオ再生の制約と再生開始遅延の解決方法](https://webfrontend.ninja/js-audio-autoplay-policy-and-delay/)