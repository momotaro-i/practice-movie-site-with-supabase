#!/bin/bash

# ビルドコマンド
npm run build:test


# ディレクトリが存在しない場合は作成 XXX === ssh 名
ssh XXX 'mkdir -p /home/FIXME/FIXME/FIXME/'

# ビルドされたファイルをサーバーにアップロード
scp -r dist/* XXX:/home/FIXME/FIXME/FIXME/

# スクリプト終了
echo "Deployment is completed!"
