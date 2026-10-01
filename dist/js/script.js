//class名かぶりに注意!注意!
//is-show,is-open,is-Active,など
//class名かぶりに注意!注意!

// ハンバーガー
// sp-navのulに「js-off」を付けるの忘れずに

// ハンバーガーボタンの要素を取得
const btn = document.querySelector(".js-hamburger");
// メニュー（ドロワー）の要素を取得
const menu = document.querySelector(".js-drawer");
// ヘッダーの要素を取得
const header = document.querySelector(".js-header");
// 「トップへ戻る」ボタンの要素を取得（スクロールで表示されるボタン）
const totop = document.querySelector(".js-to-top");

// ハンバーガーボタンが存在する場合のみイベントを設定
if (btn && menu) {
  btn.addEventListener("click", () => {
    // ハンバーガーメニューの開閉状態を切り替え
    btn.classList.toggle("open");
    menu.classList.toggle("js-open");
    if (header) {
      header.classList.toggle("open");
    }

    // ハンバーガーメニューを開いたときに「トップへ戻る」ボタンを非表示にする
    if (totop) {
      totop.classList.remove("is-show");
    }
  });
}

// スマホナビ（.js-off）内のリンクがクリックされたときにメニューを閉じる処理

document.querySelectorAll(".js-off a").forEach((anchor) => {
  anchor.addEventListener("click", () => {
    // メニュー（ドロワー）の要素を再取得
    const menu = document.querySelector(".js-drawer");
    // ハンバーガーボタンの要素を再取得
    const btn = document.querySelector(".js-hamburger");
    // ヘッダーの要素を再取得
    const header = document.querySelector(".js-header");

    // メニューが開いていたら閉じる
    if (menu) {
      menu.classList.remove("js-open");
    }
    // ハンバーガーボタンの「open」クラスも削除
    if (btn) {
      btn.classList.remove("open");
    }
    // ヘッダーの「open」クラスも削除
    if (header) {
      header.classList.remove("open");
    }
  });
});


//ヘッダー色変かは今回トップページのみなのでそのための指定
//（もしjs-mvクラスがあったら実行）
const mv = document.querySelector(".js-mv");

if (mv && header) {
  //メインビューの高さを取得「js-mvはfvに付けた」
  const mainViewHeight = mv.offsetHeight;

  //メインビューの高さを超えたら、changeクラスを付与（ヘッダーの色を変更）
  window.addEventListener("scroll", () => {
    if (window.scrollY > mainViewHeight) {
      header.classList.add("change");
    } else {
      header.classList.remove("change");
    }
  });
}


//  to-top 途中から出現//////////////////////////
const pageTop = document.querySelector(".js-to-top");
window.addEventListener("scroll", function () {
  //どこまでスクロールしたら出現するかの位置
  if (500 < this.window.scrollY) {
    pageTop.classList.add("is-show");
  } else {
    pageTop.classList.remove("is-show");
  }
});

//スムーススクロール//////////////////////
//href属性の「#」で始まるリンクを全て取得
const links = document.querySelectorAll('a[href^="#"]');
//取得したリンクを1つずつ処理を実行する
links.forEach((link) => {
  //リンクをクリックしたら処理を実行する
  link.addEventListener("click", (e) => {
    //リンクイベントをキャンセルする
    e.preventDefault();
    //クリックしたリンクのhref属性を取得
    const href = link.getAttribute("href"); //目的のセクションを取得
    const targetSection = document.querySelector(href);
    //画面の上からセクションのtop位置までの垂直方向の距離
    const sectionTop = targetSection.getBoundingClientRect().top; //現在位置を取得
    const currentPos = window.scrollY;
    const gap = 104; //ヘッダーの高さ
    //現在位置から目的のsectionまでのスクロール量
    const target = sectionTop + currentPos - gap; //特定の位置までスクロールさせる
    window.scrollTo({
      top: target, //目的の位置のY座標を指定
      behavior: "smooth", //スクロールの動きを指定
    });
  });
});

//ブレークポイントでリロード//////////////////
const breakpoint = window.matchMedia("(max-width:768px)");
breakpoint.addEventListener("change", () => {
  window.location.reload();
});





//途中にダメコードがあると作動しないよ

// アラート
// alert("チェック");
