<template>
  <div>
    <button @click="renderChart">Renderizar Gráfica</button>
    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
  </div>
</template>

<script>

import Highcharts from 'highcharts';
import { HighchartsVue } from 'highcharts-vue';

import { defineProps, watch } from 'vue';

// Definimos las props
const props = {
  patients: {
    type: Array,
    required: true
  }
};


function renderChart() {
  Highcharts.chart('container', {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Monthly Average Temperature'
    },
    subtitle: {
      text: 'Source: ' +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank">Wikipedia.com</a>'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      accessibility: {
        description: 'Months of the year'
      }
    },
    yAxis: {
      title: {
        text: 'Temperature'
      },
      labels: {
        format: '{value}°'
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      }
    },
    series: [{
      name: 'Tokyo',
      marker: {
        symbol: 'square'
      },
      data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
        y: 26.4,
        marker: {
          symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
        },
        accessibility: {
          description: 'Sunny symbol, this is the warmest point in the chart.'
        }
      }, 22.8, 17.5, 12.1, 7.6]

    }, {
      name: 'Bergen',
      marker: {
        symbol: 'diamond'
      },
      data: [{
        y: 1.5,
        marker: {
          symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
        },
        accessibility: {
          description: 'Snowy symbol, this is the coldest point in the chart.'
        }
      }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
    }]
  });
}

export default {
  props,
  setup(props) {
    watch(() => props.patients, (newPatients) => {
      console.log('Pacientes actualizados:', newPatients);
      renderChart(); // Aquí llamamos a la función renderChart
      return newPatients;
    });
  },
  name: 'ChartComponent',
  components: {
    HighchartsVue,
  },
  methods: {
    renderChart
  }
}

</script>
