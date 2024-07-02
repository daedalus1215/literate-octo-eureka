<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </base-card>
  </section>
</template>
<script>
import CoachForm from './CoachForm.vue';

export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      console.log('data', data)
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    }
  }
}
</script>