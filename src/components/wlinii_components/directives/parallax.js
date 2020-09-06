import Vue from "vue";

Vue.directive("css-parallax", {
  bind: function(el, binding, vnode) {
    const MOBILE_OFF = binding.arg == "mobileoff" ? true : false;
    const WINDOW_WIDTH = window.innerWidth;

    if (WINDOW_WIDTH < 768 && MOBILE_OFF) {
      return false;
    } else {
      window.requestAnimationFrame(setScrollParallax);
    }

    function setScrollParallax() {
      const FROM_CENTER = binding.modifiers.center;

      const WINDOW_POS = FROM_CENTER
        ? window.innerHeight / 2
        : window.innerHeight;

      var scroll =
        document.documentElement.scrollTop - el.offsetTop + WINDOW_POS;

      if (scroll < 0) scroll = 0;

      el.style.setProperty("--scroll-amount", scroll);

      window.requestAnimationFrame(setScrollParallax);
    }
  },

  unbind: function() {
    cancelAnimationFrame(setScrollParallax);
  }
});
