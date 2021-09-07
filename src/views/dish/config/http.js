import {
    ajax,
    

} from '@/utils/api'


var request = function () {
    var self = {};
    //推荐菜品
    self.hotDish = function (data, successfn) {
        ajax('/capis/dishes/recomlist', data, false, 'post', successfn);
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
    //根据关键字搜索菜品
    self.searchDish = function (data, successfn) {
        ajax('/capis/dishes/listbysearch', data, false, 'post', successfn);
    };

    //点过的菜
    self.userorderdish = function (data, successfn) {
        ajax('/capis/dishes/userorderdish', data, false, 'post', successfn);
    };
    //菜品标签
    self.tagspeclist = function (data, successfn) {
        ajax('/capis/dishes/tagspeclist', data, false, 'post', successfn);
    };
    return self;
}();

export {
    request
}