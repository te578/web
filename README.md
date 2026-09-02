# 認証付きダッシュボードアプリ

## 目次

- [認証付きダッシュボードアプリ](#認証付きダッシュボードアプリ)
  - [目次](#目次)
  - [プロジェクトについて](#プロジェクトについて)
  - [使用技術](#使用技術)
  - [環境構築](#環境構築)
  - [機能](#機能)
  - [ディレクトリ構造](#ディレクトリ構造)
  - [コマンド一覧](#コマンド一覧)
  - [工夫した点・学んだこと](#工夫した点学んだこと)

## プロジェクトについて

ログイン機能を備えたWebアプリのフロントエンドです。ログイン・サインアップ・パスワードリセットができるアカウント機能と、ログイン後に表示されるダッシュボード画面を実装しています。

- フロント: [https://sun.te578.me](https://sun.te578.me)
- バックエンド: [portfolio-backend](https://github.com/te578/portfolio-backend)

## 使用技術

| ツール | 用途 |
| --- | --- |
| [Next.js](https://nextjs.org/) 16 (App Router) | フレームワーク |
| [React](https://react.dev/) 19 | UIライブラリ |
| [TypeScript](https://www.typescriptlang.org/) | 型付け |
| [Tailwind CSS](https://tailwindcss.com/) 4 | スタイリング |
| [shadcn/ui](https://ui.shadcn.com/) | 共通UIコンポーネント |

## 環境構築

1. リポジトリをクローンする

```bash
git clone https://github.com/te578/web
```

2. パッケージをインストールする

```bash
npm install
```

3. 環境変数を設定する

接続先バックエンドに応じて、以下のいずれかのファイルを用意する。

| ファイル | 用途 |
| --- | --- |
| `.env.local-backend` | ローカルで動かしているバックエンド(`localhost:8080`)に接続する場合 |
| `.env.staging-backend` | ステージング環境(ECS上のバックエンド)に接続する場合 |

4. 開発サーバーを起動する

```bash
npm run dev:local     # ローカルバックエンドに接続
npm run dev:staging   # ステージング環境に接続
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 機能

- ログイン / サインアップ / パスワードリセット(メール送信APIと連携、新しいパスワードの設定まで対応)
- ダッシュボード表示
- ユーザーページ(アバター画像のプレビュー変更、名前・メールアドレス表示)
- 通信中のローディング表示(ボタンのスピナー、画面全体のオーバーレイ)

## ディレクトリ構造

```text
app/
├── (menu)/       # ログイン後の画面(ヘッダー・サイドメニュー付き)
│   ├── dashboard/  # ダッシュボード
│   └── user/       # ユーザーページ
├── login/        # ログイン画面
├── signup/       # サインアップ画面
├── reset/        # パスワードリセット画面
│   └── confirm/    # 新しいパスワード入力画面
└── api/auth/     # BFF用のRoute Handler(ブラウザとバックエンドの間を中継)

components/
├── ui/           # shadcn/ui由来の共通部品
└── Loading.tsx   # 共通のローディング画面

lib/
├── apiclient.ts  # ブラウザからBFF(Route Handler)を呼ぶ処理
├── apibackend.ts # サーバー同士でバックエンドAPIを呼ぶ処理
└── authToken.ts  # アクセストークンをメモリ上に保持する処理
```

## コマンド一覧

| コマンド | 説明 |
| --- | --- |
| `dev` | 開発サーバーを起動する |
| `dev:local` | ローカルバックエンド(`localhost:8080`)に接続して開発サーバーを起動する |
| `dev:staging` | ステージング環境(ECS)のバックエンドに接続して開発サーバーを起動する |
| `build` | 本番用にビルドする |
| `start` | ビルド済みのアプリを起動する |
| `lint` | ESLintでコードを検証する |

## 工夫した点・学んだこと

- ログイン前(`login` / `signup` / `reset`)とログイン後(`(menu)`)の画面をルートグループで分け、ログイン後の画面だけ共通のヘッダー・サイドメニューを表示するようにした
- Tailwind CSSで、ヘッダー・サイドメニュー・本文をflexboxで組み合わせたレイアウトを実装した
- フォーム送信は`onSubmit` + `e.preventDefault()`方式を採用し、送信中は`isLoading`で入力・ボタンを無効化しつつスピナーを表示するようにした
- ログインAPIはBFF(Backend For Frontend)構成にし、ブラウザから直接バックエンドを叩かず、Next.jsのRoute Handler(`app/api/auth/login`)を経由するようにした
- アクセストークンはメモリ上のみで保持し、リフレッシュトークンはhttpOnly Cookieにすることで、XSSによるトークン漏洩リスクを下げた
