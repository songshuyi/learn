<template>
    <div>
        <div class="head">
            <div v-for="(item,index) in fenlei"
                 v-text="item"
                 @click="getList(index)">
            </div>
        </div>
        <div class="list">

            <router-link v-for="(item,index) in list"
                         :key="index"
                         v-text="item.lb"
                         tag="div"
                         class="half"
                         :to="`/content/${item.zid}/${item.fzid}`">
            </router-link>
        </div>
        <div class="mask"></div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'index',
        data() {
            return {
                fenlei: ['得到'],
                list: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            async getList() {
                this.list = await API.get('/static/deDao/deDao.json')
            }
        },
        computed: {},
        components: {}
    }
</script>
<style lang="scss" scoped>
    .head{
        position: fixed;top:0;left:0;width:100%;text-align:center;display: flex;
        div{
            flex:1;line-height: 1rem;width: 1%;
        }
    }
    .mask{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;
        background: -webkit-gradient(linear,50% top,50% bottom,from(#0E2024),to(#1B6E71));opacity: 0.8;}
    .half{display:block;position: relative;padding: 10px 20px;}
    .half:before{content: '';
        position: absolute;top:0;left: 0;
        border-bottom: 1px solid #fff;
        width: 200%;height: 200%;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin:  0 0;
        box-sizing: border-box;
    }
    .list{height: 10rem;overflow: auto;padding-top: 1rem;}
</style>