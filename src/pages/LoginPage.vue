<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
    >
      <div class="form-content">
        <q-input
          filled
          label="E-MAIL"
          placeholder="Enter e-mail address"
          v-model.trim="v$.email.$model"
          :error="v$.email.$error"
          @input="v$.email.$touch()"
          :error-message="v$.email.$error && v$.email.required.$invalid ? 'Email field is required' : v$.email.$error && v$.email.email.$invalid ? 'Please enter a valid email address' : ''"
        />
        <div class="password">
          <q-input
            filled
            label="PASSWORD"
            placeholder="Enter password"
            type="password"
            v-model.trim="v$.password.$model"
            :error="v$.password.$error"
            @input="v$.password.$touch()"
            :error-message="v$.password.$error && v$.password.required.$invalid ? 'Password field is required' : v$.password.$error && v$.password.minLength.$invalid ? 'Password field must contain 8 characters.' : ''"
          />
        </div>

      </div>
      <div class="button">
        <q-btn label="Sign in" type="submit" color="secondary no-shadow full-width" :disable="v$.$invalid || isLoading"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useQuasar } from 'quasar'

// import Toasters from "./../mixins/toasters";
import axios from 'axios'

export default {
  name: 'LoginPage',
  setup () {
    return {
      q$: useQuasar(),
      v$: useVuelidate()
    }
  },
  // mixins: [Toasters],
  data () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      this.isLoading = true
      await axios.post('http://127.0.0.1:3000/', {}, {
        auth: {
          username: this.email,
          password: this.password
        }
      }).then(response => {
        localStorage.setItem('token', response.data?.access_token)
        // this.success('LoggedIn successfully.')
        this.q$.notify({
          type: 'positive',
          progress: true,
          position: 'top-right',
          message: 'LoggedIn successfully.'
        })
        this.resetData()
      }).catch(() => {
        // this.error('Oops, something went wrong.')
        this.q$.notify({
          type: 'negative',
          progress: true,
          position: 'top-right',
          message: 'The credentials provided were invalid.'
        })
      })
      this.isLoading = false
    },
    resetData () {
      this.email = ''
      this.password = ''
      this.v$.$reset()
    }
  }
}
</script>

<style scoped>

</style>
