<template>
    <Authenticated>
        <h1>Your dashboard</h1>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card
                  class="mx-auto pa-3 my-auto"
                  outlined
                >
                    <LineChart
                      v-if="chartData.reservedPerDay.data.length"
                      :labels="chartData.reservedPerDay.labels"
                      :globalLabel="chartData.reservedPerDay.globalLabels"
                      :data="chartData.reservedPerDay.data"
                      title="This months reservations per day"
                    ></LineChart>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
                <v-card
                  class="mx-auto pa-3 my-auto"
                  outlined
                >
                    <PieChart
                      v-if="chartData.percentagePerGame.data.length"
                      :labels="chartData.percentagePerGame.labels"
                      :globalLabel="chartData.percentagePerGame.globalLabels"
                      :data="chartData.percentagePerGame.data"
                      title="Repartition of reservations per game"
                    ></PieChart>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card
                  class="mx-auto pa-3 my-auto"
                  outlined
                >
                    <LineChart
                      v-if="chartData.earningsPerDay.data.length"
                      :labels="chartData.earningsPerDay.labels"
                      :globalLabel="chartData.earningsPerDay.globalLabels"
                      :data="chartData.earningsPerDay.data"
                      title="Earnings per day"
                    ></LineChart>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
                <v-card
                  class="mx-auto pa-3 my-auto"
                  outlined
                >
                    <BarChart
                      v-if="chartData.numberOfPersonsPerGame.data.length"
                      :labels="chartData.numberOfPersonsPerGame.labels"
                      :globalLabel="chartData.numberOfPersonsPerGame.globalLabels"
                      :data="chartData.numberOfPersonsPerGame.data"
                      title="Number of persons per game"
                    ></BarChart>
                </v-card>
            </v-col>
        </v-row>
        <h1>Reservation Data</h1>
        <vue-good-table
          v-if="tableData.length"
          :columns="tableFields"
          :rows="tableData"
          :fixed-header="true"
          :search-options="{
            enabled: true,
            trigger: 'enter'
          }"
          :pagination-options="{
            enabled: true,
            perPage: 10
          }"
          @on-row-click="onRowClick"
          @on-page-change="onPageChange"
        />
    </Authenticated>
</template>

