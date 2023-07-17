import { AbstractPitchClassMeasuredFromA, AbstractPitchMeasuredFromA4 } from "./index";

test('AbstractPitchMeasuredFromA4.toAsciiString', () => {
    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 0,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('A4');

    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 3,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('F#6');

    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 3,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: false })).toBe('F#1');

    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 10,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: false })).toBe('F##5');

    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 10,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: true })).toBe('Fx5');

    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: -5,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('Bb1');
});

test('AbstractPitchMeasuredFromA4.toMidiNoteNumberAssuming12TET', () => {
    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 0,
        numOctaveAbove: 0
    }).toMidiNoteNumberAssuming12TET()).toBe(69);

    expect(new AbstractPitchMeasuredFromA4({
        numPerfectFifthsAbove: 10,
        numOctaveAbove: -5
    }).toMidiNoteNumberAssuming12TET()).toBe(79);
});

test('AbstractPitchClassMeasuredFromA.toAsciiString', () => {
    expect(new AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 0,
    }).toAsciiString({ collapseSharps: false })).toBe('A');

    expect(new AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 3,
    }).toAsciiString({ collapseSharps: false })).toBe('F#');

    expect(new AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 3
    }).toAsciiString({ collapseSharps: false })).toBe('F#');

    expect(new AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 10,
    }).toAsciiString({ collapseSharps: false })).toBe('F##');

    expect(new AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: 10,
    }).toAsciiString({ collapseSharps: true })).toBe('Fx');

    expect(new AbstractPitchClassMeasuredFromA({
        numPerfectFifthsAbove: -5,
    }).toAsciiString({ collapseSharps: false })).toBe('Bb');
});
