<template>
  <div>
    <h1>Editar Cita</h1>
    <form @submit.prevent="submitForm" v-if="form">

      <div class="form-group">
        <label for="paciente">Paciente:</label>
        <select id="paciente" v-model="form.pacienteId" :class="{ 'is-invalid': errors.pacienteId }" @change="setDoctors()">
          <option :value="paciente.id" v-for="(paciente, index) in pacienteList" :key="`paciente-${index}`">{{ paciente.nombre }}
          </option>
        </select>
        <div v-if="errors.pacienteId" class="invalid-feedback">{{ errors.pacienteId }}</div>
      </div>

      <div class="form-group">
        <label for="doctor">Doctor:</label>
        <select id="doctor" v-model="form.doctorId" :class="{ 'is-invalid': errors.doctorId }">
          <option :value="doctor.id" v-for="(doctor, index) in doctorList" :key="`paciente-${index}`">{{ doctor.nombre }}
          </option>
        </select>
        <div v-if="errors.doctorId" class="invalid-feedback">{{ errors.doctorId }}</div>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <select id="descripcion" v-model="form.descripcion" :class="{ 'is-invalid': errors.descripcion }">
          <option :value="descripcion" v-for="(descripcion, index) in descripcionList" :key="`descripcion-${index}`">{{ descripcion }}</option>
        </select>
        <div v-if="errors.descripcion" class="invalid-feedback">{{ errors.descripcion }}</div>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" v-model="form.fecha" :class="{ 'is-invalid': errors.fecha }"
          placeholder="Ingrese la fecha" />
        <div v-if="errors.fecha" class="invalid-feedback">{{ errors.fecha }}</div>
      </div>

      <div class="form-group">
        <label for="hora">Hora:</label>
        <input type="time" id="fecha" v-model="form.hora" :class="{ 'is-invalid': errors.hora }"
          placeholder="Ingrese la hora" />
        <div v-if="errors.hora" class="invalid-feedback">{{ errors.hora }}</div>
      </div>
      
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'CitaEdit',
  data() {
    return {
      pacienteList: [],
      doctorList: [],
      descripcionList: [
        "Vacunación",
        "Revisión cardiológica",
        "Consulta general",
        "Chequeo anual",
        "Chequeo dermatológico"
      ],
      errors: {}
    };
  },
  props:['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.pacienteId) {
        this.errors.pacienteId = 'El Paciente es obligatorio.';
      }
      
      if (!this.form.doctorId) {
        this.errors.doctorId = 'El Doctor es obligatorio.';
      }

      if (!this.form.descripcion) {
        this.errors.descripcion = 'La Descripción es obligatoria.';
      }

      if (!this.form.fecha) {
        this.errors.fecha = 'La fecha es obligatorio.';
      }

      if (!this.form.hora) {
        this.errors.hora = 'La hora es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          pacienteId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/citas/"+this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getPacienteList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/pacientes")
        .then(function (response) {
          vm.pacienteList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getDoctorList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/doctores")
        .then(function (response) {
          vm.doctorList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    setDoctores(){
      const vm = this;
            this.axios.get(this.baseUrl + "/doctores?pacienteId=" + this.form.pacienteId)
                .then(function (response) {
                    vm.doctorList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form(){
      return Object.assign({},this.item);
    }
  },
  mounted() {
    this.getPacienteList();
    this.getDoctorList();
  },
}
</script>
  
<style scoped></style>
  