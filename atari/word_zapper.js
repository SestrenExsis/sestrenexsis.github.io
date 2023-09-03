
class ROM {
    constructor()
    {
        this.bytes = new Uint8Array(4096);
    }

    load(bytes) {
        this.bytes = bytes;
    }
    
    peek(address) {
        let result = this.bytes[address];
        return result;
    }
    
    poke(address, value) {
        this.bytes[address] = value;
    }
}

const reader = new FileReader()
var rom = new ROM();
var binFile = document.getElementById('bin-file');

reader.addEventListener('load', function() {
    rom.load(new Uint8Array(reader.result));
    console.log(rom.peek(0x0000));
    rom.poke(0x0000, 0x01);
    console.log(rom.peek(0x0000));
})

reader.addEventListener('error', function() {
    console.log(reader.error);
})

binFile.addEventListener('change', function() {
    let file = binFile.files[0];
    reader.readAsArrayBuffer(file);
});