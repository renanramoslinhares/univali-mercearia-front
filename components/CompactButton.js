Vue.component("CompactButton", {
  data: () => ({}),
  props: ["text", "icon", "size", "outlined", "color"],
  template: `<button :class="computedClass">
    <span :data-feather="icon"></span> {{text}}
  </button>`,
  computed: {
    computedClass() {
      return `btn ${this.size ? "btn-" + this.size : ""} btn${
        this.outlined ? "-outline" : ""
      }${this.color ? "-" + this.color : "-secondary"}`;
    },
  },
});
