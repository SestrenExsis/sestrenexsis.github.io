
import collections

monster_ids = {
    "Warg": 'warg',
    "Zombie": 'zombie',
    "Bat": 'bat',
    "Bone Scimitar": 'bone_scimitar',
    "Skeleton": 'skeleton',
    "Spittle Bone": 'spittle_bone',
    "Axe Knight (Green)": 'axe_knight_green',
    "Slogra": 'slogra',
    "Gaibon": 'gaibon',
    "Bloody Zombie": 'bloody_zombie',
    "Flea Man": 'flea_man',
    "Ouija Table": 'ouija_table',
    "Slinger": 'slinger',
    "Diplocephalus": 'diplocephalus',
    "Stone Rose": 'stone_rose',
    "Axe Knight (Blue)": 'axe_knight_blue',
    "Doppleganger10": 'doppleganger10',
    "Skeleton Ape": 'skeleton_ape',
    "Spear Guard": 'spear_guard',
    "Bone Archer": 'bone_archer',
    "Bone Musket": 'bone_musket',
    "Medusa Head (Green)": 'medusa_head_green',
    "Medusa Head (Golden)": 'medusa_head_golden',
    "Sword Lord": 'sword_lord',
    "Skelerang": 'skelerang',
    "Spectral Sword": 'spectral_sword',
    "Blade Soldier": 'blade_soldier',
    "Blade Master": 'blade_master',
    "Werewolf": 'werewolf',
    "Minotaurus": 'minotaurus',
    "Spellbook": 'spellbook',
    "Corpseweed": 'corpseweed',
    "Flea Armor": 'flea_armor',
    "Dhuron": 'Dhuron',
    "Lesser Demon": 'lesser_demon',
    "Ectoplasm": 'ectoplasm',
    "Harpy": 'harpy',
    "Vandal Sword": 'vandal_sword',
    "Karasuman": 'karasuman',
    "Tombstone": 'tombstone',
    "Balloon Pod": 'balloon_pod',
    "Black Panther": 'black_panther',
    "Medusa": 'medusa',
    "Sniper of Goth": 'sniper_of_goth',
    "Imp": 'imp',
    
    "Skip Slogra and Gaibon": 'skip_slogra_and_gaibon',
    "Slogra and Gaibon Double Kill": 'double_kill_slogra_and_gaibon',
    "No Slogra and Gaibon Double Kill": 'kill_slogra_and_gaibon',
    
    "Skip Werewolf and Minotaurus": "skip_werewolf_and_minotaurus",
    "Kill Werewolf First": 'kill_werewolf_then_minotaurus',
    "Kill Minotaurus First": 'kill_minotaurus_then_werewolf',
    "Werewolf and Minotaurus Double Kill": 'double_kill_werewolf_and_minotaurus',
}

groups = {
    "Skip Slogra and Gaibon": 'slogra_and_gaibon',
    "Slogra and Gaibon Double Kill": 'slogra_and_gaibon',
    "No Slogra and Gaibon Double Kill": 'slogra_and_gaibon',
    "Skip Werewolf and Minotaurus": "werewolf_and_minotaurus",
    "Kill Werewolf First": 'werewolf_and_minotaurus',
    "Kill Minotaurus First": 'werewolf_and_minotaurus',
    "Werewolf and Minotaurus Double Kill": 'werewolf_and_minotaurus',
}

