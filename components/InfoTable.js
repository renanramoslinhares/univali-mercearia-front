Vue.component("InfoTable", {
  data: () => ({}),
  props: ["dataTable"],
  template: `<div><h2>{{dataTable.title}}</h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th v-for="header in dataTable.headers">{{header}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lineList in dataTable.content">
            <td v-for="value in lineList">{{value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,
});
