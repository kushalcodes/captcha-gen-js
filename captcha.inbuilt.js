if (typeof __Captcha !== "undefined") {
  __Captcha.Inbuilts = {
    Verifications: {
      Border: function (verificationObj) {
        const captcha = verificationObj.captcha;
        if (verificationObj.verified) {
          captcha.els.input.style.borderColor = 'green'
          captcha.els.reload.style.borderColor = 'green'
          captcha.els.submit.style.borderColor = 'green'
        }
        else {
          captcha.els.input.style.borderColor = 'red'
          captcha.els.reload.style.borderColor = 'red'
          captcha.els.submit.style.borderColor = 'red'
        }
      }
    }
  };
}