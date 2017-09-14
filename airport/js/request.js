/*
 * @Author: Ghost.liu 
 * @Date: 2017-07-20 17:35:35 
 * @Last Modified by: Ghost.liu
 * @Last Modified time: 2017-09-14 14:44:53
 */
/*
 *
 * @param url 请求的url地址
 * @param method 请求方式
 * @param success 成功时回调
 * @param params 传入参数
 * @param failCallBack 失败时回调
 */
function requestData(url,method,success,params,failCallBack){
    method = method||"get";
    if(!url) ch.native.common.showMsg("请求地址错误","middle");
    var paramObj = {
        url:url,
        method:method,
        timeout:30000,
        success:function(result){
            try {
                if(typeof result==="string"){
                     result = JSON.parse(result);
                }
                result = result.result;
                success(result);
            }catch (e) {
               // alert(e.message+"  "+ e.lineNumber);
               topmobi.native.common.showMsg("数据异常","middle");
            }
        },
        fail:function(data){
            if(failCallBack){
                failCallBack(data);
            }
            ch.native.common.showMsg("网络异常，请稍后重试！","middle");
        }
    }
    paramObj = $.extend(true,{},paramObj,params);
    try {
        topmobi.native.network.networkRequest(paramObj);
    } catch (e) {
        topmobi.native.common.showMsg("网络异常","middle");
    }
}