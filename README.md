#Render_Json is a javascript to render your json directly without templates or basically zero html rendering.
I feel the application first and, style the second , this is same with the user/customer , user uses and application because it does something for him and not because it has something to look. For a single/hobby developer who wants to deliver a web/mobile app it becomes very difficult to plan the design , write server , render html , write css, write js. With increasing adventure of endpoint models/JSON APIs and javascript, it becomes tedious to maintain the js , css and html. With RenderJson , the plan to give a structure to a project , and super-rapid application deployment by giving ui a pattern and auto rending your json just as hot as it came from the server.

#Plan 
1. Render_Json renders a block of html and controls when supplied with a json data. By controls we mean , text input , buttons.  
2. Each node rendered by Render_Json will have a class and an unique id , that is identified by a easy naming convention.
  	 Id is equal to ,  indexes  joined by a '__'(double underscore) to arrive at that data in that Object.
	 while className of these DOM nodes has more stuff that you can use.
	.key => indicates key of the json rendered inside dom node. 
	.vals => this enclosing dom is array rendered inside it.
	.val => indicates the value rendered inside it like string , number ,boolean.
	.block => encloses a single key , value pair of a object rendered inside it.
	.controls = > controls node.
	 Apart from these the current key (spaces removed from the key and replaced by '_') is also added as a class to the dom node. Have a look at the rendered json in index.html webapp in firebug to understand.

3. You can template your json too ,  Dividing ui into templates by horizontal and vertical splits , like most of newspapers. 

            rj_h => horizontal blocks as arguments
            rj_v => vertical blocks as arguments
            example:
            rj_v(rj_h("date", "playground","game_mode") , rj_h("description","groups"), rj_h("price","duration","level"));
            will create a 3 vertical blocks , inside each are horizontal blocks..
            You will have to set this template to render json or some block of json, by calling 
            
            .set_template(template ,  [key_set1]).set_template(template ,  [key_set1]); 
            
            In key_set , you can pass '*' to match any index;
            
4. Get data from server as json , then call
            
            Render_Json().as("id","className").into(DOM_NODE).set_controls(<controls-here>).set_template(<template-rj_h-rj-v> , [<index-array-to-use-the-template-for>]).on_draw(function (dom, controls){ <process-add-listeners> }).draw(json_obj); 
				
5. Draws the json into the dom if into() is set else draw(obj) will return the dom node you can add manually to a dom node.
6. In the 'on_draw' callback process your stuff , add more classes to dom nodes , bind events etc basically all that you data 	has to say and interact with.
7. Adjust your css to suit your style  at the end using the naming conventions. 

##More Info
1. Call redraw(new_obj) or just redraw() to reflect the data changes after the data is modified.
2. The data is also bound to the dom nodes as 'obj' and 'l_keys' .i.e obj is the actual part of json data that is rendered into it. l_keys gives the indexes to reach that node from the top level of the object ,

		 Example: ['names',0] => UserObj['names'][0]
		 		 
which you can use to set / change the data.

The project is a sample pattern that helped me do a rapid development. Hence sharing it as a git project , that might help fellow individual developers.

#####Currently:[do not use in critical apps]
#####Second commit: added templating.
#####Initial Commit - Idea publish.
