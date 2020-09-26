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
                        <img :src="avatar" />
                    </div>
                    <p class="text-center white-text">{{userInfo.name}}</p>
                    <div class="drawer-divider"></div>
                    <!-- <w-btn v-for="(action, i) in actions" :key="i" @click="action.path ? surf(action.path) : logout()" >
                        <w-icon :icon="action.icon" h="15px"></w-icon>
                        {{ action.name }}
                    </w-btn> -->

                    <div v-for="(action, i) in actions" :key="i">
                        <w-btn
                            v-if="!action.type || action.type.includes(userInfo.type)"
                            @click="action.path ? surf(action.path) : logout()"
                        >
                            <w-icon :icon="action.icon" h="15px"></w-icon>
                            {{ action.name }}
                        </w-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import anime from "animejs";
import { SERVER_URL, Nav_Links } from "@/common/config";
import { UserLogout } from "@/common/auth_apis";

export default {
    data: () => ({
        userInfo: {},
        actions: Nav_Links
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
        },
        avatar(){
            if(this.userInfo && this.userInfo.avatar) return SERVER_URL + this.userInfo.avatar;
            else return '/images/dummy_user.jpg';
        }
    },
    mounted() {
        this.userInfo = this.$store.getters.user;
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
            UserLogout();
            this.$router.push({path: '/'});
            window.location.reload();
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