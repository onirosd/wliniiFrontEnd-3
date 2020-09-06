import Vue from "vue";

Vue.component("w-checkbox", {
  props: {
    value: [Number, Boolean],
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    color: {
      type: String,
      default: "primary"
    },
    dark: Boolean
  },

  template: `
            <div class="checkbox-group">
                <input
                    :checked="value" 
                    @input="$emit('input', $event.target.checked)"
                    :id="randomId" 
                    type="checkbox"
                    :disabled="disabled"
                    :class="'checkbox-'+color" 
                />
                <label :for="randomId" :style="dark ? 'color: white;' : ''">{{ label }}</label>
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
