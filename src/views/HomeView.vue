<template>
  <div class="home">
    <header class="home-header">
      <h1>Bienvenido al Sistema de Citas Médicas</h1>
      <p>Gestiona tus pacientes, doctores y citas médicas de manera rápida y eficiente.</p>
    </header>
    <div class="home-actions">
      <router-link to="/pacientes" class="btn">Gestionar Pacientes</router-link>
      <router-link to="/doctores" class="btn">Gestionar Doctores</router-link>
      <router-link to="/citas" class="btn">Gestionar Citas</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura completa de la pantalla */
  text-align: center;
  font-family: Arial, sans-serif;
}

.home-header {
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5em;
  color: #333;
}

p {
  font-size: 1.2em;
  color: #666;
}

.home-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
  color: white;
}
</style>