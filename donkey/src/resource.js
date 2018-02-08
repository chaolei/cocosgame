/*
* 游戏资源配置
* 配置所有用到的资源
*/
var res = {
    Startbg_png : "res/images/startbg.png",
    Startbtn_png : "res/images/startbtn.png",
    Startbtn2_png : "res/images/startbtn2.png",
    Endbg_png: "res/images/overbg.png",
    Playbg1_png: "res/images/floor.png",
    Player_png: "res/images/player.png",
    Dead_plist: "res/images/test.plist",
    Deal_png: "res/images/test.png",

    score_aud: "res/audio/score.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