rooms = [
    {
        'name': "Entrance - Gate",
        'id': "entrance",
        'type': "checkbox",
        'monsters': [
            'Warg',
        ],
    },
    {
        'name': "Entrance - Zombie Hallway",
        'id': "zombie_hallway",
        'type': "checkbox",
        'monsters': [
            'Warg',
            'Warg',
            'Zombie',
            'Warg',
            'Zombie',
            'Warg',
            'Zombie',
        ],
    },
    {
        'name': "Entrance - Merman Room",
        'id': "merman_room",
        'type': "checkbox",
        'monsters': [
            'Bat',
            'Bat',
            'Bat',
            'Bat',
        ],
    },
    {
        'name': "Entrance - Warg Hallway",
        'id': "warg_hallway",
        'type': "checkbox",
        'monsters': [
            'Warg',
            'Warg',
            'Warg',
        ],
    },
    {
        'name': "Entrance - Cube of Zoe Room",
        'id': "cube_of_zoe_room",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar',
            'Bone Scimitar',
        ],
    },
    {
        'name': "Alchemy Lab - Entrance",
        'id': "alchemy_lab_entrance",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar',
            'Bone Scimitar',
            'Skeleton',
        ],
    },
    {
        'name': "Alchemy Lab - Spike Room",
        'id': "alchemy_lab_spike_room",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar',
            'Bone Scimitar',
            'Bone Scimitar',
        ],
    },
    {
        'name': "Alchemy Lab - Zig Zag Stairs",
        'id': "zig_zag_stairs",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
        ],
    },
    {
        'name': "Alchemy Lab - Spittlebone Room 1",
        'id': "spittlebone_room_1",
        'type': "checkbox",
        'monsters': [
            'Spittle Bone',
            'Axe Knight (Green)',
            'Axe Knight (Green)',
            'Spittle Bone',
            'Spittle Bone',
        ],
    },
    {
        'name': "Alchemy Lab - Spittlebone Room 2",
        'id': "spittlebone_room_2",
        'type': "checkbox",
        'monsters': [
            'Spittle Bone',
            'Spittle Bone',
        ],
    },
    {
        'name': "Alchemy Lab - Slogra and Gaibon Room",
        'id': "slogra_and_gaibon_room",
        'type': "radio",
        'monsters': [
            'Skip Slogra and Gaibon',
            'Slogra and Gaibon Double Kill',
            'No Slogra and Gaibon Double Kill',
        ],
    },
    {
        'name': "Alchemy Lab - Room After Slogra and Gaibon",
        'id': "room_after_slogra_and_gaibon",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar',
            'Bone Scimitar',
            'Bloody Zombie',
        ],
    },
    {
        'name': "Alchemy Lab - Bloody Zombie Hallway",
        'id': "bloody_zombie_hallway",
        'type': "checkbox",
        'monsters': [
            'Bloody Zombie',
            'Bloody Zombie',
            'Bloody Zombie',
            'Bloody Zombie',
        ],
    },
    {
        'name': "Alchemy Lab - Exit",
        'id': "alchemy_lab_exit",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Green)',
            'Axe Knight (Green)',
            'Spittle Bone',
            'Axe Knight (Green)',
        ],
    },
    {
        'name': "Marble Gallery - Entrance",
        'id': "marble_gallery_entrance",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Green)',
            'Axe Knight (Green)',
            'Axe Knight (Green)',
        ],
    },
    {
        'name': "Marble Gallery - Lone Green Axe Knight",
        'id': "lone_green_axe_knight",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Green)',
        ],
    },
    {
        'name': "Marble Gallery - Left of Clock Room",
        'id': "left_of_clock_room",
        'type': "checkbox",
        'monsters': [
            'Flea Man',
            'Flea Man',
        ],
    },
    {
        'name': "Marble Gallery - Right of Clock Room",
        'id': "right_of_clock_room",
        'type': "checkbox",
        'monsters': [
            'Flea Man',
        ],
    },
    {
        'name': "Marble Gallery - Ouija Table Room",
        'id': "ouija_table_room",
        'type': "checkbox",
        'monsters': [
            'Ouija Table',
            'Ouija Table',
            'Skeleton',
            'Slinger',
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Stopwatch Room",
        'id': "stopwatch_room",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
            'Slinger',
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Staircase Room",
        'id': "staircase_room",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Long Hallway",
        'id': "long_hallway",
        'type': "checkbox",
        'monsters': [
            'Diplocephalus',
            'Diplocephalus',
            'Diplocephalus',
            'Stone Rose',
            'Stone Rose',
        ],
    },
    {
        'name': "Outer Wall - Before Doppel",
        'id': "outer_wall_before_doppel",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Blue)',
            'Axe Knight (Blue)',
        ],
    },
    {
        'name': "Outer Wall - Doppelganger Fight",
        'id': "doppelganger_fight",
        'type': "checkbox",
        'monsters': [
            'Doppleganger10',
        ],
    },
    {
        'name': "Outer Wall - Elevator Section",
        'id': "outer_wall",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
            'Skeleton Ape',
            'Spear Guard',
            'Axe Knight (Blue)',
            'Bone Archer',
            'Bone Musket',
            'Bone Musket',
            'Bone Musket',
            'Medusa Head (Green)',
            'Medusa Head (Golden)',
            'Sword Lord',
            'Medusa Head (Green)',
            'Medusa Head (Golden)',
        ],
    },
    {
        'name': "Marble Gallery - Long Hallway, Return",
        'id': "long_hallway_return",
        'type': "checkbox",
        'monsters': [
            'Stone Rose',
            'Stone Rose',
            'Diplocephalus',
            'Diplocephalus',
            'Diplocephalus',
        ],
    },
    {
        'name': "Marble Gallery - Staircase Room, Return",
        'id': "staircase_room_return",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Stopwatch Room, Return",
        'id': "stopwatch_room_return",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
            'Slinger',
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Ouija Table Room, Return",
        'id': "ouija_table_room_return",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
            'Slinger',
            'Skeleton',
            'Ouija Table',
            'Ouija Table',
        ],
    },
    {
        'name': "Marble Gallery - Right of Clock Room, Return",
        'id': "right_of_clock_room_return",
        'type': "checkbox",
        'monsters': [
            'Flea Man',
        ],
    },
    {
        'name': "Olrox's Quarters - Skelerang Room",
        'id': "skelerang_room",
        'type': "checkbox",
        'monsters': [
            'Skelerang',
            'Skelerang',
            'Skelerang',
            'Skelerang',
        ],
    },
    {
        'name': "Olrox's Quarters - Staircase",
        'id': "olroxs_staircase",
        'type': "checkbox",
        'monsters': [
            'Spectral Sword',
        ],
    },
    {
        'name': "Colosseum - Entrance",
        'id': "colosseum_entrance",
        'type': "checkbox",
        'monsters': [
            'Blade Soldier',
            'Blade Soldier',
        ],
    },
    {
        'name': "Colosseum - Blade Master Room",
        'id': "blade_master_room",
        'type': "checkbox",
        'monsters': [
            'Blade Soldier',
            'Blade Master',
            'Blade Master',
            'Blade Master',
            'Blade Soldier',
        ],
    },
    {
        'name': "Colosseum - Minotaurus and Werewolf Fight",
        'id': "minotaurus_and_werewolf_fight",
        'type': "radio",
        'monsters': [
            'Skip Werewolf and Minotaurus',
            'Kill Werewolf First',
            'Kill Minotaurus First',
            'Werewolf and Minotaurus Double Kill',
        ],
    },
    {
        'name': "Long Library - Book Room",
        'id': "book_room",
        'type': "checkbox",
        'monsters': [
            'Spellbook',
            'Spellbook',
            'Spellbook',
            'Spellbook',
            'Spellbook',
            'Spellbook',
            'Spellbook',
            'Spellbook',
            'Corpseweed',
        ],
    },
    {
        'name': "Long Library - Flea Armor and Dhuron Room",
        'id': "flea_armor_and_dhuron_room",
        'type': "checkbox",
        'monsters': [
            'Flea Armor',
            'Flea Man',
            'Dhuron',
            'Flea Armor',
            'Flea Man',
            'Dhuron',
            'Flea Armor',
            'Flea Man',
            'Dhuron',
            'Flea Armor',
            'Flea Man',
        ],
    },
    {
        'name': "Long Library - Staircase to Lesser Demon",
        'id': "staircase_to_lesser_demon",
        'type': "checkbox",
        'monsters': [
            'Flea Armor',
            'Flea Man',
            'Flea Armor',
            'Flea Man',
            'Lesser Demon',
        ],
    },
    {
        'name': "Long Library - Library Escape",
        'id': "library_escape",
        'type': "checkbox",
        'monsters': [
            'Corpseweed',
            'Dhuron',
            'Dhuron',
            'Ectoplasm',
            'Dhuron',
            'Dhuron',
            'Dhuron',
        ],
    },
    {
        'name': "Clock Tower - Entrance",
        'id': "clock_tower",
        'type': "checkbox",
        'monsters': [
            'Harpy',
            'Harpy',
            'Harpy',
            'Harpy',
        ],
    },
    {
        'name': "Clock Tower - Strange Wall Room",
        'id': "strange_wall_room",
        'type': "checkbox",
        'monsters': [
            'Sword Lord',
            'Sword Lord',
            'Sword Lord',
            'Sword Lord',
        ],
    },
    {
        'name': "Clock Tower - Karasuman's Room",
        'id': "karasumans_room",
        'type': "checkbox",
        'monsters': [
            'Karasuman',
        ],
    },
    {
        'name': "Reverse Keep - Tombstone Room",
        'id': "tombstone_room",
        'type': "checkbox",
        'monsters': [
            'Tombstone',
            'Tombstone',
            'Tombstone',
            'Tombstone',
            'Tombstone',
        ],
    },
    {
        'name': "Anti-Chapel - Hallway Before Medusa",
        'id': "hallway_before_medusa",
        'type': "checkbox",
        'monsters': [
            'Balloon Pod',
            'Black Panther',
        ],
    },
    {
        'name': "Anti-Chapel - Medusa's Room",
        'id': "medusas_room",
        'type': "checkbox",
        'monsters': [
            'Medusa',
        ],
    },
    {
        'name': "Anti-Chapel - Hallway After Medusa",
        'id': "hallway_after_medusa",
        'type': "checkbox",
        'monsters': [
            'Black Panther',
            'Balloon Pod',
            'Black Panther',
        ],
    },
    {
        'name': "Anti-Chapel - Balloon Pod Room After Medusa",
        'id': "balloon_pod_room_after_medusa",
        'type': "checkbox",
        'monsters': [
            'Balloon Pod',
        ],
    },
    {
        'name': "Anti-Chapel - Hallway to Imp Room",
        'id': "hallway_to_imp_room",
        'type': "checkbox",
        'monsters': [
            'Black Panther',
            'Balloon Pod',
            'Black Panther',
            'Black Panther',
            'Balloon Pod',
            'Black Panther',
            'Balloon Pod',
            'Balloon Pod',
        ],
    },
    {
        'name': "Anti-Chapel - Imp Room",
        'id': "imp_room",
        'type': "checkbox",
        'monsters': [
            'Sniper of Goth',
            'Sniper of Goth',
            'Sniper of Goth',
            'Imp',
            'Imp',
            'Imp',
            'Imp',
        ],
    },
]


