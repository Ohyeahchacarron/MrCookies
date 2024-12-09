<template>
    <div class="ventas-container">
      <!-- Botón inicial -->
      <Button 
        v-if="!isAddingSale" 
        label="Agregar venta" 
        class="p-button-success agregar-venta-btn" 
        @click="startSale" 
      />
  
      <!-- Formulario para agregar productos -->
      <div v-else class="form-container">
        <div class="form-header">
          <Dropdown
            v-model="selectedUnit"
            :options="units"
            optionLabel="label"
            placeholder="Tipo de unidad"
            class="dropdown"
          />
          <InputText 
            v-model="quantity" 
            placeholder="Cantidad" 
            class="input-text" 
          />
          <Dropdown
            v-model="selectedProduct"
            :options="products"
            optionLabel="label"
            placeholder="Producto"
            class="dropdown"
          />
          <Button 
            label="Agregar al carrito" 
            class="p-button-primary agregar-carrito-btn" 
            @click="addToCart"
          />
        </div>
  
        <!-- Productos en el carrito -->
        <div v-if="cart.length" class="cart-container">
          <h4 class="cart-title">Carrito</h4>
          <ul class="cart-list">
            <li v-for="(item, index) in cart" :key="index" class="cart-item">
              {{ item.product }} - {{ item.quantity }} ({{ item.unit }})
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Tabla de ventas -->
      <DataTable :value="sales" class="p-datatable-striped ventas-table">
        <Column field="id" header="ID"></Column>
        <Column field="tipoVenta" header="Tipo de venta"></Column>
        <Column field="fecha" header="Fecha"></Column>
        <Column field="cantidad" header="Cantidad"></Column>
        <Column 
          field="total" 
          header="Total" 
          body-class="p-text-bold p-text-success"
        ></Column>
        <Column field="observaciones" header="Observaciones"></Column>
      </DataTable>
  
      <!-- Botones para finalizar venta -->
      <div v-if="isAddingSale" class="actions-container">
        <Button 
          label="Cancelar" 
          class="p-button-danger cancel-btn" 
          @click="cancelSale" 
        />
        <Button 
          label="Imprimir ticket" 
          class="p-button-warning print-btn" 
          @click="printTicket" 
        />
        <Button 
          label="Finalizar venta" 
          class="p-button-success finish-btn" 
          @click="finishSale" 
        />
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        // Control del estado del formulario
        isAddingSale: false,
  
        // Opciones del formulario
        units: [
          { label: "Unidad", value: "Unidad" },
          { label: "Peso", value: "Peso" },
          { label: "Efectivo", value: "Efectivo" },
        ],
        products: [
          { label: "Producto 1", value: "Producto 1" },
          { label: "Producto 2", value: "Producto 2" },
          { label: "Producto 3", value: "Producto 3" },
        ],
  
        // Valores seleccionados
        selectedUnit: null,
        quantity: "",
        selectedProduct: null,
  
        // Lista de productos agregados al carrito
        cart: [],
  
        // Ventas registradas (para la tabla)
        sales: [],
      };
    },
    methods: {
      // Iniciar una nueva venta
      startSale() {
        this.isAddingSale = true;
      },
  
      // Cancelar la venta actual
      cancelSale() {
        this.isAddingSale = false;
        this.clearForm();
        this.cart = [];
      },
  
      // Agregar productos al carrito
      addToCart() {
        if (!this.selectedUnit || !this.quantity || !this.selectedProduct) {
          alert("Por favor, completa todos los campos antes de agregar al carrito.");
          return;
        }
  
        this.cart.push({
          unit: this.selectedUnit,
          quantity: this.quantity,
          product: this.selectedProduct,
        });
  
        // Limpiar los campos después de agregar
        this.selectedUnit = null;
        this.quantity = "";
        this.selectedProduct = null;
      },
  
      // Finalizar la venta
      finishSale() {
        if (this.cart.length === 0) {
          alert("El carrito está vacío. Agrega productos antes de finalizar la venta.");
          return;
        }
  
        const total = this.cart.reduce((acc, item) => acc + item.quantity * 10, 0); // Simulación de precios
  
        const newSale = {
          id: this.sales.length + 1,
          tipoVenta: this.cart[0].unit, // Ejemplo: Tomar el tipo de la primera unidad
          fecha: new Date().toLocaleDateString(),
          cantidad: this.cart.reduce((acc, item) => acc + parseInt(item.quantity), 0),
          total: `$${total}`,
          observaciones: "Venta finalizada correctamente",
        };
  
        this.sales.push(newSale);
  
        // Limpiar el carrito y formulario
        this.cart = [];
        this.clearForm();
        this.isAddingSale = false;
  
        alert("Venta finalizada con éxito.");
      },
  
      // Imprimir ticket (simulación)
      printTicket() {
        if (this.cart.length === 0) {
          alert("El carrito está vacío. Agrega productos antes de imprimir el ticket.");
          return;
        }
  
        alert("Ticket generado (simulación).");
      },
  
      // Limpiar los campos del formulario
      clearForm() {
        this.selectedUnit = null;
        this.quantity = "";
        this.selectedProduct = null;
      },
    },
  };
  </script>
  
  
  <style scoped>
  .ventas-container {
    margin: 20px;
    font-family: Arial, sans-serif;
  }
  
  .agregar-venta-btn {
    display: block;
    margin: 0 auto;
    width: 200px;
  }
  
  .form-container {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .dropdown, .input-text {
    flex: 1;
    margin-right: 10px;
  }
  
  .agregar-carrito-btn {
    flex-shrink: 0;
  }
  
  .cart-container {
    margin-top: 20px;
  }
  
  .cart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .cart-list {
    list-style: none;
    padding: 0;
  }
  
  .cart-item {
    padding: 8px 12px;
    border-bottom: 1px solid #ccc;
  }
  
  .ventas-table {
    margin-top: 20px;
  }
  
  .actions-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .cancel-btn, .print-btn, .finish-btn {
    margin-left: 10px;
  }
  
  .cancel-btn {
    background-color: #f44336;
  }
  
  .print-btn {
    background-color: #ff9800;
  }
  
  .finish-btn {
    background-color: #4caf50;
  }
  </style>
  