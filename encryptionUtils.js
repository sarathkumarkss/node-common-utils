const forge = require('node-forge');

// React Public Key
const REACT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwNdMNGT7v03/bP1+ZM+e
y+nO1OIutsW6OyD301ytN9N1zpB6oWWHAqA2tJ//cdRzBcDnbjMKhVIQjj+zU1hG
YWwBYGhpBmSjVP92s8mSaZYLmL2mTI3wedEN5mIoRYExL2mZkuc9ohT6iR9faBzp
UsaV5bNHD9JsDnRM7EpQHgPktw85JfQOLOM4P22pd1dOGiOGvSCOQYsPIdZfGMBV
YR0k8Esf81Q4yfp8Y+05W9FJ0N8vpfjY5qpkPdQNlA9uamrMYfFxE2tE7wd58e3F
qmhcfE0aB0IKwB7f7813Gpzf79NHkMg8Z55hiIHqqwhMw9oxixdA8W27PtQOs1Jm
JQIDAQAB
-----END PUBLIC KEY-----`;

const REACT_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWfd2W90S3Y/bl
1x0cM7KkMpL6KLbZDVIp2Z2GB7Bkg980PP6UlfiX3xJJ6eOjF4/0+Vr1CtaKun6B
ZK0kZnDg/Ncd8l53jstiJPwPGROWW/w1pu6KcEPV580vYc5BE6eoiGe3s01+zwiM
ZXYO7AJ+jvJqen5qfCvIxiM0fIF8ifd6xgY3ZFu2f18zs/k+WL1O9m/WhJbhjzML
CKIzWQbuCD22+GBj91B6FbPvmJVH8GewNqYnlKoZFiK10BNwLWAfeyuTZzcwJEkV
xkGQbHbS44nN9ovxSZr91lrKJuDW2uNK87n5+0m7s3VKQomP+4urJcdE65bcHmQ3
lMMmjEEDAgMBAAECggEAOYDxAWI1V/1C2ge71C2//OlaIhr8OmCp4HJpGt/A2JHK
K1UW43r5dK3nV02PK9BLVd/sFLndHsA03jfBe3rDVG40teCelur/d8Z2lQ2iBLOQ
gEnKte63IQfOKJ/ODgBY+IPpWoSFiDO1FP62kfWQDaIBN66zaZT0oBUOpymiBWLx
tppCck5mvnGhOY4JvQcGBJnsB+60C2vDGIa3eKgpezc9T4ivGIr/jrKjXuxfpM51
Be1BWkc5M1nCVD0fHdsHQ2d8FhPJvU/wpTa56vS5IMlCvzDPU4EhQtJ+a8ttfCWH
qOkgZEzCRWt13XvY4wN4jh4EDbVj4PQ7DwAhdIo7EQKBgQD7DDTH7u7Sq3y/PqoR
OFJt+oMyatVFCLZc2xaHY5AstgzPfhcENwr8YLj/osmOYAhifCLegEqHuLparCQ+
5+yB536aUFKhAq8h3bBfLkkcQ2SF47dQAxNQKimGCtI15T9uM0P4GZWbx5/PYokg
oABwtIx9qHKOq4QnCZhhAUosfwKBgQDauQ0TUlNPGWZ3HS0PZ/R9YKG9NEckeS5q
PxKJycIAmxufi8GWcFLuWDcrlC1+EtuqzcK4pyKvfvEwmB5NxZ8QMEDhYDkLToH5
xajaWF3d5367Dpd+TuTVTbgtgWFLzlUV8S4t6Lbxu1gNKmbvyZj3VJGe/0R36OpC
QuQ4HXP5fQKBgBUy3KodVPFZJbmIcxftJ5i91KJHPycLK0r//REFqUD9Rmum/A6R
D05sZHLBrj9lgI/AZ7leH+0B/kp1ysG9F82IXLpvGesarOsxKxl+cRH/5tcfeXU6
LUFRrhvxgfqnFwoZLh4fGvEClE4Qxf+JQ0BBHrPlq3a8qPYa61EVqMvFAoGAPzoZ
RomY3ZfJIAvGF9sEOS4y8x/mpOuG+F2tPTmepFAyRwe+eX+U6aOEp0tZb0WCTLjY
XkqqYzL+A/8lW3QSTDq2tq/7LYKPXiW+bwf2coxV/Tr1niSuT978q+LnvmMyA3rJ
z6mjIPP4Oy4TvaN4XZ8LzXubTlJ9TZRKptIU0X0CgYEAvYPX1kGfmbbUraZf1/lk
wpMBmlaOADUSn/4bWkjUxMrSqh9Bbr7zK8NPwKBNy15ZKj+i43J3MmjWA0BXfiZA
lmo28+L1vl48x9QKeFgEixArmlRoSwnKZybtG3XCgcprPT4VNQKTN76PJq5Fxygo
7cGyHEQxaXvPVK8YO+B3K0Y=
-----END PRIVATE KEY-----`;

const encryptData = (data) => {
  // Step 1: Generate AES key and IV
  const convertDataString = JSON.stringify(data);
  const aesKey = forge.random.getBytesSync(16); // 128-bit AES key
  const iv = forge.random.getBytesSync(16); // AES IV (Initialization Vector)

  // Step 2: Encrypt data using AES-CBC
  const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(convertDataString, "utf8"));
  cipher.finish();
  const encryptedData = cipher.output.getBytes();

  // Step 3: Encrypt AES key using RSA-OAEP
  const publicKey = forge.pki.publicKeyFromPem(REACT_PUBLIC_KEY);
  const encryptedAesKey = publicKey.encrypt(aesKey, "RSA-OAEP", {
      md: forge.md.sha256.create(),
  });

  // Return encrypted data
  return {
      encryptedData: forge.util.encode64(encryptedData),
      encryptedAesKey: forge.util.encode64(encryptedAesKey),
      iv: forge.util.encode64(iv), // Send IV for decryption
  };
}

const decryptData = (encryptedData, encryptedAesKey, iv) => {
  try {
    console.log("encryptedData------------------", encryptedData)
    console.log("encryptedAesKey------------------", encryptedAesKey)
    console.log("iv------------------", iv)
      // 1️⃣ Load Private Key
      const privateKey = forge.pki.privateKeyFromPem(REACT_PRIVATE_KEY);

      // 2️⃣ Decrypt AES Key using RSA-OAEP
      const aesKey = privateKey.decrypt(forge.util.decode64(encryptedAesKey), "RSA-OAEP", {
          md: forge.md.sha256.create(),
      });

      // 3️⃣ Decrypt data using AES-CBC
      const decipher = forge.cipher.createDecipher("AES-CBC", aesKey);
      decipher.start({ iv: forge.util.decode64(iv) });
      decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedData)));
      decipher.finish();
      const decrypted = decipher.output.toString("utf8");
      console.log("decrypted---------------", decrypted);
      const data = JSON.parse(decrypted);
      return data;
  } catch (error) {
      console.error("Decryption failed:", error);
      return null;
  }
};

// Export encryption and decryption functions
module.exports = { encryptData, decryptData };
