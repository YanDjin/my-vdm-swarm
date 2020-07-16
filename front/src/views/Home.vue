<template>
    <Anonymous :margin="false">
        <!--        <h1>Welcome to VDM escape game</h1>-->
        <v-card
          max-width="600"
          outlined
          class="title-card ma-5"
        >
            <v-card-title>
                Welcome to VDM escape game
            </v-card-title>
            <v-card-subtitle>
                please scroll down to find the ticket buying form
            </v-card-subtitle>
        </v-card>
        <v-carousel
          hide-delimiter-background
          show-arrows-on-hover
          delimiter-icon="mdi-minus"
          height="800"
          cycle
        >
            <v-carousel-item
              v-for="(carouselItem,i) in carouselItems"
              :key="i"
              :src="getImageUrl(carouselItem.src)"
              :class="carouselItem.src"
            ></v-carousel-item>
        </v-carousel>
        <v-card
          class="mx-auto pa-3 my-auto mt-10"
          max-width="600"
          shaped
        >
            <v-card-title>
                Ticket buying form
            </v-card-title>

            <v-card-subtitle>
                Using this form, you can book a ticket for our escape games
            </v-card-subtitle>

            <v-form v-model="formValid" @submit.prevent="submit">
                <v-container>

                    <!-------------->
                    <!--Buyer form-->
                    <!-------------->

                    <v-card
                      outlined
                      class="pa-3"
                    >
                        <v-card-subtitle>
                            Buyer form
                        </v-card-subtitle>

                        <v-text-field
                          v-model="formData.Acheteur.Email"
                          :rules="formRules.email"
                          label="E-mail"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="formData.Acheteur.Nom"
                          :rules="formRules.name"
                          :counter="10"
                          label="First name"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="formData.Acheteur.Prenom"
                          :rules="formRules.name"
                          :counter="10"
                          label="Last name"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="formData.Acheteur.Age"
                          :rules="formRules.age"
                          label="Age"
                          type="number"
                          required
                        ></v-text-field>

                        <v-select
                          v-model="formData.Acheteur.Civilite"
                          :items="[{text: 'Mister', value: 'Monsieur'}, {text: 'Madame', value: 'Madame'}]"
                          label="Civility"
                          required
                        ></v-select>
                    </v-card>

                    <!-------------->
                    <!--Game form-->
                    <!-------------->

                    <v-card
                      outlined
                      class="pa-3 mt-3"
                    >
                        <v-card-subtitle>
                            Game form
                        </v-card-subtitle>

                        <v-text-field
                          v-model="formData.Game.Nom"
                          :rules="formRules.minimum"
                          label="Name"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="formData.Game.Jour"
                          label="Date"
                          type="date"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="formData.Game.Horaire"
                          label="Hour"
                          type="time"
                          required
                        ></v-text-field>

                        <v-select
                          v-model="formData.Game.VR"
                          :items="[{text: 'Yes', value: 'Oui'}, {text: 'No', value: 'Non'}]"
                          label="VR"
                          required
                        ></v-select>
                    </v-card>

                    <!-------------->
                    <!--Reservation form-->
                    <!-------------->

                    <v-card
                      outlined
                      class="pa-3 mt-3"
                    >
                        <v-card-subtitle>
                            Reservation form
                        </v-card-subtitle>

                        <v-card
                          v-for="(reservationForm, i) in formData.Reservation"
                          :key="i"
                          outlined
                          class="pa-3 mt-3"
                        >
                            <v-card-subtitle>
                                Reservation {{i+1}}
                            </v-card-subtitle>

                            <v-text-field
                              v-model="formData.Reservation[i].Spectateur.Nom"
                              :rules="formRules.name"
                              label="First name"
                              required
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.Reservation[i].Spectateur.Prenom"
                              :rules="formRules.name"
                              label="Last name"
                              required
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.Reservation[i].Spectateur.Age"
                              :rules="formRules.age"
                              label="Age"
                              type="number"
                              required
                            ></v-text-field>

                            <v-select
                              v-model="formData.Reservation[i].Spectateur.Civilite"
                              :items="[{text: 'Mister', value: 'Monsieur'}, {text: 'Madame', value: 'Madame'}]"
                              label="Civility"
                              required
                            ></v-select>

                            <v-select
                              v-model="formData.Reservation[i].Tarif"
                              :items="[
                                {text: 'Senior: 7€', value: 'Senior'},
                                {text: 'Tarif etudiant: 7€', value: 'Tarif etudiant'},
                                {text: 'Plein tarif: 10€', value: 'Plein tarif'},
                                {text: 'Tarif reduit: 8€', value: 'Tarif reduit'},
                            ]"
                              label="Tarif"
                              required
                            ></v-select>
                        </v-card>
                    </v-card>

                </v-container>


                <v-btn
                  color="blue white--text"
                  type="submit"
                  depressed
                  class="mr-10 ml-3 my-2"
                >
                    Submit
                </v-btn>
                <v-btn
                  color="blue white--text"
                  type="button"
                  outlined
                  small
                  class="mr-2 my-2"
                  @click="addReservationForm"
                >
                    Add reservation form
                </v-btn>
                <v-btn
                  color="red white--text"
                  type="button"
                  outlined
                  small
                  class="mr-2 my-2"
                  @click="deleteReservationForm"
                >
                    Delete reservation form
                </v-btn>
            </v-form>
        </v-card>

    </Anonymous>
