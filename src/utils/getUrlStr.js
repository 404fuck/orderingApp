
let getUrlStr = function () {
    let self = {};
    //截取qrcode 
    self.getUrl = function () {
        let url="";
        let getUrl = window.location.href;
        if(getUrl[getUrl.length-1]=='/'){
            let index = getUrl.lastIndexOf("\/");
            let newUrl = getUrl.substring(0,index);
            let index2 = newUrl.lastIndexOf("\/");
            url = newUrl.substring(index2 + 1,newUrl.length);
        }else{
            let index = getUrl.lastIndexOf("\/");
            url = getUrl.substring(index + 1,getUrl.length);
        }
        return url;
    };
    return self;
}();

export {
    getUrlStr
}
