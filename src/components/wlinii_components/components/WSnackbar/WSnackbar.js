import Vue from "vue";
import anime from "animejs";

Vue.component("w-snackbar", {
  data: () => ({
    active: false,
  }),

  template: `

        <div class="snackbar">
            <transition @enter="enterSnack">
                <div class="snackbar-card" ref="snack" v-if="$slots.content && active">
                    <div class="close-card" @click="active = false">×</div>
                    <slot name="content"></slot>
                </div>
            </transition>
            <div class="snackbar-action" @click="active = true" v-if="$slots.default">
                <slot></slot>
            </div> 
        </div>
    
    `,

  methods: {
    enterSnack() {
      let snackElement = this.$refs.snack;

      anime({
        targets: snackElement,
        scale: [0, 1],
        duration: 250,
        easing: "easeInOutSine",
      });
    },
  },
});
