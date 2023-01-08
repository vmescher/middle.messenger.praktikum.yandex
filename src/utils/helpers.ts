type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isFunction(value: unknown): value is Function {
	return typeof value === 'function';
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
	return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {

	if (!lhs && !rhs) {
		return true;
	}

	if (!lhs || !rhs) {
		return false;
	}

	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		if (!rhs.hasOwnProperty(key)) {
			return false;
		}

		const rightValue = rhs[key];

		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {

			if (isPlainObject(value) && isPlainObject(rightValue)) {
				if (isEqual(value, rightValue)) {
					continue;
				}

				return false;
			} else if (isArray(value) && isArray(rightValue)) {
				if (isEqual(value as unknown as PlainObject, rightValue as unknown as PlainObject)) {
					continue;
				}

				return false;
			} else {

				return false;
			}
		}

		if (isFunction(value) && isFunction(rightValue)) {
			if (value.toString() === rightValue.toString()) {
				continue;
			}

			return false;
		}

		if (value !== rightValue) {
			if (Number.isNaN(value) && Number.isNaN(rightValue)) {
				continue;
			}

			return false;
		}
	}

	return true;
}

function isEqualPrimitive<T = string | number>(lhs: T, rhs: T): boolean {
	return lhs === rhs;
}

function queryString(data: PlainObject) {
	if (!isPlainObject(data)) {
		throw new Error('input must be an object');
	}

	function getKey(key: string, parentKey?: string) {
		return parentKey ? `${parentKey}[${key}]` : key;
	}

	function getParams(data: PlainObject | [], parentKey?: string) {
		const result: [string, string][] = [];

		for(const [key, value] of Object.entries(data)) {
			if (isArrayOrObject(value)) {
				result.push(...getParams(value, getKey(key, parentKey)));
			} else {
				result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
			}
		}

		return result;
	}

	return '?' + getParams(data).map(arr => arr.join('=')).join('&');
}

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
	for (let p in rhs) {
		if (!rhs.hasOwnProperty(p)) {
			continue;
		}

		try {
			if (isPlainObject(rhs[p])) {
				rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject);
			} else {
				lhs[p] = rhs[p];
			}
		} catch(e) {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}

function set(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
	if (!isPlainObject(object)) {
		return object;
	}

	const result = path.split('.').reduceRight<PlainObject>((acc, key) => ({
		[key]: acc,
	}), value as any);

	return merge(object as PlainObject, result);
}

export {isPlainObject, isArray, isArrayOrObject, isFunction, isEqual, isEqualPrimitive, queryString, merge, set};
