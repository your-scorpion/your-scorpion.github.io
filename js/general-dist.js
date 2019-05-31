const now = new Date();
renderjson.set_icons('►', '▼');

let currentJSON,
	currentJSONstring,
	btnText,
	flagWord;






//////////////////////////////////
//////////// GET JSON ////////////
//////////////////////////////////

function getBase(json){
	$(".file-result__name").text(json.name);
	$(".file-result__image").css("background-image", "url(" + json.thumbnailUrl + ")");
	$(".file-result__json").empty();

	document.getElementById("copy-to-clipboard").style.visibility = "visible";
	document.getElementById("save-as-json").style.visibility = "visible";

};

function finalParsePart(json, level){
	console.log("прилетело в функцию");
	renderjson.set_show_to_level(level);

	$(".file-result__json").append(renderjson(json));
	$(".info-screen").css("overflow", "visible");
	document.getElementById('file-result').scrollIntoView({behavior: "smooth", block: "end"});

	currentJSON = json;
	currentJSONstring = JSON.stringify(json);
	console.log(json);


	$(".file-result__loader").css({
		"-webkit-transition": "scaleY(0)",
		"-o-transition": "scaleY(0)",
		"transform": "scaleY(0)"
	});
	$(".btn__accent").text(btnText);
	$(".btn-group").fadeIn(12);
};

async function getThree(figmaApiKey,figmaId) {
	var result = await fetch('https://api.figma.com/v1/files/' + figmaId, {
		method: 'GET',
		headers: {
			'X-Figma-Token': figmaApiKey
		}
	})
	var figmaTreeStructure = await result.json();
	getBase(figmaTreeStructure);

	if (typeof figmaTreeStructure.err !== "undefined"){
		$(".file-result__name").text(figmaTreeStructure.status);
	}

	finalParsePart(figmaTreeStructure, 1);
};






//парсим JSON
document.getElementById("accent").addEventListener("click", function(){
     console.log('test');
     document.getElementById("file-result").visibility = "visible";

	     if (document.getElementById("selected-icon").classList.contains("icon-m_JSON")) {
	     		getThree(document.getElementById("token").value, document.getElementById("file-id").value)

	     		document.getElementById("file-result").visibility = "visible";

			}


		function textChanger () {//добавляем логику текста на кнопку
					var element = document.getElementById('header_check_status');

					if (element.innerHTML.indexOf("Here you will see the result") !== -1) {
						document.getElementById("accent").innerHTML = 'Wait for a sec...';
						document.getElementById("accent").classList.add("theme_btn_wait");

					}
					else {
						document.getElementById("accent").innerHTML = 'Tale a while...';
						document.getElementById("accent").classList.add("theme_btn_wait");
					}
		}
		textChanger();

		setInterval(function () {
		document.getElementById("accent").innerHTML = 'Generate JSON';
		document.getElementById("accent").classList.remove("theme_btn_wait");
		  }, 2300);


});



//////////////////////////////////
///// COPY TO CLIPBOARD FOO //////
//////////////////////////////////

function copyToClipboard(str) {
  function listener(e) { e.clipboardData.setData("text/plain", str);
                         e.preventDefault(); }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
};

$("#copy-to-clipboard").click(function(){
	copyToClipboard(currentJSONstring);
});

//////////////////////////////////
////////// SAVE TO JSON //////////
//////////////////////////////////

function saveJson(obj, name) {
	var str = JSON.stringify(obj);
	var data = encode( str );

	var blob = new Blob( [ data ], {
		type: "application/octet-stream"
	});
	
	var url = URL.createObjectURL( blob );
	var link = document.createElement( "a" );
	link.setAttribute("href", url);
	link.setAttribute("download", now.getUTCDate() + "." + (now.getUTCMonth()+1) + "." + now.getUTCFullYear() + "-" + name + ".json");
	var event = document.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	link.dispatchEvent(event);
};

var encode = function( s ) {
	var out = [];
	for ( var i = 0; i < s.length; i++ ) {
		out[i] = s.charCodeAt(i);
	}
	return new Uint8Array( out );
};

$("#save-as-json").click(function(){
	saveJson(currentJSON, $(".file-result__name").text());
});

