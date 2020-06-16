<template>
    <b-card class="custom_card col-sm-12 col-md-4 mx-auto">
        <b-form @submit.prevent="submitLogin">
            <b-form-group
                id="input-group"
                label="Mobile No."
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    placeholder="Enter mobile no.">
                </b-form-input>    
            </b-form-group>
            <b-form-group
                id="input-group"
                label="Password"
                label-for="input-2">
                 <b-form-input
                    id="input-2"
                    type="password"
                    pattern="{6,32}"
                    required
                    placeholder="Enter password">                    
                </b-form-input>   
            </b-form-group>    
        </b-form>    
    </b-card>
</template>

<script>
    export default  {
        name: 'Login',
        methods:    {
            submitLogin: async function()   {

            }
        }













    }
</script>
<style scoped>






</style>