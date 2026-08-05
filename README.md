# 認証付きダッシュボードアプリ

ログイン機能を備えたWebアプリのフロントエンドです。

## 概要

ログイン・サインアップ・パスワードリセットができるアカウント機能と、ログイン後に表示されるダッシュボード画面を実装しています。

## デモ・スクリーンショット

- デモURL: [https://web-indol-three-20.vercel.app](https://web-indol-three-20.vercel.app)
- デモURL(独自ドメイン): [https://sun.te578.me](https://sun.te578.me)
- バックエンド: [portfolio-backend](https://github.com/te578/portfolio-backend)

<!-- 画面のスクリーンショットがあれば貼る -->

## 使用技術

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui

## 機能

- ログイン / サインアップ / パスワードリセット
- ダッシュボード表示
- ユーザーページ（アバター画像のプレビュー変更、名前・メールアドレス表示）
- 通信中のローディング表示（ボタンのスピナー、画面全体のオーバーレイ）

## セットアップ

```bash
npm install
```

## 起動方法

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## ディレクトリ構成

```text
app/
├── (menu)/       # ログイン後の画面（ヘッダー・サイドメニュー付き）
│   ├── dashboard/  # ダッシュボード
│   └── user/       # ユーザーページ
├── login/        # ログイン画面
├── signup/       # サインアップ画面
└── reset/        # パスワードリセット画面

components/
├── ui/           # shadcn/ui由来の共通部品
└── Loading.tsx   # 共通のローディング画面
```

## 工夫した点・学んだこと

- ログイン前（`login` / `signup` / `reset`）とログイン後（`(menu)`）の画面をルートグループで分け、ログイン後の画面だけ共通のヘッダー・サイドメニューを表示するようにした
- Tailwind CSSで、ヘッダー・サイドメニュー・本文をflexboxで組み合わせたレイアウトを実装した
- フォーム送信は`onSubmit` + `e.preventDefault()`方式を採用し、送信中は`isLoading`で入力・ボタンを無効化しつつスピナーを表示するようにした
