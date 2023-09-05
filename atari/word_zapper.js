
class ROM {
    constructor()
    {
        this._bytes = new Uint8Array(4096);
        this._character_bank = "";
        this._word_bank = [];
        this._dirty = false;
    }

    load(bytes) {
        this._bytes = bytes;
        this._dirty = true;
    }

    refresh() {
        this._character_bank = "";
        for (let i = 0; i < 16; i++) {
            let byte1 = rom._bytes[0x09b3 + i];
            let char_index = byte1 - 0x41 + "A".charCodeAt(0);
            let char = String.fromCharCode(char_index);
            this._character_bank += char;
        }
        this._word_bank = [];
        for (let i = 0; i < 16; i++) {
            let byte1 = rom._bytes[0x09c3 + 2 * i + 0];
            let byte2 = rom._bytes[0x09c3 + 2 * i + 1];
            let index1 = byte1 % 16;
            let index2 = Math.floor(byte1 / 16);
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let word = "" +
                this._character_bank[index3] +
                this._character_bank[index4] +
                this._character_bank[index1] +
                this._character_bank[index2];
            this._word_bank.push(word);
        }
        this._dirty = false;
    }

    get character_bank() {
        if (this._dirty) {
            this.refresh();
        }
        let result = this._character_bank;
        return result;
    }

    get word_bank() {
        if (this._dirty) {
            this.refresh();
        }
        let result = this._word_bank;
        return result;
    }
    
    peek(address) {
        if (this._dirty) {
            this.refresh();
        }
        let result = this._bytes[address];
        return result;
    }
    
    poke(address, value) {
        this._bytes[address] = value;
        this._dirty = true;
    }
}

class WordZapper {
    constructor()
    {
        this.char_bank = "ETOAINSHRDLUPFMC";
        this.word_bank = new Set([
            'LAST',
            'DUST',
            'RAIN',
            'SHED',
            'FAST',
            'FOUR',
            'MARS',
            'POOF',
            'STAR',
            'MOON',
            'SHIP',
            'FIRE',
            'SHOT',
            'THEM',
            'TIME',
            'LAND',
            'SAUCE',
            'SPACE',
            'SPELL',
            'FLASH',
            'LASER',
            'SHOOT',
            'TIMER',
            'RESET',
            'COLOR',
            'SUPER',
            'COUNT',
            'FLAME',
            'SPACE', // NOTE(sestren): This duplicate entry was found in the original ROM, making SPACE the most common 5-letter word
            'ALIEN',
            'SOUND',
            'THREE',
            'SAUCER',
            'METEOR',
            'RANDOM',
            'LETTER',
            'SELECT',
            'STRIPE',
            'PLEASE',
            'ACTION',
            'PUFFER',
            'SCREEN',
            'SCROLL',
            'UNSAFE',
            'ROTATE',
            'NETHER',
            'MANUAL',
            'DIRECT',
        ]);
    }
}

var rom = new ROM();
var binFile = document.getElementById('bin-file');
const reader = new FileReader();
var game = new WordZapper();

reader.addEventListener('load', function() {
    rom.load(new Uint8Array(reader.result));
    console.log(rom.character_bank);
    console.log(rom.word_bank);
})

reader.addEventListener('error', function() {
    console.log(reader.error);
})

binFile.addEventListener('change', function() {
    let file = binFile.files[0];
    reader.readAsArrayBuffer(file);
});