const numbers = "0123456789";
function generateOTP(count) {
  var otp = "";
  for (let i = 0; i < count; i++) {
    otp = otp + numbers[parseInt(Math.random() * numbers.length)];
  }
  return otp;
}

module.exports = generateOTP;
