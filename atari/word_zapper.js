
class ROM {
    constructor()
    {
        this._bytes = new Uint8Array(4096);
    }

    load(bytes) {
        this._bytes = bytes;
    }

    get title() {
        let result = [];
        for (let row = 0; row < 3; row++) {
            let word = "";
            for (let col = 0; col < 6; col++) {
                let byte = this._bytes[0x0ace + 6 * row + col];
                let char = " ";
                if (byte >= 0x41) {
                    let char_index = byte - 0x41 + "A".charCodeAt(0);
                    char = String.fromCharCode(char_index);
                }
                word += char;
            }
            result.push(word);
        }
        return result;
    }

    set title(value) {
        let chars = this.character_bank;
        let row = 0;
        value.forEach((line) => {
            for (let col = 0; col < 6; col++) {
                let byte = 0x2f;
                if (col < line.length) {
                    let char = line.charAt(col).toUpperCase();
                    if (char.match(/[A-Z]/i)) {
                        byte = 0x41 + char.charCodeAt(0) - "A".charCodeAt(0);
                    }
                }
                this._bytes[0x0ace + 6 * row + col] = byte;
            }
            row += 1;
        });
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
        let chars = this.character_bank;
        let result = [];
        // 4-letter words
        for (let i = 0; i < 16; i++) {
            let byte1 = this._bytes[0x09c3 + 2 * i + 0];
            let byte2 = this._bytes[0x09c3 + 2 * i + 1];
            let index1 = byte1 % 16;
            let index2 = Math.floor(byte1 / 16);
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let word = "" +
                chars[index3] +
                chars[index4] +
                chars[index1] +
                chars[index2];
            result.push(word);
        }
        // 5-letter words
        for (let i = 0; i < 16; i++) {
            let byte1 = this._bytes[0x09e3 + 3 * i + 0];
            let byte2 = this._bytes[0x09e3 + 3 * i + 1];
            let byte3 = this._bytes[0x09e3 + 3 * i + 2];
            let index1 = byte1 % 16;
            // NOTE(sestren): One of the nibbles is left unused for 5-letter words
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let index5 = byte3 % 16;
            let index6 = Math.floor(byte3 / 16);
            let word = "" +
                chars[index5] +
                chars[index6] +
                chars[index3] +
                chars[index4] +
                chars[index1];
            result.push(word);
        }
        // 6-letter words
        for (let i = 0; i < 16; i++) {
            let byte1 = this._bytes[0x0a13 + 3 * i + 0];
            let byte2 = this._bytes[0x0a13 + 3 * i + 1];
            let byte3 = this._bytes[0x0a13 + 3 * i + 2];
            let index1 = byte1 % 16;
            let index2 = Math.floor(byte1 / 16);
            let index3 = byte2 % 16;
            let index4 = Math.floor(byte2 / 16);
            let index5 = byte3 % 16;
            let index6 = Math.floor(byte3 / 16);
            let word = "" +
                chars[index5] +
                chars[index6] +
                chars[index3] +
                chars[index4] +
                chars[index1] +
                chars[index2];
            result.push(word);
        }
        return result;
    }

    set word_bank(value) {
        let chars = this.character_bank;
        let count4 = 0;
        let count5 = 0;
        let count6 = 0;
        value.forEach((word) => {
            // Add 4-letter word to the word bank
            if (word.length == 4 && count4 < 16) {
                let index1 = chars.indexOf(word.charAt(0));
                let index2 = chars.indexOf(word.charAt(1));
                let index3 = chars.indexOf(word.charAt(2));
                let index4 = chars.indexOf(word.charAt(3));
                this._bytes[0x09c3 + 2 * count4 + 0] = (0x10 * index4) | index3;
                this._bytes[0x09c3 + 2 * count4 + 1] = (0x10 * index2) | index1;
                count4 += 1;
            }
            // Add 5-letter word to the word bank
            else if (word.length == 5 && count5 < 16) {
                let index1 = chars.indexOf(word.charAt(0));
                let index2 = chars.indexOf(word.charAt(1));
                let index3 = chars.indexOf(word.charAt(2));
                let index4 = chars.indexOf(word.charAt(3));
                let index5 = chars.indexOf(word.charAt(4));
                let index6 = 0;
                this._bytes[0x09e3 + 3 * count5 + 0] = (0x10 * index6) | index5;
                this._bytes[0x09e3 + 3 * count5 + 1] = (0x10 * index4) | index3;
                this._bytes[0x09e3 + 3 * count5 + 2] = (0x10 * index2) | index1;
                count5 += 1;
            }
            // Add 6-letter word to the word bank
            else if (word.length == 6 && count6 < 16) {
                let index1 = chars.indexOf(word.charAt(0));
                let index2 = chars.indexOf(word.charAt(1));
                let index3 = chars.indexOf(word.charAt(2));
                let index4 = chars.indexOf(word.charAt(3));
                let index5 = chars.indexOf(word.charAt(4));
                let index6 = chars.indexOf(word.charAt(5));
                this._bytes[0x0a13 + 3 * count6 + 0] = (0x10 * index6) | index5;
                this._bytes[0x0a13 + 3 * count6 + 1] = (0x10 * index4) | index3;
                this._bytes[0x0a13 + 3 * count6 + 2] = (0x10 * index2) | index1;
                count6 += 1;
            }
        });
    }
    
    peek(address) {
        let result = this._bytes[address];
        return result;
    }
    
    poke(address, value) {
        let prev_value = this._bytes[address];
        if (value != prev_value) {
            this._bytes[address] = value;
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
// var game = new WordZapper();

binFile.addEventListener('change', function() {
    let file = binFile.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        rom.load(new Uint8Array(reader.result));
        console.log(rom.character_bank);
        console.log(rom.word_bank);
        console.log(rom.title);
        let title = rom.title;
        title[0] = "SWORDS";
        title[1] = "ABCDEF";
        title[2] = " O O O";
        rom.title = title;
        console.log(rom.title);
        // Create link to downloadable file
        var data = new Blob([rom._bytes], {
            type: 'application/octet-binary',
        });
        var dataURL = window.URL.createObjectURL(data);
        var link = document.getElementById('download');
        link.innerHTML = 'Download patched_rom.bin';
        link.download = "patched_rom.bin";
        link.href = dataURL;
    })
    reader.addEventListener('error', function() {
        console.log(reader.error);
    })
    reader.readAsArrayBuffer(file);
});
