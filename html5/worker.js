function sum(num) {
	for (var i = 0; i < 100000000; i++) {
		num+=i;
	}
	return num;
}

self.onmessage = function(event) {
	self.postMessage(sum(event.data));
}