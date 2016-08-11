var p = new Plato()
p.layout.wrappers.default = 700
Descartes.add(p.base())

var styles = {}

var reset = {
	"margin-top": 0
}

var headerSize = function(level) {
	return Math.pow(1.2, 7 - level) + "em"
}

var header = function(level) {
	return {
		"margin-top": 0,
		"font-size": headerSize(level),
		"font-family": "Open Sans",
		"font-weight": 300,
		"padding": 0
	}
}

var html = {}

var body = {}

var nav = {
}

var _navigator = {
	"display": "none",
	"position": "fixed",
	"top": 5,
	"width": "100%",
	"background": "#fff",
	"text-transform": "uppercase",
	"line-height": 1.5,
	"z-index": 999,
	"box-shadow": "0 0 15px rgba(0,0,0,0.25)",
	"td": {
		"vertical-align": "top",
		"padding": "5px 10px",
		"font-size": "0.8em",
		"&:first-child": {
			"font-weight": 600
		},
		"ul": {
			"margin": 0,
			"list-style": "none",
			"padding": 0,
			"margin-top": 5
		}
	}
}

styles.html = html
styles.html.body = body
styles.html.body.nav = nav
styles.html.body.nav['.navigator'] = _navigator
styles.html.body.p = reset
styles.html.body.h1 = header(1)
styles.html.body.h2 = header(2)
styles.html.body['.post'] = {
	"height": "100%",
	"header": {
		"height": "100%",
		"background-image": function(_) {
			return "linear-gradient(rgba(37, 43, 51, 0.35),rgba(37, 43, 51, 0.35)), url('" + _.getAttribute("data-background") + "')"
		},
		"background-size": "cover",
		"background-position": function(_) {
			var position = "center "
			var background_position = _.getAttribute("data-background-position");
			position +=  (background_position === null || background_position.length === 0) ? "center" : background_position;
			return position
		},
		"text-align": "center",
		"div": {
			"color": "#fff",
			"position": "relative",
			"top": "50%",
			"transform": "translateY(-50%)",
			"text-shadow": "0 0 15px rgba(0,0,0,0.5)",
			".heading": {
				"text-transform": "uppercase",
				"font-size": 14,
				"letter-spacing": 5,
			}
		}
	},
	"article": {
		"padding": "3em 1em",
		"color": "#555",
		"line-height": 1.3,
		"h1": {
			"color": "#333",
			"padding": "0.4em 0",
			"font-size": headerSize(3)
		},
		"h2": {
			"color": "#333",
			"padding": "0.3em 0",
			"font-size": headerSize(4)
		}
	},
	".progress-bar": {
		"position": "fixed",
		"top": 0,
		"width": "100%",
		"height": 5,
		"background": "rgba(0,0,0,0.15)",
		"div": {
			"alias": "progress",
			"background": "#FF6140",
			"position": "absolute",
			"left": 0,
			"height": 5,
			"width": function() {
				var height = $(document).height() - $(window).height()
				console.log($(window).scrollTop())
				return (100 - (((height - $(window).scrollTop()) / height) * 100)) + "%"
			}
		}
	}
}
Descartes.add(styles)
$(window).scroll(Descartes.alias.progress.width)