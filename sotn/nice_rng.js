
var nice_rng_index = document.getElementById('nice_rng_index');
var nice_rng_seed = document.getElementById('nice_rng_seed');
var nice_rng_value = document.getElementById('nice_rng_value');
var MOD = 0x100000000;

function mul32(a, b)
{
    // From: https://stackoverflow.com/questions/6232939/
    a >>>= 0;
    b >>>= 0;
    let lo = a & 0xffff;
    let hi = a - lo;
    let result = (((hi * b) >>> 0) + (lo * b)) >>> 0;
    return result
}

function hex(value) {
    let result = value.toString(16).toUpperCase();
    while (result.length < 8)
    {
        result = "0" + result;
    }
    return result;
}

class NiceRng {
    constructor()
    {
        this.seed = 0x00000000;
        this.index = 0;
    }

    current()
    {
        let result = 0xff & (this.seed >> 0x18);
        return result;
    }

    next()
    {
        this.seed = (mul32(0x01010101, this.seed) + 1) % MOD;
        this.index += 1;
        let result = this.current();
        return result;
    }

    nextWithTumbler(id)
    {
        let a = 0x01010101
        let b = 0x00000001
        let c = 1
        if (id == 2)
        {
            a = 0x30881001;
            b = 0xf6a87810;
            c = 16
        }
        else if (id == 3)
        {
            a = 0x80810001;
            b = 0xeaff8100;
            c = 256
        }
        else if (id == 4)
        {
            a = 0x08100001;
            b = 0x27f81000;
            c = 4096
        }
        else if (id == 5)
        {
            a = 0x81000001;
            b = 0x7f810000;
            c = 65536
        }
        else if (id == 6)
        {
            a = 0x10000001;
            b = 0xf8100000;
            c = 1048576
        }
        else if (id == 7)
        {
            a = 0x00000001;
            b = 0x81000000;
            c = 16777216
        }
        else if (id == 8)
        {
            a = 0x00000001;
            b = 0x10000000;
            c = 268435456
        }
        this.seed = (mul32(a, this.seed) + b) % MOD;
        this.index += c;
        let result = this.current();
        return result;
    }
}

nice_rng_index.addEventListener('input', function() {
    nice_rng_seed.value = 'calculating ...';
    let target_index = nice_rng_index.value % MOD;
    let rng = new NiceRng();
    while (rng.index < target_index)
    {
        let tumbler_id = 1
        let diff = target_index - rng.index;
        if (diff >= 268435456)
        {
            tumbler_id = 8;
        }
        else if (diff >= 16777216)
        {
            tumbler_id = 7;
        }
        else if (diff >= 1048576)
        {
            tumbler_id = 6;
        }
        else if (diff >= 65536)
        {
            tumbler_id = 5;
        }
        else if (diff >= 4096)
        {
            tumbler_id = 4;
        }
        else if (diff >= 256)
        {
            tumbler_id = 3;
        }
        else if (diff >= 16)
        {
            tumbler_id = 2;
        }
        rng.nextWithTumbler(tumbler_id);
    }
    nice_rng_seed.value = hex(rng.seed);
    nice_rng_value.value = rng.current();
});

