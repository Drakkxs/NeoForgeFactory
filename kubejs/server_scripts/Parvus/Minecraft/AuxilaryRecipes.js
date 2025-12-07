// priority: 0
// requires: almostunified
// @ts-check
// Helpful Recipes

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    let debug = false

    /** 
     * Ingot Recipes
     * @param {import('dev.latvian.mods.kubejs.recipe.RecipesKubeEvent').$RecipesKubeEvent} event  
     */
    function auxRecipes(event) {

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
         * @param {import("net.minecraft.world.item.ItemStack").$ItemStack$$Type} result 
         * @param {import("java.util.List").$List$$Type<string>} pattern
         * @param {import("java.util.Map").$Map$$Type<character, import('net.minecraft.world.item.crafting.Ingredient').$Ingredient$$Type | string>} key
         */
        function pShaped(result, pattern, key) {
            if (!Item.isItemStackLike(result)) return debug && console.log('[AuxilaryRecipes] did not consider (' + JsonUtils.toString(result) + ') as item')
            /** @type {any} */
            let r = AlmostUnified.getVariantItemTarget(result)
            if (Item.of(r).empty) return debug && console.log('[AuxilaryRecipes] did not make recipe for (' + JsonUtils.toString(result) + ') turned to (' + JsonUtils.toString(r) + ')')
            // @ts-expect-errorF
            return event.recipes.minecraft.crafting_shaped(r, pattern, key)
        }

        /** [[INGOTS]] */

        // Osmium = Iron + Flint + Clay Ball
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/osmium').first.withCount(2), [
            'FBI'
        ], {
            F: "minecraft:flint",
            B: 'minecraft:clay_ball',
            I: "#c:ingots/iron"
        })

        // Lead = Iron + Lapis
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/lead').first.withCount(2), [
            'IL'
        ], {
            I: "#c:ingots/iron",
            L: "#c:gems/lapis"
        })

        // Silver = Lead + Copper + Gold + Zinc
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/silver').first.withCount(4), [
            ' C ',
            'LGZ'
        ], {
            L: "#c:ingots/lead",
            C: "#c:ingots/copper",
            G: "#c:ingots/gold",
            Z: "#c:ingots/zinc"
        })

        // HOPGraphite = Coal/Charcoal + Ingot + Quartz
        // @ts-ignore
        pShaped({ id: 'immersiveengineering:ingot_hop_graphite', count: 2 }, [
            ' Q ',
            'CIC',
        ], {
            Q: '#c:gems/quartz',
            I: '#c:ingots/iron',
            C: '#minecraft:coals'
        })

        // Aluminum = Steel + Clay Ball + Copper + Bonemeal
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/aluminum').first.withCount(4), [
            ' Y ',
            'XSX'
        ], {
            S: '#c:ingots/steel',
            X: 'minecraft:clay_ball',
            Y: '#c:ingots/copper'
        })

        // Tin = Fire Charge + Zinc + Iron
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/tin').first.withCount(3), [
            'ZFI'
        ], {
            Z: '#c:ingots/zinc',
            F: 'minecraft:fire_charge',
            I: '#c:ingots/iron'
        })

        // Nickel = Fire Charge + Zinc + Copper
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/nickel').first.withCount(3), [
            'NFI'
        ], {
            N: '#c:ingots/nickel',
            F: 'minecraft:fire_charge',
            I: '#c:ingots/copper'
        })

        // Uranium = TNT + Lapis Block + Iron BLock + Gold Block
        // @ts-ignore
        pShaped(Ingredient.of('#c:ingots/uranium').first.withCount(4), [
            ' T ',
            'LIG'
        ], {
            T: 'minecraft:tnt',
            L: '#c:storage_blocks/lapis',
            I: '#c:storage_blocks/iron',
            G: '#c:storage_blocks/gold'
        })

        // Sky Steel = Lava Bucket + Charged Certuz Quartz + Iron + Sky Stone
        // @ts-ignore
        pShaped({ id: 'megacells:sky_steel_ingot', count: 2 }, [
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
        // @ts-ignore
        pShaped({ id: 'megacells:sky_bronze_ingot', count: 2 }, [
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
        // @ts-ignore
        pShaped({ id: 'megacells:sky_osmium_ingot', count: 2 }, [
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
        // @ts-ignore
        pShaped({ id: 'irons_spellbooks:mithril_scrap', count: 2 }, [
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
        // @ts-ignore
        pShaped({ id: 'irons_spellbooks:pyrium_ingot', count: 1 }, [
            'XYZ'
        ], {
            X: '#c:ingots/brass',
            Y: '#c:ingots/bronze',
            Z: 'irons_spellbooks:mithril_scrap'
        })

        /** [[FLOURITE]] */

        // Fluorite = Bonemeal + Amethyst
        // @ts-ignore
        pShaped(Ingredient.of('#c:gems/fluorite').first.withCount(3), [
            'ABA'
        ], {
            B: "minecraft:bone_meal",
            A: "#c:gems/amethyst"
        })

        /** [POWERPOTS] */

        let powerPots = [
            { id: 'powerpots:power_pot_1', count: 1 },
            { id: 'powerpots:power_pot_2', count: 1 },
            { id: 'powerpots:power_pot_3', count: 1 }
        ]

        // PowerPots = Catalyst + Upgrade(s)
        // @ts-ignore
        pShaped(powerPots[0], [
            'C',
            'H',
            'S'
        ], {
            C: "#botanypots:botany_pots",
            H: "minecraft:hopper_minecart",
            S: "minecraft:sugar"
        })

        // @ts-ignore
        pShaped(powerPots[1], [
            ' C ',
            'XHY',
            'S S'
        ], {
            C: powerPots[0].id,
            H: "minecraft:hopper_minecart",
            X: "minecraft:dispenser",
            Y: "minecraft:dropper",
            S: "minecraft:sugar"
        })

        // @ts-ignore
        pShaped(powerPots[2], [
            ' C ',
            'XHY',
            'SSS'
        ], {
            C: powerPots[1].id,
            H: "minecraft:hopper_minecart",
            X: "minecraft:observer",
            Y: "minecraft:crafter",
            S: "minecraft:sugar"
        })


    }

    ServerEvents.recipes(e => {
        auxRecipes(e)
    })

})();
