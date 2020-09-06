import Vue from "vue";
import anime from "animejs";

Vue.component("w-filterselect", {
    data: () => ({
        onFocus: false,
        errorMessage: null,
        showOptions: false,
        activeSnack: false,
        searchedOptions: [],
        activeIndex: -1,
        searchText: '',
        storedText: ''
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
              @click="handleFocus"
              @focusout="closeOtpions"
            >
                <w-icon v-if="beforeIcon" :icon="beforeIcon" class="before"></w-icon>
                <div class="input-label">
                    <input
                        :disabled="disabled"
                        :value="searchText"
                        @input="handleInput"
                        @keydown="handleKeydown"
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
                <w-icon v-if="afterIcon" :icon="afterIcon" class="after"></w-icon>
            </div>
            <transition @enter="enterOptions" @leave="leaveOptions">
                <div 
                    class="select-options" 
                    :class="tile ? 'tile' : ''" ref="selectOptions" 
                    :style="selectOptionsStyle"
                    v-if="showOptions"
                >
                    <div v-if="searchedOptions.length">
                        <div 
                            v-for="(opt, i) in searchedOptions" 
                            :key="i" 
                            :class="i=== activeIndex ? 'opt_1 active' : 'opt_1'"
                            @click="handleSelectItem(opt)"
                        >{{ opt }}</div>
                    </div>
                    <div v-else class="opt_no_found">Not Found</div>
                </div>
            </transition>
            <div class="error-input">{{ errorMessage }}</div>
        </div>
    `,

    watch: {
        'value'(newVal){
            this.searchText = newVal;
        },
        'open'(newVal){
            if(newVal) this.handleFocus();
            else this.showOptions = false;
        }
    },
    mounted() {
        this.searchText = this.value ? this.value : '';
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
        closeOtpions(e){
            let self = this;
            setTimeout(function(){
                self.showOptions = false;
            }, 150);
        },
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

        handleSelectItem(item){
            this.searchText = item;
            this.showOptions = false;
            this.$emit("input", this.searchText);
        },

        handleFocus(){
            if(this.disabled) return;
            
            if(!this.searchText) {
                this.showOptions = false;
                this.activeIndex = -1;
            }else{
                this.showOptions = true;
                this.filterOptions(this.searchText);
            }
            this.$emit('onOpen', true);
        },

        handleInput(e){
            const { value } = e.target;
            this.searchText = value;
            if(!value){
                this.showOptions = false;
                this.activeIndex = -1;
                this.$emit("input", this.searchText);
            }else{
                this.showOptions = true;
                this.filterOptions(value);
            } 
        },

        handleKeydown(e){
            const { keyCode } = e;
            if(!this.showOptions || !this.searchedOptions.length) return;
            if(keyCode === 13 || keyCode === 40 || keyCode === 38) e.preventDefault();

            switch(keyCode){
                case 13:
                    if(this.activeIndex === -1 && this.searchedOptions[0] === this.searchText)
                        this.handleSelectItem(this.searchedOptions[0]);
                    if(this.activeIndex > -1)
                        this.handleSelectItem(this.searchedOptions[this.activeIndex]);
                    break;
                case 40:
                    this.downOptions();
                    break;
                case 38:
                    this.upOptions();                    
                    break;
                default:
                    break;
            }
        },

        downOptions(){
            if(this.activeIndex == -1) this.storedText = this.searchText;

            if(this.searchedOptions.length - 1 > this.activeIndex) {
                this.activeIndex += 1;
                this.searchText = this.searchedOptions[this.activeIndex];
            }
        },

        upOptions(){
            if(this.activeIndex > 0) {
                this.activeIndex -= 1;
                this.searchText = this.searchedOptions[this.activeIndex];
            }else{
                this.activeIndex = -1;
                this.searchText = this.storedText;
            }
        },

        filterOptions(){
            if(!this.options.length) return;
            if(!this.searchText){
                this.searchedOptions = this.options;
                return;
            }

            let _val = this.searchText.toLowerCase();
            let _filters = this.options.filter(o => o.toLowerCase().includes(_val))
                    .sort((a, b) => a.toLowerCase().indexOf(_val) - b.toLowerCase().indexOf(_val));
            this.searchedOptions = _filters.slice(0, 5);
            this.activeIndex = -1;
            // $emit('input', $event.target.value)
        }
    }
});
