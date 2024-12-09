<template>
  <div class="datatable-responsive">
    <!-- Botón para agregar una nueva venta -->
    <div class="button-container">
      <Button
        label="Nueva Venta"
        icon="pi pi-plus"
        class="p-button-success"
        @click="handleNewSale"
      />
    </div>

    <!-- Tabla de datos -->
    <DataTable
      :value="sales"
      :paginator="true"
      :rows="5"
      responsiveLayout="scroll"
      class="p-mt-4"
    >
      <!-- Columnas de la tabla -->
      <Column field="saleType" header="Tipo de venta" style="width: 15%"></Column>
      <Column field="date" header="Fecha" style="width: 20%"></Column>
      <Column field="quantity" header="Cantidad" style="width: 15%"></Column>
      <Column field="total" header="Total" style="width: 15%" :body="formatTotal"></Column>
      <Column field="observations" header="Observaciones" style="width: 30%"></Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

export default {
  name: "SalesReportTable",
  components: { DataTable, Column, Button },
  setup() {
    // Datos iniciales de las ventas
    const sales = ref([
      { saleType: "Efectivo", date: "22/11/2024", quantity: 50, total: 50.0, observations: "Venta rápida" },
      { saleType: "Unidad", date: "21/11/2024", quantity: 15, total: 150.0, observations: "" },
      { saleType: "Unidad", date: "20/11/2024", quantity: 20, total: 200.0, observations: "Sin problemas" },
      { saleType: "Efectivo", date: "19/11/2024", quantity: 100, total: 100.0, observations: "Cliente frecuente" },
      { saleType: "Peso", date: "18/11/2024", quantity: "4kg", total: 10.0, observations: "Descuento aplicado" },
      { saleType: "Unidad", date: "17/11/2024", quantity: 30, total: 300.0, observations: "Compra mayorista" },
    ]);

    // Formatear el total con un estilo visual
    const formatTotal = (rowData) => {
      return `<span class="p-tag p-tag-success">$${rowData.total.toFixed(2)}</span>`;
    };

    // Manejar clic en el botón "Nueva Venta"
    const handleNewSale = () => {
      // Aquí puedes abrir un formulario modal para agregar una nueva venta o realizar otra acción
      console.log("Nueva venta agregada (simulación).");
      sales.value.push({
        saleType: "Efectivo",
        date: new Date().toLocaleDateString(),
        quantity: Math.floor(Math.random() * 50),
        total: Math.floor(Math.random() * 500) + 100,
        observations: "Nueva venta desde el botón.",
      });
    };

    return { sales, formatTotal, handleNewSale };
  },
};
</script>

<style>
.datatable-responsive {
  margin: 20px;
}

/* Botón centrado al inicio */
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

/* Estilo para el total en formato de etiqueta */
.p-tag-success {
  background-color: #28a745 !important;
  color: white !important;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
