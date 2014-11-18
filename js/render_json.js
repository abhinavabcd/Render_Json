String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function is_array(obj){
	if( Object.prototype.toString.call( obj ) === '[object Array]' ) {
		return true;
	}
	return false;
}

function is_object(obj){
	if( Object.prototype.toString.call( obj ) === '[object Object]' ) {
		return true;
	}
	return false;
}


function is_number(obj){
	if( Object.prototype.toString.call( obj ) === '[object Number]' ) {
		return true;
	}
	return false;
}

function is_string(obj){
	if( Object.prototype.toString.call( obj ) === '[object String]' ) {
		return true;
	}
	return false;
}

function isinstance(obj, key){
	if( Object.prototype.toString.call( obj ) === ('[object '+key+']') ) {
		return true;
	}
	return false;
}

function is_function(obj){
	if( Object.prototype.toString.call( obj ) === ('[object Function]') ) {
		return true;
	}
	return false;
}



function str(i){
	return i+'';
}

function isEmpty(object) {
	
	if(is_string(object) || is_number(object)){
		return false;
	}
	if(is_array(object)){
		return object.length==0;
	}
	for(var i in object){ 
		if(object.hasOwnProperty(i))
			return false; 
	} 
	return true; 
}


function get_as_class_name(l_keys){
    if(l_keys && l_keys.length>0){
       	var last = l_keys.pop();
         var ret = l_keys.map(key_as_class_name).join("__")+" "+key_as_class_name(last);
         l_keys.push(last);
         return ret;
    }
    else
        return "";
}

function as_unique_key(l_keys){
    if(l_keys){
         var ret = l_keys.map(key_as_class_name).join("__");
         return ret;
    }
    else
        return "";
}


function key_as_str(k){
    if(isinstance(k , 'Number'))
        return str(k);
    return k.split("_").join(" ");
}
function key_type_exists(dict , l_keys){
	if(!dict){
		return false;
	}
	if(dict[as_unique_key(l_keys)]){
		return true;
	}
	for(var i=0;i<l_keys.length;i++){
		var temp = l_keys.slice(0,i);
		for(var j=i;j<l_keys.length;j++){
			temp.push("*"); // * means any
		}
		if(dict[as_unique_key(temp)]){
			return true;
		}
	}
	return false;
}


function key_as_class_name(k){
    return str(k).replace(" ","_");
}


function create_img(id, class_name ,src){
	var ret =document.createElement("img");
	ret.className = class_name;
	if(id)
		ret.id = id;
	if(src)
		ret.src = src;
	return ret;
}
function create_div(id , class_name , html){
	var ret =document.createElement("div");
	ret.className = class_name;
	if(id) ret.id = id;
	if(html){
		ret.appendChild(document.createTextNode(html));
	}
	return ret;
}

function create_span(id , class_name , html){
	var ret =document.createElement("span");
	ret.className = class_name;
	if(id) ret.id = id;
	if(html){
		ret.appendChild(document.createTextNode(html));
	}
	return ret;
}

function create_text_node(data){
	data = !data ? "" : data;
	var ret = document.createTextNode(""); 
	return ret;
}

function set_property(obj , l_keys , val){
	if(!l_keys || l_keys.length==0){
		return;
	}
	for(var i=0;i<l_keys.length-1;i++){
		var key = l_keys[i];
		obj = obj[key];
	}
	obj[l_keys[l_keys.length-1]] = val;
}

function render_obj__rj(obj , l_keys , custom_render, main_obj){
//	if(!main_obj) main_obj = obj;
    var ret=create_text_node();
    if(isinstance(obj,'Object')){
        ret = create_div(as_unique_key(l_keys) ,  get_as_class_name(l_keys)+" obj");
        for(var i in obj){
        	if( str(i).endsWith("__rj") || str(i).endsWith("_id") || isEmpty(obj[i]) ){
                continue;	
            }
            l_keys.push(i);
            var A =create_div(as_unique_key(l_keys)+"_block" , get_as_class_name(l_keys)+' block');
        	var B =  create_div(as_unique_key(l_keys)+'_key' , 'key '+get_as_class_name(l_keys)+'_key' , key_as_str(i));
        	ret.appendChild(A);
        	A.appendChild(B);
        	if(!key_type_exists(custom_render , l_keys)){
	            A.appendChild(render_obj__rj(obj[i],l_keys));
            }
            else{
                A.appendChild(custom_render[as_unique_key(l_keys)](obj[i],l_keys));
            }
            l_keys.pop();
        }
    }
    else if(isinstance(obj,'Array')){
        ret = create_div(as_unique_key(l_keys), "vals "+get_as_class_name(l_keys)+' vals');
        for(var count=0;count<obj.length;count++){
            l_keys.push(count);
            var i = obj[count]; 
            ret.appendChild(render_obj__rj(i, l_keys));
            l_keys.pop();
        }
    }
    else if(isinstance(obj, 'Number')){
    	ret=create_div( as_unique_key(l_keys) , 'val '+get_as_class_name(l_keys), str(obj)+" ");
    }
    else if(isinstance(obj, 'String')){
//        # is img , is link , ext
        if(obj.endsWith(".png") || obj.endsWith(".jpg")){
        	ret=create_img(as_unique_key(l_keys) , 'val '+get_as_class_name(l_keys), str(obj));
        }
        else{
        	ret=create_div(as_unique_key(l_keys) ,'val '+get_as_class_name(l_keys) , str(obj));
        }
    }
    
    else if(isinstance(obj, 'Boolean')){
        ret= create_div(as_unique_key(l_keys) , 'check val '+get_as_class_name(l_keys) , str(obj));
    }
 
        ret.obj = obj;
	    ret.l_keys = l_keys.slice();
    return ret;
}

