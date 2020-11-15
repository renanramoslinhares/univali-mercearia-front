<template>
  <div class="text-center">
    <v-snackbar
      :color="`${isError ? 'red' : 'indigo'} dark`"
      v-model="snackbar"
    >
      {{ text }}

      <v-btn color="white" text @click="snackbar = false"> Fechar </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AlertBar",
  props: ["text", "isError"],
  data: () => ({
    snackbar: false,
  }),
  watch: {
    text(value) {
      if (value) this.snackbar = true;
    },
  },
};
</script>