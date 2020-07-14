<template>
    <Authenticated>
        <v-card
          class="mx-auto pa-3 my-auto"
          max-width="600"
          shaped
        >
            <v-card-title>
                Login
            </v-card-title>

            <v-card-subtitle>
                to access your dashboard
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

    </Authenticated>
</template>

<script>
    import Authenticated from "../templates/Authenticated";
    import request from "../services/request";

    export default {
        name: "Login",
        components: {
          Authenticated
        },
      data() {
        return {
          formValid: false,
          seePassword: false,
          formData: {
            Email: '',
            Password: ''
          },
          formRules: {
            email: [
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            password: [
              v => !!v || 'Password is required',
              v => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(v) || 'Password must correspond to RGPD guidelines'
            ]
          }
        }
      },
      methods: {
        request,
        submit() {
          if (this.formValid) {
            this.request('authenticate', this.formData)
              .then(res => {
                this.commit('saveToken', res.data.token);
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