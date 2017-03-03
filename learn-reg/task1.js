// 判断是否用手机号
function isPhone(phoneNum) {
	let reg = /^1[34578]\d{9}$/
	return reg.test(phoneNum)
}



console.log(isPhone('18812011232')) 
console.log(isPhone('18812312'))
console.log(isPhone('12345678909'))

function isRepeat(str) {
	let reg = /\b([a-zA-Z]+)\s+\1\b/
	return reg.test(str)
}

console.log(isRepeat('foo foo bar'))
console.log(isRepeat('foo bar foo'))
console.log(isRepeat('foo barbar bar'))
