import Vue from "vue";
import anime from "animejs";

Vue.component("w-select", {
    data: () => ({
        onFocus: false,
        errorMessage: null,
        showOptions: false,
        activeSnack: false
    }),

    props: {
        open: Boolean,
        value: [String, Number],
        disabled: Boolean,
        tile: Boolean,
        dark: Boolean,
        placeholder: String,
        label: String,
        color: {
            type: String,
            default: "primary"
        },
        beforeIcon: String,
        afterIcon: String,
        options: {
            type: Array,
            required: true
        },
        rules: Array
    },

    template: `
        <div class="input-container">
          <div class="snackbar">
              <transition @enter="enterSnack">
                  <div class="snackbar-card" ref="snack" v-if="$slots.snackbar && activeSnack">
                      <div class="close-card" @click="activeSnack = false">×</div>
                      <slot name="snackbar"></slot>
                  </div>
              </transition>
            </div>
            <div 
              :class="inputGroupClass"   
              :style="inputGroupStyle"  
              ref="inputGroup" 
              @click="handleOpen"
            >
                <w-icon v-if="beforeIcon" :icon="beforeIcon" class="before"></w-icon>
                <div class="input-label">
                    <input
                        readonly
                        :value="selectOption"
                        @input="$emit('input', $event.target.value)"
                        :class="inputClass"
                        :placeholder="placeholder"
                        
                    />
                    <label :style="labelStyle">
                      {{ label }}
                      <div class="snackbar" v-if="$slots.snackbar">
                          <div class="snackbar-action" @click="activeSnack = true">
                            <w-icon icon="info" h="12px"></w-icon>
                          </div> 
                      </div>
                    </label>
                </div>
                <div class="icon select-icon">
                    <img :src="iconURL" ref="selectIcon" />
                </div>
                <w-icon v-if="afterIcon" :icon="afterIcon" class="after"></w-icon>
            </div>
            <transition @enter="enterOptions" @leave="leaveOptions">
                <div 
                    class="select-options" 
                    :class="tile ? 'tile' : ''" ref="selectOptions" 
                    :style="selectOptionsStyle"
                    v-if="showOptions"
                >
                    <div 
                        class="opt" 
                        v-for="(opt, i) in options" 
                        :key="i" 
                        @click="selectOption = opt; showOptions = !showOptions"
                    >{{ opt }}</div>
                </div>
            </transition>
            <div class="error-input">{{ errorMessage }}</div>
        </div>
    `,

    watch: {
        'open'(newVal){
            this.showOptions = newVal;
        }
    },
    computed: {
        selectOption: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("input", newValue);
            }
        },

        iconURL() {
            return require("../../iconos/arrow-down.png");
        },

        inputGroupStyle() {
            if (this.errorMessage) {
                return `border: 2px solid ${this.$wlinii["error"]}`;
            } else {
                if (this.value || this.onFocus) {
                    return this.setInputColor().group;
                }
                return "";
            }
        },

        labelStyle() {
            if (this.errorMessage) {
                return `color: ${this.$wlinii["error"]}`;
            } else {
                if (this.value || this.onFocus) {
                    return this.setInputColor().label;
                }
                return "";
            }
        },

        selectOptionsStyle() {
            let optionsStyle = this.setOptionsWidth();
            if (this.errorMessage) {
                optionsStyle += ` border: 2px solid ${this.$wlinii["error"]}`;
            } else {
                if (this.value || this.onFocus) {
                    optionsStyle += ` this.setInputColor().group`;
                }
            }

            return optionsStyle;
        },

        inputGroupClass() {
            let inputGroupClass = "select-group";
            this.disabled ? (inputGroupClass += " disabled") : "";
            this.tile ? (inputGroupClass += " tile") : "";
            this.dark ? (inputGroupClass += " dark") : "";
            return inputGroupClass;
        },

        inputClass() {
            let inputClass = "";
            this.value ? (inputClass += "active") : "";
            this.disabled ? (inputClass += " disabled") : "";
            return inputClass;
        }
    },

    methods: {
        setInputColor() {
            if (this.$wlinii[this.color]) {
                return {
                    group: `border: 2px solid ${this.$wlinii[this.color]};`,
                    label: `color: ${this.$wlinii[this.color]};`
                };
            } else {
                return {
                    group: `border: 2px solid ${this.color};`,
                    label: `color: ${this.color};`
                };
            }
        },

        setOptionsWidth() {
            if (this.$refs.inputGroup) {
                return `width: ${this.$refs.inputGroup.clientWidth}px;`;
            } else {
                return `width: auto;`;
            }
        },

        validate() {
            if (this.rules) {
                for (let i = 0; i < this.rules.length; i++) {
                    if (this.rules[i](this.value)) {
                        this.errorMessage = this.rules[i](this.value);
                        return;
                    } else {
                        this.errorMessage = null;
                    }
                }
            }
        },

        enterOptions() {
            let optionsElement = this.$refs.selectOptions;
            let iconElement = this.$refs.selectIcon;
            anime({
                targets: optionsElement,
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

        leaveOptions() {
            let iconElement = this.$refs.selectIcon;

            anime({
                targets: iconElement,
                rotate: ["180deg", "0deg"],
                duration: 250,
                easing: "easeInOutSine"
            });
        },

        enterSnack() {
            let snackElement = this.$refs.snack;

            anime({
                targets: snackElement,
                scale: [0, 1],
                duration: 250,
                easing: "easeInOutSine"
            });
        },

        handleOpen(){
            this.showOptions = !this.showOptions;
            if(this.showOptions) this.$emit('onOpen', true);
        }
    }
});
