def renderiza_arena():
    for �ndice in range(5):
        for indice2 in range(5):
            if arena[5 * indice2 + �ndice] == 1:
                led.plot(�ndice, indice2)
def apaga_bloco(bloco: List[number], x: number, y: number):
    for �ndice2 in range(2):
        for indice22 in range(2):
            if bloco[2 * indice22 + �ndice2] == 1:
                led.unplot(x + �ndice2, y + indice22)
                arena[5 * (y + indice22) + (x + �ndice2)] = 0
def verifica_col_embaixo(bloco2: List[number]):
    global colide_embaixo
    colide_embaixo = False
    for �ndice3 in range(2):
        for �ndice22 in range(2):
            if bloco2[2 * �ndice22 + �ndice3] == 1:
                if bloco2[2 * (�ndice22 + 1) + �ndice3] != 1:
                    if arena[5 * (�ndice22 + bloco_y + 1) + (�ndice3 + bloco_x)] == 1:
                        colide_embaixo = True
            if colide_embaixo:
                break
        if colide_embaixo:
            break
def desenha_bloco(bloco3: List[number], x2: number, y2: number):
    for �ndice32 in range(2):
        for indice23 in range(2):
            if bloco3[2 * indice23 + �ndice32] == 1:
                led.plot(x2 + �ndice32, y2 + indice23)
                arena[5 * (y2 + indice23) + (x2 + �ndice32)] = 1
def verifica_col_dir(bloco4: List[number]):
    global colide_dir
    for �ndice4 in range(2):
        for �ndice23 in range(2):
            if bloco4[2 * �ndice23 + �ndice4] == 1:
                if bloco4[2 * �ndice23 + (�ndice4 + 1)] != 1:
                    if arena[5 * (�ndice23 + bloco_y) + (�ndice4 + bloco_x + 1)] == 1:
                        colide_dir = True
            if colide_dir:
                break
        if colide_dir:
            break

