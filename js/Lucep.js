'use strict';
function Lucep(options) {
  function qs(n) {
    return document.getElementById(n);
  }
  function init() {
		console.log(options)
    if (typeof options === 'undefined') {
      this.options = { position: {}, name: true, phone: true, email: true }
    } else {
      this.options = options
    }
    this.valid = false;
    this.fields = { name: false, phone: false, email: false };
    this.position = options && options.position ? options.position : {};
    this.widget = document.createElement('div');
    this.widget.className = 'widget';
    this.widgetButton = document.createElement('div');
    this.widgetButton.className = 'widget-btn';
    this.widget.innerHTML = '<span class="widget_close-btn">✗</span><h1 class="widget_title">do you want to a callback?</h1><p class="widget_subtitle">Please give us your details and we will get back to you.</p><form></form><div class="lucep_logo"><img src="https://lucep.com/wp-content/uploads/2016/08/xlogo_1x.png.pagespeed.ic.fkU7FFqtxc.webp" alt="lucep logo"></div>';
    this.widgetButton.innerHTML = '<div class="phone-icon"><img src="img/ring.svg" alt="ring"></div><div class="widget-btn_text"><p>Click here to get a call-back</p></div>';
    this.render()
  };

  init.prototype.validate = function() {
    // https://stackoverflow.com/questions/2386054/javascript-phone-number-validation
    function validatePhone(phone) {
      var re = /[^0-9]/;
      return re.test(Number(phone));
    };
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(String(email).toLowerCase());
    };
    if (qs('name').value.trim() === '') {
      this.fields.name = false;
      qs('nemsg').style.display = 'block';
    } else {
      this.fields.name = true;
      qs('nemsg').style.display = 'none';
    };
    if (qs('phone').value.trim() === '') {
      this.fields.phone = false;
      qs('pemsg').style.display = 'block';
    } else if (validatePhone(qs('phone').value.trim())) {
      this.fields.phone = false;
      qs('pemsg').innerHTML = 'Invalid Phone!';
      qs('pemsg').style.display = 'block';
    } else {
      this.fields.phone = true;
      qs('pemsg').style.display = 'none';
    };
    if (qs('email').value.trim() === '') {
      this.fields.email = false;
      qs('eemsg').style.display = 'block';
    } else if (!validateEmail(qs('email').value.trim())) {
      this.fields.email = false
      qs('eemsg').innerHTML = 'Invalid Email!';
      qs('eemsg').style.display = 'block';
    } else {
      this.fields.email = true
      qs('eemsg').style.display = 'none';
    };

    if (this.fields.name && this.fields.phone && this.fields.email) {
      this.valid = true
    };
  };

  init.prototype.submit = function() {
    var self = this;
    var ENDPOINT = 'http://apilayer.net/api/validate?access_key=57cf69b3a87dbeed8d7e3a17261605f1';
    // https://gomakethings.com/promise-based-xhr/
    var makeRequest = function(url, method) {
      // Create the XHR request
      var request = new XMLHttpRequest();
      // Setup our listener to process compeleted requests
      request.onreadystatechange = function () {
        // Only run if the request is complete
        if (request.readyState !== 4) return;
        // Process the response
        if (request.status >= 200 && request.status < 300) {
          // If successful
          var res = JSON.parse(request.response);
          res.valid && (document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<p class="success">we will call you back soon, thanks!</p><button type="submit" class="form-btn">call now</button>');
          if (!res.valid) {
            document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<p class="danger">Make sure the phone number is valid!</p><button type="submit" class="form-btn">call now</button>';
            qs('pemsg').innerHTML = 'Invalid Phone!';
            qs('pemsg').style.display = 'block';
          }
        } else {
          // If failed
          alert(JSON.stringify(res));
        }
        alert(JSON.stringify(res));
        var submitButton = document.getElementsByClassName('form-btn')[0];
        submitButton.onclick = function(e) {
          e.preventDefault();
          self.validate();
          if (self.valid) {
            self.submit();
          };
        };
      };
      // Setup our HTTP request
      request.open('GET', url, true);
      // Send the request
      request.send();
    };

    document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<div class="loader"></div>';

    makeRequest(ENDPOINT+'&number='+qs('phone').value.trim())
  }

  init.prototype.renderForm = function() {
    var form = document.getElementsByTagName('form')[0];
    if (!this.options.name && this.options.name !== undefined) {
        form.innerHTML += ''
    } else {
      form .innerHTML += '<div class="form_field"><p id="nemsg" class="emsg">Required!</p><input type="text" id="name" name="name" placeholder="Your Name"></div>'
    }
    if (!this.options.phone && this.options.phone !== undefined) {
      form.innerHTML += ''
    } else {
      form.innerHTML += '<div class="form_field"><p id="pemsg" class="emsg">Required!</p><input type="text" id="phone" name="phone" placeholder="Phone Number"></div>'
    }
    form.innerHTML += '<div class="form_field"><select name="purpose" id="purpose"><option value="content">I\'m Interested in Content</option><option value="design">I\'m Interested in Design.</option></select></div>'
    if (!this.options.email && this.options.email !== undefined) {
      form.innerHTML += ''
    } else {
      form.innerHTML += '<div class="form_field"><p id="eemsg" class="emsg">Required!</p><input type="text" id="email" name="email" placeholder="Email"></div>'
    }
    form.innerHTML += '<div class="widget_form-btn"><button type="submit" class="form-btn">call now</button></div>'
  }

  init.prototype.render = function() {
    var self = this;
    this.position.top && (this.widget.style.top = this.position.top);
    this.widget.style.right = this.position.right ? this.position.right : '40px';
    this.widget.style.bottom = this.position.bottom ? this.position.bottom : '10px';
    this.position.left && (this.widgetButton.style.left = this.position.left);
    this.position.top && (this.widgetButton.style.top = this.position.top);
    this.widgetButton.style.right = this.position.right ? this.position.right : '40px';
    this.widgetButton.style.bottom = this.position.bottom ? this.position.bottom : '10px';
    this.position.left && (this.widget.style.left = this.position.left);
    var container = document.getElementsByTagName('body')[0];
    container.appendChild(this.widget);
    container.appendChild(this.widgetButton);
    this.renderForm();
    var closeButton = document.getElementsByClassName('widget_close-btn')[0];
    closeButton.onclick = function(e) {
      e.preventDefault();
      self.widget.style.display = 'none';
      self.widgetButton.style.display = 'block';
    };
    this.widgetButton.onclick = function(e) {
      e.preventDefault();
      self.widget.style.display = 'block';
      self.widgetButton.style.display = 'none';
    };
    var submitButton = document.getElementsByClassName('form-btn')[0];
    submitButton.onclick = function(e) {
      e.preventDefault();
      self.validate();
      if (self.valid) {
        self.submit();
      };
    };
  }
  return new init();
};