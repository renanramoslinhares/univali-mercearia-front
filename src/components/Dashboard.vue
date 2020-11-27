<template>
  <v-container>
    <v-row>
      <v-col><h2>Dashboard</h2></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols-xl="4" cols-lg="6" cols-md="8" cols-sm="10" cols-xs="12">
        <v-card class="pa-5">
          Vendas por dia
          <canvas id="myChart"></canvas>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import { readDashboard } from "@/services/readDashboard.js";

export default {
  name: "Dashboard",
  data: () => ({}),
  methods: {
    async loadGraph() {
      const resp = await readDashboard();
      return  { 
        labels: Object.keys(resp), 
        values: Object.values(resp)
      };
    },
  },
  async mounted() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const color = "#33ff33aa";
    const options = { 
      reponsive: true,
      maintainAspectRatio: true,
      scales: { 
        yAxes: [{ 
          tricks: { 
            beginAtZero: true 
          } 
        }] 
      } 
    };
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