def on_button_pressed_a():
    if no_jogo:
        music.play(music.tone_playable(165, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        if sorteio == 1:
            if not (pulso):
                verifica_col_embaixo(bloco1)
                anda_esq(bloco1)
        elif sorteio == 2:
            if not (pulso):
                verifica_col_embaixo(bloco22)
                anda_esq(bloco22)
input.on_button_pressed(Button.A, on_button_pressed_a)

def rotaciona():
    global rotacao
    if rotacao < 4:
        rotacao += 1
    else:
        rotacao = 1

def on_gesture_shake():
    global no_jogo, colide_embaixo
    if not (no_jogo):
        no_jogo = True
        basic.clear_screen()
    else:
        colide_embaixo = False
        music.play(music.tone_playable(659, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(988, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(659, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(784, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        if sorteio == 1:
            verifica_col_embaixo(bloco1)
            apaga_bloco(bloco1, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco1)
            if not (limite_ultrapassado):
                desenha_bloco(bloco1, bloco_x, bloco_y)
        elif sorteio == 2:
            verifica_col_embaixo(bloco22)
            apaga_bloco(bloco22, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco22)
            if not (limite_ultrapassado):
                desenha_bloco(bloco22, bloco_x, bloco_y)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def anda_diagonal_dir(bloco5: List[any]):
    global colide_diagonal_dir, bloco_x
    colide_diagonal_dir = False
    definir_blocos()
    verifica_col_diagonal_esq(bloco5)
    if not (colide_diagonal_dir):
        if bloco_x < 3 + offset_dir and bloco_y < 3 + offset_baixo:
            apaga_bloco(bloco5, bloco_x, bloco_y)
            bloco_x += -1
            bloco_x += 1
def desce_bloco():
    global colide_embaixo, bloco_y
    if no_jogo:
        colide_embaixo = False
        while not (colide_embaixo) and bloco_y < 3 + offset_baixo:
            while bloco_y < 3 + offset_baixo:
                if sorteio == 1:
                    definir_blocos()
                    verifica_col_embaixo(bloco1)
                    if not (colide_embaixo):
                        apaga_bloco(bloco1, bloco_x, bloco_y)
                        bloco_y += 1
                        desenha_bloco(bloco1, bloco_x, bloco_y)
                elif sorteio == 2:
                    definir_blocos()
                    verifica_col_embaixo(bloco22)
                    if not (colide_embaixo):
                        apaga_bloco(bloco22, bloco_x, bloco_y)
                        bloco_y += 1
                        desenha_bloco(bloco22, bloco_x, bloco_y)
                basic.pause(tempo * 2)
                if colide_embaixo:
                    basic.pause(500)
                    if input.button_is_pressed(Button.A):
                        if sorteio == 1:
                            verifica_col_diagonal_esq(bloco1)
                        elif sorteio == 2:
                            verifica_col_diagonal_esq(bloco22)
                        if not (colide_diagonal_esq):
                            if sorteio == 1:
                                anda_diagonal_esq(bloco1)
                            elif sorteio == 2:
                                anda_diagonal_esq(bloco22)
                        else:
                            if sorteio == 1:
                                desenha_bloco(bloco1, bloco_x, bloco_y)
                            elif sorteio == 2:
                                desenha_bloco(bloco22, bloco_x, bloco_y)
                            break
                    elif input.button_is_pressed(Button.B):
                        if sorteio == 1:
                            verifica_col_diagonal_dir(bloco1)
                        elif sorteio == 2:
                            verifica_col_diagonal_dir(bloco22)
                        if not (colide_diagonal_dir):
                            if sorteio == 1:
                                anda_diagonal_dir(bloco1)
                            elif sorteio == 2:
                                anda_diagonal_dir(bloco22)
                        else:
                            if sorteio == 1:
                                desenha_bloco(bloco1, bloco_x, bloco_y)
                            elif sorteio == 2:
                                desenha_bloco(bloco22, bloco_x, bloco_y)
                            break
                    else:
                        break
            if sorteio == 1:
                verifica_col_embaixo(bloco1)
            elif sorteio == 2:
                verifica_col_embaixo(bloco22)
        if sorteio == 1:
            desenha_bloco(bloco1, bloco_x, bloco_y)
            verifica_game_over(bloco1, bloco_x, bloco_y)
        elif sorteio == 2:
            desenha_bloco(bloco22, bloco_x, bloco_y)
            verifica_game_over(bloco22, bloco_x, bloco_y)
def scan():
    global j, i, row_point, pontos, pausa_tetris, prox_linha_vazia, k
    j = 4
    for index in range(5):
        i = 0
        row_point = True
        for index2 in range(5):
            if arena[5 * j + i] == 0:
                row_point = False
                break
            i += 1
        if row_point:
            pontos += 1
            pausa_tetris = True
            for �ndice5 in range(5):
                music.play(music.tone_playable(659, music.beat(BeatFraction.EIGHTH)),
                    music.PlaybackMode.UNTIL_DONE)
                music.play(music.tone_playable(831, music.beat(BeatFraction.EIGHTH)),
                    music.PlaybackMode.UNTIL_DONE)
                led.unplot(�ndice5, j)
                led.plot_brightness(�ndice5, j, 50)
                music.play(music.tone_playable(988, music.beat(BeatFraction.EIGHTH)),
                    music.PlaybackMode.UNTIL_DONE)
                music.play(music.tone_playable(831, music.beat(BeatFraction.EIGHTH)),
                    music.PlaybackMode.UNTIL_DONE)
            prox_linha_vazia = True
            k = 0
            while prox_linha_vazia and k <= 4:
                desloca_arena(j + k)
                for �ndice6 in range(5):
                    if arena[5 * j + �ndice6] == 1:
                        prox_linha_vazia = False
                k += 1
            k = 0
            basic.clear_screen()
            renderiza_arena()
            j += 1
            pausa_tetris = False
        j += -1
def verifica_col_diagonal_dir(bloco6: List[number]):
    global colide_diagonal_dir
    for �ndice7 in range(2):
        for �ndice24 in range(2):
            if bloco6[2 * �ndice24 + �ndice7] == 1:
                if bloco6[2 * (�ndice24 + 1) + (�ndice7 + 1)] != 1:
                    if arena[5 * (�ndice24 + bloco_y + 1) + (�ndice7 + bloco_x + 1)] == 1:
                        colide_diagonal_dir = True
            if colide_diagonal_dir:
                break
        if colide_diagonal_dir:
            break

def on_button_pressed_ab():
    global no_jogo, colide_embaixo
    if not (no_jogo):
        no_jogo = True
        basic.clear_screen()
    else:
        colide_embaixo = False
        music.play(music.tone_playable(659, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(988, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(659, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(784, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
        if sorteio == 1:
            verifica_col_embaixo(bloco1)
            apaga_bloco(bloco1, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco1)
            if not (limite_ultrapassado):
                desenha_bloco(bloco1, bloco_x, bloco_y)
        elif sorteio == 2:
            verifica_col_embaixo(bloco22)
            apaga_bloco(bloco22, bloco_x, bloco_y)
            rotaciona()
            definir_blocos()
            verifica_limite(bloco22)
            if not (limite_ultrapassado):
                desenha_bloco(bloco22, bloco_x, bloco_y)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    if no_jogo:
        music.play(music.tone_playable(330, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        if sorteio == 1:
            verifica_col_embaixo(bloco1)
            if not (pulso):
                anda_dir(bloco1)
        elif sorteio == 2:
            verifica_col_embaixo(bloco22)
            if not (pulso):
                anda_dir(bloco22)
input.on_button_pressed(Button.B, on_button_pressed_b)

def verifica_limite(bloco7: List[number]):
    global limite_ultrapassado, bloco_x
    if no_jogo:
        limite_ultrapassado = False
        for �ndice25 in range(2):
            for indice222 in range(2):
                if bloco7[2 * indice222 + �ndice25] == 1 and arena[5 * (bloco_y + indice222) + (bloco_x + �ndice25)] == 1:
                    limite_ultrapassado = True
                    verifica_col_esq(bloco7)
                    apaga_bloco(bloco7, bloco_x, bloco_y)
                    if not (colide_esq):
                        bloco_x += -1
                    else:
                        desrotaciona()
                    desenha_bloco(bloco7, bloco_x, bloco_y)
def verifica_col_esq(bloco8: List[number]):
    global colide_esq
    for �ndice8 in range(2):
        for �ndice26 in range(2):
            if bloco8[2 * �ndice26 + �ndice8] == 1:
                if bloco8[2 * �ndice26 + (�ndice8 - 1)] != 1:
                    if arena[5 * (�ndice26 + bloco_y) + (�ndice8 + bloco_x - 1)] == 1:
                        colide_esq = True
            if colide_esq:
                break
        if colide_esq:
            break
def desrotaciona():
    global rotacao
    if rotacao > 0:
        rotacao += -1
    else:
        rotacao = 4
def anda_dir(bloco9: List[any]):
    global colide_dir, bloco_x
    colide_dir = False
    definir_blocos()
    verifica_col_dir(bloco9)
    if not (colide_dir):
        if bloco_x < 3 + offset_dir:
            apaga_bloco(bloco9, bloco_x, bloco_y)
            bloco_x += 1
def definir_blocos():
    global offset_esq, offset_dir, offset_baixo, bloco1, bloco22
    if rotacao == 1:
        if sorteio == 1:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco stick
            bloco1 = [0, 0, 1, 1]
        elif sorteio == 2:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco Little L1
            bloco22 = [1, 0, 1, 1]
    elif rotacao == 2:
        if sorteio == 1:
            offset_esq = 0
            offset_dir = 1
            offset_baixo = 0
            # Bloco stick
            bloco1 = [1, 0, 1, 0]
        elif sorteio == 2:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco Little L1
            bloco22 = [1, 1, 1, 0]
    elif rotacao == 3:
        if sorteio == 1:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco stick
            bloco1 = [0, 0, 1, 1]
        elif sorteio == 2:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco Little L1
            bloco22 = [1, 1, 0, 1]
    elif rotacao == 4:
        if sorteio == 1:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco stick
            bloco1 = [0, 0, 1, 1]
        elif sorteio == 2:
            offset_esq = 0
            offset_dir = 0
            offset_baixo = 0
            # Bloco Little L1
            bloco22 = [0, 1, 1, 1]
def desloca_arena(y3: number):
    global i
    i = y3
    while i > 0:
        for �ndice9 in range(5):
            arena[5 * i + �ndice9] = arena[5 * (i - 1) + �ndice9]
        i += -1
    for �ndice10 in range(5):
        arena[�ndice10] = 0
def anda_esq(bloco10: List[any]):
    global colide_esq, bloco_x
    colide_esq = False
    definir_blocos()
    verifica_col_esq(bloco10)
    if not (colide_esq):
        if bloco_x > 0 - offset_esq:
            apaga_bloco(bloco10, bloco_x, bloco_y)
            bloco_x += -1
def verifica_game_over(bloco11: List[any], x3: number, y4: number):
    global game_over
    for �ndice11 in range(2):
        for �ndice27 in range(2):
            if arena[2 * �ndice27 + �ndice11] == 1:
                if y4 + �ndice27 < 0:
                    game_over = True
def anda_diagonal_esq(bloco12: List[any]):
    global colide_diagonal_esq, bloco_x
    colide_diagonal_esq = False
    definir_blocos()
    verifica_col_diagonal_esq(bloco12)
    if not (colide_diagonal_esq):
        if bloco_x > 0 - offset_esq and bloco_y < 3 + offset_baixo:
            apaga_bloco(bloco12, bloco_x, bloco_y)
            bloco_x += -1
            bloco_x += 1
def verifica_col_diagonal_esq(bloco13: List[number]):
    global colide_diagonal_esq
    for �ndice12 in range(2):
        for �ndice28 in range(2):
            if bloco13[2 * �ndice28 + �ndice12] == 1:
                if bloco13[2 * (�ndice28 + 1) + (�ndice12 - 1)] != 1:
                    if arena[5 * (�ndice28 + bloco_y + 1) + (�ndice12 + bloco_x - 1)] == 1:
                        colide_diagonal_esq = True
            if colide_diagonal_esq:
                break
        if colide_diagonal_esq:
            break
�ndice42 = 0
game_over = False
offset_esq = 0
colide_esq = False
k = 0
prox_linha_vazia = False
pausa_tetris = False
pontos = 0
row_point = False
i = 0
j = 0
colide_diagonal_esq = False
offset_baixo = 0
offset_dir = 0
colide_diagonal_dir = False
limite_ultrapassado = False
rotacao = 0
bloco22: List[number] = []
bloco1: List[number] = []
sorteio = 0
colide_dir = False
bloco_x = 0
bloco_y = 0
arena: List[number] = []
tempo = 0
no_jogo = False
colide_embaixo = False
pulso = False
pulso = False
colide_embaixo = False
no_jogo = False
tempo = 650
tempo_musica = 500
arena = [0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0]
musica_tetris_tempos = [1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    1,
    1,
    1,
    2,
    0.5,
    1,
    0.5,
    1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    0.5,
    0.5,
    1,
    1,
    1,
    1,
    2,
    0.5]
musica_tetris_notas = [659,
    494,
    523,
    587,
    523,
    494,
    440,
    440,
    523,
    659,
    587,
    523,
    494,
    494,
    523,
    587,
    659,
    523,
    440,
    440,
    0,
    587,
    698,
    880,
    784,
    698,
    659,
    659,
    523,
    659,
    587,
    523,
    494,
    494,
    523,
    587,
    659,
    523,
    440,
    440,
    0]

def on_forever():
    global sorteio, bloco_x, bloco_y, tempo_musica, tempo, no_jogo, arena, pontos, game_over
    if not (no_jogo) and not (game_over):
        basic.show_leds("""
            . . . . .
            . # # # .
            . . # . .
            . . # . .
            . . # . .
            """)
    elif no_jogo and not (game_over):
        if not (pausa_tetris):
            basic.clear_screen()
            sorteio = randint(1, 2)
            bloco_x = randint(0, 3)
            bloco_y = -2
            renderiza_arena()
            for index3 in range(randint(1, 4)):
                rotaciona()
            desce_bloco()
        if tempo_musica > 250:
            tempo_musica += -25
        if tempo > 50:
            tempo += -50
        basic.pause(tempo)
        if colide_embaixo or bloco_y < 3 + offset_baixo:
            if sorteio == 1:
                desenha_bloco(bloco1, bloco_x, bloco_y)
            elif sorteio == 2:
                desenha_bloco(bloco22, bloco_x, bloco_y)
        scan()
    elif game_over:
        basic.clear_screen()
        no_jogo = False
        basic.show_icon(IconNames.SKULL)
        music._play_default_background(music.built_in_playable_melody(Melodies.FUNERAL),
            music.PlaybackMode.UNTIL_DONE)
        basic.show_number(pontos)
        basic.pause(2000)
        arena = [0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0]
        pontos = 0
        tempo = 650
        tempo_musica = 500
        game_over = False
basic.forever(on_forever)

def on_forever2():
    global �ndice42
    while no_jogo:
        �ndice42 = 0
        while �ndice42 <= len(musica_tetris_tempos):
            music.play(music.tone_playable(musica_tetris_notas[�ndice42],
                    musica_tetris_tempos[�ndice42] * tempo_musica),
                music.PlaybackMode.UNTIL_DONE)
            �ndice42 += 1
            if not (no_jogo):
                break
basic.forever(on_forever2)