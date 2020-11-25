<template>
  <v-container>
    <v-row>
      <v-col><h2>Pedidos</h2></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols-xl="4" cols-lg="6" cols-md="8" cols-sm="10" cols-xs="12">
        <v-card class="pa-5">
          <v-list subheader two-line flat>
            <v-subheader>
              <v-text-field
                class="mt-6"
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                outlined
              ></v-text-field>
            </v-subheader>

            <v-list-item-group>
              <v-list-item
                v-for="(element, index) in filtredList"
                :key="index"
                @click="$emit('input', { idEdit: element.id })"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-left">
                    {{ element.client.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-left caption">
                    R$ {{ element.totalValue }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { readOrders } from "@/services/crudOrder.js";
export default {
  name: "Orders",
  props: ["value"],
  data: () => ({
    search: "",
    list: [],
  }),
  computed: {
    filtredList() {
      return this.list.filter(
        (element) =>
          element.client.name.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
      );
    },
  },
  methods: {
    async loadList() {
      this.list = await readOrders();
    },
  },
  watch: {
    value(value) {
      if (!value) this.loadList();
    },
  },
  created() {
    this.loadList();
  },
};
</script>