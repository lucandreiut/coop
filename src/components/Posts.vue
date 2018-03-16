<template>
    <div>
        <div id="posts-container" >
            <div v-for="(post, index) in posts.posts" class="post-message">
                <div v-for="member in members">
                    <div v-if="member._id === post.member_id">
                        <p :id='"post_message" + post._id'><b>{{member.fullname}} :</b> {{post.message}} <button class="button"  v-if="user._id === post.member_id" @click="deletePosts({post, idChannel})">Supprimer</button></p>
                   </div>
                </div>
            </div>
        </div>
        <form id="post-form" v-on:submit.prevent="addPosts({message, idChannel})">
            <input type="text" v-model="message" class="send-form" id="send-form">
            <button type="submit">Envoyer</button>
        </form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['posts'],
    data () {
      return {
        idChannel: this.posts.idChannel,
        message: ''
      }
    },
    computed: {
      ...mapGetters({
        members: 'members/getMembers',
        user: 'auth/getConnectedUser'
      })
    },
    created () {
      setTimeout(() => {
        let element = document.getElementById('posts-container')
        element.scrollTop = element.scrollHeight
      }, 700)
    },
    methods: {
      setScrollToBottom () {
        setTimeout(() => {
          let element = document.getElementById('posts-container')
          element.scrollTop = element.scrollHeight
        }, 700)
      },
      addPosts (credentials) {
        this.$store.dispatch('channel/addPosts', credentials).then((response) => {
          this.setScrollToBottom()
          this.message = ''
        })
      },
      deletePosts (credentials) {
        this.$store.dispatch('channel/deletePosts', credentials)
      }
    }
  }
</script>

<style>
    .send-form {
        margin-left : 2%;
        width : 70vw;
        display : inline-block;
    }
    .button{
        display : inline-block; 
        float:right;
    }    
    #posts-container{
        padding-left : 2%;
        width: 90vw;
    }
    #post-form{
        position: fixed;
        width : 100%;
        bottom:35px;
    }
</style>

