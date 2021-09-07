

//请求地址配置
var baseUrl = function () {
    var self = {};
    /*
      ---打包上线只改getBaseUrlLogin--
    */
    self.getBaseUrlLogin = function () {
        let base_url = ''
        switch (process.env.NODE_ENV) {
            case 'development': //http://192.168.1.207:18000
                base_url = "http://www.shule666.com:18000" //这里是本地的请求url
                break
            case 'test'://http://up.shule666.com:18000
                base_url = "http://www.shule666.com:18000" //这里是测试环境中的url  
                break
            case 'production'://http://www.shule666.com:18000
                base_url = "http://www.shule666.com:18000" //生产环境url
                break
        }
        return base_url;
    };
    return self;
}();

export {
    baseUrl
}