
var url_parameters = new URLSearchParams(window.location.search);
const inputs = [
    "entrance__warg",
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
    "alchemy_lab_entrance__skeleton",
    "alchemy_lab_spike_room__bone_scimitar1",
    "alchemy_lab_spike_room__bone_scimitar2",
    "alchemy_lab_spike_room__bone_scimitar3",
    "zig_zag_stairs__skeleton",
    "spittlebone_room_1__spittle_bone1",
    "spittlebone_room_1__axe_knight_green1",
    "spittlebone_room_1__axe_knight_green2",
    "spittlebone_room_1__spittle_bone2",
    "spittlebone_room_1__spittle_bone3",
    "spittlebone_room_2__spittle_bone1",
    "spittlebone_room_2__spittle_bone2",
    "slogra_and_gaibon_room__skip_slogra_and_gaibon",
    "slogra_and_gaibon_room__double_kill_slogra_and_gaibon",
    "slogra_and_gaibon_room__kill_slogra_and_gaibon",
    "room_after_slogra_and_gaibon__bone_scimitar1",
    "room_after_slogra_and_gaibon__bone_scimitar2",
    "room_after_slogra_and_gaibon__bloody_zombie",
    "bloody_zombie_hallway__bloody_zombie1",
    "bloody_zombie_hallway__bloody_zombie2",
    "bloody_zombie_hallway__bloody_zombie3",
    "bloody_zombie_hallway__bloody_zombie4",
    "alchemy_lab_exit__axe_knight_green1",
    "alchemy_lab_exit__axe_knight_green2",
    "alchemy_lab_exit__spittle_bone",
    "alchemy_lab_exit__axe_knight_green3",
    "marble_gallery_entrance__axe_knight_green1",
    "marble_gallery_entrance__axe_knight_green2",
    "marble_gallery_entrance__axe_knight_green3",
    "lone_green_axe_knight__axe_knight_green",
    "left_of_clock_room__flea_man1",
    "left_of_clock_room__flea_man2",
    "right_of_clock_room__flea_man",
    "ouija_table_room__ouija_table1",
    "ouija_table_room__ouija_table2",
    "ouija_table_room__skeleton1",
    "ouija_table_room__slinger",
    "ouija_table_room__skeleton2",
    "stopwatch_room__skeleton1",
    "stopwatch_room__slinger",
    "stopwatch_room__skeleton2",
    "staircase_room__skeleton",
    "long_hallway__diplocephalus1",
    "long_hallway__diplocephalus2",
    "long_hallway__diplocephalus3",
    "long_hallway__stone_rose1",
    "long_hallway__stone_rose2",
    "outer_wall_before_doppel__axe_knight_blue1",
    "outer_wall_before_doppel__axe_knight_blue2",
    "doppelganger_fight__doppleganger10",
    "outer_wall__skeleton",
    "outer_wall__skeleton_ape",
    "outer_wall__spear_guard",
    "outer_wall__axe_knight_blue",
    "outer_wall__bone_archer",
    "outer_wall__bone_musket1",
    "outer_wall__bone_musket2",
    "outer_wall__bone_musket3",
    "outer_wall__medusa_head_green1",
    "outer_wall__medusa_head_golden1",
    "outer_wall__sword_lord",
    "outer_wall__medusa_head_green2",
    "outer_wall__medusa_head_golden2",
    "long_hallway_return__stone_rose1",
    "long_hallway_return__stone_rose2",
    "long_hallway_return__diplocephalus1",
    "long_hallway_return__diplocephalus2",
    "long_hallway_return__diplocephalus3",
    "staircase_room_return__skeleton",
    "stopwatch_room_return__skeleton1",
    "stopwatch_room_return__slinger",
    "stopwatch_room_return__skeleton2",
    "ouija_table_room_return__skeleton1",
    "ouija_table_room_return__slinger",
    "ouija_table_room_return__skeleton2",
    "ouija_table_room_return__ouija_table1",
    "ouija_table_room_return__ouija_table2",
    "right_of_clock_room_return__flea_man",
    "skelerang_room__skelerang1",
    "skelerang_room__skelerang2",
    "skelerang_room__skelerang3",
    "skelerang_room__skelerang4",
    "olroxs_staircase__spectral_sword",
    "colosseum_entrance__blade_soldier1",
    "colosseum_entrance__blade_soldier2",
    "blade_master_room__blade_soldier1",
    "blade_master_room__blade_master1",
    "blade_master_room__blade_master2",
    "blade_master_room__blade_master3",
    "blade_master_room__blade_soldier2",
    "minotaurus_and_werewolf_fight__skip_werewolf_and_minotaurus",
    "minotaurus_and_werewolf_fight__kill_werewolf_then_minotaurus",
    "minotaurus_and_werewolf_fight__kill_minotaurus_then_werewolf",
    "minotaurus_and_werewolf_fight__double_kill_werewolf_and_minotaurus",
    "book_room__spellbook1",
    "book_room__spellbook2",
    "book_room__spellbook3",
    "book_room__spellbook4",
    "book_room__spellbook5",
    "book_room__spellbook6",
    "book_room__spellbook7",
    "book_room__spellbook8",
    "book_room__corpseweed",
    "flea_armor_and_dhuron_room__flea_armor1",
    "flea_armor_and_dhuron_room__flea_man1",
    "flea_armor_and_dhuron_room__Dhuron1",
    "flea_armor_and_dhuron_room__flea_armor2",
    "flea_armor_and_dhuron_room__flea_man2",
    "flea_armor_and_dhuron_room__Dhuron2",
    "flea_armor_and_dhuron_room__flea_armor3",
    "flea_armor_and_dhuron_room__flea_man3",
    "flea_armor_and_dhuron_room__Dhuron3",
    "flea_armor_and_dhuron_room__flea_armor4",
    "flea_armor_and_dhuron_room__flea_man4",
    "staircase_to_lesser_demon__flea_armor1",
    "staircase_to_lesser_demon__flea_man1",
    "staircase_to_lesser_demon__flea_armor2",
    "staircase_to_lesser_demon__flea_man2",
    "staircase_to_lesser_demon__lesser_demon",
    "library_escape__corpseweed",
    "library_escape__Dhuron1",
    "library_escape__Dhuron2",
    "library_escape__ectoplasm",
    "library_escape__Dhuron3",
    "library_escape__Dhuron4",
    "library_escape__Dhuron5",
    "clock_tower__harpy1",
    "clock_tower__harpy2",
    "clock_tower__harpy3",
    "clock_tower__harpy4",
    "strange_wall_room__sword_lord1",
    "strange_wall_room__sword_lord2",
    "strange_wall_room__sword_lord3",
    "strange_wall_room__sword_lord4",
    "karasumans_room__karasuman",
    "tombstone_room__tombstone1",
    "tombstone_room__tombstone2",
    "tombstone_room__tombstone3",
    "tombstone_room__tombstone4",
    "tombstone_room__tombstone5",
    "hallway_before_medusa__balloon_pod",
    "hallway_before_medusa__black_panther",
    "medusas_room__medusa",
    "hallway_after_medusa__black_panther1",
    "hallway_after_medusa__balloon_pod",
    "hallway_after_medusa__black_panther2",
    "balloon_pod_room_after_medusa__balloon_pod",
    "hallway_to_imp_room__black_panther1",
    "hallway_to_imp_room__balloon_pod1",
    "hallway_to_imp_room__black_panther2",
    "hallway_to_imp_room__black_panther3",
    "hallway_to_imp_room__balloon_pod2",
    "hallway_to_imp_room__black_panther4",
    "hallway_to_imp_room__balloon_pod3",
    "hallway_to_imp_room__balloon_pod4",
    "imp_room__sniper_of_goth1",
    "imp_room__sniper_of_goth2",
    "imp_room__sniper_of_goth3",
    "imp_room__imp1",
    "imp_room__imp2",
    "imp_room__imp3",
    "imp_room__imp4",
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
    console.log("xp: " + player.xp + ", level: " + player.level + ", level-up animations: " + player.level_up_animations);
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