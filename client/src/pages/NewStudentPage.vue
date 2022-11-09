<template>
    <div>
        <v-alert
            dense
            text
            type="success"
            v-if="showCreatedMessage"
        >
           {{apiResponse}}
        </v-alert>

         <v-alert
            dense
            text
            type="error"
            v-if="showErrorMessage"
        >
           {{apiResponse}}
        </v-alert>

        <h1>Cadastrar aluno</h1>
        
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nome"
                required
            ></v-text-field>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="ra"
                :rules="raRules"
                label="RA"
                required
            ></v-text-field>

            <v-text-field
                v-model="cpf"
                :rules="cpfRules"
                label="CPF"
                required
            ></v-text-field>

            <v-btn
                :disabled="!isValidForm"
                color="primary"
                class="mr-4"
                @click="save"
            >
                Salvar
            </v-btn>

            <v-btn
                color="error"
                @click="redirect"
            >
                Cancelar
            </v-btn>
        </v-form>
    </div>
    
    
</template>

<script>
import { ENV_URL } from '../env'
import axios from 'axios';

  export default {
    data: () => ({
      valid: true,
      apiResponse: '',
      showCreatedMessage: false,
      showErrorMessage: false,
      name: '',
      nameRules: [
        v => !!v || 'O campo Nome é obrigatório',
        v => (v && v.length >= 2) || 'O campo Nome precisa ter mais de 10 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'O campo E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'O campo E-mail precisa ser válido',
      ],
      cpf: '',
      cpfRules: [
        v => !!v || 'O campo CPF é obrigatório',
        v => (v && v.length == 11) || 'O campo CPF precisa ter 11 caracteres',
      ],
      ra:'',
      raRules: [
        v => !!v || 'O campo RA é obrigatório',
        v => (v && v.length == 9) || 'O campo RA precisa ter 9 caracteres',
      ]
    }),

    computed:{
        isValidForm(){
           return (this.name && this.name.length >= 2) &&
           /.+@.+\..+/.test(this.email) &&
           this.cpf.length == 11 &&
           this.ra.length == 9
        }
    },

    methods: {
        
      save(){
        this.validate()
        axios.post(ENV_URL+'/api/students', {
            name: this.name,
            email: this.email,
            ra: this.ra,
            cpf: this.cpf
        }).then(response => {
            
            this.apiResponse = response.data.message
            this.showCreatedMessage = true

            setTimeout(() => {
                this.showCreatedMessage = false
                this.apiResponse = ''
            }, 5000)

            this.reset()

        }).catch(e => {
            this.apiResponse = e.response.data.errors
            this.showErrorMessage = true 

            setTimeout(() => {
                this.showErrorMessage = false
                this.apiResponse = ''
            }, 5000)
        })
      }, 

      validate () {
        this.$refs.form.validate()
      },

      reset () {
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      },

      redirect(){
        this.$router.push('/') 
      }
    },
  }
</script>