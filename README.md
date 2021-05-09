# captcha-gen-js

> Library to generate captcha using JavaScript

## Load library

> add script to head or body

```javascript
<script src="https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@97e40187c30a03df2fcb7f12945b3fbdcf1fbc90/min/captcha-gen.min.js"></script>
```

## Use

> initialize captcha on document element like:

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
              // captcha value element
              "value": divElement,
              // captcha reload btn element
              "reload": divElement,
              // captcha submit button element
              "submit": divElement
          }
      }
    }
  ```

### Inbuilts Functions

> inbuilts script, contains some useful handlers for handling captcha verification atm

```javascript
<script src="https://cdn.jsdelivr.net/gh/kushalcodes/captcha-gen-js@97e40187c30a03df2fcb7f12945b3fbdcf1fbc90/min/captcha.inbuilt.min.js"></script>
```

> if you use this, put this script after core library

### Using Inbuilts Functions

> after loading inbuilts script you have \_\_Captcha.Inbuilts available

> atm \_\_Captcha.Inbuilts.Verifications has some UI interactive verification handling functions

```javascript
<script type="text/javascript">

    //for eg. we have Border verification handler which can be used as:
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
</script>
```
