<template>
  <div class="text-center">
    <v-snackbar
      :color="`${isError ? 'red' : 'indigo'} dark`"
      v-model="snackbar"
    >
      <div v-if="Array.isArray(content)">
        <span v-for="(singleMessage, key) in content" :key="key">
          {{ singleMessage }};<br />
        </span>
      </div>
      <span v-else>{{ content }}</span>

      <!-- <v-btn color="white" text @click="snackbar = false"> Fechar </v-btn> -->
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AlertBar",
  props: ["content", "isError"],
  data: () => ({
    snackbar: false,
  }),
  watch: {
    content(value) {
      if (value) this.snackbar = true;
    },
  },
};
</script>