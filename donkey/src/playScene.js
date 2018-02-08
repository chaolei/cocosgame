/*
* 玩游戏场景
* 主要是显示得分及动态生成驴子精灵和回收移动出屏幕外的精灵
*/
var PlayLayer = cc.Layer.extend({
    sprite: null,
    donkeys: null,
    score: 0,
    scoreLabel: null,
    ctor: function () {
        this._super();
        this.donkeys = [];

        var size = cc.winSize;
        this.sprite = new cc.Sprite(res.Playbg1_png);
        this.sprite.attr({
            x: size.width / 2,
            y: 0,
            anchorX :0.5,
            anchorY :0
        });
        this.addChild(this.sprite, 0);
        
        this.scoreLabel = this.addLabel(size);
        this.addChild(this.scoreLabel, 5);

        this.addDonkey();
        this.schedule(this.update,1,16*1024,1);

        cc.spriteFrameCache.addSpriteFrames(res.Dead_plist);//缓存帧图片

        return true;
    },
    addLabel: function(size){
        var scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
        scoreLabel.attr({
            x:size.width - 70,
            y:size.height-50
        });
        return scoreLabel;
    },
    addScore: function() {
        this.score += 1;
        this.scoreLabel.setString("score:" + this.score);
    },
    addDonkey: function() {
        var donkey = new DonkeySprite(res.Player_png, this);
        var size = cc.winSize;

        var x = donkey.width/2+size.width/2*cc.random0To1();//x坐标随机
        donkey.attr({
            x: x,
            y:size.height - 20
        });

        var dropAction = cc.MoveTo.create(3,cc.p(donkey.x,-100));
        donkey.runAction(dropAction);
        this.donkeys.push(donkey);

        this.addChild(donkey,5);
    },
    stopAction: function(){//停止动画并删除已加载的精灵
        for (var i = 0; i < this.donkeys.length; i++) {
            this.donkeys[i].stopAllActions();
            this.donkeys[i].removeFromParent();
            this.donkeys[i] = undefined;
            this.donkeys.splice(i,1);
            i= i-1;
        }
    },
    removeDonkey: function() {
        for (var i = 0; i < this.donkeys.length; i++) {
            if(250 >= this.donkeys[i].y) {
                cc.log("==============remove:"+i);
                this.donkeys[i].removeFromParent();
                this.donkeys[i] = undefined;
                this.donkeys.splice(i,1);
                this.unschedule(this.update);

                cc.director.runScene(new cc.TransitionPageTurn(0.5,new EndScene(this.score))); 
                this.stopAction();
                break;
            }
        }
    },
    update: function() {
        this.addDonkey();
        this.removeDonkey();
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

