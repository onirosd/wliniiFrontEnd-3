<template>
    <!-- 
        
        MB-inicio-logueo-submenu (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/640495e8-6928-44ad-98a1-00462d0624de/MB-inico-logeo-submenu)

    -->

    <div>
        <transition @enter="enterDrawer">
            <div class="drawer-logged" v-if="activeDrawer" ref="drawer">
                <div class="drawer-content">
                    <div class="drawer-close" @click="activeDrawer = false">×</div>
                    <div class="avatar mb-2">
                        <img src="/images/rostros/4.png" />
                    </div>
                    <p class="text-center white-text">Hola Diego</p>
                    <div class="drawer-divider"></div>
                    <w-btn
                        v-for="(action, i) in actions"
                        :key="i"
                        @click="action.path ? surf(action.path) : logout()"
                    >
                        <w-icon :icon="action.icon" h="15px"></w-icon>
                        {{ action.name }}
                    </w-btn>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import anime from "animejs";

export default {
    data: () => ({
        actions: [
            {
                name: "Perfil",
                icon: "user",
                path: "/agente"
            },
            {
                name: "Perfil Broker",
                icon: "user",
                path: "/perfil/brocker"
            },
            {
                name: "Publicación",
                icon: "edit",
                path: "/publicaciones/nueva"
            },
            {
                name: "AMC",
                icon: "database",
                path: "/amc/1"
            },
            {
                name: "Cerrar Sesión",
                icon: "logout"
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
        },

        logout() {
            localStorage.setItem("logged", JSON.stringify(false));
            this.activeDrawer = !this.activeDrawer;
        }
    }
};
</script>

<style lang="scss">
@import "../wlinii_components/sass/_variables.scss";

.drawer-logged {
    position: fixed;
    top: 0;
    right: 0px;
    z-index: 999;
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

        .avatar {
            width: 94px;
            height: 94px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid $secondary;
        }

        .drawer-divider {
            width: 100%;
            margin: 23px 0px;
            border: 1px solid rgba($color: #fff, $alpha: 0.66);
        }
        .btn {
            background-color: transparent !important;
            font-weight: bold;
            font-size: 21px;
            color: white;
            display: flex;
            flex-direction: row;
            margin: 0px !important;
            .icon,
            p {
                align-self: center;
            }
            .icon {
                margin-right: 12px;
            }
        }
    }
}
</style>