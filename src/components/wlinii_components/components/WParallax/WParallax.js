import Vue from "vue";

Vue.component("w-parallax", {
  props: {
    image: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: "100"
    },
    position: {
      type: String,
      default: "absolute"
    }
  },

  template: `
    <div class="parallax-container" :style="containerStyle">
        <div :style="parallaxStyle" class="parallax" v-scroll="parallaxEfect">
            <slot></slot>
        </div>
    </div> 
  `,

  computed: {
    containerStyle() {
      return `margin-bottom: ${this.height}vh;`;
    },

    parallaxStyle() {
      return `
            background-image: url(${this.image}); 
            background-position-y: '0px'; 
            height: ${this.height}vh; 
            position: ${this.position};
        `;
    }
  },

  methods: {
    parallaxEfect(evt, el) {
      el.style.backgroundPositionY = window.pageYOffset * 0.75 + "px";
    }
  }
});
