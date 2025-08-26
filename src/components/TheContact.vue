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
const name = useTemplateRef('name')
const forename = useTemplateRef('forename')
const email = useTemplateRef('email')
const message = useTemplateRef('message')

function giveFocusAfter(index) {
  const inputs = [forename, name, email, message]

  index++
  const nextField = inputs.at(index)
  nextField.value.focus()
}

const nameRegex = /^(?!['-]+$)[\p{L}]{1,}['\-\p{L}\s]*$/u
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const messageRegex = /^[\w \s \W]{15,}$/

function checkField(field) {
  if (field === 'name') {
    if (formData.name === '' || !nameRegex.test(formData.name)) {
      isValid.name = false
    } else {
      isValid.name = true
      validateForm()
    }
  }
  if (field === 'forename') {
    if (formData.forename === '' || !nameRegex.test(formData.forename)) {
      isValid.forename = false
    } else {
      isValid.forename = true
      validateForm()
    }
  }
  if (field === 'email') {
    if (formData.email === '' || !emailRegex.test(formData.email)) {
      isValid.email = false
    } else {
      isValid.email = true
      validateForm()
    }
  }
  if (field === 'message') {
    if (formData.message === '' || !messageRegex.test(formData.message)) {
      isValid.message = false
    } else {
      isValid.message = true
      validateForm()
    }
  }
}
function showUserMistake(field) {
  if (field === 'name') {
    if (formData.name === '') {
      errors.name = 'obligatoire'
    } else if (!nameRegex.test(formData.name)) {
      errors.name = 'invalide'
    } else {
      errors.name = ''
    }
  }
  if (field === 'forename') {
    if (formData.forename === '') {
      errors.forename = 'obligatoire'
    } else if (!nameRegex.test(formData.forename)) {
      errors.forename = 'invalide'
    } else {
      errors.forename = ''
    }
  }
  if (field === 'email') {
    if (formData.email === '') {
      errors.email = 'obligatoire'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'invalide'
    } else {
      errors.email = ''
    }
  }
  if (field === 'message') {
    if (formData.message === '') {
      errors.message = 'obligatoire'
    } else if (!messageRegex.test(formData.message)) {
      errors.message = 'invalide'
    } else {
      errors.message = ''
    }
  }
}
function validateForm() {
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
        formData.forename = ''
        formData.name = ''
        formData.email = ''
        formData.message = ''
        form.value.reset()
        isValid.forename = false
        isValid.name = false
        isValid.email = false
        isValid.message = false
        validateForm()
        confirmation.value = 'Message envoyé, merci !'
        console.log('SUCCESS!')
      },
      (error) => {
        console.log('FAILED...', error.text)
        confirmation.value = "Erreur lors de l'envoi, veuillez réessayer"
      }
    )
}
</script>

<template>
  <form ref="form" @submit.prevent="sendEmail">
    <h3 class="contact__title">M'écrire</h3>
    <div class="form-item">
      <label class="form-item__label" for="user_forename"
        >Prénom<span class="error" v-if="errors.forename">{{ errors.forename }}</span></label
      >
      <input
        ref="forename"
        class="form-item__input"
        type="text"
        minlength="1"
        maxlength="40"
        pattern="[\p{L}]{1,}[\p{L}'\-\s]{0,40}"
        name="user_forename"
        id="user_forename"
        required
        aria-required="true"
        autocomplete="given-name"
        autocapitalize="words"
        v-model="formData.forename"
        @input="checkField('forename')"
        @blur="showUserMistake('forename')"
        @keyup.enter="giveFocusAfter(0)"
      />
    </div>
    <div class="form-item">
      <label class="form-item__label" for="user_name"
        >Nom<span class="error" v-if="errors.name">{{ errors.name }}</span></label
      >
      <input
        ref="name"
        class="form-item__input"
        type="text"
        name="user_name"
        id="user_name"
        required
        aria-required="true"
        minlength="1"
        maxlength="40"
        pattern="[\p{L}]{1,}[\p{L}'\-\s]{0,40}"
        autocomplete="name"
        autocapitalize="words"
        v-model="formData.name"
        @input="checkField('name')"
        @blur="showUserMistake('name')"
        @keyup.enter="giveFocusAfter(1)"
      />
    </div>
    <div class="form-item">
      <label class="form-item__label" for="user_email"
        >Adresse mél<span class="error" v-if="errors.email">{{ errors.email }}</span></label
      >
      <input
        ref="email"
        class="form-item__input"
        type="email"
        name="user_email"
        id="user_email"
        required
        aria-required="true"
        autocomplete="email"
        v-model="formData.email"
        @input="checkField('email')"
        @blur="showUserMistake('email')"
        @keyup.enter="giveFocusAfter(2)"
      />
    </div>

    <div class="form-item">
      <label class="form-item__label" for="message"
        >Message<span class="error" v-if="errors.message">{{ errors.message }}</span></label
      >
      <textarea
        ref="message"
        class="form-item__input"
        name="message"
        id="message"
        required
        aria-required="true"
        minlength="15"
        v-model="formData.message"
        @focus="emitFocus"
        @focusout="emitFocus"
        @input="checkField('message')"
        @blur="showUserMistake('message')"
      ></textarea>
    </div>

    <input
      ref="submit"
      type="submit"
      class="form-item__button"
      value="Envoyer"
      :disabled="isDisabled"
    />
    <p class="confirmation">{{ confirmation }}</p>
  </form>
