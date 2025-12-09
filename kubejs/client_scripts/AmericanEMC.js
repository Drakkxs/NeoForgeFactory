// priority: 0
// requires: projecte
// @ts-check
// Modify tooltips of ProjectE EMC to be more immersive and informative


// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    let $NumberFormat = Java.loadClass("java.text.NumberFormat")
    // let $Util = Java.loadClass("net.minecraft.Util")
    /** @type {import('java.text.NumberFormat').$NumberFormat} */
    let PROJECTE_FORMATTER = $NumberFormat.getInstance()
    PROJECTE_FORMATTER.setMaximumFractionDigits(1)
    // Another way to format values. Lang file has this covered for now.
    // let CURRENCY_FORMATTER = $NumberFormat.getNumberInstance()
    /** @type {import('java.text.NumberFormat').$NumberFormat} */
    let NUMBER_FORMATTER = $NumberFormat.getNumberInstance()
    NUMBER_FORMATTER.setMinimumFractionDigits(2)

    ItemEvents.modifyTooltips(event => {
        event.modifyAll(tooltip => {
            tooltip.dynamic("kubejs_emc_tooltip");
        })
    })

    ItemEvents.dynamicTooltips("kubejs_emc_tooltip", event => {

        let eventLines = event.lines
        eventLines.forEach(line => {
            let index = eventLines.indexOf(line);

            // A preferred type to convert the tooltip to.
            // Ensures final values are not lost.
            let nbtLine = NBT.wrapCompound(line.copy().toNBT());
            if (!nbtLine || nbtLine.empty) return
            let translate = nbtLine.get("translate")
            if (!translate) return;
            if (!String(translate.getAsString()).length) return;

            // Only work with emc from projecte tooltips
            if ([/emc/, /projecte/].some(r => !r.test(String(translate.getAsString())))) return;

            // Next to the translate, a list that contains compound tags
            let nestTool = nbtLine.getList("with", NBT.compoundTag().getId());
            if (nestTool.empty) return;

            // The emc value text should be containted in the compoundTag
            // Locate the relevant compoundTag. Stop at the first find.
            // @ts-ignore
            nestTool.forEach(/** @param {import('net.minecraft.nbt.CompoundTag').$CompoundTag} tip */ tip => {
                if (!(NBT.isTagCompound(tip))) return;
                tip.putString("text", NUMBER_FORMATTER.format((PROJECTE_FORMATTER.parse((String(tip.get("text").getAsString()))) / 100)))
            })

            event.lines.set(index, Component.ofTag(nbtLine))
        });


    });

})()
