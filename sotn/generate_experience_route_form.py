
import collections

monster_ids = {
    "Warg": 'a',
    "Zombie": 'b',
    "Bat": 'c',
    "Bone Scimitar": 'd',
    "Skeleton": 'e',
    "Spittle Bone": 'f',
    "Axe Knight (Green)": 'g',
    "Slogra": 'h',
    "Gaibon": 'i',
    "Bloody Zombie": 'j',
    "Flea Man": 'k',
    "Ouija Table": 'l',
    "Slinger": 'm',
    "Diplocephalus": 'n',
    "Stone Rose": 'o',
    "Axe Knight (Blue)": 'p',
    "Doppleganger10": 'q',
    "Skeleton Ape": 'r',
    "Spear Guard": 's',
    "Bone Archer": 't',
    "Bone Musket": 'u',
    "Medusa Head (Green)": 'v',
    "Medusa Head (Golden)": 'w',
    "Sword Lord": 'x',
    "Skelerang": 'y',
    "Spectral Sword": 'z',
    "Blade Soldier": 'A',
    "Blade Master": 'B',
    "Werewolf": 'C',
    "Minotaurus": 'D',
    "Spellbook": 'E',
    "Corpseweed": 'F',
    "Flea Armor": 'G',
    "Dhuron": 'H',
    "Lesser Demon": 'I',
    "Ectoplasm": 'J',
    "Harpy": 'K',
    "Vandal Sword": 'L',
    "Karasuman": 'M',
    "Tombstone": 'N',
    "Balloon Pod": 'O',
    "Black Panther": 'P',
    "Medusa": 'Q',
    "Sniper of Goth": 'R',
    "Imp": 'S',
    
    "Skip Slogra and Gaibon": 'T',
    "Slogra and Gaibon Double Kill": 'U',
    "No Slogra and Gaibon Double Kill": 'V',
    
    "Skip Werewolf and Minotaurus": "W",
    "Kill Werewolf First": 'X',
    "Kill Minotaurus First": 'Y',
    "Werewolf and Minotaurus Double Kill": 'Z',
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
        'id': "aa",
        'type': "checkbox",
        'monsters': [
            'Warg*',
        ],
    },
    {
        'name': "Entrance - Zombie Hallway",
        'id': "ab",
        'type': "checkbox",
        'monsters': [
            'Warg*',
            'Warg*',
            'Zombie*',
            'Warg*',
            'Zombie',
            'Warg*',
            'Zombie',
        ],
    },
    {
        'name': "Entrance - Merman Room",
        'id': "ac",
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
        'id': "ad",
        'type': "checkbox",
        'monsters': [
            'Warg*',
            'Warg*',
            'Warg*',
        ],
    },
    {
        'name': "Entrance - Cube of Zoe Room",
        'id': "ae",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar*',
            'Bone Scimitar*',
        ],
    },
    {
        'name': "Alchemy Lab - Entrance",
        'id': "ba",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar*',
            'Bone Scimitar*',
            'Skeleton*',
        ],
    },
    {
        'name': "Alchemy Lab - Spike Room",
        'id': "bb",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar*',
            'Bone Scimitar',
            'Bone Scimitar',
        ],
    },
    {
        'name': "Alchemy Lab - Zig Zag Stairs",
        'id': "bc",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
        ],
    },
    {
        'name': "Alchemy Lab - Spittlebone Room 1",
        'id': "bd",
        'type': "checkbox",
        'monsters': [
            'Spittle Bone',
            'Axe Knight (Green)*',
            'Axe Knight (Green)',
            'Spittle Bone',
            'Spittle Bone',
        ],
    },
    {
        'name': "Alchemy Lab - Spittlebone Room 2",
        'id': "be",
        'type': "checkbox",
        'monsters': [
            'Spittle Bone',
            'Spittle Bone',
        ],
    },
    {
        'name': "Alchemy Lab - Slogra and Gaibon Room",
        'id': "bf",
        'type': "radio",
        'monsters': [
            'Skip Slogra and Gaibon',
            'Slogra and Gaibon Double Kill*',
            'No Slogra and Gaibon Double Kill',
        ],
    },
    {
        'name': "Alchemy Lab - Room After Slogra and Gaibon",
        'id': "bg",
        'type': "checkbox",
        'monsters': [
            'Bone Scimitar*',
            'Bone Scimitar*',
            'Bloody Zombie',
        ],
    },
    {
        'name': "Alchemy Lab - Bloody Zombie Hallway",
        'id': "bh",
        'type': "checkbox",
        'monsters': [
            'Bloody Zombie*',
            'Bloody Zombie*',
            'Bloody Zombie*',
            'Bloody Zombie*',
        ],
    },
    {
        'name': "Alchemy Lab - Exit",
        'id': "bi",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Green)',
            'Axe Knight (Green)',
            'Spittle Bone',
            'Axe Knight (Green)*',
        ],
    },
    {
        'name': "Marble Gallery - Entrance",
        'id': "ca",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Green)*',
            'Axe Knight (Green)*',
            'Axe Knight (Green)*',
        ],
    },
    {
        'name': "Marble Gallery - Lone Green Axe Knight",
        'id': "cb",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Green)*',
        ],
    },
    {
        'name': "Marble Gallery - Left of Clock Room",
        'id': "cc",
        'type': "checkbox",
        'monsters': [
            'Flea Man*',
            'Flea Man*',
        ],
    },
    {
        'name': "Marble Gallery - Right of Clock Room",
        'id': "cd",
        'type': "checkbox",
        'monsters': [
            'Flea Man*',
        ],
    },
    {
        'name': "Marble Gallery - Ouija Table Room",
        'id': "ce",
        'type': "checkbox",
        'monsters': [
            'Ouija Table*',
            'Ouija Table*',
            'Skeleton*',
            'Slinger*',
            'Skeleton*',
        ],
    },
    {
        'name': "Marble Gallery - Stopwatch Room",
        'id': "cf",
        'type': "checkbox",
        'monsters': [
            'Skeleton*',
            'Slinger*',
            'Skeleton*',
        ],
    },
    {
        'name': "Marble Gallery - Staircase Room",
        'id': "cg",
        'type': "checkbox",
        'monsters': [
            'Skeleton*',
        ],
    },
    {
        'name': "Marble Gallery - Long Hallway",
        'id': "ch",
        'type': "checkbox",
        'monsters': [
            'Diplocephalus*',
            'Diplocephalus*',
            'Diplocephalus*',
            'Stone Rose*',
            'Stone Rose*',
        ],
    },
    {
        'name': "Outer Wall - Before Doppel",
        'id': "da",
        'type': "checkbox",
        'monsters': [
            'Axe Knight (Blue)*',
            'Axe Knight (Blue)',
        ],
    },
    {
        'name': "Outer Wall - Doppelganger Fight",
        'id': "db",
        'type': "checkbox",
        'monsters': [
            'Doppleganger10*',
        ],
    },
    {
        'name': "Outer Wall - Elevator Section",
        'id': "dc",
        'type': "checkbox",
        'monsters': [
            'Skeleton*',
            'Skeleton Ape*',
            'Spear Guard*',
            'Axe Knight (Blue)*',
            'Bone Archer*',
            'Bone Musket*',
            'Bone Musket*',
            'Bone Musket*',
            'Medusa Head (Green)',
            'Medusa Head (Golden)',
            'Sword Lord*',
            'Medusa Head (Green)',
            'Medusa Head (Golden)',
        ],
    },
    {
        'name': "Marble Gallery - Long Hallway, Return",
        'id': "ea",
        'type': "checkbox",
        'monsters': [
            'Stone Rose*',
            'Stone Rose*',
            'Diplocephalus*',
            'Diplocephalus*',
            'Diplocephalus*',
        ],
    },
    {
        'name': "Marble Gallery - Staircase Room, Return",
        'id': "eb",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Stopwatch Room, Return",
        'id': "ec",
        'type': "checkbox",
        'monsters': [
            'Skeleton',
            'Slinger',
            'Skeleton',
        ],
    },
    {
        'name': "Marble Gallery - Ouija Table Room, Return",
        'id': "ed",
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
        'id': "ee",
        'type': "checkbox",
        'monsters': [
            'Flea Man',
        ],
    },
    {
        'name': "Olrox's Quarters - Skelerang Room",
        'id': "fa",
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
        'id': "fb",
        'type': "checkbox",
        'monsters': [
            'Spectral Sword',
        ],
    },
    {
        'name': "Colosseum - Entrance",
        'id': "ga",
        'type': "checkbox",
        'monsters': [
            'Blade Soldier*',
            'Blade Soldier*',
        ],
    },
    {
        'name': "Colosseum - Blade Master Room",
        'id': "gb",
        'type': "checkbox",
        'monsters': [
            'Blade Soldier*',
            'Blade Master',
            'Blade Master',
            'Blade Master',
            'Blade Soldier*',
        ],
    },
    {
        'name': "Colosseum - Minotaurus and Werewolf Fight",
        'id': "gc",
        'type': "radio",
        'monsters': [
            'Skip Werewolf and Minotaurus',
            'Kill Werewolf First*',
            'Kill Minotaurus First',
            'Werewolf and Minotaurus Double Kill',
        ],
    },
    {
        'name': "Long Library - Book Room",
        'id': "ha",
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
        'id': "hb",
        'type': "checkbox",
        'monsters': [
            'Flea Armor',
            'Flea Man',
            'Dhuron*',
            'Flea Armor',
            'Flea Man',
            'Dhuron*',
            'Flea Armor',
            'Flea Man',
            'Dhuron',
            'Flea Armor',
            'Flea Man',
        ],
    },
    {
        'name': "Long Library - Staircase to Lesser Demon",
        'id': "hc",
        'type': "checkbox",
        'monsters': [
            'Flea Armor',
            'Flea Man',
            'Flea Armor*',
            'Flea Man',
            'Lesser Demon*',
        ],
    },
    {
        'name': "Long Library - Library Escape",
        'id': "hd",
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
        'id': "ia",
        'type': "checkbox",
        'monsters': [
            'Harpy',
            'Harpy',
            'Harpy',
            'Harpy',
        ],
    },
    {
        'name': "Clock Tower - Funny Wall Room",
        'id': "ib",
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
        'id': "ic",
        'type': "checkbox",
        'monsters': [
            'Karasuman*',
        ],
    },
    {
        'name': "Reverse Keep - Tombstone Room",
        'id': "ja",
        'type': "checkbox",
        'monsters': [
            'Tombstone*',
            'Tombstone*',
            'Tombstone*',
            'Tombstone*',
            'Tombstone*',
        ],
    },
    {
        'name': "Anti-Chapel - Hallway Before Medusa",
        'id': "ka",
        'type': "checkbox",
        'monsters': [
            'Balloon Pod',
            'Black Panther',
        ],
    },
    {
        'name': "Anti-Chapel - Medusa's Room",
        'id': "kb",
        'type': "checkbox",
        'monsters': [
            'Medusa*',
        ],
    },
    {
        'name': "Anti-Chapel - Hallway After Medusa",
        'id': "kc",
        'type': "checkbox",
        'monsters': [
            'Black Panther',
            'Balloon Pod',
            'Black Panther',
        ],
    },
    {
        'name': "Anti-Chapel - Balloon Pod Room After Medusa",
        'id': "kd",
        'type': "checkbox",
        'monsters': [
            'Balloon Pod',
        ],
    },
    {
        'name': "Anti-Chapel - Hallway to Imp Room",
        'id': "ke",
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
        'id': "kf",
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

# ?aa=1&ab=1111110&ac=0000&ad=111&ae=11&ba=111&bb=100&bc=0&bd=01100
# id="aa00"
# id="ab00" through "ab06"

strong = ' style="font-weight: bold"'

if __name__ == '__main__':
    html = []
    indent = 3 * '    '
    html.append(f'{indent}<form>')
    for room in rooms:
        html.append(f'{indent}    <fieldset>')
        room_name = room['name']
        room_id = room['id']
        input_type = room['type']
        html.append(f'{indent}        <legend class="collapser">{room_name}</legend>')
        html.append(f'{indent}        <div class="collapsible">')
        monster_totals = collections.defaultdict(int)
        for monster_code in room['monsters']:
            monster_name = monster_code.replace('*', '')
            monster_totals[monster_name] += 1
        monster_counts = collections.defaultdict(int)
        for monster_code in room['monsters']:
            monster_name = monster_code.replace('*', '')
            style = ' style="font-weight: bold"' if (monster_code[-1] == '*') else ''
            monster_counts[monster_name] += 1
            monster_title = monster_name
            monster_id = monster_ids[monster_name] + str(monster_counts[monster_name])
            if monster_totals[monster_name] > 1:
                monster_title += ' ' + str(monster_counts[monster_name])
            unique_monster_id = f'{room_id}{monster_id}'
            print('    "' + unique_monster_id + '",')
            if input_type == 'radio':
                group = groups[monster_name]
                html.append(f'{indent}            <input type="{input_type}" id="{unique_monster_id}" name="{room_name}" value="{monster_name}">')
            else:
                html.append(f'{indent}            <input type="{input_type}" id="{unique_monster_id}" name="{room_name}" value="{monster_name}">')
            html.append(f'{indent}            <label for="{unique_monster_id}"{style}> {monster_title}</label><br>')
        html.append(f'{indent}        </div>')
        html.append(f'{indent}    </fieldset>')
    html.append(f'{indent}</form>')
    with open('experience_route.out', 'w', encoding="utf-8") as open_file:
        for line in html:
            open_file.write(line + '\n')