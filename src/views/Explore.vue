<template>
    <div>
        
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
export default {
    name: 'Explore',
    methods:    {           
        ...mapActions([
            "setCurrentPage"
        ])  
    },
    created()    {
        this.setCurrentPage('explore_active')
    }
}
</script>