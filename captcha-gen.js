// by @kushalcodes (https://github.com/kushalcodes)
// https://www.neupanekushal.com.np
let __Captcha = null;
(function () {

  // captcha types
  // not used for now, maybe in future
  const CAPTCHA_TYPES = {
    NUM: "NUMBER",
    PIC: "PICTURE"
  };

  // captcha constructor
  function CAPTCHA_INFO(obj) {
    this.id = obj.id;
    this.value = obj.value;
  }

  __Captcha = {
    name: "__captcha",
    type: CAPTCHA_TYPES.NUM,
    idCounter: 0,
    captchas: [],
    currentCaptchaParent: null,
    submitIcon: null,

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
      },
      insertAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      },
    },

    generate: function () {
      this.setupCaptcha();
    },

    // css
    captchaCSS: "https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@b523be5fce11d7adebd7a2a95acb2232a9032a83/captcha.css",
    initCss: function () {
      const link = document.createElement('link');
      link.href = this.captchaCSS;
      link.rel = 'stylesheet';
      document.getElementsByTagName("head")[0].appendChild(link);
    },

    // handler enter pressed on input
    handleEnterOnInput: function (e) {
      const c = e.code.toLowerCase();
      if (c === "enter") {
        const captchaId = this.id.replace("__captcha_input_", "");
        document.getElementById('__captcha_submit_' + captchaId).click();
      }
    },
    initEnterKeyInput: function () {
      const allInputs = document.getElementsByClassName("__captcha_input");
      for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].onkeyup = this.handleEnterOnInput;
      }
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
      el.innerHTML += "<div class='__captcha_value __border_color_default' id='__captcha_value_" + currentCaptcha.id + "'>" + currentCaptcha.value + "</div>";
      // captcha refresh btn
      el.innerHTML += "<input type='button' tabindex='-1' title='Reload' class='__captcha_btn __captcha_reload __border_color_default' id='__captcha_refresh_" + currentCaptcha.id + "' value = '&#10227;' onclick='__Captcha.refresh(" + currentCaptcha.id + ") '/>";
      // captcha input box
      el.innerHTML += "<input type='text' class='__captcha_input __border_color_default" + (this.submitIcon ? ' custom' : '') + "' tabindex='0' id='__captcha_input_" + currentCaptcha.id + "' placeholder = 'Enter captcha' maxlength = '6' />";
      // captcha submit 
      el.innerHTML += "<input type='button' title='Check' tabindex='-1' class='__captcha_btn __border_color_default" + (this.submitIcon ? ' custom' : '') + "' id='__captcha_submit_" + currentCaptcha.id + "' style='" + (this.submitIcon ? 'background-image:url(' + this.submitIcon.url + ');' + (this.submitIcon.size ? 'background-size:' + this.submitIcon.size + ';' : '') : '') + "' value = '" + (this.submitIcon ? '' : '>') + "' onclick='__Captcha.match(" + currentCaptcha.id + ") '/>";
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
              value: document.getElementById("__captcha_value_" + captchaId),
              reload: document.getElementById("__captcha_refresh_" + captchaId),
              submit: document.getElementById("__captcha_submit_" + captchaId)
            },
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

    // holds all on verify events
    onVerify: [],

    default: {
      verify: function (v) {
        if (v.verified) alert('Success: Captcha matched')
        else alert('Error: Captcha mismatch');
      }
    },

    handleParams: function (params) {
      if (typeof params !== "object") return;
    },

    init: function (elString, onVerify, params) {
      this.handleParams(params);
      this.initInner(elString, onVerify);
      this.initEnterKeyInput();
    },

    warned: false,
    initInner: function (elString, onVerify) {
      if (typeof elString !== "string") {
        console.error('captcha-gen-js : Invalid element passed for initliazing captcha.', elString);
        return;
      }

      if (typeof onVerify !== "function") {
        if (!this.warned) console.warn('captcha-gen-js : No function passed for verification callback, default verification callback used', this.default.verify);
        onVerify = this.default.verify;
        this.warned = true;
      }

      // if no element identifier passed, make it to # or id
      if (elString[0] !== "#" && elString[0] !== ".") {
        elString = "#" + elString;
      }

      // initialize css
      this.initCss();

      // if id
      if (elString[0] === "#") {
        const el = document.getElementById(elString.replace("#", ""));
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
    },

    setSubmitIcon: function (obj) {
      if (typeof obj !== "object") {
        console.error('captcha-gen-js: Submit icon parameter expects object passed ' + typeof obj + ' > ' + obj);
        return;
      }
      this.submitIcon = obj;
    }
  };

})();