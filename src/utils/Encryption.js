import Crypto from '../js/aes'
import '../js/rsa';
import './Tool';
const En = {};

En.createPassword = function(password){
    return new Promise((res,rej) => {
        $.ajax({
            url:'http://cloud.mall.changan.com.cn/maintenance/mallchangan/main/user/generatePublicKey',
            type:"GET",
			dataType:"JSON",
            success:function(data){
                var mod = data.data.mod;
                var exp = data.data.exp;
                var publicKey = RSAUtils.getKeyPair(exp, '',mod);
                var txtKey = RSAUtils.encryptedString(publicKey, encodeURIComponent(password));
                var result=Crypto.AES.encrypt(password,mod).toString();
                console.log(encodeURIComponent(result));
                res({exp:exp,mod:mod,password:txtKey,additional:encodeURIComponent(result)})
            }
        })
    })
}

export default En;