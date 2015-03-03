// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function init_resize() {

	if ( aantal_images > 1 ) {
		show_page_buttons();
	}

	window_width	= parseInt( window.innerWidth	 || document.body.clientWidth );
	window_height = parseInt( window.innerHeight || document.body.clientHeight );

	min_image_height = min_image_height || 10;
	min_image_width	 = min_image_width	|| 10;

	min_selection_height = 100; // min_selection_height || 10;
	max_selection_height = 1000; // max_selection_height || window_height - 10;
	min_selection_width	 = 100; // min_selection_width	|| 10;
	max_selection_width	 = 1000; // max_selection_width	|| window_width - 10;

  min_image_width        = 10; // parseInt( min_image_width );
  min_image_height       = 10; // parseInt( min_image_height );
	max_selection_width    = 1000; // parseInt( max_selection_width );
	max_selection_height   = 1000; // parseInt( max_selection_height );
	min_selection_width    = 10; // parseInt( min_selection_width );
	min_selection_height   = 10; // parseInt( min_selection_height );

  last_zoom              = parseInt( last_zoom * 1000 );
	last_selection_top		 = parseInt( last_selection_top );
	last_selection_left		 = parseInt( last_selection_left );
	last_selection_width	 = parseInt( last_selection_width );
	last_selection_height	 = parseInt( last_selection_height );

  allow_smaller_image_then_selection = parseInt( allow_smaller_image_then_selection );

	unzoomed_image_width	= parseInt( document.getElementById('image').offsetWidth );
	unzoomed_image_height = parseInt( document.getElementById('image').offsetHeight );

	// het is een vers image als er geen last_zoom is....
	var is_fresh_new_image = 0; 
	if ( ! last_zoom ) {
		is_fresh_new_image = 1; 
	}

  if ( last_zoom ) start_zoom = Math.round((last_zoom / 1000)*1000)/1000;
  if ( ! isNaN(last_selection_top)  ) start_selection_top		 = last_selection_top;
	if ( ! isNaN(last_selection_left)  ) start_selection_left	   = last_selection_left;
	if ( ! isNaN(last_selection_width)  ) start_selection_width	 = last_selection_width;
	if ( ! isNaN(last_selection_height)  ) start_selection_height  = last_selection_height;

  if ( is_fresh_new_image  ) {
    if ( unzoomed_image_width > 600 || unzoomed_image_height > 600 ) {
    	start_zoom = Math.round(Math.min( ( 600 / unzoomed_image_width ), ( 600 / unzoomed_image_height ) )*1000)/1000;
    } else {
			if ( unzoomed_image_width < 100 || unzoomed_image_height < 100 ) {
				start_zoom = Math.round(Math.min( ( 200 / unzoomed_image_width ), ( 200 / unzoomed_image_height ) )*1000)/1000;
			} else {
				start_zoom = 1
			}
    }
  }
	current_zoom = start_zoom;

	restore_settings();

	start_image_width	 = current_image_width;
	start_image_height = current_image_height;

	
	if ( is_fresh_new_image ) {
		start_selection_height = Math.round(0.8 * start_image_height);
		start_selection_width =  Math.round(0.8 * start_image_width);
		start_selection_top =  Math.round(0.1 * start_image_height);
		start_selection_left =  Math.round(0.1 * start_image_width);
	}

	if ( start_selection_height < min_selection_height ) {
		start_selection_height = min_selection_height;
	}
	if ( start_selection_width < min_selection_width ) {
		start_selection_width = min_selection_width;
	}
	if ( start_selection_height > max_selection_height ) {
		start_selection_height = max_selection_height;
	}
	if ( start_selection_width > max_selection_width ) {
		start_selection_width = max_selection_width;
	}

	if ( ! allow_smaller_image_then_selection && start_selection_height > start_image_height ) {
		start_selection_height = start_image_height;
	}
	if ( ! allow_smaller_image_then_selection && start_selection_width > start_image_width ) {
		start_selection_width = start_image_width;
	}

	document.getElementById('image_div').dragable = 'yes';
	document.getElementById('image_div').init_drag_extrafunction = init_drag_selection;
	document.getElementById('image_div').do_drag = do_drag_selection;
	document.getElementById('image_div').end_drag_extrafunction = end_drag_selection;
	document.getElementById('image_div').style.visibility = 'visible';
  document.getElementById('image').style.visibility = 'visible';
  document.getElementById('image').style.cursor = 'move';

	restore_settings();

	document.getElementById('border_top').dragable = 'yes';
	document.getElementById('border_top').init_drag_extrafunction = init_drag_border_top;
	document.getElementById('border_top').do_drag = do_drag_border_top;
	document.getElementById('border_top').end_drag_extrafunction = end_drag_border;
	document.getElementById('border_top').style.visibility = 'visible';

	document.getElementById('mask_top').style.visibility = 'visible';

	document.getElementById('arrows_top').dragable = 'yes';
	document.getElementById('arrows_top').init_drag_extrafunction = init_drag_border_top;
	document.getElementById('arrows_top').do_drag = do_drag_border_top;
	document.getElementById('arrows_top').end_drag_extrafunction = end_drag_border;
	document.getElementById('arrows_top').style.visibility = 'visible';

	document.getElementById('border_bottom').dragable = 'yes';
	document.getElementById('border_bottom').init_drag_extrafunction = init_drag_border_bottom;
	document.getElementById('border_bottom').do_drag = do_drag_border_bottom;
	document.getElementById('border_bottom').style.visibility = 'visible';

	document.getElementById('mask_bottom').style.visibility = 'visible';

	document.getElementById('arrows_bottom').style.visibility = 'visible';
	document.getElementById('arrows_bottom').dragable = 'yes';
	document.getElementById('arrows_bottom').init_drag_extrafunction = init_drag_border_bottom;
	document.getElementById('arrows_bottom').do_drag = do_drag_border_bottom;
	document.getElementById('arrows_bottom').style.visibility = 'visible';

	document.getElementById('border_right').dragable = 'yes';
	document.getElementById('border_right').init_drag_extrafunction = init_drag_border_right;
	document.getElementById('border_right').do_drag = do_drag_border_right;
	document.getElementById('border_right').end_drag_extrafunction = end_drag_border;
	document.getElementById('border_right').style.visibility = 'visible';

	document.getElementById('mask_right').style.visibility = 'visible';

	document.getElementById('arrows_right').style.visibility = 'visible';
	document.getElementById('arrows_right').init_drag_extrafunction = init_drag_border_right;
	document.getElementById('arrows_right').do_drag = do_drag_border_right;
	document.getElementById('arrows_right').end_drag_extrafunction = end_drag_border;
	document.getElementById('arrows_right').style.visibility = 'visible';

	document.getElementById('border_left').dragable = 'yes';
	document.getElementById('border_left').init_drag_extrafunction = init_drag_border_left;
	document.getElementById('border_left').do_drag = do_drag_border_left;
	document.getElementById('border_left').end_drag_extrafunction = end_drag_border;
	document.getElementById('border_left').style.visibility = 'visible';

	document.getElementById('mask_left').style.visibility = 'visible';

	document.getElementById('arrows_left').style.visibility = 'visible';
	document.getElementById('arrows_left').init_drag_extrafunction = init_drag_border_left;
	document.getElementById('arrows_left').do_drag = do_drag_border_left;
	document.getElementById('arrows_left').end_drag_extrafunction = end_drag_border;
	document.getElementById('arrows_left').style.visibility = 'visible';

  document.getElementById('image_div').ontouchstart = handle_touchstart;
  document.getElementById('image_div').onmousedown  = handle_mousedown;

}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function show_page_buttons() {
	document.getElementById('page_buttons').style.display = 'block';
}
		
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function next_page() {
	document.getElementById('page_no').value++;
	if ( document.getElementById('page_no').value > aantal_images ) {
		document.getElementById('page_no').value = aantal_images;
	}
	do_submit();
}
	
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function previous_page() {
	document.getElementById('page_no').value--;
	if ( document.getElementById('page_no').value < 1 ) {
		document.getElementById('page_no').value = 1;
	}
	do_submit();
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function select_page() {
	var new_page = prompt('Enter page number to use ',document.getElementById('page_no').value);
	if( new_page && new_page >= 1 && new_page <= aantal_images ) {
		document.getElementById('page_no').value = new_page;
		do_submit();
	}	
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ignore_mouse_down(e) {

  e = (e) ? e : window.event;
  var target = e.target || e.srcElement;
  
 	// safari wil blijkbaar een true hebben voordat hij de click wil verder verwerken.

	return false;


}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function redraw_image() {
  document.getElementById('image').style.width  = document.getElementById('image_div').style.width  = current_image_width  + 'px';
  document.getElementById('image').style.height = document.getElementById('image_div').style.height = current_image_height + 'px';
  document.getElementById('image').style.top    = document.getElementById('image_div').style.top    = current_image_top    + 'px';
  document.getElementById('image').style.left   = document.getElementById('image_div').style.left   = current_image_left   + 'px';
  
  redraw_selection();
}

function redraw_selection() {

  base_top  = parseInt( document.getElementById('image').offsetTop  );
  base_left = parseInt( document.getElementById('image').offsetLeft );

	document.getElementById('mask_top').style.top			 = base_top  + current_image_top		+ 'px';
	document.getElementById('mask_top').style.left		 = base_left + current_image_left		+ 'px';
	document.getElementById('mask_top').style.width		 = current_image_width	+ 'px';
	new_height = current_selection_top - 4 > current_image_top ? current_selection_top - current_image_top - 4 : 0;
	document.getElementById('mask_top').style.height	 = new_height + 'px';
  if ( new_height <= 16 ) {
  	document.getElementById('mask_top').style.top		 = base_top  + current_image_top - ( 16 - new_height ) + 'px';
    new_height = 16; // gefixte png's in IE zijn minstens 16px hoog - teken de mask dan maar boven het plaatje
  }
	document.getElementById('mask_top_image').style.height	 = new_height + 'px'; // deze moet extra omdat hij door IE6 niet goed wordt geupdate

	document.getElementById('border_top').style.top		 = base_top	 + ( current_selection_top - 4 ) + 'px';
	document.getElementById('border_top').style.left	 = base_left + current_selection_left + 'px';
	document.getElementById('border_top').style.width	 = current_selection_width	+ 'px';
	
	document.getElementById('arrows_top').style.top	   = base_top	 + current_selection_top - 24	+ 'px';
	document.getElementById('arrows_top').style.left	 = base_left + current_selection_left + Math.round( ( current_selection_width ) / 2 - 12 )	+ 'px';
	
	document.getElementById('mask_right').style.top		 = base_top	 + ( current_selection_top - 4 ) + 'px';
	document.getElementById('mask_right').style.left	 = base_left + ( current_selection_left + current_selection_width + 4 ) + 'px';
	new_width = current_image_width - ( current_selection_width + ( current_selection_left - current_image_left ) ) - 4;
	new_width = new_width > 0 ? new_width : 0;
	document.getElementById('mask_right').style.width	 = new_width + 'px';
  new_height = ( new_width == 0 ? 0 : current_selection_height + 8 ); // rare constuctie wegens bug in safari/konqueror
	document.getElementById('mask_right').style.height = new_height + 'px';
	document.getElementById('mask_right_image').style.height = new_height + 'px'; // deze moet extra omdat hij door IE6 niet goed wordt geupdate

	document.getElementById('border_right').style.top		 = base_top	+ ( current_selection_top - 4 ) + 'px';
	document.getElementById('border_right').style.left	 = base_left + ( current_selection_left + current_selection_width ) + 'px';
  new_height = ( current_selection_height + 8 );
	document.getElementById('border_right').style.height = new_height + 'px';
	document.getElementById('border_right_image').style.height = new_height + 'px'; // deze moet extra omdat hij door IE6 niet goed wordt geupdate
 
	document.getElementById('arrows_right').style.top	   = base_top	 + current_selection_top + Math.round( ( current_selection_height ) / 2 - 12 )	+ 'px';
	document.getElementById('arrows_right').style.left	 = base_left  + current_selection_left + current_selection_width - 20	+ 'px';

	document.getElementById('mask_bottom').style.top			= base_top	+ ( current_selection_top + current_selection_height + 4 ) + 'px';
	document.getElementById('mask_bottom').style.left			= base_left + current_image_left	 + 'px';
	document.getElementById('mask_bottom').style.width		= current_image_width	 + 'px';
	new_height = current_image_top + current_image_height - ( current_selection_top + current_selection_height ) - 4;
	new_height = new_height > 0 ? new_height : 0;
	document.getElementById('mask_bottom').style.height		= new_height + 'px';
	document.getElementById('mask_bottom_image').style.height		= new_height + 'px'; // deze moet extra omdat hij door IE6 niet goed wordt geupdate

	document.getElementById('border_bottom').style.top		= base_top	+ ( current_selection_top + current_selection_height ) + 'px';
	document.getElementById('border_bottom').style.left		= base_left + current_selection_left + 'px';
	document.getElementById('border_bottom').style.width	= current_selection_width	 + 'px';
	
	document.getElementById('arrows_bottom').style.top	  = base_top	 + current_selection_top + current_selection_height - 20	+ 'px';
	document.getElementById('arrows_bottom').style.left	  = base_left + current_selection_left + Math.round( ( current_selection_width ) / 2 - 12 )	+ 'px';

	document.getElementById('mask_left').style.top		= base_top	+ ( current_selection_top - 4 ) + 'px';
	document.getElementById('mask_left').style.left		= base_left + current_image_left + 'px';
	new_width = current_selection_left - current_image_left - 4;
	new_width = new_width > 0 ? new_width : 0;
	document.getElementById('mask_left').style.width	= new_width + 'px';
  new_height = ( new_width == 0 ? 0 : current_selection_height + 8 ); // rare constuctie wegens bug in safari/konqueror
	document.getElementById('mask_left').style.height = new_height + 'px';
	document.getElementById('mask_left_image').style.height = new_height + 'px'; // deze moet extra omdat hij door IE6 niet goed wordt geupdate

	document.getElementById('border_left').style.top		= base_top	+ ( current_selection_top - 4 ) + 'px';
	document.getElementById('border_left').style.left		= base_left + ( current_selection_left - 4 ) + 'px';
  new_height = current_selection_height + 8;
	document.getElementById('border_left').style.height = new_height + 'px';
	document.getElementById('border_left_image').style.height = new_height + 'px'; // deze moet extra omdat hij door IE6 niet goed wordt geupdate

	document.getElementById('arrows_left').style.top	  = base_top	 + current_selection_top + Math.round( ( current_selection_height ) / 2 - 12 )	+ 'px';
	document.getElementById('arrows_left').style.left	  = base_left  + current_selection_left - 24	+ 'px';

	document.getElementById('show_width').innerHTML  = '<a href="javascript: void do_set_width()" style="color: black; text-decoration: none;">'  + current_selection_width  + '</a>';
	document.getElementById('show_height').innerHTML = '<a href="javascript: void do_set_height()" style="color: black; text-decoration: none;">' + current_selection_height + '</a>';;

}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function restore_settings() {

	current_zoom						 = start_zoom;

	current_image_width			 = Math.round( unzoomed_image_width * current_zoom );
	current_image_height		 = Math.round( unzoomed_image_height * current_zoom );
	current_image_top				 = 0; // start_selection_top  ? current_selection_top - start_selection_top : Math.round( ( window_height - current_image_height ) / 2 );
	current_image_left			 = 0; // start_selection_left ? current_selection_left - start_selection_left : Math.round( ( window_width	 - current_image_width ) / 2 );

	current_selection_width	 = start_selection_width;
	current_selection_height = start_selection_height;
	current_selection_top		 = start_selection_top;
	current_selection_left	 = start_selection_left;

	redraw_image();
	redraw_selection();

}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function increase_zoom() {
  do_zoom( Math.round( (current_zoom * 1.07)*1000)/1000 );
}

function decrease_zoom() {
  do_zoom( Math.round( (current_zoom * .93 )*1000)/1000 );
}

function do_zoom( new_zoom ) {

  new_image_width  = Math.round( unzoomed_image_width * new_zoom );
  new_image_height = Math.round( unzoomed_image_height * new_zoom );

  current_selection_center_top  = Math.round(current_selection_top  + current_selection_height / 2);
  current_selection_center_left = Math.round(current_selection_left + current_selection_width  / 2);

  new_selection_center_top	= current_selection_center_top  * ( new_image_height / current_image_height );
	new_selection_center_left = current_selection_center_left * ( new_image_width  / current_image_width  );

  new_selection_top  = Math.round( new_selection_center_top  - current_selection_height / 2 );
  new_selection_left = Math.round( new_selection_center_left - current_selection_width  / 2 );

  new_selection_width	 = current_selection_width;
	new_selection_height = current_selection_height;

  if ( new_selection_top < 0 ) {
    new_selection_top = 0;
    if ( new_selection_height > current_image_height )
      new_selection_height = current_image_height;
  }

  if ( new_selection_left < 0 ) {
    new_selection_left = 0;
    if ( new_selection_width > current_image_width )
      new_selection_width = current_image_width;
  }

  if ( new_image_width < new_selection_left + new_selection_width ) {
    new_selection_width = new_image_width - new_selection_left
  }

  if ( new_image_height < new_selection_top + new_selection_height ) {
    new_selection_height = new_image_height - new_selection_top
  }

  current_zoom = new_zoom;

  current_selection_top    = new_selection_top;
  current_selection_left   = new_selection_left;
  current_selection_width  = new_selection_width;
  current_selection_height = new_selection_height;
  
  current_image_width  = new_image_width;
  current_image_height = new_image_height;

  redraw_image();

}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function do_rotate() {
	document.getElementById('klaar').value = '0';
	document.getElementById('rotate').value = parseInt( document.getElementById('rotate').value ) + 90;
	document.getElementById('do_rotate').value = '1';
	do_submit();
}

function do_resize() {
	document.getElementById('klaar').value = '1';
	document.getElementById('do_rotate').value = '0';
	do_submit();
}

function do_get_as_type(type) {
	document.getElementById('klaar').value=1; 
	document.getElementById('get_as_type').value= type;

	display_please_wait();	
  document.getElementById('formulier').submit()
 
}


function do_set_width() {
	var new_width = prompt('Enter new width (in pixels)',current_selection_width);
	if( new_width ) {
	
		new_width = parseInt( new_width ) || 0;

		current_selection_center = current_selection_left + ( current_selection_width / 2 );
		new_left = current_selection_center - ( new_width / 2 );

		if ( new_left < 0 ) new_left = 0;

		if ( new_left + new_width > current_image_width ) {
			new_left	= current_image_width - new_width;
			if ( new_left < 0 ) new_left = 0;
			new_width = current_image_width - new_left;
			if ( new_left + new_width > current_image_width ) new_width = current_image_width - new_left;
		}
		
		current_selection_left	= parseInt( new_left );
		current_selection_width = parseInt( new_width );

		redraw_selection();

	}
}

function do_set_height() {
	var new_height = prompt('Enter new height (in pixels)',current_selection_height);
	if( new_height ) {
	
		new_height = parseInt( new_height ) || 0;

		current_selection_center = current_selection_top + ( current_selection_height / 2 );
		new_top = current_selection_center - ( new_height / 2 );

		if ( new_top < 0 ) new_top = 0;

		if ( new_top + new_height > current_image_height ) {
			new_top	 = current_image_height - new_height;
			if ( new_top < 0 ) new_top = 0;
			new_height = current_image_height - new_top;
			if ( new_top + new_height > current_image_height ) new_height = current_image_height - new_top;
		}
		
		current_selection_top	 = parseInt( new_top );
		current_selection_height = parseInt( new_height );

		redraw_selection();

	}
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function display_please_wait() {
	window_width	= parseInt( window.innerWidth	 || document.body.clientWidth );
	window_height = parseInt( window.innerHeight || document.body.clientHeight );
	
	var iebody   = (document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body
	var pagexoffset = document.all ? iebody.scrollLeft : window.pageXOffset;
	var pageyoffset = document.all ? iebody.scrollTop  : window.pageYOffset;
	document.getElementById('pleasewait_layer').style.top    = parseInt( pageyoffset ) + 'px';
	document.getElementById('pleasewait_layer').style.left   = parseInt( pagexoffset ) + 'px';
	document.getElementById('pleasewait_layer').style.width  = window_width + 'px';
	document.getElementById('pleasewait_layer').style.height = window_height + 'px';
	document.getElementById('pleasewait_image').style.width  = '100%';
	document.getElementById('pleasewait_image').style.height = '100%';
	document.getElementById('pleasewait_layer').style.visibility = 'visible';
}


function show_progress_bar( tempfile_id ) {

	var iebody	 = (document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body
	var pagexoffset = document.all ? iebody.scrollLeft : window.pageXOffset;
	var pageyoffset = document.all ? iebody.scrollTop	 : window.pageYOffset;
	document.getElementById('progressbar_layer').style.top		= parseInt( pageyoffset ) + 'px';
	document.getElementById('progressbar_layer').style.left		= parseInt( pagexoffset ) + 'px';
	document.getElementById('progressbar_layer').style.width	= window_width + 'px';
	document.getElementById('progressbar_layer').style.height = window_height + 'px';
	document.getElementById('progressbar_image').style.width	= '100%';
	document.getElementById('progressbar_image').style.height = '100%';
	document.getElementById('progressbar_layer').style.visibility = 'visible';

  var url = '/progress.pl?tempfile_id=' + tempfile_id;
  document.getElementById('progressbar_window').src = url;
//  open( url, 'progressbar', 'width=400,height=200' );
  
}

function upload_finished( original_filename, original_image_type ) {
	document.getElementById('original_filename').value = original_filename;
	document.getElementById('original_image_type').value = original_image_type;
	document.getElementById('zoom').value = 0;
	document.getElementById('rotate').value = 0;
	document.getElementById('selection_top').value = 0;
	document.getElementById('selection_left').value = 0;
	document.getElementById('selection_width').value = 0;
	document.getElementById('selection_height').value = 0;
	document.getElementById('demomode').value = 0;
  document.getElementById('formulier').submit();
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function fill_form_values() {
  document.getElementById('zoom').value             = current_zoom;
  document.getElementById('selection_top').value    = current_selection_top;
  document.getElementById('selection_left').value   = current_selection_left;
  document.getElementById('selection_width').value  = current_selection_width;
  document.getElementById('selection_height').value = current_selection_height;
}

function do_submit() {
  if ( document.getElementById('image').offsetWidth > 7500 || document.getElementById('image').offsetHeight > 7500 ) {
    alert('Your image too large. The maximimum size for images is 7500x7500 pixels.');
    return false;
  }
	display_please_wait();
  fill_form_values();
  document.getElementById('formulier').submit()
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var drag_target;

function init_drag(drag_params) {

  var target = drag_params.target;
  
  if ( target.id.search(/border_top/) != -1 || target.id.search(/mask_top/) != -1 || target.id.search(/arrows_top/) != -1 ) {
    target = document.getElementById('border_top');
    target.direction = 1;
  }
  
  if ( target.id.search(/border_right/) != -1 || target.id.search(/mask_right/) != -1 || target.id.search(/arrows_right/) != -1 ) {
    target = document.getElementById('border_right');
    target.direction = -1;
  }
  
  if ( target.id.search(/border_bottom/) != -1 || target.id.search(/mask_bottom/) != -1 || target.id.search(/arrows_bottom/) != -1 ) {
    target = document.getElementById('border_bottom');
    target.direction = -1;
  }
  
  if ( target.id.search(/border_left/) != -1 || target.id.search(/mask_left/) != -1 || target.id.search(/arrows_left/) != -1 ) {
    target = document.getElementById('border_left');
    target.direction = 1;
  }

  if ( target.id.search(/selection/) != -1 || target.id.search(/image/) != -1 ) {
    target = document.getElementById('image_div');
  }

  if ( typeof(target.dragable) != 'undefined' && target.dragable == 'yes' ) {
		drag_target = target;
		drag_target.lastX		   = drag_params.clientX;
		drag_target.lastY		   = drag_params.clientY;
		drag_target.lastLeft	 = parseInt(drag_target.style.left);
		drag_target.lastTop	   = parseInt(drag_target.style.top);
    if ( drag_params.type == 'mouse' ) {
		  document.onmouseup		 = handle_mouseup;
		  document.onmousemove	 = handle_mousemove;
    } else {
		  document.ontouchend		 = handle_touchend;
		  document.ontouchmove	 = handle_touchmove;
		  document.ontouchcancel = handle_touchcancel;
    }
    if ( target.init_drag_extrafunction ) {
      eval("target.init_drag_extrafunction()");
    }
  }

	// safari wil blijkbaar een true hebben voordat hij de click wil verder verwerken.
	return false;
  
}

function end_drag() {

  drag_extrafunction = null;

  document.onmousemove = null;
  document.onmouseup   = null;
	document.ontouchend		 = null;
	document.ontouchmove	 = null;
	document.ontouchcancel = null;

  if ( drag_target.end_drag_extrafunction ) {
    eval("drag_target.end_drag_extrafunction()");
  }

  drag_target = null;

  return false;
  
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function init_drag_selection() {

  last_selection_top	  = current_selection_top;
	last_selection_left   =	current_selection_left ;
  last_selection_width	= current_selection_width;
	last_selection_height =	current_selection_height;

  document.body.style.cursor = 'move';

}

function do_drag_selection(drag_params) {

  var target = drag_params.target;

  new_selection_top  = last_selection_top  + ( drag_params.clientY - drag_target.lastY + drag_target.lastTop  );
  new_selection_left = last_selection_left + ( drag_params.clientX - drag_target.lastX + drag_target.lastLeft );
  
  if ( new_selection_top < 0 ) {
    new_selection_top = 0;
  }
  if ( new_selection_top + current_selection_height > current_image_height ) {
    new_selection_top  = current_image_height - current_selection_height;
  }
  if ( new_selection_left < 0 ) {
    new_selection_left = 0;
  }
  if ( new_selection_left + current_selection_width > current_image_width ) {
    new_selection_left  = current_image_width - current_selection_width;
  }

  current_selection_top  = new_selection_top;
  current_selection_left = new_selection_left;

  redraw_selection();

  return false;
  
}

function end_drag_selection() {

  document.getElementById('border_top').style.cursor = 's-resize';
  document.getElementById('mask_top').style.cursor = 's-resize';
  document.body.style.cursor = 'default';

}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function init_drag_border_top() {

  last_selection_top = current_selection_top;
  last_selection_height = current_selection_height;

//  document.getElementById('selection_div').style.cursor = 's-resize';
  document.body.style.cursor = 's-resize';

}

function do_drag_border_top(drag_params) {

  var diff = ( drag_params.clientY - drag_target.lastY );

  new_selection_top = last_selection_top + diff;
  new_selection_height = last_selection_height - diff;

  if ( new_selection_top < 0 ) {
    new_selection_top = 0;
    diff = - last_selection_top;
    new_selection_height = last_selection_height - diff;
  }

  if ( new_selection_top > last_selection_top + last_selection_height - 10  ) {
    new_selection_height = 10;
    diff = last_selection_height - new_selection_height;
    new_selection_top = last_selection_top + diff;
  }
  
  current_selection_top = new_selection_top;
  current_selection_height = new_selection_height;

  redraw_selection();
  
  return false;
  
}

function init_drag_border_bottom() {

  last_selection_top = current_selection_top;
  last_selection_height = current_selection_height;

  document.body.style.cursor = 'n-resize';

}

function do_drag_border_bottom(drag_params) {

  var diff = ( drag_params.clientY - drag_target.lastY );

  new_selection_height = last_selection_height + diff;

  if ( last_selection_top + new_selection_height > current_image_height ) {
    new_selection_height = current_image_height - last_selection_top
    diff = last_selection_top + new_selection_height;
  }

  if ( new_selection_height < 10  ) {
    new_selection_height = 10;
    diff = last_selection_top + new_selection_height;
  }
  
  current_selection_height = new_selection_height;

  redraw_selection();
  
  return false;
  
}

function init_drag_border_left() {

  last_selection_left = current_selection_left;
  last_selection_width = current_selection_width;

  document.body.style.cursor = 'e-resize';

}

function do_drag_border_left(drag_params) {

  var diff = ( drag_params.clientX - drag_target.lastX );

  new_selection_left = last_selection_left + diff;
  new_selection_width = last_selection_width - diff;

  if ( new_selection_left < 0 ) {
    new_selection_left = 0;
    diff = - last_selection_left;
    new_selection_width = last_selection_width - diff;
  }

  if ( new_selection_left > last_selection_left + last_selection_width - 10  ) {
    new_selection_width = 10;
    diff = last_selection_width - new_selection_width;
    new_selection_left = last_selection_left + diff;
  }
  
  current_selection_left = new_selection_left;
  current_selection_width = new_selection_width;

  redraw_selection();
  
  return false;
  
}

function init_drag_border_right(e) {

  last_selection_top = current_selection_top;
  last_selection_width = current_selection_width;

  document.body.style.cursor = 'n-resize';

}

function do_drag_border_right(drag_params) {

  var diff = ( drag_params.clientX - drag_target.lastX );

  new_selection_width = last_selection_width + diff;

  if ( current_selection_left + new_selection_width > current_image_width ) {
    new_selection_width = current_image_width - current_selection_left
    diff = current_selection_left + new_selection_width;
  }

  if ( new_selection_width < 10  ) {
    new_selection_width = 10;
    diff = last_selection_top + new_selection_width;
  }
  
  current_selection_width = new_selection_width;

  redraw_selection();
  
  return false;
  
}

function end_drag_border(e) {
  document.body.style.cursor = 'default';
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Mouse events
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function input_event_class () {
  input_event_class.type = 'mouse';
	input_event_class.target = {};
	input_event_class.clientX = new Number;
	input_event_class.clientY = new Number;
}
	

function handle_mousedown(e) {

  e = (e) ? e : window.event;
  var target = e.target || e.srcElement;

  var input_event = new input_event_class;
  input_event.type = 'mouse';
	input_event.target = target;
	input_event.clientX = e.clientX;
	input_event.clientY = e.clientY;

  init_drag(input_event);

	return false;
}

function handle_mousemove(e) {

  e = (e) ? e : window.event;
  var target = e.target || e.srcElement;

  var input_event = new input_event_class;
  input_event.type = 'mouse';
	input_event.target = target;
	input_event.clientX = e.clientX;
	input_event.clientY = e.clientY;

  drag_target.do_drag( input_event );

	return false;

}

function handle_mouseup(e) {

  e = (e) ? e : window.event;
  var target = e.target || e.srcElement;

  var input_event = new input_event_class;
  input_event.type = 'mouse';
	input_event.target = target;
	input_event.clientX = e.clientX;
	input_event.clientY = e.clientY;

  end_drag(input_event);
  
	return false;

}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Touch events
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function handle_touchstart(event) {

	// disable the standard ability to select the touched object
	event.preventDefault();
	// wat is mijn target
 var target = event.target || event.srcElement;

	// get the total number of fingers touching the screen
	var fingerCount = event.touches.length;
	// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
	// check that only one finger was used
	if ( fingerCount == 1 ) {
		// get the coordinates of the touch
		
		var input_event = new input_event_class;
		input_event.type = 'touch';
		input_event.target = target;
		input_event.clientX = event.touches[0].pageX;
		input_event.clientY = event.touches[0].pageY;

		init_drag(input_event);
	} 
	else {
		// more than one finger touched so cancel
		handle_touchcancel(event);
	}

}

function handle_touchmove(event) {

	// disable the standard ability to select the touched object
	event.preventDefault();
	// wat is mijn target
 var target = event.target || event.srcElement;

	// get the total number of fingers touching the screen
	var fingerCount = event.touches.length;
	// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
	// check that only one finger was used
	if ( fingerCount == 1 ) {
		// get the coordinates of the touch
		var input_event = new input_event_class;
		input_event.type = 'touch';
		input_event.target = target;
		input_event.clientX = event.touches[0].pageX;
		input_event.clientY = event.touches[0].pageY;

	  drag_target.do_drag( input_event );

	} 
	else {
		handle_touchcancel(event);
	}

}



function handle_touchcancel(event) {
	// disable the standard ability to select the touched object
	event.preventDefault();

	end_drag();
}

function handle_touchend(event) {
	// disable the standard ability to select the touched object
	event.preventDefault();

	end_drag();

}