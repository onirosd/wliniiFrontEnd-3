import Vue from "vue";
import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

Vue.component("w-carousel", {
  props: {
    items: {
      type: Number,
      default: 3
    },
    navigation: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    },
    nextIcon: {
      type: String,
      default: "arrow-right"
    },
    prevIcon: {
      type: String,
      default: "arrow-left"
    },
    background: String
  },

  template: `
    <div class="carousel-container" :style="containerStyle">
            <div class="carousel">
                <carousel
                    :perPage="items"
                    :navigationEnabled="navigation"
                    :paginationEnabled="pagination"
                    :navigationNextLabel="nextButton"
                    :navigationPrevLabel="prevButton"
                >
                    <slot></slot>
                </carousel>
            </div>
        </div>
  `,

  computed: {
    containerStyle() {
      if (this.background) {
        return `background-image: url(${this.background});`;
      }
    },

    nextButton() {
      return `<img src='${require(`../../iconos/${this.nextIcon}.png`)}'style='height: 57px; width: auto;' />`;
    },

    prevButton() {
      return `<img src='${require(`../../iconos/${this.prevIcon}.png`)}'style='height: 57px; width: auto;' />`;
    }
  }
});
