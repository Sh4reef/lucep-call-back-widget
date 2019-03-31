(function() {
  'use strict'

  var [closeButton] =  document.getElementsByClassName('widget_close-btn')
  var [widget] = document.getElementsByClassName('widget')
  var [widgetButton] = document.getElementsByClassName('widget-btn')
  closeButton.onclick = function(e) {
    e.preventDefault()     
    widget.style.opacity = 0
    widgetButton.style.opacity = 1
  }
  widgetButton.onclick = function(e) {
    e.preventDefault()     
    widget.style.opacity = 1
    widgetButton.style.opacity = 0
  }
  var [submitButton] = document.getElementsByClassName('form-btn')
  submitButton.onclick = function(e) {
    e.preventDefault()
    console.log(e)
  }
}())