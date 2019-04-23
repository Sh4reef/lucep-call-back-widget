(() => {
  'use strict'
  const Lucep = (defaultOptions = { position: {}, name: true, phone: true, email: true }) => {
    return new class {
      constructor(options = defaultOptions) {
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
                <input type="text" name="name" placeholder="Your Name">  
              </div>
            `}
            ${!options.phone && options.phone !== undefined ? `` : `
              <div class="form_field">
                <input type="text" name="phone" placeholder="Phone Number">  
              </div>
            `}
            <div class="form_field">              
                <select name="purpose" id="">
                  <option value="content">I'm Interested in Content</option>
                  <option value="design">I'm Interested in Design.</option>
                </select>
            </div>
            ${!options.email && options.email !== undefined ? `` : `
              <div class="form_field">
                <input type="text" name="email" placeholder="Email">
              </div>  
            `}        
            <div class="widget_form-btn">
                <button type="submit" class="form-btn">call now</button>
            </div>
          </form>
          <div class="lucep_logo">
            <img src="https://lucep.com/wp-content/uploads/2016/08/xlogo_1x.png.pagespeed.ic.fkU7FFqtxc.webp" alt="lucep logo">
          </div>            
        `
        this.widgetButton.innerHTML = `      
          <div class="phone-icon">
            <img src="img/ring.svg" alt="ring">
          </div>
          <div class="widget-btn_text">          
            <p>Click here to get a call-back</p>
          </div>      
        `
      }

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
          e.preventDefault()
          this.widget.style.opacity = 0
          this.widgetButton.style.opacity = 1
        }
        this.widgetButton.onclick = (e) => {
          e.preventDefault()
          this.widget.style.opacity = 1
          this.widgetButton.style.opacity = 0
        }
        const [submitButton] = document.getElementsByClassName('form-btn')
        submitButton.onclick = function (e) {
          e.preventDefault()
          console.log(e)
        }
      }
    }
  }

  const init = () => {
    // Lucep instance    
    const lucep = Lucep();
    lucep.render();
  }

  ((callback) => {
    if (document.readyState != 'loading') {
      callback()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') {
          callback()
        };
      });
    };
  })(init)
})();