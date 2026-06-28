# 認証付きダッシュボードアプリ

ログイン機能を備えたWebアプリのフロントエンドです。

## 概要

ログイン・サインアップ・パスワードリセットができるアカウント機能と、ログイン後に表示されるダッシュボード画面を実装しています。

## デモ・スクリーンショット

- デモURL: [https://web-indol-three-20.vercel.app](https://web-indol-three-20.vercel.app)

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
├── login/        # ログイン画面
├── signup/       # サインアップ画面
└── reset/        # パスワードリセット画面
```

## 工夫した点・学んだこと

- ログイン前（`login` / `signup` / `reset`）とログイン後（`(menu)`）の画面をルートグループで分け、ログイン後の画面だけ共通のヘッダー・サイドメニューを表示するようにした
- Tailwind CSSで、ヘッダー・サイドメニュー・本文をflexboxで組み合わせたレイアウトを実装した
