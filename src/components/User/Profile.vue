<template>
    <v-container>
        <v-toolbar class="yellow lighten-3" :src= imageBg>
            <h2>Profile</h2>    
            <v-spacer></v-spacer>
            <v-btn class="mr-2 blue darken-1 white--text" @click="editHandler">{{ btnEdit }}</v-btn>
        </v-toolbar>
        <br>
        <v-card>
            <v-card-text class="pt-4">
                <v-form v-model="valid" ref="form">
                    <br>
                    <v-text-field :disabled="disabled === 1"  dense label="Name" v-model="form.name" :rules="nameRules" required ></v-text-field>
                    <v-text-field :disabled="disabled === 1" dense label="No Telp" v-model="form.noTelp" :rules="noTelpRules" required></v-text-field>
                    <v-text-field :disabled="disabled === 1" dense label="Alamat" v-model="form.alamat" :rules="alamatRules" required></v-text-field>
                    <br>
                    <v-layout justify-center>
                        <v-btn :disabled="disabled === 1" class="mr-2" @click="updateProfile" :class="{ 'green darken-1 white--text' :valid, disabled: !valid }">SAVE</v-btn>
                        <v-btn :disabled="disabled === 1" class="mr-2" @click="clear" :class="{ 'white black--text' :valid, disabled: !valid }">Clear</v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-container>
    
</template>

<script>
import bg from "../../assets/supamaketo.png"

export default {
    data() {
        return{
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            user: '',
            btnEdit: 'EDIT',
            disabled: 1,
            valid: false,
            idEdit: '',
            imageBg: bg,
            form: {
                name:'',
                noTelp:'',
                alamat: '',
            },
            nameRules: [
                (v) => !!v || 'Nama tidak boleh kosong',
            ],
            noTelpRules: [
                (v) => !!v || 'No Telepon tidak boleh kosong',
            ],
            alamatRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
        }
    },

    methods: {
        getUser(){
            var url = this.$api + '/user/' + this.idEdit;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.user = response.data.data;
                this.form.name = this.user.name;
                this.form.noTelp = this.user.noTelp;
                this.form.alamat = this.user.alamat;
            })
        },

        editHandler(){
            this.disabled = (this.disabled + 1) % 2
            if(this.disabled === 1){
                this.btnEdit = 'Edit'
            }else{
                this.btnEdit = 'Close'
            }
        },

        clear(){
            this.form.name = this.user.name;
            this.form.noTelp = this.user.noTelp;
            this.form.alamat = this.user.alamat;
        },

        updateProfile() {
            let newData = {
                name: this.form.name,
                noTelp: this.form.noTelp,
                alamat: this.form.alamat,
            };
            var url = this.$api + '/user/' + this.idEdit;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.disabled = (this.disabled + 1) % 2;
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
    },

    beforeMount(){
        this.idEdit = localStorage.getItem('id');
        this.getUser();
    },
};
</script>
