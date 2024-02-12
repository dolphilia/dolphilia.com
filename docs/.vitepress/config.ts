import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

export default {
    lang: 'ja',
    title: 'みが市',
    description: '',
    ignoreDeadLinks: true,
    lastUpdated: true,
    //cleanUrls: true,
    //head: [['meta', { name: 'theme-color', content: '#3c8772' }]],
    mermaid:{
        //mermaidConfig !theme here works for ligth mode since dark theme is forced in dark mode
      },
      mermaidPlugin: {
        class: "mermaid my-class", // set additional css classes for parent container 
      },
    markdown: {
        config: (md) => {
            md.use(require("@traptitech/markdown-it-katex"));
        },
    },
    themeConfig: {
        //logo: '/logo_miga.png',
        sitemap: {
            hostname: 'https://dolphilia.com'
        },
        editLink: {
            pattern: 'https://github.com/dolphilia/dolphilia.com/edit/main/docs/:path'
        },
        algolia: {
            appId: 'BT9F9T40EX',
            apiKey: 'aaf30df920537ae115546a12a1554f6b',
            indexName: 'dolphilia'
        },
        footer: {
            message: '',
            copyright: 'Copyright © 2023-present dolphilia'
        },
        siteTitle: 'みが市立図書館',
        socialLinks: [
            { icon: 'x', link: 'https://twitter.com/dolphilia' },
            { icon: 'youtube', link: 'https://youtube.com/c/dolphilia'},
            { icon: 'github', link: 'https://github.com/dolphilia' },
            //{ icon: 'mastodon', link: 'https://miga.pw/@dolphilia'},
            //{ icon: 'discord', link: 'https://https://discord.gg/f4sKFrsHyK'},
        ],
        nav: [
            { text: '小説', activeMatch: '/novel/', link: '/novel/index' },
            { text: '論考', activeMatch: '/essay/', link: '/essay/index' },
            { text: '雑記', activeMatch: '/note/', link: '/note/index' },
            { text: '学習', activeMatch: '/study/', link: '/study/index' },
            { 
                text: '翻訳', 
                activeMatch: '/translation/', 
                items: [
                    {text: 'ANGLE', link: '/translation/angle/'},
                    {text: 'ANTLR', link: '/translation/antlr/'},
                    {text: 'C言語', link: '/translation/c/'},
                    {text: 'cosmopolitan', link: '/translation/cosmopolitan/'},
                    {text: 'Duktape', link: '/translation/duktape/'},
                    {text: 'GLFW', link: '/translation/GLFW/'},
                    {text: 'HonKit', link: '/translation/honkit/'},
                    {text: 'HSP', link: '/translation/hsp/'},
                    {text: 'ImGui', link: '/translation/imgui/'},
                    {text: 'JavaScript', link: '/translation/javascript/'},
                    {text: 'libffi', link: '/translation/libffi/'},
                    {text: 'LLVM', link: '/translation/llvm/'},
                    {text: 'Mastodon', link: '/translation/mastodon/'},
                    {text: 'Mermaid', link: '/translation/mermaid/'},
                    {text: 'Meson', link: '/translation/meson/'},
                    {text: 'Natural Docs', link: '/translation/natural-docs/'},
                    {text: 'Ninja', link: '/translation/ninja/'},
                    {text: 'Node.js', link: '/translation/nodejs/'},
                    {text: 'Nuklear', link: '/translation/nuklear/'},
                    {text: 'PEG.js', link: '/translation/pegjs/'},
                    {text: 'Processing', link: '/translation/processing/'},
                    {text: 'pygame', link: '/translation/pygame/reference/'},
                    {text: 'Sass', link: '/translation/sass/'},
                    {text: 'Scripting', link: '/translation/scripting/'},
                    {text: 'sokol', link: '/translation/sokol/'},
                    {text: 'stb', link: '/translation/stb/'},
                    {text: 'SteamOS', link: '/translation/steamos/'},
                    {text: 'Svelte', link: '/translation/svelte/'},
                    {text: 'uthash', link: '/translation/uthash/'},
                    {text: 'v8', link: '/translation/v8/'},
                    {text: 'VitePress', link: '/translation/vitepress/'},
                    {text: 'VivlioStyle', link: '/translation/vivliostyle/'},
                    {text: 'yyjson', link: '/translation/yyjson/'},
                ]
            },
        ],
        sidebar: {
            '/novel/': [
                {
                    text: '小説',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/novel/'},
                    ]
                },
                {
                    text: 'みがらいあ',
                    collapsed: false,
                    items: [
                        {text: 'みがらいあ', link: '/novel/migaraia'},
                    ]
                },
                {
                    text: '情報部',
                    collapsed: false,
                    items: [
                        {text: '黒の思惑', link: '/novel/kuro-no-omowaku'},
                    ]
                },
                {
                    text: '読み切り',
                    collapsed: false,
                    items: [
                        {text: '箸でコバエを捕まえたら', link: '/novel/hashi-de-kobae-wo'},
                        {text: 'SOSを発信するVとテトラー', link: '/novel/sos-wo-hasshin'},
                        {text: '代理ちゃん戦争', link: '/novel/dairi-chan-sensou'},
                        {text: '虚塔', link: '/novel/kyotou'},
                        {text: 'うたかたのゆめ', link: '/novel/utakata-no-yume'},
                        {text: '冥府の森と英雄の花', link: '/novel/meifu-no-mori'},
                        {text: '泣き虫魔王と鈴木勇者', link: '/novel/nakimushi-maou'},
                        {text: '家出ギャルと電車の旅', link: '/novel/iede-gyaru-to'},
                        {text: 'もやし革命', link: '/novel/moyashi-kakumei'},
                        {text: 'タイムマシンを作った男', link: '/novel/taimu-mashin-wo'},
                    ]
                }
            ],
            '/essay/': [
                {
                    text: 'お絵かき',
                    collapsed: false,
                    items: [
                        { text: 'AIイラストに関する見解', link: '/essay/ai-illut-ni-kansuru-hansei-wo' },
                        { text: 'AIイラストに対抗する', link: '/essay/ai-illust-ni-taikou-suru' },
                        { text: 'AI画像生成との付き合い方', link: '/essay/ai-gazou-seisei' },
                        { text: 'ライブ配信のマナー', link: '/essay/raibu-haishin-no-mana' },
                        { text: 'お絵描き時短テクニック', link: '/essay/sho-tokatto-ya-sukuriputo' },
                        { text: 'クリエイターの困りごと', link: '/essay/kurieita-ga-komatte-iru-koto' },
                        { text: '破壊の芸術', link: '/essay/hakai-no-geijutsu' },
                        { text: 'キャラデザの秘訣', link: '/essay/kyaradeza-de-nayamanai' },
                        { text: '絵描きと炎上三つ巴', link: '/essay/ekaki-to-enjou-mitsudomoe' },
                        { text: '絵描きとWeb3.0', link: '/essay/ekaki-to-web30' },
                        { text: 'イラストが上達する人の特徴', link: '/essay/irasuto-ga-joutatsu' },
                        { text: '絵の耐久性について', link: '/essay/e-no-taikyuusei' },
                        { text: 'すれ違うクリエイターたち', link: '/essay/surethigau-kurieita-tachi' },
                        { text: '創作するときに聴く音楽', link: '/essay/irasuto-wo-kakutoki-ni-kiku' },
                        { text: '複雑なToDoを最適化させる方法', link: '/essay/fukuzatsu-na-todo-wo' },
                        { text: 'イラスト依頼のやり方', link: '/essay/ekaki-wo-honki-ni' },
                        { text: 'スランプから抜け出すには', link: '/essay/e-no-suranpu-ni-tsuite' },
                        { text: 'アイデアを生むための方法', link: '/essay/aidea-wo-umu-tame' },
                        { text: '絵師という呼び方について', link: '/essay/eshi-toiu-koshou' },
                        { text: '絵柄に自信が持てないときは', link: '/essay/egara-ni-jishin' },
                    ]
                },
                {
                    text: '雑学',
                    collapsed: false,
                    items: [
                        { text: 'ウェブ小説の書き方', link: '/essay/pixiv-shousetsu-ga-moriagatte' },
                        { text: '手話が認められるまで', link: '/essay/shuwa-ga-gengo-de' },
                    ]
                },
                {
                    text: '音楽',
                    collapsed: false,
                    items: [
                        { text: '音楽の楽しみ方', link: '/essay/ongaku-wo-sarani-tanoshimu' },
                        { text: 'Bメロ不要論', link: '/essay/b-mero-huyouron' },
                    ]
                },
                {
                    text: '心身の健康',
                    collapsed: false,
                    items: [
                        { text: '生きるための処方箋', link: '/essay/ikiru-tame-no-shohousen' },
                        { text: '傷ついても創作を続けるには', link: '/essay/kokoro-ga-sensai-na-ekaki' },
                        { text: 'うつ病でも創作を続けるには', link: '/essay/utsu-byou-demo-sousaku' },
                        { text: '低気圧で体調を崩す理由', link: '/essay/teikiatsu-de-taishou-wo' },
                    ]
                },
                {
                    text: 'Pixiv',
                    collapsed: false,
                    items: [
                        { text: 'ピクスケの始め方', link: '/essay/sketch-live-no-tanoshii' },
                        { text: 'ピクスケの楽しみ方', link: '/essay/pixiv-sketch-wo-motto-tanoshimu' },
                        { text: 'ピクスケを盛り上げたい', link: '/essay/pixiv-sketch-zentai' },
                        { text: 'PIXIV DEV 予習', link: '/essay/pixiv-dev-meetup-ni-shoutai' },
                        { text: 'PIXIV DEV 第一印象', link: '/essay/pixiv-dev-meetup-fa-suto' },
                        { text: 'PIXIV DEV 体験記', link: '/essay/pixiv-dev-meetup-taiken-repo' },
                        { text: 'Pixiv 新UIに不満が続出', link: '/essay/pixiv-no-atarashii-ui' },
                        { text: 'Pixiv 新UIの改善点', link: '/essay/pixiv-no-ui-dou-kaizen' },
                        { text: 'ピクシブ小説の本文検索', link: '/essay/pixiv-shousetsu-no-honbun' },
                        { text: 'SKETCH LIVEで配信する', link: '/essay/sketch-live-de-koukateki' },
                        { text: 'FANBOXで生じるジレンマ', link: '/essay/fanbox-de-shoujiru' },
                    ]
                },
            ],
            '/note/': [
                {
                    text: 'リンク',
                    collapsed: false,
                    items: [

                        { text: 'ライブラリまとめ', link: '/note/library_matome'},
                        { text: 'お気に入りのウェブサイト', link: '/note/bookmark' },
                    ]
                },
                {
                    text: '覚え書き',
                    collapsed: false,
                    items: [
                        { text: 'FFIの比較', link: '/note/ffi-list' },
                        { text: 'Godotのサードパーティ', link: '/note/third-party-godot' },
                        { text: 'Chromiumのサードパーティ', link: '/note/third-party-chromium' },
                        { text: 'CでSJISをUTF8に変換する', link: '/note/c-gengo-de-moji' },
                        { text: '手動でRSS2.0を作成する', link: '/note/rss20-wo-shudou-de' },
                        { text: 'MusicXMLのチュートリアル', link: '/note/music-xml-no' },
                        { text: 'ホワイトノイズの生成と再生', link: '/note/openal-wo-tsukatte' },
                        { text: '波形を生成する', link: '/note/puroguramingu-de-hakei' },
                    ]
                },
                {
                    text: 'やってみた',
                    collapsed: false,
                    items: [
                        { text: 'CoeFontを使ってみた', link: '/note/jibun-no-koe-de-onsei-gousei' },
                        { text: 'AIに記事を書かせてみた', link: '/note/jinkou-chinou-ni-kiji-wo' },
                        { text: 'ペン入れ有り無し混ぜてみた', link: '/note/penire-ari-nashi-wo' },
                        { text: 'グリザイユ画法に挑戦してみた', link: '/note/gurizaiyu-gahou-ga-raku' },
                        { text: '防音室を作ってみた', link: '/note/bouon-shitsu-wo-tsukuri' },
                        { text: '色にこだわってみた', link: '/note/shikisai-ni-torikumu' },
                        { text: 'タイムラプスを撮ってみた', link: '/note/taimu-rapusu-de-manabu' },
                        { text: 'VTuberになってみた', link: '/note/ekaki-ga-vtuber-ni-natta' },
                    ]
                },
                
                {
                    text: '制作秘話',
                    collapsed: false,
                    items: [
                        { text: 'ウェブ漫画を通して伝えたかったこと', link: '/note/webu-manga-wo-tooshite' },
                        { text: 'ドローイング・マイシスターの裏話', link: '/note/doro-ingu-mai-shisuta-no-ura-banashi' },
                        { text: 'なぜクマ？ なぜ学ラン？ 正義のくまさん制作秘話！', link: '/note/naze-kuma-naze-gakuran' },
                        { text: 'みがらいあの舞台が現代である理由', link: '/note/migaraia-no-butai' },
                        { text: 'みがらいあの意味', link: '/note/migaraia-no-imi' },
                        { text: 'みがちゃんが笑わなくなった理由', link: '/note/miga-chan-ga-warawanaku' },
                    ]
                },
                {
                    text: 'レビュー',
                    collapsed: false,
                    items: [
                        { text: '液タブHuion Kanvas Pro 24(4K)を買ったのでレビューします', link: '/note/ekitabu-huion-kanvas-pro-24-4k' },
                    ]
                },
            ],
            '/study/': [
                {
                    text: '目次',
                    collapsed: false,
                    items: [
                        { text: 'はじめに', link: '/study/' },
                        { text: '学問のリスト', link: '/study/list_of_studies' },
                    ]
                },
                {
                    text: '高等学校',
                    collapsed: false,
                    items: [
                        { text: '高校の国語で学ぶこと', link: '/study/list_of_high_school_japanese' },
                        { text: '高校の数学で学ぶこと', link: '/study/list_of_high_school_math' },
                        { text: '高校の地理歴史で学ぶこと', link: '/study/list_of_high_school_geography_and_history' },
                        { text: '高校の公民で学ぶこと', link: '/study/list_of_high_school_civics' },
                        { text: '高校の理科で学ぶこと', link: '/study/list_of_high_school_science' },
                        { text: '高校の外国語で学ぶこと', link: '/study/list_of_high_school_foreign_language' },
                        { text: '引用書籍', link: '/study/citation_books' },
                    ]
                },
                {
                    text: '数学',
                    collapsed: false,
                    items: [
                        { text: '高校数学1の公式', link: '/study/formulas_for_high_school_math_1.md'},
                    ]
                },
                {
                    text: '英語',
                    collapsed: false,
                    items: [
                        { text: 'ベーシック英語', link: '/study/basic_english' },
                    ]
                },
                {
                    text: 'IT',
                    collapsed: false,
                    items: [
                        { text: 'KaTeXで数式を書く', link: '/study/katex' },
                    ]
                },
            ],
            '/translation/angle/': [
                {
                    text: 'ANGLE',
                    collapsed: false,
                    items: [
                        {text: 'ANGLEの概要', link: '/translation/angle/'},
                        {text: 'ANGLEの開発', link: '/translation/angle/angle_development'},
                        {text: 'MetalANGLEの概要', link: '/translation/angle/metal_angle'},
                        {text: 'MetalANGLEの開発', link: '/translation/angle/metal_andle_development'},
                    ]
                }
            ],
            '/translation/antlr/': [
                {
                    text: 'ANTLR',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/antlr/'},
                    ]
                },
                {
                    text: 'ドキュメント',
                    collapsed: false,
                    items: [
                        {text: 'C++', link: '/translation/antlr/cpp-target'},
                        {text: 'Go', link: '/translation/antlr/go-target'},
                        {text: 'Java', link: '/translation/antlr/java-target'},
                        {text: 'JavaScript', link: '/translation/antlr/javascript-target'},
                        {text: 'Python', link: '/translation/antlr/python-target'},
                        {text: 'Typescript', link: '/translation/antlr/typescript-target'},
                    ]
                }
            ],
            '/translation/civetweb/': [
                {
                    text: 'CivetWeb',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/civetweb/index.md'},
                        {text: 'インストール', link: '/translation/civetweb/installing.md'},
                        {text: 'ビルド', link: '/translation/civetweb/building.md'},
                        {text: '組み込み', link: '/translation/civetweb/embedding.md'},
                        {text: 'OpenSSL', link: '/translation/civetweb/openssl.md'},
                    ]
                },
                {
                    text: 'APIリファレンス',
                    collapsed: false,
                    items: [
                        {text: '目次', link: '/translation/civetweb/APIReference.md'},
                        {text: 'mg_callbacks', link: '/translation/civetweb/api/mg_callbacks.md'},
                        {text: 'mg_client_cert', link: '/translation/civetweb/api/mg_client_cert.md'},
                        {text: 'mg_client_options', link: '/translation/civetweb/api/mg_client_options.md'},
                        {text: 'mg_error_data', link: '/translation/civetweb/api/mg_error_data.md'},
                        {text: 'mg_form_data_handler', link: '/translation/civetweb/api/mg_form_data_handler.md'},
                        {text: 'mg_header', link: '/translation/civetweb/api/mg_header.md'},
                        {text: 'mg_init_data', link: '/translation/civetweb/api/mg_init_data.md'},
                        {text: 'mg_option', link: '/translation/civetweb/api/mg_option.md'},
                        {text: 'mg_request_info', link: '/translation/civetweb/api/mg_request_info.md'},
                        {text: 'mg_response_info', link: '/translation/civetweb/api/mg_response_info.md'},
                        {text: 'mg_server_port', link: '/translation/civetweb/api/mg_server_port.md'},
                        {text: 'mg_websocket_subprotocols', link: '/translation/civetweb/api/mg_websocket_subprotocols.md'},
                        {text: 'mg_init_library', link: '/translation/civetweb/api/mg_init_library.md'},
                        {text: 'mg_exit_library', link: '/translation/civetweb/api/mg_exit_library.md'},
                        {text: 'mg_check_feature', link: '/translation/civetweb/api/mg_check_feature.md'},
                        {text: 'mg_version', link: '/translation/civetweb/api/mg_version.md'},
                        {text: 'mg_start', link: '/translation/civetweb/api/mg_start.md'},
                        {text: 'mg_start2', link: '/translation/civetweb/api/mg_start2.md'},
                        {text: 'mg_start_domain', link: '/translation/civetweb/api/mg_start_domain.md'},
                        {text: 'mg_start_domain2', link: '/translation/civetweb/api/mg_start_domain2.md'},
                        {text: 'mg_stop', link: '/translation/civetweb/api/mg_stop.md'},
                        {text: 'mg_get_builtin_mime_type', link: '/translation/civetweb/api/mg_get_builtin_mime_type.md'},
                        {text: 'mg_get_option', link: '/translation/civetweb/api/mg_get_option.md'},
                        {text: 'mg_get_server_ports', link: '/translation/civetweb/api/mg_get_server_ports.md'},
                        {text: 'mg_get_user_data', link: '/translation/civetweb/api/mg_get_user_data.md'},
                        {text: 'mg_set_auth_handler', link: '/translation/civetweb/api/mg_set_auth_handler.md'},
                        {text: 'mg_set_request_handler', link: '/translation/civetweb/api/mg_set_request_handler.md'},
                        {text: 'mg_set_websocket_handler', link: '/translation/civetweb/api/mg_set_websocket_handler.md'},
                        {text: 'mg_set_websocket_handler_with_subprotocols', link: '/translation/civetweb/api/mg_set_websocket_handler_with_subprotocols.md'},
                        {text: 'mg_lock_context', link: '/translation/civetweb/api/mg_lock_context.md'},
                        {text: 'mg_unlock_context', link: '/translation/civetweb/api/mg_unlock_context.md'},
                        {text: 'mg_get_context', link: '/translation/civetweb/api/mg_get_context.md'},
                        {text: 'mg_send_http_error', link: '/translation/civetweb/api/mg_send_http_error.md'},
                        {text: 'mg_send_http_ok', link: '/translation/civetweb/api/mg_send_http_ok.md'},
                        {text: 'mg_send_http_redirect', link: '/translation/civetweb/api/mg_send_http_redirect.md'},
                        {text: 'mg_send_digest_access_authentication_request', link: '/translation/civetweb/api/mg_send_digest_access_authentication_request.md'},
                        {text: 'mg_check_digest_access_authentication', link: '/translation/civetweb/api/mg_check_digest_access_authentication.md'},
                        {text: 'mg_modify_passwords_file', link: '/translation/civetweb/api/mg_modify_passwords_file.md'},
                        {text: 'mg_modify_passwords_file_ha1', link: '/translation/civetweb/api/mg_modify_passwords_file_ha1.md'},
                        {text: 'mg_get_request_info', link: '/translation/civetweb/api/mg_get_request_info.md'},
                        {text: 'mg_get_request_link', link: '/translation/civetweb/api/mg_get_request_link.md'},
                        {text: 'mg_handle_form_request', link: '/translation/civetweb/api/mg_handle_form_request.md'},
                        {text: 'mg_send_file', link: '/translation/civetweb/api/mg_send_file.md'},
                        {text: 'mg_send_mime_file', link: '/translation/civetweb/api/mg_send_mime_file.md'},
                        {text: 'mg_send_mime_file2', link: '/translation/civetweb/api/mg_send_mime_file2.md'},
                        {text: 'mg_websocket_write', link: '/translation/civetweb/api/mg_websocket_write.md'},
                        {text: 'mg_response_header_*', link: '/translation/civetweb/api/mg_response_header_X.md'},
                        {text: 'mg_connect_client', link: '/translation/civetweb/api/mg_connect_client.md'},
                        {text: 'mg_connect_client_secure', link: '/translation/civetweb/api/mg_connect_client_secure.md'},
                        {text: 'mg_connect_websocket_client', link: '/translation/civetweb/api/mg_connect_websocket_client.md'},
                        {text: 'mg_websocket_client_write', link: '/translation/civetweb/api/mg_websocket_client_write.md'},
                        {text: 'mg_download', link: '/translation/civetweb/api/mg_download.md'},
                        {text: 'mg_get_response', link: '/translation/civetweb/api/mg_get_response.md'},
                        {text: 'mg_get_response_info', link: '/translation/civetweb/api/mg_get_response_info.md'},
                        {text: 'mg_connect_client2', link: '/translation/civetweb/api/mg_connect_client2.md'},
                        {text: 'mg_get_response2', link: '/translation/civetweb/api/mg_get_response2.md'},
                        {text: 'mg_close_connection', link: '/translation/civetweb/api/mg_close_connection.md'},
                        {text: 'mg_cry', link: '/translation/civetweb/api/mg_cry.md'},
                        {text: 'mg_get_cookie', link: '/translation/civetweb/api/mg_get_cookie.md'},
                        {text: 'mg_get_header', link: '/translation/civetweb/api/mg_get_header.md'},
                        {text: 'mg_get_response_code_text', link: '/translation/civetweb/api/mg_get_response_code_text.md'},
                        {text: 'mg_get_user_connection_data', link: '/translation/civetweb/api/mg_get_user_connection_data.md'},
                        {text: 'mg_get_valid_options', link: '/translation/civetweb/api/mg_get_valid_options.md'},
                        {text: 'mg_get_var', link: '/translation/civetweb/api/mg_get_var.md'},
                        {text: 'mg_get_var2', link: '/translation/civetweb/api/mg_get_var2.md'},
                        {text: 'mg_lock_connection', link: '/translation/civetweb/api/mg_lock_connection.md'},
                        {text: 'mg_md5', link: '/translation/civetweb/api/mg_md5.md'},
                        {text: 'mg_printf', link: '/translation/civetweb/api/mg_printf.md'},
                        {text: 'mg_read', link: '/translation/civetweb/api/mg_read.md'},
                        {text: 'mg_send_chunk', link: '/translation/civetweb/api/mg_send_chunk.md'},
                        {text: 'mg_send_file_body', link: '/translation/civetweb/api/mg_send_file_body.md'},
                        {text: 'mg_set_user_connection_data', link: '/translation/civetweb/api/mg_set_user_connection_data.md'},
                        {text: 'mg_split_form_urlencoded', link: '/translation/civetweb/api/mg_split_form_urlencoded.md'},
                        {text: 'mg_start_thread', link: '/translation/civetweb/api/mg_start_thread.md'},
                        {text: 'mg_store_body', link: '/translation/civetweb/api/mg_store_body.md'},
                        {text: 'mg_strcasecmp', link: '/translation/civetweb/api/mg_strcasecmp.md'},
                        {text: 'mg_strncasecmp', link: '/translation/civetweb/api/mg_strncasecmp.md'},
                        {text: 'mg_unlock_connection', link: '/translation/civetweb/api/mg_unlock_connection.md'},
                        {text: 'mg_url_decode', link: '/translation/civetweb/api/mg_url_decode.md'},
                        {text: 'mg_url_encode', link: '/translation/civetweb/api/mg_url_encode.md'},
                        {text: 'mg_write', link: '/translation/civetweb/api/mg_write.md'},
                        {text: 'mg_get_system_info', link: '/translation/civetweb/api/mg_get_system_info.md'},
                        {text: 'mg_get_context_info', link: '/translation/civetweb/api/mg_get_context_info.md'},
                        {text: 'mg_get_connection_info', link: '/translation/civetweb/api/mg_get_connection_info.md'},
                        {text: 'mg_get_valid_option_names', link: '/translation/civetweb/api/mg_get_valid_option_names.md'},
                        {text: 'mg_upload', link: '/translation/civetweb/api/mg_upload.md'},
                        {text: 'mg_get_ports', link: '/translation/civetweb/api/mg_get_ports.md'},
                    ]
                },

            ],
            '/translation/c/': [
                {
                    text: 'C言語',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/c/'},
                    ]
                },
                {
                    text: 'ベストプラクティス',
                    collapsed: false,
                    items: [
                        {text: 'Cスタイル', link: '/translation/c/c_style'},
                    ]
                },
                {
                    text: 'WG14-C',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/c/WG14-C/'},
                        {text: '9899', link: '/translation/c/WG14-C/9899'},
                    ]
                }
            ],
            '/translation/cosmopolitan/': [
                {
                    text: 'cosmopolitan',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/cosmopolitan/'},
                        {text: '概要', link: '/translation/cosmopolitan/top'},
                        {text: 'ツールチェイン', link: '/translation/cosmopolitan/toolchain'},
                    ]
                },
                {
                    text: 'APE',
                    collapsed: false,
                    items: [
                        {text: 'APE', link: '/translation/cosmopolitan/ape'},
                    ]
                }
            ],
            '/translation/duktape/': [
                {
                    text: 'Duktape',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/duktape/'},
                    ]
                },
                {
                    text: 'プログラマーズ・ガイド',
                    collapsed: true,
                    items: [
                        {text: 'はじめに', link: '/translation/duktape/guide/'},
                        {text: 'イントロダクション', link: '/translation/duktape/guide/introduction.md'},
                        {text: 'スタートアップ', link: '/translation/duktape/guide/getting_started.md'},
                        {text: 'プログラミングモデル', link: '/translation/duktape/guide/programming_model.md'},
                        {text: 'スタックタイプ', link: '/translation/duktape/guide/stack_types.md'},
                        {text: 'C言語の型', link: '/translation/duktape/guide/api_c_types.md'},
                        {text: '型のアルゴリズム', link: '/translation/duktape/guide/type_algorithms.md'},
                        {text: 'ビルトイン', link: '/translation/duktape/guide/duktape_built_ins.md'},
                        {text: 'ポストES5の特徴', link: '/translation/duktape/guide/post_es5_features.md'},
                        {text: 'カスタム動作', link: '/translation/duktape/guide/custom_behavior.md'},
                        {text: 'カスタムJSONフォーマット', link: '/translation/duktape/guide/custom_json_formats.md'},
                        {text: 'カスタムディレクティブ', link: '/translation/duktape/guide/custom_directives.md'},
                        {text: 'バッファー', link: '/translation/duktape/guide/buffer_objects.md'},
                        {text: 'エラー', link: '/translation/duktape/guide/error_objects.md'},
                        {text: '関数', link: '/translation/duktape/guide/function_objects.md'},
                        {text: '日付と時刻', link: '/translation/duktape/guide/date_and_time.md'},
                        {text: '乱数', link: '/translation/duktape/guide/random_numbers.md'},
                        {text: 'デバッガー', link: '/translation/duktape/guide/debugger.md'},
                        {text: 'モジュール', link: '/translation/duktape/guide/modules.md'},
                        {text: 'ログ管理', link: '/translation/duktape/guide/logging.md'},
                        {text: '終了処理', link: '/translation/duktape/guide/finalization.md'},
                        {text: 'コルーチン', link: '/translation/duktape/guide/coroutines.md'},
                        {text: '仮想プロパティ', link: '/translation/duktape/guide/virtual_properties.md'},
                        {text: 'シンボル', link: '/translation/duktape/guide/symbols.md'},
                        {text: 'バイトコード', link: '/translation/duktape/guide/bytecode_dump_load.md'},
                        {text: 'スレッディング', link: '/translation/duktape/guide/threading.md'},
                        {text: 'サンドボックス', link: '/translation/duktape/guide/sandboxing.md'},
                        {text: 'パフォーマンス', link: '/translation/duktape/guide/performance.md'},
                        {text: 'メモリ使用量', link: '/translation/duktape/guide/memory_usage.md'},
                        {text: 'コンパイル方法', link: '/translation/duktape/guide/compiling.md'},
                        {text: '移植性', link: '/translation/duktape/guide/portability.md'},
                        {text: '互換性', link: '/translation/duktape/guide/compatibility.md'},
                        {text: 'バージョン管理', link: '/translation/duktape/guide/versioning.md'},
                        {text: '制限事項', link: '/translation/duktape/guide/limitations.md'},
                        {text: 'Luaとの比較', link: '/translation/duktape/guide/comparison_to_lua.md'},
                    ]
                },
                {
                    text: 'APIリファレンス',
                    collapsed: true,
                    items: [
                        {text: 'はじめに', link: '/translation/duktape/api/'},
                        {text: 'duk_alloc', link: '/translation/duktape/api/duk_alloc.md'},
                        {text: 'duk_alloc_raw', link: '/translation/duktape/api/duk_alloc_raw.md'},
                        {text: 'duk_base64_decode', link: '/translation/duktape/api/duk_base64_decode.md'},
                        {text: 'duk_base64_encode', link: '/translation/duktape/api/duk_base64_encode.md'},
                        {text: 'duk_call', link: '/translation/duktape/api/duk_call.md'},
                        {text: 'duk_call_method', link: '/translation/duktape/api/duk_call_method.md'},
                        {text: 'duk_call_prop', link: '/translation/duktape/api/duk_call_prop.md'},
                        {text: 'duk_char_code_at', link: '/translation/duktape/api/duk_char_code_at.md'},
                        {text: 'duk_check_stack', link: '/translation/duktape/api/duk_check_stack.md'},
                        {text: 'duk_check_stack_top', link: '/translation/duktape/api/duk_check_stack_top.md'},
                        {text: 'duk_check_type', link: '/translation/duktape/api/duk_check_type.md'},
                        {text: 'duk_check_type_mask', link: '/translation/duktape/api/duk_check_type_mask.md'},
                        {text: 'duk_compact', link: '/translation/duktape/api/duk_compact.md'},
                        {text: 'duk_compile', link: '/translation/duktape/api/duk_compile.md'},
                        {text: 'duk_compile_lstring', link: '/translation/duktape/api/duk_compile_lstring.md'},
                        {text: 'duk_compile_lstring_filename', link: '/translation/duktape/api/duk_compile_lstring_filename.md'},
                        {text: 'duk_compile_string', link: '/translation/duktape/api/duk_compile_string.md'},
                        {text: 'duk_compile_string_filename', link: '/translation/duktape/api/duk_compile_string_filename.md'},
                        {text: 'duk_concat', link: '/translation/duktape/api/duk_concat.md'},
                        {text: 'duk_copy', link: '/translation/duktape/api/duk_copy.md'},
                        {text: 'duk_create_heap', link: '/translation/duktape/api/duk_create_heap.md'},
                        {text: 'duk_create_heap_default', link: '/translation/duktape/api/duk_create_heap_default.md'},
                        {text: 'duk_decode_string', link: '/translation/duktape/api/duk_decode_string.md'},
                        {text: 'duk_del_prop', link: '/translation/duktape/api/duk_del_prop.md'},
                        {text: 'duk_del_prop_index', link: '/translation/duktape/api/duk_del_prop_index.md'},
                        {text: 'duk_del_prop_string', link: '/translation/duktape/api/duk_del_prop_string.md'},
                        {text: 'duk_destroy_heap', link: '/translation/duktape/api/duk_destroy_heap.md'},
                        {text: 'duk_dup', link: '/translation/duktape/api/duk_dup.md'},
                        {text: 'duk_dup_top', link: '/translation/duktape/api/duk_dup_top.md'},
                        {text: 'duk_enum', link: '/translation/duktape/api/duk_enum.md'},
                        {text: 'duk_equals', link: '/translation/duktape/api/duk_equals.md'},
                        {text: 'duk_error', link: '/translation/duktape/api/duk_error.md'},
                        {text: 'duk_eval', link: '/translation/duktape/api/duk_eval.md'},
                        {text: 'duk_eval_lstring', link: '/translation/duktape/api/duk_eval_lstring.md'},
                        {text: 'duk_eval_lstring_noresult', link: '/translation/duktape/api/duk_eval_lstring_noresult.md'},
                        {text: 'duk_eval_noresult', link: '/translation/duktape/api/duk_eval_noresult.md'},
                        {text: 'duk_eval_string', link: '/translation/duktape/api/duk_eval_string.md'},
                        {text: 'duk_eval_string_noresult', link: '/translation/duktape/api/duk_eval_string_noresult.md'},
                        {text: 'duk_fatal', link: '/translation/duktape/api/duk_fatal.md'},
                        {text: 'duk_free', link: '/translation/duktape/api/duk_free.md'},
                        {text: 'duk_free_raw', link: '/translation/duktape/api/duk_free_raw.md'},
                        {text: 'duk_gc', link: '/translation/duktape/api/duk_gc.md'},
                        {text: 'duk_get_boolean', link: '/translation/duktape/api/duk_get_boolean.md'},
                        {text: 'duk_get_buffer', link: '/translation/duktape/api/duk_get_buffer.md'},
                        {text: 'duk_get_c_function', link: '/translation/duktape/api/duk_get_c_function.md'},
                        {text: 'duk_get_context', link: '/translation/duktape/api/duk_get_context.md'},
                        {text: 'duk_get_current_magic', link: '/translation/duktape/api/duk_get_current_magic.md'},
                        {text: 'duk_get_finalizer', link: '/translation/duktape/api/duk_get_finalizer.md'},
                        {text: 'duk_get_global_string', link: '/translation/duktape/api/duk_get_global_string.md'},
                        {text: 'duk_get_int', link: '/translation/duktape/api/duk_get_int.md'},
                        {text: 'duk_get_length', link: '/translation/duktape/api/duk_get_length.md'},
                        {text: 'duk_get_lstring', link: '/translation/duktape/api/duk_get_lstring.md'},
                        {text: 'duk_get_magic', link: '/translation/duktape/api/duk_get_magic.md'},
                        {text: 'duk_get_memory_functions', link: '/translation/duktape/api/duk_get_memory_functions.md'},
                        {text: 'duk_get_number', link: '/translation/duktape/api/duk_get_number.md'},
                        {text: 'duk_get_pointer', link: '/translation/duktape/api/duk_get_pointer.md'},
                        {text: 'duk_get_prop', link: '/translation/duktape/api/duk_get_prop.md'},
                        {text: 'duk_get_prop_index', link: '/translation/duktape/api/duk_get_prop_index.md'},
                        {text: 'duk_get_prop_string', link: '/translation/duktape/api/duk_get_prop_string.md'},
                        {text: 'duk_get_prototype', link: '/translation/duktape/api/duk_get_prototype.md'},
                        {text: 'duk_get_string', link: '/translation/duktape/api/duk_get_string.md'},
                        {text: 'duk_get_top', link: '/translation/duktape/api/duk_get_top.md'},
                        {text: 'duk_get_top_index', link: '/translation/duktape/api/duk_get_top_index.md'},
                        {text: 'duk_get_type', link: '/translation/duktape/api/duk_get_type.md'},
                        {text: 'duk_get_type_mask', link: '/translation/duktape/api/duk_get_type_mask.md'},
                        {text: 'duk_get_uint', link: '/translation/duktape/api/duk_get_uint.md'},
                        {text: 'duk_has_prop', link: '/translation/duktape/api/duk_has_prop.md'},
                        {text: 'duk_has_prop_index', link: '/translation/duktape/api/duk_has_prop_index.md'},
                        {text: 'duk_has_prop_string', link: '/translation/duktape/api/duk_has_prop_string.md'},
                        {text: 'duk_hex_decode', link: '/translation/duktape/api/duk_hex_decode.md'},
                        {text: 'duk_hex_encode', link: '/translation/duktape/api/duk_hex_encode.md'},
                        {text: 'duk_insert', link: '/translation/duktape/api/duk_insert.md'},
                        {text: 'duk_is_array', link: '/translation/duktape/api/duk_is_array.md'},
                        {text: 'duk_is_boolean', link: '/translation/duktape/api/duk_is_boolean.md'},
                        {text: 'duk_is_bound_function', link: '/translation/duktape/api/duk_is_bound_function.md'},
                        {text: 'duk_is_buffer', link: '/translation/duktape/api/duk_is_buffer.md'},
                        {text: 'duk_is_c_function', link: '/translation/duktape/api/duk_is_c_function.md'},
                        {text: 'duk_is_callable', link: '/translation/duktape/api/duk_is_callable.md'},
                        {text: 'duk_is_constructor_call', link: '/translation/duktape/api/duk_is_constructor_call.md'},
                        {text: 'duk_is_dynamic_buffer', link: '/translation/duktape/api/duk_is_dynamic_buffer.md'},
                        {text: 'duk_is_ecmascript_function', link: '/translation/duktape/api/duk_is_ecmascript_function.md'},
                        {text: 'duk_is_fixed_buffer', link: '/translation/duktape/api/duk_is_fixed_buffer.md'},
                        {text: 'duk_is_function', link: '/translation/duktape/api/duk_is_function.md'},
                        {text: 'duk_is_lightfunc', link: '/translation/duktape/api/duk_is_lightfunc.md'},
                        {text: 'duk_is_nan', link: '/translation/duktape/api/duk_is_nan.md'},
                        {text: 'duk_is_null', link: '/translation/duktape/api/duk_is_null.md'},
                        {text: 'duk_is_null_or_undefined', link: '/translation/duktape/api/duk_is_null_or_undefined.md'},
                        {text: 'duk_is_number', link: '/translation/duktape/api/duk_is_number.md'},
                        {text: 'duk_is_object', link: '/translation/duktape/api/duk_is_object.md'},
                        {text: 'duk_is_object_coercible', link: '/translation/duktape/api/duk_is_object_coercible.md'},
                        {text: 'duk_is_pointer', link: '/translation/duktape/api/duk_is_pointer.md'},
                        {text: 'duk_is_primitive', link: '/translation/duktape/api/duk_is_primitive.md'},
                        {text: 'duk_is_strict_call', link: '/translation/duktape/api/duk_is_strict_call.md'},
                        {text: 'duk_is_string', link: '/translation/duktape/api/duk_is_string.md'},
                        {text: 'duk_is_thread', link: '/translation/duktape/api/duk_is_thread.md'},
                        {text: 'duk_is_undefined', link: '/translation/duktape/api/duk_is_undefined.md'},
                        {text: 'duk_is_valid_index', link: '/translation/duktape/api/duk_is_valid_index.md'},
                        {text: 'duk_join', link: '/translation/duktape/api/duk_join.md'},
                        {text: 'duk_json_decode', link: '/translation/duktape/api/duk_json_decode.md'},
                        {text: 'duk_json_encode', link: '/translation/duktape/api/duk_json_encode.md'},
                        {text: 'duk_map_string', link: '/translation/duktape/api/duk_map_string.md'},
                        {text: 'duk_new', link: '/translation/duktape/api/duk_new.md'},
                        {text: 'duk_next', link: '/translation/duktape/api/duk_next.md'},
                        {text: 'duk_normalize_index', link: '/translation/duktape/api/duk_normalize_index.md'},
                        {text: 'duk_pcall', link: '/translation/duktape/api/duk_pcall.md'},
                        {text: 'duk_pcall_method', link: '/translation/duktape/api/duk_pcall_method.md'},
                        {text: 'duk_pcall_prop', link: '/translation/duktape/api/duk_pcall_prop.md'},
                        {text: 'duk_pcompile', link: '/translation/duktape/api/duk_pcompile.md'},
                        {text: 'duk_pcompile_lstring', link: '/translation/duktape/api/duk_pcompile_lstring.md'},
                        {text: 'duk_pcompile_lstring_filename', link: '/translation/duktape/api/duk_pcompile_lstring_filename.md'},
                        {text: 'duk_pcompile_string', link: '/translation/duktape/api/duk_pcompile_string.md'},
                        {text: 'duk_pcompile_string_filename', link: '/translation/duktape/api/duk_pcompile_string_filename.md'},
                        {text: 'duk_peval', link: '/translation/duktape/api/duk_peval.md'},
                        {text: 'duk_peval_lstring', link: '/translation/duktape/api/duk_peval_lstring.md'},
                        {text: 'duk_peval_lstring_noresult', link: '/translation/duktape/api/duk_peval_lstring_noresult.md'},
                        {text: 'duk_peval_noresult', link: '/translation/duktape/api/duk_peval_noresult.md'},
                        {text: 'duk_peval_string', link: '/translation/duktape/api/duk_peval_string.md'},
                        {text: 'duk_peval_string_noresult', link: '/translation/duktape/api/duk_peval_string_noresult.md'},
                        {text: 'duk_pop', link: '/translation/duktape/api/duk_pop.md'},
                        {text: 'duk_pop_2', link: '/translation/duktape/api/duk_pop_2.md'},
                        {text: 'duk_pop_3', link: '/translation/duktape/api/duk_pop_3.md'},
                        {text: 'duk_pop_n', link: '/translation/duktape/api/duk_pop_n.md'},
                        {text: 'duk_push_array', link: '/translation/duktape/api/duk_push_array.md'},
                        {text: 'duk_push_boolean', link: '/translation/duktape/api/duk_push_boolean.md'},
                        {text: 'duk_push_buffer', link: '/translation/duktape/api/duk_push_buffer.md'},
                        {text: 'duk_push_c_function', link: '/translation/duktape/api/duk_push_c_function.md'},
                        {text: 'duk_push_c_lightfunc', link: '/translation/duktape/api/duk_push_c_lightfunc.md'},
                        {text: 'duk_push_context_dump', link: '/translation/duktape/api/duk_push_context_dump.md'},
                        {text: 'duk_push_current_function', link: '/translation/duktape/api/duk_push_current_function.md'},
                        {text: 'duk_push_current_thread', link: '/translation/duktape/api/duk_push_current_thread.md'},
                        {text: 'duk_push_dynamic_buffer', link: '/translation/duktape/api/duk_push_dynamic_buffer.md'},
                        {text: 'duk_push_error_object', link: '/translation/duktape/api/duk_push_error_object.md'},
                        {text: 'duk_push_false', link: '/translation/duktape/api/duk_push_false.md'},
                        {text: 'duk_push_fixed_buffer', link: '/translation/duktape/api/duk_push_fixed_buffer.md'},
                        {text: 'duk_push_global_object', link: '/translation/duktape/api/duk_push_global_object.md'},
                        {text: 'duk_push_global_stash', link: '/translation/duktape/api/duk_push_global_stash.md'},
                        {text: 'duk_push_heap_stash', link: '/translation/duktape/api/duk_push_heap_stash.md'},
                        {text: 'duk_push_int', link: '/translation/duktape/api/duk_push_int.md'},
                        {text: 'duk_push_lstring', link: '/translation/duktape/api/duk_push_lstring.md'},
                        {text: 'duk_push_nan', link: '/translation/duktape/api/duk_push_nan.md'},
                        {text: 'duk_push_null', link: '/translation/duktape/api/duk_push_null.md'},
                        {text: 'duk_push_number', link: '/translation/duktape/api/duk_push_number.md'},
                        {text: 'duk_push_object', link: '/translation/duktape/api/duk_push_object.md'},
                        {text: 'duk_push_pointer', link: '/translation/duktape/api/duk_push_pointer.md'},
                        {text: 'duk_push_sprintf', link: '/translation/duktape/api/duk_push_sprintf.md'},
                        {text: 'duk_push_string', link: '/translation/duktape/api/duk_push_string.md'},
                        {text: 'duk_push_this', link: '/translation/duktape/api/duk_push_this.md'},
                        {text: 'duk_push_thread', link: '/translation/duktape/api/duk_push_thread.md'},
                        {text: 'duk_push_thread_new_globalenv', link: '/translation/duktape/api/duk_push_thread_new_globalenv.md'},
                        {text: 'duk_push_thread_stash', link: '/translation/duktape/api/duk_push_thread_stash.md'},
                        {text: 'duk_push_true', link: '/translation/duktape/api/duk_push_true.md'},
                        {text: 'duk_push_uint', link: '/translation/duktape/api/duk_push_uint.md'},
                        {text: 'duk_push_undefined', link: '/translation/duktape/api/duk_push_undefined.md'},
                        {text: 'duk_push_vsprintf', link: '/translation/duktape/api/duk_push_vsprintf.md'},
                        {text: 'duk_put_function_list', link: '/translation/duktape/api/duk_put_function_list.md'},
                        {text: 'duk_put_global_string', link: '/translation/duktape/api/duk_put_global_string.md'},
                        {text: 'duk_put_number_list', link: '/translation/duktape/api/duk_put_number_list.md'},
                        {text: 'duk_put_prop', link: '/translation/duktape/api/duk_put_prop.md'},
                        {text: 'duk_put_prop_index', link: '/translation/duktape/api/duk_put_prop_index.md'},
                        {text: 'duk_put_prop_string', link: '/translation/duktape/api/duk_put_prop_string.md'},
                        {text: 'duk_realloc', link: '/translation/duktape/api/duk_realloc.md'},
                        {text: 'duk_realloc_raw', link: '/translation/duktape/api/duk_realloc_raw.md'},
                        {text: 'duk_remove', link: '/translation/duktape/api/duk_remove.md'},
                        {text: 'duk_replace', link: '/translation/duktape/api/duk_replace.md'},
                        {text: 'duk_require_boolean', link: '/translation/duktape/api/duk_require_boolean.md'},
                        {text: 'duk_require_buffer', link: '/translation/duktape/api/duk_require_buffer.md'},
                        {text: 'duk_require_c_function', link: '/translation/duktape/api/duk_require_c_function.md'},
                        {text: 'duk_require_context', link: '/translation/duktape/api/duk_require_context.md'},
                        {text: 'duk_require_int', link: '/translation/duktape/api/duk_require_int.md'},
                        {text: 'duk_require_lstring', link: '/translation/duktape/api/duk_require_lstring.md'},
                        {text: 'duk_require_normalize_index', link: '/translation/duktape/api/duk_require_normalize_index.md'},
                        {text: 'duk_require_null', link: '/translation/duktape/api/duk_require_null.md'},
                        {text: 'duk_require_number', link: '/translation/duktape/api/duk_require_number.md'},
                        {text: 'duk_require_object_coercible', link: '/translation/duktape/api/duk_require_object_coercible.md'},
                        {text: 'duk_require_pointer', link: '/translation/duktape/api/duk_require_pointer.md'},
                        {text: 'duk_require_stack', link: '/translation/duktape/api/duk_require_stack.md'},
                        {text: 'duk_require_stack_top', link: '/translation/duktape/api/duk_require_stack_top.md'},
                        {text: 'duk_require_string', link: '/translation/duktape/api/duk_require_string.md'},
                        {text: 'duk_require_top_index', link: '/translation/duktape/api/duk_require_top_index.md'},
                        {text: 'duk_require_type_mask', link: '/translation/duktape/api/duk_require_type_mask.md'},
                        {text: 'duk_require_uint', link: '/translation/duktape/api/duk_require_uint.md'},
                        {text: 'duk_require_undefined', link: '/translation/duktape/api/duk_require_undefined.md'},
                        {text: 'duk_require_valid_index', link: '/translation/duktape/api/duk_require_valid_index.md'},
                        {text: 'duk_resize_buffer', link: '/translation/duktape/api/duk_resize_buffer.md'},
                        {text: 'duk_safe_call', link: '/translation/duktape/api/duk_safe_call.md'},
                        {text: 'duk_safe_to_lstring', link: '/translation/duktape/api/duk_safe_to_lstring.md'},
                        {text: 'duk_safe_to_string', link: '/translation/duktape/api/duk_safe_to_string.md'},
                        {text: 'duk_set_finalizer', link: '/translation/duktape/api/duk_set_finalizer.md'},
                        {text: 'duk_set_global_object', link: '/translation/duktape/api/duk_set_global_object.md'},
                        {text: 'duk_set_magic', link: '/translation/duktape/api/duk_set_magic.md'},
                        {text: 'duk_set_prototype', link: '/translation/duktape/api/duk_set_prototype.md'},
                        {text: 'duk_set_top', link: '/translation/duktape/api/duk_set_top.md'},
                        {text: 'duk_strict_equals', link: '/translation/duktape/api/duk_strict_equals.md'},
                        {text: 'duk_substring', link: '/translation/duktape/api/duk_substring.md'},
                        {text: 'duk_swap', link: '/translation/duktape/api/duk_swap.md'},
                        {text: 'duk_swap_top', link: '/translation/duktape/api/duk_swap_top.md'},
                        {text: 'duk_throw', link: '/translation/duktape/api/duk_throw.md'},
                        {text: 'duk_to_boolean', link: '/translation/duktape/api/duk_to_boolean.md'},
                        {text: 'duk_to_buffer', link: '/translation/duktape/api/duk_to_buffer.md'},
                        {text: 'duk_to_dynamic_buffer', link: '/translation/duktape/api/duk_to_dynamic_buffer.md'},
                        {text: 'duk_to_fixed_buffer', link: '/translation/duktape/api/duk_to_fixed_buffer.md'},
                        {text: 'duk_to_int', link: '/translation/duktape/api/duk_to_int.md'},
                        {text: 'duk_to_int32', link: '/translation/duktape/api/duk_to_int32.md'},
                        {text: 'duk_to_lstring', link: '/translation/duktape/api/duk_to_lstring.md'},
                        {text: 'duk_to_null', link: '/translation/duktape/api/duk_to_null.md'},
                        {text: 'duk_to_number', link: '/translation/duktape/api/duk_to_number.md'},
                        {text: 'duk_to_object', link: '/translation/duktape/api/duk_to_object.md'},
                        {text: 'duk_to_pointer', link: '/translation/duktape/api/duk_to_pointer.md'},
                        {text: 'duk_to_primitive', link: '/translation/duktape/api/duk_to_primitive.md'},
                        {text: 'duk_to_string', link: '/translation/duktape/api/duk_to_string.md'},
                        {text: 'duk_to_uint', link: '/translation/duktape/api/duk_to_uint.md'},
                        {text: 'duk_to_uint16', link: '/translation/duktape/api/duk_to_uint16.md'},
                        {text: 'duk_to_uint32', link: '/translation/duktape/api/duk_to_uint32.md'},
                        {text: 'duk_to_undefined', link: '/translation/duktape/api/duk_to_undefined.md'},
                        {text: 'duk_trim', link: '/translation/duktape/api/duk_trim.md'},
                        {text: 'duk_xcopy_top', link: '/translation/duktape/api/duk_xcopy_top.md'},
                        {text: 'duk_xmove_top', link: '/translation/duktape/api/duk_xmove_top.md'},
                        {text: 'duk_def_prop', link: '/translation/duktape/api/duk_def_prop.md'},
                        {text: 'duk_error_va', link: '/translation/duktape/api/duk_error_va.md'},
                        {text: 'duk_get_error_code', link: '/translation/duktape/api/duk_get_error_code.md'},
                        {text: 'duk_get_heapptr', link: '/translation/duktape/api/duk_get_heapptr.md'},
                        {text: 'duk_is_error', link: '/translation/duktape/api/duk_is_error.md'},
                        {text: 'duk_push_error_object_va', link: '/translation/duktape/api/duk_push_error_object_va.md'},
                        {text: 'duk_push_heapptr', link: '/translation/duktape/api/duk_push_heapptr.md'},
                        {text: 'duk_require_heapptr', link: '/translation/duktape/api/duk_require_heapptr.md'},
                        {text: 'duk_debugger_attach', link: '/translation/duktape/api/duk_debugger_attach.md'},
                        {text: 'duk_debugger_cooperate', link: '/translation/duktape/api/duk_debugger_cooperate.md'},
                        {text: 'duk_debugger_detach', link: '/translation/duktape/api/duk_debugger_detach.md'},
                        {text: 'duk_config_buffer', link: '/translation/duktape/api/duk_config_buffer.md'},
                        {text: 'duk_dump_function', link: '/translation/duktape/api/duk_dump_function.md'},
                        {text: 'duk_get_buffer_data', link: '/translation/duktape/api/duk_get_buffer_data.md'},
                        {text: 'duk_instanceof', link: '/translation/duktape/api/duk_instanceof.md'},
                        {text: 'duk_load_function', link: '/translation/duktape/api/duk_load_function.md'},
                        {text: 'duk_pnew', link: '/translation/duktape/api/duk_pnew.md'},
                        {text: 'duk_push_buffer_object', link: '/translation/duktape/api/duk_push_buffer_object.md'},
                        {text: 'duk_push_external_buffer', link: '/translation/duktape/api/duk_push_external_buffer.md'},
                        {text: 'duk_require_buffer_data', link: '/translation/duktape/api/duk_require_buffer_data.md'},
                        {text: 'duk_steal_buffer', link: '/translation/duktape/api/duk_steal_buffer.md'},
                        {text: 'duk_is_eval_error', link: '/translation/duktape/api/duk_is_eval_error.md'},
                        {text: 'duk_is_range_error', link: '/translation/duktape/api/duk_is_range_error.md'},
                        {text: 'duk_is_reference_error', link: '/translation/duktape/api/duk_is_reference_error.md'},
                        {text: 'duk_is_syntax_error', link: '/translation/duktape/api/duk_is_syntax_error.md'},
                        {text: 'duk_is_type_error', link: '/translation/duktape/api/duk_is_type_error.md'},
                        {text: 'duk_is_uri_error', link: '/translation/duktape/api/duk_is_uri_error.md'},
                        {text: 'duk_require_callable', link: '/translation/duktape/api/duk_require_callable.md'},
                        {text: 'duk_require_function', link: '/translation/duktape/api/duk_require_function.md'},
                        {text: 'duk_debugger_notify', link: '/translation/duktape/api/duk_debugger_notify.md'},
                        {text: 'duk_debugger_pause', link: '/translation/duktape/api/duk_debugger_pause.md'},
                        {text: 'duk_resume', link: '/translation/duktape/api/duk_resume.md'},
                        {text: 'duk_suspend', link: '/translation/duktape/api/duk_suspend.md'},
                        {text: 'duk_buffer_to_string', link: '/translation/duktape/api/duk_buffer_to_string.md'},
                        {text: 'duk_components_to_time', link: '/translation/duktape/api/duk_components_to_time.md'},
                        {text: 'duk_del_prop_lstring', link: '/translation/duktape/api/duk_del_prop_lstring.md'},
                        {text: 'duk_eval_error', link: '/translation/duktape/api/duk_eval_error.md'},
                        {text: 'duk_eval_error_va', link: '/translation/duktape/api/duk_eval_error_va.md'},
                        {text: 'duk_generic_error', link: '/translation/duktape/api/duk_generic_error.md'},
                        {text: 'duk_generic_error_va', link: '/translation/duktape/api/duk_generic_error_va.md'},
                        {text: 'duk_get_global_lstring', link: '/translation/duktape/api/duk_get_global_lstring.md'},
                        {text: 'duk_get_now', link: '/translation/duktape/api/duk_get_now.md'},
                        {text: 'duk_get_prop_desc', link: '/translation/duktape/api/duk_get_prop_desc.md'},
                        {text: 'duk_get_prop_lstring', link: '/translation/duktape/api/duk_get_prop_lstring.md'},
                        {text: 'duk_has_prop_lstring', link: '/translation/duktape/api/duk_has_prop_lstring.md'},
                        {text: 'duk_inspect_callstack_entry', link: '/translation/duktape/api/duk_inspect_callstack_entry.md'},
                        {text: 'duk_inspect_value', link: '/translation/duktape/api/duk_inspect_value.md'},
                        {text: 'duk_is_buffer_data', link: '/translation/duktape/api/duk_is_buffer_data.md'},
                        {text: 'duk_is_symbol', link: '/translation/duktape/api/duk_is_symbol.md'},
                        {text: 'duk_push_bare_object', link: '/translation/duktape/api/duk_push_bare_object.md'},
                        {text: 'duk_put_global_lstring', link: '/translation/duktape/api/duk_put_global_lstring.md'},
                        {text: 'duk_put_prop_lstring', link: '/translation/duktape/api/duk_put_prop_lstring.md'},
                        {text: 'duk_range_error', link: '/translation/duktape/api/duk_range_error.md'},
                        {text: 'duk_range_error_va', link: '/translation/duktape/api/duk_range_error_va.md'},
                        {text: 'duk_reference_error', link: '/translation/duktape/api/duk_reference_error.md'},
                        {text: 'duk_reference_error_va', link: '/translation/duktape/api/duk_reference_error_va.md'},
                        {text: 'duk_samevalue', link: '/translation/duktape/api/duk_samevalue.md'},
                        {text: 'duk_set_length', link: '/translation/duktape/api/duk_set_length.md'},
                        {text: 'duk_syntax_error', link: '/translation/duktape/api/duk_syntax_error.md'},
                        {text: 'duk_syntax_error_va', link: '/translation/duktape/api/duk_syntax_error_va.md'},
                        {text: 'duk_time_to_components', link: '/translation/duktape/api/duk_time_to_components.md'},
                        {text: 'duk_type_error', link: '/translation/duktape/api/duk_type_error.md'},
                        {text: 'duk_type_error_va', link: '/translation/duktape/api/duk_type_error_va.md'},
                        {text: 'duk_uri_error', link: '/translation/duktape/api/duk_uri_error.md'},
                        {text: 'duk_uri_error_va', link: '/translation/duktape/api/duk_uri_error_va.md'},
                        {text: 'duk_get_boolean_default', link: '/translation/duktape/api/duk_get_boolean_default.md'},
                        {text: 'duk_get_buffer_data_default', link: '/translation/duktape/api/duk_get_buffer_data_default.md'},
                        {text: 'duk_get_buffer_default', link: '/translation/duktape/api/duk_get_buffer_default.md'},
                        {text: 'duk_get_c_function_default', link: '/translation/duktape/api/duk_get_c_function_default.md'},
                        {text: 'duk_get_context_default', link: '/translation/duktape/api/duk_get_context_default.md'},
                        {text: 'duk_get_heapptr_default', link: '/translation/duktape/api/duk_get_heapptr_default.md'},
                        {text: 'duk_get_int_default', link: '/translation/duktape/api/duk_get_int_default.md'},
                        {text: 'duk_get_lstring_default', link: '/translation/duktape/api/duk_get_lstring_default.md'},
                        {text: 'duk_get_number_default', link: '/translation/duktape/api/duk_get_number_default.md'},
                        {text: 'duk_get_pointer_default', link: '/translation/duktape/api/duk_get_pointer_default.md'},
                        {text: 'duk_get_string_default', link: '/translation/duktape/api/duk_get_string_default.md'},
                        {text: 'duk_get_uint_default', link: '/translation/duktape/api/duk_get_uint_default.md'},
                        {text: 'duk_opt_boolean', link: '/translation/duktape/api/duk_opt_boolean.md'},
                        {text: 'duk_opt_buffer', link: '/translation/duktape/api/duk_opt_buffer.md'},
                        {text: 'duk_opt_buffer_data', link: '/translation/duktape/api/duk_opt_buffer_data.md'},
                        {text: 'duk_opt_c_function', link: '/translation/duktape/api/duk_opt_c_function.md'},
                        {text: 'duk_opt_context', link: '/translation/duktape/api/duk_opt_context.md'},
                        {text: 'duk_opt_heapptr', link: '/translation/duktape/api/duk_opt_heapptr.md'},
                        {text: 'duk_opt_int', link: '/translation/duktape/api/duk_opt_int.md'},
                        {text: 'duk_opt_lstring', link: '/translation/duktape/api/duk_opt_lstring.md'},
                        {text: 'duk_opt_number', link: '/translation/duktape/api/duk_opt_number.md'},
                        {text: 'duk_opt_pointer', link: '/translation/duktape/api/duk_opt_pointer.md'},
                        {text: 'duk_opt_string', link: '/translation/duktape/api/duk_opt_string.md'},
                        {text: 'duk_opt_uint', link: '/translation/duktape/api/duk_opt_uint.md'},
                        {text: 'duk_del_prop_heapptr', link: '/translation/duktape/api/duk_del_prop_heapptr.md'},
                        {text: 'duk_freeze', link: '/translation/duktape/api/duk_freeze.md'},
                        {text: 'duk_get_prop_heapptr', link: '/translation/duktape/api/duk_get_prop_heapptr.md'},
                        {text: 'duk_has_prop_heapptr', link: '/translation/duktape/api/duk_has_prop_heapptr.md'},
                        {text: 'duk_is_constructable', link: '/translation/duktape/api/duk_is_constructable.md'},
                        {text: 'duk_push_proxy', link: '/translation/duktape/api/duk_push_proxy.md'},
                        {text: 'duk_put_prop_heapptr', link: '/translation/duktape/api/duk_put_prop_heapptr.md'},
                        {text: 'duk_require_object', link: '/translation/duktape/api/duk_require_object.md'},
                        {text: 'duk_seal', link: '/translation/duktape/api/duk_seal.md'},
                        {text: 'duk_del_prop_literal', link: '/translation/duktape/api/duk_del_prop_literal.md'},
                        {text: 'duk_get_global_heapptr', link: '/translation/duktape/api/duk_get_global_heapptr.md'},
                        {text: 'duk_get_global_literal', link: '/translation/duktape/api/duk_get_global_literal.md'},
                        {text: 'duk_get_prop_literal', link: '/translation/duktape/api/duk_get_prop_literal.md'},
                        {text: 'duk_has_prop_literal', link: '/translation/duktape/api/duk_has_prop_literal.md'},
                        {text: 'duk_push_literal', link: '/translation/duktape/api/duk_push_literal.md'},
                        {text: 'duk_push_new_target', link: '/translation/duktape/api/duk_push_new_target.md'},
                        {text: 'duk_put_global_heapptr', link: '/translation/duktape/api/duk_put_global_heapptr.md'},
                        {text: 'duk_put_global_literal', link: '/translation/duktape/api/duk_put_global_literal.md'},
                        {text: 'duk_put_prop_literal', link: '/translation/duktape/api/duk_put_prop_literal.md'},
                        {text: 'duk_random', link: '/translation/duktape/api/duk_random.md'},
                        {text: 'duk_push_bare_array', link: '/translation/duktape/api/duk_push_bare_array.md'},
                        {text: 'duk_require_constructable', link: '/translation/duktape/api/duk_require_constructable.md'},
                        {text: 'duk_require_constructor_call', link: '/translation/duktape/api/duk_require_constructor_call.md'},
                        {text: 'duk_safe_to_stacktrace', link: '/translation/duktape/api/duk_safe_to_stacktrace.md'},
                        {text: 'duk_to_stacktrace', link: '/translation/duktape/api/duk_to_stacktrace.md'},
                        {text: 'duk_cbor_decode', link: '/translation/duktape/api/duk_cbor_decode.md'},
                        {text: 'duk_cbor_encode', link: '/translation/duktape/api/duk_cbor_encode.md'},
                        {text: 'duk_pull', link: '/translation/duktape/api/duk_pull.md'},
                    ]
                },
                {
                    text: 'wiki',
                    collapsed: true,
                    items: [
                        {text: 'はじめに', link: '/translation/duktape/wiki/'},
                        {text: 'ライン処理', link: '/translation/duktape/wiki/process_lines.md'},
                        {text: 'プライマリーテスト', link: '/translation/duktape/wiki/prime_test.md'},
                        {text: '致命的なエラーの処理方法', link: '/translation/duktape/wiki/how_to_handle_fatal_errors.md'},
                        {text: '値スタック型の扱い方', link: '/translation/duktape/wiki/how_to_work_with_calue_stack_types.md'},
                        {text: '関数呼び出しの方法', link: '/translation/duktape/wiki/how_to_make_function_calls.md'},
                        {text: '仮想プロパティの使い方', link: '/translation/duktape/wiki/how_to_use_virtual_properties.md'},
                        {text: 'ファイナライゼーションの使い方', link: '/translation/duktape/wiki/how_to_use_finalization.md'},
                        {text: 'バッファの扱い方', link: '/translation/duktape/wiki/how_to_work_with_buffers_in_duktape_2x.md'},
                        {text: 'lightfuncsの使い方', link: '/translation/duktape/wiki/how_to_work_with_lightfuncs.md'},
                        {text: 'モジュールの使い方', link: '/translation/duktape/wiki/how_to_modules.md'},
                        {text: 'コルーチンの使い方', link: '/translation/duktape/wiki/how_to_coroutines.md'},
                        {text: 'ロギングの使い方', link: '/translation/duktape/wiki/how_to_use_logging.md'},
                        {text: 'ネイティブコードでオブジェクト参照を持続させる方法', link: '/translation/duktape/wiki/how_to_persist_object_references_in_native_code.md'},
                        {text: 'ネイティブのコンストラクタ関数の書き方', link: '/translation/duktape/wiki/how_to_write_a_native_constructor_function.md'},
                        {text: '配列の反復処理', link: '/translation/duktape/wiki/how_to_iterate_over_an_array.md'},
                        {text: 'エラー・オブジェクトを拡張する', link: '/translation/duktape/wiki/how_to_augment_error_objects.md'},
                        {text: 'Duktapeバイトコードのデコード方法', link: '/translation/duktape/wiki/how_to_decode_duktape_bytecode.md'},
                        {text: '非BMP文字を扱うには', link: '/translation/duktape/wiki/how_to_work_with_non-bmp_characters.md'},
                        {text: 'グローバル・オブジェクトへの参照を取得する方法', link: '/translation/duktape/wiki/how_to_get_a_reference_to_the_global_object.md'},
                        {text: 'ベアメタルプラットフォームで動作させる方法', link: '/translation/duktape/wiki/how_to_run_on_bare_metal_platforms.md'},
                        {text: 'デバッグ・プリントを有効にする方法', link: '/translation/duktape/wiki/how_to_enable_debug_prints.md'},
                        {text: 'Duktape用のエディターを設定する方法', link: '/translation/duktape/wiki/how_to_configure_your_editor_for_duktape.md'},
                        {text: 'Duktapeを開発するための設定', link: '/translation/duktape/wiki/development_setup_for_developing_duktape.md'},
                        {text: 'トラブルシューティングの基本', link: '/translation/duktape/wiki/troubleshooting_basics.md'},
                        {text: '内部プロトタイプと外部プロトタイプ', link: '/translation/duktape/wiki/internal_and_external_prototype.md'},
                        {text: 'API Cタイプ', link: '/translation/duktape/wiki/api_c_types.md'},
                        {text: 'ES5以降の機能', link: '/translation/duktape/wiki/post-es5_features.md'},
                        {text: 'ビルドのためのDuktapeの設定', link: '/translation/duktape/wiki/congifuring_duktape_for_build.md'},
                        {text: '設定オプション', link: '/translation/duktape/wiki/config_options.md'},
                        {text: '移植性', link: '/translation/duktape/wiki/portability.md'},
                        {text: 'TypeScriptとの互換性', link: '/translation/duktape/wiki/compatibility_with_typescript.md'},
                        {text: 'パフォーマンスを最適化する方法', link: '/translation/duktape/wiki/how_to_optimize_performance.md'},
                        {text: 'Duktapeを使ったプロジェクト', link: '/translation/duktape/wiki/projects_using_duktape.md'},
                        {text: 'デバッグ・クライアント', link: '/translation/duktape/wiki/debug_clients.md'},
                    ]
                },
                {
                    text: 'ドキュメント',
                    collapsed: true,
                    items: [
                        {text: 'API設計ガイドライン', link: '/translation/duktape/doc/api-design-guidelines.md'},
                        {text: '引数オブジェクト', link: '/translation/duktape/doc/arguments-object.md'},
                        {text: 'ベンチマークノート', link: '/translation/duktape/doc/benchmarking-notes.md'},
                        {text: 'バッファ', link: '/translation/duktape/doc/buffers.md'},
                        {text: 'バイトコード形式', link: '/translation/duktape/doc/bytecode.md'},
                        {text: 'Cモジュール規約', link: '/translation/duktape/doc/c-module-convention.md'},
                        {text: 'CBOR', link: '/translation/duktape/doc/cbor.md'},
                        {text: 'コードの問題', link: '/translation/duktape/doc/code-issues.md'},
                        {text: 'コンパイラ', link: '/translation/duktape/doc/compiler.md'},
                        {text: '日付と時刻', link: '/translation/duktape/doc/datetime.md'},
                        {text: 'デバッガ', link: '/translation/duktape/doc/debugger.md'},
                        {text: '設定ヘッダ', link: '/translation/duktape/doc/duk-config.md'},
                        {text: 'Emscriptenの互換性', link: '/translation/duktape/doc/emscripten-status.md'},
                        {text: 'エラーオブジェクト', link: '/translation/duktape/doc/error-objects.md'},
                        {text: '実行', link: '/translation/duktape/doc/execution.md'},
                        {text: 'Fastint型', link: '/translation/duktape/doc/fastint.md'},
                        {text: '関数テンプレート', link: '/translation/duktape/doc/function-objects.md'},
                        {text: 'Gitの規約', link: '/translation/duktape/doc/git-conventions.md'},
                        {text: 'defineProperties', link: '/translation/duktape/doc/hobject-alg-defineproperties.md'},
                        {text: 'defineProperty', link: '/translation/duktape/doc/hobject-alg-defineproperty.md'},
                        {text: 'DELPROP', link: '/translation/duktape/doc/hobject-alg-delprop.md'},
                        {text: 'Exotic behaviors', link: '/translation/duktape/doc/hobject-alg-exoticbehaviors.md'},
                        {text: 'getOwnPropertyDescriptor', link: '/translation/duktape/doc/hobject-alg-getownpropertydescriptor.md'},
                        {text: 'GETPROP', link: '/translation/duktape/doc/hobject-alg-getprop.md'},
                        {text: 'HASPROP', link: '/translation/duktape/doc/hobject-alg-hasprop.md'},
                        {text: 'INSTOF', link: '/translation/duktape/doc/hobject-alg-instof.md'},
                        {text: 'Preliminary algorithm work', link: '/translation/duktape/doc/hobject-alg-preliminaries.md'},
                        {text: 'PUTPROP', link: '/translation/duktape/doc/hobject-alg-putprop.md'},
                        {text: 'duk_hobject algorithms', link: '/translation/duktape/doc/hobject-algorithms.md'},
                        {text: 'duk_hobject', link: '/translation/duktape/doc/hobject-design.md'},
                        {text: 'Object enumeration issues', link: '/translation/duktape/doc/hobject-enumeration.md'},
                        {text: 'Identifier algorithms', link: '/translation/duktape/doc/identifier-handling.md'},
                        {text: 'JSON built-in', link: '/translation/duktape/doc/json.md'},
                        {text: 'Lightweight function value', link: '/translation/duktape/doc/lightweight-functions.md'},
                        {text: 'Duktape logging framework', link: '/translation/duktape/doc/logging.md'},
                        {text: 'Low memory environments', link: '/translation/duktape/doc/low-memory.md'},
                        {text: 'Memory management', link: '/translation/duktape/doc/memory-management.md'},
                        {text: 'Modules', link: '/translation/duktape/doc/modules.md'},
                        {text: 'Number-to-string and string-to-number conversions', link: '/translation/duktape/doc/number-conversion.md'},
                        {text: 'Moving objects to code section', link: '/translation/duktape/doc/objects-in-code-section.md'},
                        {text: 'Performance sensitive environments', link: '/translation/duktape/doc/performance-sensitive.md'},
                        {text: 'Regular expressions', link: '/translation/duktape/doc/regexp.md'},
                        {text: 'リリースチェックリスト', link: '/translation/duktape/doc/release-checklist.md'},
                        {text: 'Duktape 1.0 リリースノート', link: '/translation/duktape/doc/release-notes-v1-0.md'},
                        {text: 'Duktape 1.1 リリースノート', link: '/translation/duktape/doc/release-notes-v1-1.md'},
                        {text: 'Duktape 1.2 リリースノート', link: '/translation/duktape/doc/release-notes-v1-2.md'},
                        {text: 'Duktape 1.3 リリースノート', link: '/translation/duktape/doc/release-notes-v1-3.md'},
                        {text: 'Duktape 1.4 リリースノート', link: '/translation/duktape/doc/release-notes-v1-4.md'},
                        {text: 'Duktape 1.5 リリースノート', link: '/translation/duktape/doc/release-notes-v1-5.md'},
                        {text: 'Duktape 1.6 リリースノート', link: '/translation/duktape/doc/release-notes-v1-6.md'},
                        {text: 'Duktape 2.0 リリースノート', link: '/translation/duktape/doc/release-notes-v2-0.md'},
                        {text: 'Duktape 2.1 リリースノート', link: '/translation/duktape/doc/release-notes-v2-1.md'},
                        {text: 'Duktape 2.2 リリースノート', link: '/translation/duktape/doc/release-notes-v2-2.md'},
                        {text: 'Duktape 2.3 リリースノート', link: '/translation/duktape/doc/release-notes-v2-3.md'},
                        {text: 'Duktape 2.4 リリースノート', link: '/translation/duktape/doc/release-notes-v2-4.md'},
                        {text: 'Duktape 2.5 リリースノート', link: '/translation/duktape/doc/release-notes-v2-5.md'},
                        {text: 'Duktape 2.6 リリースノート', link: '/translation/duktape/doc/release-notes-v2-6.md'},
                        {text: 'Duktape 2.7 リリースノート', link: '/translation/duktape/doc/release-notes-v2-7.md'},
                        {text: 'Duktape 3.0 リリースノート', link: '/translation/duktape/doc/release-notes-v3-0.md'},
                        {text: 'reStructuredText conventions', link: '/translation/duktape/doc/rst-conventions.md'},
                        {text: 'Sandboxing Duktape', link: '/translation/duktape/doc/sandboxing.md'},
                        {text: 'Side effects', link: '/translation/duktape/doc/side-effects.md'},
                        {text: 'ソート', link: '/translation/duktape/doc/sorting.md'},
                        {text: 'String table', link: '/translation/duktape/doc/string-table.md'},
                        {text: 'ES2015 Symbols in Duktape 2.x', link: '/translation/duktape/doc/symbols.md'},
                        {text: 'Installing Duktape as a system library', link: '/translation/duktape/doc/system-install.md'},
                        {text: 'Status of test262 testcases', link: '/translation/duktape/doc/test262-status.md'},
                        {text: 'Testcases', link: '/translation/duktape/doc/testcases.md'},
                        {text: 'Duktape threading', link: '/translation/duktape/doc/threading.md'},
                        {text: 'タイミングに敏感な環境', link: '/translation/duktape/doc/timing-sensitive.md'},
                        {text: 'Duktape typing', link: '/translation/duktape/doc/types.md'},
                        {text: 'Status of underscore testcases', link: '/translation/duktape/doc/underscore-status.md'},
                        {text: 'Unicode support', link: '/translation/duktape/doc/unicode-support.md'},
                        {text: 'URI encoding and decoding', link: '/translation/duktape/doc/uri.md'},
                        {text: 'Using UTF-8 as internal representation', link: '/translation/duktape/doc/utf8-internal-representation.md'},
                        {text: 'Value stack resizing', link: '/translation/duktape/doc/value-stack-resizing.md'},
                    ],
                },
            ],
            '/translation/GLFW/': [
                {
                    text: 'GLFW',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/GLFW/'},
                        {text: 'イントロダクション', link: '/translation/GLFW/introduction.md'},
                        {text: 'チュートリアル', link: '/translation/GLFW/Tutorial/'},
                    ]
                },
                {
                    text: 'プログラミングガイド',
                    collapsed: false,
                    items: [
                        {text: 'API入門', link: '/translation/GLFW/Guides/introduction_to_the_api.md'},
                        {text: 'ウィンドウガイド', link: '/translation/GLFW/Guides/window_guide.md'},
                        {text: 'コンテキストガイド', link: '/translation/GLFW/Guides/context_guide.md'},
                        {text: 'モニターガイド', link: '/translation/GLFW/Guides/monitor_guide.md'},
                        {text: '入力ガイド', link: '/translation/GLFW/Guides/input_guide.md'},
                    ]
                },
                {
                    text: 'リファレンス',
                    collapsed: false,
                    items: [
                        {text: '目次', link: '/translation/GLFW/Reference/'},
                        {text: 'コンテキスト', link: '/translation/GLFW/Reference/context.md'},
                        {text: '初期化など', link: '/translation/GLFW/Reference/init.md'},
                        {text: 'エラーコード', link: '/translation/GLFW/Reference/error.md'},
                        {text: '入力', link: '/translation/GLFW/Reference/input.md'},
                        {text: 'ゲームパッドの軸', link: '/translation/GLFW/Reference/gamepad_axes.md'},
                        {text: 'ゲームパッドのボタン', link: '/translation/GLFW/Reference/gamepad_buttons.md'},
                        {text: 'ジョイスティックのハット', link: '/translation/GLFW/Reference/joystick_hat_states.md'},
                        {text: 'ジョイスティック', link: '/translation/GLFW/Reference/joysticks.md'},
                        {text: 'キーボードのキー', link: '/translation/GLFW/Reference/keyboard_keys.md'},
                        {text: '修飾キー', link: '/translation/GLFW/Reference/modifier_key_flags.md'},
                        {text: 'マウスボタン', link: '/translation/GLFW/Reference/mouse_buttons.md'},
                        {text: 'カーソルの形状', link: '/translation/GLFW/Reference/standard_cursor_shapes.md'},
                        {text: 'モニター', link: '/translation/GLFW/Reference/monitor.md'},
                        {text: 'ネイティブアクセス', link: '/translation/GLFW/Reference/native.md'},
                        {text: 'Vulkanサポート', link: '/translation/GLFW/Reference/vulkan.md'},
                        {text: 'ウィンドウ', link: '/translation/GLFW/Reference/window.md'},
                        
                    ]
                },
            ],
            '/translation/honkit/': [
                {
                    text: 'Honkit',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/honkit/'},
                        {text: 'インストールとセットアップ', link: '/translation/honkit/setup.md'},
                        {text: 'よくある質問', link: '/translation/honkit/faq.md'},
                        {text: '例', link: '/translation/honkit/examples.md'},
                    ]
                },
                {
                    text: 'コンテンツ',
                    collapsed: false,
                    items: [
                        {text: 'ディレクトリ構造', link: '/translation/honkit/structure.md'},
                        {text: 'ページと概要', link: '/translation/honkit/pages.md'},
                        {text: 'コンフィギュレーション', link: '/translation/honkit/config.md'},
                        {text: '用語集', link: '/translation/honkit/lexicon.md'},
                        {text: 'マルチリンガル', link: '/translation/honkit/languages.md'},
                        {text: 'マークダウン', link: '/translation/honkit/syntax/markdown.md'},
                        {text: 'AsciiDoc', link: '/translation/honkit/syntax/asciidoc.md'},
                        {text: 'eBookとPDF', link: '/translation/honkit/ebook.md'},
                    ]
                },
                {
                    text: 'カスタマイズ',
                    collapsed: false,
                    items: [
                        {text: 'テンプレート化', link: '/translation/honkit/templating/index.md'},
                        {text: 'コンテンツの参照先', link: '/translation/honkit/templating/conrefs.md'},
                        {text: '変数', link: '/translation/honkit/templating/variables.md'},
                        {text: 'ビルトイン', link: '/translation/honkit/templating/builtin.md'},
                        {text: 'プラグイン', link: '/translation/honkit/plugins/'},
                        {text: 'プラグインの作成', link: '/translation/honkit/plugins/create.md'},
                        {text: 'フック', link: '/translation/honkit/plugins/hooks.md'},
                        {text: 'ブロック', link: '/translation/honkit/plugins/blocks.md'},
                        {text: 'フィルター', link: '/translation/honkit/plugins/filters.md'},
                        {text: 'APIとコンテキスト', link: '/translation/honkit/plugins/api.md'},
                        {text: 'プラグインのテスト', link: '/translation/honkit/plugins/testing.md'},
                        {text: 'テーマ', link: '/translation/honkit/themes/'},
                    ]
                },
            ],
            '/translation/hsp/': [
                {
                    text: 'HSP',
                    collapsed: false,
                    items: [
                        {text: '目次', link: '/translation/hsp/'},
                        {text: '付録', link: '/translation/hsp/appendix.md'},
                    ]
                },
                {
                    text: 'リファレンス',
                    collapsed: false,
                    items: [
                        {text: 'プリプロセッサ', link: '/translation/hsp/i_prep.md'},
                        {text: 'システム変数', link: '/translation/hsp/sysval.md'},
                        {text: 'プログラム制御', link: '/translation/hsp/i_prog.md'},
                        {text: '標準マクロ', link: '/translation/hsp/hspdef.md'},
                        {text: '特殊マクロ', link: '/translation/hsp/ex_macro.md'},
                        {text: '基本関数', link: '/translation/hsp/i_stdfunc.md'},
                        {text: '画面制御', link: '/translation/hsp/i_graph.md'},
                        {text: 'オブジェクト', link: '/translation/hsp/i_object.md'},
                        {text: '文字列', link: '/translation/hsp/i_string.md'},
                        {text: '数学', link: '/translation/hsp/hspmath.md'},
                        {text: '入出力', link: '/translation/hsp/i_stdio.md'},
                        {text: 'ファイル', link: '/translation/hsp/i_file.md'},
                        {text: 'メモリ', link: '/translation/hsp/i_mem.md'},
                        {text: 'マルチメディア', link: '/translation/hsp/i_mmedia.md'},
                        {text: 'ユーティリティ', link: '/translation/hsp/i_hsp3util.md'},
                        {text: 'ソケット通信', link: '/translation/hsp/hspsock.md'},
                        {text: 'スプライト', link: '/translation/hsp/sprite.md'},
                        {text: 'HSP3Dish', link: '/translation/hsp/hsp3dish.md'},
                        {text: 'HGIMG4共通', link: '/translation/hsp/hgimg_common.md'},
                        {text: 'HGIMG4', link: '/translation/hsp/hgimg4.md'},
                        {text: 'OBAQ', link: '/translation/hsp/obaq.md'},
                    ]
                },
            ],
            '/translation/imgui/': [
                {
                    text: 'ImGui',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/imgui/'},
                        {text: 'imgui.h', link: '/translation/imgui/imgui_h.md'},
                    ]
                }
            ],
            '/translation/javascript/': [
                {
                    text: 'JavaScript',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/javascript/'},
                        {text: 'ES5.1組み込みオブジェクト', link: '/translation/javascript/es5.1/'},
                    ]
                },
                {
                    text: 'ベストプラクティス',
                    collapsed: false,
                    items: [
                        {text: '50のルール', link: '/translation/javascript/50_javascript_best_practice.md'},
                        {text: 'Clean Code', link: '/translation/javascript/clean_code_javascript.md'},
                        {text: 'W3C', link: '/translation/javascript/javascript_best_practices.md'},
                    ]
                },
            ],
            '/translation/libffi/': [
                {
                    text: 'libffi',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/libffi/'},
                        {text: 'マニュアル', link: '/translation/libffi/manual'},
                    ]
                },
            ],
            '/translation/llvm/': [
                {
                    text: 'LLVM',
                    collapsed: false,
                    items: [
                        {text: '概要', link: '/translation/llvm/'},
                        {text: '特徴', link: '/translation/llvm/features'},
                        {text: 'LLVMシステム入門', link: '/translation/llvm/getting_started'}
                    ]
                },
                {
                    text: 'LLVM デザインと概要',
                    collapsed: true,
                    items: [
                        {text: '目次', link: '/translation/llvm/doc/'},
                        {text: 'Clean Code', link: '/translation/llvm/doc/'},
                        {text: 'W3C', link: '/translation/llvm/doc/'},
                    ]
                },
            ],
            '/translation/mastodon/': [
                {
                    text: 'Mastodon',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/mastodon/'},
                    ]
                },
                {
                    text: 'マストドンを実行する',
                    collapsed: false,
                    items: [
                        {text: 'マシンを準備する', link: '/translation/mastodon/running/'},
                        {text: 'ソースからのインストール', link: '/translation/mastodon/running/install'},
                        {text: '環境を設定する', link: '/translation/mastodon/running/config'},
                        {text: 'オプション機能のインストール', link: '/translation/mastodon/running/optional'},
                        {text: '新しいインスタンスのセットアップ', link: '/translation/mastodon/running/setup'},
                        {text: '管理者用CLIを使用する', link: '/translation/mastodon/running/tootctl'},
                        {text: '新しいリリースへのアップグレード', link: '/translation/mastodon/running/upgrading'},
                        {text: 'サーバーのバックアップ', link: '/translation/mastodon/running/backups'},
                        {text: '新しいマシンへの移行', link: '/translation/mastodon/running/migrating'},
                        {text: 'サーバーのスケールアップ', link: '/translation/mastodon/running/scaling'},
                        {text: 'モデレーションアクション', link: '/translation/mastodon/running/moderation'},
                        {text: 'トラブルシューティングエラー', link: '/translation/mastodon/running/troubleshooting'},
                    ]
                },
            ],
            '/translation/mermaid/': [
                {
                    text: 'Mermaid',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/mermaid/'},
                        {text: 'デプロイ', link: '/translation/mermaid/deployment'},
                    ]
                },
            ],
            '/translation/meson/': [
                {
                    text: 'Meson',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/meson/'},
                        {text: '初心者ガイド', link: '/translation/meson/simplestart.md'},
                        {text: 'インストール', link: '/translation/meson/getting_meson.md'},
                        {text: 'クイックスタート', link: '/translation/meson/quick_guide.md'},
                        {text: 'チュートリアル', link: '/translation/meson/tutorial.md'},
                        {text: 'SDLチュートリアル', link: '/translation/meson/guitutorial.md'},
                    ]
                },
            ],
            '/translation/natural-docs/': [
                {
                    text: 'Natural Docs',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/natural-docs/'},
                        {text: 'セットアップ', link: '/translation/natural-docs/getting_started/getting_set_up.md'},
                        {text: 'コードの文書化', link: '/translation/natural-docs/getting_started/documenting_you_code.md'},
                        {text: 'ドキュメントの作成', link: '/translation/natural-docs/getting_started/building_the_documentation.md'},
                        {text: 'カスタマイズ', link: '/translation/natural-docs/getting_started/further_customization.md'},
                    ]
                },
            ],
            '/translation/ninja/': [
                {
                    text: 'Ninja',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/ninja/'},
                        {text: 'イントロダクション', link: '/translation/ninja/introduction.md'},
                        {text: 'Ninjaを使用する', link: '/translation/ninja/using_ninja_for_your_project.md'},
                        {text: 'Ninjaファイルを作成する', link: '/translation/ninja/writing_your_own_ninja_files.md'},
                        {text: '詳細', link: '/translation/ninja/more_details.md'},
                        {text: 'リファレンス', link: '/translation/ninja/ninja_file_reference.md'},
                        {text: '動的従属性', link: '/translation/ninja/dynamic_dependencies.md'},
                    ]
                },
            ],
            '/translation/nodejs/': [
                {
                    text: 'Node.js',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/nodejs/'},
                        {text: 'C++アドオン', link: '/translation/nodejs/addons'},
                        {text: 'Node API', link: '/translation/nodejs/n-api'},
                    ]
                },
            ],
            '/translation/nuklear/': [
                {
                    text: 'Nuklear',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/nuklear/'},
                        {text: 'ドキュメント', link: '/translation/nuklear/doc'},
                    ]
                },
            ],
            '/translation/pegjs/': [
                {
                    text: 'PEG.js',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/pegjs/'},
                        {text: 'ドキュメント', link: '/translation/pegjs/documentation'},
                    ]
                },
            ],
            '/translation/processing/': [
                {
                    text: 'Processing',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/processing'},
                    ]
                },
            ],
            '/translation/pygame/reference/': [
                {
                    text: 'Reference',
                    collapsed: false,
                    items: [
                        {text: 'リファレンス', link: '/translation/pygame/'},
                    ]
                },
            ],
            '/translation/sass/': [
                {
                    text: 'Sass',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/sass/'},
                        {text: 'シンタックス', link: '/translation/sass/syntax.md'},
                        {text: 'スタイルルール', link: '/translation/sass/style_rules.md'},
                        {text: '変数', link: '/translation/sass/variables.md'},
                        {text: '補間', link: '/translation/sass/interpolation.md'},
                        {text: '@ルール', link: '/translation/sass/at-rules.md'},
                        {text: '値', link: '/translation/sass/values.md'},
                        {text: '演算子', link: '/translation/sass/operators.md'},
                        {text: '組み込みモジュール', link: '/translation/sass/modules.md'},
                        {text: 'ブレイキングチェンジ', link: '/translation/sass/changes.md'},
                        {text: 'コマンドライン', link: '/translation/sass/command_line.md'},
                        {text: 'JavaScript API', link: '/translation/sass/api.md'},
                    ]
                },
            ],
            '/translation/scripting/': [
                {
                    text: 'Scripting',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/scripting/'},
                        {text: '組み込みスクリプト言語', link: '/translation/scripting/embedded-scripting-languages.md'},
                        {text: 'JSにコンパイル可能', link: '/translation/scripting/js-languages.md'},
                        {text: 'Luaにコンパイル可能', link: '/translation/scripting/lua-languages.md'},
                    ]
                },
            ],
            '/translation/sokol/': [
                {
                    text: 'Sokol',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/sokol/'},
                    ]
                },
                {
                    text: 'コアライブラリ',
                    collapsed: false,
                    items: [
                        {text: 'gfx', link: '/translation/sokol/gfx.md'},
                        {text: 'app', link: '/translation/sokol/app.md'},
                        {text: 'time', link: '/translation/sokol/time.md'},
                        {text: 'audio', link: '/translation/sokol/audio.md'},
                        {text: 'fetch', link: '/translation/sokol/fetch.md'},
                        {text: 'args', link: '/translation/sokol/args.md'},
                        {text: 'glue', link: '/translation/sokol/glue.md'},
                    ]
                },
                {
                    text: 'ユーティリティ',
                    collapsed: false,
                    items: [
                        {text: 'imgui', link: '/translation/sokol/imgui.md'},
                        {text: 'nuklear', link: '/translation/sokol/nuklear.md'},
                        {text: 'gl', link: '/translation/sokol/gl.md'},
                        {text: 'fontstash', link: '/translation/sokol/fontstash.md'},
                        {text: 'gfx_imgui', link: '/translation/sokol/gfx_imgui.md'},
                        {text: 'debugtext', link: '/translation/sokol/debugtext.md'},
                        {text: 'memtrack', link: '/translation/sokol/memtrack.md'},
                        {text: 'shape', link: '/translation/sokol/shape.md'},
                        {text: 'color', link: '/translation/sokol/color.md'},
                        {text: 'spine', link: '/translation/sokol/spine.md'},
                    ]
                },
            ],
            '/translation/stb/': [
                {
                    text: 'stb',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/stb/'},
                        {text: 'パブリックドメイン', link: '/translation/stb/why_public_domain.md'},
                        {text: 'stb', link: '/translation/stb/stb.md'},
                        {text: 'シングルファイル', link: '/translation/stb/single_file_libs.md'},
                        {text: 'stb_image.h', link: '/translation/stb/stb_image_h.md'},
                        {text: 'stb_truetype.h', link: '/translation/stb/stb_truetype_h.md'},
                    ]
                },
            ],
            '/translation/steamos/': [
                {
                    text: 'SteamOS',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/steamos/'},
                        {text: 'Steamマシンを組み立てる', link: '/translation/steamos/buildyourown.md'},
                        {text: 'OEM', link: '/translation/steamos/oem.md'},
                        {text: 'FAQ', link: '/translation/steamos/faq.md'},
                    ]
                },
            ],
            '/translation/steamworks/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/steamworks/'},
                    ]
                },
            ],
            '/translation/svelte/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/svelte/'},
                    ]
                },
            ],
            '/translation/typescript/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/typescript/'},
                    ]
                },
            ],
            '/translation/uthash/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/uthash/'},
                        {text: 'uthash', link: '/translation/uthash/uthash.md'},
                        {text: 'utlist', link: '/translation/uthash/utlist.md'},
                        {text: 'utarray', link: '/translation/uthash/utarray.md'},
                        {text: 'utringbuffer', link: '/translation/uthash/utringbuffer.md'},
                        {text: 'utstack', link: '/translation/uthash/utstack.md'},
                        {text: 'utstring', link: '/translation/uthash/utstring.md'},
                    ]
                },
            ],
            '/translation/v8/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/v8/'},
                        {text: 'v8.h', link: '/translation/v8/v8_h'},
                        {text: 'v8-primitive.h', link: '/translation/v8/v8-primitive_h'},
                    ]
                },
            ],
            '/translation/vitepress/': [
                {
                    text: 'VitePress',
                    collapsed: false,
                    items: [
                        {text: '概要', link: '/translation/vitepress/'},
                        {text: 'VitePressとは', link: '/translation/vitepress/what-is-vitepress.md'},
                        {text: 'はじめに', link: '/translation/vitepress/getting-started.md'},
                        {text: 'コンフィギュレーション', link: '/translation/vitepress/configuration.md'},
                        {text: 'デプロイメント', link: '/translation/vitepress/deploying.md'},
                    ]
                },
                {
                    text: 'ライティング',
                    collapsed: false,
                    items: [
                        {text: 'Markdownの拡張機能', link: '/translation/vitepress/markdown.md'},
                        {text: 'アセットハンドリング', link: '/translation/vitepress/asset-handling.md'},
                        {text: 'フロントマター', link: '/translation/vitepress/frontmatter.md'},
                        {text: 'MarkdownでVueを使用する', link: '/translation/vitepress/using-vue.md'},
                        {text: 'APIリファレンス', link: '/translation/vitepress/api.md'},
                    ]
                },
                {
                    text: 'テーマ',
                    collapsed: false,
                    items: [
                        {text: 'テーマ紹介', link: '/translation/vitepress/theme-introduction.md'},
                        {text: 'Nav', link: '/translation/vitepress/theme-nav.md'},
                        {text: 'Sidebar', link: '/translation/vitepress/theme-sidebar.md'},
                        {text: 'Prev Next Link', link: '/translation/vitepress/theme-prev-next-link.md'},
                        {text: 'Edit Link', link: '/translation/vitepress/theme-edit-link.md'},
                        {text: 'Last Updated', link: '/translation/vitepress/theme-last-updated.md'},
                        {text: 'Layout', link: '/translation/vitepress/theme-layout.md'},
                        {text: 'Home Page', link: '/translation/vitepress/theme-home-page.md'},
                        {text: 'Team Page', link: '/translation/vitepress/theme-team-page.md'},
                        {text: 'Badge', link: '/translation/vitepress/theme-badge.md'},
                        {text: 'Footer', link: '/translation/vitepress/theme-footer.md'},
                        {text: 'Search', link: '/translation/vitepress/theme-search.md'},
                        {text: 'Carbon Ads', link: '/translation/vitepress/theme-carbon-ads.md'},

                    ]
                },
                {
                    text: '移行',
                    collapsed: false,
                    items: [
                        {text: 'VuePressからの移行', link: '/translation/vitepress/migration-from-vuepress.md'},
                        {text: 'VitePress 0.xからの移行', link: '/translation/vitepress/migration-from-vitepress-0.md'},
                    ]
                },
            ],
            '/translation/vivliostyle/': [
                {
                    text: 'VivlioStyle',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/vivliostyle/'},
                        {text: 'Viewer', link: '/translation/vivliostyle/vivliostyle-viewer'},
                        {text: 'CLI', link: '/translation/vivliostyle/vivliostyle-cli'},
                        {text: 'Create Book', link: '/translation/vivliostyle/create-book'},
                        {text: 'サポートするCSS機能', link: '/translation/vivliostyle/supported-css-features'},
                        {text: 'Core APIリファレンス', link: '/translation/vivliostyle/api'},
                        {text: 'コントリビューションガイド', link: '/translation/vivliostyle/contribution-guide'},
                        {text: 'VFM概要', link: '/translation/vivliostyle/vfm_overview'},
                        {text: 'VFM', link: '/translation/vivliostyle/vfm'},
                        {text: 'テーマ', link: '/translation/vivliostyle/themes'},
                        
                    ]
                },
            ],
            '/translation/vscode_extension/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/vscode_extension/'},
                    ]
                },
            ],
            '/translation/vuepress-next/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/vuepress-next/'},
                    ]
                },
            ],
            '/translation/yyjson/': [
                {
                    text: '',
                    collapsed: false,
                    items: [
                        {text: 'はじめに', link: '/translation/yyjson/'},
                        {text: '構築とテスト', link: '/translation/yyjson/BuildAndTest.md'},
                        {text: 'API', link: '/translation/yyjson/API.md'},
                        {text: 'データ構造', link: '/translation/yyjson/DataStructure.md'},
                        {text: 'Changelog', link: '/translation/yyjson/CHANGELOG.md'},
                    ]
                },
            ],
        },
    }
}