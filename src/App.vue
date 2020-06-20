<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#custom_group    {
    text-align: left;
}

.custom_card  {
  padding-top: 5%;
  height: 100vh;
}
.custom_button  {
  margin-top: 10%;
}

.custom_background  {
  background: #FAFAFA;
}
.custom_post  {
  width: 40%;
  height: 40;
}
.custom_user_background {
  background: #fff;
  padding: 2% 2% 2% 3%;
  text-align: left;
}
.custom_image {
  width: 100%;
  height: 100%;
}
.custom_user_photo  {
  width: 8%;
  height: 12%;
}
.custom_user_name {
  font-weight: bold;
  font-size: 90%;
  margin-left: 2.5%;
}
.custom_post_caption  {
  background: #fff;
  text-align: left;
}

</style>
