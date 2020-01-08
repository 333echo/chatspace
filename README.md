# ChatSpace DB設計


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false, index: true, unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## messegesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user_id|integer|foreign_key:true|
|group_id|integer|foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group
