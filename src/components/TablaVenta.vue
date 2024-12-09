<template>
  <div>
    <h1>Reporte de ventas</h1>
    <p-data-table 
      :value="ventas" 
      :paginator="true" 
      :rows="6" 
      striped-rows 
      :show-first-last-buttons="true" 
      :rows-per-page-options="[]" <!-- Evitar que aparezca el combo box -->
    >
      <p-column field="id_venta" header="ID" style="width: 50px"></p-column>
      <p-column field="fecha_venta" header="Fecha"></p-column>
      <p-column field="total" header="Total"></p-column>
    </p-data-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const ventas = ref([]);

    // Función para obtener las ventas desde la API
    const obtenerVentas = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/ventas/getVentas');
        // Actualizar el estado de ventas con los datos recibidos
        ventas.value = response.data.ventas;
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    // Llamar la función para obtener ventas cuando el componente se monte
    onMounted(() => {
      obtenerVentas();
    });

    return { ventas };
  },
};
</script>

<style>
.p-badge-success {
  background-color: #28a745; /* Verde PrimeVue */
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
}
</style>
