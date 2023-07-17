"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
test('test', () => {
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 0,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('A4');
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 3,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('F#6');
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 3,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: false })).toBe('F#1');
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 10,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: false })).toBe('F##5');
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 10,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: true })).toBe('Fx5');
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: -5,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('Bb1');
});
