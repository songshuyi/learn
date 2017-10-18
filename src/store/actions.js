import api from '@/api'

const actions = {
    async setIndex({commit}){
        const data = await api.get(api.index)
        commit('SET_INDEX',data)
    },
    showLoading({commit},state){
        commit('SHOW_LOADING',state)
    },
    showMsg({commit},state){
        commit('SHOW_MSG',state)
    },
    setUserEndTime({commit},state){
        commit('SET_USER_END_TIME',state)
    },
    setLoginTo({commit},state){
        commit('SET_LOGIN_TO',state)
    },
    setInfo({commit},state){
        commit('SET_INFO',state)
    },
    setCurTenderInfo({commit},state){
        commit('SET_CUR_TENDER_INFO',state)
    },
    setMessageInfo({commit},state){
        commit('SET_MESSAGE_INFO',state)
    }
}
export default actions