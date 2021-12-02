<template>
    <main>
        <v-toolbar class="yellow lighten-4">
            <h3>SUUPAMAKETO</h3>
        </v-toolbar>
        <v-img src="https://images2.alphacoders.com/108/thumb-1920-1081105.jpg" dark aspect-ratio="2.1" ></v-img>
        <v-container fluid fill-height class="posisiCont">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm4 elevation-6>
                    <v-toolbar class="orange darken-3">
                        <v-toolbar-title class="Black--text">
                            <h1>Register</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
                                    <v-text-field label="No Telp" v-model="noTelp" :rules="noTelpRules" required></v-text-field>
                                    <v-text-field label="Alamat" v-model="alamat" :rules="alamatRules" required></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required>
                                    </v-text-field>
                                    <v-layout justify-center>
                                        <v-btn  class="mr-2" @click="submit" :class="{ 'green darken-1 white--text' :valid, disabled: !valid }">Register</v-btn>
                                    </v-layout>
                                </v-form>
                                <h5 class="posisi">Sudah punya akun?</h5>
                                <router-link to="Login">Click Here</router-link>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dongle&family=M+PLUS+2:wght@500&display=swap');
    .grey--text{
        font-family: 'M PLUS 2', sans-serif;
    }

    .posisiCont{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .posisi{
        margin-top: 20px;
    }
</style>

<script>
export default {
    name: "Register",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail tidak boleh kosong',
            ],
            name: '',
            nameRules: [
                (v) => !!v || 'Nama tidak boleh kosong',
            ],
            noTelp: '',
            noTelpRules: [
                (v) => !!v || 'No Telepon tidak boleh kosong',
            ],
            alamat: '',
            alamatRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
        };
    },

    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;
                this.$http.post(this.$api + '/register', {
                    name: this.name,
                    noTelp: this.noTelp,
                    alamat: this.alamat,
                    email: this.email,
                    password: this.password,
                    userType: 'user',
                    verify: 0,
                }).then(response => {
                    this.error_message = response.data.message + "Please Verify Account";
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'Login',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                })
            }
        },
        clear() {
            this.$refs.form.reset() //clear form login
        }
    },
};
</script>