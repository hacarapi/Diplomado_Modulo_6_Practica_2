<template>
  <div>
    <h3>Registrar Paciente</h3>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="form.nombre"
          :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre"
        />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="edad">Edad:</label>
        <input
          type="text"
          id="edad"
          v-model="form.edad"
          :class="{ 'is-invalid': errors.edad }"
          placeholder="Ingrese edad"
        />
        <div v-if="errors.edad" class="invalid-feedback">{{ errors.edad }}</div>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          v-model="form.telefono"
          :class="{ 'is-invalid': errors.telefono }"
          placeholder="Ingrese el teléfono"
        />
        <div v-if="errors.telefono" class="invalid-feedback">{{ errors.telefono }}</div>
      </div>

      <div class="form-group">
        <label for="address">Dirección:</label>
        <textarea
          id="address"
          v-model="form.direccion"
          :class="{ 'is-invalid': errors.direccion }"
          placeholder="Ingrese la dirección"
        ></textarea>
        <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'RegisterClient',
  data() {
    return {
      form: {
        nombre: '',
        edad: '',
        telefono: '',
        direccion: '',
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      // Validación del nombre
      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es requerido.';
      }

      // Validación de la edad
      if (!this.form.edad) {
        this.errors.edad = 'La edad es requerida.';
      } else if (!/^\d+$/.test(this.form.edad)) {
        this.errors.edad = 'La edad debe ser un número entero.';
      } else if (this.form.edad < 0 || this.form.edad > 120) {
        this.errors.edad = 'La edad debe estar entre 0 y 120 años.';
      }

      // Validación del teléfono
      if (!this.form.telefono) {
        this.errors.telefono = 'El teléfono es obligatorio.';
      } else if (
        !/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(
          this.form.telefono
        )
      ) {
        this.errors.telefono = 'El teléfono no es válido.';
      }

      // Validación de la dirección
      if (!this.form.direccion) {
        this.errors.direccion = 'La dirección es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          nombre: '',
          edad: '',
          telefono: '',
          direccion: '',
        };
      }
    },
    save() {
      const vm = this;
      this.axios
        .post(this.baseUrl + '/pacientes', this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    },
  },
};
</script>

<style scoped></style>
