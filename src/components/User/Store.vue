<template>
    
    <v-container>
        <v-row>
            <v-col >
                <v-toolbar>
                    <h2>Products</h2>    
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6" md="4" v-for="produk in produks" :key="produk.name">
                <v-card outlined>
                    <v-img :src="produk.gambar" height="200px"/>
                    <v-card-title>{{ produk.name }}</v-card-title>
                    <v-card-subtitle>Rp.{{ produk.harga }}/{{ produk.berat }}gr</v-card-subtitle>
                    <v-card-actions>
                        <v-btn @click="addToCart" color="success" outlined>
                            <v-icon small left> mdi-plus</v-icon>
                            BUY
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
export default {
    name: 'store',
    data() {
        return {
            produk: '',
            produks: [],
        }
        
    },

    methods: {
        readProduk(){
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.produks = response.data.data
            })
        },
    },

    beforeMount(){
        this.readProduk();
    },
};
</script>
