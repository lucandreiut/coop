<template>
    <div>
        <div class="chanTitre">
            <u><h2 id="channel_label" class="titre">{{channel.label}}</h2></u>
            <h3 id="channel_topic" class="titre">{{channel.topic}}</h3>
            <button class="bouton" @click="deleteChannel()">X</button>
        </div>
        <posts :posts="posts"></posts>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PostsVue from '@/components/Posts'
  export default {
    data () {
      return {
        channel: null
      }
    },
    created () {
      this.channel = this.c(this.$route.params.id)[0]
      this.$store.dispatch('channel/getPostsChannel', this.channel._id)
    },
    components: {
      'posts': PostsVue
    },
    computed: {
      ...mapGetters({
        posts: 'channel/getPostsChannel',
        c: 'channels/getChannel'
      })
    },
    methods: {
      displayForm (bool) {
        if (bool) {
          document.getElementById('channel-header').style.display = 'none'
          document.getElementById('channel-header-form').style.display = 'block'
        } else {
          document.getElementById('channel-header').style.display = 'block'
          document.getElementById('channel-header-form').style.display = 'none'
        }
      },
      deleteChannel () {
        this.$store.dispatch('channels/deleteChannel', this.channel)
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.channel = this.c(to.params.id)[0]
      this.$store.dispatch('channel/getPostsChannel', this.channel._id)
      next()
    }
  }
</script>

<style>
    .chanTitre{
      padding:30px;
    }
    .bouton{
        display: inline; 
        margin-left: 15px;
    }
    .titre{
        display: inline;
    }
</style>

