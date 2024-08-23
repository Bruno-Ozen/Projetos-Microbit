def on_button_pressed_a():
    global animacao_relogio, tempo_inicial
    animacao_relogio = True
    tempo_inicial = input.running_time()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global animacao_relogio, tempo_final, tempo_total
    basic.clear_screen()
    animacao_relogio = False
    tempo_final = input.running_time()
    tempo_total = Math.round((tempo_final - tempo_inicial) / 1000) + 1
    basic.show_number(tempo_total)
    basic.show_string("s")
    basic.clear_screen()
    basic.show_string("A")
input.on_button_pressed(Button.B, on_button_pressed_b)

tempo_total = 0
tempo_final = 0
tempo_inicial = 0
animacao_relogio = False
music.set_tempo(120)
animacao_relogio = False
basic.show_string("A")

def on_forever():
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . # . #
            # . # . #
            # . . . #
            . # # # .
            """)
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . . # #
            # . # . #
            # . . . #
            . # # # .
            """)
        music.play(music.tone_playable(294, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . . . #
            # . # # #
            # . . . #
            . # # # .
            """)
        music.play(music.tone_playable(330, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . . . #
            # . # . #
            # . . # #
            . # # # .
            """)
        music.play(music.tone_playable(349, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . . . #
            # . # . #
            # . # . #
            . # # # .
            """)
        music.play(music.tone_playable(392, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . . . #
            # . # . #
            # # . . #
            . # # # .
            """)
        music.play(music.tone_playable(440, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # . . . #
            # # # . #
            # . . . #
            . # # # .
            """)
        music.play(music.tone_playable(494, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    if animacao_relogio:
        basic.show_leds("""
            . # # # .
            # # . . #
            # . # . #
            # . . . #
            . # # # .
            """)
        music.play(music.tone_playable(523, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever)
