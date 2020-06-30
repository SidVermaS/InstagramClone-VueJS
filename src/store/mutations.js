export default  {
    initializeUser: (state, payload)=>  {
        console.log('init: ',payload)
        state['user']=payload
    },
    selectCurrentPage: (state, payload)=>   {
        state['current_page']=payload
    }
}