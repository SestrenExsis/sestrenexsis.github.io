# Triple Fish

In Castlevania: Symphony of the Night, at the bottom of the Outer Wall, there is a telescope. When you peer into this telescope, a brief cutscene plays that shows an area with lots of water and, depending on your luck, the Ferryman and one or more fish.

After peering into the telescope, if you immediately try to peer into it again, nothing will happen. However, if you leave the room and come back, you will be allowed another glimpse. Each time you do this, the game will randomly decide whether or not the Ferryman will be shown as well as randomly decide how many fish (between 0 and 3) will jump out of the water.

So, what are the exact odds of getting all three fish to jump out?

Outer Wall

All three fish are always created, but very often they are placed out of view or drawn behind everything else to achieve the effect of them "not spawning."

```c
for (i = 0; i < 3; i++) {
    // Choose one of 8 possible options
    rnd = Random() & 7;
    // 50% chance of forcing the last option
    if (!(Random() & 1)) {
        rnd = 7;
    }
    D_us_80181474 = {
    //    X Pos   Y Pos   Scale
    //    ------  ------  ------
        { 134, 126, 100.000 }, // 0, normal scale
        { 104, 128,  87.500 }, // 1, smaller scale
        { 136, 152, 103.125 }, // 2, bigger scale
        { 112, 112,  75.000 }, // 3, smaller scale
        { 144, 144, 112.500 }, // 4, bigger scale
        { 116, 148,  75.000 }, // 5, smaller scale
        { 152, 128, 100.000 }, // 6, normal scale
        {   0,   0, 100.000 }, // 7, off-screen
    }
    posX = D_us_80181474[rnd][0];
    posY = D_us_80181474[rnd][1];
    scaleX = D_us_80181474[rnd][2];
    // ...
    if (scaleX < 100.000) {
        zPriority -= 4;
    }
}
```

Why are there 8 slots in the array, but only 4 that we see?

###### 🍂 created on 2025-08-21, last updated on 2025-08-21

## Categorization system
🍂 _Leaves_ are for random thoughts that aren't likely to be revisited once posted
