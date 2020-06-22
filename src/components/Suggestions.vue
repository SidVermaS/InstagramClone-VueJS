<template>
    <div>       
        <b-img :src="`${this.baseUrlPostPhoto}${this.$store.state.user.photo_url}`" rounded="circle" class="custom_user_photo_side"></b-img>










   </div>      
</template>

<script>
    import Vuex from 'vuex'
    import Connect from '../mixins/connect'

    export default {     
        name: 'Suggestions',
        mixins: [Connect],
        components: {


        },
        methods:    {

        



        }

        
    }
</script>

<style scoped>
    .custom_user_photo_side {
        width: 10%;
        height: 10%;
    }  










</style>