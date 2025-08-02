const crypto = require("crypto");

const generateSignature = (data, passPhrase = null) => {
  // 1. Sort the keys alphabetically
  const sortedKeys = Object.keys(data).sort();

  // 2. Create parameter string with proper encoding
  let pfOutput = sortedKeys
    .filter((key) => data[key] !== "" && data[key] !== null) // Skip empty values
    .map(
      (key) =>
        `${key}=${encodeURIComponent(data[key].toString().trim()).replace(
          /%20/g,
          "+"
        )}`
    )
    .join("&");

  // 3. Add passphrase if provided
  if (passPhrase) {
    pfOutput += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      "+"
    )}`;
  }

  // 4. Generate MD5 hash
  return crypto.createHash("md5").update(pfOutput).digest("hex");
};

module.exports = { generateSignature };
