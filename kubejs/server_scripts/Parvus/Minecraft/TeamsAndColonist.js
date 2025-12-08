// priority: 0
// @ts-check

const $Player = Java.loadClass('net.minecraft.world.entity.player.Player')

EntityEvents.beforeHurt(event => {

    const {server, level} = event

    const target = event.entity
    if (!target || !target.isPlayer()) return

    const source = event.source
    if (!source || !source.player) return

    server.runCommandSilent(`execute at ${target.stringUuid} run playsound minecraft:block.amethyst_block.hit player @a ~ ~ ~ 1 2`)
    event.cancel()
    
})


EntityEvents.beforeHurt(event => {

    const {server, level} = event

    const target = event.entity

    if (!target || ['minecolonies:citizen', 'minecolonies:visitor'].indexOf(String(target.type)) < 0) return

    const source = event.source
    if (!source || !source.player) return

    server.runCommandSilent(`execute at ${target.stringUuid} run playsound minecraft:block.amethyst_block.hit player @a ~ ~ ~ 1 2`)
    event.cancel()
    
})