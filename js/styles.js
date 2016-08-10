var p = new Plato()
p.layout.wrappers.default = 800
Descartes.add(p.base())

var styles = {}

var reset = {
	"margin-top": 0
}

var html = {}

var body = {}

var nav = {
}

var _navigator = {
	"text-transform": "uppercase",
	"line-height": 1.5,
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
styles.html.body.h1 = reset
styles.html.body.h2 = reset
console.log(styles)
Descartes.add(styles)