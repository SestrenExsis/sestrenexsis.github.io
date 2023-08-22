
var url_parameters = new URLSearchParams(window.location.search);
var inputs = [
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
]

var xp = 0;
var level = 1;

function kill() {

}

function refresh(update_url) {
    xp = 0;
    level = 1;
    inputs.forEach((input_id) => {
        if (document.getElementById(input_id).checked) {
            xp += 1;
            if (xp % 4 == 0) {
                level += 1;
            }
        }
    });
    console.log("xp: " + xp + ", level: " + level);
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