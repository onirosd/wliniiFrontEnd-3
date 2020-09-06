<template>
    <!-- 

        MB-menu (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/60f1000f-d5db-4032-9329-a585591d1c5b/MB-menu)    

    -->

    <div>
        <transition @enter="enterDrawer">
            <div class="drawer" v-if="activeDrawer" ref="drawer">
                <div class="drawer-content">
                    <div class="drawer-close" @click="activeDrawer = false">×</div>
                    <w-icon icon="wlinii-white" h="75px"></w-icon>
                    <div class="drawer-divider"></div>
                    <w-btn
                        v-for="(route, i) in routes"
                        :key="i"
                        :fullwidth="true"
                        @click="surf(path)"
                    >{{ route.label }}</w-btn>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import anime from "animejs";

export default {
    data: () => ({
        routes: [
            {
                label: "Inicio",
                path: "/"
            },
            {
                label: "Precios",
                path: "/precios"
            },
            {
                label: "Alquiler",
                path: "/"
            },
            {
                label: "Venta",
                path: "/"
            },
            {
                label: "Nosotros",
                path: "/"
            },
            {
                label: "Contacto",
                path: "/"
            }
        ]
    }),

    props: {
        value: Boolean,
        required: true
    },

    computed: {
        activeDrawer: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("input", newValue);
            }
        }
    },

    methods: {
        enterDrawer() {
            let drawer = this.$refs.drawer;
            anime({
                targets: drawer,
                right: ["-375px", "0px"],
                duration: 250,
                easing: "easeInOutQuad"
            });
        },

        surf(path) {
            this.$router.push(path);
            this.activeDrawer = !this.activeDrawer;
        }
    }
};
</script>

<style lang="scss">
@import "../wlinii_components/sass/_variables.scss";

.drawer {
    position: fixed;
    top: 0;
    right: 0px;
    z-index: 99;
    height: 100%;
    width: 375px;
    background-color: $primary;
    .drawer-content {
        padding: 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .drawer-close {
            position: absolute;
            top: 21px;
            right: 21px;
            font-size: 34px;
            color: white;
            font-weight: bold;
            cursor: pointer;
        }
        .drawer-divider {
            width: 100%;
            margin: 46px 0px;
            border: 1px solid rgba($color: #fff, $alpha: 0.66);
        }
        .btn {
            background-color: transparent !important;
            font-weight: bold;
            font-size: 21px;
            color: white;
            margin: 0px !important;
        }
    }
}
</style>