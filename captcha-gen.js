const CAPTCH_TYPES = {
  NUM: "NUMBER",
  PIC: "PICTURE"
};

function CAPTCHA_INFO(obj) {
  this.id = obj.id;
  this.value = obj.value;
}

const __Captcha = {
  name: "__captcha",
  type: CAPTCH_TYPES.NUM,
  idCounter: 0,
  captchas: [],
  currentCaptchaParent: null,

  getRandCaptchaValue: function () {
    const ALPHAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const randomAlphaIndex1 = this.getGenRand(ALPHAS.length - 1, 0);
    const randomAlphaIndex2 = this.getGenRand(ALPHAS.length - 1, 0);
    const randomAlphaIndex3 = this.getGenRand(ALPHAS.length - 1, 0);
    const randAlphas = this.getGenRand(9, 0) + ALPHAS[randomAlphaIndex1] + this.getGenRand(9, 0) + ALPHAS[randomAlphaIndex2] + this.getGenRand(9, 0) + ALPHAS[randomAlphaIndex3];
    return randAlphas;
  },

  genRandNum: function () {
    const randAlphas = this.getRandCaptchaValue();
    this.captchas[this.idCounter] = new CAPTCHA_INFO({
      id: this.idCounter,
      value: randAlphas
    });
    this.idCounter++;
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
  },

  // css
  captchaCSS: "https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js/captcha.css",
  initCss: function () {
    const link = document.createElement('link');
    link.href = this.captchaCSS;
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
  },

  // captcha elemetns
  initCaptchaElements: function () {
    // generate captcha value
    this.generate();

    const currentCaptcha = this.captchas[this.captchas.length - 1];

    const el = this.currentCaptchaParent;
    el.innerHTML = '';
    // set our top class name
    el.className += ' __captcha_main';
    // captcha value 
    el.innerHTML += "<div class='__captcha_value' id='__captcha_value_" + currentCaptcha.id + "'>" + currentCaptcha.value + "</div>";
    // captcha refresh btn
    el.innerHTML += "<input type='button' class='__captcha_btn' id='__captcha_refresh_" + currentCaptcha.id + "' value = '&#10227;' onclick='__Captcha.refresh(" + currentCaptcha.id + ") '/>";
    // captcha input box
    el.innerHTML += "<input type='text' class='__captcha_input' id='__captcha_input_" + currentCaptcha.id + "' placeholder = 'Enter captcha keywords' maxlength = '6' />";
    // captcha submit 
    el.innerHTML += "<input type='button' class='__captcha_btn' id='__captcha_submit_" + currentCaptcha.id + "' value = '>' onclick='__Captcha.match(" + currentCaptcha.id + ") '/>";
  },

  match: function (captchaId) {
    const verification = this.verify(captchaId);
    this.onVerify[captchaId](verification, this.captchas[captchaId]);
  },

  verify: function (captchaId) {
    const captcha = this.captchas[captchaId];
    return captcha.value === document.getElementById('__captcha_input_' + captchaId).value;
  },

  refresh: function (captchaId) {
    // generate new value
    const newCaptchaValue = this.getRandCaptchaValue();

    document.getElementById('__captcha_value_' + captchaId).innerText = newCaptchaValue;
    this.captchas[captchaId].value = newCaptchaValue;

  },

  // holds all on verify events
  onVerify: [],

  init: function (elString, onVerify) {
    const isIdOrClass = elString[0];
    let el = null;
    el = isIdOrClass === "#" ? document.getElementById(elString.replace("#")) : document.getElementsByClassName(elString.replace(".", ""))[0];

    // initializers
    // this.initCss();
    this.currentCaptchaParent = el;
    this.initCaptchaElements();

    // on verify event
    this.onVerify.push(onVerify);
  }
};


const onVerify = (v, obj) => {
  if (v) alert('ok');
  console.log(obj);
}

__Captcha.init(".__captcha", onVerify);
__Captcha.init(".__captcha1", v => {
  if (v) alert('ish');
});