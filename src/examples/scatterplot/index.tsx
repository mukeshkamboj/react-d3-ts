import React, { useEffect, useRef } from 'react';
import * as D3 from 'd3';
import data from './salesData';

const dimensions = {
    width: 800,
    height: 800,
    margin: {
        left: 50,
        top: 50,
        right: 50,
        bottom: 50,
    }
}

const ctrDimentions = {
    width: dimensions.width - dimensions.margin.left - dimensions.margin.right,
    height: dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
}

const months: any = {
    "JANUARY": 1,
    "FEBRUARY": 2,
    "MARCH": 3,
    "APRIL": 4,
    "MAY": 5,
    "JUNE": 6,
    "JULY": 7,
    "AUGUST": 8,
    "SEPTEMBER": 9,
    "OCTOBER": 10,
    "NOVEMBER": 11,
    "DECEMBER": 12,
}

const xAccessor = (d: any) => months[d.month];
const mangoAccessor = (d: any) => d.mango;
const orangeAccessor = (d: any) => d.orange;
const bananaAccessor = (d: any) => d.banana;

const ScatterPlot = () => {

    const container = useRef(null);

    useEffect(() => {

        if (container.current) {

            const svg = D3.select(container.current)
                .append('svg')
                .attr('width', dimensions.width)
                .attr('height', dimensions.height);

            const ctr = svg.append('g').attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
            const mangoContainer = ctr.append('g').attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
            const orangeContainer = ctr.append('g').attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
            const bananaContainer = ctr.append('g').attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

            const xScale = D3.scaleLinear()
                .domain([1, 12])
                .range([0, ctrDimentions.width]);

            const yScale = D3.scaleLinear()
                .domain(D3.extent([...D3.extent(data, mangoAccessor), ...D3.extent(data, orangeAccessor), ...D3.extent(data, bananaAccessor)]) as Iterable<Number>)
                .rangeRound([0, ctrDimentions.height])
                .nice();

            mangoContainer.selectAll('circle') // empty selection.
                .data(data as [])
                .join('circle')
                .attr('fill', 'red')
                .attr('r', 10)
                .attr('cx', (d: any) => xScale(xAccessor(d)))
                .attr('cy', (d: any) => yScale(mangoAccessor(d)));

            orangeContainer.selectAll('circle') // empty selection.
                .data(data as [])
                .join('circle')
                .attr('fill', 'blue')
                .attr('r', 10)
                .attr('cx', (d: any) => xScale(xAccessor(d)))
                .attr('cy', (d: any) => yScale(orangeAccessor(d)));

            bananaContainer.selectAll('circle') // empty selection.
                .data(data as [])
                .join('circle')
                .attr('fill', 'green')
                .attr('r', 10)
                .attr('cx', (d: any) => xScale(xAccessor(d)))
                .attr('cy', (d: any) => yScale(bananaAccessor(d)));

            const xAxis = D3.axisBottom(xScale).ticks(12)
                .tickFormat((d: any) => Object.keys(months).find(mon => months[mon] == d) || '');

            const xAxisGroup = ctr.append('g')
                .call(xAxis)
                .style('font-size', '18px')
                .style('shape-rendering', 'geometricPrecision')
                .style('transform', `translateY(${ctrDimentions.height}px)`)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

            xAxisGroup
                .append('text')
                .attr('x', ctrDimentions.width / 2)
                .attr('y', dimensions.margin.bottom - 10)
                .attr('fill', 'black')
                .text('Months')

            const yAxis = D3.axisLeft(yScale);

            const yAxisGroup = ctr.append('g')
                .call(yAxis)
                .style('font-size', '18px')
                .style('shape-rendering', 'geometricPrecision');

            yAxisGroup.append('text')
                .attr('x', -ctrDimentions.height / 2)
                .attr('y', -dimensions.margin.left)
                .attr('fill', 'black')
                .html('Sale')
                .style('transform', 'rotate(270deg)')
                .style('text-anchor', 'middle')

            /*
            const svg = D3.select(container.current)
                .append('svg')
                .attr('width', dimensions.width)
                .attr('height', dimensions.height);

            const ctr = svg.append('g').attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

            const xScale = D3.scaleLinear()
                .domain(D3.extent(data, xAccessor) as Iterable<Number>)
                .rangeRound([0, ctrDimentions.width]);

            const yScale = D3.scaleLinear()
                .domain(D3.extent(data, yAccessor) as Iterable<Number>)
                .rangeRound([0, ctrDimentions.height])
                .nice();

            ctr.selectAll('circle') // empty selection.
                .data(data as [])
                .join('circle')
                .attr('fill', 'red')
                .attr('r', 5)
                .attr('cx', (d: any) => xScale(xAccessor(d)))
                .attr('cy', (d: any) => yScale(yAccessor(d)));

            const xAxis = D3.axisBottom(xScale).ticks(5)
                .tickFormat((d:any) => d * 100 + '%');

            const xAxisGroup = ctr.append('g')
                .call(xAxis)
                .style('font-size', '18px')
                .style('shape-rendering', 'geometricPrecision')
                .style('transform', `translateY(${ctrDimentions.height}px)`);

            xAxisGroup
                .append('text')
                .attr('x', ctrDimentions.width / 2)
                .attr('y', dimensions.margin.bottom - 10)
                .attr('fill', 'black')
                .text('Humidity')

            const yAxis = D3.axisLeft(yScale);

            const yAxisGroup = ctr.append('g')
                .call(yAxis)
                .style('font-size', '18px')
                .style('shape-rendering', 'geometricPrecision');

            yAxisGroup.append('text')
                .attr('x', -ctrDimentions.height / 2)
                .attr('y', -dimensions.margin.left + 15)
                .attr('fill', 'black')
                .html('Temperature &deg; F')
                .style('transform', 'rotate(270deg)')
                .style('text-anchor', 'middle')
            */
        }

    }, [container.current])

    return (<div ref={container} />);

}

export default ScatterPlot;