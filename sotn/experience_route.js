
var url_parameters = new URLSearchParams(window.location.search);
const inputs = [
    "aaa1",
    "aba1",
    "aba2",
    "abb1",
    "aba3",
    "abb2",
    "aba4",
    "abb3",
    "acc1",
    "acc2",
    "acc3",
    "acc4",
    "ada1",
    "ada2",
    "ada3",
    "aed1",
    "aed2",
    "bad1",
    "bad2",
    "bae1",
    "bbd1",
    "bbd2",
    "bbd3",
    "bce1",
    "bdf1",
    "bdg1",
    "bdg2",
    "bdf2",
    "bdf3",
    "bef1",
    "bef2",
    "bfT1",
    "bfU1",
    "bfV1",
    "bgd1",
    "bgd2",
    "bgj1",
    "bhj1",
    "bhj2",
    "bhj3",
    "bhj4",
    "big1",
    "big2",
    "bif1",
    "big3",
    "cag1",
    "cag2",
    "cag3",
    "cbg1",
    "cck1",
    "cck2",
    "cdk1",
    "cel1",
    "cel2",
    "cee1",
    "cem1",
    "cee2",
    "cfe1",
    "cfm1",
    "cfe2",
    "cge1",
    "chn1",
    "chn2",
    "chn3",
    "cho1",
    "cho2",
    "dap1",
    "dap2",
    "dbq1",
    "dce1",
    "dcr1",
    "dcs1",
    "dcp1",
    "dct1",
    "dcu1",
    "dcu2",
    "dcu3",
    "dcv1",
    "dcw1",
    "dcx1",
    "dcv2",
    "dcw2",
    "eao1",
    "eao2",
    "ean1",
    "ean2",
    "ean3",
    "ebe1",
    "ece1",
    "ecm1",
    "ece2",
    "ede1",
    "edm1",
    "ede2",
    "edl1",
    "edl2",
    "eek1",
    "fay1",
    "fay2",
    "fay3",
    "fay4",
    "fbz1",
    "gaA1",
    "gaA2",
    "gbA1",
    "gbB1",
    "gbB2",
    "gbB3",
    "gbA2",
    "gcW1",
    "gcX1",
    "gcY1",
    "gcZ1",
    "haE1",
    "haE2",
    "haE3",
    "haE4",
    "haE5",
    "haE6",
    "haE7",
    "haE8",
    "haF1",
    "hbG1",
    "hbk1",
    "hbH1",
    "hbG2",
    "hbk2",
    "hbH2",
    "hbG3",
    "hbk3",
    "hbH3",
    "hbG4",
    "hbk4",
    "hcG1",
    "hck1",
    "hcG2",
    "hck2",
    "hcI1",
    "hdF1",
    "hdH1",
    "hdH2",
    "hdJ1",
    "hdH3",
    "hdH4",
    "hdH5",
    "iaK1",
    "iaK2",
    "iaK3",
    "iaK4",
    "ibx1",
    "ibx2",
    "ibx3",
    "ibx4",
    "icM1",
    "jaN1",
    "jaN2",
    "jaN3",
    "jaN4",
    "jaN5",
    "kaO1",
    "kaP1",
    "kbQ1",
    "kcP1",
    "kcO1",
    "kcP2",
    "kdO1",
    "keP1",
    "keO1",
    "keP2",
    "keP3",
    "keO2",
    "keP4",
    "keO3",
    "keO4",
    "kfR1",
    "kfR2",
    "kfR3",
    "kfS1",
    "kfS2",
    "kfS3",
    "kfS4",
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
        this.level_up_animations = 0;
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

    kill(monsters) {
        let prev_level = this.level;
        let total_xp_gains = 0;
        monsters.forEach((monster) => {
            let xp_gain = monster.base_xp;
            if (monster.level < this.level) {
                let gap = this.level - monster.level;
                for (let i = 0; i < gap; i++) {
                    xp_gain = Math.floor((xp_gain * 2) / 3);
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
            total_xp_gains += xp_gain;
        });
        this.xp += total_xp_gains;
        this.level_up_animations += (((this.level - prev_level) > 0) ? 1 : 0);
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
    "Spittle Bone": new Monster(3, 20),
    "Axe Knight (Green)": new Monster(4, 10),
    "Slogra": new Monster(6, 200),
    "Gaibon": new Monster(6, 200),
    "Bloody Zombie": new Monster(4, 15),
    "Flea Man": new Monster(7, 17),
    "Ouija Table": new Monster(5, 20),
    "Slinger": new Monster(4, 10),
    "Diplocephalus": new Monster(7, 50),
    "Stone Rose": new Monster(8, 60),
    "Axe Knight (Blue)": new Monster(9, 50),
    "Doppleganger10": new Monster(10, 500),
    "Skeleton Ape": new Monster(10, 30),
    "Spear Guard": new Monster(10, 70),
    "Bone Archer": new Monster(10, 50),
    "Bone Musket": new Monster(8, 20),
    "Medusa Head (Green)": new Monster(7, 20),
    "Medusa Head (Golden)": new Monster(8, 30),
    "Sword Lord": new Monster(11, 80),
    "Skelerang": new Monster(5, 15),
    "Spectral Sword": new Monster(13, 80),
    "Blade Soldier": new Monster(8, 20),
    "Blade Master": new Monster(17, 80),
    "Werewolf": new Monster(18, 300),
    "Minotaurus": new Monster(35, 250),
    "Spellbook": new Monster(10, 30),
    "Corpseweed": new Monster(13, 100),
    "Flea Armor": new Monster(16, 40),
    "Dhuron": new Monster(12, 50),
    "Lesser Demon": new Monster(20, 100),
    "Ectoplasm": new Monster(11, 70),
    "Harpy": new Monster(18, 70),
    "Vandal Sword": new Monster(15, 100),
    "Karasuman": new Monster(22, 1000),
    "Tombstone": new Monster(25, 88),
    "Balloon Pod": new Monster(29, 88),
    "Black Panther": new Monster(35, 600),
    "Medusa": new Monster(40, 2500),
    "Sniper of Goth": new Monster(36, 200),
    "Imp": new Monster(41, 66),
};

function refresh(update_url) {
    let player = new Player();
    inputs.forEach((input_id) => {
        let element = document.getElementById(input_id);
        if (element.checked) {
            if (element.value == "Slogra and Gaibon Double Kill") {
                player.kill([
                    monsters["Slogra"],
                    monsters["Gaibon"],
                ]);
            }
            else if (element.value == "No Slogra and Gaibon Double Kill") {
                player.kill([monsters["Slogra"]]);
                player.kill([monsters["Gaibon"]]);
            }
            else if (element.value == "Werewolf and Minotaurus Double Kill") {
                player.kill([
                    monsters["Werewolf"],
                    monsters["Minotaurus"],
                ]);
            }
            else if (element.value == "Kill Werewolf First") {
                player.kill([monsters["Werewolf"]]);
                player.kill([monsters["Minotaurus"]]);
            }
            else if (element.value == "Kill Minotaurus First") {
                player.kill([monsters["Minotaurus"]]);
                player.kill([monsters["Werewolf"]]);
            }
            else if (element.value.startsWith("Skip ")) {
                // Skip this monster
            } else {
                player.kill([monsters[element.value]]);
            }
        }
    });
    document.getElementById("player_xp").value = player.xp
    document.getElementById("player_level").value = player.level
    document.getElementById("player_xp_to_next_level").value = Player.levels.at(player.level + 1) - player.xp
    document.getElementById("player_level_up_animations").value = player.level_up_animations
    console.log("xp: " + player.xp + ", level: " + player.level + ", level-up animations: " + player.level_up_animations);
    // Update URL if requested
    if (update_url) {
        const url = new URL(window.location);
        inputs.forEach((input) => {
            url.searchParams.set(input, (document.getElementById(input).checked) ? 1 : 0);
        })
        history.replaceState({}, "", url);
    }
}

inputs.forEach((input_id) => {
    if (url_parameters.get(input_id) == null)
    {
        url_parameters.set(input_id, 0);
    }
    document.getElementById(input_id).checked = url_parameters.get(input_id) == "1";
    let element = document.getElementById(input_id);
    element.addEventListener('click', function() {
        refresh(true);
    });
});

refresh(false);