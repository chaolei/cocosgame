/*
* 游戏结束场景
* 显示得分即重新开始按钮
*/
var EndLayer = cc.Layer.extend({
    sprite:null,
    score: 0,
    ctor:function (score) {

        this._super();
        var size = cc.winSize;
        this.score = score;

        this.addBg(size);
        this.addScoreView(size);
        this.addMenu(size);       

        return true;
    },
    addBg: function(size){
        this.sprite = new cc.Sprite(res.Endbg_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
    },
    addScoreView: function(size) {
        var scoreLabel = new cc.LabelTTF("得分: " + this.score, "Arial", 40);
        scoreLabel.attr({
            x:100,
            y:size.height*0.35,
            color: cc.color(252,122,48,255)
        });
        this.addChild(scoreLabel, 1);
    },
    addMenu: function(size) {
        var startItem = new cc.MenuItemImage(
            res.Startbtn_png,//常态
            res.Startbtn2_png,
            function () {
                cc.director.runScene(new cc.TransitionPageTurn(0.5,new PlayScene())); 
            },this  
        );
        startItem.attr({
            x:size.width/2,  
            y:size.height*0.17,//位置放在屏幕中心  
            anchorX :0.5,  
            anchorY :0.5  
        });  
        var menu = new cc.Menu(startItem);//创建菜单对象  
        menu.x=0;
        menu.y=0;  
        this.addChild(menu,1);//将菜单添加到当前层  
    }
});

var EndScene = cc.Scene.extend({
    score: 0,
    ctor:function (score) {
        this._super();
        this.score = score;
    },
    onEnter:function () {
        this._super();
        var layer = new EndLayer(this.score);
        this.addChild(layer);
    }
});

