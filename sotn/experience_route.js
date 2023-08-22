
var url_parameters = new URLSearchParams(window.location.search);
const inputs = [
    "entrance__warg1",
    "zombie_hallway__warg1",
    "zombie_hallway__warg2",
    "zombie_hallway__zombie1",
    "zombie_hallway__warg3",
    "zombie_hallway__zombie2",
    "zombie_hallway__warg4",
    "zombie_hallway__zombie3",
    "merman_room__bat1",
    "merman_room__bat2",
    "merman_room__bat3",
    "merman_room__bat4",
    "warg_hallway__warg1",
    "warg_hallway__warg2",
    "warg_hallway__warg3",
    "cube_of_zoe_room__bone_scimitar1",
    "cube_of_zoe_room__bone_scimitar2",
    "alchemy_lab_entrance__bone_scimitar1",
    "alchemy_lab_entrance__bone_scimitar2",
    "alchemy_lab_entrance__skeleton1",
    "alchemy_lab_spike_room__bone_scimitar1",
    "alchemy_lab_spike_room__bone_scimitar2",
    "alchemy_lab_spike_room__bone_scimitar3",
];

class Player {
    // 0x800AC784
    static levels = [
        -1,  // Fake level so that indexing of levels matches level in-game
        0,
        100,
        250,
        450,
        700,
        1000,
        1350,
        1750,
        2200,
        2700,
        3250,
        3850,
        4500,
        5200,
        5950,
        6750,
        7600,
        8500,
        9450,
        10450,
        11700,
        13200,
        15100,
        17500,
        20400,
        23700,
        27200,
        30900,
        35000,
        39500,
        44500,
        50000,
        56000,
        61500,
        68500,
        76000,
        84000,
        92500,
        101500,
        110000,
        120000,
        130000,
        140000,
        150000,
        160000,
        170000,
        180000,
        190000,
        200000,
        210000,
        222000,
        234000,
        246000,
        270000,
        282000,
        294000,
        306000,
        318000,
        330000,
        344000,
        358000,
        372000,
        386000,
        400000,
        414000,
        428000,
        442000,
        456000,
        470000,
        486000,
        502000,
        518000,
        534000,
        550000,
        566000,
        582000,
        598000,
        614000,
        630000,
        648000,
        666000,
        684000,
        702000,
        720000,
        738000,
        756000,
        774000,
        792000,
        810000,
        830000,
        850000,
        870000,
        890000,
        910000,
        930000,
        950000,
        970000,
        999999,
        1000000,
    ];
    constructor() {
        this.xp = 0;
    }

    get level() {
        // NOTE(sestren): Go with O(N) searching for now; everything is fast for small N
        let result = 0
        while (this.xp >= Player.levels.at(result + 1)) {
            if (result >= (Player.levels.length - 1)) {
                result = 99;
                break;
            }
            result += 1;
        }
        return result;
    }

    kill(monster) {
        let xp_gain = monster.base_xp;
        if (monster.level < this.level) {
            let gap = this.level - monster.level;
            for (let i = 0; i < gap; i++) {
                xp_gain = Math.floor(xp_gain / 3);
            }
            if (xp_gain < 1) {
                xp_gain = 1;
            }
        }
        else if (this.level < monster.level) {
            let gap = monster.level - this.level;
            if (gap > 5) {
                gap = 5;
            }
            for (let i = 0; i < gap; i++) {
                let temp = xp_gain >> 2;
                xp_gain += temp;
            }
        }
        this.xp += xp_gain;
    }
}

class Monster {
    constructor(level, base_xp) {
        this.level = level;
        this.base_xp = base_xp;
    }
}

let monsters = {
    "Warg": new Monster(2, 10),
    "Zombie": new Monster(1, 5),
    "Bat": new Monster(1, 10),
    "Bone Scimitar": new Monster(3, 15),
    "Skeleton": new Monster(2, 10),
};

function refresh(update_url) {
    let player = new Player();
    inputs.forEach((input_id) => {
        let element = document.getElementById(input_id);
        if (element.checked) {
            let monster = monsters[element.value];
            player.kill(monster);
        }
    });
    console.log("xp: " + player.xp + ", level: " + player.level);
    // Update URL if requested
    if (update_url) {
        const url = new URL(window.location);
        inputs.forEach((input) => {
            url.searchParams.set(input, document.getElementById(input).checked);
        })
        history.replaceState({}, "", url);
    }
}

inputs.forEach((input_id) => {
    if (url_parameters.get(input_id) == null)
    {
        url_parameters.set(input_id, 0);
    }
    document.getElementById(input_id).checked = url_parameters.get(input_id) == "true";
    let element = document.getElementById(input_id);
    element.addEventListener('click', function() {
        refresh(true);
    });
});

refresh(false);