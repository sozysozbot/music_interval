export class AbstractPitchClassMeasuredFromA {
    readonly numP5Above: number;
    constructor(o: { numP5Above: number }) {
        this.numP5Above = o.numP5Above;
    }

    toAsciiString(config: { collapseSharps: boolean }): string {
        // First, we have to decide the pitch class
        // Depending on numP5Above, 
        //
        //       -9 -8 -7 -6 -5
        // Fb Cb Gb Db Ab Eb Bb
        // 
        // -4 -3 -2 -1  0  1  2
        //  F  C  G  D  A  E  B
        // 
        //  3  4  5  6  7  8  9
        // F# C# G# D# A# E# B#
        const mod7 = ((this.numP5Above % 7) + 7) % 7;
        const baseNote = "AEBFCGD"[mod7];
        const numberOfSharps = Math.floor((this.numP5Above + 4) / 7);
        const accidentals: string = (() => {
            if (numberOfSharps <= 0) {
                return "b".repeat(-numberOfSharps);
            }
            if (config.collapseSharps) {
                return `${"#".repeat(numberOfSharps % 2)}${"x".repeat(Math.floor(numberOfSharps / 2))}`;
            }
            return "#".repeat(numberOfSharps);
        })();
        const pitchClass: string = `${baseNote}${accidentals}`;
        return pitchClass;
    }
}

export class AbstractPitchMeasuredFromA4 {
    readonly numP5Above: number;
    readonly numOctaveAbove: number;

    constructor(o: {
        numP5Above: number,
        numOctaveAbove: number
    }) {
        this.numOctaveAbove = o.numOctaveAbove;
        this.numP5Above = o.numP5Above;
    }

    toAsciiString(config: { collapseSharps: boolean }): string {
        const pitchClass: string = new AbstractPitchClassMeasuredFromA({ numP5Above: this.numP5Above }).toAsciiString(config);
        const mod7 = ((this.numP5Above % 7) + 7) % 7;
        // now, we have to decide the octave
        // -11 | -10   -9   |  -8     -7 |  -6    -5 |  
        // Fb-2   Cb-1  Gb-1    Db0    Ab0   Eb1    Bb1 
        //
        // -4  | -3   -2   |  -1     0  |   1     2 |  
        // F2     C3    G3    D4     A4    E5     B5    
        //
        //   3 |   4     5 |   6      7 |   8      9
        // F#6    C#7   G#7   D#8    A#8   E#9    B#9
        const octaveDueToPerfectFifths = [4, 5, 5, 6, 7, 7, 8][mod7] + Math.floor(this.numP5Above / 7) * 4;
        const whichOctave = octaveDueToPerfectFifths + this.numOctaveAbove;
        return `${pitchClass}${whichOctave}`;
    }

    toMidiNoteNumberAssuming12TET() {
        return 69 + 7 * this.numP5Above + 12 * this.numOctaveAbove;
    }
}

export class AbstractIntervalIgnoringOctaves {
    readonly numP5Above: number;

    constructor(o: {
        numP5Above: number,
    }) {
        this.numP5Above = o.numP5Above;
    }

    //-12 Dbb 減2度
    //-11 Abb 減6度
    //-10 Ebb 減3度
    // -9 Bbb 減7度
    // -8 Fb  減4度
    // -7 Cb  減1度
    // -6 Gb  減5度
    //============
    // -5 Db  短2度
    // -4 Ab  短6度
    // -3 Eb  短3度
    // -2 Bb  短7度
    //============
    // -1 F   完全4度
    //  0 C   完全1度
    //  1 G   完全5度
    //============
    //  2 D   長2度
    //  3 A   長6度
    //  4 E   長3度
    //  5 B   長7度
    //============
    //  6 F#  増4度
    //  7 C#  増1度
    //  8 G#  増5度
    //  9 D#  増2度
    // 10 A#  増6度
    // 11 E#  増3度
    // 12 B#  増7度
    //============
    // 13 Fx  重増4度
    // 14 Cx  重増1度
    // 15 Gx  重増5度
    // 16 Dx  重増2度
    // 17 Ax  重増6度
    // 18 Ex  重増3度
    // 19 Bx  重増7度
    toJapanese() {
        const mod7 = ((this.numP5Above % 7) + 7) % 7;
        const degree = [1, 5, 2, 6, 3, 7, 4][mod7];
        const quality: string = (() => {
            const abs = Math.abs(this.numP5Above);
            if (abs <= 1) {
                return "完全";
            } else if (abs <= 5) {
                return this.numP5Above > 0 ? "長" : "短";
            } else if (abs <= 12) {
                return this.numP5Above > 0 ? "増" : "減";
            } else {
                //13 - 19: 重増 / 重減
                //20 - 26: 重々増 / 重々減
                //27 - 33: 重々々増 / 重々々減
                return `重${"々".repeat(Math.floor((abs - 13) / 7))}${this.numP5Above > 0 ? "増" : "減"}`;
            }
        })();
        return `${quality}${degree}度`;
    }

    toInverted() {
        return new AbstractIntervalIgnoringOctaves({ numP5Above: -this.numP5Above });
    }

    above(pitchClass: AbstractPitchClassMeasuredFromA) {
        return new AbstractPitchClassMeasuredFromA({
            numP5Above: pitchClass.numP5Above + this.numP5Above
        });
    }

    below(pitchClass: AbstractPitchClassMeasuredFromA) {
        return new AbstractPitchClassMeasuredFromA({
            numP5Above: pitchClass.numP5Above - this.numP5Above
        });
    }
}