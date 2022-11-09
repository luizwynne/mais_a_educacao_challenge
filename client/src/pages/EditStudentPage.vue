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

        <h1>Editar Aluno</h1>

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                v-model="student.name"
                :rules="nameRules"
                label="Nome"
                required
            ></v-text-field>

            <v-text-field
                v-model="student.email"
                :rules="emailRules"
                label="E-mail"
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

    data(){
        return{
            valid: true,
            apiResponse: '',
            showCreatedMessage: false,
            student: {id:'', name: '', ra:'', cpf:''},
            nameRules: [
                v => !!v || 'O campo Nome é obrigatório',
                v => (v && v.length >= 2) || 'O campo Nome precisa ter mais de 10 caracteres',
            ],
            emailRules: [
                v => !!v || 'O campo E-mail é obrigatório',
                v => /.+@.+\..+/.test(v) || 'O campo E-mail precisa ser válido',
            ]
        }
    },

    created(){  
        this.getStudent()
    },

    methods: {

        getStudent(){
            let uri = '/api/students/'+this.$route.params.id;
            axios.get(ENV_URL+uri).then((response) => {
                this.student = response.data
            });
        },

        save(){
            this.validate()
            let uri = '/api/students/'+this.student.id;
            axios.put(ENV_URL+uri, {
                name: this.student.name,
                email: this.student.email
            }).then(response => {

                this.apiResponse = response.data.message
                this.showCreatedMessage = true

                setTimeout(() => {
                    this.showCreatedMessage = false
                    this.apiResponse = ''
                }, 5000)

                this.reset()

            })
        },

        validate () {
            this.$refs.form.validate()
        },

        reset () {
            this.$refs.form.resetValidation()
        },

        redirect(){
            this.$router.push('/') 
        }

    },

    computed:{
        isValidForm(){
           return (this.student.name && this.student.name.length >= 2) &&
           /.+@.+\..+/.test(this.student.email)
        }
    },

}

</script>
