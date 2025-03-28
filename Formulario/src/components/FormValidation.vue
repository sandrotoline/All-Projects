<!-- src/components/Formulario.vue -->
<template>
    <form @submit.prevent="submitForm" class="form">
      <!-- Nome -->
      <div class="form-group">
        <label for="name">Nome:</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name"
          @blur="validateField('name')"
          placeholder="Digite seu nome"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>
  
      <!-- Email -->
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email"
          @blur="validateField('email')"
          placeholder="Digite seu e-mail"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>
  
      <!-- País -->
      <div class="form-group">
        <label for="country">País:</label>
        <select 
          id="country" 
          v-model="form.country" 
          @blur="validateField('country')"
        >
          <option value="">Selecione um país</option>
          <option value="USA">USA</option>
          <option value="ARG">Argentina</option>
          <option value="BRA">Brasil</option>
        </select>
        <span v-if="errors.country" class="error">{{ errors.country }}</span>
      </div>
  
      <!-- Botão de envio -->
      <button 
        type="submit" 
        :disabled="!isFormValid"
      >
        Enviar
      </button>
    </form>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue';
  
  const form = reactive({
    name: '',
    email: '',
    country: '',
  });
  
  const errors = reactive({
    name: null,
    email: null,
    country: null,
  });
  
  // 🔎 Validação de campos individuais
  const validateField = (field) => {
    switch (field) {
      case 'name':
        errors.name = form.name ? null : 'O nome é obrigatório.';
        break;
      case 'email':
        errors.email = form.email.match(/^[^@]+@[^@]+\.[^@]+$/)
          ? null
          : 'Insira um e-mail válido.';
        break;
      case 'country':
        errors.country = form.country ? null : 'Selecione um país.';
        break;
    }
  };
  
  // 🔍 Computed para verificar se o formulário é válido
  const isFormValid = computed(() => {
    return (
      form.name &&
      form.email.match(/^[^@]+@[^@]+\.[^@]+$/) &&
      form.country
    );
  });
  
  // 📤 Envio dos dados para a API
  const submitForm = async () => {
    validateField('name');
    validateField('email');
    validateField('country');
  
    if (!isFormValid.value) {
      alert('Preencha o formulário corretamente antes de enviar.');
      return;
    }
  
    try {
      const response = await fetch('https://sua-api.com/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao enviar formulário: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Formulário enviado com sucesso:', data);
      alert('Formulário enviado com sucesso!');
  
      // ✅ Limpar o formulário após o envio bem-sucedido
      form.name = '';
      form.email = '';
      form.country = '';
    } catch (error) {
      console.error('Erro ao enviar formulário:', error.message);
      alert(`Erro ao enviar formulário: ${error.message}`);
    }
  };
  </script>
  
  <style scoped>
  .form {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .error {
    color: red;
    font-size: 14px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:enabled {
    background-color: #45a049;
  }
  </style>
  