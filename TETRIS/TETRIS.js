function renderiza_arena() {
    for (let índice = 0; índice < 5; índice++) {
        for (let indice2 = 0; indice2 < 5; indice2++) {
            if (arena[5 * indice2 + índice] == 1) {
                led.plot(índice, indice2)
            }
            
        }
    }
}

function apaga_bloco(bloco: number[], x: number, y: number) {
    for (let índice2 = 0; índice2 < 2; índice2++) {
        for (let indice22 = 0; indice22 < 2; indice22++) {
            if (bloco[2 * indice22 + índice2] == 1) {
                led.unplot(x + índice2, y + indice22)
                arena[5 * (y + indice22) + (x + índice2)] = 0
            }
            
        }
    }
}

function verifica_col_embaixo(bloco2: number[]) {
    
    colide_embaixo = false
    for (let índice3 = 0; índice3 < 2; índice3++) {
        for (let índice22 = 0; índice22 < 2; índice22++) {
            if (bloco2[2 * índice22 + índice3] == 1) {
                if (bloco2[2 * (índice22 + 1) + índice3] != 1) {
                    if (arena[5 * (índice22 + bloco_y + 1) + (índice3 + bloco_x)] == 1) {
                        colide_embaixo = true
                    }
                    
                }
                
            }
            
            if (colide_embaixo) {
                break
            }
            
        }
        if (colide_embaixo) {
            break
        }
        
    }
}

function desenha_bloco(bloco3: number[], x2: number, y2: number) {
    for (let índice32 = 0; índice32 < 2; índice32++) {
        for (let indice23 = 0; indice23 < 2; indice23++) {
            if (bloco3[2 * indice23 + índice32] == 1) {
                led.plot(x2 + índice32, y2 + indice23)
                arena[5 * (y2 + indice23) + (x2 + índice32)] = 1
            }
            
        }
    }
}

function verifica_col_dir(bloco4: number[]) {
    
    for (let índice4 = 0; índice4 < 2; índice4++) {
        for (let índice23 = 0; índice23 < 2; índice23++) {
            if (bloco4[2 * índice23 + índice4] == 1) {
                if (bloco4[2 * índice23 + (índice4 + 1)] != 1) {
                    if (arena[5 * (índice23 + bloco_y) + (índice4 + bloco_x + 1)] == 1) {
                        colide_dir = true
                    }
                    
                }
                
            }
            
            if (colide_dir) {
                break
            }
            
        }
        if (colide_dir) {
            break
        }
        
    }
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    if (no_jogo) {
        music.play(music.tonePlayable(165, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        if (sorteio == 1) {
            if (!pulso) {
                verifica_col_embaixo(bloco1)
                anda_esq(bloco1)
            }
            
        } else if (sorteio == 2) {
            if (!pulso) {
                verifica_col_embaixo(bloco22)
                anda_esq(bloco22)
            }
            
        }
        
    }
    
})
function rotaciona() {
    
    if (rotacao < 4) {
        rotacao += 1
    } else {
        rotacao = 1
    }
    
}

input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    if (!no_jogo) {
        no_jogo = true
        basic.clearScreen()
    } else {
        colide_embaixo = false
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(784, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        if (sorteio == 1) {
            verifica_col_embaixo(bloco1)
            apaga_bloco(bloco1, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco1)
            if (!limite_ultrapassado) {
                desenha_bloco(bloco1, bloco_x, bloco_y)
            }
            
        } else if (sorteio == 2) {
            verifica_col_embaixo(bloco22)
            apaga_bloco(bloco22, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco22)
            if (!limite_ultrapassado) {
                desenha_bloco(bloco22, bloco_x, bloco_y)
            }
            
        }
        
    }
    
})
function anda_diagonal_dir(bloco5: any[]) {
    
    colide_diagonal_dir = false
    definir_blocos()
    verifica_col_diagonal_esq(bloco5)
    if (!colide_diagonal_dir) {
        if (bloco_x < 3 + offset_dir && bloco_y < 3 + offset_baixo) {
            apaga_bloco(bloco5, bloco_x, bloco_y)
            bloco_x += -1
            bloco_x += 1
        }
        
    }
    
}

