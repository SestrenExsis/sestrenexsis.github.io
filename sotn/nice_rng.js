var url_parameters = new URLSearchParams(window.location.search);
var MAX_SEED = 0xFFFFFFFF;
var MAX_MASK = 0xFF;

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
        this.seed = (mul32(0x01010101, this.seed) + 1) % (MAX_SEED + 1);
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
        this.seed = (mul32(a, this.seed) + b) % (MAX_SEED + 1);
        this.index += c;
        let result = this.current();
        return result;
    }
}

function refreshNiceRNGValuesFromIndex()
{
    // Clamp index between 0x00000000 and 0xFFFFFFFF
    let nice_rng_index = document.getElementById('nice_rng_index').value;
    nice_rng_index = Math.max(nice_rng_index, 0);
    nice_rng_index = Math.min(nice_rng_index, MAX_SEED);
    document.getElementById('nice_rng_index').value = nice_rng_index;
    // Clamp mask between 0x00 and 0xFF
    let nice_rng_mask = document.getElementById('nice_rng_mask').value;
    nice_rng_mask = Math.max(nice_rng_mask, 0);
    nice_rng_mask = Math.min(nice_rng_mask, MAX_MASK);
    document.getElementById('nice_rng_mask').value = nice_rng_mask;
    // Update derived values
    let rng = new NiceRng();
    while (rng.index < nice_rng_index)
    {
        let diff = nice_rng_index - rng.index;
        let tumbler_id = 1 + Math.floor(Math.log(diff) / Math.log(16));
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
    history.replaceState({}, "", url);
});

nice_rng_mask.addEventListener('input', function()
{
    refreshNiceRNGValuesFromIndex()
    const url = new URL(window.location);
    url.searchParams.set('index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('mask', document.getElementById('nice_rng_mask').value);
    history.replaceState({}, "", url);
});
