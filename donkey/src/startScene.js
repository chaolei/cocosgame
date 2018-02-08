/*
* 游戏开始场景
* 显示背景及开始菜单
*/
var StartLayer = cc.Layer.extend({
    bgSprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.Startbg_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.bgSprite, 0);

        var startItem = new cc.MenuItemImage(
            res.Startbtn_png,//常态  
            res.Startbtn2_png,//选中的状态
            function () {
                cc.director.runScene(new cc.TransitionPageTurn(0.5,new PlayScene()));  
            },this  
        );  
        startItem.attr({
            x:size.width/2,  
            y:size.height*0.2,
            anchorX :0.5,  
            anchorY :0.5  
        });  
        var menu = new cc.Menu(startItem);//创建菜单对象  
        menu.x=0;
        menu.y=0;  
        this.addChild(menu,1);

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});

