// priority: 0
// requires: lightmanscurrency
// @ts-check
// Vanilla items are the priority

// Immediately Invoked Function Expression to prevent polluting the global namespace
(() => {


    let debug = true; // Want some debug?

    /** 
     * Return a random tranished stack
     * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} stack
     */
    function ruinStack(stack) {
        let ruinMaterials = [
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_H"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_E1"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_R1"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_B"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_R2"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_I"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_N"]',
            'lightmanscurrency:coin_ancient[lightmanscurrency:ancient_coin_type="NETHERITE_E2"]'
        ]
        // @ts-expect-error Argument of type 'string' IS assignable to parameter of type '$ItemStack$$Type'
        let ruinStack = Item.of(ruinMaterials[Math.floor(Math.random() * ruinMaterials.length)])

        // @ts-expect-error Argument of type '$Component' IS assignable to parameter of type '$Component$$Type'
        ruinStack.setCustomName(Component.ofString(stack.hoverName?.string || ""))

        return ruinStack
    }

    /**
     * Checks if an ItemStack is Vanilla
     * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} s 
     */
    function isVanillaItem(s) {
        if (s.empty) return false
        let bool = s.idLocation.namespace === "minecraft"
        // if (debug) console.log(`${s.toJson()} item is vanilla? ${bool}`)
        return bool
    }

    /**
     * Tarnishes a recipe. Ruining it's output.
     * @param {import("dev.latvian.mods.kubejs.recipe.KubeRecipe").$KubeRecipe} recipe
     * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} stack
     */
    function tarnishRecipe(recipe, stack) {
        recipe.replaceOutput({ match: /()/ }, ruinStack(stack))
    }

    ServerEvents.recipes(event => {

        // Prevent modded recipes that define vanilla items
        // @ts-expect-error type can be arbitrary strings
        event.forEachRecipe({ or: [{ type: "minecraft:crafting_shaped" }, { type: "minecraft:crafting_shapeless" }] }, function (recipe) {

            // Only modded recipes
            if (recipe.getId().startsWith("minecraft:")) return

            // Result has to be vanilla
            if (!(isVanillaItem(recipe.originalRecipeResult))) {
                // if (debug) console.log(`Is not a modded recipe ${recipe.getId()}`)
                return;
            }

            // Tarnish recipe
            tarnishRecipe(recipe, recipe.originalRecipeResult)

        })
    })
})()
