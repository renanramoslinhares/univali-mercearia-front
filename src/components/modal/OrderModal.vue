<template>
  <v-dialog
    :value="Boolean(value)"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <div>
        <v-toolbar flat dark color="purple">
          <v-btn icon dark @click="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ value.data ? "Editar Pedido" : "Novo Pedido" }}
          </v-toolbar-title>
        </v-toolbar>
      </div>
      <v-card-text>
        <v-switch
          v-model="form.isActive"
          :label="form.isActive ? 'ATIVO' : 'INATIVO'"
        ></v-switch>
        <v-text-field
          label="Cliente"
          outlined
          v-model="form.clientName"
        ></v-text-field>

        <v-autocomplete
          v-model="form.clientName"
          :items="clientList"
          item-text="name"
          item-value="id"
          outlined
          dense
          label="Clientes"
          class="mt-5"
        ></v-autocomplete>
        <!-- <v-text-field
          label="Quantidade"
          type="number"
          outlined
          v-model="amount"
        ></v-text-field> -->
        <!-- <v-textarea
          outlined
          label="Descrição"
          rows="3"
          v-model="description"
        ></v-textarea> -->
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  v-for="(header, key) in ['Id', 'Nome', 'Preço', 'Quantidade']"
                  :key="key"
                  class="text-left"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in form.items" :key="key">
                <td class="text-left">
                  <v-btn @click.stop="removeItemList(key)">Remover</v-btn>
                </td>
                <td class="text-left">{{ item.productId }}</td>
                <td class="text-left">
                  {{
                    productList.find((product) => product.id === item.productId)
                      .name
                  }}
                </td>
                <td class="text-left">R$ {{ item.productValue }}</td>
                <td class="text-left">{{ item.productAmount }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn
          small
          class="mt-5"
          color="purple"
          dark
          @click.stop="dialog = !dialog"
        >
          Adicionar produto
        </v-btn>
        <p class="mt-5">Total do pedido: R$ {{ totalValue }}</p>
        <v-btn class="col-3" color="purple" dark @click.stop="save()">
          Salvar
        </v-btn>
        <v-btn
          class="col-3 ml-3"
          outlined
          color="purple"
          dark
          @click.stop="remove()"
        >
          Excluir
        </v-btn>
      </v-card-text>

      <div style="flex: 1 1 auto"></div>
    </v-card>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Adicionar produto</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-autocomplete
            v-model="productId"
            :items="productList"
            item-text="name"
            item-value="id"
            outlined
            dense
            label="Produtos"
            class="mt-5"
          ></v-autocomplete>
          <v-text-field
            v-model="productAmount"
            type="number"
            label="Quantidade"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="productValue"
            type="number"
            label="Valor unitário"
            outlined
            dense
          ></v-text-field>
          <v-btn
            class="col-6"
            color="purple"
            dark
            @click.stop="insertProduct()"
          >
            Salvar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
export default {
  name: "OrderModal",
  props: ["value"],
  data: () => ({
    dialog: false,
    idEdit: "",
    form: {
      isActive: true,
      clientName: "",
      items: [],
    },
    clientList: [],
    productList: [
      {
        id: 0,
        name: "Gilette Prestobarba",
        amount: 50,
        description:
          "Aparelho de Barbear Descartável Gillette Prestobarba Ultragrip - 2 Unidades",
        isActive: true,
      },
      {
        id: 1,
        name: "Maionese Hellman's 335g",
        amount: 100,
        description: "",
        isActive: true,
      },
      {
        id: 2,
        name: "Banana Prata Kg",
        amount: 20,
        description: "",
        isActive: false,
      },
      {
        id: 3,
        name: "Cerveja Heineken 330ml",
        amount: 240,
        description: "",
        isActive: true,
      },
      {
        id: 4,
        name: "Pão de Queijo Forno de Minas 1Kg",
        amount: 30,
        description: "",
        isActive: true,
      },
      {
        id: 5,
        name: "Desinfetante Pinho Sol Original 500ml",
        amount: 50,
        description: "",
        isActive: true,
      },
    ],
    productId: "",
    productAmount: "",
    productValue: "",
  }),
  computed: {
    totalValue() {
      return this.form.items.reduce((acc, cur) => {
        return cur.productValue * cur.productAmount + acc;
      }, 0);
    },
  },
  methods: {
    insertProduct() {
      this.form.items.push({
        productId: this.productId,
        productAmount: this.productAmount,
        productValue: this.productValue,
      });
      this.dialog = false;

      this.$emit("alert", {
        text: "Sucesso: Item inserido!",
        isError: false,
      });
    },
    save() {
      // this.idEdit
      console.log("save -> this.form", this.form);
    },
    remove() {
      // this.idEdit
    },
    removeItemList(key) {
      console.log("removeItemList -> key", key);
      this.form.items.splice(key, 1);
    },
  },
  watch: {
    value(value) {
      if (!value) {
        this.productId = "";
        this.productAmount = "";
        this.productValue = "";
      }
      console.log("value -> value.data", value.data);
      this.idEdit = value.data ? value.data.id : "";
      this.form = {
        clientName: value.data ? value.data.clientName : "",
        items: value.data ? value.data.items : [],
        isActive: value.data ? value.data.isActive : "",
      };
    },
  },
  mounted() {
    const self = this;
    window.addEventListener("keyup", function (ev) {
      if (ev.key === "Escape") self.$emit("input", false);
    });
  },
};
</script>