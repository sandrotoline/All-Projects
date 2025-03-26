<template>
  <form @submit.prevent="submit">
    <div class="container">
      <label for="name">Name:</label>
      <input 
        type="text" 
        name="name" 
        v-model="form.name" 
        placeholder="Enter your name"
        @blur="validateName"
      />
      <span class="error" v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div class="container">
      <label for="email">E-mail:</label>
      <input 
        type="text" 
        name="email" 
        v-model="form.email" 
        placeholder="Enter your email"
        @blur="validateEmail"
      />
      <span class="error" v-if="errors.email">{{ errors.email }}</span>
    </div>

    <div class="container">
      <label for="country">Country:</label>
      <select 
        name="country" 
        id="country" 
        v-model="form.country"
        @blur="validateCountry"
      >
        <option value="">Select country</option>
        <option value="USA">USA</option>
        <option value="ARG">Argentina</option>
        <option value="BRA">Brazil</option>
      </select>
      <span class="error" v-if="errors.country">{{ errors.country }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  name: '',
  email: '',
  country: ''
});

const errors = reactive({
  name: null,
  email: null,
  country: null
});

const validateName = () => {
  if (!form.name) {
    errors.name = 'Name is required';
  } else if (form.name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else {
    errors.name = null;
  }
};

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'Invalid email format';
  } else {
    errors.email = null;
  }
};

const validateCountry = () => {
  if (!form.country) {
    errors.country = 'Country is required';
  } else {
    errors.country = null;
  }
};

const submit = () => {
  validateName();
  validateEmail();
  validateCountry();

  // Se não houver erros, o formulário é enviado
  if (!errors.name && !errors.email && !errors.country) {
    console.log('Form submitted:', form);
    alert('Form submitted successfully!');
    // Limpar os campos após o envio (opcional)
    Object.assign(form, { name: '', email: '', country: '' });
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 10px;
}

.error {
  color: red;
  font-size: 14px;
}
</style>