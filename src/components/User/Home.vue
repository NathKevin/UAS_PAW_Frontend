<template>
<div>
    <v-container >
        <v-toolbar class="yellow lighten-3 " :src= imageBg elevation="10">
            <h2>Home</h2>    
        </v-toolbar>
        <br>

        <h1>Welcome {{ name }}</h1>
        <h3>Selamat datang di website Suupamaketo</h3>

        <br>

        <v-toolbar :src= imageBg elevation="10">
            <h2>Discount Sale</h2>
        </v-toolbar>
        <br>
        <v-row >
            <v-col sm="6" md="4">       
                <v-card outlined elevation="5">
                    <v-img src="https://cdn-asset.jawapos.com/wp-content/uploads/2020/01/Jeruk-Mandarin-Pixabay.jpg" height="200px"/>
                    <v-card-title>Jeruk Mandarin</v-card-title>
                    <v-card-subtitle>Rp.3000/100gr</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col sm="6" md="4">
                <v-card outlined elevation="5">
                    <v-img src="https://cdn1-production-images-kly.akamaized.net/FWMG4ywTsYcoH4WrYt5-_52U16c=/564x0:3232x2668/640x640/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2955880/original/001098700_1572595650-bunch-cluster-delicious-708777.jpg" height="200px"/>
                    <v-card-title>Anggur Mahal</v-card-title>
                    <v-card-subtitle>Rp.8000/100gr</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col sm="6" md="4">
                <v-card outlined elevation="5">
                    <v-img src="https://img.okeinfo.net/content/2017/09/06/298/1770711/berapa-lama-sebaiknya-daging-ayam-mentah-disimpan-di-lemari-es-i07N6mgNyr.jpg" height="200px"/>
                    <v-card-title>Ayam Pentung</v-card-title>
                    <v-card-subtitle>Rp.12000/100gr</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <br>
        <v-toolbar :src= imageBg elevation="10">
            <h2>Suupamaketo Preview</h2>
        </v-toolbar>

        <br>
        <v-card elevation="5">
            <v-carousel hide-delimiters cycle continuous dark height="660" >
                <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                ></v-carousel-item>
            </v-carousel>
        </v-card>
    </v-container>

    <v-container>
        <v-row>
            <v-col>
                 <v-card
                        class="mx-auto"
                        max-width="344"
                        elevation="5"
                    >
                        <v-img
                            :src= imageLogo
                            height="200px"
                        ></v-img>

                        <v-card-title>
                        </v-card-title>

                        <v-card-actions>
                       
                        <v-spacer></v-spacer>

                       <v-btn
                            color="orange darken-2"
                            text
                            @click="show = !show"
                        >
                            About Us
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                                SUUPAMAKETO adalah supermarket yang didirikan oleh pemuda yang masih menduduki
                                pendidikan perguruan tinggi bersama dengan teman-temannya pada tahun 2020. Kami menghadirkan
                                sistem supermarket secara online sehingga pelanggan dapat memesan barang yang dibutuhkan
                                melalui website kami. Kami selalu berusaha memberikan fasilitas dan kualitas yang terbaik bagi pelanggan.
                                Visi kami memberikan yang terbaik bagi pelanggan untuk memenuhi kebutuhan dan mensejahterahkan kehidupan
                                masyarakat.
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </v-card>
            </v-col>
            <v-col>
                <v-card
                        class="mx-auto"
                        max-width="344"
                        elevation="5"
                    >
                        <v-img
                            src="https://www.jobstreet.co.id/career-resources/wp-content/uploads/sites/7/2021/08/Career-Path_Customer-Service-General-min.jpg"
                            height="200px"
                        ></v-img>

                        <v-card-title>
                        </v-card-title>

                        <v-card-actions>

                        <v-spacer></v-spacer>

                        <v-btn
                            color="orange darken-2"
                            text
                            @click="show2 = !show2"
                        >
                            Contact Us
                            <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <div v-show="show2">
                            <v-divider></v-divider>
                            <br>
                            <v-card-text>
                                Anda memiliki saran dan kritik bagi kami?
                                Jangan sungkan hubungi kami!
                                Kontak kami dengan media berikut:
                                <br><br>
                                <v-row>
                                    <v-col>
                                        WA    : 081234567890
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        IG    : SuupamaketoID
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        FB    : Suupamaketo_id
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <br>
                        </div>
                        </v-expand-transition>
                    </v-card>
            </v-col>
            <v-col>
                <v-card
                        class="mx-auto"
                        max-width="344"
                        elevation="5"
                    >
                        <v-img
                            src="https://assets-us-01.kc-usercontent.com/9e9a95c0-1d15-00d5-e878-50f070203f13/0cff492c-5c80-4a29-8fb1-8b1d43aef52d/market-place-by-jasons-slider-1.jpg"
                            height="200px"
                        ></v-img>

                        <v-card-title>
                        </v-card-title>

                        <v-card-actions>

                        <v-spacer></v-spacer>

                        <v-btn
                            color="orange darken-2"
                            text
                            @click="show3 = !show3"
                        >
                            Our Address
                            <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <div v-show="show3">
                            <v-divider></v-divider>
                            <br><br>
                            <v-card-text>
                                SUUPAMAKETO memiliki 2 cabang yakni di Surakarta dan Yogyakarta.
                                <br><br>
                                <v-row>
                                    <v-col>
                                        Surakarta : Jl. Soedirman barat Blok AK-47
                                    </v-col>
                                </v-row>
                                 <v-row>
                                    <v-col>
                                        Jogja : Jl. Mrican Timur Blok MP-4
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <br><br><br>
                        </div>
                        </v-expand-transition>
                    </v-card>
            </v-col>
        </v-row>
        
    </v-container>


</div>
    
</template>

<script>
import image from "../../assets/Shop1.jpg"
import image2 from "../../assets/shop2.jpg"
import image3 from "../../assets/shop3.jpg"
import image4 from "../../assets/shop4.jpg"
import logo from "../../assets/logo.jpg"
import bg from "../../assets/supamaketo.png"


export default {
    name: "Home",
    data() {
        return{
            items: [
                {
                    src: image,
                },
                {
                    src: image2,
                },
                {
                    src: image3,
                },
                {
                    src: image4,
                },
            ],
            show: false,
            show2: false,
            show3: false,
            imageLogo: logo,
            imageBg : bg,
            produks: [],
            name:'',
        };
    },

    methods: {
        getProduk(){
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.produks = response.data.data;
            })
        },
    },

    beforeMount(){
        this.getProduk();
        this.name = localStorage.getItem('name');
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dongle&family=M+PLUS+2:wght@500&display=swap');

</style>