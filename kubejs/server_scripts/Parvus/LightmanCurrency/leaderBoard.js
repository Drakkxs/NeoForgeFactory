// priority: 0
// requires: lightmanscurrency
// @ts-check
// Shows joining players the bank leaderboard

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    let debug = false; // Want some debug?
    PlayerEvents.loggedIn(event => {

        // Run the command for the plahyer
        event.player.runCommand('/lcbaltop')
    })

})()