if __name__ == '__main__':
    html = []
    html.append('<!DOCTYPE html>')
    html.append('<html>')
    html.append('    <body>')
    html.append('        <form>')
    indent = 3 * '    '
    for room in rooms:
        html.append(f'{indent}<fieldset>')
        room_name = room['name']
        room_id = room['id']
        input_type = room['type']
        html.append(f'{indent}    <legend>{room_name}</legend>')
        monster_totals = collections.defaultdict(int)
        for monster_name in room['monsters']:
            monster_totals[monster_name] += 1
        monster_counts = collections.defaultdict(int)
        for monster_name in room['monsters']:
            monster_counts[monster_name] += 1
            monster_title = monster_name
            monster_id = monster_ids[monster_name]
            if monster_totals[monster_name] > 1:
                monster_title += ' ' + str(monster_counts[monster_name])
                monster_id += str(monster_counts[monster_name])
            unique_monster_id = f'{room_id}__{monster_id}'
            print('    "' + unique_monster_id + '",')
            if input_type == 'radio':
                group = groups[monster_name]
                html.append(f'{indent}    <input type="{input_type}" id="{unique_monster_id}" name="{room_name}" value="{monster_name}">')
            else:
                html.append(f'{indent}    <input type="{input_type}" id="{unique_monster_id}" name="{room_name}" value="{monster_name}">')
            html.append(f'{indent}    <label for="{unique_monster_id}"> {monster_title}</label><br>')
        html.append(f'{indent}</fieldset>')
    html.append('        </form>')
    html.append('        <script type="text/javascript" src="experience_route.js"></script>')
    html.append('    </body>')
    html.append('</html>')
    with open('experience_route.out', 'w', encoding="utf-8") as open_file:
        for line in html:
            open_file.write(line + '\n')