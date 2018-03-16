<template>
    <div class="newchan">
        <h1>Nouveau chan</h1>
                <form @submit.prevent="newChannel()">
                        <label for="nom" class="tx">Nom du chan</label>
                        <input id="nom" type="text" v-model="newchannel.nom">
                        <label for="descr" class="tx">Description</label>
                        <input id="descr" type="text" v-model="newchannel.descr">
                </form>
            <button @click="newChannel()" class="bttn">Créer</button>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        newchannel: {nom: '', descr: ''}
      }
    },
    methods: {
      newChannel () {
        this.$store.dispatch('channels/newChannel', this.newchannel).then(response => {
          this.$router.push({path: '/channels/'})
        })
      }
    }
  }
</script>

<style>
    .newchan{
        padding:30px;
    }
    .tx{
        padding-left: 20px;
    }
    .bttn{
        margin-top:10px;
    }
</style>

