<template>
  <div>
    <v-app-bar color="purple" dark extended>
      <v-toolbar-title>Mercearia UNIVALI</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          v-for="item in menuList"
          :key="item.component"
          @click.stop="$emit('active-item', item)"
        >
          <v-icon left>mdi-{{ item.icon }}</v-icon>
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>

      <v-btn icon @click.stop="drawer = !drawer" class="hidden-md-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute top temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="item in menuList"
            :key="item.component"
            @click.stop="$emit('active-item', item)"
          >
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    menuList: [
      {
        component: "Dashboard",
        icon: "align-vertical-bottom",
        name: "Dashboard",
      },
      {
        component: "Products",
        icon: "cart-outline",
        name: "Produtos",
        modalComponent: "ProductModal",
      },
      {
        component: "Orders",
        icon: "note-multiple-outline",
        name: "Pedidos",
        modalComponent: "OrderModal",
      },
      {
        component: "Clients",
        icon: "account-multiple-outline",
        name: "Clientes",
        modalComponent: "ClientModal",
      },
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>