# chat app
- ログイン機能(devise利用なし)  
- メッセージの作成、表示、削除、編集  
- 非同期によるメッセージ送信  

# DB設計

##  usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password_digest|string||

### Association
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|text||
|user|bigint|null: false, foreign_key: true|

### Association
- belongs_to :user

