Vue.component("Navbar", {
  data: function () {
    return {
      count: 0,
    };
  },
  template: `<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
      <p style="margin-bottom: 0">Mercearia UNIVALI</p>
      <small>GERENCIAMENTO DE PEDIDOS</small>
    </a>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap nav-link">Bem vindo</li>
    </ul>
  </nav>`,
});
