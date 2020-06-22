<template>
    <div id="custom_suggestion">    
    
                <b-img :src="`${this.baseUrlPostPhoto}${this.$store.state.user.photo_url}`" rounded="circle" id="custom_user_photo_side" style="display: inline-block;"></b-img>
                <span style="display:inline-block;">           
                    <p id="custom_user_name">{{this.$store.state.user.name}}</p>      
                    <span id="custom_user_role" class="custom_faded_color">{{this.$store.state.user.role}}</span>
                </span>






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
    #custom_user_photo_side {
          /* width: 10%;
        height: 95%; */
        width: 4.5%;
        height: 10.5%;
        margin: -1.3% 1% 0% 0%;
    }  
    #custom_suggestion  {
        padding: 8.5% 0% 0% 0%;
        text-align: left;
        float: left;
    }
    #custom_user_name {
        font-weight: bold;
        font-size: 79.5%;     
        padding: 10% 0% 0% 0%;  
        margin-bottom: -6%;
    }
    #custom_user_role    {
        font-size: 79.5%;
    }






</style>