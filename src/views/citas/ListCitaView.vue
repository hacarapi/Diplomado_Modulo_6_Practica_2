<template>
    <div class="container">
        <Modal v-model:modelValue="showModalNuevo">
            <NewCitaView @on-register="onRegister()" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <EditCitaView @on-update="onUpdate()" :item="itemToEdit" />
        </Modal>
        <h1>Lista de Citas Médicas</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nueva Cita</button>
        <div style="margin: 20px 0;">
            <h3>Filtros:</h3>
            <form @submit.prevent="filtrar()">
                <label for="fecha">Fecha:</label>
                <input type="date" id="fecha" v-model="filter.fecha" placeholder="Ingrese la fecha" />

                <label for="doctor">Doctor:</label>
                <select id="doctor" v-model="filter.doctorId">
                    <option value="">Todos</option>
                    <option :value="doctor.id" v-for="(doctor, index) in doctorList" :key="`doctor-${index}`">
                        {{ doctor.nombre }}
                    </option>
                </select>
                <button type="submit" class="btn btn-secondary">Filtrar</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Doctor</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.fecha }}</td>
                    <td>{{ item.hora }}</td>
                    <td>{{ item.paciente.nombre }}</td>
                    <td>{{ item.doctor?.nombre || "Sin asignar" }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>
                        <button @click="edit(item)" class="btn btn-dark" style="margin-right: 10px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "../../components/Modal.vue";
import NewCitaView from "./NewCitaView.vue";
import EditCitaView from "./EditCitaView.vue";

export default {
    name: "Cita",
    data() {
        return {
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            itemList: [],
            doctorList: [],
            filter: {
                fecha: "",
                doctorId: "",
            },
        };
    },
    components: {
        Modal,
        NewCitaView,
        EditCitaView,
    },
    methods: {
        getCitas(filtros = {}) {
            const queryParams = [];

            if (filtros.fecha) {
                queryParams.push(`fecha=${filtros.fecha}`);
            }
            if (filtros.doctorId) {
                queryParams.push(`doctorId=${filtros.doctorId}`);
            }

            const queryString = queryParams.length ? `&${queryParams.join("&")}` : "";

            this.axios.get(`${this.baseUrl}/citas?_expand=paciente${queryString}`)
                .then((response) => {
                    const citas = response.data;
                    this.axios.get(`${this.baseUrl}/doctores`)
                        .then((doctorResponse) => {
                            const doctores = doctorResponse.data;
                            this.itemList = citas.map((cita) => ({
                                ...cita,
                                doctor: doctores.find((doctor) => doctor.id === cita.doctorId) || { nombre: "Sin asignar" },
                            }));
                        });
                })
                .catch((error) => {
                    console.error("Error al obtener citas:", error);
                });
        },
        getDoctores() {
            this.axios
                .get(`${this.baseUrl}/doctores`)
                .then((response) => {
                    this.doctorList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        filtrar() {
            this.getCitas({
                fecha: this.filter.fecha,
                doctorId: this.filter.doctorId,
            });
        },
        edit(item) {
            this.itemToEdit = { ...item };
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Está seguro de eliminar esta cita?")) {
                this.axios
                    .delete(`${this.baseUrl}/citas/${id}`)
                    .then(() => {
                        this.getCitas();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        onRegister() {
            this.getCitas();
            this.showModalNuevo = false;
        },
        onUpdate() {
            this.getCitas();
            this.showModalEdit = false;
            this.itemToEdit = null;
        },
    },
    computed: {
        ...mapGetters(["getBaseUrl"]),
        baseUrl() {
            return this.getBaseUrl;
        },
    },
    mounted() {
        this.getCitas();
        this.getDoctores();
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #f4f4f4;
}

th,
td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    text-align: center;
}
</style>