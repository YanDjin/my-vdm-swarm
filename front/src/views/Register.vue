<template>
    <Anonymous>
        <v-card
          class="mx-auto pa-3 my-auto"
          max-width="600"
          shaped
        >
            <v-card-title>
                Register
            </v-card-title>

            <v-card-subtitle>
                to access your data
            </v-card-subtitle>

            <v-form v-model="formValid" @submit.prevent="submit">
                <v-container>

                    <v-text-field
                      v-model="formData.Email"
                      :rules="formRules.email"
                      label="E-mail"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.Password"
                      :rules="formRules.password"
                      :append-icon="seePassword ? 'mdi-visibility_off' : 'mdi-visibility'"
                      @click:append="seePassword = !seePassword"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.Nom"
                      :rules="formRules.name"
                      :counter="10"
                      label="First name"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.Prenom"
                      :rules="formRules.name"
                      :counter="10"
                      label="Last name"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.Age"
                      :rules="formRules.age"
                      label="Age"
                      type="number"
                      required
                    ></v-text-field>

                    <v-select
                      v-model="formData.Civilite"
                      :items="[{text: 'Mister', value: 'Monsieur'}, {text: 'Madame', value: 'Madame'}]"
                      label="Civility"
                      required
                    ></v-select>

                    <v-btn
                      color="blue white--text"
                      type="submit"
                      depressed
                    >
                        Submit
                    </v-btn>
                </v-container>
            </v-form>
        </v-card>

    </Anonymous>
</template>

<script>
  import Anonymous from "../templates/Anonymous";
  import request from "../services/request";

  export default {
    name: "Register",
    components: {
      Anonymous
    },
    data() {
      return {
        formValid: false,
        seePassword: false,
        formData: {
          Email: '',
          Password: '',
          Civilite: '',
          Nom: '',
          Prenom: '',
          Age: ''
        },
        formRules: {
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
          password: [
            v => !!v || 'Password is required',
            v => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(v) || 'Password must correspond to RGPD guidelines'
          ]
        },
        beRedirected: true
      }
    },
    methods: {
      request,
      submit() {
        if (this.formValid) {
          this.request('register', this.formData)
            .then(res => {
              this.$toast.info('you will be redirected to the login page, click to cancel', {
                onClose: () => {this.beRedirected = false},
                timeout: 4000
              })
              setTimeout(() => {
                if (this.beRedirected) {
                  this.$router.push({name: 'login'});
                }
              }, 4000)
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

</style>