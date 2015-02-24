/*
 * Author : Abhinav
 * Purpose : Temporary utils.
 * Date : sometime in nov 14
 */
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var hasOwnProperty = Object.prototype.hasOwnProperty;



function is_empty(obj) {

	    // null and undefined are "empty"
	    if (obj == null) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }

	    return true;
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

function is_img(obj){
	if( Object.prototype.toString.call( obj ) === '[object String]' ) {
		return obj.endsWith(".png") || obj.endsWith(".jpg");
	}
	return false;
}

function is_link(obj){
	if( Object.prototype.toString.call( obj ) === '[object String]' ) {
		return obj.indexOf("http://")==0 || obj.indexOf("./") || obj.indexOf("/") ;
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

function create_option(value, text, type){
	var option = document.createElement("option");
    option.value = value;
    option.text = text;
    if(type)
    	option.type = type;
    return option;
}
function create_radio(name, value , text, checked, cb) {
	var radioInput = document.createElement('input');
	radioInput.setAttribute('type', 'radio');
	radioInput.setAttribute('name', name);
	radioInput.setAttribute('value', value);
	
	if(checked)
		radioInput.setAttribute("checked","checked");
	var radioFragment = document.createElement('div');
    radioFragment.appendChild(radioInput);
    radioFragment.appendChild(create_span(null, null, text));
    if(cb)
	    radioInput.onchange = function(){
	    						cb(radioInput);
	    					};
    return radioFragment;
}

function create_input(id, className, placeholder, type){
	var inp = document.createElement("input");
	if(id)
		inp.id =id;
	if(className)
		inp.className = className;
	if(placeholder)
		inp.setAttribute("placeholder",placeholder);
	if(type)
		inp.setAttribute("type",type);
	return inp;
};

function create_checkbox(value , text, checked, cb) {
	var checkbox_inp = document.createElement('input');
	checkbox_inp.type = 'checkbox';
	checkbox_inp.name = text;
	checkbox_inp.value = value;
	
	var radioFragment = document.createElement('div');
	radioFragment.appendChild(checkbox_inp);
	var label = create_span(null, "checkbox_label", text);
    radioFragment.appendChild(label);
    radioFragment.set_label = function(txt){
    	label.innerHTML = txt;
    	checkbox_inp.name1 = txt;
	};
    
    if(cb)
	    radioFragment.onclick = function(){
			checkbox_inp.checked = !checkbox_inp.checked;
    		cb(value, checkbox_inp);
		};
    radioFragment.checkbox = checkbox_inp;
    return radioFragment;
}

function create_checkbox_options(id, className, options , cb){
	var div = document.createElement("div");
	if(div)
		div.id =id;
	if(className)
		div.className = className;
	
	var i;
	var checkbox_div_set = [];
	var cb2 = function(val){
		cb(val, checkbox_div_set);
	};
	
	for(i in options){
		var checkbox_div = create_checkbox(options[i][0], options[i][1], false, cb2);
		div.appendChild(checkbox_div);
		checkbox_div_set.push(checkbox_div);
	}
	div.cb = cb2;
	div.checkbox_divs = checkbox_div_set;
	return div;
}


function create_textarea(id, className, placeholder, text){
	var inp = document.createElement("textarea");
	if(id)
		inp.id =id;
	if(className)
		inp.className = className;
	if(placeholder)
		inp.setAttribute("placeholder",placeholder);
//	inp.setText(text);
	return inp;
};

function create_select_options(id, class_name, options, cb){
	var select = document.createElement("select");
	var i;
	for(i in options){
		select.appendChild(create_option(options[i][0] , options[i][1]));// value // text
	}
	
    select.onchange = function(){
		if(cb)
			cb(select.value, select);
	};
	return select;

}
function create_radio_group(id, className , name, options , cb){
	var radio_group = document.createElement("div");
	if(id)
		radio_group.id =id;
	if(className)
		radio_group.className = className;
	
	var i;
	for(i in options){
		radio_group.appendChild(create_radio(name , options[i][0], options[i][1], false, cb));// value // text
	}
	radio_group.cb = cb;
	return radio_group;
}

function create_table(id, className, column_names){
	var table  = document.createElement("table");
	table.setAttribute("id",id);
	table.className+=className;
	if(column_names){
		var i;
		var row = document.createElement("tr");
		table.appendChild(row);
		for(i in column_names){
			var th = document.createElement("th");
			th.innerHTML = column_names[i];
			row.appendChild(th);
		}
	}
	return table;
}

function create_row(){
	var row =document.createElement("tr");
	var args = Array.prototype.slice.call(arguments);
	var i;
	for(i in args){
		var td = document.createElement("td");
		if(!args[i])
			continue;	
		if(is_string(args[i])){
			td.innerHTML = args[i];
		}
		else if(args[i]){
			td.appendChild(args[i]);
		}
		row.appendChild(td);
	}
	return row;
};

function create_img(id, class_name ,src, width, height, px){
	var ret =document.createElement("img");
	ret.className = class_name;
	if(!px)
		px = "px";
	if(id)
		ret.id = id;
	if(src)
		ret.src = src;
	if(width)
		ret.style.width = width+px;
	if(height)
		ret.style.height = height+px;
	
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
	if(class_name)
		ret.className = class_name;
	if(id) ret.id = id;
	if(html){
		ret.appendChild(document.createTextNode(html));
	}
	return ret;
}
function create_button(id, class_name, html){
	var ret =document.createElement("button");
	if(class_name)
		ret.className = class_name;
	if(id) 
		ret.id = id;
	if(html && (is_string(html) || is_number(html))){
		ret.appendChild(document.createTextNode(html));
	}
	else if(html){
		ret.appendChild(html); //dom element
	}
	return ret;
}

function create_link(id , class_name , html , link_href){
	var ret =document.createElement("a");
	ret.className = class_name;
	if(id) ret.id = id;
	if(html){
		ret.appendChild(document.createTextNode(html));
	}
	ret.setAttribute("href",link_href);
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
			case "select":
				var select = create_select_options(null, null , val.options);
				x[key] = select;
				ret.appendChild(select);
				break;
			case "radio":
				// "abc":{name:"cfg",options:["a","b","c"]}
				var radio_group = create_radio_group(val.name, val.options, val.cb);
				ret.appendChild(radioGroup);
				x[key] = radio_group;
				break;
			
		}
	}
	return [ret , x];
};

