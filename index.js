"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPitchMeasuredFromA4 = void 0;
class AbstractPitchMeasuredFromA4 {
    numPerfectFifthsAbove;
    numOctaveAbove;
    constructor(o) {
        this.numOctaveAbove = o.numOctaveAbove;
        this.numPerfectFifthsAbove = o.numPerfectFifthsAbove;
    }
    toAsciiString(config) {
        // First, we have to decide the pitch class
        // Depending on numPerfectFifthsAbove, 
        //
        //       -9 -8 -7 -6 -5
        // Fb Cb Gb Db Ab Eb Bb
        // 
        // -4 -3 -2 -1  0  1  2
        //  F  C  G  D  A  E  B
        // 
        //  3  4  5  6  7  8  9
        // F# C# G# D# A# E# B#
        const mod7 = ((this.numPerfectFifthsAbove % 7) + 7) % 7;
        const baseNote = "AEBFCGD"[mod7];
        const numberOfSharps = Math.floor((this.numPerfectFifthsAbove + 4) / 7);
        const accidentals = (() => {
            if (numberOfSharps <= 0) {
                return "b".repeat(-numberOfSharps);
            }
            if (config.collapseSharps) {
                return `${"#".repeat(numberOfSharps % 2)}${"x".repeat(Math.floor(numberOfSharps / 2))}`;
            }
            return "#".repeat(numberOfSharps);
        })();
        const pitchClass = `${baseNote}${accidentals}`;
        // now, we have to decide the octave
        // -11 | -10   -9   |  -8     -7 |  -6    -5 |  
        // Fb-2   Cb-1  Gb-1    Db0    Ab0   Eb1    Bb1 
        //
        // -4  | -3   -2   |  -1     0  |   1     2 |  
        // F2     C3    G3    D4     A4    E5     B5    
        //
        //   3 |   4     5 |   6      7 |   8      9
        // F#6    C#7   G#7   D#8    A#8   E#9    B#9
        const octaveDueToPerfectFifths = [4, 5, 5, 6, 7, 7, 8][mod7] + Math.floor(this.numPerfectFifthsAbove / 7) * 4;
        const whichOctave = octaveDueToPerfectFifths + this.numOctaveAbove;
        return `${pitchClass}${whichOctave}`;
    }
}
exports.AbstractPitchMeasuredFromA4 = AbstractPitchMeasuredFromA4;
