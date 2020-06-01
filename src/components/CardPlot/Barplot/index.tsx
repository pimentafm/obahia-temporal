import React, { useState, useEffect } from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

import { oba } from '../../../services';

interface BarPlotData {
  data: Object;
}

const Barplot: React.FC = () => {
  const [year, setYear] = useState(2018);
  const [landuse, setData] = useState([]);

  const [colors] = useState([
    '#004000',
    '#77a605',
    '#b8af4f',
    '#f6e6db',
    '#ffcaff',
    '#ff42f9',
    '#f4f286',
    '#0000ff',
    '#ff0000',
  ]);

  const [xaxis] = useState([
    'Formações florestais',
    'Formações savânicas',
    'Formações campestres',
    'Mosaico Agricultura/Pastagem',
    'Agricultura de sequeiro',
    'Agricultura irrigada',
    'Pastagem',
    'Corpos dágua',
    'Área urbana/Construções rurais',
  ]);

  const data = [
    {
      x: xaxis,
      y: landuse,
      stackgroup: 'one',
      type: 'bar',
      marker: { color: colors },
    },
  ];

  const layout = {
    title: {
      text: '<b>Cobertura e uso do solo ' + year + '</b>',
      font: {
        family: 'Arial, sans-serif',
        size: 14,
      },
    },
    height: 300,
    xaxis: {
      title: {
        text: 'Classes',
      },
      titlefont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000',
      },
      tickfont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },
      autotick: false,
      showticklabels: false,
      ticks: 'outside',
      tickcolor: '#000',
    },
    yaxis: {
      title: {
        text: 'Uso e Cobertura do solo (1000 km²)',
      },
      titlefont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000',
      },
      tickfont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },

      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 6,
      ticklen: 8,
      tickwidth: 2,
      tickcolor: '#000',
    },
    showlegend: false,
    margin: { l: 60, r: 10, t: 70, b: 50 },
  };

  const config = {
    displaylogo: false,
  };

  useEffect(() => {
    oba
      .post('region/', {
        year1: year,
        year2: year,
        table_name: 'landuse',
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(async response => {
        let data = await response.data.map((j: BarPlotData) =>
          Object.values(j),
        );
        setYear(year);
        setData(data[0]);
      })
      .catch(e => {
        throw new Error('Do not load Barplot data');
      });
  }, [year]);

  return <PlotlyChart data={data} layout={layout} config={config} />;
};

export default Barplot;
