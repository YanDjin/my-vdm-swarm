<template>
    <Anonymous>
        <b-field label="Email" label-position="on-border">
            <b-input v-model="formData.Email"></b-input>
        </b-field>
        <b-field label="Password" type="password" label-position="on-border">
            <b-input v-model="formData.Email"></b-input>
        </b-field>
        <b-field label="Password" type="password" label-position="on-border">
            <b-input v-model="formData.Email"></b-input>
        </b-field>
        <b-field label="Civility"
                 label-position="on-border">
            <b-select v-model="formData.Civility" placeholder="Select a civility">
                <option value="Monsieur">Mister</option>
                <option value="Madame">Madame</option>
            </b-select>
        </b-field>
        <b-field label="Name" label-position="on-border">
            <b-input v-model="formData.Nom"></b-input>
        </b-field>
        <b-field label="Lastname" label-position="on-border">
            <b-input v-model="formData.Prenom"></b-input>
        </b-field>
        <b-field label="Age" label-position="on-border">
            <b-input type="number" v-model="formData.Age"></b-input>
        </b-field>
    </Anonymous>
</template>

<script>
    import Anonymous from "../templates/Anonymous";

    export default {
        name: "Register",
        components: {
            Anonymous
        },
        data() {
            return {
                formData: {
                    Email: '',
                    Password: '',
                    Civility: '',
                    Nom: '',
                    Prenom: '',
                    Age: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>