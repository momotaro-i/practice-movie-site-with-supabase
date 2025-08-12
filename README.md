# Next.js × mantine × styled component テンプレート

## 目次

- [目次](#目次)
- [主な使用技術](#主な使用技術)
- [開発環境構築](#開発環境構築)
- [環境変数](#環境変数)
- [コマンド一覧](#コマンド一覧)
- [ディレクトリ構成](#ディレクトリ構成)
- [案件別の初期設定](#案件別の初期設定)
- [使用サンプルについて](#使用サンプルについて)
- [styled-components の Mixin 使用方法](#styled-components-の-mixin-使用方法)
- [その他](#その他)

## 主な使用技術

### 🖥️ フロントエンドフレームワーク

- ![Next.js](https://img.shields.io/badge/Next.js-15.3.3-000000?logo=next.js)
- ![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
- ![React DOM](https://img.shields.io/badge/React--DOM-19.x-61DAFB?logo=react)

ページルーター（Page Router）を使用

### 🎨 スタイリング

- ![Mantine](https://img.shields.io/badge/Mantine-8.x-06B6D4?logo=mantine)  
  使用パッケージ：

  - `@mantine/core`
  - `@mantine/hooks`
  - `@mantine/form`

- ![Sass](https://img.shields.io/badge/Sass-1.89.1-CC6699?logo=sass)
- ![styled-components](https://img.shields.io/badge/styled--components-6.1.18-DB7093?logo=styled-components)

### 🧰 状態管理

- ![Zustand](https://img.shields.io/badge/Zustand-5.x-000000?logo=react)  
  https://zustand.docs.pmnd.rs/getting-started/introduction

### 📦 その他ライブラリ

- `dayjs`(日付処理)

## 開発環境構築

```bash
git clone http://gitlab.dande-lion.net/yuzawaren/nextjs_template.git
cd your-repo
yarn install
yarn run dev
```

## 環境変数

プロジェクトの環境変数は `.env.development` `.env.test` `.env.staging` `.env.prod` の 4 種類があります。  
適切な環境変数ファイルを使用して、以下のように設定してください。

### **🛠 環境別の.env**

| ファイル           | 用途                 | 使用されるスクリプト  |
| ------------------ | -------------------- | --------------------- |
| `.env.development` | **ローカル開発環境** | `yarn run dev`        |
| `.env.test`        | **テスト環境**       | `yarn run build:test` |
| `.env.staging`     | **ステージング環境** | `yarn run build:stg`  |
| `.env.prod`        | **本番環境**         | `yarn run build:prod` |

## コマンド一覧

このプロジェクトで使用する主要なコマンド一覧です。

| コマンド              | 説明                                       |
| --------------------- | ------------------------------------------ |
| `yarn run dev`        | **開発環境** を起動（ホットリロードあり）  |
| `yarn run build:test` | **テスト環境用** にビルド                  |
| `yarn run build:stg`  | **ステージング環境用** にビルド            |
| `yarn run build:prod` | **本番環境用** にビルド & ssi-replace 実行 |
| `yarn run deploy`     | デプロイスクリプト実行                     |
| `yarn run lint`       | コードの静的解析（ESLint）                 |

## ディレクトリ構成

このプロジェクトでは、**機能単位・役割単位のディレクトリ構成**を採用しています。

機能ごとの画面実装やロジックは `/features/` 以下にまとまっており、  
それぞれの機能単位で `components/`, `hooks/`, `types/`, `views/`,`store/` を持つ構成です。

また、API 通信やデータ取得関連は `/api/` に、共通ユーティリティは `/utils/` に配置されています。

```
src/
├── components/                     # 再利用可能なUIコンポーネント（共通部品）
│   ├── headers/                    # ヘッダー関連
│   ├── layout/                     # レイアウト関連（画面構造など）
│   ├── loader/                     # ローディングUI
│   └── providers/                  # コンテキストプロバイダやDIの設定
│
├── configs/                        # アプリケーション設定（定数など）
│
├── features/                       # 機能（ドメイン）ごとのロジック集約
│   ├── auth/                       # 認証機能（サインイン/サインアップ/パスワードリセットなど）
│   │   ├── components/             # 認証専用のUI部品
│   │   │   ├── AuthPageLayout.tsx     # 認証ページ用のレイアウト
│   │   │   └── SignInForm.tsx         # サインインフォーム
│   │   ├── store/                  # 状態管理ロジック
│   │   │   └── index.ts
│   │   ├── types/                  # 型定義
│   │   └── views/                  # 各画面のコンテナ（表示用ロジック）
│   │       ├── PasswordReset.tsx      # パスワードリセット画面
│   │       ├── SigninView.tsx         # サインイン画面
│   │       └── SignUpView.tsx         # サインアップ画面
│   │
│   └── counter/                    # カウンター機能
│
├── hooks/                          # カスタムReactフック（useXxx）
│
├── pages/                          # Next.js のページルーティング
│   ├── password/
│   │   └── reset/
│   │       └── index.tsx           # `/password/reset` ページ
│   │
│   ├── signin/                     # `/signin` ページ
│   ├── signUp/                     # `/signUp` ページ
│   ├── _app.tsx                    # 全体の初期化処理（共通レイアウトやプロバイダ）
│   ├── _document.tsx              # HTMLカスタマイズ
│   └── index.tsx                  # トップページ（`/`）
│
├── stores/                         # グローバルストア（状態管理、共通データ）
│
└── utils/                          # ユーティリティ関数群（汎用ロジック）

```

## 案件別の初期設定

- **env の作成**
  `.env.sample`を例に [環境変数](#環境変数) の環境変数を作成してください。

- **meta 設定の追加**
  env ファイルにサイトの URL`NEXT_PUBLIC_SITE_URL` を追加し、
  `src\configs\index.ts`の`META_TITLE_BASE` にサイトのタイトルを入力してください。
  全体の meta 設定は`app.tsx`。 ページごとの設定は`src\components\MetaHead.tsx`が使えます。  
  参考：`src\pages\signin\index.tsx`

- **font の指定**
- `src\configs\fonts.ts`でフォントを読み込み
  `src\pages\_app.tsx` でフォントを指定。  
  参考：https://nextjs.org/docs/app/getting-started/fonts
- **style.css の設定**  
  styled component では css 変数を使用してください。css 変数は`src\styles\globals.scss`で定義します。

- **mantine theme の設定**  
  必要に応じて Mantine のテーマの設定をしてください。 `src\styles\mantine\mantineTheme.ts`  
  参考: https://mantine.dev/theming/mantine-provider/ ,
  https://mantine.dev/theming/theme-object/

- GTM の設定
  `src\configs\index.ts` の`export const GTM_ID = 'GTM-XXXXX';`に GTM ID をいれる。  
  GTM を入れない場合は

  - `src\pages\_document.tsx` の `<noscript>`の記述を削除
  - `src\types\global.d.ts`の dataLayer の型の削除
  - `src/pages/_app.tsx` の`useGTM()`と GTM の`<Script>`を削除

- **deploy.sh の設定**  
  デプロイ作業を自動化するためのシェルスクリプトです。`/deploy.sh`  
  **`.gitignore` に deploy.sh を追加してください。**  
  その後 ssh 名とアップロード先のディレクトリを指定してください。

  設定例

  ```
   # ディレクトリが存在しない場合は作成 dan__website === ssh 名
  ssh dan__website 'mkdir -p /home/dandetest/dande-lion.website/public_html/XXX/'

  # ビルドされたファイルをサーバーにアップロード
  scp -r dist/* dan__website:/home/dandetest/dande-lion.website/public_html/XXX/'
  ```

## 使用サンプルについて

- fetch
  `src\features\users\components\UserList.tsx`

- Zustand
  セッションストレージを使った例：
  `src\features\auth\store\index.ts`  
  `src\components\headers\GlobalHeader.tsx`
  通常の例：  
  `src\features\counter\store\index.ts`, `src\features\counter\components\Counter.tsx`

## styled-components の Mixin 使用方法

このプロジェクトでは、共通スタイル処理を `mixins` として管理しています。  
`styled-components` でテンプレートリテラルとして呼び出して使用します。`src\styles\styled-component\mixin.ts`

```tsx
import styled from 'styled-components';
import { mixins } from '@/styles/mixins';

const Title = styled.h1`
  ${mixins.lineClamp(2)};
  ${mixins.fontFamilyWeight('roboto', 500)};
`;
```

## その他

jotai 不採用理由

Jotai の `atomWithStorage` を用いた場合、SSR 環境（Next.js Page Router）での初期レンダリング時に localStorage(sessionStorage) へアクセスできず、一瞬デフォルト値で描画される問題がありました。
これを解決するためには `getOnInit` オプションや `ClientOnly` コンポーネントなどの追加実装が必要になるためやや複雑で制約もあります。
[参考](https://jotai.org/docs/utilities/storage#server-side-rendering)

Zustand でも同様の問題はありますが、`persist` 機能と `useEffect` によるクライアント制御で比較的簡単に回避できます。また、Zustand は現在コミュニティの使用率が高く、設定例や知見も豊富であるため、開発・運用の観点からも安定性が高いと判断しました。

なお、細かい状態依存や派生ロジックが多いアプリケーションでは Jotai の方が得意です。

※補足：開発中の `next dev` は SSR と同様の挙動（リクエストごとにページを再生成）になるため、ストレージ初期値が取得できず描画に差異が出る問題がローカルで顕在化します。

セッションストレージを使った例：
`src\features\auth\store\index.ts`  
`src\components\headers\GlobalHeader.tsx`

通常の例：  
`src\features\counter\store\index.ts`, `src\features\counter\components\Counter.tsx`

npx supabase gen types typescript --project-id itplbmvydiozxxrujhug > src/types/supabase.ts
