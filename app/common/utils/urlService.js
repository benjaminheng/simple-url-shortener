const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
const base = chars.length;

function encode(id) {
    if (id === 0) {
        return chars[0];
    }
    let shortId = '';
    while (id > 0) {
        shortId += chars[id % base];
        id = parseInt(id / base, 10);
    }
    return shortId.split('').reverse().join('');
}

function decode(str) {
    let id = 0;
    for (var c in str) {
        id = id * base + chars.indexOf(str[c])
    }
    return id;
}

export default {
    encode,
    decode
}
