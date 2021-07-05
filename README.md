### 開発環境の作成
1.プロジェクトが格納されているディレクトリに移動 
&emsp;cd keijiban
2.mysqlのイメージをdocker hubより取得  
&emsp;docker pull mysql:latest  
3.expressをインストールする  
&emsp;npm install express --save-dev  
4.dockerイメージの作成  
&emsp;docker-compose build  
5.コンテナの生成  
&emsp;docker-compose up  
6.expressの疎通確認  
&emsp;下記URLにブラウザよりアクセス。  
&emsp;http://localhost:3000
7.mysqlの疎通確認  
&emsp;mysqlのコンテナIDを確認  
&emsp;&emsp;docker ps  
&emsp;mysqlのコンテナIDに接続  
&emsp;&emsp;docker exec -it mysqlのコンテナID bash  
&emsp;ログイン（パスワードはdocker-compose.ymlの環境変数MYSQL_ROOT_PASSWORDに記載）  
&emsp;&emsp;mysql -u root -p
8.モデル（雛形）の作成 のコマンド実行
&emsp;npx sequelize-cli model:generate --name users --attributes name:string,email:string,password:string
&emsp;npx sequelize-cli model:generate --name posts --attributes title:string,content:string,userid:string
&emsp;npx sequelize-cli model:generate --name likes --attributes postid:string,userid:string
9.マイグレーションを開発環境で実行
&emsp;node_modules/.bin/sequelize db:migrate --env development