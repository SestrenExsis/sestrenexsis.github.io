## SOTN Shuffler Devlog Entry

### Some minor bugs are worth spending a lot of time fixing

###### 🐛 created on 2025-12-17, last updated on 2025-12-17

Agonizing over the waterfall sound bug has been an interesting tug-of-war between wanting to get one very specific, largely superfluous, bug fixed and wanting to not get distracted by it and instead focus on adding more impactful features to the project. From a practicality standpoint, it doesn't matter that much whether the bug gets addressed. At worst, not fixing the bug would result in [minor annoyances when the sound plays in areas it shouldn't](https://sestrenexsis.github.io/devlog/2025-11-26-waterfall-sound-bug.html).

However, one of the goals of this project has always been to understand on a deeper level how the rooms and stages in this game are put together, and sometimes tiny bugs can give you a chance to understand the overall system better.

In the end, going down the rabbit hole was worth it; adding the [ability to move entities around to other rooms](https://github.com/SestrenExsis/SOTN-Patcher/pull/51) not only allowed me to fix the bug, it enhanced the functionality of the shuffler, as well.

[Return to main page](https://sestrenexsis.github.io)