import {
    ajax,
    ajaxFile
} from '@/utils/api'


var request = function () {
    var self = {};

    //上传文件
    self.uploadFile = function (data, successfn) {
        ajaxFile('apis/file/put/imgupload', data, false, 'post', successfn);
    };
    //发送验证码
    self.sendSms = function (data, successfn) {
        ajax('apis/company/get/vcode', data, false, 'post', successfn);
    };
    return self;
}();

export {
    request
}