<template>
    <Authenticated>
        <h1>Reservation details</h1>
        <h3>Buyer</h3>
        <vue-good-table
          v-if="tableData"
          :columns="tableBuyerFields"
          :rows="[tableData.Acheteur]"
          :fixed-header="true"
        />
        <h3>Game</h3>
        <vue-good-table
          v-if="tableData"
          :columns="tableGameFields"
          :rows="[tableData.Game]"
          :fixed-header="true"
        />
        <h3>Reservations</h3>
        <vue-good-table
          v-if="tableData"
          :columns="tableReservationFields"
          :rows="tableData.Reservation"
          :fixed-header="true"
        />
    </Authenticated>
</template>

<script>
    import Authenticated from "../templates/Authenticated";
    import { VueGoodTable } from 'vue-good-table';

    export default {
        name: "Reservation",
        components: {
            Authenticated,
            VueGoodTable
        },
        data() {
            return {
                tableBuyerFields: [
                    {field: 'Civilite', label: 'Civility'},
                    {field: 'Nom', label: 'Client Name'},
                    {field: 'Prenom', label: 'Client Last name'},
                    {field: 'Age', label: 'Age'},
                    {field: 'Email', label: 'Email'}
                ],
                tableGameFields: [
                    {field: 'Nom', label: 'Game Name'},
                    {field: 'Jour', label: 'Date'},
                    {field: 'Horaire', label: 'Hour'},
                    {field: 'VR', label: 'VR?'}
                ],
                tableReservationFields: [
                    {field: 'Spectateur.Civilite', label: 'Game Name'},
                    {field: 'Spectateur.Nom', label: 'Date'},
                    {field: 'Spectateur.Prenom', label: 'Hour'},
                    {field: 'Spectateur.Age', label: 'Number of reservations'},
                    {field: 'Tarif', label: 'Tarif'},
                    {field: 'Price', label: 'Price'},
                ],
                tableData: {}
            }
        },
        created() {
            const reservationData = this.$store.state.reservationData;
            console.log(this.$route.params.id);
            if (this.$route.params.id === undefined) {
                this.$toast.error('wrong parameter');
                this.$router.push({name: 'dashboard'});
            }
            const id = parseInt(this.$route.params.id);
            if (id >= reservationData.length) {
                this.$toast.error('wrong parameter');
                this.$router.push({name: 'dashboard'});
            }
            this.tableData = reservationData[id];
        }
    }
</script>

<style scoped>

</style>