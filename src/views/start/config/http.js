
import {
    ajax

} from '@/utils/api'


var request = function () {
    var self = {};
    //扫码获取店铺信息
    self.scan = function (data, successfn) {
        ajax('/capis/order/scan', data, false, 'post', successfn);
    };
    //店铺菜品信息
    self.dishList = function (data, successfn) {
        ajax('/capis/dishes/list', data, false, 'post', successfn);
    };
    //添加菜品到购物车
    self.addDish = function (data, successfn) {
        ajax('/capis/shoppingcart/onedishadd', data, false, 'post', successfn);
    };
    //删除购物车单个菜品数量
    self.delDish = function (data, successfn) {
        ajax('/capis/shoppingcart/onedishsub', data, false, 'post', successfn);
    };
    //服务铃列表
    self.bellList = function (data, successfn) {
        ajax('/capis/bell/list', data, false, 'post', successfn);
    };
    //呼叫服务
    self.callBell = function (data, successfn) {
        ajax('/capis/bell/call', data, false, 'post', successfn);
    };
    //呼叫服务token
    self.callSafeKey = function (data, successfn) {
        ajax('/capis/bell/callSafeKey', data, false, 'post', successfn);
    };

    //查看桌台是否有订单
    self.checkorder = function (data, successfn) {
        ajax('/capis/order/cart/order/checkorder', data, false, 'post', successfn);
    };

    //菜品标签
    self.tagspeclist = function (data, successfn) {
        ajax('/capis/dishes/tagspeclist', data, false, 'post', successfn);
    };
    //下单 
    self.payOrder = function (data, successfn) {
        ajax('/capis/order/cart/order', data, false, 'post', successfn);
    };

    //订单明细
    self.orderDetails = function (data, successfn) {
        ajax('/capis/order/cart/order/details', data, false, 'post', successfn);
    };

    //修改扫码点餐购物车内单个菜品的数量
    self.inputDishNum = function (data, successfn) {
        ajax('/capis/shoppingcart/inputDishNum', data, false, 'post', successfn);
    };
    //扫店码, 设置预约时间
    self.setAppoint = function (data, successfn) {
        ajax('/capis/shoppingcart/setAppoint', data, false, 'post', successfn);
    };

    return self;
}();

export {
    request
}