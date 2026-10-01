// gulpのメソッド呼び出し
// src：参照元指定、dest：出力先指定、watch：ファイル監視、series：直列処理、parallel：並列処理
const { src, dest, watch, series, parallel } = require("gulp");

// 入出力先指定
const srcBase = "../src";
const distBase = "../dist";
const srcPath = {
  css: srcBase + "/sass/**/*.scss",
  img: srcBase + "/images/**/*",
};
const distPath = {
  css: distBase + "/css/",
  img: distBase + "/images/",
  html: distBase + "/**/*.html",
  js: distBase + "/js/**/*.js",
};

// ローカルサーバー立ち上げ
const browserSync = require("browser-sync");
const browserSyncOption = {
  server: distBase, // dist直下をルートとする
};
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

// Sassコンパイル
const sass = require("gulp-sass")(require("sass")); // sassコンパイル（DartSass対応）
const sassGlob = require("gulp-sass-glob-use-forward"); // globパターンを使用可にする
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const postcss = require("gulp-postcss"); // PostCSS利用
const cssnext = require("postcss-cssnext"); // 最新CSS使用を先取り
const sourcemaps = require("gulp-sourcemaps"); // ソースマップ生成
const browsers = [
  // 対応ブラウザの指定
  "last 2 versions",
  "> 5%",
  "ie = 11",
  "not ie <= 10",
  "ios >= 8",
  "and_chr >= 5",
  "Android >= 5",
];
const cssSass = () => {
  return src(srcPath.css)
    .pipe(sourcemaps.init()) // ソースマップの初期化
    .pipe(
      plumber({
        // エラーが出ても処理を止めない
        errorHandler: notify.onError("Error:<%= error.message %>"),
      }),
    )
    .pipe(sassGlob()) // globパターンを使用可にする
    .pipe(
      sass.sync({
        // sassコンパイル
        includePaths: ["src/sass"], // 相対パス省略
        outputStyle: "expanded", // 出力形式をCSSの一般的な記法にする
      }),
    )
    .pipe(
      postcss([
        cssnext(
          {
            features: {
              rem: false,
            },
          },
          browsers,
        ),
      ]),
    ) // 最新CSS使用を先取り
    .pipe(sourcemaps.write("./")) // ソースマップの出力先をcssファイルから見たパスに指定
    .pipe(dest(distPath.css)) //
    .pipe(
      notify({
        // エラー発生時のアラート出力
        message: "Sassをコンパイルしました！",
        onLast: true,
      }),
    );
};

// 画像圧縮
const imagemin = require("gulp-imagemin"); // 画像圧縮
const imageminMozjpeg = require("imagemin-mozjpeg"); // jpgの高圧縮に必要
const imageminPngquant = require("imagemin-pngquant"); // pngの高圧縮に必要
const imageminSvgo = require("imagemin-svgo"); // svgの高圧縮に必要
const webp = require("gulp-webp"); // ★WebP追加：WebP変換プラグイン

const imgImagemin = () => {
  // ① 通常の画像圧縮（JPG, PNG, SVG）
  const extImagemin = src(srcPath.img)
    .pipe(
      imagemin(
        [
          imageminMozjpeg({
            quality: 80,
          }),
          imageminPngquant(),
          imageminSvgo({
            plugins: [
              {
                // ※svgoの仕様に合わせ、プロパティ名を大文字の「V」に修正
                name: "removeViewBox",
                active: false,
              },
            ],
          }),
        ],
        {
          verbose: true,
        },
      ),
    )
    .pipe(dest(distPath.img));

  // ② ★WebP追加：JPG/PNGをWebPに変換して出力
  // （SVGはWebPに変換させないよう、条件に「!srcBase + '/images/**/*.svg'」を指定するのが安全ですが、通常gulp-webpはSVGを無視します）
  const extWebp = src([srcPath.img, "!" + srcBase + "/images/**/*.svg"])
    .pipe(
      webp({
        quality: 80, // 画質（0〜100）
      }),
    )
    .pipe(dest(distPath.img));

  // 2つの並列処理を統合して返す
  return require("merge-stream")(extImagemin, extWebp); // ★WebP追加
};

// ファイルの変更を検知
const watchFiles = () => {
  watch(srcPath.css, series(cssSass, browserSyncReload));
  watch(srcPath.img, series(imgImagemin, browserSyncReload));
  watch(distPath.html, series(browserSyncReload));
  watch(distPath.js, series(browserSyncReload));
};

// clean
const del = require("del");
const delPath = {
  css: distBase + "/css/style.css",
  cssMap: distBase + "/css/style.css.map",
  img: distBase + "/images/",
};
const clean = (done) => {
  del(delPath.css, { force: true });
  del(delPath.cssMap, { force: true });
  del(delPath.img, { force: true });
  done();
};

// 実行
exports.default = series(series(clean, imgImagemin, cssSass), parallel(watchFiles, browserSyncFunc));
