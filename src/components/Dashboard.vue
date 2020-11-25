<template>
  <v-container>
    <v-row>
      <v-col><h2>Dashboard</h2></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols-xl="4" cols-lg="6" cols-md="8" cols-sm="10" cols-xs="12">
        <v-card class="pa-5">
          Vendas por dia
          <canvas id="myChart" height="400"></canvas>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import moment from "moment";
import { readDashboard } from "@/services/readDashboard.js";

export default {
  name: "Dashboard",
  data: () => ({}),
  methods: {
    loadGraph() {
      return readDashboard().then((resp) => {
        moment.locale("pt-br");
        const listGraph = { values: [], labels: [] };
        for (let index = 0; index < 7; index++) {
          const date = moment().subtract(index, "days");
          listGraph.labels.push(
            date.format("dddd").charAt(0).toUpperCase() +
              date.format("dddd").slice(1)
          );
          listGraph.values.push(
            resp[date.format("l")] ? resp[date.format("l")] : 0
          );
        }
        return listGraph;
      });
    },
  },
  async mounted() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const color = "#33ff33aa";
    const options = { scales: { yAxes: [{ tricks: { beginAtZero: true } }] } };
    const resp = await this.loadGraph();
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: resp.labels,
        datasets: [
          {
            label: "Faturamento",
            data: resp.values,
            backgroundColor: [color, color, color, color, color, color, color],
            borderColor: [color, color, color, color, color, color, color],
            borderWidth: 1,
          },
        ],
      },
      options,
    });
  },
  created() {
    this.loadGraph();
  },
};
</script>