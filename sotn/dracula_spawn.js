var dracula_spawn_pattern = document.querySelector('#dracula-spawn-pattern');
var first_possible_index = document.querySelector('#first-possible-index');
var first_possible_seed = document.querySelector('#first-possible-seed');
var MOD = 0x100000000;
var spawn_indexes = [
    81, 210, 339, 468, // first 4 Dracula spawn indexes, 0 candles
    89, 218, 347, 476, // first 4 Dracula spawn indexes, 1 candle
    97, 226, 355, 484, // first 4 Dracula spawn indexes, 2 candles
    105, 234, 363, 492, // first 4 Dracula spawn indexes, 3 candles
];

var spawn_ids = [1, 2, 3, 4, 6, 7, 8, 5];

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
}

dracula_spawn_pattern.addEventListener('input', function() {
    first_possible_index.textContent = 'first possible index: calculating ...\n';
    let target_pattern = dracula_spawn_pattern.value.replaceAll('-', '').slice(0, 12);
    let target_pattern_size = target_pattern.length;
    let max_spawn_index = Math.max(...spawn_indexes.slice(0, target_pattern_size));
    let rng = new NiceRng();
    let spawns = [];
    let target_found = false;
    while (target_pattern_size > 0 && !target_found && spawns.length < 10000000)
    {
        let spawn = spawn_ids[rng.current() & 7];
        spawns.push(spawn);
        target_found = true;
        for (let i = 0; i < target_pattern_size; i++)
        {
            let n = spawns.length + spawn_indexes[i] - (max_spawn_index + 1);
            if
            (
                (spawns.length <= n) ||
                (spawns.length <= spawn_indexes[i]) ||
                (spawns[n] != parseInt(target_pattern.charAt(i)))
            )
            {
                target_found = false;
                break;
            }
        }
        rng.next();
    }
    let index = spawns.length - (max_spawn_index + 1);
    if (target_found)
    {
        first_possible_index.textContent = 'first possible index: ' + index + '\n';
        rng = new NiceRng();
        for (let i = 0; i < index; i++)
        {
            rng.next();
        }
        first_possible_seed.textContent = 'seed: ' + hex(rng.seed) + '\n';
    }
    else
    {
        first_possible_index.textContent = 'first possible index: too expensive to calculate\n';
        first_possible_seed.textContent = 'seed: -\n';
    }
});
