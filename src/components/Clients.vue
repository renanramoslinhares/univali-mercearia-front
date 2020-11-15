<template>
  <v-container>
    <v-row>
      <v-col><h2>Clientes</h2></v-col>
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
                    {{ element.name }}
                    <small>{{ formatDate(element.created_at) }}</small>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-left caption">
                    {{ element.email }}
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
import moment from "moment";
import { readClients } from "@/services/crudClient.js";

export default {
  name: "Products",
  props: ["value"],
  data: () => ({
    search: "",
    list: [],
  }),
  computed: {
    filtredList() {
      return this.list.filter(
        (element) =>
          element.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
  },
  methods: {
    formatDate(date) {
      moment.locale("pt-br");
      date = moment(new Date(date));
      const registredYear = date.format("YYYY");
      const yearNow = moment(moment.now()).format("YYYY");
      const format = registredYear === yearNow ? "D [de] MMM" : "ll";
      return date.format(format);
    },
    async loadList() {
      this.list = await readClients();
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