//var ios_appkey="26566df4f24b471aa0a72e7f63025cb9";
//var android_appkey="26566df4f24b471aa0a72e7f63025cb9";
var ios_appkey="4f6fd39cad52412a9f3e00ea15f6fe42";
var android_appkey="26566df4f24b471aa0a72e7f63025cb9";
//正式环境
//var android_appkey="06f62d3669374478a37d553b4a06032f";
ch.native.user = {
    getUserInfo: function () {
        try {
            if (isIOS) {
                var ifr = document.createElement("iframe");
                ifr.src = "chmobile://come.changhong.native.sync/getUserInfo:?param="
                    + JSON.stringify({key: ios_appkey});
                document.body.appendChild(ifr);
                ifr.parentNode.removeChild(ifr);
                var re = syncResult;
                syncResult = null;
                return re;
            } else {
            	//ch.native.common.showMsg(android_appkey);
                return window.Native.getUserInfo(android_appkey);
            }
        } catch (e) {
            ch.native.common.showMsg(e.name + ":" + e.message);
        }
    },
    setCustomInfo: function(value){
        try {
            if (isIOS) {
                var ifr = document.createElement("iframe");
                ifr.src = "chmobile://come.changhong.native.sync/setCustomInfo:?param="
                    + JSON.stringify({key: ios_appkey,value:value});
                document.body.appendChild(ifr);
                ifr.parentNode.removeChild(ifr);
                var re = syncResult;
                syncResult = null;
                return re;
            } else {
                return window.Native.setCustomInfo(android_appkey,value);
            }
        } catch (e) {
            throw(e.name + ":" + e.message);
        }
    },
    
    /*
    * 调用支付接口
    * @param appId
    * @param billInfo:支付参数，格式：
    * {"amount": 1,
     "display": {
     "contents": [{
     "count": 1,
     "name": "橡胶花盆"
     }],
     "name": "商品"
     },
     "payment": "icbc",
     "order_no": "M20150810111572",
     "signurl": "http://10.3.30.182:8080/paydemo/pay/charge",
     "extras": {
     "extra1": "extra1",}
     }
     */
    
    callPay:function(appId,bill){
        try {
            if (isIOS) {
                var iosUrl = "chmobile://com.changhong.native.async/toCHPay:?param="
                    + JSON.stringify({appId: appId, bill: bill});
                window.location = encodeURI(iosUrl);
            } else {
                window.PayUtil.toCHPay(appId, JSON.stringify(bill));
            }
        } catch (e) {
            throw(e.name + ":" + e.message);
        }
    }
}
