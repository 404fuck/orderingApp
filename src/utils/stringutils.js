import {
    toast
} from '@/utils/toast'
import store from '../store'
import {
    Dialog
} from 'vant';
import {
    Local
} from "@/utils//vantLocale.js";
var stringutils = function () {
    var self = {};

    //判断字符串是否为空
    self.isEmpty = function (data) {
        return data == null || data == undefined || data == '';
    };
    self.isNotEmpty = function (data) {
        return !self.isEmpty(data);
    };
    //判断是否为手机号
    self.isMobileNumber = function (phone) {

        var flag = false;
        var message = "";
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        if (phone == '') {
            // console.log("手机号码不能为空");
            message = "手机号码不能为空！";

        } else if (phone.length != 11) {
            //console.log("请输入11位手机号码！");
            message = "请输入11位手机号码！";
        } else if (!myreg.test(phone)) {
            //console.log("请输入有效的手机号码！");
            message = "请输入有效的手机号码！";
        } else {
            flag = true;
        }
        if (message != "") {
            toast.warning(message);
        }
        return flag;

    };

    //格式化日期
    self.formatDate = function (date, fmt) {

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
            }
        }
        return fmt
    };

    function padLeftZero(str) {
        return ('00' + str).substr(str.length)
    }

    self.getJsonLength = function (json) {
        var jsonLength = 0;
        if (json == null || json.length == 0) {
            return 0;
        }
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }

    //数组去重
    self.putDuplicate = function (data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            if (arr.indexOf(data[i]) == -1) {
                arr.push(data[i]);
            }
        }
        return arr;
    }


    // " 0  叫号取餐 默认餐前支付\n" +
    // " 1  桌台点餐 餐前支付\n" +
    // " 2 桌台点餐 餐后支付")
    // scan_type (integer, optional): 返回扫码状态，0：桌码和店码，1：为扫桌码，2：为扫店码 ,
    // business_model：营业模式，0：叫号/牌号模式，1：桌台模式，2：兼容模式，
    // order_mode：扫码点餐，1：餐前支付，2：餐后支付，3：仅点餐
    //获取餐前支付 还是餐后支付  true 餐后  false 餐前
    self.isAfter = function (data) {
        var token = store.getters.token
        if (token == this.getPublicToken()) {
            return true
        } else {
            if (data == undefined) {
                return false
            } else {
                if (data.scan_type == 1) {
                    if (data.order_mode == '2') {
                        return true
                    }
                    return false
                }
                return false
            }
        }
    }

    //数组种插入数组的方法
    self.insert = function (arrfirst, arrlast, index) {
        if (index < 0) {
            index = 0;
        } else if (index > arrfirst.length) {
            index = arrfirst.length;
        }
        for (var i = arrlast.length - 1; i >= 0; i--) {
            arrfirst.splice(index, 0, arrlast[i]); //是在index位置用arrlast[i]替换掉arrfirst数组中的0个元素
        }
        return arrfirst;
    }

    //推送变更菜品数量
    self.refreshDishNum = function (dish_id, operation, order_id, body) {
        let totalNum = store.getters.totalNum | 0
        if (operation == "0") { //新人加入餐桌

        } else if (operation == "1") { //新增菜
            var num = store.getters.dishNums[dish_id] | 0

            setDishNum(dish_id, ++num)
            store.dispatch('setTotalNum', ++totalNum)
        } else if (operation == "2") { //加购物车内菜的数量
            var num = store.getters.dishNums[dish_id] | 0
            setDishNum(dish_id, ++num)
            store.dispatch('setTotalNum', ++totalNum)
        } else if (operation == "3") { //减购物车内菜的数量
            var num = store.getters.dishNums[dish_id] | 0
            store.dispatch('setDishNums', )
            setDishNum(dish_id, --num)
            store.dispatch('setTotalNum', --totalNum)
        } else if (operation == "4") { //修改购物车内菜品的信息

        } else if (operation == "5") { //清空购物车
            let dic = store.getters.dishNums
            for (let key in dic) {
                setDishNum(key, 0)
            }
            store.dispatch('setTotalNum', 0)
        } else if (operation == "6") { //下单
            let dic = store.getters.dishNums
            for (let key in dic) {
                setDishNum(key, 0)
            }
            store.dispatch('setTotalNum', 0)

            Dialog.confirm({
                message: body,
                confirmButtonText: '去看看',
                cancelButtonText: '继续点餐',
            }).then(() => {
                // on confirm
                store.dispatch('setTotalNum', 0)
                window.location.href = "./shopcart.html#/PlaceOrder";
            }).catch(() => {
                // on cancel

            });
        } else if (operation == "7") { //结账
            Dialog.alert({
                message: body,
                confirmButtonText: '去看看',
            }).then(() => {
                // on close
                store.dispatch('setTotalNum', 0)
                let strUrl = `./orderDetails.html#/?order_id=${order_id}&token=${store.getters.token}&dep_id=${store.getters.curentStore.dep_id}&qr_code=${store.getters.qrcode}&lang=${store.getters.language}`;
                strUrl = strUrl.replace(/\s+/g, "");
                window.location.href = strUrl;
            });
        }
    }

    self.getHotDishs = function (res) {
        var allArr = [];
        var j = 0
        var arr = []

        var temp = []
        for (var i in res) {
            temp.push(i)
        }

        if (temp.length < 3) {
            for (let i in res) {
                arr.push(res[i])
            }
            allArr.push(arr)
        } else {
            for (let i in res) {
                if (j == 0) {
                    arr = []
                    arr.push(res[i])
                    j++
                } 
                else if (j == 2) {
                    arr.push(res[i])
                    allArr.push(arr)
                    j = 0
                } 
                else {
                    arr.push(res[i])
                    j++
                }
            }
            if(j != 0)
            {
                allArr.push(arr)
            }
        }
        return allArr
    }

    self.getPublicPayModel = function () { //网页扫码模式
        let token = store.getters.token;
        if (token == this.getPublicToken()) {
            return true
        }
        return false
    }

    self.getPublicToken = function () {
        return "enjoyyourdinner"
    }

    self.saveVantLang = function () {
        let lang = store.getters.language
        if (lang == undefined) {
            Local("en_US");
        }else{
            Local(lang);
        }
    }

    self.isOSXMAC = function () {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
            return true
        }
        return false
    }

    self.setDishNum = function (dishID, num) {
        var dic = store.getters.dishNums
        dic[dishID] = num
        store.dispatch("setDishNums", dic)
    }

    self.clearDishNum = function () {
        let dic = store.getters.dishNums
        for (var i in dic) {
            dic[i] = 0
        }
        store.dispatch("setDishNums", dic);
    }
    self.formatPrice = function (value) {
        if (!value) {
            return '0.00'
        }
        value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
        return value;
    }
    return self;
}();


export {
    stringutils
}