function reset_val(obj , key_set , val , cb){
	
};

function insert_val(obj , key_set , val, cb){
	
};


function merge_map(obj1, obj2) {
	 if(!obj2) return;
	  for (var p in obj2) {
	    try {
	      // Property in destination object set; update its value.
	      if ( obj2[p].constructor==Object ) {
	        obj1[p] = merge_map(obj1[p], obj2[p]);

	      } else {
	        obj1[p] = obj2[p];

	      }

	    } catch(e) {
	      // Property in destination object not set; create it and set its value.
	      obj1[p] = obj2[p];

	    }
	  }
	  return obj1;
}



function rj_ht(){
	var args = Array.prototype.slice.call(arguments);
    var table = document.createElement('table');
	table.className+="ht_blocks_container ";
    table.style.width = "100%";
	var id_map = {};
	table.getElementByKey = function(id){
		 return id_map[id];
	};
	table.id_map = id_map;
	var row=document.createElement("tr");
	table.appendChild(row);
	 for (var i=0; i < args.length; i++){
		 var a= document.createElement('td');
		 if(is_string(args[i])){
			 a.id= args[i]+"_t_block";
			 id_map[args[i]] = a;
			 a.className= args[i]+"_ht_block ht_block ";
			 a.style.height ="100%";
		 }
		 else{// some dom node itself
			 var new_node = args[i];
			 a.appendChild(new_node);
			 merge_map(table.id_map, new_node.id_map);
		 }
		 row.appendChild(a);
	};
	table.as = function(id,class_name){
		if(id)
			table.id = id;
		if(class_name)
			table.className+=(" "+class_name);
		return table;
	}

	 return table;
}

