"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
test('AbstractPitchMeasuredFromA4.toAsciiString', () => {
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
test('AbstractPitchMeasuredFromA4.toMidiNoteNumberAssuming12TET', () => {
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 0,
        numOctaveAbove: 0
    }).toMidiNoteNumberAssuming12TET()).toBe(69);
    expect(new index_1.AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 10,
        numOctaveAbove: -5
    }).toMidiNoteNumberAssuming12TET()).toBe(79);
});
test('AbstractPitchClassMeasuredFromA.toAsciiString', () => {
    expect(new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 0,
    }).toAsciiString({ collapseSharps: false })).toBe('A');
    expect(new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 3,
    }).toAsciiString({ collapseSharps: false })).toBe('F#');
    expect(new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 3
    }).toAsciiString({ collapseSharps: false })).toBe('F#');
    expect(new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 10,
    }).toAsciiString({ collapseSharps: false })).toBe('F##');
    expect(new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 10,
    }).toAsciiString({ collapseSharps: true })).toBe('Fx');
    expect(new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: -5,
    }).toAsciiString({ collapseSharps: false })).toBe('Bb');
});
test('AbstractIntervalIgnoringOctaves.toJapanese', () => {
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: 0,
    }).toJapanese()).toBe('完全1度');
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: 2,
    }).toJapanese()).toBe('長2度');
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: -4,
    }).toJapanese()).toBe('短6度');
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: 7,
    }).toJapanese()).toBe('増1度');
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: -9,
    }).toJapanese()).toBe('減7度');
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: 13,
    }).toJapanese()).toBe('重増4度');
    expect(new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: -13,
    }).toJapanese()).toBe('重減5度');
});
test('AbstractIntervalIgnoringOctaves.toInverted', () => {
    const major2nd = new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: 2,
    });
    expect(major2nd.toJapanese()).toBe('長2度');
    expect(major2nd.toInverted().toJapanese()).toBe('短7度');
});
test('AbstractIntervalIgnoringOctaves.{above, below}', () => {
    const major2nd = new index_1.AbstractIntervalIgnoringOctaves({
        numPerfectFifthsAbove: 2,
    });
    expect(major2nd.toJapanese()).toBe('長2度');
    const fSharp = new index_1.AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 3,
    });
    expect(fSharp.toAsciiString({ collapseSharps: false })).toBe('F#');
    expect(major2nd.above(fSharp).toAsciiString({ collapseSharps: false })).toBe('G#');
    expect(major2nd.below(fSharp).toAsciiString({ collapseSharps: false })).toBe('E');
});
