let __global
if (typeof window !== 'undefined') {
	__global = window
} else if (typeof global !== 'undefined') {
	__global = global
} else if (typeof self !== 'undefined') {
	__global = self
} else if (typeof this !== 'undefined') {
	__global = this
} else {
	__global = {}
}

import 'web-audio-api-shim'

function fill (name) {
	if (__global[name]) {
		return __global[name]
	}
}

/*
	http://www.ecma-international.org/ecma-262/6.0/#sec-global-object
*/
let JSON = fill('JSON')
let Math = fill('Math')
let Reflect = fill('Reflect')
export {
	JSON,
	Math,
	Reflect
}

let encodeURIComponent = fill('encodeURIComponent')
let encodeURI = fill('encodeURI')
let decodeURIComponent = fill('decodeURIComponent')
let decodeURI = fill('decodeURI')
let parseInt = fill('parseInt')
let parseFloat = fill('parseFloat')
let isNaN = fill('isNaN')
let isFinite = fill('isFinite')
export {
	encodeURIComponent,
	encodeURI,
	decodeURIComponent,
	decodeURI,
	parseInt,
	parseFloat,
	isNaN,
	isFinite
}

let ArrayBuffer = fill('ArrayBuffer')
let DataView = fill('DataView')
let Error = fill('Error')
let EvalError = fill('EvalError')
let Float32Array = fill('Float32Array')
let Float64Array = fill('Float64Array')
let Int8Array = fill('Int8Array')
let Int16Array = fill('Int16Array')
let Int32Array = fill('Int32Array')
let Map = fill('Map')
let Proxy = fill('Proxy')
let Promise = fill('Promise')
let RangeError = fill('RangeError')
let ReferenceError = fill('ReferenceError')
let Set = fill('Set')
let Symbol = fill('Symbol')
let SyntaxError = fill('SyntaxError')
let TypeError = fill('TypeError')
let Uint8Array = fill('Uint8Array')
let Uint8ClampedArray = fill('Uint8ClampedArray')
let Uint16Array = fill('Uint16Array')
let Uint32Array = fill('Uint32Array')
let URIError = fill('URIError')
let WeakMap = fill('WeakMap')
let WeakSet = fill('WeakSet')
export {
	ArrayBuffer,
	DataView,
	Error,
	EvalError,
	Float32Array,
	Float64Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Map,
	Proxy,
	Promise,
	RangeError,
	ReferenceError,
	Set,
	Symbol,
	SyntaxError,
	TypeError,
	Uint8Array,
	Uint8ClampedArray,
	Uint16Array,
	Uint32Array,
	URIError,
	WeakMap,
	WeakSet
}

/*
	https://html.spec.whatwg.org/#window
*/
let navigator = fill('navigator')
let document = fill('document')
let history = fill('history')
let location = fill('location')
let external = fill('external')
let requestAnimationFrame = fill('requestAnimationFrame')
let cancelAnimationFrame = fill('cancelAnimationFrame')
let applicationCache = fill('applicationCache')
let postMessage = fill('postMessage')
export {
	navigator,
	document,
	history,
	location,
	external,
	requestAnimationFrame,
	cancelAnimationFrame,
	applicationCache,
	postMessage
}

/*
	https://html.spec.whatwg.org/#windowtimers
*/
let setTimeout = fill('setTimeout')
let clearTimeout = fill('clearTimeout')
let setInterval = fill('setInterval')
let clearInterval = fill('clearInterval')
export {
	setTimeout,
	clearTimeout,
	setInterval,
	clearInterval
}

/*
	https://html.spec.whatwg.org/#windowbase64
*/
let btoa = fill('btoa')
let atob = fill('atob')
export {
	btoa,
	atob
}

/*
	https://w3c.github.io/webstorage/
*/
let sessionStorage = fill('sessionStorage')
let localStorage = fill('localStorage')
export {
	sessionStorage,
	localStorage
}

/*
	https://url.spec.whatwg.org/
*/
let URL = fill('URL')
let URLSearchParams = fill('URLSearchParams')
export {
	URL,
	URLSearchParams
}

/*
	https://xhr.spec.whatwg.org/
*/
let XMLHttpRequest = fill('XMLHttpRequest')
let FormData = fill('FormData')
export {
	XMLHttpRequest,
	FormData
}

/*
	https://notifications.spec.whatwg.org/
*/
let Notification = fill('Notification')
export {
	Notification
}

/*
	https://w3c.github.io/FileAPI/
*/
let FileReader = fill('FileReader')
let Blob = fill('Blob')
let File = fill('File')
let FileList = fill('FileList')
export {
	FileReader,
	Blob,
	File,
	FileList
}

/*
	https://w3c.github.io/gamepad/
*/
let Gamepad = fill('Gamepad')
let GamepadEvent = fill('GamepadEvent')
let GamepadButton = fill('GamepadButton')
export {
	Gamepad,
	GamepadEvent,
	GamepadButton
}

/*
	http://webaudio.github.io/web-audio-api/
*/
let AudioContext = fill('AudioContext')
let AudioBuffer = fill('AudioBuffer')
export {
	AudioContext,
	AudioBuffer
}

let fetch = fill('fetch')
let Body = fill('Body')
let Request = fill('Request')
let Response = fill('Response')
let Headers = fill('Headers')
export {
	fetch,
	Body,
	Request,
	Response,
	Headers
}

let HTMLCanvasElement = fill('HTMLCanvasElement')
export {
	HTMLCanvasElement
}

export default __global
