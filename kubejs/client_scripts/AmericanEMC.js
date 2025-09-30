// priority: 0
// requires: projecte
// @ts-check
// Modify tooltips of ProjectE EMC to be more immersive and informative


// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {


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
            let nbtLine = NBT.toTagCompound(line.copy().toNBT());
            if (!nbtLine || nbtLine.empty) return
            let translate = nbtLine.get("translate")
            if (!translate) return;
            if (!translate.asString.length) return;

            // Only work with emc from projecte tooltips
            if ([/emc/, /projecte/].some(r => !r.test(translate.asString))) return;

            // Next to the translate, a list that contains compound tags
            let nestTool = nbtLine.getList("with", NBT.compoundTag().id);
            if (nestTool.empty) return;

            // The emc value text should be containted in the compoundTag
            // Locate the relevant compoundTag. Stop at the first find.
            nestTool.forEach(tip => {
                if (!(tip instanceof Java.loadClass("net.minecraft.nbt.CompoundTag"))) return;
                let nestline = {}
                nestline["text"] = tip.get("text")
                if (!nestline.text || !nestline.text.asString.length) return;
                nestline["emc"] = Number(`${NBT.fromTag(nestline.text)}`.replace(/[^0-9.]/g, ""))
                if (!Number.isFinite(nestline.emc)) return;
                nestline["num"] = (Math.round(nestline.emc / 100 * 100) / 100)
                nestline["formatedNum"] = nestline.num.toFixed(2);

                tip.putString("text", `${nestline.formatedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
            })
            
            event.lines.set(index, Component.ofTag(nbtLine))
        });


    });

})()
