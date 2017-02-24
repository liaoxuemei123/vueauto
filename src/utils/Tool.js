const Tool = {};

Tool.ajax = function(mySetting){
    var setting = {
        url:window.location.pathname,
        async:true,
        type:'GET',
        data:{},
        dataType:'json',
        timeout:30000,
        success:function (data) {},
        error:function (error) {},
        onTimeOut:function (error) {},
    }

    var aData = [];
    var sData = '';

    for(var attr in mySetting){
        setting[attr] = mySetting[attr];
    }
    for(var attr in setting.data){
        aData.push(attr + '=' + filter(setting.data[attr]));
    }
    sData = aData.join('&');
    setting.type = setting.type.toUpperCase();

    var xhr = new XMLHttpRequest();

    try{
        if ( setting.type === 'GET' || setting === 'get') {
            sData = setting.url + '?' + sData;
            xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
            xhr.timeout = setting.timeout;
            xhr.ontimeout = setting.onTimeOut;
            xhr.send()
        } else {
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.timeout = setting.timeout;
            xhr.ontimeout = setting.onTimeOut;
            xhr.send(sData);
        }
    }catch(e){
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd(){
        if(xhr.readyState == 4){
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText();

            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if (xhr.status == 200) {
                setting.success(response, setting, xhr);
            } else {
                setting.error(setting, xhr);
            }
        }
    }

    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    }

    function filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }
    return xhr;
}

/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};
/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.get = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};


/**
 * 时间格式化 支持date、time、onlytime三种格式，传入的日期可以是时间戳也可以是时间字符串;
 */
Tool.formatDate = function(str,type='date'){
    var date = new Date(str);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ( "0" + m ) : m;
    var d = date.getDate();
    d = d < 10 ? ( "0" + d ) : d;
    var h = date.getHours();
    var min = date.getMinutes();
    min = min < 10 ? ( "0" + min ) : min;
    var s = date.getSeconds();
    s = s < 10 ? ( "0" + s ) : s;
    switch(type){
        case 'date':
            return y + '-' + m + '-' + d;
            break;
        case 'time':
            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
        case 'onlytime':
            return h + ':' + min + ':' + s;
    }   
}
/**
 * 获取今天的日期 XXXX-XX-XX;
 */
Tool.getCurrentDate = function(){
    var now = new Date();
    return this.formatDate(now);
}


/**
 * 本地存储
 */
Tool.localItem = function(key, vlaue){
    if(arguments.length == 1){
        return localStorage.getItem(key);
    }else{
        return localStorage.setItem(key,value);
    }
}

Tool.removeLocalItem = function(key){
    if(key){
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}

export default Tool;