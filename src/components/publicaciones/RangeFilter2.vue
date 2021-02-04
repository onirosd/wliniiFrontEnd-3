<template>
    <div class="range-filter-container">
        <form class="range" @submit.prevent="">
            <div class="flex flex-row justify-between">
                <w-input placeholder="Desde" type="number" :disabled="disabled" v-model="range.from"/>
                <w-input placeholder="Hasta" type="number" :disabled="disabled" v-model="range.to"/>
                <button @click="handleChangedValue">✓</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "RangeFilter2",
    opcion : null,
    props: {
        disabled: {
            type: Boolean,
            default: true
        },
        options: "",
        value: {}
    },
    data: () => ({
        selectedOption: null,
        range: {}
    }),
    watch: {
        'value'(newVal){
            this.updateState(newVal);
        }
    },
    mounted() {
        this.opcion = this.value.option[0];
        this.updateState(this.value);
    },
    methods: {
        handleChangedValue(){
            if(this.disabled) return;

            this.selectedOption = this.options;
            console.log(this.range);
            if(!this.range.from || !this.range.to || Number(this.range.from) > Number(this.range.to)) return;
            this.$emit('changeRange', {option: this.selectedOption, ...this.range});

        },
        updateState(val){
            if(!val) {
                this.selectedOption = null;
                this.range = {};
            }else{
                this.selectedOption = val.option;
                this.range = {
                    from: val.from,
                    to: val.to
                };
            }
        },
        setOption(value){
            if(this.disabled) return;

            this.selectedOption = value;
        }
    },
};
</script>

<style lang="scss">
    .range-filter-container{
        .selection{
            display: flex;
        }
        .selection .btn{
            width: 100%;
        }
        .selection .btn:hover{
            background-color: rgb(255, 117, 0);
        }
        .range{
            margin: 10px 0 0;
        }
        .range .input-container{
            margin-right: 5px;
            width: 100%;
            margin-bottom: 0px!important;
        }
        .range button{
            padding: 0px 14px !important;
            background-color: #ececec;
            font-size: 20px;
            font-weight: 700;
        }
        .range button:hover{
            background-color: #ffa65a!important;
            color: white!important;
        }
    }
</style>