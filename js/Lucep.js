'use strict';
const Lucep = (defaultOptions = { position: {}, name: true, phone: true, email: true }) => {
  return new class {
    constructor(options = defaultOptions) {
      this.valid = false;
      this.fields = { name: false, phone: false, email: false };
      this.position = options.position ? options.position : {};
      this.widget = document.createElement('div');
      this.widget.className = 'widget';
      this.widgetButton = document.createElement('div');
      this.widgetButton.className = 'widget-btn';
      this.widget.innerHTML = `
        <span class="widget_close-btn">✗</span>
        <h1 class="widget_title">
          do you want to a callback?
        </h1>
        <p class="widget_subtitle">
          Please give us your details and we will get back to you.
        </p>
        <form>
          ${!options.name && options.name !== undefined ? `` : `
            <div class="form_field">
              <p id="nemsg" class="emsg">Required!</p>
              <input type="text" id="name" name="name" placeholder="Your Name">  
            </div>
          `}
          ${!options.phone && options.phone !== undefined ? `` : `
            <div class="form_field">
              <p id="pemsg" class="emsg">Required!</p>
              <input type="text" id="phone" name="phone" placeholder="Phone Number">  
            </div>
          `}
          <div class="form_field">              
              <select name="purpose" id="purpose">
                <option value="content">I'm Interested in Content</option>
                <option value="design">I'm Interested in Design.</option>
              </select>
          </div>
          ${!options.email && options.email !== undefined ? `` : `
            <div class="form_field">
              <p id="eemsg" class="emsg">Required!</p>
              <input type="text" id="email" name="email" placeholder="Email">
            </div>  
          `}        
          <div class="widget_form-btn">              
              <button type="submit" class="form-btn">call now</button>
          </div>
        </form>
        <div class="lucep_logo">
          <img src="https://lucep.com/wp-content/uploads/2016/08/xlogo_1x.png.pagespeed.ic.fkU7FFqtxc.webp" alt="lucep logo">
        </div>            
      `;
      this.widgetButton.innerHTML = `      
        <div class="phone-icon">
          <img src="img/ring.svg" alt="ring">
        </div>
        <div class="widget-btn_text">          
          <p>Click here to get a call-back</p>
        </div>      
      `;
    };

    validate() {
      const qs = (n) => document.getElementById(n);
      // https://stackoverflow.com/questions/2386054/javascript-phone-number-validation
      const validatePhone = (phone) => {
        const re = /[^0-9]/;
        return re.test(Number(phone));
      };
      // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
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
      }
    };

    submit() {
      document.getElementsByClassName('widget_form-btn')[0].innerHTML = `
        <div class="loader"></div>
      `
      // simulating async request
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ success: 'we will call you back soon, thanks!' })
        }, 1000);
      }).then((res) => {
        document.getElementsByClassName('widget_form-btn')[0].innerHTML = `
          <p class="success">${res.success}</p>
        `
      })
    };

    render() {
      this.position.top && (this.widget.style.top = this.position.top);
      this.widget.style.right = this.position.right ? this.position.right : '40px';
      this.widget.style.bottom = this.position.bottom ? this.position.bottom : '10px';
      this.position.left && (this.widgetButton.style.left = this.position.left);
      this.position.top && (this.widgetButton.style.top = this.position.top);
      this.widgetButton.style.right = this.position.right ? this.position.right : '40px';
      this.widgetButton.style.bottom = this.position.bottom ? this.position.bottom : '10px';
      this.position.left && (this.widget.style.left = this.position.left);
      const [container] = document.getElementsByTagName('body');
      container.append(this.widget);
      container.append(this.widgetButton);
      const [closeButton] = document.getElementsByClassName('widget_close-btn');
      closeButton.onclick = (e) => {
        e.preventDefault();
        this.widget.style.opacity = 0;
        this.widgetButton.style.opacity = 1;
      };
      this.widgetButton.onclick = (e) => {
        e.preventDefault();
        this.widget.style.opacity = 1;
        this.widgetButton.style.opacity = 0;
      };
      const [submitButton] = document.getElementsByClassName('form-btn');
      submitButton.onclick = (e) => {
        e.preventDefault();
        this.validate();
        if (this.valid) {
          this.submit();
        };
      };
    };
  };
};