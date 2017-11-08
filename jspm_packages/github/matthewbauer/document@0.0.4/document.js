let __global
if (typeof window !== 'undefined') {
	__global = window.document
} else {
	__global = {}
}

import 'webcomponentsjs'

function fill (name) {
	if (__global[name]) {
		return __global[name].bind(__global)
	}
}

let registerElement = fill('registerElement')
export {
	registerElement
}

export default __global
