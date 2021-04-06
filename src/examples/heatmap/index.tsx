import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './heatMap.css';
import data from './data';

const dimentions = {
    width: 600,
    height: 150
}

const box = 30;

const drawHeatMap = (containerSelection: any, scaleType: string) => {

    let scale;
    if (scaleType === 'scaleLinear') {
        scale = d3.scaleLinear<string>()
            .domain(d3.extent(data) as Iterable<Number>)
            .range(['white', 'red']);
    }

    if (scaleType === 'quantizeScale') {
        scale = d3.scaleQuantize<string>()
            .domain(d3.extent(data) as Iterable<Number>)
            .range(['white', 'pink', 'red']);
    }

    if (scaleType === 'quantileScale') {
        scale = d3.scaleQuantile<string>()
            .domain(data as Iterable<Number>)
            .range(['white', 'pink', 'red']);
    }
        console.log(d3.schemeBuGn)
    if (scaleType === 'thresholdScale') {
        scale = d3.scaleThreshold<string>()
            .domain([45200, 135600] as Iterable<string>)
            .range(d3.schemeBuGn[3] as Iterable<number>);
    }

    const svgContainer = containerSelection.append('svg').attr('width', dimentions.width).attr('height', dimentions.height);
    svgContainer.append('g')
        .attr('transform', 'translate(2,2)')
        .attr('stroke', 'black')
        .selectAll()
        .data(data.sort((v1: number, v2: number) => v1 - v2))
        .join('rect')
        .attr('width', box - 3)
        .attr('height', box - 3)
        .attr('x', (d: number, i: number) => box * (i % 20))
        .attr('y', (d: number, i: number) => box * ((i / 20) | 0))
        .attr('fill', scale)
        .append('title')
        .text((d:number)=>d);

}

export default () => {
    const container = useRef(null);

    useEffect(() => {

        if (container.current) {
            //const containerSelection : d3.Selection<SVGFEFuncGElement, d3.OldDatum, null, undefined> = d3.select(container.current);
            const containerSelection = d3.select(container.current);
            const linear = containerSelection.append('div');
            linear.append('h1').text('Linear Scale');
            drawHeatMap(linear, 'scaleLinear');

            const quanitize = containerSelection.append('div');
            quanitize.append('h1').text('Quantize Scale');
            drawHeatMap(quanitize, 'quantizeScale');

            const quantile = containerSelection.append('div');
            quantile.append('h1').text('Quantile Scale');
            drawHeatMap(quantile, 'quantileScale');

            const threshold = containerSelection.append('div');
            threshold.append('h1').text('Threshold Scale');
            drawHeatMap(threshold, 'thresholdScale');

        }

    }, [container.current]);

    return (<div ref={container} />)
}