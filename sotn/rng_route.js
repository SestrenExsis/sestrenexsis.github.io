
var url_parameters = new URLSearchParams(window.location.search);
var MAX_SEED = 0xFFFFFFFF;
var inputs = [{
        id: 'nice_rng_index',
        default: 0,
    }, {
        id: 'candles',
        default: 0,
    }, {
        id: 'vases',
        default: 0,
    }, {
        id: 'short_candles',
        default: 0,
    }, {
        id: 'tall_candles',
        default: 0,
    }, {
        id: 'move_frames',
        default: 60,
    }, {
        id: 'warg_death_frames',
        default: 30,
    },
]

function mul32(a, b) {
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
    while (result.length < 8) {
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
    constructor() {
        this.seed = 0x00000000;
        this.index = 0;
        this.calls = 0;
    }

    current() {
        let result = 0xff & (this.seed >> 0x18);
        return result;
    }

    next() {
        this.seed = (mul32(0x01010101, this.seed) + 1) % (MAX_SEED + 1);
        this.index += 1;
        this.calls += 1;
        let result = this.current();
        return result;
    }

    push(amount) {
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

class EntityLightningFlash {
    constructor(rng) {
        this.rng = rng;
        this.state = "INIT";
        this.timer = 0;
    }

    update() {
        if (this.timer < 1) {
            if (this.state == "INIT") {
                this.state = "FLASH";
                this.rng.push(4);
                this.timer = 14;
            }
            else if (this.state == 'IDLE') {
                this.state = "FLASH";
                this.rng.push(2);
                this.timer = 14;
            }
            else {
                this.state = "IDLE";
                this.timer = 64 + (0x7F & this.rng.next());
            }
        }
        this.timer -= 1
    }
}

class EntityWarg {
    constructor(rng) {
        this.rng = rng;
        this.state = "ALIVE";
        this.timer = 0;
    }

    kill() {
        if (this.state != 'DEAD') {
            this.state = 'DEAD'
            this.rng.push(50) // Blood spray
            this.timer = 130
        }
    }

    update() {
        if (this.state == "DEAD" && this.timer > 0) {
            if ((this.timer % 2) == 0) {
                this.rng.push(3)
            }
            this.timer -= 1
        }
    }
}

function refresh(update_url) {
    let rng = new NiceRng();
    // Clamp index between 0x00000000 and 0xFFFFFFFF
    let nice_rng_index = document.getElementById('nice_rng_index').value;
    nice_rng_index = Math.max(nice_rng_index, 0);
    nice_rng_index = Math.min(nice_rng_index, MAX_SEED);
    document.getElementById('nice_rng_index').value = nice_rng_index;
    rng.push(nice_rng_index);
    rng.calls = 0;
    document.getElementById('nice_rng_seed').value = hex(rng.seed);
    // Clamp input values
    let candles = document.getElementById('candles').value;
    candles = Math.max(candles, 0);
    candles = Math.min(candles, 999);
    document.getElementById('candles').value = candles;
    let vases = document.getElementById('vases').value;
    vases = Math.max(vases, 0);
    vases = Math.min(vases, 999);
    document.getElementById('vases').value = vases;
    let short_candles = document.getElementById('short_candles').value;
    short_candles = Math.max(short_candles, 0);
    short_candles = Math.min(short_candles, 2);
    document.getElementById('short_candles').value = short_candles;
    let tall_candles = document.getElementById('tall_candles').value;
    tall_candles = Math.max(tall_candles, 0);
    tall_candles = Math.min(tall_candles, 2);
    document.getElementById('tall_candles').value = tall_candles;
    let move_frames = document.getElementById('move_frames').value;
    move_frames = Math.max(move_frames, 0);
    move_frames = Math.min(move_frames, 999);
    document.getElementById('move_frames').value = move_frames;
    let warg_death_frames = document.getElementById('warg_death_frames').value;
    warg_death_frames = Math.max(warg_death_frames, 0);
    warg_death_frames = Math.min(warg_death_frames, 999);
    document.getElementById('warg_death_frames').value = warg_death_frames;
    // Update URL if requested
    if (update_url) {
        const url = new URL(window.location);
        inputs.forEach((input) => {
            url.searchParams.set(input.id, document.getElementById(input.id).value);
        })
        history.replaceState({}, "", url);
    }
    /* =========== PROLOGUE ============ */
    rng.push(8 * candles);
    rng.push(2 * vases);
    rng.push(8 * short_candles);
    rng.push(10 * tall_candles);
    rng.push(80);
    // Determine Dracula spawn position
    let dracula_spawn = (0x7 & rng.next());
    let dracula_spawn_label = "ERROR!";
    if (dracula_spawn == 0) { dracula_spawn_label = "1: between CANDLE 1 and the LEFT COLUMN"; }
    else if (dracula_spawn == 1) { dracula_spawn_label = "2: between the LEFT COLUMN and CANDLE 2"; }
    else if (dracula_spawn == 2) { dracula_spawn_label = "3: between CANDLE 2 and the THRONE"; }
    else if (dracula_spawn == 3) { dracula_spawn_label = "4: directly in FRONT of the THRONE"; }
    else if (dracula_spawn == 7) { dracula_spawn_label = "5: just to the RIGHT of the THRONE"; }
    else if (dracula_spawn == 4) { dracula_spawn_label = "6: just to the LEFT of CANDLE 3"; }
    else if (dracula_spawn == 5) { dracula_spawn_label = "7: between CANDLE 3 and the RIGHT COLUMN"; }
    else if (dracula_spawn == 6) { dracula_spawn_label = "8: between the RIGHT COLUMN and CANDLE 4"; }
    document.getElementById('dracula_spawn').value = dracula_spawn_label;
    rng.push(16 + 48) // Dracula teleports
    rng.push(16) // Damage on Dracula during first phase (assumes no whips)
    rng.push(8 * (2 - short_candles)); // Hydro storm will take out any remaining candles
    rng.push(10 * (2 - tall_candles)); // Hydro storm will take out any remaining candles
    rng.push(225) // Dracula transforms
    // TODO(sestren): Verify that RNG is always 30, even with damage stacks
    rng.push(30) // Damage on Dracula during second phase (assumes no whips)
    let prev_calls = rng.calls;
    document.getElementById('calls_before_drawbridge_cutscene').innerHTML = "<em>" + prev_calls + " RNG calls made prior to this room</em>";
    /* ====== DRAWBRIDGE CUTSCENE ====== */
    let lightning = new EntityLightningFlash(rng);
    for (let i = 0; i < 750; i++)
    {
        lightning.update();
    }
    document.getElementById('calls_during_drawbridge_cutscene').innerHTML = "<em>+" + (rng.calls - prev_calls) + " RNG calls made in this room</em>";
    /* ============ ENTRANCE =========== */
    lightning = new EntityLightningFlash(rng);
    warg = new EntityWarg(rng);
    // Finish cutscene
    rng.push(2) // ???
    rng.push(16) // Close gate
    // Player has input now, dash to the Warg and kill it
    for (let i = 0; i < move_frames; i++) {
        lightning.update()
    }
    warg.kill()
    for (let i = 0; i < warg_death_frames; i++) {
        warg.update()
    }
    /* ======= END OF SIMULATION ======= */
    console.log(rng.calls);
}

inputs.forEach((input) => {
    if (url_parameters.get(input.id) == null)
    {
        url_parameters.set(input.id, input.default);
    }
    document.getElementById(input.id).value = url_parameters.get(input.id);
    let element = document.getElementById(input.id);
    element.addEventListener('input', function() {
        refresh(true);
    });
});

refresh(false);
