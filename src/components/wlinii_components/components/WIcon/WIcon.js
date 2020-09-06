import Vue from "vue";

Vue.component("w-icon", {
  props: {
    icon: {
      type: String,
      required: true
    },
    h: {
      type: String,
      default: "auto"
    },
    w: {
      type: String,
      default: "auto"
    }
  },

  template: `
        <div class="icon">
            <img :src="iconURL" :style="iconSIZE" />
        </div>
    `,

  computed: {
    iconURL() {
      if (this.$wlinii.environment == "laravel") {
      } else {
        return this.icon ? require(`../../iconos/${this.icon}.png`) : null;
      }
    },

    iconSIZE() {
      return `height: ${this.h}; width: ${this.w};`;
    }
  }
});
