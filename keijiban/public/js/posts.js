document.addEventListener("DOMContentLoaded", (response) => {
    
    var xhr = new XMLHttpRequest();
    //名前を格納する変数
    let name = '';
    let token =  '';

    //cookie（複数）を取得
    const cookies = document.cookie;
    //cookie（複数）を区切り文字;で分割して配列に格納する
    const cookiesArray = cookies.split(';');
    //ループ処理でcookie（単体）を取り出す
    for(let cookie of cookiesArray){
        let cookieArray = cookie.split('=');
        //cookie（単体）がtokenであれば処理を実行する
        if( cookieArray[0] === 'token'){
            //tokenを変数に格納する
            token = cookie;
            //tokenのpayloadを抽出・デコードする
            let payload = atob(cookieArray[1].split('.')[1]);
            //payloadの整形
            payload = payload.replace(/\{|\}/g, '');
            //payloadを分割して配列に格納する
            const payloadArray = payload.split(',');
            for(let pld of payloadArray){
                let pldAry = pld.split(':');
                if(pldAry[0]==='"name"'){
                    //payloadから名前を抽出(ダブルクォーテーションは削除)
                    name = pldAry[1].replace(/\"/g,"");
                    break;
                }
            }
            break;
        }
    }
    //cookieの初期化
    document.cookie = 'token=; max-age=0';
    //ローカルストレージにtokenを格納する。
    localStorage.setItem("token",token);
    localStorage.setItem("name",name);
    //ローカルストレージに格納されたユーザー名の表示
    document.getElementById('logout1').innerText = localStorage.getItem("name");
});

//Sign Out処理
document.getElementById('logout2').onclick = function() {
    alert('logoutをクリックしました')
    localStorage.removeItem("token");
    localStorage.removeItem("name");
}

document.getElementById('viewPosts').onclick = () => {
    //リクエストヘッダにtokenを格納
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}
document.getElementById('viewCreate').onclick = () => {
    //リクエストヘッダにtokenを格納
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}

document.getElementById('postsBtn').onclick = function(){
    alert('postsBtnをクリックしました')
}