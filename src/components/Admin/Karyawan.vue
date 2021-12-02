<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5>Karyawan</h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="karyawans" :search="search">
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn class="mr-2" small @click="deleteHandler(item.id)" 
                    flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Karyawan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.name"
                            label="Nama"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.noTelp"
                            label="No Telepon"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.alamat"
                            label="Alamat"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.cabang"
                            label="cabang"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.tempat_lahir"
                            label="Tempat Lahir"
                            required
                        >
                        </v-text-field>
                        <v-date-picker
                            v-model="form.tanggal_lahir"
                            :allowed-dates="allowedDates"
                            class="mt-4"
                            min="1950-01-11"
                            max="2021-12-31"
                            label="Tanggal Lahir"
                        ></v-date-picker>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Warning!</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus karyawan ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return{
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                { text: "No Telepon", value: "noTelp" },
                { text: "Alamat", value: "alamat" },
                { text: "Cabang", value: "cabang"},
                { text: "Tempat Lahir", value: "tempat_lahir"},
                { text: "Tanggal Lahir", value: "tanggal_alhir"},
                { text: "Actions", value: "actions"},
            ],
            karyawan: new FormData,
            karyawans: [],
            form: {
                name: null,
                noTelp: null,
                alamat: null,
                cabang: null,
                tempat_lahir: null,
                tanggal_lahir: null,
            },
            deleteId: '',
            editId: '',
        };
    },

    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        //Read Data Courses
        readData(){
            var url = this.$api + '/karyawan';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.karyawans = response.data.data;
            })
        },
        //Simpan data Course
        save(){
            this.karyawan.append('name', this.form.name);
            this.karyawan.append('noTelp', this.form.noTelp);
            this.karyawan.append('alamat', this.form.alamat);
            this.karyawan.append('cabang', this.form.cabang);
            this.karyawan.append('tempat_lahir', this.form.tempat_lahir);
            this.karyawan.append('tanggal_lahir', this.form.tanggal_lahir);

            var url = this.$api + '/karyawan'
            this.load = true;
            this.$http.post(url, this.karyawan, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data Course
        update() {
            let newData = {
                name: this.form.name,
                noTelp: this.form.noTelp,
                alamat: this.form.alamat,
                cabang: this.form.cabang,
                tempat_lahir: this.form.tempat_lahir,
                tanggal_lahir: this.form.tanggal_lahir
            };
            var url = this.$api + '/karyawan/' + this.editId;
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
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapud Course
        deleteData() {
            //menghapus data
            var url = this.$api + '/karyawan/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
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
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.name = item.name;
            this.form.noTelp = item.noTelp;
            this.form.alamat = item.alamat;
            this.form.cabang = item.cabang;
            this.form.tempat_lahir = item.tempat_lahir;
            this.form.tanggal_lahir = item.tanggal_lahir;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                name: null,
                noTelp: null,
                alamat: null,
                cabang: null,
                tempat_lahir: null,
                tanggal_lahir: null
            };
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
    }
};
</script>