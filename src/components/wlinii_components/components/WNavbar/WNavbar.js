import Vue from "vue";

Vue.component("w-navbar", {
    data: () => ({
        scroll: false
    }),

    props: {
        main: {
            type: Boolean,
            default: false
        }
    },

    template: `
        <div class="nav-container">
            <nav
                ref="nav"
                :class="navbarClass"
                v-scroll="handleScroll"
            >
            
                <slot></slot>
            </nav>
        </div>
    `,

    computed: {
        navbarClass() {
            let navClass = "navbar";
            this.scroll ? (navClass += " nav-hidden") : "";
            this.main ? (navClass += " main-nav") : "";
            return navClass;
        }
    },

    methods: {
        handleScroll(evt, el) {
            window.scrollY > 0 ? (this.scroll = true) : (this.scroll = false);
        }
    }
});

Vue.component("w-top-bar", {
    template: `
        <div class="top-bar">
            <slot></slot>
        </div>
    `
});

Vue.component("w-bottom-bar", {
    template: `
          <div class="bottom-bar">
              <slot></slot>
          </div>
      `
});
