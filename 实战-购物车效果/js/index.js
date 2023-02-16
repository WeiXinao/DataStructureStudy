// 单间商品的数据
class UIGoods {
    constructor(g) {
        this.data = g;
        this.choose = 0;
    }

    // 获取总价
    getTotalPrice() {
        return this.data.price * this.choose;
    }

    // 是否选中了此件商品
    isChoose() {
        return this.choose > 0;
    }

    // 选择的数量+1
    increase() {
        this.choose++;
    }

    // 选择的数量-1
    decrease() {
        if (this.choose === 0) {
            return;
        }
        this.choose--;
    }
}

// 整个界面的数据
class UIData {
    constructor() {
        var uiGoods = [];
        for (var i = 0; i < goods.length; i++) {
            var uig = new UIGoods(goods[i]);
            uiGoods.push(uig);
        }
        this.uiGoods = uiGoods;
        this.deliveryThreshold = 30;
        this.deliveryPrice = 5;
    }

    getTotalPrice() {
        var sum = 0;
        for (var i = 0; i < this.uiGoods.length; i++) {
            var g = this.uiGoods[i];
            sum += g.getTotalPrice();
        }
        return sum;
    }
    
    // 增加某件商品的选择数量
    increase(index) {
        this.uiGoods[index].increase();
    }

    // 减少某件商品的选中数量
    decrease(index) {
        this.uiGoods[index].decrease();
    }

    // 得到总共的选择数量
    getTotalChooseNumber() {
        var sum = 0;
        for (var i = 0; i < this.uiGoods.length; i++) {
            sum += this.uiGoods[i].choose;
        }
        return sum;
    }

    // 购物车中有没有商品
    hasGoodsInCar() {
        return this.getTotalChooseNumber() > 0;
    }

    // 是否跨国了配送标准
    isCrossDeliveryThreshold() {
        return this.getTotalPrice() >= this.deliveryThreshold;
    }

    // 是否选中了此件商品
    isChoose(index) {
        return this.uiGoods[index].isChoose();
    }
}

// 整个界面
class UI {
    constructor() {
        this.uiData = new UIData();
        this.doms = {
            goodsContainer: document.querySelector('.goods-list'),
            deliveryPrice: document.querySelector('.footer-car-tip'),
            footerPay: document.querySelector('.footer-pay'),
            footerPayInnerSpan: document.querySelector('.footer-pay span'),
            totalPrice: document.querySelector('.footer-car-total'),
            footerCar: document.querySelector('.footer-car'),
            badge: document.querySelector('.footer-car-badge'),
        };

        var carRate = this.doms.footerCar.getBoundingClientRect();
        var jumpTarget = {
            x: carRate.left + carRate.width / 2,
            y: carRate.top + carRate.height / 5,
        }
        this.jumpTarget = jumpTarget;

        this.createHTML();
        this.updateFooter();
        this.listenEvent();
    }

    // 监听各种事件
    listenEvent() {
        this.doms.footerCar.addEventListener('animationend', function () {
            this.classList.remove('animate');
        });
    }

    // 创建商品数据创建商品列表元素
    createHTML() {
        // 1. 生产 html字符串（执行效率低，开发效率高） √
        // 2. 一个一个创建元素（执行效率高，开发效率低）

        var html = '';
        for (var i = 0; i < this.uiData.uiGoods.length; i++) {
            var g = this.uiData.uiGoods[i];
            html += 
                `<div class="goods-item">
                <img src="${g.data.pic}" alt="" class="goods-pic">
                <div class="goods-info">
                <h2 class="goods-title">${g.data.title}</h2>
                <p class="goods-desc">
                    ${g.data.desc}
                </p>
                <p class="goods-sell">
                    <span>月售 ${g.data.sellNumber}</span>
                    <span>好评率 ${g.data.favorRate}%</span>
                </p>
                <div class="goods-confirm">
                    <p class="goods-price">
                    <span class="goods-price-unit">￥</span>
                    <span>${g.data.price}</span>
                    </p>
                    <div class="goods-btns">
                    <i index="${i}" class="iconfont i-jianhao"></i>
                    <span>0</span>
                    <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
                    </div>
                </div>
                </div>
            </div>`;
            
        }
        this.doms.goodsContainer.innerHTML = html;
    }

    increase(index) {
        this.uiData.increase(index);
        this.updateGoodsItem(index);
        this.jump(index);
        this.updateFooter();
    }

    decrease(index) {
        this.uiData.decrease(index);
        this.updateGoodsItem(index);
        this.updateFooter();
    }

    // 更新某个元素的显示状态
    updateGoodsItem(index) {
        var goodsDom = this.doms.goodsContainer.children[index];
        if (this.uiData.isChoose(index)) {
            goodsDom.classList.add('active');
        } else {
            goodsDom.classList.remove('active');
        }
        var span = goodsDom.querySelector('.goods-btns span');
        span.textContent = this.uiData.uiGoods[index].choose;
    }

    // 更新页脚
    updateFooter() {
        // 总价
        var total = this.uiData.getTotalPrice();
        // 设置配送费
        this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
        // 设置起送费还差多少
        if (this.uiData.isCrossDeliveryThreshold()) {
            // 到达起送点
            this.doms.footerPay.classList.add('active');
        } else {
            this.doms.footerPay.classList.remove('active');
            // 更新还差多少钱
            var dis = this.uiData.deliveryThreshold * 10 - total * 10;
            dis = Math.round(dis);
            dis = dis / 10;
            this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`;
        }

        // 设置总价
        this.doms.totalPrice.textContent = total.toFixed(2);

        // 设置购物车的样式状态
        if (this.uiData.hasGoodsInCar()) {
            this.doms.footerCar.classList.add('active');
            // 设置购物车中的数量
            this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
        } else {
            this.doms.footerCar.classList.remove('active');
        }
    }

    // 购物车动画
    carAnimate() {
        this.doms.footerCar.classList.add('animate');
    }

    // 抛物线跳跃的元素
    jump(index) {
        // 找到对应商品的加号
        var btnAdd = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao');
        var rect = btnAdd.getBoundingClientRect();
        var start = {
            x: rect.left,
            y: rect.top
        };
        // 跳
        var div = document.createElement('div');
        div.className = 'add-to-car';
        var i = document.createElement('i');
        i.className = 'iconfont i-jiajianzujianjiahao';
        // 设置初始位置
        div.style.transform = `translateX(${start.x}px)`;
        i.style.transform = `translateY(${start.y}px)`;
        div.appendChild(i);
        document.body.appendChild(div);
        // 强行渲染
        div.clientWidth;
        
        // 设置结束位置
        div.style.transform = `translateX(${this.jumpTarget.x}px)`;
        i.style.transform = `translateY(${this.jumpTarget.y}px)`;

        var that = this;
        div.addEventListener('transitionend', function () { 
            div.remove();
            that.carAnimate();
        },
        {
            once: true, // 事件仅触发一次    
        })
    }
}

var ui = new UI();
ui.doms.goodsContainer.addEventListener('click', function (e) { 
    if (e.target.classList.contains('i-jiajianzujianjiahao')) {
        let index = +e.target.getAttribute('index');
        ui.increase(index)
    } else if (e.target.classList.contains('i-jianhao')) {
        let index = +e.target.getAttribute('index');
        ui.decrease(index)
    }
});
