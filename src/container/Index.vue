<template>
    <div>
        <div v-for="(item,index) in fenlei"
             v-text="item"
             @click="getList(index)">
        </div>
        <router-link v-for="(item,index) in list"
                     :key="index"
                     v-text="item.lb"
                     tag="div"
                     :to="`/content/${item.zid}/${item.fzid}`">
        </router-link>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'index',
        data() {
            return {
                fenlei: [],
                list: []
            }
        },
        mounted() {
            this.getFenLei()
            this.getList(0)
        },
        methods: {
            async getFenLei() {
                const data = await API.get(API.fenlei)
                this.fenlei = JSON.parse(data)
            },
            async getList(zid) {
                const data = await API.get(`${API.list}?zid=${zid}`)
                this.list = JSON.parse(data)
            }
        },
        computed: {},
        components: {}
    }
</script>
<style lang="scss" scoped>

</style>