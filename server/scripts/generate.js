const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");



const privateKey = "2daea5b9b0f1e9d407ea49ec6bc5382b0175e93fa76b13c0074e2f24d206c29e";
const publicKey = secp.getPublicKey(privateKey);

console.log("Private Key:", privateKey);
console.log("Public Key:", toHex(publicKey));

hash = toHex(keccak256(utf8ToBytes("Hello world!")));
const signature_complete = secp.signSync(hash, privateKey, {recovered:true})
console.log(hash);
const signature = signature_complete[0]
const recover_key = signature_complete[1]
const recovered_public_key = secp.recoverPublicKey(hash, signature, 1)
console.log(signature_complete)
console.log(signature)
console.log(recover_key)
console.log("Public Key:", toHex(recovered_public_key))
console.log(typeof(signature))
console.log("signature:",toHex(signature))
bytes_signature = hexToBytes(toHex(signature))
console.log(bytes_signature)