</template>

<script>
  import Anonymous from "../templates/Anonymous";
  import request from "../services/request";

  export default {
    name: "Login",
    components: {
      Anonymous
    },
    data() {
      return {
        formValid: false,
        seePassword: false,
        formData: {
          Acheteur: {
            Civilite: "",
            Nom: "",
            Prenom: "",
            Age: "",
            Email: "",
          },
          Game: {
            Nom: "",
            Jour: "",
            Horaire: "",
            VR: "",
          },
          Reservation: [
            {
              Spectateur: {
                Civilite: "",
                Nom: "",
                Prenom: "",
                Age: "",
              },
              Tarif: "",
            }
          ]
        },
        formRules: {
          minimum: [
            v => !!v || 'Name is required',
            v => v.length > 3 || 'Field must be more than 3 characters',
          ],
          name: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
          ],
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\.\w{2,5}/.test(v) || 'E-mail must be valid',
          ],
          age: [
            v => !!v || 'Age is required',
            v => v >= 14 || 'You must be 14 years old or older'
          ],
        },
        carouselItems: [
          {src: 'escape-game-1.jpg'},
          {src: 'escape-game-2.jpg'},
          {src: 'escape-game-3.jpg'},
        ]
      }
    },
    methods: {
      request,
      resetForm() {
        this.formData = {
          Acheteur: {
            Civilite: "",
            Nom: "",
            Prenom: "",
            Age: "",
            Email: "",
          },
          Game: {
            Nom: "",
            Jour: "",
            Horaire: "",
            VR: "",
          },
          Reservation: [
            {
              Spectateur: {
                Civilite: "",
                Nom: "",
                Prenom: "",
                Age: "",
              },
              Tarif: "",
            }
          ]
        };
      },
      addReservationForm() {
        this.formData.Reservation.push({
          Spectateur: {
            Civilite: "",
            Nom: "",
            Prenom: "",
            Age: "",
          },
          Tarif: "",
        });
      },
      deleteReservationForm() {
        if (this.formData.Reservation.length > 1) {
          this.formData.Reservation.pop();
        }
      },
      getImageUrl(img) {
        return require('../assets/carousel/' + img);
      },
      submit() {
        if (this.formValid) {
          this.request('ticket', this.formData)
            .then(res => {
              this.resetForm();
              console.log(res);
            }).catch(err => {
            console.error(err);
          })
        } else {
          this.$toast.info('please complete the form');
        }
      }
    }
  }
</script>

<style scoped>
    .title-card {
        position: absolute;
        z-index: 1;
    }
</style>