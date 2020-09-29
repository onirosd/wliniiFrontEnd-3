import Vue from "vue";

Vue.component("overlay-page-loader", {
    props: {
        loading: Boolean
    },

    template: `
        <div id="overlay-page-loader" :class="isShow ? 'active' : ''">
            <div class="spinner-container">
                <div class="lds-dual-ring"></div>
            </div>
        </div>
    `,

    computed: {
        isShow() {
            return this.loading;
        }
    },
});
