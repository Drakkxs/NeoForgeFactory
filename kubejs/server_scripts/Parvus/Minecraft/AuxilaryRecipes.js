// priority: 0
// requires: almostunified
// @ts-check
// Helpful Recipes

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {

    let debug = true

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
         * @param {any} stack
         * @param {import("java.util.List").$List$$Type<string>} pattern
         * @param {import("java.util.Map").$Map$$Type<character, import('net.minecraft.world.item.crafting.Ingredient').$Ingredient$$Type | string>} ingredients
         */
        function pShaped(stack, pattern, ingredients) {
            if (!Item.isItemStackLike(stack)) {
                debug && console.log('[AuxilaryRecipes] did not consider (' + stack + ') as item')
                return
            }


            debug && console.log('[AuxilaryRecipes] considering (' + stack + ') as item')
            // @ts-ignore
            let r = AlmostUnified.getVariantItemTarget(stack).withCount(stack.count)
            stack = r.empty ? stack : r

            debug && console.log('[AuxilaryRecipes] Finished (' + stack.toStringJS() + ')')
            // @ts-ignore
            return event.recipes.minecraft.crafting_shaped(stack, pattern, ingredients)
        }

        /**
         * Shapeless Minecraft Recipe
         * @param {any} stack
         * @param {string[]} ingredients
         */
        function pShapeless(stack, ingredients) {
            if (!Item.isItemStackLike(stack)) {
                debug && console.log('[AuxilaryRecipes] did not consider (' + stack + ') as item')
                return
            }

            debug && console.log('[AuxilaryRecipes] considering (' + stack + ') as item')
            // @ts-ignore
            let r = AlmostUnified.getVariantItemTarget(stack).withCount(stack.count)
            stack = r.empty ? stack : r

            debug && console.log('[AuxilaryRecipes] Finished (' + stack.toStringJS() + ')')
            // @ts-ignore
            return event.recipes.minecraft.crafting_shapeless(stack, ingredients)
        }

        /** [[INGOTS]] */

        // Osmium = Iron + Flint + Clay Ball
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/osmium').first.withCount(2), [
            "#c:gunpowders",
            "minecraft:flint",
            'minecraft:clay_ball',
            "#c:ingots/iron"
        ])

        // Lead = Iron + Lapis
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/lead').first.withCount(2), [
            "#c:gunpowders",
            "#c:ingots/iron",
            "#c:gems/lapis"
        ])

        // Silver = Lead + Copper + Gold + Zinc
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/silver').first.withCount(4), [
            "#c:gunpowders",
            "#c:ingots/lead",
            "#c:ingots/copper",
            "#c:ingots/gold",
            "#c:ingots/zinc"
        ])

        // Aluminum = Steel + Clay Ball + Copper + Bonemeal
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/aluminum').first.withCount(4), [
            "#c:gunpowders",
            '#c:ingots/steel',
            'minecraft:clay_ball',
            '#c:ingots/copper'
        ])

        // Tin = Fire Charge + Zinc + Iron
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/tin').first.withCount(3), [
            '#c:ingots/zinc',
            'minecraft:fire_charge',
            '#c:ingots/iron'
        ])

        // Nickel = Fire Charge + Zinc + Copper
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/nickel').first.withCount(3), [
            '#c:ingots/nickel',
            'minecraft:fire_charge',
            '#c:ingots/copper'
        ])

        // Uranium = Gunpowder + Lapis + Iron + Gold
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/uranium').first.withCount(4), [
            "#c:gunpowders",
            "#c:gunpowders",
            "#c:gunpowders",
            "#c:gunpowders",
            "#c:gunpowders",
            "#c:gunpowders",
            "#c:gems/lapis",
            "#c:ingots/iron",
            "#c:ingots/gold"
        ])

        // HOPGraphite = Coal/Charcoal + Ingot + Quartz
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/hop_graphite').first.withCount(2), [
            "#c:gunpowders",
            '#c:gems/quartz',
            '#c:ingots/iron',
            '#minecraft:coals'
        ])

        // Sky Steel = Lava Bucket + Charged Certuz Quartz + Iron + Sky Stone
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/sky_steel').first.withCount(2), [
            'minecraft:fire_charge',
            'ae2:sky_stone_block',
            '#c:ingots/iron',
            'ae2:charged_certus_quartz_crystal'
        ])

        // Sky Bronze = Lava Bucket + Charged Certuz Quartz + Copper + Sky Stone
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/sky_bronze').first.withCount(2), [
            'minecraft:fire_charge',
            'ae2:sky_stone_block',
            '#c:ingots/copper',
            'ae2:charged_certus_quartz_crystal'
        ])

        // Sky Osmium = Lava Bucket + Charged Certuz Quartz + Osmium + Sky Stone
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/sky_osmium').first.withCount(2), [
            'minecraft:fire_charge',
            'ae2:sky_stone_block',
            '#c:ingots/osmium',
            'ae2:charged_certus_quartz_crystal'
        ])

        // Mithril Scrap = Diamond + Lapis + Gold + Prismarine Shard
        // @ts-ignore
        pShapeless(Ingredient.of('irons_spellbooks:mithril_scrap').first.withCount(2), [
            'minecraft:fire_charge',
            '#c:gems/diamond',
            '#c:gems/lapis',
            '#c:ingots/gold',
            '#c:gems/prismarine'
        ])

        // Pyrium Ingot = Brass + Bronze + Mithril
        // @ts-ignore
        pShapeless(Ingredient.of('#c:ingots/pyrium').first.withCount(1), [
            'minecraft:fire_charge',
            '#c:ingots/brass',
            '#c:ingots/bronze',
            'irons_spellbooks:mithril_scrap'
        ])

        /** [[FLOURITE]] */

        // Fluorite = Bonemeal + Amethyst
        // @ts-ignore
        pShapeless(Ingredient.of('#c:gems/fluorite').first.withCount(3), [
            'minecraft:fire_charge',
            "minecraft:bone_meal",
            "#c:gems/amethyst"
        ])

        /** [POWERPOTS] */

        let powerPots = [
            { id: 'powerpots:power_pot_1', count: 1 },
            { id: 'powerpots:power_pot_2', count: 1 },
            { id: 'powerpots:power_pot_3', count: 1 }
        ]

        // PowerPots = Catalyst + Upgrade(s)
        // @ts-ignore
        pShaped(Ingredient.of(powerPots[0].id).first.withCount(powerPots[0].count), [
            'C',
            'H',
            'S'
        ], {
            C: "#botanypots:botany_pots",
            H: "minecraft:hopper_minecart",
            S: "minecraft:sugar"
        })

        // @ts-ignore
        pShaped(Ingredient.of(powerPots[1].id).first.withCount(powerPots[1].count), [
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
        pShaped(Ingredient.of(powerPots[2].id).first.withCount(powerPots[2].count), [
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
