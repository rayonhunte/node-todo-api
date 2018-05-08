const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const password = '123abc';

// bcrypt.genSalt(10, (err, salt)=>{
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     });
// });

const hashedPassword = '$2a$10$i/uFUditIg7YxYrUp638PuwAYAkQbwpGzvBTISR3sdbtegIBAIyYW';

bcrypt.compare(password, hashedPassword, (error, res)=>{
    console.log(res);
});

// const data = {
//      id:10
// };

// token = jwt.sign(data, '123abc');
// console.log(token);
// let decoded = jwt.verify(token, '123abc');

// console.log(decoded);

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
