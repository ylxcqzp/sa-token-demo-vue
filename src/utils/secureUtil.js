import cryptoJS from 'crypto-js'

export default {
    md5Encode(word) {
        return cryptoJS.MD5(word).toString();
    }
}
