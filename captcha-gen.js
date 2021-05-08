const CAPTCH_TYPES = {
  NUM: "NUMBER",
  PIC: "PICTURE"
};

const GenCaptcha = {
  name: "__captcha",
  type: CAPTCH_TYPES.NUM,
  captchaValue: "",
  currentCaptchaParent: null,

  genRandNum: function () {
    const ALPHAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const randomAlphaIndex1 = this.getGenRand(ALPHAS.length - 1, 0);
    const randomAlphaIndex2 = this.getGenRand(ALPHAS.length - 1, 0);
    const randomAlphaIndex3 = this.getGenRand(ALPHAS.length - 1, 0);
    const randAlphas = this.getGenRand(9, 0) + ALPHAS[randomAlphaIndex1] + this.getGenRand(9, 0) + ALPHAS[randomAlphaIndex2] + this.getGenRand(9, 0) + ALPHAS[randomAlphaIndex3];
    this.captchaValue = randAlphas;
  },

  getGenRand: function (max, min) {
    const rand = this.essentials.rand(max, min);
    return typeof rand !== "number" ? "A" : rand;
  },

  setupCaptcha: function () {
    this.genRandNum();
  },

  essentials: {
    rand: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },

  generate: function () {
    this.setupCaptcha();
    return true;
  },

  captchaInput: "<input type='text' id='__captcha_input' placeholder='Enter captcha keywords'/>",
  captchaSubmit: "<input type='button' id='__captcha_submit' value='>' />",
  initCaptchaElements: function () {
    // generate captcha value
    this.generate();
    const el = this.currentCaptchaParent;
    el.innerHTML = "";
    el.innerHTML += "<div id='__captcha_value'>" + this.captchaValue + "</div>";
    el.innerHTML += this.captchaInput;
    el.innerHTML += this.captchaSubmit;
  },

  refresh: function () {
    this.initCaptchaElements();
  },

  init: function (elString) {
    const isIdOrClass = elString[0];
    let el = null;
    el = isIdOrClass === "#" ? document.getElementById(elString.replace("#")) : document.getElementsByClassName(elString.replace(".", ""))[0];

    this.currentCaptchaParent = el;
    this.initCaptchaElements();
  }
};

GenCaptcha.init(".__captcha");