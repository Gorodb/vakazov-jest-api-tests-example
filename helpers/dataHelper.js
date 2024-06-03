exports.DataHelper = class DataHelper {
	// the delay in milliseconds to pause the code execution process
	static async delay(milliseconds) {
		return new Promise(resolve => {
			setTimeout(resolve, milliseconds)
		});
	}

	// compares 2 json objects using closure and recursive
	// checks that second object includes all fields from the first one
	static compareObjects = (obj1, obj2, isSilent = false) => {
		let flag = true
		let compare = (_obj1, _obj2) => {
			for (let item in _obj1) {
				// sort arrays if objects are array
				if (Array.isArray(_obj2[item]) && Array.isArray(_obj1[item])) {
					_obj1[item].sort(this.sortFunction);
					_obj2[item].sort(this.sortFunction);
				}
				// if the filed is object, compare it with the same function recursively
				if (_obj1[item] instanceof Object) {
					compare(_obj1[item], _obj2[item]);
					// continue needs to proceed with other fields of json on the same layer
					continue;
				}
				// here we check non json object by !== operator and if they are not equal set flag to false
				if (_obj1[item] !== _obj2[item]) {
					// if is silent it won't log the difference in objects
					if (isSilent) {
						console.log(`${_obj1[item]} != ${_obj2[item]} at '${item}'`);
					}
					flag = false;
				}
			}
			return flag;
		}
		// returns true of false
		return compare(obj1, obj2);
	}

	static sortFunction(a, b) {
		if (a > b) return 1
		if (a < b) return -1
		return 0
	}

	// compare 2 arrays
	checkArrays = (array1, array2) => {
		let flag = true;
		try {
			if (array1.length !== array2.length) {
				return false;
			}
		} catch {
			return false;
		}
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) {
				flag = false;
			}
		}
		return flag;
	};

	// waits for the event to be true or timeout
	static async waitUntil(event, timeout = 5000) {
		let currentTime = Date.now();
		const waitUntil = currentTime + timeout;

		while (!(await event()) && currentTime < waitUntil) {
			await this.delay(500);
			currentTime = Date.now();
		}

		return await event();
	}

	// returns random integer value from the specified range
	static getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// returns random value from provided array
	static getRandomValueFromArray(array) {
		const min = Math.ceil(0);
		const max = Math.floor(array.length - 1);
		return array[Math.floor(Math.random() * (max - min + 1)) + min];
	}

	// clones object, needs if you want to modify object,
	// e.g. by splice function, which mutates the object itself, but not returns modified one
	static clone(obj) {
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
			let copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
			return [...obj];
		}

		// Handle Object
		if (obj instanceof Object) {
			return {...obj};
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
}
