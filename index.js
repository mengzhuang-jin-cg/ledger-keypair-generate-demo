import { createECDH, generateKeyPairSync, createPublicKey } from 'crypto';

// Generate key pair synchronously
const { publicKey, privateKey } = generateKeyPairSync('ec', {
    namedCurve: 'P-256', // This specifies secp256r1 curve
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'sec1', // Use sec1 format for OpenSSL
        format: 'pem',
    },
});

console.log('Private Key (PEM/SEC1):\n', privateKey);
console.log(publicKey);

function extractPublicKey(pemKey) {
    // Convert the PEM formatted public key to raw public key in X9.62 uncompressed format
    // This is an oversimplified method and may not work with different curves or PEM formats
    const pem = pemKey.split('\n');
    pem.shift(); // Remove the first line (BEGIN PUBLIC KEY)
    pem.pop();   // Remove the last line (END PUBLIC KEY)
    // Convert base64 to buffer
    const keyBuffer = Buffer.from(pem.join(''), 'base64');
    // Assuming the first 26 bytes are the header for the SPKI formatted key.
    // The actual key should begin after this header.
    const actualKeyBuffer = keyBuffer.slice(26);
    // Further processing might be required if the keyBuffer includes additional metadata
    return actualKeyBuffer;
}
const publicKeyVault = extractPublicKey(publicKey)
console.log(`Generated API User's public key: len = ${publicKeyVault.length} ${publicKeyVault.toString('hex')}`);
const privateKeyVault = extractPublicKey(privateKey)
console.log(`Generated API User's private key: len = ${privateKeyVault.length} ${privateKeyVault.toString('hex')}`);