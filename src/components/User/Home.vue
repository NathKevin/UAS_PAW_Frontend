<template>
<div>
    <v-container >
        <v-toolbar>
            <h2>Home</h2>    
        </v-toolbar>
        <br>
        <v-card>
        </v-card>
        <v-card >
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
        <br>
        <table>
            <tr>
                <td>
                    <v-card
                        class="mx-auto"
                        max-width="344"
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
                            color="orange lighten-2"
                            text
                            @click="show = !show"
                        >
                            About Us
                            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                                I'm a thing. But, like most politicians, he promised more than he could deliver. 
                                You won't have time for sleeping, soldier, not with all the bed making you'll be doing. 
                                Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! 
                                You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </v-card>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <v-card
                        class="mx-auto"
                        max-width="344"
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
                            color="orange lighten-2"
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

                            <v-card-text>
                                I'm a thing. But, like most politicians, he promised more than he could deliver. 
                                You won't have time for sleeping, soldier, not with all the bed making you'll be doing. 
                                Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! 
                                You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </v-card>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <v-card
                        class="mx-auto"
                        max-width="344"
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
                            color="orange lighten-2"
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

                            <v-card-text>
                                I'm a thing. But, like most politicians, he promised more than he could deliver. 
                                You won't have time for sleeping, soldier, not with all the bed making you'll be doing. 
                                Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! 
                                You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </v-card>
                </td>
            </tr>
        </table>
        <br>
    </v-container>

    
    
</div>
    
    
</template>

<script>
import image from "../../assets/Shop1.jpg"
import image2 from "../../assets/shop2.jpg"
import image3 from "../../assets/shop3.jpg"
import image4 from "../../assets/shop4.jpg"
import logo from "../../assets/logo.jpg"


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
        imageLogo: logo
        };
    },

    methods: {
        
    }
}
</script>

<style>
</style>