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
            {{ value.data ? "Editar Cliente" : "Novo Cliente" }}
          </v-toolbar-title>
        </v-toolbar>
      </div>
      <v-card-text>
        <v-switch
          v-model="form.isActive"
          :label="form.isActive ? 'ATIVO' : 'INATIVO'"
        ></v-switch>
        <v-text-field label="Nome" outlined v-model="form.name"></v-text-field>
        <v-text-field
          label="Email"
          type="email"
          outlined
          v-model="form.email"
        ></v-text-field>
        <v-text-field
          label="CPF"
          type="text"
          outlined
          v-model="form.cpf"
          v-mask="'###.###.###-##'"
        ></v-text-field>
        <v-btn class="col-3" color="purple" dark @click.stop="save()">
          Salvar
        </v-btn>

        <v-btn
          v-if="idEdit"
          class="col-3 ml-3"
          outlined
          color="purple"
          @click.stop="dialog = !dialog"
        >
          Excluir
        </v-btn>
      </v-card-text>

      <div style="flex: 1 1 auto"></div>
    </v-card>

    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Confirmar exclusão</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <p>Voce tem certeza?</p>
          <p>Isto apagará o cadastro deste cliente permanentemente.</p>
          <v-btn class="col-5" color="purple" dark @click.stop="remove(idEdit)">
            DELETAR
          </v-btn>
          <v-btn
            class="col-5 ml-3"
            color="purple"
            outlined
            @click.stop="dialog = !dialog"
          >
            CANCELAR
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import {
  createClient,
  updateClient,
  deleteClient,
} from "@/services/crudClient.js";

export default {
  name: "ProductModal",
  props: ["value"],
  data: () => ({
    dialog: false,
    idEdit: "",
    form: {
      isActive: true,
      name: "",
      email: "",
      cpf: "",
    },
  }),
  methods: {
    save() {
      const selectedFunction = this.idEdit ? updateClient : createClient;
      selectedFunction(this.form, this.idEdit).then((resp) => {
        if (!resp.errors) this.$emit("input", false);
        this.$emit("alert", {
          content: resp.errors ? resp.errors : "Salvo com Sucesso!",
          isError: Boolean(resp.errors),
        });
      });
    },
    async remove(idEdit) {
      await deleteClient(idEdit)
        .then(() => {
          this.$emit("alert", {
            content: "Removido com sucesso!",
            isError: false,
          });
          this.$emit("input", false);
        })
        .catch(() => {
          this.$emit("alert", {
            content: "Erro!",
            isError: true,
          });
        });
      this.dialog = false;
    },
  },
  watch: {
    value(value) {
      this.idEdit = value.data ? value.data.id : "";
      this.form = {
        name: value.data ? value.data.name : "",
        email: value.data ? value.data.email : "",
        cpf: value.data ? value.data.cpf : "",
        isActive: value.data ? value.data.isActive : true,
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