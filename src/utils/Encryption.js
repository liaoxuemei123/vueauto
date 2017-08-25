import Crypto from '../js/aes'
import '../js/rsa';
import Tool from './Tool';
const En = {};
/**
 * 密码加密
 */
En.createPassword = function(password){
    return new Promise((res,rej) => {
        Tool.get('generatePublicKey',{},(data)=>{
            if(data.code == 200){
                var mod = data.data.modulus;
                var exp = data.data.encryption;
                var publicKey = RSAUtils.getKeyPair(exp, '',mod);
                var txtKey = RSAUtils.encryptedString(publicKey, encodeURIComponent(password));
                var result=Crypto.AES.encrypt(password,mod).toString();
                res({exp:exp,mod:mod,password:txtKey,additional:encodeURIComponent(result)})
            }
        })
    })
}

export default En;