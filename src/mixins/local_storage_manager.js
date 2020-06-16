export default  {
    methods:    {
        setStoreValue(key, value)   {
            localStorage.setItem(key, value)
        },
        getStoreValue(key)  {
            return localStorage.getItem(key)
        },
        clearStoreValue(key) {
            return localStorage.removeItem(key)
        }
    }
}