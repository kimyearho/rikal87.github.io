/**
 * Data Magnet v1.1.0
 * Author: rikal872@gmail.com
 */
var DataMagnet = function(scope, dependency, deleteTemplate){

	this.dataRef = "data-ref";
	this.deleteSelector = deleteTemplate || false;
	console.log(this.deleteSelector);
	this.scope = $(scope);
	this.dependency = dependency || false;
	var seq = 0;
	this.cloneElement = function(scope, data, func, attachOption, bind){
		var instance = this;
		var dref = this.dataRef;
		for(var idx in data){
			$(scope).each(function(idx2, tg){
				var clonedTarget = $(tg).clone();
				var ref = $(clonedTarget).attr(dref);
				
				clonedTarget.attr("id", null);
				clonedTarget.addClass("databinder-created");
				clonedTarget.attr("data-idx", idx);
				instance._update(clonedTarget, data[idx], func, attachOption, bind, seq++);
				
				if( attachOption == true || $(tg).next(".databinder-created").length == 0 ) clonedTarget.insertAfter(tg);
				else clonedTarget.insertAfter($(tg).nextAll(".databinder-created").last());
				
				if(func !== undefined && func[ref] !== undefined) func[ref]($(clonedTarget), data, ref);
				if(func !== undefined && func.hasOwnProperty("this")) func["this"]($(clonedTarget), data, ref);
				
			});
		}
	};
	this.bind = function(data, func){
		this.cloneElement(this.scope, data, func, false, true);
		console.log(this.deleteSelector);
		if(this.deleteSelector) $(this.scope).remove();
		
	};
	this.remove = function(){
		$(this.scope).nextAll(".databinder-created").remove();
	};
	this.update = function(data, func){
		this._update(this.scope, data, func, false, false);
	}
	this._update = function(scope, data, func, attachOption, bind, seq){
		var instance = this;
		var dref = this.dataRef;
		$(scope).find("["+dref+"]").each(function(idx, el){
			var ref = $(el).attr(dref);
			
			if(data.hasOwnProperty(ref)){
				if(typeof data[ref] === "object" && data[ref].toString().indexOf("Object") !== -1){
					var _func;
					if(func !== undefined && func.hasOwnProperty(ref)) _func = func[ref];
					if(bind)instance.cloneElement($(el), data[ref], _func, attachOption, bind);
					if(_func !== undefined && _func.hasOwnProperty("this")) _func["this"]($(el), data, ref);
					if(instance.deleteSelector) $(el).remove();
				}else{
					instance.bindingValueOfElement(el, data, ref, instance, seq);
					
					if(func !== undefined && func["ALL"] !== undefined) func["ALL"]($(el), data, ref);
				}
				if(instance.dependency){
					$(el).change(function(){
						data[ref] = convertValueOfType(data[ref], el);
					});
				}
			}
			if(func !== undefined && func.hasOwnProperty(ref)) if(typeof func[ref] === "function")func[ref]($(el), data, ref);
		});
	};
	
	this.insert = function(data, func){
		this.cloneElement(this.scope, data, func, true, true);
	};
	
	this.bindingValueOfElement = function(el, data, ref, instance, seq){
		if($(el).is("input, textarea, select, button")){
			switch($(el).prop("type")){
				case "checkbox" : {
					$(el).prop("checked", data[ref]);
				}break;
				case "radio":{
//					console.log(ref);
//					console.log(data);
					$(el).prop("name", $(el).attr("name") || $(el).attr(instance.dataRef) +"-"+ seq);
					$(el).filter("[value="+data[ref]+"]").prop("checked", true);
				}break;
				default:$(el).val(data[ref]); break;
			}
		}
		else $(el).text(data[ref]);
	}
	
	function convertValueOfType(refData, el){
		var temp;
		if($(el).is("input, textarea, select, button")) temp = $(el).val();
		else temp = $(el).text();
		
		switch(typeof refData)
		{
			case "number":temp = Number(temp); break;
			case "boolean":{
				 if($(el).attr("type") === "checkbox"){
					 temp = $(el).is(":checked");
				 }else{
					 temp = temp == "0" || temp == "" || temp.toLowerCase() == "false" ? false : true;
				 }
			}break;
		}
		
		return temp;
	};
}
