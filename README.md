## analog-pomodoro
- [analog-pomodoro](https://analog-pomodoro.netlify.app/)

## 概要
デジタルでアナログなポモドーロタイマー。ポモドーロタームを表す視覚画像（デフォルト：25分+5分）で直感的に把握できます。タスク開始と休憩開始時に通知（サウンド）が鳴ります。  
『Google』の「15分ルール」と合わせて使うとチーム開発でも生産性の向上が期待できる（かも？です）。

- ※複数ページを開いていて「ポモドーロタイマーページのタブが非アクティブな場合」通知機能が働かない場合があります。

---
- ポモドーロの切替：タスク開始
![pomodoro-next](https://github.com/user-attachments/assets/d5cb63e8-38f4-49fe-931f-5258d5faf19c)

- ポモドーロの切替：休憩開始
![pomodoro-break](https://github.com/user-attachments/assets/6a68087b-6af1-408a-ba4c-cc8643643d01)

- ポモドーロの切替：ポモドーロの終了
![pomodoro-done](https://github.com/user-attachments/assets/e32b0f8d-da59-4dcc-a583-33172b452403)

---

### ポモドーロとは
- その日に達成したい1つのタスクを細かく分割する
1. 分割した1つのタスクを**25分**間集中して行う
2. **5分**休憩を取る
3. 1と2を繰り返し、4ポモドーロ（2時間）ごとに15〜30分間の休憩を取る

## 技術構成
- @eslint/js@9.39.5
- @tailwindcss/vite@4.3.3
- @types/react-dom@19.3.0
- @types/react@19.3.0
- @typescript-eslint/eslint-plugin@8.72.1
- @typescript-eslint/parser@8.72.1
- @vitejs/plugin-react@5.2.0
- eslint-plugin-react-hooks@7.1.1
- eslint-plugin-react-refresh@0.5.7
- eslint-plugin-react@7.37.5
- eslint@9.39.5
- globals@17.13.0
- react-dom@19.3.1
- react@19.3.1
- recharts@3.10.1
- tailwindcss@4.3.3
- typescript-eslint@8.72.1
- typescript@6.0.3
- vite@8.3.5

### 脆弱性対応（overrides）
- **zod** (`^4.6.6`): `eslint-plugin-react-hooks` の間接依存における High 脆弱性（[GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)）を解消するために `package.json` の `overrides` でバージョンを固定適用しています。親パッケージが修正版に追従した際には `overrides` 設定の削除を検討してください。
- **minimatch**: `GHSA-g3hv-75wg-m249`（Moderate）について、ESLint 9 系との互換性（ESM default export 廃止による linter クラッシュ防止）のため、`overrides` は適用せず親パッケージ側の公式追従まで静観（現状維持）としています。

## サウンドソース
- [Level Up #3 | universfield](https://pixabay.com/ja/users/universfield-28281460/)
- [Good! | Pixabay](https://pixabay.com/ja/users/pixabay-1/)

## 参考情報
- [【JavaScript】Safari だけじゃないオーディオ再生の制約と再生開始遅延の解決方法](https://webfrontend.ninja/js-audio-autoplay-policy-and-delay/)
- [ReactでcreateContextとuseContextを同一ファイル内でexportすると警告が出る](https://iwb.jp/react-createcontext-usecontext-file-export-warning/#google_vignette)
