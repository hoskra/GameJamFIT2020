import Vec from '../utils/vec';


enum ParserMode {
  UNDEFINED = '', // not yet defined parser node (usually before it gets the very first token)
  PATHS = ':paths',
  TEXTURES = ':textures',
  SPECIAL_FUNCTIONS = ':special_functions'
}

class RawMapTile {
  pos: Vec;
  walkableCode: number; // path index (0 for walkable, everything else is non-walkable)
  defaultTexture: number; // default texture index
  specialFunction: number;
}

class RawMap {
  rows: number;
  columns: number;
  cells: Map<number, RawMapTile> = new Map();
}

abstract class Parser {
  protected rows = 0;
  protected columns = 0;
  protected tokens = [];

  public parseLine(line: string, linenum: number) {
    let parsedLetters = 0;

    // parse each letter of each line
    for (let letter of line) {
      if(this.parseLetter(letter)) {
        parsedLetters++;
      } else if (letter !== ' ') { // ignore whitespaces
        throw new Error(`Unexpected token ${letter} on line ${linenum}:${parsedLetters+1}`);
      }
    }

    if (parsedLetters !== 0) {
      if (this.columns === 0) {
        this.columns = parsedLetters; // get number of columns
      } else if (this.columns !== parsedLetters) {
        throw new Error(`Wrong number of tokens on line ${linenum}; expected ${this.columns} columns, found ${parsedLetters}`);
      }

      this.rows++;
    }
  }

  public finalize(output: RawMap) {
    // check the size
    if((output.columns && output.columns !== this.columns)
    || (output.rows && output.rows !== this.rows)) {
      throw new Error(`Error while parsing paths, unexpected size of the map: expected ${this.columns}x${this.rows}, found ${output.columns}x${output.rows}`);
    }

    output.columns = this.columns;
    output.rows = this.rows;

    // init maptiles
    let allBlocks = this.columns * this.rows;
    for(let i =0; i< allBlocks; i++) {
      if(!output.cells.has(i)) {
        output.cells.set(i, new RawMapTile());
        output.cells.get(i).pos = new Vec(i % this.columns, Math.floor(i / this.columns));
      }
    }
  }

  protected abstract parseLetter(letter: string): boolean;
}

/**
 * Parser for walkable paths
 */
class PathParser extends Parser {

  public parseLetter(letter: string): boolean {
    if (/^[0-9a-fA-F]+$/.test(letter)) {
      this.tokens.push(parseInt(`0x${letter}`));
      return true;
    }
    return false;
  }

  public finalize(output: RawMap) {
    super.finalize(output);

    let mapBlocks = this.columns * this.rows;

    for(let i =0; i < mapBlocks; i++) {
      output.cells.get(i).walkableCode = this.tokens[i];
    }
  }
}

/**
 * Parser for texture indices
 */
class TexturesParser extends Parser {

  public parseLetter(letter: string): boolean {
    if (/^[0-9]+$/.test(letter)) {
      this.tokens.push(parseInt(`0x${letter}`));
      return true;
    }
    return false;
  }

  public finalize(output: RawMap) {
    super.finalize(output);

    let mapBlocks = this.columns * this.rows;

    for(let i =0; i < mapBlocks; i++) {
      output.cells.get(i).defaultTexture = this.tokens[i];
    }
  }
}

/**
 * Parser for special functions
 */
class FunctionsParser extends Parser {

  public parseLetter(letter: string): boolean {
    if (/^[0-9]+$/.test(letter)) {
      this.tokens.push(parseInt(letter));
      return true;
    }
    return false;
  }

  public finalize(output: RawMap) {
    super.finalize(output);

    let mapBlocks = this.columns * this.rows;

    for(let i =0; i<mapBlocks; i++) {
      output.cells.get(i).specialFunction = this.tokens[i];
    }
  }
}

/**
 * TXT Map file loader
 */
export class MapLoader {

  private parsers = {};
  private currentParser: Parser;

  constructor() {
    // init
    this.parsers[ParserMode.PATHS] = new PathParser();
    this.parsers[ParserMode.TEXTURES] = new TexturesParser();
    this.parsers[ParserMode.SPECIAL_FUNCTIONS] = new FunctionsParser();
  }

  public loadMap(content: string): RawMap {
    let output = new RawMap();

    // start with undefined mode (until we get the first :xxx token)
    let currentMode = ParserMode.UNDEFINED;
    let lineCounter = 0;

    // split the file into lines
    content.split('\n').forEach(line => {
      lineCounter++;
      const linetr = line.trim().toLowerCase();

      // skip comments and empty lines
      if (linetr.startsWith('//') || linetr.length === 0) {
        return;
      }

      let mode = this.checkModeLabel(linetr, currentMode);

      if(mode !== currentMode) {
        // new label detected -> switch to appropriate parser
        currentMode = mode;
        let newParser = this.parsers[currentMode];
        if(this.currentParser) {
          // finalize the previous parser before we move to the next one
          this.currentParser.finalize(output);
        }
        this.currentParser = newParser;
        return; // go to the next line
      }

      if(mode !== ParserMode.UNDEFINED) {
        this.currentParser.parseLine(linetr, lineCounter);
      }
    });

    if(!this.currentParser) {
      throw new Error('Error while parsing the map. No valid data found.');
    }

    // finalize last parser
    this.currentParser.finalize(output);
    return output;
  }

  private checkModeLabel(line: string, currentMode: ParserMode): ParserMode {
    // mode switch. And yeah, it's very sleek
    if (line.startsWith(':')) {
      switch (line) {
        case ParserMode.PATHS:
        case ParserMode.TEXTURES:
        case ParserMode.SPECIAL_FUNCTIONS:
          return line as ParserMode;
        default:
          throw new Error('Unknown error mode switch');
      }
    }
    return currentMode;
  }
}