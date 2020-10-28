Vue.component("Dashboard", {
  data: () => ({
    title: "Dashboard",
    count: 0,
    dataTable: {
      title: "Table Title",
      headers: [
        "#",
        "Cabeçalho",
        "Cabeçalho",
        "Cabeçalho",
        "Cabeçalho",
        "Cabeçalho",
      ],
      content: [
        ["1,001", "libero", "amet", "dapibus", "libero", "dapibus"],
        ["1,002", "amet", "amet", "Integer", "libero", "dapibus"],
        ["1,003", "libero", "Integer", "dapibus", "libero", "dapibus"],
        ["1,004", "dapibus", "amet", "Integer", "libero", "dapibus"],
        ["1,005", "Lorem", "amet", "Integer", "libero", "dapibus"],
      ],
    },
  }),
  template: `<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">{{title}}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <ModalButton text="Novo" size="xl" :outlined="true" color="secondary"/>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-between flex-wrap">
      <div class="col-8 my-5 mx-auto"><ChartArea vid="id3" type="pie" title="Título Gráfico" :data='[
        { label: "Red", color: "#ff6384", value: 90 },
        { label: "Orange", color: "#ff9f40", value: 30 },
        { label: "Yellow", color: "#ffcd56", value: 49 },
        { label: "Green", color: "#4bc0c0", value: 43 },
        { label: "Blue", color: "#36a2eb", value: 14 },
      ]' /></div>
      <div class="col-6"><ChartArea vid="id1" type="pie" title="Título Gráfico" :data='[
        { label: "Red", color: "#ff6384", value: 90 },
        { label: "Orange", color: "#ff9f40", value: 30 },
        { label: "Yellow", color: "#ffcd56", value: 49 },
        { label: "Green", color: "#4bc0c0", value: 43 },
        { label: "Blue", color: "#36a2eb", value: 14 },
      ]' /></div>
      <div class="col-6"><ChartArea vid="id2" type="line" title="Título Gráfico" :data='[
        { label: "Red", color: "#ff6384", value: 90 },
        { label: "Orange", color: "#ff9f40", value: 30 },
        { label: "Yellow", color: "#ffcd56", value: 49 },
        { label: "Green", color: "#4bc0c0", value: 43 },
        { label: "Blue", color: "#36a2eb", value: 14 },
      ]' /></div>
    </div>
    <InfoTable :dataTable="dataTable"></InfoTable>
  </main>`,
});
