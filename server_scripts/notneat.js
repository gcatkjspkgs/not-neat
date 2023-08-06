const $Neat = global.kjspkgCompatLayer.legacyJava('vazkii.neat.NeatConfig')

global.kjspkgCompatLayer.legacyOnEvent("player.logged_in", event =>{
    const {player, level} = event
    let pData = player.persistentData
    pData.gameTimer = 0
})

global.kjspkgCompatLayer.legacyOnEvent("player.tick", event =>{
    const {player} = event
    let pData = player.persistentData


    pData.gameTimer++
    //prevents all ofthese update checks from happening too often
    if (pData.gameTimer % 20 != 0) return


    // Check if the player has the stage "Neat" and if this has not been triggered yet
    // Also, if the player tries to set draw to true, and has not gotten the stage "Neat" yet, turn it back to false
    if(player.stages.has('neat') && !player.stages.has('triggered')){
        player.stages.add('triggered')
        $Neat.draw = true
    }else if($Neat.draw == true && !player.stages.has('neat')){
        $Neat.draw = false
        player.tell('YOU DONT HAVE NEAT STAGE!')
    }


    pData.gameTimer = 0
})