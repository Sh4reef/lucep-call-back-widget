(() => {
  'use strict';
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
          callback();
        };
      });
    };
  })(init)
})();