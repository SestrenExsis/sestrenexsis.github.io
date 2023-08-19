var url_parameters = new URLSearchParams(window.location.search);
var MAX_SEED = 0xFFFFFFFF;

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
    static tumblers = [
        {a: 0x01010101, b: 0x00000001, c: 1},
        {a: 0x30881001, b: 0xf6a87810, c: 16},
        {a: 0x80810001, b: 0xeaff8100, c: 256},
        {a: 0x08100001, b: 0x27f81000, c: 4096},
        {a: 0x81000001, b: 0x7f810000, c: 65536},
        {a: 0x10000001, b: 0xf8100000, c: 1048576},
        {a: 0x00000001, b: 0x81000000, c: 16777216},
        {a: 0x00000001, b: 0x10000000, c: 268435456},
    ];
    constructor()
    {
        this.seed = 0x00000000;
        this.index = 0;
        this.calls = 0;
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
        this.calls += 1;
        let result = this.current();
        return result;
    }

    push(amount)
    {
        let target_index = this.index + amount;
        while (this.index < target_index)
        {
            let diff = target_index - this.index;
            let tumbler_id = Math.floor(Math.log(diff) / Math.log(16));
            let tumbler = NiceRng.tumblers.at(tumbler_id);
            this.seed = (mul32(tumbler.a, this.seed) + tumbler.b) % (MAX_SEED + 1);
            this.index += tumbler.c;
            this.calls += tumbler.c;
        }
    }
}

function refresh()
{
    let rng = new NiceRng();
    // Clamp index between 0x00000000 and 0xFFFFFFFF
    let nice_rng_index = document.getElementById('nice_rng_index').value;
    nice_rng_index = Math.max(nice_rng_index, 0);
    nice_rng_index = Math.min(nice_rng_index, MAX_SEED);
    document.getElementById('nice_rng_index').value = nice_rng_index;
    rng.push(nice_rng_index);
    rng.calls = 0;
    document.getElementById('nice_rng_seed').value = hex(rng.seed);
    // Clamp candles and vases between 0 and 255
    let short_candles = document.getElementById('short_candles').value;
    short_candles = Math.max(short_candles, 0);
    short_candles = Math.min(short_candles, 255);
    document.getElementById('short_candles').value = short_candles;
    let tall_candles = document.getElementById('tall_candles').value;
    tall_candles = Math.max(tall_candles, 0);
    tall_candles = Math.min(tall_candles, 255);
    document.getElementById('tall_candles').value = tall_candles;
    let vases = document.getElementById('vases').value;
    vases = Math.max(vases, 0);
    vases = Math.min(vases, 255);
    document.getElementById('vases').value = vases;
    // Simulate first part of Prologue
    rng.push(8 * short_candles);
    rng.push(10 * tall_candles);
    rng.push(2 * vases);
    rng.push(80);
    // Determine Dracula spawn position
    let dracula_spawn = (0x7 & rng.next());
    let dracula_spawn_label = "ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR";
    // Spawn Positions
    // ---------------
    // ..H.........H..
    // w.H....^....H.w
    // |.H.w..H..w.H.|
    // |.H.|.....|.H.|
    // +---+-----+---+
    // .1.2.3.456.7.8. << Position
    // .0.1.2.374.5.6. << Index
    if (dracula_spawn == 0) { dracula_spawn_label = "1: between CANDLE 1 and the LEFT COLUMN"; }
    else if (dracula_spawn == 1) { dracula_spawn_label = "2: between the LEFT COLUMN and CANDLE 2"; }
    else if (dracula_spawn == 2) { dracula_spawn_label = "3: between CANDLE 2 and the THRONE"; }
    else if (dracula_spawn == 3) { dracula_spawn_label = "4: directly in FRONT of the THRONE"; }
    else if (dracula_spawn == 7) { dracula_spawn_label = "5: just to the RIGHT of the THRONE"; }
    else if (dracula_spawn == 4) { dracula_spawn_label = "6: just to the LEFT of CANDLE 3"; }
    else if (dracula_spawn == 5) { dracula_spawn_label = "7: between CANDLE 3 and the RIGHT COLUMN"; }
    else if (dracula_spawn == 6) { dracula_spawn_label = "8: between the RIGHT COLUMN and CANDLE 4"; }
    document.getElementById('dracula_spawn').value = dracula_spawn_label;
}

if (url_parameters.get('nice_rng_index') == null)
{
    url_parameters.set('nice_rng_index', 0);
}

if (url_parameters.get('short_candles') == null)
{
    url_parameters.set('short_candles', 0);
}

if (url_parameters.get('tall_candles') == null)
{
    url_parameters.set('tall_candles', 0);
}

if (url_parameters.get('vases') == null)
{
    url_parameters.set('vases', 0);
}

document.getElementById('nice_rng_index').value = url_parameters.get('nice_rng_index');
document.getElementById('short_candles').value = url_parameters.get('short_candles');
document.getElementById('tall_candles').value = url_parameters.get('tall_candles');
document.getElementById('vases').value = url_parameters.get('vases');
refresh();

nice_rng_index.addEventListener('input', function()
{
    refresh()
    const url = new URL(window.location);
    url.searchParams.set('nice_rng_index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('short_candles', document.getElementById('short_candles').value);
    url.searchParams.set('tall_candles', document.getElementById('tall_candles').value);
    url.searchParams.set('vases', document.getElementById('vases').value);
    history.replaceState({}, "", url);
});

short_candles.addEventListener('input', function()
{
    refresh()
    const url = new URL(window.location);
    url.searchParams.set('nice_rng_index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('short_candles', document.getElementById('short_candles').value);
    url.searchParams.set('tall_candles', document.getElementById('tall_candles').value);
    url.searchParams.set('vases', document.getElementById('vases').value);
    history.replaceState({}, "", url);
});

tall_candles.addEventListener('input', function()
{
    refresh()
    const url = new URL(window.location);
    url.searchParams.set('nice_rng_index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('short_candles', document.getElementById('short_candles').value);
    url.searchParams.set('tall_candles', document.getElementById('tall_candles').value);
    url.searchParams.set('vases', document.getElementById('vases').value);
    history.replaceState({}, "", url);
});

vases.addEventListener('input', function()
{
    refresh()
    const url = new URL(window.location);
    url.searchParams.set('nice_rng_index', document.getElementById('nice_rng_index').value);
    url.searchParams.set('short_candles', document.getElementById('short_candles').value);
    url.searchParams.set('tall_candles', document.getElementById('tall_candles').value);
    url.searchParams.set('vases', document.getElementById('vases').value);
    history.replaceState({}, "", url);
});
