import Vue from "vue";
import anime from "animejs";

Vue.component("w-panel", {
  props: {
    value: Boolean,
    header: String,
    toggle: {
      type: Boolean,
      default: false
    }
  },

  template: `
        <div class="panel">
            <div class="panel-header" @click="active = !active">
                <div class="header">
                    {{ header }}
                </div>
                <div class="icon panel-icon">
                    <img :src="iconURL" ref="panelIcon" />
                </div>
            </div>
            <transition @enter="enterBody" @before-leave="leaveBody">
                <div class="panel-body" ref="panelBody" v-if="active">
                    <slot></slot>
                </div>
            </transition>
        </div>
    `,

  computed: {
    active: {
      get() {
        if(!this.toggle) return true;
        return this.value ? this.value : false;
      },
      set(newValue) {
        if(!this.toggle) return;
        this.$emit("input", newValue);
      }
    },

    iconURL() {
      return require("../../iconos/arrow-down.png");
    }
  },

  mounted() {
    if (this.value) {
      this.$refs.panelIcon.style.transform = "rotate(180deg)";
    }
  },

  methods: {
    enterBody() {
      let bodyElement = this.$refs.panelBody;
      let iconElement = this.$refs.panelIcon;
      anime({
        targets: bodyElement,
        scaleY: [0, 1],
        duration: 250,
        easing: "easeInOutSine"
      });

      anime({
        targets: iconElement,
        rotate: ["0deg", "180deg"],
        duration: 250,
        easing: "easeInOutSine"
      });
    },

    leaveBody() {
      let iconElement = this.$refs.panelIcon;

      anime({
        targets: iconElement,
        rotate: ["180deg", "0deg"],
        duration: 250,
        easing: "easeInOutSine"
      });
    }
  }
});