function desce_bloco() {
    
    if (no_jogo) {
        colide_embaixo = false
        while (!colide_embaixo && bloco_y < 3 + offset_baixo) {
            while (bloco_y < 3 + offset_baixo) {
                if (sorteio == 1) {
                    definir_blocos()
                    verifica_col_embaixo(bloco1)
                    if (!colide_embaixo) {
                        apaga_bloco(bloco1, bloco_x, bloco_y)
                        bloco_y += 1
                        desenha_bloco(bloco1, bloco_x, bloco_y)
                    }
                    
                } else if (sorteio == 2) {
                    definir_blocos()
                    verifica_col_embaixo(bloco22)
                    if (!colide_embaixo) {
                        apaga_bloco(bloco22, bloco_x, bloco_y)
                        bloco_y += 1
                        desenha_bloco(bloco22, bloco_x, bloco_y)
                    }
                    
                }
                
                basic.pause(tempo * 2)
                if (colide_embaixo) {
                    basic.pause(500)
                    if (input.buttonIsPressed(Button.A)) {
                        if (sorteio == 1) {
                            verifica_col_diagonal_esq(bloco1)
                        } else if (sorteio == 2) {
                            verifica_col_diagonal_esq(bloco22)
                        }
                        
                        if (!colide_diagonal_esq) {
                            if (sorteio == 1) {
                                anda_diagonal_esq(bloco1)
                            } else if (sorteio == 2) {
                                anda_diagonal_esq(bloco22)
                            }
                            
                        } else {
                            if (sorteio == 1) {
                                desenha_bloco(bloco1, bloco_x, bloco_y)
                            } else if (sorteio == 2) {
                                desenha_bloco(bloco22, bloco_x, bloco_y)
                            }
                            
                            break
                        }
                        
                    } else if (input.buttonIsPressed(Button.B)) {
                        if (sorteio == 1) {
                            verifica_col_diagonal_dir(bloco1)
                        } else if (sorteio == 2) {
                            verifica_col_diagonal_dir(bloco22)
                        }
                        
                        if (!colide_diagonal_dir) {
                            if (sorteio == 1) {
                                anda_diagonal_dir(bloco1)
                            } else if (sorteio == 2) {
                                anda_diagonal_dir(bloco22)
                            }
                            
                        } else {
                            if (sorteio == 1) {
                                desenha_bloco(bloco1, bloco_x, bloco_y)
                            } else if (sorteio == 2) {
                                desenha_bloco(bloco22, bloco_x, bloco_y)
                            }
                            
                            break
                        }
                        
                    } else {
                        break
                    }
                    
                }
                
            }
            if (sorteio == 1) {
                verifica_col_embaixo(bloco1)
            } else if (sorteio == 2) {
                verifica_col_embaixo(bloco22)
            }
            
        }
        if (sorteio == 1) {
            desenha_bloco(bloco1, bloco_x, bloco_y)
            verifica_game_over(bloco1, bloco_x, bloco_y)
        } else if (sorteio == 2) {
            desenha_bloco(bloco22, bloco_x, bloco_y)
            verifica_game_over(bloco22, bloco_x, bloco_y)
        }
        
    }
    
}

