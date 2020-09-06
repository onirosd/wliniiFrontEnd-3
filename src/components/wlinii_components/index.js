import Vue from "vue";

// THEME
Vue.prototype.$wlinii = {
  primary: "#041e42",
  secondary: "#ff7500",
  tertiary: "#a08629",
  accent: "#193c63",
  success: "#00ce59",
  error: "#ff0000"
};

// COMPONENTS
import "./components";

// STYLES
import "./sass/app.scss";

// directives
import "./directives/parallax";
import "./directives/scroll";
