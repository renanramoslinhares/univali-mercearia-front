Vue.component("ChartArea", {
  data: () => ({}),
  computed: {
    config() {
      console.log("config -> this.data", this.data);
      return this.data.reduce(
        (accumulator, current) => {
          accumulator.data.labels.push(current.label);
          accumulator.data.datasets[0].backgroundColor.push(current.color);
          accumulator.data.datasets[0].data.push(current.value);
          return accumulator;
        },
        {
          data: {
            labels: [],
            datasets: [
              {
                label: this.title,
                data: [],
                backgroundColor: [],
              },
            ],
          },
          options: { responsive: true },
        }
      );
    },
  },
  props: ["vid", "type", "data", "title"],
  template: `<canvas class="w-100 chart-area" :id="vid"></canvas>`,
  methods: {
    searchElementAndCreateChart() {
      let element = "";
      const interval = setInterval(() => {
        element = document.getElementById(this.vid);
        if (element) {
          const ctx = element.getContext("2d");
          new Chart(ctx, this.config);
          clearInterval(interval);
        }
      }, 500);
    },
  },
  created() {
    this.config.type = this.type;
    console.log("created -> this.title.", this.title);
    this.searchElementAndCreateChart();
  },
});
