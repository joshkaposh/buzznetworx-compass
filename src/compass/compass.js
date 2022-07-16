const isIOS = !(navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/));

window.addEventListener("deviceorientation", function (event) {
	console.log(event.alpha + " : " + event.beta + " : " + event.gamma);
});

const handleOrientationEvent = (e, frontToBack, leftToRight, rotateDegrees) => {
	if (frontToBack && leftToRight && rotateDegrees) {
		// do something amazing
		// console.log(e.webkitCompassHeading || Math.abs(e.alpha - 360));
	}
};

export function test() {
	if ("AbsoluteOrientationSensor" in window) {
		let sensor = new AbsoluteOrientationSensor();
		sensor.addEventListener("reading", (e) => {
			console.log("Listening for rotations!");
		});
	}
}

export function startCompass() {
	if (window.DeviceOrientationEvent) {
		window.addEventListener(
			"deviceorientation",
			(e) => {
				// alpha: rotation around z-axis
				let rotateDegrees = e.alpha;
				// gamma: left to right
				let leftToRight = e.gamma;
				// beta: front back motion
				let frontToBack = e.beta;
				handleOrientationEvent(e, frontToBack, leftToRight, rotateDegrees);
			},
			true
		);
	}
}
