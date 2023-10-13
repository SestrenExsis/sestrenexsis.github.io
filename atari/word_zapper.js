
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

    get intro() {
        let cols = 4;
        let result = [];
        for (let row = 0; row < 3; row++) {
            let word = "";
            for (let col = 0; col < cols; col++) {
                let byte = this._bytes[0x0abc + 6 * row + col];
                let char = " ";
                if (byte >= 0x41) {
                    let char_index = byte - 0x41 + "A".charCodeAt(0);
                    char = String.fromCharCode(char_index);
                }
                word += char;
            }
            result.push(word);
            cols = 6;
        }
        return result;
    }

    set intro(value) {
        let row = 0;
        let cols = 4;
        value.forEach((line) => {
            for (let col = 0; col < cols; col++) {
                let byte = 0x2f;
                if (col < line.length) {
                    let char = line.charAt(col).toUpperCase();
                    if (char.match(/[A-Z]/i)) {
                        byte = 0x41 + char.charCodeAt(0) - "A".charCodeAt(0);
                    }
                }
                this._bytes[0x0abc + 6 * row + col] = byte;
            }
            cols = 6;
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
// var game = new WordZapper();

function refresh() {
    let file = document.getElementById('bin_file').files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        rom.load(new Uint8Array(reader.result));
        // Title
        let title = rom.title
        title[0] = document.getElementById('title1').value;
        title[1] = document.getElementById('title2').value;
        title[2] = document.getElementById('title3').value;
        rom.title = title;
        // Intro
        let intro = rom.intro
        intro[0] = document.getElementById('intro1').value;
        intro[1] = document.getElementById('intro2').value;
        intro[2] = document.getElementById('intro3').value;
        rom.intro = intro;
        // Word Bank
        let word_bank = rom.word_bank
        // 4-letter words
        word_bank[0 + 0] = document.getElementById('word4a').value;
        word_bank[0 + 1] = document.getElementById('word4b').value;
        word_bank[0 + 2] = document.getElementById('word4c').value;
        word_bank[0 + 3] = document.getElementById('word4d').value;
        word_bank[0 + 4] = document.getElementById('word4e').value;
        word_bank[0 + 5] = document.getElementById('word4f').value;
        word_bank[0 + 6] = document.getElementById('word4g').value;
        word_bank[0 + 7] = document.getElementById('word4h').value;
        word_bank[0 + 8] = document.getElementById('word4i').value;
        word_bank[0 + 9] = document.getElementById('word4j').value;
        word_bank[0 + 10] = document.getElementById('word4k').value;
        word_bank[0 + 11] = document.getElementById('word4l').value;
        word_bank[0 + 12] = document.getElementById('word4m').value;
        word_bank[0 + 13] = document.getElementById('word4n').value;
        word_bank[0 + 14] = document.getElementById('word4o').value;
        word_bank[0 + 15] = document.getElementById('word4p').value;
        // 5-letter words
        word_bank[16 + 0] = document.getElementById('word5a').value;
        word_bank[16 + 1] = document.getElementById('word5b').value;
        word_bank[16 + 2] = document.getElementById('word5c').value;
        word_bank[16 + 3] = document.getElementById('word5d').value;
        word_bank[16 + 4] = document.getElementById('word5e').value;
        word_bank[16 + 5] = document.getElementById('word5f').value;
        word_bank[16 + 6] = document.getElementById('word5g').value;
        word_bank[16 + 7] = document.getElementById('word5h').value;
        word_bank[16 + 8] = document.getElementById('word5i').value;
        word_bank[16 + 9] = document.getElementById('word5j').value;
        word_bank[16 + 10] = document.getElementById('word5k').value;
        word_bank[16 + 11] = document.getElementById('word5l').value;
        word_bank[16 + 12] = document.getElementById('word5m').value;
        word_bank[16 + 13] = document.getElementById('word5n').value;
        word_bank[16 + 14] = document.getElementById('word5o').value;
        word_bank[16 + 15] = document.getElementById('word5p').value;
        // 6-letter words
        word_bank[32 + 0] = document.getElementById('word6a').value;
        word_bank[32 + 1] = document.getElementById('word6b').value;
        word_bank[32 + 2] = document.getElementById('word6c').value;
        word_bank[32 + 3] = document.getElementById('word6d').value;
        word_bank[32 + 4] = document.getElementById('word6e').value;
        word_bank[32 + 5] = document.getElementById('word6f').value;
        word_bank[32 + 6] = document.getElementById('word6g').value;
        word_bank[32 + 7] = document.getElementById('word6h').value;
        word_bank[32 + 8] = document.getElementById('word6i').value;
        word_bank[32 + 9] = document.getElementById('word6j').value;
        word_bank[32 + 10] = document.getElementById('word6k').value;
        word_bank[32 + 11] = document.getElementById('word6l').value;
        word_bank[32 + 12] = document.getElementById('word6m').value;
        word_bank[32 + 13] = document.getElementById('word6n').value;
        word_bank[32 + 14] = document.getElementById('word6o').value;
        word_bank[32 + 15] = document.getElementById('word6p').value;
        // Character bank
        let chars_used = new Set();
        word_bank.forEach((word) => {
            for (let i = 0; i < word.length; i++) {
                let char = word.charAt(i);
                chars_used.add(char);
            }
        });
        let character_bank = "";
        Array.from(chars_used).sort().forEach((char) => {
            character_bank += char;
        });
        console.log(character_bank);
        rom.character_bank = character_bank;
        rom.word_bank = word_bank;
        console.log(rom.character_bank);
        console.log(rom.word_bank);
        console.log(rom.title);
        console.log(rom.intro);
        // Create link to downloadable file
        let data = new Blob([rom._bytes], {
            type: 'application/octet-binary',
        });
        let dataURL = window.URL.createObjectURL(data);
        let link = document.getElementById('download');
        link.innerHTML = 'Download patched_rom.bin';
        link.download = "patched_rom.bin";
        link.href = dataURL;
    });
    reader.addEventListener('error', function() {
        console.log(reader.error);
    });
    reader.readAsArrayBuffer(file);
};

function generate(seed) {
    let generator_rng = new Math.seedrandom(seed);
    let result = [];
    let chars_used = new Set();
    let word_sizes = [4, 5, 6];
    word_sizes.forEach((word_size) => {
        let chosen_words = new Set();
        while (chosen_words.size < 16) {
            let valid_words = [];
            wordlist.forEach((word) => {
                word = word.toUpperCase();
                let new_chars_used = new Set(chars_used);
                if ((word.length == word_size) && (!chosen_words.has(word))) {
                    for (let i = 0; i < word.length; i++) {
                        let char = word.charAt(i);
                        new_chars_used.add(char);
                    }
                    if (new_chars_used.size <= 16) {
                        valid_words.push(word);
                    }
                }
            });
            if (chosen_words.size + valid_words.length < 16) {
                break;
            }
            let index = Math.floor(generator_rng() * valid_words.length);
            let chosen_word = valid_words[index];
            chosen_words.add(chosen_word);
            for (let i = 0; i < chosen_word.length; i++) {
                let char = chosen_word.charAt(i);
                chars_used.add(char);
            }
        }
        result.push(...chosen_words);
    })
    return result;
}

function randomize() {
    let given_seed = document.getElementById('seed').value;
    if (given_seed.length < 1) {
        let seed = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
        document.getElementById('seed').value = seed;
    }
    given_seed = document.getElementById('seed').value
    let randomizer_rng = new Math.seedrandom(given_seed);
    let words = [];
    let attempts = 0;
    while (true) {
        attempts += 1;
        words = generate(randomizer_rng());
        if (words.length != 48) {
            continue;
        }
        // Verify character bank is comprised of no more than 16 characters
        let chars_used = new Set();
        words.forEach((word) => {
            for (let i = 0; i < word.length; i++) {
                let char = word.charAt(i);
                chars_used.add(char);
            }
        });
        if (chars_used.size > 16) {
            continue;
        }
        break;
    }
    console.log(attempts);
    document.getElementById('word4a').value = words[0 * 16 + 0];
    document.getElementById('word4b').value = words[0 * 16 + 1];
    document.getElementById('word4c').value = words[0 * 16 + 2];
    document.getElementById('word4d').value = words[0 * 16 + 3];
    document.getElementById('word4e').value = words[0 * 16 + 4];
    document.getElementById('word4f').value = words[0 * 16 + 5];
    document.getElementById('word4g').value = words[0 * 16 + 6];
    document.getElementById('word4h').value = words[0 * 16 + 7];
    document.getElementById('word4i').value = words[0 * 16 + 8];
    document.getElementById('word4j').value = words[0 * 16 + 9];
    document.getElementById('word4k').value = words[0 * 16 + 10];
    document.getElementById('word4l').value = words[0 * 16 + 11];
    document.getElementById('word4m').value = words[0 * 16 + 12];
    document.getElementById('word4n').value = words[0 * 16 + 13];
    document.getElementById('word4o').value = words[0 * 16 + 14];
    document.getElementById('word4p').value = words[0 * 16 + 15];
    document.getElementById('word5a').value = words[1 * 16 + 0];
    document.getElementById('word5b').value = words[1 * 16 + 1];
    document.getElementById('word5c').value = words[1 * 16 + 2];
    document.getElementById('word5d').value = words[1 * 16 + 3];
    document.getElementById('word5e').value = words[1 * 16 + 4];
    document.getElementById('word5f').value = words[1 * 16 + 5];
    document.getElementById('word5g').value = words[1 * 16 + 6];
    document.getElementById('word5h').value = words[1 * 16 + 7];
    document.getElementById('word5i').value = words[1 * 16 + 8];
    document.getElementById('word5j').value = words[1 * 16 + 9];
    document.getElementById('word5k').value = words[1 * 16 + 10];
    document.getElementById('word5l').value = words[1 * 16 + 11];
    document.getElementById('word5m').value = words[1 * 16 + 12];
    document.getElementById('word5n').value = words[1 * 16 + 13];
    document.getElementById('word5o').value = words[1 * 16 + 14];
    document.getElementById('word5p').value = words[1 * 16 + 15];
    document.getElementById('word6a').value = words[2 * 16 + 0];
    document.getElementById('word6b').value = words[2 * 16 + 1];
    document.getElementById('word6c').value = words[2 * 16 + 2];
    document.getElementById('word6d').value = words[2 * 16 + 3];
    document.getElementById('word6e').value = words[2 * 16 + 4];
    document.getElementById('word6f').value = words[2 * 16 + 5];
    document.getElementById('word6g').value = words[2 * 16 + 6];
    document.getElementById('word6h').value = words[2 * 16 + 7];
    document.getElementById('word6i').value = words[2 * 16 + 8];
    document.getElementById('word6j').value = words[2 * 16 + 9];
    document.getElementById('word6k').value = words[2 * 16 + 10];
    document.getElementById('word6l').value = words[2 * 16 + 11];
    document.getElementById('word6m').value = words[2 * 16 + 12];
    document.getElementById('word6n').value = words[2 * 16 + 13];
    document.getElementById('word6o').value = words[2 * 16 + 14];
    document.getElementById('word6p').value = words[2 * 16 + 15];
};

document.getElementById('bin_file').addEventListener('change', refresh);
document.getElementById('randomize_wordlist').addEventListener('click', randomize);
