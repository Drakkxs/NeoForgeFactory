// priority: 0
// requires: projecte
// @ts-check
// Modify tooltips of ProjectE EMC to be more immersive and informative

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    global.jadeCallBack = function(tooltip, accessor) {
        console.log("Accessor", accessor)
        console.log("Hit Result", accessor.hitResult)
        if (!accessor.hitResult) return
        let item = accessor.getPickedResult()
        console.log(item)
        let lines = tooltip.getTooltip().get("projecte:emc_provider")
        for (let line of lines) {
            console.log("Line", line)
            console.log("Message", line.getMessage())
        }
    };

    StartupEvents.postInit(event => {
        let $WailaClientRegistration
        if (Platform.isClientEnvironment()) {
            // @ts-expect-error 
            $WailaClientRegistration = Java.loadClass("snownee.jade.impl.WailaClientRegistration")
            $WailaClientRegistration.instance().addTooltipCollectedCallback(0, (tooltip, accessor) => {
                global.jadeCallBack(tooltip, accessor)
            })
            $WailaClientRegistration.instance().tooltipCollectedCallback.sort()
        }
    });
})()