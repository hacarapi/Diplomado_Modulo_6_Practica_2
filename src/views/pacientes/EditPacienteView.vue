<template>
  <div>
    <h1>Editar Paciente</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="edad">Edad:</label>
        <input type="number" id="edad" v-model="form.edad" :class="{ 'is-invalid': errors.edad }"
          placeholder="Ingrese la edad" />
        <div v-if="errors.edad" class="invalid-feedback">{{ errors.edad }}</div>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" v-model="form.telefono" :class="{ 'is-invalid': errors.telefono }"
          placeholder="Ingrese el teléfono" />
        <div v-if="errors.telefono" class="invalid-feedback">{{ errors.telefono }}</div>
      </div>

      <div class="form-group">
        <label for="address">Dirección:</label>
        <textarea id="address" v-model="form.direccion" :class="{ 'is-invalid': errors.direccion }"
          placeholder="Ingrese la dirección"></textarea>
        <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'EditClient',
  data() {
    return {
      errors: {}
    };
  },
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.item.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }

      if (!this.item.edad) {
        this.errors.edad = 'La edad es obligatoria.';
      } else if (!/^\d+$/.test(this.item.edad) || this.item.edad <= 0) {
        this.errors.edad = 'La edad debe ser un número positivo.';
      }

      if (!this.item.telefono) {
        this.errors.telefono = 'El teléfono es obligatorio.';
      } else if (
        !/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.item.telefono)
      ) {
        this.errors.telefono = 'El teléfono no es válido.';
      }

      if (!this.item.direccion) {
        this.errors.direccion = 'La dirección es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
      }
    },
    save() {
      const vm = this;
      this.axios
        .patch(this.baseUrl + '/pacientes/' + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    },
    form() {
      return Object.assign({}, this.item);
    }
  }
};
</script>

<style scoped></style>
