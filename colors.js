
// https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html#TP-ANSI-FG-WHITE:CAPS

const colors = {
 Reset:      "\x1b[0m",
 Bright:     "\x1b[1m",
 Dim:        "\x1b[2m",
 Underscore: "\x1b[4m",
 Blink:      "\x1b[5m",
 Reverse:    "\x1b[7m",
 Hidden:     "\x1b[8m",
 fg: {
  Black:   "\x1b[30m",
  Red:     "\x1b[31m",
  Green:   "\x1b[32m",
  Yellow:  "\x1b[33m",
  Blue:    "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan:    "\x1b[36m",
  White:   "\x1b[37m",
  Crimson: "\x1b[38m" 
 },
 bg: {
  Black:    "\x1b[40m",
  Red:      "\x1b[41m",
  Green:    "\x1b[42m",
  Yellow:   "\x1b[43m",
  Blue:     "\x1b[44m",
  Magenta:  "\x1b[45m",
  Cyan:     "\x1b[46m",
  White:    "\x1b[47m",
  Crimson:  "\x1b[48m"
 }
};


module.exports = colors

// Examples:
// Front Color Red and Reset
// console.log(colors.fg.Red, 'Text in Red', colors.fg.White)
// console.log('ok')
// Back Color Red and Reset
// console.log(colors.bg.Red, 'Text in Red', colors.bg.Black)
// console.log('ok')

