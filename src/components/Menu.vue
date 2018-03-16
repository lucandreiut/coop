<template>
    <div>
        <button @click="signout()">Se déconnecter</button>
        <hr>
        <h1 class="tr">Chans</h1> 
        <div v-for="channel in channels"  class="chan">
            <router-link :to="{'path' : `/channels/${channel._id}`}"><a> {{channel.label}} </a></router-link>
        </div>
        <h2 class="chan"><router-link to="/nouveau_chan">+</router-link></h2>
        <hr>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        channels: {}
      }
    },
    created () {
      this.channels = this.$store.getters['channels/getChannels']
    },
    methods: {
      signout () {
        this.$store.dispatch('auth/logout', this.user).then(response => {
          this.$router.push({name: 'Signin'})
        })
      }
    }
  }
</script>

<style>
    .chan{
        display: inline;
        padding-left: 20px;
    }
    .tr{
        padding-left: 40px;   
    }
</style>

