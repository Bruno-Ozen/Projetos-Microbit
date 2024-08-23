input.onButtonPressed(Button.A, function () {
    animacao_relogio = true
    tempo_inicial = input.runningTime()
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    animacao_relogio = false
    tempo_final = input.runningTime()
    tempo_total = Math.round((tempo_final - tempo_inicial) / 1000) + 1
    basic.showNumber(tempo_total)
    basic.showString("s")
    basic.clearScreen()
    basic.showString("A")
})
let tempo_total = 0
let tempo_final = 0
let tempo_inicial = 0
let animacao_relogio = false
music.setTempo(120)
animacao_relogio = false
basic.showString("A")
basic.forever(function () {
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . # . #
            # . # . #
            # . . . #
            . # # # .
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . . # #
            # . # . #
            # . . . #
            . # # # .
            `)
        music.play(music.tonePlayable(294, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # # #
            # . . . #
            . # # # .
            `)
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # . . # #
            . # # # .
            `)
        music.play(music.tonePlayable(349, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # . # . #
            . # # # .
            `)
        music.play(music.tonePlayable(392, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # # . . #
            . # # # .
            `)
        music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # . #
            # . . . #
            . # # # .
            `)
        music.play(music.tonePlayable(494, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (animacao_relogio) {
        basic.showLeds(`
            . # # # .
            # # . . #
            # . # . #
            # . . . #
            . # # # .
            `)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
})
