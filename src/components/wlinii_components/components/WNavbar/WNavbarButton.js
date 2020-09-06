import Vue from "vue";

Vue.component("w-nav-btn", {
  data: () => ({
    currentRoute: "/",
    isActive: false
  }),

  props: {
    to: String,
    icon: String,
    iconH: String,
    iconW: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  template: `
        <div :class="btnClass" @click="$emit('click')">
            <w-icon
                v-if="icon"
                :icon="icon"
                :h="iconH || 'auto'"
                :w="iconW || 'auto'"
            ></w-icon>
            <slot v-else></slot>
        </div>
    `,

  computed: {
    btnClass() {
      let buttonClass = "nav-btn";
      this.icon ? (buttonClass += "-icon") : "";
      this.disabled ? (buttonClass += " disabled") : "";
      return buttonClass;
    }
  }
});
