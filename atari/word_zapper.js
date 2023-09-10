
class ROM {
    constructor()
    {
        this._bytes = new Uint8Array(4096);
    }

    load(bytes) {
        this._bytes = bytes;
    }

    get character_bank() {
        let result = "";
        for (let i = 0; i < 16; i++) {
            let byte1 = rom._bytes[0x09b3 + i];
            let char_index = byte1 - 0x41 + "A".charCodeAt(0);
            let char = String.fromCharCode(char_index);
            result += char;
        }
        return result;
    }

    set character_bank(value) {
        for (let i = 0; i < 16; i++) {
            let byte = value.charCodeAt(i) - "A".charCodeAt(0) + 0x41;
            rom._bytes[0x09b3 + i] = byte;
        }
    }

    get word_bank() {
        let character_bank = this.character_bank;
        let result = [];
        // 4-letter words
        for (let i = 0; i < 16; i++) {
            let byte1 = rom._bytes[0x09c3 + 2 * i + 0];
            let byte2 = rom._bytes[0x09c3 + 2 * i + 1];
            let index1 = byte1 % 16;
            let index2 = Math.floor(byte1 / 16);
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let word = "" +
                character_bank[index3] +
                character_bank[index4] +
                character_bank[index1] +
                character_bank[index2];
            result.push(word);
        }
        // 5-letter words
        for (let i = 0; i < 16; i++) {
            let byte1 = rom._bytes[0x09e3 + 3 * i + 0];
            let byte2 = rom._bytes[0x09e3 + 3 * i + 1];
            let byte3 = rom._bytes[0x09e3 + 3 * i + 2];
            let index1 = byte1 % 16;
            // let index2 = Math.floor(byte1 / 16); // NOT USED
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let index5 = byte3 % 16;
            let index6 = Math.floor(byte3 / 16);
            let word = "" +
                character_bank[index5] +
                character_bank[index6] +
                character_bank[index3] +
                character_bank[index4] +
                character_bank[index1];
            result.push(word);
        }
        // 6-letter words
        for (let i = 0; i < 16; i++) {
            let byte1 = rom._bytes[0x0a13 + 3 * i + 0];
            let byte2 = rom._bytes[0x0a13 + 3 * i + 1];
            let byte3 = rom._bytes[0x0a13 + 3 * i + 2];
            let index1 = byte1 % 16;
            let index2 = Math.floor(byte1 / 16);
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let index5 = byte3 % 16;
            let index6 = Math.floor(byte3 / 16);
            let word = "" +
                character_bank[index5] +
                character_bank[index6] +
                character_bank[index3] +
                character_bank[index4] +
                character_bank[index1] +
                character_bank[index2];
            result.push(word);
        }
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
        let prev_value = this._bytes[address];
        if (value != prev_value) {
            this._bytes[address] = value;
            this._dirty = true;
        }
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
var binFile = document.getElementById('bin_file');
const reader = new FileReader();
// var game = new WordZapper();

reader.addEventListener('load', function() {
    rom.load(new Uint8Array(reader.result));
    console.log(rom.character_bank);
    rom.character_bank = "ABCDEFGHIJKLMNOP";
    console.log(rom.character_bank);
    document.getElementById('character_bank').value = rom.character_bank;
    console.log(rom.word_bank);
    rom.character_bank = "ETOAINSHRDLUPFMC";
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