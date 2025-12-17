## SOTN Shuffler Devlog Entry

### Fixing the waterfall sound bug has turned into a side project all its own

###### 🐛 created on 2025-11-26, last updated on 2025-12-17

The `Underground Caverns, Waterfall` room has four rooms adjacent to it, and in the vanilla game those rooms each have a single instance of the `Waterfall Sound Entity` responsible for fading and panning the waterfall sound appropriately to give you the auditory sensation of "approaching" a large waterfall.

When the sound entities are aligned properly, waterfall sounds produced in any one of these rooms are controlled by the entities in the other rooms and contained inside their proper area.

![Waterfall sound contained inside the proper area](waterfall-sound-without-bug.png)

When [the Shuffler](https://github.com/SestrenExsis/SOTN-Shuffler) moves one of the rooms adjacent to the waterfall room somewhere else, this can cause auditory bugs. When the sound entities are misaligned, waterfall sounds can "leak" into other rooms, sometimes permanently staying on until you either leave the stage or find another room with one of these sound entities.

![Waterfall sound leaking into other rooms](waterfall-sound-with-bug.png)

The [original solution](https://github.com/SestrenExsis/SOTN-Shuffler/pull/118) to this problem was to move these special sound entities to whatever room had been placed adjacent to the waterfall room, and this solution appeared to solve the issue once and for all. There were, however, a few corner cases still left to handle.

If it turns out that one of the Save Rooms is placed next to `Underground Caverns, Waterfall`, all other Save Rooms in the stage will inherit the same `Waterfall Sound Entity`. This can result in a number of [auditory glitches](https://github.com/SestrenExsis/SOTN-Shuffler/issues/175), such as Save Rooms that aren't even connected to the waterfall room having a waterfall sound, or two Save Rooms that are both connected to the waterfall room sharing the same panning effect, only one of which sounds correct.

It makes sense that this would happen if you consider how the Entity Layout table works. With the exception of the False Save Room that leads to the fight with Succubus, all Save Rooms in the game are generally assigned the same row in their respective stage's Entity Layout table. This means it is technically  impossible[^1] to alter one Save Room without affecting all others.

One solution would be to disallow Save Rooms from being placed next to the waterfall room at all, and there is precedent in the vanilla game that supports this as the preferred solution. The vanilla game would likely have not allowed Save Rooms to be adjacent to `Underground Caverns, Waterfall` just to avoid having to devote an Entity Layout row to it.

There is one other pair of rooms in `Underground Caverns` that share an Entity Layout row, and that is the unceremoniously-named `Room ID 10`, and `Scylla Worm Room`[^2]. These rooms will suffer from the same limitation as Save Rooms in not allowing entites to be moved into them without it affecting both rooms.

[^1]: It is not, strictly speaking, impossible, but it cannot be done without assigning one of the Save Rooms to its own unique row in the Entity Layout table, and it's possible there may not even be room to do so.

[^2]: Although `Scylla Worm Room` does have entities in it when you first encounter it in the game, those entities and that version of the room actually come from a separate stage called `Boss - Scylla` that clones a few of the rooms from `Underground Caverns` and has a few of its own unique behaviors such as the flooding effect. In the non-Boss version of the stage, `Scylla Worm Room` is devoid of entities.

[Return to main page](https://sestrenexsis.github.io)