function render_controls(controls){
	var ret= create_div(null , "controls");
	var x = {};
	
	if(is_array(controls)){
		var controls_temp = {};
		for(var i=0;i<controls.length;i++){
			controls_temp[controls[i]]="";
		}
		controls = controls_temp;
	}
	
	for(var key in controls){
		val = controls[key];
		var type = val.type;
		var className = val.className;
		if(!type && key.endsWith("_button")){
			type = 'button';
		}
		if(!type && key.endsWith("_input")){
			type = 'input';
		}
		
		if(!type) type = 'button';
		
		name = val.name?val.name:key_as_str(key);
		switch(type){
			case 'button':
				var button = document.createElement('button');
				button.id= key;
				if(className)
					button.className+=className;
				button.innerHTML = name;
				x[key] = button;
				ret.appendChild(button);
				break;
			case 'input':
				var input = document.createElement('input');
				input.id= key;
				if(className)
					input.className+=className;
				x[key] = input;
				input.setAttribute("placeholder",name);
				ret.appendChild(input);
				break;
		}
	}
	return [ret , x];
};

function reset_val(obj , key_set , val , cb){
	
};

function insert_val(obj , key_set , val, cb){
	
};

function get_json_as_dom(obj){
	var a = null;
	if(is_string(obj))
		a = create_div(obj , " block" , obj);
	else
		a = render_obj__rj(obj, [], {});
	return a;
}

function Render_json(divx , idx, objx, controlsx , callbackx){
	var div = divx; 
	var id = idx;
	var class_name = "";
	var controls = controlsx;
	var is_drawn = false;
	var callback = callbackx;
	var obj = objx;
	
	var _controls = null; //// dom _controls + other properties 
	var wrapper_div = null; // dom contining the json rendered
	var num_redrawn = 0;
	
	
	this.into = function(divx){
		div= divx;
		return this;
	}
	
	this.as= function(idx , class_namex){
		id = idx;
		if(class_namex){
			id = idx;
			class_name = class_namex;
		}
		else{
			if(is_string(idx) && idx){
				id = idx;
			}
			else if(is_array(idx)){ // as(["abc","efg hij"]);
				if(idx[0]) id= idx[0];
				class_name = idx[1];
			}
		}
		return this;
	};
	
	this.set_controls = function(ctrls){
		controls = ctrls;
		return this;
	};
	
	this.on_draw =function(cbx){
		if(cbx) callback = cbx;
		if(is_drawn && callback){ // is drawn  and callback is set do callback;
			setTimeout(function(){
				callback(wrapper_div, _controls, obj);
			} , 0);
		}
		return this;
	};
	
	this.redraw = function(new_obj){
			obj = new_obj ? new_obj :  obj;
			wrapper_div.removeChild(wrapper_div.childNodes[0]); // remove the json data holder_node
			wrapper_div.insertBefore( get_json_as_dom(obj), wrapper_div.childNodes[0]);//prepend , atleast one child node
			callback(wrapper_div, _controls, obj);
	};
	
	this.draw = function(objx){
		if(objx){
			obj = objx;
			is_drawn = false;
		}
		if(is_drawn) return;
		
		//create a wrapper div contain both controls and json_rendered
		wrapper_div = document.createElement("div");
		wrapper_div.className="data_holder";
		
		if(id){
			wrapper_div.id = id;
		}
		if(class_name){ // as(["abc","efg hij"]);
			wrapper_div.className += (" "+class_name);
		}

		var a = get_json_as_dom(obj); // this is our obj
		wrapper_div.appendChild(a);
		if(div) // if div is set add into dom
			div.appendChild(wrapper_div);
		
		if(controls && num_redrawn++==0){ // for the first time 
			var temp = render_controls(controls);
			wrapper_div.appendChild(temp[0]);
			_controls = temp[1];
			_controls.redraw_json = this.redraw; // no needed 
		}
		is_drawn = true;
		this.on_draw();
		return wrapper_div;
	};
	return this;
}



function render_json(div , id, obj, controls , callback){
	var div_map = {};
	var wrapper_div = document.createElement("div");
	wrapper_div.className="data_holder";
	if(is_string(id)){
		if(id) wrapper_div.id = id;
	}
	else if(is_array(id)){
		if(id[0]) wrapper_div.id = id[0];
		wrapper_div.className += id[1];
	}

	var a = get_json_as_dom(obj);
	wrapper_div.appendChild(a);
	if(div)
		div.appendChild(wrapper_div);
	
	var _controls=null;
	if(controls){
		var temp = render_controls(controls);
		wrapper_div.appendChild(temp[0]);
		_controls = temp[1];
		_controls.redraw_json = function(new_obj){
			new_obj = new_obj ? new_obj :  obj;
			wrapper_div.removeChild(wrapper_div.childNodes[0]);
			wrapper_div.insertBefore( get_json_as_dom(new_obj), wrapper_div.childNodes[0]);
			callback(wrapper_div, _controls, obj);
		};
	
	}
	if(callback){
		setTimeout(function(){
			callback(wrapper_div, _controls, obj);
		} , 0);
	}
	//add controls div
	return wrapper_div;
};