import Crypto from '../js/aes'
import '../js/rsa';
import './Tool';
const En = {};

En.createPassword = function(){
    return new Promise((res,rej) => {
        $.ajax({
            url:'http://cloud.mall.changan.com.cn/maintenance/mallchangan/main/user/generatePublicKey',
            type:"GET",
			dataType:"jsonp",
			jsonp: 'callback',
            jsonpCallback:'success_jsonpCallback'
        }).then(function(data){
            conole.log(data);
            res();
        })
    })
}

export default En;