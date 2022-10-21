<template>
  <div class="q-pa-md">
    <q-form>
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
        <div class="password">
          <q-input
            filled
            label="CONFIRM PASSWORD"
            placeholder="Enter confirm password"
            type="password"
            v-model.trim="v$.confirmPassword.$model"
            :error="v$.confirmPassword.$error"
            @input="v$.confirmPassword.$touch()"
            :error-message="v$.confirmPassword.$error && v$.confirmPassword.required.$invalid ? 'Password field is required' : v$.confirmPassword.$error && v$.confirmPassword.sameAsPassword.$invalid ? 'Password field must contain 8 characters.' : ''"
          />
        </div>
      </div>
      <div class="button">
        <q-checkbox
          v-model="termsCondition"
          color="secondary"
          label="Do you agree with the terms & conditions?"
          :true-value="true"
          :false-value="false"
        />
        <q-btn label="Register" type="submit" color="secondary no-shadow full-width" :disable="v$.$invalid"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default {
  name: 'RegisterPage',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      termsCondition: false
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
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    termsCondition: {
      sameAs: sameAs(() => true)
    }
  },
  methods: {
    register () {
      console.log('registered successfully')
    }
  }
}
</script>
