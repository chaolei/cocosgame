/*
* 游戏中驴子精灵
* 主要有消失动画，绑定点击事件
*/
var DonkeySprite = cc.Sprite.extend({
    playScene: null,
    disappearAction: null,
    ctor: function(){
        this._super(arguments[0]);
        this.playScene = arguments[1];
    },
    onEnter: function(){
        this._super();//必须写
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();//增加应用，否则会被回收
        this.addTouchEventListenser();
    },
    onExit: function(){
        this._super();
        this.disappearAction.release();
    },
    createDisappearAction: function() {
        var frames = [];
        for (var i = 1; i <= 6; i++) {
            var str = "dead"+i+".png"
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.08);//间隔几秒换图
        var action = new cc.Animate(animation);

        return action;
    },
    addTouchEventListenser: function(){
        var that = this;
        that.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                    
            onTouchBegan: function (touch, event) { 
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();  
                if (cc.rectContainsPoint(target.getBoundingBox(),pos)) {                    
                    cc.log("touched");
                    that.removeDonkey(target);
                    that.playScene.addScore(); 
                    return true;
                }
                return false;
            }            
        });
        cc.eventManager.addListener(that.touchListener,this);
    },
    removeDonkey: function(target){
        target.stopAllActions();//点击后去掉动画然后再执行销毁动画
        cc.eventManager.removeListener(target.touchListener);
        var ac = target.disappearAction;

        var seqAc = cc.Sequence.create( ac, cc.CallFunc.create(function () {
            target.removeFromParent();
        },target) );

        target.runAction(seqAc);
    }
});