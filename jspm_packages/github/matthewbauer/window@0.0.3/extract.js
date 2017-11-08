var props = []
for (var prop in window) {
	props.push(prop)
}
JSON.stringify(props, null, '  ')
