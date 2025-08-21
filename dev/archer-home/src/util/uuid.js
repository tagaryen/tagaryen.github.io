
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
const radix = chars.length;

function genUuid(len) {
    var uuid = [];
    len = len || 32;
    for (let i = 0; i < len; i++) {
        uuid.push(chars[Math.floor(Math.random() * radix)]);
    }
    return uuid.join('');
}

export default {
    genUuid: genUuid
}