function scan() {
    
    j = 4
    for (let index = 0; index < 5; index++) {
        i = 0
        row_point = true
        for (let index2 = 0; index2 < 5; index2++) {
            if (arena[5 * j + i] == 0) {
                row_point = false
                break
            }
            
            i += 1
        }
        if (row_point) {
            pontos += 1
            pausa_tetris = true
            for (let índice5 = 0; índice5 < 5; índice5++) {
                music.play(music.tonePlayable(659, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                music.play(music.tonePlayable(831, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                led.unplot(índice5, j)
                led.plotBrightness(índice5, j, 50)
                music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                music.play(music.tonePlayable(831, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
            }
            prox_linha_vazia = true
            k = 0
            while (prox_linha_vazia && k <= 4) {
                desloca_arena(j + k)
                for (let índice6 = 0; índice6 < 5; índice6++) {
                    if (arena[5 * j + índice6] == 1) {
                        prox_linha_vazia = false
                    }
                    
                }
                k += 1
            }
            k = 0
            basic.clearScreen()
            renderiza_arena()
            j += 1
            pausa_tetris = false
        }
        
        j += -1
    }
}

function verifica_col_diagonal_dir(bloco6: number[]) {
    
    for (let índice7 = 0; índice7 < 2; índice7++) {
        for (let índice24 = 0; índice24 < 2; índice24++) {
            if (bloco6[2 * índice24 + índice7] == 1) {
                if (bloco6[2 * (índice24 + 1) + (índice7 + 1)] != 1) {
                    if (arena[5 * (índice24 + bloco_y + 1) + (índice7 + bloco_x + 1)] == 1) {
                        colide_diagonal_dir = true
                    }
                    
                }
                
            }
            
            if (colide_diagonal_dir) {
                break
            }
            
        }
        if (colide_diagonal_dir) {
            break
        }
        
    }
}

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (!no_jogo) {
        no_jogo = true
        basic.clearScreen()
    } else {
        colide_embaixo = false
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(784, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        if (sorteio == 1) {
            verifica_col_embaixo(bloco1)
            apaga_bloco(bloco1, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco1)
            if (!limite_ultrapassado) {
                desenha_bloco(bloco1, bloco_x, bloco_y)
            }
            
        } else if (sorteio == 2) {
            verifica_col_embaixo(bloco22)
            apaga_bloco(bloco22, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco22)
            if (!limite_ultrapassado) {
                desenha_bloco(bloco22, bloco_x, bloco_y)
            }
            
        }
        
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    if (no_jogo) {
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        if (sorteio == 1) {
            verifica_col_embaixo(bloco1)
            if (!pulso) {
                anda_dir(bloco1)
            }
            
        } else if (sorteio == 2) {
            verifica_col_embaixo(bloco22)
            if (!pulso) {
                anda_dir(bloco22)
            }
            
        }
        
    }
    
})
function verifica_limite(bloco7: number[]) {
    
    if (no_jogo) {
        limite_ultrapassado = false
        for (let índice25 = 0; índice25 < 2; índice25++) {
            for (let indice222 = 0; indice222 < 2; indice222++) {
                if (bloco7[2 * indice222 + índice25] == 1 && arena[5 * (bloco_y + indice222) + (bloco_x + índice25)] == 1) {
                    limite_ultrapassado = true
                    verifica_col_esq(bloco7)
                    apaga_bloco(bloco7, bloco_x, bloco_y)
                    if (!colide_esq) {
                        bloco_x += -1
                    } else {
                        desrotaciona()
                    }
                    
                    desenha_bloco(bloco7, bloco_x, bloco_y)
                }
                
            }
        }
    }
    
}

function verifica_col_esq(bloco8: number[]) {
    
    for (let índice8 = 0; índice8 < 2; índice8++) {
        for (let índice26 = 0; índice26 < 2; índice26++) {
            if (bloco8[2 * índice26 + índice8] == 1) {
                if (bloco8[2 * índice26 + (índice8 - 1)] != 1) {
                    if (arena[5 * (índice26 + bloco_y) + (índice8 + bloco_x - 1)] == 1) {
                        colide_esq = true
                    }
                    
                }
                
            }
            
            if (colide_esq) {
                break
            }
            
        }
        if (colide_esq) {
            break
        }
        
    }
}

function desrotaciona() {
    
    if (rotacao > 0) {
        rotacao += -1
    } else {
        rotacao = 4
    }
    
}

function anda_dir(bloco9: any[]) {
    
    colide_dir = false
    definir_blocos()
    verifica_col_dir(bloco9)
    if (!colide_dir) {
        if (bloco_x < 3 + offset_dir) {
            apaga_bloco(bloco9, bloco_x, bloco_y)
            bloco_x += 1
        }
        
    }
    
}

function definir_blocos() {
    
    if (rotacao == 1) {
        if (sorteio == 1) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco stick
            bloco1 = [0, 0, 1, 1]
        } else if (sorteio == 2) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco Little L1
            bloco22 = [1, 0, 1, 1]
        }
        
    } else if (rotacao == 2) {
        if (sorteio == 1) {
            offset_esq = 0
            offset_dir = 1
            offset_baixo = 0
            //  Bloco stick
            bloco1 = [1, 0, 1, 0]
        } else if (sorteio == 2) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco Little L1
            bloco22 = [1, 1, 1, 0]
        }
        
    } else if (rotacao == 3) {
        if (sorteio == 1) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco stick
            bloco1 = [0, 0, 1, 1]
        } else if (sorteio == 2) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco Little L1
            bloco22 = [1, 1, 0, 1]
        }
        
    } else if (rotacao == 4) {
        if (sorteio == 1) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco stick
            bloco1 = [0, 0, 1, 1]
        } else if (sorteio == 2) {
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            //  Bloco Little L1
            bloco22 = [0, 1, 1, 1]
        }
        
    }
    
}

function desloca_arena(y3: number) {
    
    i = y3
    while (i > 0) {
        for (let índice9 = 0; índice9 < 5; índice9++) {
            arena[5 * i + índice9] = arena[5 * (i - 1) + índice9]
        }
        i += -1
    }
    for (let índice10 = 0; índice10 < 5; índice10++) {
        arena[índice10] = 0
    }
}

function anda_esq(bloco10: any[]) {
    
    colide_esq = false
    definir_blocos()
    verifica_col_esq(bloco10)
    if (!colide_esq) {
        if (bloco_x > 0 - offset_esq) {
            apaga_bloco(bloco10, bloco_x, bloco_y)
            bloco_x += -1
        }
        
    }
    
}

