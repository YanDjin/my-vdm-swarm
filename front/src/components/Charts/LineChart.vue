<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        name: "LineChart",
        props: ['globalLabel', 'data', 'labels', 'title'],
        mounted() {
            const colors = [
                "#231f20", "#bb4430", "#7ebdc2", "#f3dfa2",
                "#d0bfae", "#a06b9a", "#8d9ec6", "#51d6ff",
                '#8d99ae', '#81b29a', '#2b4162', '#a6cbb2',
                '#a8dadc', '#457b9d', '#1d3557', '#e63946',
                '#385f71', '#d569ea', '#d7b377', '#8f754f',
                '#264653', '#2a9d8f', '#e9c46a', '#f4a261',
                '#e76f51', '#264653', '#14213d', '#e9c46a',
                '#787878', '#ba6b6b', '#ffcdb2', '#ffb4a2',
                '#e5989b', '#b5838d', '#6d6875',
            ].sort(() => Math.random() - 0.5);
            this.renderChart(
              {
                  labels: this.labels,
                  datasets: [{
                      data: this.data,
                      backgroundColor: colors,
                      fill: false,
                      borderColor: colors[Math.floor(Math.random() * colors.length)]
                  }],
              }, {
                  title: {
                      display: !!this.title,
                      text: this.title
                  },
                  legend: {
                      display: !!this.globalLabel
                  }
              }
            );
        }
    }
</script>

<style scoped>

</style>