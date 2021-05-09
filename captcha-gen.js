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
  captchaCSS: "https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@latest/captcha.css",
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
    el.innerHTML += "<input type='button' title='Reload' class='__captcha_btn' id='__captcha_refresh_" + currentCaptcha.id + "' value = '&#10227;' onclick='__Captcha.refresh(" + currentCaptcha.id + ") '/>";
    // captcha input box
    el.innerHTML += "<input type='text' class='__captcha_input' id='__captcha_input_" + currentCaptcha.id + "' placeholder = 'Enter captcha keywords' maxlength = '6' />";
    // captcha submit 
    el.innerHTML += "<input type='button' title='Check' class='__captcha_btn' id='__captcha_submit_" + currentCaptcha.id + "' value = '>' onclick='__Captcha.match(" + currentCaptcha.id + ") '/>";
  },

  match: function (captchaId) {
    const verification = this.verify(captchaId);
    // send to callback
    this.onVerify[captchaId](
      {
        verified: verification,
        captcha: {
          userInput: document.getElementById("__captcha_input_" + captchaId).value,
          value: this.captchas[captchaId].value,
          id: this.captchas[captchaId].id,
          els: {
            parent: document.getElementById("__captcha_input_" + captchaId).parentElement,
            input: document.getElementById("__captcha_input_" + captchaId),
            reload: document.getElementById("__captcha_refresh_" + captchaId),
            submit: document.getElementById("__captcha_submit_" + captchaId)
          }
        }
      }
    );
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

  loadInBuilts: function () {
    const inbuiltJS = "https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@latest/captcha.inbuilt.js";
    const script = document.createElement('script');
    script.setAttribute('src', inbuiltJS);
    document.body.appendChild(script);
  },

  // holds all on verify events
  onVerify: [],

  init: function (elString, onVerify, params) {
    if (typeof elString !== "string") {
      console.error('captcha-gen-js : Invalid element passed for initliazing captcha.', elString);
      return;
    }

    if (typeof onVerify !== "function") {
      console.error('captcha-gen-js : Invalid function passed for verification callback.', onVerify);
      return;
    }

    if (typeof params !== "undefined") {
      if ('inbuilts' in params) {
        this.loadInBuilts();
      }
    }

    // if no element identifier passed, make it to # or id
    if (elString[0] !== "#" && elString[0] !== ".") {
      elString = "#" + elString;
    }

    // initialize css
    // this.initCss();

    // if id
    if (elString[0] === "#") {
      const el = document.getElementById(elString.replace("#"));
      if (!el) {
        console.error('captcha-gen-js : No element exist on DOM with id of ', elString);
        return;
      }

      // initializers
      this.currentCaptchaParent = el;
      this.initCaptchaElements();
      // on verify event
      this.onVerify.push(onVerify);
      return;
    }

    // if classes
    if (elString[0] === ".") {
      const elements = document.getElementsByClassName(elString.replace(".", ""));
      if (elements.length === 0) {
        console.error('captcha-gen-js : No elements found on DOM with class name of ', elString);
        return;
      }

      // loop all classes and add handle captcha on each
      for (let i = 0; i < elements.length; i++) {
        const captchaEl = elements[i];
        // initializers
        this.currentCaptchaParent = captchaEl;
        this.initCaptchaElements();
        // on verify event
        this.onVerify.push(onVerify);
      }
      return;
    }
  }
};


const onVerify = (verification) => {
  const captcha = verification.captcha;
  if (verification.verified) {
    captcha.els.input.style.borderColor = 'green'
    captcha.els.reload.style.borderColor = 'green'
    captcha.els.submit.style.borderColor = 'green'
  }
  else {
    captcha.els.input.style.borderColor = 'red'
    captcha.els.reload.style.borderColor = 'red'
    captcha.els.submit.style.borderColor = 'red'
  }
  console.log(verification);
}

__Captcha.init(".__captcha", onVerify);