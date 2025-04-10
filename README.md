## analog-pomodoro
- [analog-pomodoro](https://analog-pomodoro.netlify.app/)

## 概要
デジタルでアナログなポモドーロタイマー。ポモドーロタームを表す視覚画像（デフォルト：25分+5分）で直感的に把握できます。タスク開始と休憩開始時に通知（サウンド）が鳴ります。<br>『Google』の「15分ルール」と合わせて使うとチーム開発でも生産性の向上が期待できる（かも？です）。

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
- @eslint/js@9.24.0
- @tailwindcss/vite@4.1.3
- @types/react-dom@18.3.6
- @types/react@18.3.20
- @vitejs/plugin-react@1.3.2
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.19
- eslint@9.24.0
- globals@15.15.0
- react-dom@18.3.1
- react@18.3.1
- recharts@2.15.2
- tailwindcss@4.1.3
- typescript-eslint@8.29.1
- typescript@5.6.3
- vite@6.2.6

## サウンドソース
- [Level Up #3 | universfield](https://pixabay.com/ja/users/universfield-28281460/)
- [Good! | Pixabay](https://pixabay.com/ja/users/pixabay-1/)

## 参考情報
- [【JavaScript】Safari だけじゃないオーディオ再生の制約と再生開始遅延の解決方法](https://webfrontend.ninja/js-audio-autoplay-policy-and-delay/)
- [ReactでcreateContextとuseContextを同一ファイル内でexportすると警告が出る](https://iwb.jp/react-createcontext-usecontext-file-export-warning/#google_vignette)

## 備忘録

> [!NOTE]  
> 当リポジトリ自体をデプロイ先とリンクさせている