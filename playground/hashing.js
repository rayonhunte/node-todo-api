const jwt = require('jsonwebtoken');


const data = {
     id:10
};

token = jwt.sign(data, '123abc');
console.log(token);
let decoded = jwt.verify(token, '123abc');

console.log(decoded);

// const {SHA256} = require('crypto-js');
// const message = 'I  am user number 3';

// console.log(SHA256(message).toString(), message);

// const data = {
//     id:4
// };

// let token = {
//     data,
//     hash:SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };

// const resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();


// token.id = 5;
// token.hash= SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash){
//     console.log('Valid data');
// } else {
//     console.log('data invvalid');
// }
