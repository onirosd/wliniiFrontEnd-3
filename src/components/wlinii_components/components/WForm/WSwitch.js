import Vue from "vue";

Vue.component("w-switch", {
  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    inactiveLabel: String,
    activeLabel: String,
    color: {
      type: String,
      default: "primary"
    },
    dark: Boolean
  },

  template: `
        <div class="switch-group">
            <input 
                :checked="value" 
                @input="$emit('input', $event.target.checked)"
                type="checkbox" 
                :id="randomId" 
                :disabled="disabled"
                :class="'checkbox-'+color"
            >
            <label :for="randomId" :class="'switch-'+color" :style="dark ? 'color: white;' : ''">
                <span class="bold" :class="!value ? color+'-text' : ''">{{ inactiveLabel }}</span>
                <span class="bold">/</span>
                <span class="bold" :class="value ? color+'-text' : ''">{{ activeLabel }}</span>
            </label>
        </div>
    `,

  computed: {
    randomId() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 8; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }
  }
});
