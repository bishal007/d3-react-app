import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Typography, Box } from '@mui/material';
import useStore from '../store';

const ChartDisplay = () => {
  const { users, selectedCharts, showData } = useStore();
  const svgRef = useRef();

  useEffect(() => {
    if (users.length === 0 || selectedCharts.length === 0 || !showData) {
      d3.select(svgRef.current).selectAll('*').remove();
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const filledUsers = users.filter(user => user.detailsFilled);
    x.domain(filledUsers.map(d => d.name));
    y.domain([0, 10]);

    svg.attr('width', width)
       .attr('height', height);

    const attributes = ['mood', 'work', 'life', 'food'];

    if (selectedCharts.includes('Bars')) {
      attributes.forEach((attr, index) => {
        svg.selectAll(`.bar-${attr}`)
          .data(filledUsers)
          .enter().append('rect')
          .attr('class', `bar-${attr}`)
          .attr('x', d => x(d.name) + (x.bandwidth() / attributes.length) * index)
          .attr('y', d => y(d[attr] || 0))
          .attr('width', x.bandwidth() / attributes.length)
          .attr('height', d => height - margin.bottom - y(d[attr] || 0))
          .attr('fill', d => color(attr));
      });
    }

    if (selectedCharts.includes('Lines')) {
      attributes.forEach(attr => {
        const line = d3.line()
          .x(d => x(d.name) + x.bandwidth() / 2)
          .y(d => y(d[attr] || 0));

        svg.append('path')
          .datum(filledUsers)
          .attr('fill', 'none')
          .attr('stroke', color(attr))
          .attr('stroke-width', 2)
          .attr('d', line);
      });
    }

    if (selectedCharts.includes('Dots')) {
      attributes.forEach(attr => {
        svg.selectAll(`.dot-${attr}`)
          .data(filledUsers)
          .enter().append('circle')
          .attr('class', `dot-${attr}`)
          .attr('cx', d => x(d.name) + x.bandwidth() / 2)
          .attr('cy', d => y(d[attr] || 0))
          .attr('r', 5)
          .attr('fill', color(attr));
      });
    }

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add legend
    const legend = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(attributes)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', color);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d);

  }, [users, selectedCharts, showData]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chart Display
      </Typography>
      <svg ref={svgRef}></svg>
    </Box>
  );
};

export default ChartDisplay;