</template>

<style scoped>
form {
  flex: 0 1 auto;
  display: grid;
  gap: 10px;
  transition: all 300ms ease;

  &:has(textarea:focus) {
    flex: 1 1 auto;
    grid-template-rows: 1.5rem repeat(3, calc(2.5rem + 6px)) 1fr 2rem;
    transition: all 300ms ease;
  }
}
.form-item {
  --errorColor: rgb(234, 150, 26);
  --validColor: rgb(26, 234, 127);

  display: grid;
  grid-template-rows: 1.25rem 1.25rem;
  gap: 5px;

  &::after {
    content: '';
    grid-area: 1/1/3/2;
    opacity: 0;
    z-index: -5;
    transition: opacity 200ms ease;
  }
  .form-item__label {
    grid-area: 1/1/2/2;
    translate: 0 -5px;
  }
  .form-item__input {
    grid-area: 2/1/3/2;
    border: none;
    border-bottom: 1px solid grey;
    background: transparent;
    cursor: pointer;
    font-family: 'Exo 2', serif;
    font-size: 1rem;
    color: black;

    &:user-valid {
      border-bottom: 1px solid var(--validColor);
    }
  }
  .form-item__input:focus-visible {
    border-radius: 1px;
    outline-width: 2px;
    outline-offset: 5px;
    transition: all 150ms ease;
  }
  &:has(:user-valid) {
    &::after {
      background: radial-gradient(circle 3px, var(--validColor) 2px, transparent 3px) 100% 0 / 6px
        6px;
      mask: radial-gradient(circle 40px at 100% 80%, red 0, transparent 115%);
      opacity: 1;
    }

    & .form-item__label {
      color: var(--validColor);
    }
  }

  /* use :user-invalid pseudoclass doesn't cover empty field case, .error presence does*/
  &:has(.error) {
    &::after {
      background: radial-gradient(circle 3px, var(--errorColor) 2px, transparent 3px) 100% 0 / 6px
        6px;
      mask: radial-gradient(circle 40px at 100% 20%, red 0, transparent 115%);
      opacity: 1;
    }
    & .form-item__label {
      color: var(--errorColor);

      & .error {
        margin-left: 5px;
        position: absolute;
        translate: 0;
        opacity: 1;
        transition:
          translate 200ms ease-in,
          opacity 200ms ease-in;
      }
      @starting-style {
        & .error {
          margin-left: 5px;
          position: absolute;
          translate: -50px;
          opacity: 0;
          transition:
            translate 200ms ease-in,
            opacity 200ms ease-in;
        }
      }
    }
    .form-item__input {
      border-bottom: 1px solid var(--errorColor);
    }
  }
  .form-item__input:user-invalid {
    border-bottom: 1px solid var(--errorColor);
    transition: all 150ms ease;
  }
  &:has(.form-item__input:focus-visible) {
    &::after {
      opacity: 0;
    }

    .form-item__input {
      border-bottom: 1px solid var(--saillanceColor);
      transition: all 150ms ease;
    }
  }
  &:has(textarea) {
    transition: all 300ms ease;
  }
  &:has(textarea:focus) {
    display: grid;
    grid-template-rows: 1.25rem 1fr;
    transition: all 300ms ease;
  }
  &:has(.form-item__input:focus-visible) .form-item__label {
    color: var(--saillanceColor);
  }
}
.form-item__button {
  height: 30px;
  width: 100%;
  cursor: pointer;
  font-family: 'Exo 2', serif;
  font-size: 1rem;
  line-height: 1rem;
  background-color: white;
  border: 3px solid black;

  &:disabled {
    border-color: grey;
    cursor: not-allowed;
  }
}
.confirmation {
  min-height: 2.5rem;
  font-size: 1.25rem;
  vertical-align: middle;
}
</style>
