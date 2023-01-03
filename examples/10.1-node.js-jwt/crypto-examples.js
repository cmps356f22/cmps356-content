let data = 'Complex string - ۩ السلام';
let encodedData = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' //Buffer.from(data).toString('base64');
console.log(encodedData); // output: SGVsbG8gV29ybGQh

let decodedData = Buffer.from(encodedData, 'base64').toString('utf-8'); // output string in ascii character encoding. utf8 & other encoding can also be used
console.log(decodedData); // output: Hello World

return;

const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const  secretKey = "mySecret";

const user = {email: 'admin@test.com', given_name: 'Abbas', family_name: 'Ibn Firnas'};

const hash256 = CryptoJS.HmacSHA256(user, secretKey);
console.log('hash256', hash256.toString());

const token = jwt.sign(user, secretKey);

console.log('token: ', token);

const userObject = jwt.verify(token, secretKey);
console.log('user: ', userObject);

//const hmacDigest = CryptoJS.HmacSHA256("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXJyYWRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTU1MzkzOTE3fQ", secretKey);
//console.log("hmacDigest: ", CryptoJS.enc.Base64.stringify(hmacDigest));
//https://codepen.io/jpetitcolas/pen/zxGxKN?editors=1010
//https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html

return;



//Utf-8 - UTF-8 can represent any character in the Unicode standard.
// Unicode is a character set. A character set is a list of characters with unique numbers
// e.g., https://unicode-table.com/en/#0635
//https://www.browserling.com/tools/utf8-encode

//Encode
const rawStr = "The quick brown fox jumps over the lazy dog!";
const wordArray = CryptoJS.enc.Utf8.parse(rawStr);
console.log('Encoded base Utf8: ', wordArray.toString());
const base64 = CryptoJS.enc.Base64.stringify(wordArray);
console.log('Encoded base 64: ', base64);

// Base64 is a binary-to-text encoding scheme that represent 6 bits binary data as 1 Base64 digit.
// https://en.wikipedia.org/wiki/Base64#Base64_table
// Base64 encoding schemes are commonly used when there is a need to encode binary data
// that needs be stored and transferred over media that are designed to deal with textual data.

//Decode
const parsedWordArray = CryptoJS.enc.Base64.parse(base64);
const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
console.log("parsed:", parsedStr);

const hash = CryptoJS.SHA256("The quick brown fox jumps over the lazy dog");
console.log("hash: ", hash.toString());
console.log("hash Base64 encoding: ", CryptoJS.enc.Base64.stringify(hash));


/*const secretKey = "mySecret";
const hmacDigest = CryptoJS.HmacSHA256("The quick brown fox jumps over the lazy dog", secretKey);
console.log("hmacDigest: ", CryptoJS.enc.Base64.stringify(hmacDigest));*/

//const hmacDigest = Base64.stringify(hmacSHA256(path + hashDigest, privateKey));
