<template>
    <div>
        <Layout></Layout>
        <notifications class="w-notify" group="w-notify" width="400" :duration="4000" position="top right"/>
    </div>
</template>

<script>
import Layout from "./components/Layout/Layout.vue";

export default {
    components: {
        Layout
    }
};
</script>

<style lang="scss">
html {
    background-color: #ececec;
}
.w-notify {
    top: 75px!important;
    right: 10px!important;

    .notification-title {
        font-size: 22px;
    }
    .notification-content {
        font-size: 16px; 
    }
}
</style>