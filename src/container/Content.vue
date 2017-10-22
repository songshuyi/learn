<template>
    <div>
        <div>
            <header class="half">
                <p class="play_name" v-text="now_play"></p>
            </header>
            <div class="list">
                <div class="half" v-for="(item,index) in list" :key="index"
                      @click="change(index)">
                    <div class="list_name" v-text="item.zlliebiao"></div>
                </div>
            </div>
            <footer>
                <div class="play_time">
                    <p class="fr" v-text="duration"></p>
                    <p v-text="current_time"></p>
                </div>
                <progress class="progress" :value="progress" @click="progress_time"></progress>
                <div class="play_menu">
                    <a class="play_icon loop" @click="loop"></a>
                    <a class="play_icon prev" @click="switchMusic('prev')"></a>
                    <a class="play_icon play" @click="play" :class="paused?'pause':'play'"></a>
                    <a class="play_icon next" @click="switchMusic('next')"></a>
                </div>
            </footer>
            <div class="mask"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    let loop_index = 0
    let myAudio = ''
    let duration = 0
    let loadOver = false
    import API from '@/api'
    export default {
        name: 'content',
        data() {
            return {
                zid: this.$route.params.zid,
                fzid: this.$route.params.fzid,
                list : [{}],
                now_play: '',
                paused : true,
                current_time: '00:00',
                duration : '00:00',
                progress : 0,
                loop_type : 1,//0随机 1循环 2单曲
            }
        },
        methods: {
            play(){
                if(myAudio.paused){
                    myAudio.play();
                    this.paused = true;
                }else{
                    myAudio.pause();
                    this.paused = false;
                }
            },
            switchMusic(flag){
                if(this.loop_type == 0){
                    loop_index = Math.floor(Math.random()*this.list.length);
                }else if(this.loop_type == 1){
                    if(flag == 'next'){
                        if(loop_index == this.list.length-1){
                            loop_index = 0;
                        }else{
                            loop_index ++;
                        }
                    }else if(flag == 'prev'){
                        if(loop_index == 0){
                            loop_index = this.list.length-1;
                        }else{
                            loop_index --;
                        }
                    }
                }else{
                    myAudio.currentTime = 0;
                    myAudio.play();
                }
                this.change(loop_index)
            },
            loop(e){
                var loop_position=['0 -260px','0 -100px','0 -180px'];
                if(this.loop_type == 2){
                    this.loop_type = 0;
                }else{
                    this.loop_type++;
                }
                e.target.style.backgroundPosition = loop_position[this.loop_type];
            },
            change(i) {
                const now_play = this.list[i]
                this.now_play = now_play.zlliebiao
                if(now_play.zlliebiao) {
                    myAudio.src = now_play.muz
                    localStorage.setItem(this.zid+'-'+this.fzid,now_play.zlliebiao)
                    localStorage.setItem(this.zid+'-'+this.fzid+'-i',i)
                    loop_index = i
                    this.init()
                }
            },
            progress_time(e) {
                myAudio.currentTime = (e.clientX-window.innerWidth*0.1)/(window.innerWidth*0.8)*myAudio.duration;
            },
            init() {
                clearInterval(duration)
                loadOver = false
                duration = setInterval(() => {
                    if(!isNaN(myAudio.duration) && !isNaN(myAudio.currentTime)){
                        this.duration = this.covert_time(myAudio.duration)
                        this.current_time = this.covert_time(myAudio.currentTime);
                        this.progress = (myAudio.currentTime/myAudio.duration).toFixed(2)
                        if(!loadOver && myAudio.paused){
                            myAudio.play()
                            loadOver = true
                        }
                    }
                },1000)
            },
            covert_time(time) {
                time = Math.floor(time)
                let s = time%60
                let minute = Math.floor(time/60)
                return (minute>=10?minute:'0'+minute)+':'+ (s>=10?s:'0'+s)
            },
            async getList() {
                this.list = JSON.parse(await API.get(`${API.content}?zid=${this.zid}&fzid=${this.fzid}`)).reverse()
            }
        },
        mounted() {
            myAudio = new Audio()
            myAudio.loop = false
            myAudio.onended = () => {
                myAudio.pause()
                this.switchMusic('next')
            }
            myAudio.ontimeupdate = this.init()
            myAudio.onloadedmetadata = this.play()
            this.now_play = localStorage.getItem(this.zid+'-'+this.fzid)
            loop_index = localStorage.getItem(this.zid+'-'+this.fzid+'-i') || -1
            this.getList()
        }
    }
</script>
<style lang="scss" scoped>
    .fr{float: right;}
    .mask{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;
        background: -webkit-gradient(linear,50% top,50% bottom,from(#0E2024),to(#1B6E71));opacity: 0.8;}
    .play_name{font-size: 18px;line-height:28px;text-align: center;}
    .play_singer{font-size: 12px;line-height:22px;text-align: center;}
    .half{display:block;position: relative;padding: 10px 20px;}
    .half:before{content: '';
        position: absolute;top:0;left: 0;
        border-bottom: 1px solid #fff;
        width: 200%;height: 200%;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin:  0 0;
        box-sizing: border-box;
    }
    .list{height: 8rem;overflow: auto;}
    .list_name{font-size: 16px;line-height: 26px;}
    .list_singer{font-size: 12px;line-height: 22px;}

    footer{display: block;width: 80%;margin: 0 auto;}
    .play_time{font-size: 12px;padding: 5px 0;}
    .progress{-webkit-appearance: none;height: 3px;display: block;width:100%;}
    .progress::-webkit-progress-bar { background: #C0C0C0;border-radius: 2px;}
    .progress::-webkit-progress-value {  border-radius: 2px;  background: #fff;}

    .play_menu{padding-top: 20px;text-align: center;position: relative;height: 92px;}
    .play_icon{background:url('/static/img/icon.png') no-repeat;display:inline-block;-webkit-transform: scale(0.35);-webkit-transform-origin: 0 0;transform: scale(0.35);transform-origin: 0 0;}
    .prev{width:130px;height:130px;background-position:-170px -220px;position: absolute;top:33px;left: 15%;}
    .next{width:130px;height:130px;background-position:-570px -220px;position: absolute;top:33px;left: 85%;margin-left: -45px;}
    .play{width:180px;height:180px;background-position:-350px 0;position: absolute;top:25px;left: 50%;margin-left: -31px;}
    .pause{width:180px;height:180px;background-position:-350px -200px;position: absolute;top:25px;left: 50%;margin-left: -31px;}
    .loop{background-position:0 -100px;width:66px;height:57px;position: absolute;top:45px;left: 0;}
    .prev:active,.next:active,.play:active,.pause:active,.loop:active{-webkit-transform: scale(0.3);transform: scale(0.3);}
</style>