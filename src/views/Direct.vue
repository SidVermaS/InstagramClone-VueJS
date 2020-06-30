<template>
    <div>
        
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
export default {
    name: 'Direct',
    methods:    {        
        ...mapActions([
            "setCurrentPage"
        ])  
    },
    created()    {
        this.setCurrentPage('direct_active')
    }
}
</script>