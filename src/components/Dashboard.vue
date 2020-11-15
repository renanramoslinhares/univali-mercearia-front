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

export default {
  name: "Dashboard",
  data: () => ({
    params: {
      type: "bar",
      data: {
        labels: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ],
        datasets: [
          {
            label: "Quantidade",
            data: [0, 42, 35, 55, 30, 46, 23],
            backgroundColor: [
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
            ],
            borderColor: [
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
              "#33ff33aa",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    },
  }),
  mounted() {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, this.params);
  },
};
</script>