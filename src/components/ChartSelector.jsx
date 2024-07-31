import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import useStore from '../store';

const chartTypes = ['Bars', 'Lines', 'Dots'];

const ChartSelector = () => {
  const { selectedCharts, setSelectedCharts, setShowData } = useStore();

  const handleChartSelection = (event) => {
    const value = event.target.name;
    let newSelectedCharts;
    if (selectedCharts.includes(value)) {
      newSelectedCharts = selectedCharts.filter(chart => chart !== value);
    } else {
      newSelectedCharts = [...selectedCharts, value];
    }
    setSelectedCharts(newSelectedCharts);
    setShowData(false);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select Charts
      </Typography>
      <FormGroup>
        {chartTypes.map(chart => (
          <FormControlLabel
            key={chart}
            control={
              <Checkbox
                checked={selectedCharts.includes(chart)}
                onChange={handleChartSelection}
                name={chart}
              />
            }
            label={chart}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default ChartSelector;