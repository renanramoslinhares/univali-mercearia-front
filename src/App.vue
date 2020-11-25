<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->
    <NavBar
      @active-item="
        (item) => {
          contentComponent = item.component;
          modalComponent = item.modalComponent;
        }
      "
    />
    <v-main>
      <!-- <ProductModal v-model="dialog" /> -->
      <PlusButton @dialog="() => (dialog = true)" v-if="modalComponent" />
      <component
        :is="modalComponent"
        v-model="dialog"
        @alert="(value) => (alert = value)"
      />
      <component :is="contentComponent" v-model="dialog" />
      <AlertBar :content="alert.content" :isError="alert.isError" />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "@/components/Dashboard";
import Products from "@/components/Products";
import Orders from "@/components/Orders";
import Clients from "@/components/Clients";

import ProductModal from "@/components/modal/ProductModal";
import ClientModal from "@/components/modal/ClientModal";
import OrderModal from "@/components/modal/OrderModal";

import NavBar from "@/components/NavBar";
import PlusButton from "@/components/PlusButton.vue";
import AlertBar from "@/components/AlertBar.vue";

export default {
  name: "App",

  components: {
    Dashboard,
    ProductModal,
    ClientModal,
    OrderModal,
    NavBar,
    Products,
    Orders,
    Clients,
    PlusButton,
    AlertBar,
  },

  data: () => ({
    alert: {
      isError: false,
      content: "",
    },
    contentComponent: "Dashboard",
    modalComponent: "",
    dialog: false,
  }),
};
</script>
