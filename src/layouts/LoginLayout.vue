
<template>
  <q-layout class="login-signup">
    <div class="q-pa-md window-height">
      <div class="row justify-center full-height">
        <q-card class="my-card col-12 col-sm-7 col-md-5 col-lg-3 mt-0 no-shadow">
          <q-card-section>
            <q-btn-toggle
              v-model="tab"
              spread
              no-caps
              toggle-color="purple"
              color="black"
              text-color="black"
              :options="[
                {label: 'Sign in', value: 'login'},
                {label: 'Register', value: 'register'}
              ]"
              @update:model-value="updateRoute"
            >
            </q-btn-toggle>
            <q-page-container class="full-height">
              <router-view class="full-height q-p-none"/>
            </q-page-container>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  components: {},
  data () {
    return {
      tab: ''
    }
  },
  methods: {
    updateRoute (val) {
      this.$router.push(`/${val}`)
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (name) {
        this.tab = name
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
.error-msg {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
  font-weight: 500 !important;
}
</style>
