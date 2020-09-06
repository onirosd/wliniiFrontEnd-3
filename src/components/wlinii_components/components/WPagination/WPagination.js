import Vue from "vue";

Vue.component("w-pagination", {
  props: {
    length: {
      required: true,
      type: Number,
    },

    value: {
      required: true,
      type: Number,
    },
  },

  template: `
    <div class="pagination">
        <input
            disabled
            hidden
            :value="page"
            @input="$emit('input', $event.target.value)"
        />
        <w-btn :disabled="page <= 1" @click="page -= 1" class="prev-btn"><div class="prev-icon"></div></w-btn>
        <w-btn v-for="i in length" :key="i" @click="page = i" :class="i == page ? 'active' : ''">{{ i }}</w-btn>
        <w-btn :disabled="page >= length" @click="page += 1" class="next-btn"><div class="next-icon"></div></w-btn>
    </div>
  `,

  computed: {
    page: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
});
