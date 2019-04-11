let log = console.log.bind('console')
var cloneObj = function(obj){
	let str, newobj = obj.constructor === Array ? [] : {}
	if(typeof obj !== 'object'){
		return 
	}else if(window.JSON){
		str = JSON.stringify(obj)
		newobj = JSON.parse(str)
	}else{
		for(let i in obj){
			newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
		}
	}
	return newobj
}