function rj_vt(){
	var args = Array.prototype.slice.call(arguments);
	var table = document.createElement('table');
	 table.className+="vt_blocks_container ";
	 table.style.width="100%";
	 var id_map = {};
	 table.getElementByKey = function(id){
		 return id_map[id];
	 };
	 table.id_map = id_map;
	 for (var i=0; i < args.length; i++) {
		 var row=document.createElement("tr");
		 table.appendChild(row);
		 var a= document.createElement('td');
		 row.appendChild(a);
		 if(is_string(args[i])){
			 a.id= args[i]+"_block";
			 id_map[args[i]] = a;
			 a.className= args[i]+"_vt_block vt_block";
			 a.style.width ="100%";
		 }
		 else{// some dom node itself
			 var new_node = args[i];//table 
			 a.appendChild(new_node);//append to cell
			 merge_map(table.id_map, new_node.id_map);
		 }
	 }
     table.as = function(id,class_name){
			if(id)
				table.id = id;
			if(class_name)
				table.className+=(" "+class_name);
			return table;
		}

	 return table;
};

function rj_h(){
	 var temp = function(args){
		 var div = document.createElement('div');
		 div.className+="h_blocks_container ";
		 div.style.width="100%";
		 var id_map = {};
		 div.getElementByKey = function(id){
			 return id_map[id];
		 };
		 div.id_map = id_map;
		 for (var i=0; i < args.length; i++) {
			 if(is_string(args[i])){
				 var a= document.createElement('div');
				 a.id= args[i]+"_block";
				 id_map[args[i]] = a;
				 a.className= args[i]+"_h_block h_block ";
				 a.style.height ="100%";
				 a.style.cssFloat = "left";
				 div.appendChild(a);
			 }
			 else{// some dom node itself
				 var new_node = args[i].cloneIt();
				 new_node.style.cssFloat = "left";
				 new_node.style.height ="100%";
				 new_node.style.width = '';
				 div.appendChild(new_node);
				 merge_map(div.id_map, new_node.id_map);
			 }
		 }
		 return div;
	};
	var args = Array.prototype.slice.call(arguments);
	var div = temp(args);
	div.cloneIt = function(){
		var ret = temp(args);
		ret.cloneIt = div.cloneIt;
		ret.id = div.id;
		ret.className = div.className;
		return ret;
	};
	div.as = function(id,class_name){
		if(id)
			div.id = id;
		if(class_name)
			div.className+=(" "+class_name);
		return div;
	}
	return div;
	
}

function rj_v(){	
	var temp = function(args){
		var div = document.createElement('div');
		 div.className+="v_blocks_container ";
		 div.style.width="100%";
		 var id_map = {};
		 div.getElementByKey = function(id){
			 return id_map[id];
		 };
		 div.id_map = id_map;
		 for (var i=0; i < args.length; i++) {
			 if(is_string(args[i])){
				 var a= document.createElement('div');
				 a.id= args[i]+"_block";
				 id_map[args[i]] = a;
				 a.className= args[i]+"_v_block v_block";
				 a.style.width ="100%";
				 div.appendChild(a);
			 }
			 else{// some dom node itself
				 var new_node = args[i].cloneIt();
				 new_node.height='';
				 new_node.width="100%";
				 div.appendChild(new_node);
				 merge_map(div.id_map, new_node.id_map);
			 }
		 }
		 return div;
	};
	var args = (Array.prototype.slice.call(arguments)).slice();
	var div = temp(args);
	div.cloneIt = function(){
		var ret = temp(args);
		ret.cloneIt = div.cloneIt;
		ret.id = div.id;
		ret.className = div.className;
		return ret;
	};
	div.as = function(id,class_name){
		if(id)
			div.id = id;
		if(class_name)
			div.className+=(" "+class_name);
		return div;
	}
	return div;
}

function rj_match(a,b){
	if(a.match(b))
		return true;
	return false;
}

