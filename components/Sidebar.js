Vue.component("Sidebar", {
  data: () => ({
    menuList: [
      { icon: "bar-chart-2", name: "Dashboard", component: "Dashboard" },
      { icon: "file", name: "Pedidos", component: "Orders" },
      { icon: "shopping-cart", name: "Produtos", component: "Products" },
      { icon: "users", name: "Clientes", component: "Clients" },
      { icon: "layers", name: "Estoque", component: "Stock" },
    ],
  }),
  template: `<nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item" v-for="menuItem in menuList">
          <a class="nav-link" :href="menuItem.link" @click="$emit('out', menuItem)"> <!-- class active -->
            <span :data-feather="menuItem.icon"></span>
            {{menuItem.name}} <span class="sr-only">(atual)</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>`,
});