<script>
    import Authenticated from "../templates/Authenticated";
    import request from "../services/request";
    import LineChart from "../components/Charts/LineChart";
    import BarChart from "../components/Charts/BarChart";
    import PieChart from "../components/Charts/PieChart";
    import 'vue-good-table/dist/vue-good-table.css'
    import {VueGoodTable} from 'vue-good-table';

    export default {
        name: "Login",
        components: {
            Authenticated,
            LineChart,
            BarChart,
            PieChart,
            VueGoodTable
        },
        data() {
            return {
                tickets: [],
                users: [],
                clients: [],
                chartData: {
                    reservedPerDay: {
                        globalLabels: '',
                        data: [],
                        labels: ''
                    },
                    percentagePerGame: {
                        globalLabels: '',
                        data: [],
                        labels: ''
                    },
                    numberOfPersonsPerGame: {
                        globalLabels: '',
                        data: [],
                        labels: ''
                    },
                    earningsPerDay: {
                        globalLabels: '',
                        data: [],
                        labels: ''
                    },
                },
                tableFields: [
                    {field: 'name', label: 'Client Name'},
                    {field: 'lastName', label: 'Client Last name'},
                    {field: 'game', label: 'Game Name'},
                    {field: 'date', label: 'Date'},
                    {field: 'hour', label: 'Hour'},
                    {field: 'number', label: 'Number of reservations'},
                    {field: 'total', label: 'Total price'},
                ],
                tableData: [],
                currentPage: 1,
                perPage: 10
            }
        },
        methods: {
            request,
            getData() {
                this.request('statistics', null, {Authorization: this.$store.state.token}, 'get')
                  .then(res => {
                      this.tickets = res.data.tickets;
                      this.users = res.data.users;
                      this.clients = res.data.clients;
                      this.formatDataForChartsAndTable();
                      this.$store.commit('saveReservationData', this.tickets);
                      console.log(res);
                  }).catch(err => {
                    console.error(err);
                })
            },
            formatDataForChartsAndTable() {
                this.formatDataForReservedAndEarningsPerDayChart();
                this.formatDataForPercentageAndNumberOfPersonsPerGameChart();
                this.prepareTableData();
            },
            formatDataForReservedAndEarningsPerDayChart() {
                // this.chartData.reservedPerDay.globalLabels = 'This months reservations per day';
                // this.chartData.earningsPerDay.globalLabels = 'Earnings per day';
                const getDaysInMonth = () => {
                    let date = new Date();
                    const currentMonth = date.getMonth();
                    date = new Date(date.getFullYear(), currentMonth, 1);
                    let days = [];
                    while (date.getMonth() === currentMonth) {
                        days.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
                        date.setDate(date.getDate() + 1);
                    }
                    return {days, currentMonth};
                }
                const {days, currentMonth} = getDaysInMonth();
                this.chartData.reservedPerDay.labels = days;
                this.chartData.earningsPerDay.labels = days;
                let dataReserved = [];
                let dataEarnings = [];
                for (let i = 0; i < days.length; i++) {
                    dataReserved.push(0);
                    dataEarnings.push(0);
                }
                this.tickets.forEach((ticket) => {
                    let ticketDate = new Date(ticket.Game.Jour);
                    if (ticketDate.getMonth() === currentMonth) {
                        dataReserved[ticketDate.getDate()]++;
                        ticket.Reservation.forEach(reservation => {
                            if (reservation.Price) {
                                dataEarnings[ticketDate.getDate()] += reservation.Price;
                            }
                        })
                    }
                })
                this.chartData.reservedPerDay.data = dataReserved;
                this.chartData.earningsPerDay.data = dataEarnings;
            }
            ,
            formatDataForPercentageAndNumberOfPersonsPerGameChart() {
                // this.chartData.numberOfPersonsPerGame.globalLabels = 'Number of persons per game';
                // this.chartData.percentagePerGame.globalLabels = 'Repartition of reservations per game';
                const games = [];
                const numberPerGame = [];
                const percentagePerGame = [];
                let index;
                this.tickets.forEach(ticket => {
                    if ((index = games.indexOf(ticket.Game.Nom)) === -1) {
                        games.push(ticket.Game.Nom);
                        numberPerGame.push(ticket.Reservation.length);
                        percentagePerGame.push(0);
                    } else {
                        numberPerGame[index] += ticket.Reservation.length;
                        percentagePerGame[index]++;
                    }
                })
                this.chartData.numberOfPersonsPerGame.labels = games;
                this.chartData.percentagePerGame.labels = games;
                this.chartData.numberOfPersonsPerGame.data = numberPerGame;
                this.chartData.percentagePerGame.data = percentagePerGame;
            },
            prepareTableData() {
                let tableData = [];
                this.tickets.forEach(ticket => {
                    let date = new Date(ticket.Game.Jour);
                    tableData.push({
                        name: ticket.Acheteur.Nom,
                        lastName: ticket.Acheteur.Prenom,
                        game: ticket.Game.Nom,
                        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                        hour: ticket.Game.Horaire,
                        number: ticket.Reservation.length
                    });
                    tableData[tableData.length - 1]['total'] = 0;
                    ticket.Reservation.forEach(reservation => {
                        if (reservation.Price) {
                            tableData[tableData.length - 1]['total'] += parseInt(reservation.Price);
                        }
                    })
                    tableData[tableData.length - 1]['total'] += " €";
                })
                this.tableData = tableData;
            },
            onRowClick(params) {
                let index = ((parseInt(this.currentPage) - 1) * parseInt(this.perPage)) + parseInt(params.pageIndex);
                this.$router.push({name: 'reservation', params: {id: index}});
            },
            onPageChange(params) {
                this.currentPage = params.currentPage;
                console.log(params);
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>

</style>