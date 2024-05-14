<template>
  <div class="container border-radius-10">
    <div class="card">
      <div class="card-body">
        <h5 class="text-center text-uppercase fw-bold">
          dashboard
          <font-awesome-icon :icon="['fas', 'chart-line']"/>
        </h5>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Total muestras tomadas</h5>
            <br>
            <font-awesome-icon :icon="['fas', 'syringe']" style="font-size: 3em;"/>
            <p class="h1">{{ totalMuestras }}</p>
            <p class="text-muted">Muestras</p>
            <small class="text-secondary">Ultimos 30 dias </small>
          </div>
        </div>
        <br>
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Muestras enviadas al sponsor</h5>
            <br>
            <font-awesome-icon :icon="['fas', 'flask-vial']" style="font-size: 3em;"/>

            <p class="h1">{{ muestrasEnviadasAlSponsor }}</p>

            <small class="text-secondary">* Ultimos 60 dias</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <div id="barGenaroPatienst"></div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <div id="barYearsPatienst"></div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <!--<button @click="renderSamplesbyState">Renderizar Gráfica</button>-->
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <div id="container"></div>
          </div>
        </div>

      </div>
      <div class="col-md-6">

        <div class="card">
          <div class="card-body">
            <div id="containerSamplesForDay"></div>
          </div>
        </div>

      </div>

      <!--style="min-width: 310px; height: 400px; margin: 0 auto"-->
    </div>
  </div>
</template>

<style>

.circle-icon {
  width: 50px;
  height: 50px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>

import Highcharts from 'highcharts';
import {HighchartsVue} from 'highcharts-vue';

import {ref, watch} from 'vue';

// Definimos las props
const props = {
  dataDashboard: {
    type: Array,
    required: true
  }
};


function renderSamplesByState(data) {

  const nombresEstados = data.map(item => item.nombre);
  const valores = data.map(item => item.cantidad_muestras);


  Highcharts.chart('container', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Muestras en cada estado',
      align: 'center'
    },
    subtitle: {
      text: '<p>Tiene en cuenta las muestras tomadas 7 dias hacia atras</p>',
      align: 'center'
    },
    xAxis: {
      categories: nombresEstados,
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      },
      gridLineWidth: 0
    },
    tooltip: {
      valueSuffix: ' Muestra'
    },
    plotOptions: {
      bar: {
        borderRadius: '50%',
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Cantidad de muestras',
      data: valores
    }]
  });


}

function renderSamplesForDay(data) {

  const dias = Array.from(new Set(data.cantidades.map(item => item.fecha)));

  const valoresPorSede = [];
  const sedes = {};

  data.cantidades.forEach(item => {
    if (!sedes[item.sede]) {
      sedes[item.sede] = [];
    }
    sedes[item.sede].push(item.cantidad);
  });

  for (const [sede, valores] of Object.entries(sedes)) {
    valoresPorSede.push({
      name: sede,
      data: valores
    });
  }

  console.log(valoresPorSede);

  console.log(dias)
//  muestrasTomadasPorDia
  Highcharts.chart('containerSamplesForDay', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Muestras por sedes'
    },
    subtitle: {
      text: '<p>Tiene en cuenta las muestras tomadas 7 dias hacia atras</p>'
    },
    xAxis: {
      categories: dias
    },
    yAxis: {
      title: {
        text: 'Cantidad de muestras'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: valoresPorSede
  });
}

function renderBarGeneroPatienst(data) {
  Highcharts.chart('barYearsPatienst', {
    chart: {
      type: 'pie'
    },
    title: {
      text: '% Genero de pacientes encuestados'
    },
    tooltip: {
      valueSuffix: '%'
    },
    subtitle: {
      text:
          'Ultimos 30 dias'
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: data
      }
    ]
  });
}

function renderBarEdadPatients(data) {

  Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
      return {
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7
        },
        stops: [
          [0, color],
          [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
        ]
      };
    })
  });

// Build the chart
  Highcharts.chart('barGenaroPatienst', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: '% Edad pacientes',
      align: 'center'
    },
    subtitle: {
      text:
          'Ultimos 30 dias'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
              '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
          connectorColor: 'rgba(128,128,128,0.5)'
        }
      }
    },
    series: [{
      name: 'Share',
      data: data
    }]
  });


}

export default {
  props,
  setup(props) {

    const totalMuestras = ref(0);
    const muestrasEnviadasAlSponsor = ref(0);

    watch(() => props.dataDashboard, (dataDashboardStart) => {
      renderSamplesByState(dataDashboardStart.muestrasPorEstados);
      renderSamplesForDay(dataDashboardStart.muestrasTomadasPorDia);
      renderBarEdadPatients(dataDashboardStart.edadPacientes);
      renderBarGeneroPatienst(dataDashboardStart.generoDePacientes);

      totalMuestras.value = dataDashboardStart.totalmuestrastomadas;
      muestrasEnviadasAlSponsor.value = 0;
    });

    return {totalMuestras, muestrasEnviadasAlSponsor};
  },
  name: 'ChartComponent',
  components: {
    HighchartsVue,
  },
  methods: {
    renderSamplesByState
  }
}

</script>
