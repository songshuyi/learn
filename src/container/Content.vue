<template>
    <div>
        <router-link v-for="(item,index) in list"
                     :key="index"
                     v-text="item.zlliebiao"
                     :to="`/play/`"
                     tag="div">
        </router-link>
    </div>
</template>

<script>
    import API from '@/api'
    export default {
        name: 'content',
        data() {
            return {
                list: []
            }
        },
        methods: {
            async getList(zid,fzid) {
                this.list = JSON.parse(await API.get(`${API.content}?zid=${zid}&fzid=${fzid}`))
            }
        },
        mounted() {
            const {zid,fzid} = this.$route.params
            this.getList(zid,fzid)
        }
    }
</script>
<style lang="scss" scoped>

</style>