export default  {
    initializeUser: (state, payload)=>  {
        console.log('init: ',payload)
        state['user']=payload
    }
}