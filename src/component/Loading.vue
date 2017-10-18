<template>
    <div class="mask" v-show="loading"></div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import api from '@/api'
    export default {
        name:'loading',
        methods: {
        },
        computed: {
            ...mapGetters([
                'loading'
            ])
        },
        mounted () {
            api.interceptors()
        }
    }
</script>
<style lang="scss" scoped>
    .mask{position: fixed;top:0;left: 0;z-index:10;width: 100%;height: 100%;
        background: #000;opacity: 0.5;}
</style>