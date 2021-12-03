<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5>Produk</h3>

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

            <v-data-table :headers="headers" :items="produks" :search="search">
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
                    <span class="headline">{{ formTitle }} Produk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.name"
                            label="Nama Barang"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.harga"
                            label="Harga"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.berat"
                            label="Berat"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.gambar"
                            label="URL Gambar"
                            required
                        >
                        </v-text-field>
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
                <v-card-text>Anda yakin ingin menghapus Produk ini?</v-card-text>
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
                    text: "Nama Produk",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                { text: "Harga", value: "harga" },
                { text: "Berat (gr)", value: "berat" },
                { text: "Gambar", value: "gambar"},
                { text: "Actions", value: "actions"},
            ],
            produk: new FormData,
            produks: [],
            form: {
                name: null,
                harga: null,
                berat: null,
                gambar: null,
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
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.produks = response.data.data;
            })
        },
        //Simpan data Course
        save(){
            this.produk.append('name', this.form.name);
            this.produk.append('harga', this.form.harga);
            this.produk.append('berat', this.form.berat);
            this.produk.append('gambar', this.form.gambar);

            var url = this.$api + '/produk'
            this.load = true;
            this.$http.post(url, this.produk, {
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
                harga: this.form.harga,
                berat: this.form.berat,
                gambar: this.form.gambar
            };
            var url = this.$api + '/produk/' + this.editId;
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
            var url = this.$api + '/produk/' + this.deleteId;
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
            this.form.harga = item.harga;
            this.form.berat = item.berat;
            this.form.gambar = item.gambar;
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
                harga: null,
                berat: null,
                gambar: null
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