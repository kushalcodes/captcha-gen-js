# captcha-gen-js

Library to generate captcha using JavaScript

## Examples

- Default : https://codepen.io/kushalcodes/pen/gOmpmKR
- Custom Submit Icon: https://codepen.io/kushalcodes/pen/ZEeGemP
- Border Effect: https://codepen.io/kushalcodes/pen/JjWdWmd
- Tick Animation Effect on Verification: https://codepen.io/kushalcodes/pen/ZEeGeVZ
- Border and Tick : https://codepen.io/kushalcodes/pen/jOBPBde
- Auto Captcha Reload On Invalid Verification: https://codepen.io/kushalcodes/pen/wvJaJOm

## Load library

add script to head or body

```javascript
<script src="https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@master/min/captcha-gen.min.js"></script>
```

## CSS

library's css is auto loaded when initialized, incase you want disable auto loading css:

```javascript
// use before initializing captcha or before __Captcha.init()
__Captcha.css = false;
```
CSS CDN : https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@master/min/captcha.min.css

## Use

initialize captcha on document element like:

- using id

  ```html
  <div id="my_captcha"></div>
  ```

  ```javascript
  __Captcha.init("#my_captcha");
  ```

- using class

  ```html
  <div class="my_captcha"></div>
  <div class="my_captcha"></div>
  <div class="my_captcha"></div>
  <div class="my_captcha"></div>
  ```

  ```javascript
  // will work on all elements with intialized class name
  __Captcha.init(".my_captcha");

  // custom verification response
  // default verification reponse just alerts user with prompt with captcha verification status
  __Captcha.init(".my_captcha", function (verificationResponse) {
    // do stuff with verificationResponse
  });
  ```

- captcha verification response object
  ```javascript
    // verificationResponse object holds following response
    {
      //true if captcha match the user entered captch value
      "verified": true || false,
      // holds captcha information
      "captcha": {
          "userInput": "", // user entered captcha value
          "value": "2o0l3R", // captcha value
          "id": 0, // captcha id
          "els": { // holds all respective captcha elements
              "parent": divElement, // captcha parent element
              "input": divElement, // captcha input text element
              "value": divElement, // captcha value element
              "reload": divElement, // captcha reload btn element
              "submit": divElement // captcha submit button element
          }
      }
    }
  ```

### Inbuilts Functions

inbuilts script, contains some useful handlers for handling captcha verification atm

```javascript
<script src="https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@master/min/captcha.inbuilt.min.js"></script>
```

> if you use this, put this script after core library

### Using Inbuilts Functions

- after loading inbuilts script you have \_\_Captcha.Inbuilts available

- atm \_\_Captcha.Inbuilts.Verifications has some UI interactive verification handling functions

```javascript
<script type="text/javascript">

    // for eg. we have Border verification handler which can be used as:
    __Captcha.init(".my_captcha", __Captcha.Inbuilts.Verifications.Border);

    // can also be used as
     __Captcha.init(".my_captcha", function(verificationResponse){

        // can use it like this
        // change border color on verification of captcha
       __Captcha.Inbuilts.Verifications.Border(verificationResponse);

        //  can use multiple verification handlers also
        // Tick verification handler
        // tirggers correct tick animation on verification,
        __Captcha.Inbuilts.Verifications.Tick(verificationResponse);
        // Tick also has another param for animation second
        // defualt second is 1 if not provided
        __Captcha.Inbuilts.Verifications.Tick(verificationResponse, 5);

        // can do stuff with verificationResponse
        // eg. can redirect to another page
        if(verificationResponse.verified){
          window.location.href = 'another/page/url';
        }

     });

     // ReloadCaptcha handler auto reloads captcha when captcha verification is incorrect
    __Captcha.init(".my_captcha", __Captcha.Inbuilts.Verifications.ReloadCaptcha);

    // other essential function that is available after laoding inbuilt function script

    // add styles to element
    __Captcha.addStyles([
      ['borderColor', '#ffffff'],
      ['camelCaseStyleName', 'styleValue'],
      ...
    ], element);

    // we can use this as
    __Captcha.init(".my_captcha", (response)=>{
      // if verified
      if(response.verified){
        // lets set background color to green on captcha input text box
        __Captcha.addStyles([
          ['backgroundColor', 'green']
        ], response.captcha.els.input);

      }else{
        // lets set background color to red on captcha input text box if not verified
        __Captcha.addStyles([
          ['backgroundColor', 'red']
        ], response.captcha.els.input);
      }
    });

    //above we handled only input box we also have styleAll available to add style to all captcha elements

    __Captcha.init(".my_captcha", (response)=>{
      // if verified
      if(response.verified){
        // lets set background color to green on captcha input text box
        __Captcha.sytleAll(
          response,
          [
            ['backgroundColor', 'green']
          ]
        );

      }else{
        // lets set background color to red on captcha input text box if not verified
        __Captcha.sytleAll(
          response,
          [
            ['backgroundColor', 'red']
          ]
        );
      }
    });

    // we also have individual stylers
    // stylesArray : [
    //   ['styleNameInCamelCase', 'stylevalue'],
    //   ['borderColor', 'red'],
    //   ...
    //  ]

    // for input text box
    __Captcha.styleInput(response, stylesArray);
    // for captcha reload btn
    __Captcha.styleReload(response, stylesArray);
    // for captcha submit btn
    __Captcha.styleSubmit(response, stylesArray);

    // we can also add and remove class names to all captcha elements
    __Captcha.addClassAll(response, className);
    __Captcha.removeClassAll(response, className);



</script>
```

### Setters

use setters before init or before initialize

```javascript
// set custom submit btn
__Captcha.setSubmitIcon({
  url: "imageUrl",
  size:
    "auto | length | cover | contain | initial | inherit | percentage | pixels",
  // percentage and pixels can have single value as
  // size : 10% | 10px
  // or
  // can have two values, width and height of the image in percent of the parent element
  // size : 10% 20% | 10px 20px
});
```

#### Other

- If you want to change border color for captcha UI, i have put a css selector as .\_\_border_color_default, just override this class to change as you need
- For other css, you can also directly view the css selectors (https://github.com/kushalcodes/captcha-gen-js/blob/main/captcha.css) and change as you wish

#### Thanks

- I have used icons from https://www.icons8.com
