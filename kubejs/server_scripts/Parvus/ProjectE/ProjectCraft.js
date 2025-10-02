// priority: 0
// requires: lightmanscurrency
// @ts-check
// Tweak to recipes from projecte

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {
    let debug = false; // Want some debug?
    const tarnishedMaterial = [
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_H"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_E1"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_R1"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_B"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_R2"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_I"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_N"]',
        'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_E2"]'
    ]

    ServerEvents.recipes(event => {

        // Prevent modded items from propgrating values through crafting recipes
        // @ts-expect-error
        event.forEachRecipe({ or: [{ type: "minecraft:crafting_shaped" }, { type: "minecraft:crafting_shapeless" }] }, function (kube) {

            // Copy recipe ingredients
            let recipeIng = kube.originalRecipeIngredients.stream()

            // Filter recipe ingredients
            // Keep ingredients that contain minecraft items
            let moddedIng = recipeIng.filter(ing => {
                // Ignore empty ingredients
                if (ing.empty) return false
                // Ingredients must contain only modded items to be a modded ingredient
                return !(ing.stacks.stream().anyMatch(i => i.idLocation.namespace === "minecraft"))
            }).toList()

            // If we have modded ingredients, continue
            if (moddedIng.empty) return;


            // Modded ingredients shall not define vanilla ingredients
            if (!(kube.originalRecipeResult.idLocation.namespace === "minecraft")) return

            let random = Math.floor((Math.random() * tarnishedMaterial.length))
            let tarnished = Item.of(tarnishedMaterial[random])
            let tarnishedName = kube.originalRecipeResult.hoverName || "";

            // @ts-expect-error
            tarnished.setCustomName(tarnishedName)
            kube.replaceOutput({ match: /()/ }, tarnished)

            // console.log(`${moddedIng.size()} modded ingredient(s) attempted to define ${kube.originalRecipeResult}`)
            // console.log(JsonUtils.toString(moddedIng))
        })
    })
})()
