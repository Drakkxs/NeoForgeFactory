// priority: 0
// requires: projecte
// @ts-check
// Modify tooltips of ProjectE EMC to be more immersive and informative

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    let $Integer = Java.loadClass("java.lang.Integer")
    let $ElementHelper = Java.loadClass("snownee.jade.impl.ui.ElementHelper")
    let $NumberFormat = Java.loadClass("java.text.NumberFormat")
    // let $Util = Java.loadClass("net.minecraft.Util")
    let $IElement = Java.loadClass("snownee.jade.api.ui.IElement")
    let $ListType = Java.loadClass("java.util.ArrayList")

    let PROJECTE_FORMATTER = $NumberFormat.getInstance()
    PROJECTE_FORMATTER.setMaximumFractionDigits(1)
    // Another way to format values. Lang file has this covered for now.
    // let CURRENCY_FORMATTER = $NumberFormat.getNumberInstance()
    let NUMBER_FORMATTER = $NumberFormat.getNumberInstance()
    NUMBER_FORMATTER.setMinimumFractionDigits(2)

    global.jadeCallBack = function (tooltip, accessor) {
        if (!accessor.hitResult) return

        tooltip.getTooltip()["replace(net.minecraft.resources.ResourceLocation,java.util.function.UnaryOperator)"]("projecte:emc_provider", (/** @type {$ListType<$ListType<$IElement>>}*/ listOfLines) => {
            for (let lines of listOfLines) {
                let idx = lines.findIndex((line) => line.text?.contents?.key == "emc.projecte.tooltip")
                if (idx == -1) return listOfLines

                let text = lines.get(idx).text
                let textStyle = text.getStyle()

                let valueComponent = text.contents.args[0]
                let valueStyle = valueComponent.getStyle()
                let valueText = valueComponent.getContents().text()

                let newValue = NUMBER_FORMATTER.format((PROJECTE_FORMATTER.parse(valueText) / 100))
                let newValueComponent = Text.of(newValue)["withStyle(net.minecraft.network.chat.Style)"](valueStyle)

                // @ts-expect-error
                let newTextComponent = Text.translate("emc.projecte.tooltip", newValueComponent)["withStyle(net.minecraft.network.chat.Style)"](textStyle)

                lines.set(idx, $ElementHelper.INSTANCE.text(newTextComponent))
            }
            return listOfLines
        })

    };

    StartupEvents.postInit(event => {
        let $WailaClientRegistration
        if (Platform.isClientEnvironment()) {
            $WailaClientRegistration = Java.loadClass("snownee.jade.impl.WailaClientRegistration")
            $WailaClientRegistration.instance().addTooltipCollectedCallback(0, (tooltip, accessor) => {
                global.jadeCallBack(tooltip, accessor)
            })
            $WailaClientRegistration.instance().tooltipCollectedCallback.sort()
        }
    });

})()