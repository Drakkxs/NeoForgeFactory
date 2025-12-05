// priority: 0
// requires: almostunified
// @ts-check
// Helpful Recipes

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    /** 
     * Ingot Recipes
     * @param {$RecipesKubeEvent_} event  
     */
    function auxilaryIngot(event) {

        /**  
         Craftable:
         Iron
         Copper
         Gold
         Netherite
         Zinc
         Brass
         Rose Gold
         Steel
 
         Uncraftable:
         Tin (X)
            > Bronze
         Osmium (X)
            > Refined Obsidian
            > Refined Glowstone
         HOP Graphite (X)
         Aluminum (X)
         Lead (X)
         Silver (X)
            > Electrum
         Nickel (X)
            > Constantan
         Uranium (X)
         Sky Steel (X)
         Sky Bronze (X)
         Sky Osmium (X)
         Mithril Scrap (X)
         Pyrium (X)
        */

        /**
         * Shaped Minecraft Recipe
         * @param {any & import("net.minecraft.world.item.ItemStack").$ItemStack} result 
         * @param {import("java.util.List").$List$$Type<string>} pattern
         * @param {import("java.util.Map").$Map$$Type<character, import("net.minecraft.world.item.crafting.Ingredient").$Ingredient$$Type>} key
         */
        function pShaped(result, pattern, key) {
            /** @type {any} */
            let r = AlmostUnified.getVariantItemTarget(result)
            if (Item.of(r).empty) return console.log('[AuxilaryRecipes] did not make recipe for (' + result + ') turned to (' + r + ')')
            return event.recipes.minecraft.crafting_shaped(r, pattern, key)
        }

        // Lead = Iron + Lapis
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:lead_ingot', 2), [
            'IL'
        ], {
            I: "#c:ingots/iron",
            L: "#c:gems/lapis"
        })

        // Silver = Lead + Copper + Gold + Zinc
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:silver_ingot', 4), [
            ' C ',
            'LGZ'
        ], {
            L: "#c:ingots/lead",
            C: "#c:ingots/copper",
            G: "#c:ingots/gold",
            Z: "#c:ingots/zinc"
        })

        // HOPGraphite = Coal/Charcoal + Ingot + Quartz
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:ingot_hop_graphite', 4), [
            ' Q ',
            'CIC',
        ], {
            Q: '#c:gems/quartz',
            I: '#c:ingots/iron',
            C: '#minecraft:coals'
        })

        // Aluminum = Steel + Clay Ball + Copper + Bonemeal
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:aluminum_ingot', 4), [
            ' Y ',
            'XSX'
        ], {
            S: '#c:ingots/steel',
            X: 'minecraft:clay_ball',
            Y: '#c:ingots/copper'
        })

        // Tin = Fire Charge + Zinc + Iron
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:tin_ingot', 3), [
            'ZFI'
        ], {
            Z: '#c:ingots/zinc',
            F: 'minecraft:fire_charge',
            I: '#c:ingots/iron'
        })

        // Nickel = Fire Charge + Zinc + Copper
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:nickel_ingot', 3), [
            'NFI'
        ], {
            N: '#c:ingots/nickel',
            F: 'minecraft:fire_charge',
            I: '#c:ingots/copper'
        })

        // Uranium = TNT + Lapis Block + Iron BLock + Gold Block
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:uranium_ingot', 4), [
            ' T ',
            'LIG'
        ], {
            T: 'minecraft:tnt',
            L: '#c:storage_blocks/lapis',
            I: '#c:storage_blocks/iron',
            G: '#c:storage_blocks/gold'
        })

        // Sky Steel = Lava Bucket + Charged Certuz Quartz + Iron + Sky Stone
        pShaped(Item.of('megacells:sky_steel_ingot', 2), [
            ' Q ',
            ' X ',
            'SBS'
        ], {
            B: 'minecraft:lava_bucket',
            S: 'ae2:sky_stone_block',
            X: '#c:ingots/iron',
            Q: 'ae2:charged_certus_quartz_crystal'
        })

        // Sky Bronze = Lava Bucket + Charged Certuz Quartz + Copper + Sky Stone
        pShaped(Item.of('megacells:sky_bronze_ingot', 2), [
            ' Q ',
            ' X ',
            'SBS'
        ], {
            B: 'minecraft:lava_bucket',
            S: 'ae2:sky_stone_block',
            X: '#c:ingots/copper',
            Q: 'ae2:charged_certus_quartz_crystal'
        })

        // Sky Osmium = Lava Bucket + Charged Certuz Quartz + Osmium + Sky Stone
        pShaped(Item.of('megacells:sky_osmium_ingot', 2), [
            ' Q ',
            ' X ',
            'SBS'
        ], {
            B: 'minecraft:lava_bucket',
            S: 'ae2:sky_stone_block',
            X: '#c:ingots/osmium',
            Q: 'ae2:charged_certus_quartz_crystal'
        })

        // Mithril Scrap = Diamond + Lapis + Gold + Prismarine Shard
        // @ts-expect-error
        pShaped(Item.of('irons_spellbooks:mithril_scrap', 2), [
            ' D ',
            'GLG',
            ' P '
        ], {
            D: '#c:gems/diamond',
            L: '#c:gems/lapis',
            G: '#c:ingots/gold',
            P: '#c:gems/prismarine'
        })

        // Pyrium Ingot = Brass + Bronze + Mithril
        // @ts-expect-error
        pShaped(Item.of('irons_spellbooks:pyrium_ingot', 1), [
            'XYZ'
        ], {
            X: '#c:ingots/brass',
            Y: '#c:ingots/bronze',
            // @ts-expect-error
            Z: 'irons_spellbooks:mithril_scrap'
        })

        // Osmium = Iron + Flint + Clay Ball
        // @ts-expect-error
        pShaped(Item.of('immersiveengineering:osmium_ingot', 2), [
            'FBI'
        ], {
            F: "minecraft:flint",
            B: 'minecraft:clay_ball',
            I: "#c:ingots/iron"
        })

    }

    ServerEvents.recipes(e => {
        auxilaryIngot(e)

        e.printExamples("")
    })

})();
