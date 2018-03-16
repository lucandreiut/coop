<template>
    <div class="signin-body">
        <div v-if="!this.registered">
            <h3>Login</h3>
            <hr>
            <div>
                <form @submit.prevent="signin()">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="user.email" required/>
                        <hr>
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" v-model="user.password"  minlength="6" required/>
                        <br/>
                        <hr>
                        <input type="submit" value="Se connecter">
                        <a style="color:blue;" @click="setRegister()">S'inscrire</a>
                </form>
            </div>
        </div>
        <div v-else>
            <h3>S'enregistrer</h3>
            <hr>
                <form @submit.prevent="register()">
                        <label for="nom">Nom</label>
                        <input type="text" v-model="newuser.fullname" required/>
                        <hr>
                        <label for="email">Email</label>
                        <input type="email" v-model="newuser.email" required/>
                        <hr>
                        <label for="email">Mot de passe</label>
                        <input type="password" v-model="newuser.password" minlength="6" required/>
                        <hr>
                        <input type="submit" value="Créer">
                        <a style="color:blue;" @click="setRegister()" >Déjà un compte ?</a>
                </form>
        </div>
    </div>
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        registered: false,
        user: {email: '', password: ''},
        newuser: {fullname: '', email: '', password: ''}
      }
    },
    methods: {
      signin () {
        this.$store.dispatch('auth/login', this.user).then(response => {
          this.$store.dispatch('channels/initChannels')
          this.$store.dispatch('members/initMember')
          this.$router.push({name: 'Charger'})
        })
      },
      register () {
        this.registered = !this.registered
        api.post('/members', this.newuser).then(response => {
          this.user.email = this.newuser.email
        })
      },
      setRegister () {
        this.registered = !this.registered
      }
    }
  }
</script>

<style>
.signin-body{
    padding:40px;
}
</style>
