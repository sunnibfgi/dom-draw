(function() {
  'use strict';

  var startX;
  var startY;
  var move = false;
  var el = null;

  function pointX(e) {
    e = e || window.event;
    return e.pageX || e.clientX + document.body.scrollLeft;
  }

  function pointY(e) {
    e = e || window.event;
    return e.pageY || e.clientY + document.body.scrollTop;
  }

  function camelize(str) {
    return str.replace(/-(.)/g, function(a, b) {
      return b.toUpperCase();
    });
  }

  function setStyle(el, opts) {
    if (el === undefined)
      return;
    for (var prop in opts) {
      if (opts.hasOwnProperty(prop)) {
        var props = camelize(prop);
        el.style[props] = opts[prop];
      }
    }
  }

  function hex() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
  }

  function rgb(opacity) {
    opacity = Math.min(100, opacity);
    if (!(0 in arguments)) {
      return 'rgb(' + (~~(Math.random() * 256)) + ',' + (~~(Math.random() * 256)) + ',' + (~~(Math.random() * 256)) + ')';
    }
    return 'rgba(' + (~~(Math.random() * 256)) + ',' + (~~(Math.random() * 256)) + ',' + (~~(Math.random() * 256)) + ',' + opacity / 100 + ')';
  }

  //event bind
  document.onmousedown = drawStart;
  document.onmousemove = drawMove;
  document.onmouseup = drawEnd;

  //event handler
  function drawStart(e) {

    startX = pointX(e);
    startY = pointY(e);

    if (e.button) return;
    el && document.body.removeChild(el);
    if (!move) {
      move = true;
      el = document.createElement('div');
      setStyle(el, {
        position: 'absolute',
        top: startY + 'px',
        left: startX + 'px',
        'background-color': rgb()
      });
    }
    document.body.appendChild(el);
  }

  function drawMove(e) {
    var diffX, diffY, offsetLeft, offsetTop;
    if (!move) return;

    diffX = pointX(e) - startX;
    diffY = pointY(e) - startY;

    if (diffX > 0)
      setStyle(el, {
        left: startX + 'px',
        width: diffX + 'px'
      });

    if (diffY > 0)
      setStyle(el, {
        top: startY + 'px',
        height: diffY + 'px'
      });

    if (diffX <= 0) {
      offsetLeft = startX + diffX;
      setStyle(el, {
        left: offsetLeft + 'px',
        width: Math.abs(diffX) + 'px'
      });
    }

    if (diffY <= 0) {
      offsetTop = startY + diffY;
      setStyle(el, {
        top: offsetTop + 'px',
        height: Math.abs(diffY) + 'px'
      });
    }

  }

  function drawEnd(e) {
    //clean
    move && (move = false);
    startX = null;
    startY = null;
    drawStart = drawMove = drawEnd = null;
  }

})();
