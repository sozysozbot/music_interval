import {
    PitchClassMeasuredFromA,
    PitchMeasuredFromA4,
    IntervalIgnoringOctaves,
    SignedInterval,
} from "./index";

test('PitchMeasuredFromA4.toAsciiString', () => {
    expect(new PitchMeasuredFromA4({
        numP5Above: 0,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('A4');

    expect(new PitchMeasuredFromA4({
        numP5Above: 3,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('F#6');

    expect(new PitchMeasuredFromA4({
        numP5Above: 3,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: false })).toBe('F#1');

    expect(new PitchMeasuredFromA4({
        numP5Above: 10,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: false })).toBe('F##5');

    expect(new PitchMeasuredFromA4({
        numP5Above: 10,
        numOctaveAbove: -5
    }).toAsciiString({ collapseSharps: true })).toBe('Fx5');

    expect(new PitchMeasuredFromA4({
        numP5Above: -5,
        numOctaveAbove: 0
    }).toAsciiString({ collapseSharps: false })).toBe('Bb1');

    expect(new PitchMeasuredFromA4({
        numP5Above: -3,
        numOctaveAbove: -3
    }).toAsciiString({ collapseSharps: false })).toBe('C0');
});

test('PitchMeasuredFromA4.toMidiNoteNumberAssuming12TET', () => {
    expect(new PitchMeasuredFromA4({
        numP5Above: 0,
        numOctaveAbove: 0
    }).toMidiNoteNumberAssuming12TET()).toBe(69);

    expect(new PitchMeasuredFromA4({
        numP5Above: 10,
        numOctaveAbove: -5
    }).toMidiNoteNumberAssuming12TET()).toBe(79);
});

test('PitchClassMeasuredFromA.toAsciiString', () => {
    expect(new PitchClassMeasuredFromA({
        numP5Above: 0,
    }).toAsciiString({ collapseSharps: false })).toBe('A');

    expect(new PitchClassMeasuredFromA({
        numP5Above: 3,
    }).toAsciiString({ collapseSharps: false })).toBe('F#');

    expect(new PitchClassMeasuredFromA({
        numP5Above: 3
    }).toAsciiString({ collapseSharps: false })).toBe('F#');

    expect(new PitchClassMeasuredFromA({
        numP5Above: 10,
    }).toAsciiString({ collapseSharps: false })).toBe('F##');

    expect(new PitchClassMeasuredFromA({
        numP5Above: 10,
    }).toAsciiString({ collapseSharps: true })).toBe('Fx');

    expect(new PitchClassMeasuredFromA({
        numP5Above: -5,
    }).toAsciiString({ collapseSharps: false })).toBe('Bb');
});

test('IntervalIgnoringOctaves.toJapanese', () => {
    expect(new IntervalIgnoringOctaves({
        numP5Above: 0,
    }).toJapanese()).toBe('完全1度');

    expect(new IntervalIgnoringOctaves({
        numP5Above: 2,
    }).toJapanese()).toBe('長2度');

    expect(new IntervalIgnoringOctaves({
        numP5Above: -4,
    }).toJapanese()).toBe('短6度');

    expect(new IntervalIgnoringOctaves({
        numP5Above: 7,
    }).toJapanese()).toBe('増1度');

    expect(new IntervalIgnoringOctaves({
        numP5Above: -9,
    }).toJapanese()).toBe('減7度');

    expect(new IntervalIgnoringOctaves({
        numP5Above: 13,
    }).toJapanese()).toBe('重増4度');

    expect(new IntervalIgnoringOctaves({
        numP5Above: -13,
    }).toJapanese()).toBe('重減5度');
});

test('IntervalIgnoringOctaves.toInverted', () => {
    const major2nd = new IntervalIgnoringOctaves({
        numP5Above: 2,
    });

    expect(major2nd.toJapanese()).toBe('長2度');
    expect(major2nd.toInverted().toJapanese()).toBe('短7度');
});

test('IntervalIgnoringOctaves.{above, below}', () => {
    const major2nd = new IntervalIgnoringOctaves({
        numP5Above: 2,
    });
    expect(major2nd.toJapanese()).toBe('長2度');

    const fSharp = new PitchClassMeasuredFromA({
        numP5Above: 3,
    });
    expect(fSharp.toAsciiString({ collapseSharps: false })).toBe('F#');

    expect(major2nd.above(fSharp).toAsciiString({ collapseSharps: false })).toBe('G#');
    expect(major2nd.below(fSharp).toAsciiString({ collapseSharps: false })).toBe('E');
});

test('SignedInterval', () => {
    expect(new SignedInterval({
        numP5Above: 0,
        numOctaveAbove: 0,
    }).toJapanese()).toBe('完全1度');

    expect(new SignedInterval({
        numP5Above: 0,
        numOctaveAbove: 1,
    }).toJapanese()).toBe('完全8度上');

    expect(new SignedInterval({
        numP5Above: 0,
        numOctaveAbove: -1,
    }).toJapanese()).toBe('完全8度下');

    expect(new SignedInterval({
        numP5Above: 2,
        numOctaveAbove: -1,
    }).toJapanese()).toBe('長2度上');

    expect(new SignedInterval({
        numP5Above: -2,
        numOctaveAbove: 1,
    }).toJapanese()).toBe('長2度下');

    expect(new SignedInterval({
        numP5Above: -4,
        numOctaveAbove: 3
    }).toJapanese()).toBe('短6度上');

    expect(new SignedInterval({
        numP5Above: 7,
        numOctaveAbove: -4
    }).toJapanese()).toBe('増1度上');

    expect(new SignedInterval({
        numP5Above: -9,
        numOctaveAbove: 6
    }).toJapanese()).toBe('減7度上');

    expect(new SignedInterval({
        numP5Above: 13, 
        numOctaveAbove: -7
    }).toJapanese()).toBe('重増4度上');

    expect(new SignedInterval({
        numP5Above: 13,
        numOctaveAbove: -8
    }).toJapanese()).toBe('重減5度下');
});