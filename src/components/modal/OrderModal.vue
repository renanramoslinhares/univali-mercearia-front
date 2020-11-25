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
            {{ value.idEdit ? "Editar Pedido" : "Novo Pedido" }}
          </v-toolbar-title>
        </v-toolbar>
      </div>
      <v-card-text>
        <v-autocomplete
          v-model="form.clientId"
          :items="clientList"
          item-text="name"
          item-value="id"
          outlined
          dense
          label="Clientes"
          class="mt-5"
        ></v-autocomplete>
        <v-simple-table v-if="form.items.length">
          <thead>
            <tr>
              <th
                v-for="(header, key) in ['', 'Nome', 'Preço', 'Quantidade']"
                :key="key"
                class="text-left"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in form.items" :key="key">
              <td>
                <v-btn icon width="5" @click.stop="removeItemList(key)">
                  <v-icon x-small>mdi-close</v-icon></v-btn
                >
              </td>
              <td class="text-left">
                {{
                  productList.find((product) => product.id === item.productId)
                    .name
                }}
              </td>
              <td class="text-center">R$ {{ item.productValue }}</td>
              <td class="text-center">{{ item.productAmount }}</td>
            </tr>
          </tbody>
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
          v-if="value.idEdit"
          class="col-3 ml-3"
          outlined
          color="purple"
          dark
          @click.stop="dialogConfirm = !dialogConfirm"
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
    <v-dialog v-model="dialogConfirm" scrollable max-width="300px">
      <v-card>
        <v-card-title>Confirmar exclusão</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <p>Voce tem certeza?</p>
          <p>Isto apagará o cadastro deste pedido permanentemente.</p>
          <v-btn class="col-5" color="purple" dark @click.stop="remove(idEdit)">
            DELETAR
          </v-btn>
          <v-btn
            class="col-5 ml-3"
            color="purple"
            outlined
            @click.stop="dialogConfirm = !dialogConfirm"
          >
            CANCELAR
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import { readClients } from "@/services/crudClient.js";
import { readProducts } from "@/services/crudProduct.js";

import {
  createOrder,
  updateOrder,
  readOrderById,
  deleteOrder,
} from "@/services/crudOrder.js";

export default {
  name: "OrderModal",
  props: ["value"],
  data: () => ({
    dialog: false,
    dialogConfirm: false,
    idEdit: "",
    form: {
      clientId: "",
      items: [],
    },
    clientList: [],
    productList: [],
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

      this.productId = "";
      this.productAmount = "";
      this.productValue = "";

      this.dialog = false;

      this.$emit("alert", {
        content: "Sucesso: Item inserido!",
        isError: false,
      });
    },
    save() {
      const selectedFunction = this.idEdit ? updateOrder : createOrder;
      selectedFunction(
        {
          clientId: this.form.clientId,
          items: this.form.items,
          totalValue: this.totalValue,
        },
        this.idEdit
      ).then((resp) => {
        if (!resp.errors) this.$emit("input", false);
        this.$emit("alert", {
          content: resp.errors ? resp.errors : "Salvo com Sucesso!",
          isError: Boolean(resp.errors),
        });
      });
    },
    remove(idEdit) {
      deleteOrder(idEdit).then((resp) => {
        if (!resp.errors) this.$emit("input", false);
        this.$emit("alert", {
          content: resp.errors ? resp.errors : "Salvo com Sucesso!",
          isError: Boolean(resp.errors),
        });
      });
    },
    removeItemList(key) {
      this.form.items.splice(key, 1);
    },
    async readById(idEdit) {
      readOrderById(idEdit).then((resp) => {
        this.form = {
          clientId: resp ? resp.client.id : "",
          items: resp ? resp.items : [],
        };
      });
    },
  },
  watch: {
    value(value) {
      this.idEdit = value.idEdit;
      if (!value) {
        this.productId = "";
        this.productAmount = "";
        this.productValue = "";
        this.form = {
          clientId: "",
          items: [],
        };
      }
      if (value.idEdit) this.readById(this.idEdit);
    },
  },
  mounted() {
    const self = this;
    window.addEventListener("keyup", function (ev) {
      if (ev.key === "Escape") self.$emit("input", false);
    });
  },

  async created() {
    this.clientList = await readClients();
    this.productList = await readProducts();
  },
};
</script>