function verifica_game_over(bloco11: any[], x3: number, y4: number) {
    
    for (let índice11 = 0; índice11 < 2; índice11++) {
        for (let índice27 = 0; índice27 < 2; índice27++) {
            if (arena[2 * índice27 + índice11] == 1) {
                if (y4 + índice27 < 0) {
                    game_over = true
                }
                
            }
            
        }
    }
}

function anda_diagonal_esq(bloco12: any[]) {
    
    colide_diagonal_esq = false
    definir_blocos()
    verifica_col_diagonal_esq(bloco12)
    if (!colide_diagonal_esq) {
        if (bloco_x > 0 - offset_esq && bloco_y < 3 + offset_baixo) {
            apaga_bloco(bloco12, bloco_x, bloco_y)
            bloco_x += -1
            bloco_x += 1
        }
        
    }
    
}

function verifica_col_diagonal_esq(bloco13: number[]) {
    
    for (let índice12 = 0; índice12 < 2; índice12++) {
        for (let índice28 = 0; índice28 < 2; índice28++) {
            if (bloco13[2 * índice28 + índice12] == 1) {
                if (bloco13[2 * (índice28 + 1) + (índice12 - 1)] != 1) {
                    if (arena[5 * (índice28 + bloco_y + 1) + (índice12 + bloco_x - 1)] == 1) {
                        colide_diagonal_esq = true
                    }
                    
                }
                
            }
            
            if (colide_diagonal_esq) {
                break
            }
            
        }
        if (colide_diagonal_esq) {
            break
        }
        
    }
}

let índice42 = 0
let game_over = false
let offset_esq = 0
let colide_esq = false
let k = 0
let prox_linha_vazia = false
let pausa_tetris = false
let pontos = 0
let row_point = false
let i = 0
let j = 0
let colide_diagonal_esq = false
let offset_baixo = 0
let offset_dir = 0
let colide_diagonal_dir = false
let limite_ultrapassado = false
let rotacao = 0
let bloco22 : number[] = []
let bloco1 : number[] = []
let sorteio = 0
let colide_dir = false
let bloco_x = 0
let bloco_y = 0
let arena : number[] = []
let tempo = 0
let no_jogo = false
let colide_embaixo = false
let pulso = false
pulso = false
colide_embaixo = false
no_jogo = false
tempo = 650
let tempo_musica = 500
arena = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let musica_tetris_tempos = [1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 1, 1, 1, 2, 0.5]
let musica_tetris_notas = [659, 494, 523, 587, 523, 494, 440, 440, 523, 659, 587, 523, 494, 494, 523, 587, 659, 523, 440, 440, 0, 587, 698, 880, 784, 698, 659, 659, 523, 659, 587, 523, 494, 494, 523, 587, 659, 523, 440, 440, 0]
basic.forever(function on_forever() {
    
    if (!no_jogo && !game_over) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . . # . .
            . . # . .
            . . # . .
            `)
    } else if (no_jogo && !game_over) {
        if (!pausa_tetris) {
            basic.clearScreen()
            sorteio = randint(1, 2)
            bloco_x = randint(0, 3)
            bloco_y = -2
            renderiza_arena()
            for (let index3 = 0; index3 < randint(1, 4); index3++) {
                rotaciona()
            }
            desce_bloco()
        }
        
        if (tempo_musica > 250) {
            tempo_musica += -25
        }
        
        if (tempo > 50) {
            tempo += -50
        }
        
        basic.pause(tempo)
        if (colide_embaixo || bloco_y < 3 + offset_baixo) {
            if (sorteio == 1) {
                desenha_bloco(bloco1, bloco_x, bloco_y)
            } else if (sorteio == 2) {
                desenha_bloco(bloco22, bloco_x, bloco_y)
            }
            
        }
        
        scan()
    } else if (game_over) {
        basic.clearScreen()
        no_jogo = false
        basic.showIcon(IconNames.Skull)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.UntilDone)
        basic.showNumber(pontos)
        basic.pause(2000)
        arena = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        pontos = 0
        tempo = 650
        tempo_musica = 500
        game_over = false
    }
    
})
basic.forever(function on_forever2() {
    
    while (no_jogo) {
        índice42 = 0
        while (índice42 <= musica_tetris_tempos.length) {
            music.play(music.tonePlayable(musica_tetris_notas[índice42], musica_tetris_tempos[índice42] * tempo_musica), music.PlaybackMode.UntilDone)
            índice42 += 1
            if (!no_jogo) {
                break
            }
            
        }
    }
})
