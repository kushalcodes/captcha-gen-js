// inbuilt handlers for captcha-gen-js by @kushalcodes (https://github.com/kushalcodes)
if (typeof __Captcha !== "undefined") {
  // built in easy functions
  __Captcha.Inbuilts = {

    // inbuilt verification handlers
    Verifications: {

      // change border color on verification of captcha
      borderTimer: null,
      Border: function (verificationObj) {
        // clear
        clearTimeout(__Captcha.Inbuilts.Verifications.borderTimer);
        // style default
        __Captcha.sytleAll(verificationObj, [
          ['borderColor', '#ebebeb'],
        ]);
        __Captcha.Inbuilts.Verifications.borderTimer = setTimeout(() => {
          if (verificationObj.verified) {
            // style green is verified
            __Captcha.sytleAll(verificationObj, [
              ['borderColor', 'green'],
            ]);
          } else {
            // style red if not
            __Captcha.sytleAll(verificationObj, [
              ['borderColor', 'red'],
            ]);
          }
        }, 100); // 100 as transition for inputs are 0.2s

        // revert to style to default on input
        verificationObj.captcha.els.input.oninput = () => {
          __Captcha.sytleAll(verificationObj, [
            ['borderColor', '#ebebeb'],
          ]);
        };
      },

      // auto reload captcha if captcha mismatch
      ReloadCaptcha: function (verificationObj) {
        if (!verificationObj.verified) __Captcha.refresh(verificationObj.captcha.id);
      },

      // tirgger correct tick animation on verification
      TickTimer: null,
      Tick: function (verificationObj, animSec = 1) {
        animSec = animSec * 1000;
        // clear
        clearTimeout(__Captcha.Inbuilts.Verifications.TickTimer);
        verificationObj.captcha.els.submit.disabled = true;
        if (verificationObj.verified) {
          verificationObj.captcha.els.value.innerHTML = "<img src='/assets/img/correct-tick-anim.gif'/>";
        } else {
          verificationObj.captcha.els.value.innerHTML = "<img src='/assets/img/incorrect-tick-anim.gif'/>";
          verificationObj.captcha.els.input.focus();
        }
        __Captcha.Inbuilts.Verifications.TickTimer = setTimeout(() => {
          verificationObj.captcha.els.value.innerHTML = verificationObj.captcha.value;
          verificationObj.captcha.els.submit.disabled = false;
        }, animSec);
      }

    }
  };

  // add style easy function
  // styles : [ 
  //   ['styleNameInCamelCase', 'stylevalue'],
  //   ['borderColor', 'red'],
  //   ...
  //  ]
  __Captcha.addStyles = function (styles, element) {
    styles.forEach(style => {
      const name = style[0];
      const value = style[1];
      element.style[name] = value;
    });
  };

  // styles all captcha fields
  __Captcha.sytleAll = function (verificationObj, styles) {
    __Captcha.styleInput(verificationObj, styles);
    __Captcha.styleReload(verificationObj, styles);
    __Captcha.styleSubmit(verificationObj, styles);
  };

  // style captcha input
  __Captcha.styleInput = function (verificationObj, styles) {
    __Captcha.addStyles(styles, verificationObj.captcha.els.input);
  };

  // style captcha reload btn
  __Captcha.styleReload = function (verificationObj, styles) {
    __Captcha.addStyles(styles, verificationObj.captcha.els.reload);
  };

  // style captcha submit
  __Captcha.styleSubmit = function (verificationObj, styles) {
    __Captcha.addStyles(styles, verificationObj.captcha.els.submit);
  };

  // new essentials
  // __Captcha.essentials.
}