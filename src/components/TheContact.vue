<script setup>
import emailjs from '@emailjs/browser'
import { useTemplateRef, reactive, ref } from 'vue'

const form = useTemplateRef('form')
const formData = reactive({ name: '', forename: '', email: '', message: '' })
const isValid = reactive({ name: false, forename: false, email: false, message: false })
const errors = reactive({})
const isDisabled = ref(true)
let confirmation = ref('')

const emits = defineEmits(['textAreaOnfocus'])
let textAreaFocus = ref(false)

function emitFocus() {
  textAreaFocus.value = !textAreaFocus.value
  emits('textAreaOnfocus', textAreaFocus.value)
}

// const forename = useTemplateRef('forename')
// const name = useTemplateRef('name')
// const email = useTemplateRef('email')
// const message = useTemplateRef('message')
// const submit = useTemplateRef('submit')

// function goToNextField(index) {

//   const inputs = ref([name, forename, email, message, submit])
//   const newIndex = index + 1
//   if (index === 0) {
//     console.log('ok')
//     onMounted(() => {
//       forename.value.focus()
//     })
//   }
// }

function validateField(field) {
  const textRegex = /^[\p{L}\s'-]+$/u
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const messageRegex = /^[\w \s \W]{15,}$/

  if (field === 'name') {
    if (formData.name === '') {
      errors.name = 'obligatoire'
      isValid.name = false
    } else if (!textRegex.test(formData.name) === true) {
      errors.name = 'invalide'
      isValid.name = false
    } else {
      errors.name = ''
      isValid.name = true
    }
  }
  if (field === 'forename') {
    if (formData.forename === '') {
      errors.forename = 'obligatoire'
      isValid.forename = false
    } else if (!textRegex.test(formData.forename) === true) {
      errors.forename = 'invalide'
      isValid.forename = false
    } else {
      errors.forename = ''
      isValid.forename = true
    }
  }
  if (field === 'email') {
    if (formData.email === '') {
      errors.email = 'obligatoire'
      isValid.email = false
    } else if (!emailRegex.test(formData.email) === true) {
      errors.email = 'invalide'
      isValid.email = false
    } else {
      errors.email = ''
      isValid.email = true
    }
  }
  if (field === 'message') {
    if (formData.message === '') {
      errors.message = 'obligatoire'
      isValid.message = false
    } else if (!messageRegex.test(formData.message) === true) {
      errors.message = 'invalide'
      isValid.message = false
    } else {
      errors.message = ''
      isValid.message = true
    }
  }
  checkForm()
}
function checkForm() {
  let values = Object.values(isValid)
  let count = 0
  for (let value of values) {
    value ? (count += 1) : (count -= 1)
  }
  if (count === 4) {
    isDisabled.value = false
  } else {
    isDisabled.value = true
  }
}
function sendEmail() {
  emailjs
    .sendForm('service_vognd8h', 'contact_aurel_porte_form', form.value, {
      publicKey: 'gd3ULxYiCNZW_a_VM'
    })
    .then(
      () => {
        form.value.reset()
        confirmation.value = 'Merci pour votre message !'
        console.log('SUCCESS!')
      },
      (error) => {
        console.log('FAILED...', error.text)
        confirmation.value =
          "Le serveur a rencontré un problème lors de l'envoi, veuillez réessayer"
      }
    )
}
</script>

<template>
  <form ref="form" @submit.prevent="sendEmail">
    <h3 class="contact__title">M'écrire</h3>
    <div class="form-item">
      <label class="form-item__label" for="user_name"
        >Nom<span class="error" v-if="errors.name">{{ errors.name }}</span></label
      >
      <input
        class="form-item__input"
        type="text"
        name="user_name"
        id="user_name"
        autocomplete="name"
        v-model="formData.name"
        @blur="validateField('name')"
      />
    </div>

    <div class="form-item">
      <label class="form-item__label" for="user_forename"
        >Prénom<span class="error" v-if="errors.forename">{{ errors.forename }}</span></label
      >
      <input
        class="form-item__input"
        type="text"
        name="user_forename"
        id="user_forename"
        autocomplete="given-name"
        v-model="formData.forename"
        @blur="validateField('forename')"
      />
    </div>

    <div class="form-item">
      <label class="form-item__label" for="user_email"
        >Adresse mél<span class="error" v-if="errors.email">{{ errors.email }}</span></label
      >
      <input
        class="form-item__input"
        type="email"
        name="user_email"
        id="user_email"
        autocomplete="email"
        v-model="formData.email"
        @blur="validateField('email')"
      />
    </div>

    <div class="form-item">
      <label class="form-item__label" for="message"
        >Message<span class="error" v-if="errors.message">{{ errors.message }}</span></label
      >
      <textarea
        class="form-item__input"
        name="message"
        id="message"
        v-model="formData.message"
        @focus="emitFocus"
        @focusout="emitFocus"
        @blur="validateField('message')"
      ></textarea>
    </div>

    <input
      type="submit"
      class="form-item__button"
      value="Envoyer"
      :disabled="isDisabled"
      @keydown.enter="goToNextField(4)"
    />
    <p class="confirmation">{{ confirmation }}</p>
  </form>
</template>

<style scoped>
input[type='submit'] {
  cursor: pointer;
  font-family: 'Exo 2', serif;
  font-size: 1rem;
}
input[type='submit']:disabled {
  cursor: not-allowed;
}
.form-item {
  display: grid;
  grid-template-rows: 1.25rem 1.25rem;
  padding-bottom: 5px;
  border-bottom: 1px solid grey;

  .form-item__label {
    display: flex;
    justify-content: space-between;
  }
  .form-item__input {
    border: none;
  }
  &:has(textarea) {
    transition: all 300ms ease;
  }
  &:has(textarea:focus) {
    display: grid;
    grid-template-rows: 1.25rem 1fr;
    transition: all 300ms ease;
  }
}
.form-item__button {
  background-color: white;
  border: 3px solid black;
  height: 30px;
  width: 100%;
  &:disabled {
    border-color: grey;
  }
}
form {
  flex: 0 1 auto;
  display: grid;
  grid-template-rows: 1.5rem repeat(3, calc(2.5rem + 6px)) calc(2.5rem + 6px) 2rem;
  gap: 10px;
  transition: all 300ms ease;
}
form:has(textarea:focus) {
  flex: 1 1 auto;
  grid-template-rows: 1.5rem repeat(3, calc(2.5rem + 6px)) 1fr 2rem;
  transition: all 300ms ease;
}
</style>
