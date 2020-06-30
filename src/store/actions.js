


export default  {
    setUser: ({ commit }, payload)=>    {
        commit('initializeUser', payload)
    },
    setCurrentPage: ({ commit }, payload)=> {
        commit('selectCurrentPage', payload)
    }
}