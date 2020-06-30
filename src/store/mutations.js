export default  {
    initializeUser: (state, payload)=>  {
        console.log('init: ',payload)
        state['user']=payload
    },
    selectCurrentPage: (state, payload)=>   {
        console.log('scp: ',payload)
        state['current_page']=payload
    }
}