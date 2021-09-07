import {
    ajax
} from '@/utils/api'


var request = function () {
    var self = {};
    //注册
    self.register = function (data, successfn) {
        ajax('/app/dp/user/post/userReg', data, false, 'post', successfn);
    };
     //发送验证码
     self.sendSms = function (data, successfn) {
        ajax('/app/dp/user/post/sendVercode', data, false, 'post', successfn);
    };
    return self;
}();

export {
    request
}