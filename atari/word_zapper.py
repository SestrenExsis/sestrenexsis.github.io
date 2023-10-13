
import argparse
import collections
import random
import sys

class ROM:
    def __init__(self, path: str):
        self.bytes = []
        with open(path, 'rb') as file:
            self.bytes = bytearray(file.read())

    def visualize(self):
        for row in range(256):
            row_data = []
            for col in range(16):
                index = 16 * row + col
                cell = '{:02X}'.format(self.bytes[index])
                row_data.append(cell)
            print(' '.join(row_data))
    
    def peek(self, address: int) -> int:
        result = self.bytes[address]
        return result

class WordZapper:
    char_bank = 'ETOAINSHRDLUPFMC'
    word_bank = {
        'LAST',
        'DUST',
        'RAIN',
        'SHED',
        'FAST',
        'FOUR',
        'MARS',
        'POOF',
        'STAR',
        'MOON',
        'SHIP',
        'FIRE',
        'SHOT',
        'THEM',
        'TIME',
        'LAND',
        'SAUCE',
        'SPACE',
        'SPELL',
        'FLASH',
        'LASER',
        'SHOOT',
        'TIMER',
        'RESET',
        'COLOR',
        'SUPER',
        'COUNT',
        'FLAME',
        'SPACE', # Duplicate entry found in the original ROM
        'ALIEN',
        'SOUND',
        'THREE',
        'SAUCER',
        'METEOR',
        'RANDOM',
        'LETTER',
        'SELECT',
        'STRIPE',
        'PLEASE',
        'ACTION',
        'PUFFER',
        'SCREEN',
        'SCROLL',
        'UNSAFE',
        'ROTATE',
        'NETHER',
        'MANUAL',
        'DIRECT',
    }

    def __init__(self, rom: ROM):
        self.name = 'Word Zapper'
        self.rom = rom
        # self.chars = set()
        self.words = collections.defaultdict(set)
        self.seed = None
    
    def peek(self, address: int) -> int:
        result = self.rom.peek(address - 0xf000)
        return result
    
    def poke(self, address: int, value: int):
        self.rom.bytes[address - 0xf000] = value
    
    def char2index(self, char: str) -> int:
        index = self.char_bank.index(char)
        result = index
        return result
    
    def _generate(self):
        self.words = collections.defaultdict(set)
        chars_used = set()
        for size in (6, 5, 4):
            while len(self.words[size]) < 16:
                choices = list(sorted(set(
                    word for word in
                    self.word_bank if
                    len(word) == size and len(chars_used | set(word)) <= 16
                ) - self.words[size]))
                choice = random.choice(list(choices))
                chars_used |= set(choice)
                self.words[size].add(choice)
        self.char_bank = ''.join(sorted(chars_used))
        for i, char in enumerate(self.char_bank):
            value = 0x41 + ord(char) - ord('A')
            self.poke(0xf9b3 + i, value)
        # Randomize the 4-letter words
        for i, word in enumerate(self.words[4]):
            c0 = self.char2index(word[0])
            c1 = self.char2index(word[1])
            c2 = self.char2index(word[2])
            c3 = self.char2index(word[3])
            bytes = [
                (0x10 * c3) | c2,
                (0x10 * c1) | c0,
            ]
            self.poke(0xf9c3 + 2 * i + 0, bytes[0])
            self.poke(0xf9c3 + 2 * i + 1, bytes[1])
        # Randomize the 5-letter words
        for i, word in enumerate(self.words[5]):
            c0 = self.char2index(word[0])
            c1 = self.char2index(word[1])
            c2 = self.char2index(word[2])
            c3 = self.char2index(word[3])
            c4 = self.char2index(word[4])
            c5 = 0
            bytes = [
                (0x10 * c5) | c4,
                (0x10 * c3) | c2,
                (0x10 * c1) | c0,
            ]
            self.poke(0xf9e3 + 3 * i + 0, bytes[0])
            self.poke(0xf9e3 + 3 * i + 1, bytes[1])
            self.poke(0xf9e3 + 3 * i + 2, bytes[2])
        # Randomize the 6-letter words
        for i, word in enumerate(self.words[6]):
            c0 = self.char2index(word[0])
            c1 = self.char2index(word[1])
            c2 = self.char2index(word[2])
            c3 = self.char2index(word[3])
            c4 = self.char2index(word[4])
            c5 = self.char2index(word[5])
            bytes = [
                (0x10 * c5) | c4,
                (0x10 * c3) | c2,
                (0x10 * c1) | c0,
            ]
            self.poke(0xfa13 + 3 * i + 0, bytes[0])
            self.poke(0xfa13 + 3 * i + 1, bytes[1])
            self.poke(0xfa13 + 3 * i + 2, bytes[2])
    
    def randomize(self, seed: int):
        self.seed = seed
        random.seed(seed)
        while True:
            try:
                self._generate()
                break
            except IndexError:
                pass

    def get_spoiler(self) -> dict:
        words = set()
        words |= self.words[4]
        words |= self.words[5]
        words |= self.words[6]
        spoiler = {
            'seed': self.seed,
            'chars': self.char_bank,
            'words': words,
        }
        result = spoiler
        return result

def _hex(val: int):
    result = '{:02X}'.format(val)
    return result

if __name__ == '__main__':
    '''
    Usage
    python randomizer.py "roms/Word Zapper (USA).a26"
    '''
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'rom_filepath',
        help='Path to a valid Atari 2600 ROM',
        type=str,
    )
    parser.add_argument(
        '--spoiler',
        action='store_true',
        help='Show spoiler log',
    )
    args = parser.parse_args()
    # Read the original ROM
    rom = ROM(args.rom_filepath)
    # Randomize the game's ROM
    game = WordZapper(rom)
    # Use custom word list
    game.word_bank = set()
    with open('wordlist.txt') as file:
        for raw_line in file:
            line = raw_line.strip().upper()
            if (
                4 <= len(line) <= 6 and
                len(set(line) - set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')) < 1
            ):
                game.word_bank.add(line)
    game.randomize(random.randrange(sys.maxsize))
    # Write the randomized ROM
    with open('word_zapper_rando.bin', 'wb') as file:
        file.write(rom.bytes)
    if args.spoiler:
        spoiler = game.get_spoiler()
        print('seed:', spoiler['seed'])
        print('chars:', spoiler['chars'])
        print('words:')
        word_count = 0
        for word in sorted(spoiler['words']):
            print(word, end=' ')
            word_count += 1
            if word_count >= 16:
                print('')
                word_count = 0