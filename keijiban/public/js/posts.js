document.addEventListener("DOMContentLoaded", (response) => {
    
    if(!localStorage.getItem("token")){
    //var xhr = new XMLHttpRequest();
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
    // alert('cookie初期化前'+document.cookie);
    document.cookie = "token=; max-age=0; domain=.localhost";
    // alert('cookie初期化後'+document.cookie);
    //ローカルストレージにtokenを格納する。
    // alert('ローカルストレージ格納前');
    localStorage.setItem(token);
    localStorage.setItem(name);
    // alert('ローカルストレージ格納後');
    }
    //ローカルストレージに格納されたユーザー名の表示
    // alert('ローカルストレージのname表示前');    
    document.getElementById('logout1').innerText = localStorage.getItem("name");
    // alert('ローカルストレージのname表示後'); 

});

//Sign Out処理
document.getElementById('logout2').onclick = function() {

    alert('logoutをクリックしました')

    // alert('ローカルストレージ削除前');
    // localStorage.removeItem(token);
    // localStorage.removeItem(name);
    // alert('ローカルストレージ削除後');
    // cookieの初期化
    // alert('cookieの初期化前');
    // document.cookie = "token=; max-age=0";
    // alert('cookieの初期化後');
}

//投稿一覧、投稿画面へのリンククリック時処理
// var xhr = new XMLHttpRequest();

document.getElementById('viewPosts').onclick = () => {
    alert('viewPostsをクリックしました');
    // alert('cookie作成前');
    // xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
    // alert('cookie作成後');
}
document.getElementById('viewCreate').onclick = () => {
    alert('viewCreateをクリックしました');
    // alert('cookie作成前');
    // xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
    // alert('cookie作成後');
}