function Render_json(divx , idx, objx, controlsx , callbackx){
	var div = divx; 
	var id = idx;
	var class_name = "";
	var controls = controlsx;
	var is_drawn = false;
	var callback = callbackx;
	var template = {};
	var obj = objx;
	
	var _controls = null; //// dom _controls + other properties 
	var wrapper_div = null; // dom contining the json rendered
	var num_redrawn = 0;
	var tabular_data_keyset = {};
	
	function probe_data_type(value){
		if(is_string(value)){
			
		}
	}
	
	
	function get_matched_template(unique_key){
		for(var i in template){
			if((unique_key=="" && i=="") || (i!="" && rj_match(unique_key, i))){
				return template[i].cloneIt();
			}
		}
		return null;
	}
	
	function render_obj__rj(obj , l_keys){
		//		if(!main_obj) main_obj = obj;
	    var ret=create_text_node();
	    if(isinstance(obj,'Object')){
	    	var div_id = as_unique_key(l_keys);
	    	//check for template
	    	// ooh yeah , then ret template , and add vall values into appropriate ids in that template
	    	var template_to_render = get_matched_template(div_id);
	    	if(template_to_render){
	    		ret = template_to_render;
	    		ret.className+= get_as_class_name(l_keys)+" obj";
	    	}
	    	else{
	    		ret = create_div(div_id ,  get_as_class_name(l_keys)+" obj");
	    	}
	        for(var i in obj){
	        	if( str(i).endsWith("__rj") || str(i).endsWith("_id") || isEmpty(obj[i]) ){
	                continue;	
	            }
	            l_keys.push(i);
	            var u_key = as_unique_key(l_keys);
	            if(!template_to_render){
	            	var A =create_div(u_key+"_block" , get_as_class_name(l_keys)+' block');
		        	ret.appendChild(A);
		        	if(!is_img(i) &&  !is_link(i)){
			        	var B =  create_div(u_key+'_key' , 'key '+get_as_class_name(l_keys)+'_key' , key_as_str(i));
			        	A.appendChild(B);
		        	}
		        	else if(is_link(i)){ // should render a link ?
		        		A.appendChild(create_link(u_key+'_key' , 'link '+get_as_class_name(l_keys)+'_key' , key_as_str(i),obj[i]));
		        	}
		        	else{ // could be image
		        		A.appendChild(render_obj__rj(obj[i],l_keys));
		        	}
	            }
	            else if(ret.getElementByKey(i)){
	            	var temp = ret.getElementByKey(i);
//	            	temp.appendChild(create_div(u_key+'_key' , 'key '+get_as_class_name(l_keys)+'_key' , key_as_str(i)));
		        	temp.appendChild(render_obj__rj(obj[i],l_keys)); //will render into that thing
	            }
	            else{
	            	//unrendered obj
	            }
	            l_keys.pop();
	        }
	    }
	    else if(isinstance(obj,'Array')){
	    	var div_id = as_unique_key(l_keys);
	    	//check for template
	    	// ooh yeah , then ret template , and add vall values into appropriate ids in that template
	    	var template_to_render = get_matched_template(div_id);
	    	if(template_to_render){
	    		ret = template_to_render;
	    	}
	    	else{
	    		ret = create_div(as_unique_key(l_keys), "vals "+get_as_class_name(l_keys)+' vals');
	    	}
	    	for(var count=0;count<obj.length;count++){
	            l_keys.push(count);
	            var i = obj[count]; 
	            var u_key = as_unique_key(l_keys);
	            if(!template_to_render || ret.getElementByKey(i)){
	            	ret.appendChild(render_obj__rj(i, l_keys));
	            }
	            else{
	             	ret.getElementByKey(i).appendChild(render_obj__rj(obj[i],l_keys)); //will render into that thing
	            }
	            l_keys.pop();
	        }
	    }
	    else if(isinstance(obj, 'Number')){
	    	ret=create_div( as_unique_key(l_keys) , 'val '+get_as_class_name(l_keys), str(obj)+" ");
	    }
	    else if(isinstance(obj, 'String')){
//	        # is img , is link , ext
	        if(is_img(obj)){
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
	};//render obj end

	function get_json_as_dom(obj){
		var a = null;
		if(is_string(obj))
			a = create_div(obj , " block" , obj);
		else
			a = render_obj__rj(obj, []);
		return a;
	};
	
	this.set_template =function(templatex , key_pattern){
		if(!key_pattern){
			key_pattern=[];
		}
		for(var i=0;i<key_pattern.length;i++){
			if(key_pattern[i]=="*"){
				key_pattern[i]="((?!__).)*";
			}
		}
		template["^"+as_unique_key(key_pattern)+"$"] = templatex;
		return this;
	};
	
	this.set_tables = function(l_keys){
		tabular_data_keyset[as_unique_key(l_keys)]= true;
	};
	
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
			var controls_template_div = get_matched_template("__controls__");
			if(controls_template_div){
				controls_template_div.appendChild(temp[0]);
			}
			else{
				wrapper_div.appendChild(temp[0]);
			}
			_controls = temp[1];
			_controls.redraw_json = this.redraw; // no needed 
		}
		is_drawn = true;
		this.on_draw();
		return wrapper_div;
	};
	return this;
};