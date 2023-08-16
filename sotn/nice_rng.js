var url_parameters = new URLSearchParams(window.location.search);
var SEED_MOD = 0x100000000;
var MASK_MOD = 0x100;

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
        this.seed = (mul32(0x01010101, this.seed) + 1) % SEED_MOD;
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
        this.seed = (mul32(a, this.seed) + b) % SEED_MOD;
        this.index += c;
        let result = this.current();
        return result;
    }
}

function refreshNiceRNGValuesFromIndex()
{
    document.getElementById('nice_rng_index').value = (
        document.getElementById('nice_rng_index').value % SEED_MOD
    );
    document.getElementById('nice_rng_mask').value = (
        document.getElementById('nice_rng_mask').value % MASK_MOD
    );
    let rng = new NiceRng();
    while (rng.index < document.getElementById('nice_rng_index').value)
    {
        let tumbler_id = 1
        let diff = document.getElementById('nice_rng_index').value - rng.index;
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
    document.getElementById('nice_rng_seed').value = hex(rng.seed);
    document.getElementById('nice_rng_value').value = rng.current();
    document.getElementById('nice_rng_masked_value').value = rng.current() & document.getElementById('nice_rng_mask').value;
}

if (url_parameters.get('index') == null)
{
    url_parameters.set('index', 0);
}

if (url_parameters.get('mask') == null)
{
    url_parameters.set('mask', 255);
}

document.getElementById('nice_rng_index').value = url_parameters.get('index');
document.getElementById('nice_rng_mask').value = url_parameters.get('mask');
refreshNiceRNGValuesFromIndex();

nice_rng_index.addEventListener('input', function()
{
    refreshNiceRNGValuesFromIndex()
    const url = new URL(window.location);
    url.searchParams.set('index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('mask', document.getElementById('nice_rng_mask').value);
    history.pushState({}, "", url);
});

nice_rng_mask.addEventListener('input', function()
{
    refreshNiceRNGValuesFromIndex()
    const url = new URL(window.location);
    url.searchParams.set('index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('mask', document.getElementById('nice_rng_mask').value);
    history.pushState({}, "", url);
});
