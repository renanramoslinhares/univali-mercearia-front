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
                @click="$emit('input', { data: element })"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-left">
                    {{ element.clientName }}
                    <span class="caption">R$ {{ element.totalValue }}</span>
                  </v-list-item-title>
                  <!-- <v-list-item-subtitle class="text-left caption">
                    {{ element.description }}
                  </v-list-item-subtitle> -->
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
readOrders;
import { readOrders } from "@/services/crudOrder.js";
export default {
  name: "Orders",
  props: ["value"],
  data: () => ({
    search: "",
    list: [
      {
        id: 1,
        clientName: "Amanda",
        // totalValue: 18,
        items: [
          {
            productId: 5,
            orderNumber: 0,
            productAmount: 5,
            productValue: 3,
          },
          {
            productId: 3,
            orderNumber: 1,
            productAmount: 2,
            productValue: 1.5,
          },
        ],
      },
      {
        id: 2,
        clientName: "Dona Clarice",
        // totalValue: 21,
        items: [
          {
            productId: 2,
            orderNumber: 0,
            productAmount: 3,
            productValue: 7,
          },
        ],
        isActive: true,
      },
      {
        id: 3,
        clientName: "Carlos Eduardo",
        // totalValue: 9,
        items: [
          {
            productId: 3,
            orderNumber: 1,
            productAmount: 2,
            productValue: 4.5,
          },
        ],
        isActive: true,
      },
      {
        id: 4,
        clientName: "Júlia",
        // totalValue: 26,
        items: [
          {
            productId: 5,
            orderNumber: 0,
            productAmount: 5,
            productValue: 3,
          },
          {
            productId: 3,
            orderNumber: 1,
            productAmount: 2,
            productValue: 1.5,
          },
          {
            productId: 7,
            orderNumber: 1,
            productAmount: 2,
            productValue: 4,
          },
        ],
        isActive: true,
      },
    ],
  }),
  computed: {
    filtredList() {
      const list = this.list.filter(
        (element) =>
          element.clientName.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
      );

      list.forEach((element) => {
        element.totalValue = element.items.reduce((acc, cur) => {
          return cur.productValue * cur.productAmount + acc;
        }, 0);
      });

      return list;
    },
  },
  methods: {
    async loadList() {
      // this.list = await
      readOrders();
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