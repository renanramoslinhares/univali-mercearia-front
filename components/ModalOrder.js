Vue.component("ModalOrder", {
  data: () => ({}),
  props: ["page"],
  computed: {
    title() {
      return {
        dashboard: this.page,
        orders: this.page,
        products: this.page,
        clients: this.page,
        stock: this.page,
      }[this.page.toLowerCase()];
    },
    content() {
      return {
        dashboard: this.page,
        orders: this.page,
        products: this.page,
        clients: this.page,
        stock: this.page,
      }[this.page.toLowerCase()];
    },
  },
  template: `<div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Criar/Editar Pedido</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <form>
        <div class="form-group">
          <label>Input</label>
          <input type="text" class="form-control" placeholder="Input">
        </div>
        <div class="form-group">
          <label>Input</label>
          <input type="text" class="form-control" placeholder="Input">
        </div>
      </form>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary">Salvar mudanças</button>
      </div>
    </div>
  </div>
</div>`,
});
