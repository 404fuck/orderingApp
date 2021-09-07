import {
    ajax

} from '@/utils/api'


var request = function () {
    var self = {};
    //购物车信息
    self.cartInfo = function (data, successfn) {
        ajax('/capis/shoppingcart/info', data, false, 'post', successfn);
    };
    //清空购物车 
    self.clearCart = function (data, successfn) {
        ajax('/capis/shoppingcart/clear', data, false, 'post', successfn);
    };
    //给购物车添加备注 
    self.modifyNote = function (data, successfn) {
        ajax('/capis/shoppingcart/modifynote', data, false, 'post', successfn);
    };
    //添加菜品到购物车
    self.addDish = function (data, successfn) {
        ajax('/capis/shoppingcart/onedishadd', data, false, 'post', successfn);
    };
    //购物车添加菜品数量
    self.addDishInCart = function (data, successfn) {
        ajax('/capis/shoppingcart/shcartadd', data, false, 'post', successfn);
    };
    //删除购物车单个菜品数量
    self.delDish = function (data, successfn) {
        ajax('/capis/shoppingcart/onedishsub', data, false, 'post', successfn);
    };
    //菜品详情
    self.dishDetail = function (data, successfn) {
        ajax('/capis/dishes/getonedish', data, false, 'post', successfn);
    };
    //购物车修改菜品信息 
    self.updateCartDish = function (data, successfn) {
        ajax('/capis/shoppingcart/modifyscdish', data, false, 'post', successfn);
    };

    //推荐菜品
    self.hotDish = function (data, successfn) {
        ajax('/capis/dishes/recomlist', data, false, 'post', successfn);
    };

    //下单 
    self.payOrder = function (data, successfn) {
        ajax('/capis/order/cart/order', data, false, 'post', successfn);
    };

    //订单明细
    self.orderDetails = function (data, successfn) {
        ajax('/capis/order/cart/order/details', data, false, 'post', successfn);
    };

    //支付 
    self.pay = function (data, successfn) {
        ajax('/app/dp/cart/post/pay', data, false, 'post', successfn);
    };

    //查询已支付的订单 
    self.payOrderDetail = function (data, successfn) {
        ajax('/capis/order/cart/order/history', data, false, 'post', successfn);
    };

    //获取购物车备注 
    self.cartRemark = function (data, successfn) {
        ajax('/capis/shoppingcart/getscnote', data, false, 'post', successfn);
    };

    //获取餐前订单
    self.copyinfo = function (data, successfn) {
        ajax('/capis/shoppingcart/copyinfo', data, false, 'post', successfn);
    };

    //修改购物车中的就餐人数
    self.modifydinnernum = function (data, successfn) {
        ajax('/capis/shoppingcart/modifydinnernum', data, false, 'post', successfn);
    };

    //删除称重菜
    self.onedishdel = function (data, successfn) {
        ajax('/capis/shoppingcart/onedishdel', data, false, 'post', successfn);
    };

    //账户余额
    self.findbalance = function (data, successfn) {
        ajax('/app/dp/user/post/findbalance', data, false, 'post', successfn);
    };

    //查看桌台是否有订单
    self.checkorder = function (data, successfn) {
        ajax('/capis/order/cart/order/checkorder', data, false, 'post', successfn);
    };

    //呼叫服务
    self.callBell = function (data, successfn) {
        ajax('/capis/bell/call', data, false, 'post', successfn);
    };

    //优惠卷列表
    self.deptakenlist = function (data, successfn) {
        ajax('/coupon/deptakenlist', data, false, 'post', successfn);
    };

    //优惠卷列表
    self.confirmuse = function (data, successfn) {
        ajax('/coupon/confirmuse', data, false, 'post', successfn);
    }; 

    //设置菜品外带
    self.setTakeDishOut = function (data, successfn) {
        ajax('/capis/order/setTakeDishOut', data, false, 'post', successfn);
    };

    //订单、购物车内会员设置和取消使用会员(手机号为空时，取消使用会员)
    self.getSetMember = function (data, successfn) {
        ajax('/capis/order/getSetMember', data, false, 'post', successfn);
    };

    //添加评论
    self.addcomment = function (data, successfn) {
        ajax('/app/dp/comment/post/addcomment', data, false, 'post', successfn);
    };
    //菜品标签
    self.tagspeclist = function (data, successfn) {
        ajax('/capis/dishes/tagspeclist', data, false, 'post', successfn);
    };

    //修改扫码点餐购物车内单个菜品的数量
    self.inputDishNum = function (data, successfn) {
        ajax('/capis/shoppingcart/inputDishNum', data, false, 'post', successfn);
    };
    //扫店码, 设置预约时间
    self.setAppoint = function (data, successfn) {
        ajax('/capis/shoppingcart/setAppoint', data, false, 'post', successfn);
    };
    //扫店码, 添加外送信息
    self.setStoreDeliveryInfo = function (data, successfn) {
        ajax('/capis/shoppingcart/setStoreDeliveryInfo', data, false, 'post', successfn);
    };
    return self;
}();

export {
    request
}