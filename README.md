# ipe chat app
- ログイン機能(devise利用なし)  
- メッセージの作成、表示、削除、編集  
- 非同期によるメッセージ送信  
- チャットグループ作成  
- 非同期ユーザー検索

# DB設計

##  usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password_digest|string||

### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|text||
|user|bigint|null: false, foreign_key: true|
|group|bigint|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :messages

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|bigint|null: false, foreign_key: true|
|group|bigint|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
