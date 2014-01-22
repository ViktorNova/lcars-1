/* BuchXmlHttp */
/* $Revision: 1.7 $ */

function BuchXmlHttp() {
    // create the request
    function createReq() {
        var request = null;
		/**
		 * Die ActiveX-Bezeichner sind bei 5.x und 6.x/7.x unterschiedlich:
		 **/
		if (window.ActiveXObject) {
			try {
				// MSIE 6.x
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					// MSIE 5.x
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					request = false;
				}
			}
		/**
		 * ... hier ist es einheitlich:
		 */
		} else if (window.XMLHttpRequest) {
			// Safari, KHTML, Mozilla, Opera
			try {
				request = new XMLHttpRequest();
			} catch(e) {
				request = false;
			}
		}

		return (request) ? request : null;
    }
    this.createReq = createReq;

    // opens a request
    function openReq(request, url, callback) {
        request.open("GET", url);
        request.onreadystatechange = callback;
    }
    this.openReq = openReq;

    // send a request
    function sendReq(request) {
        request.send(null);
    }
    this.sendReq = sendReq;
}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

/*
 * typhoon.js
 * $Revision: 1.7 $
 * iso-8859-1
 */
 
addEvent(window, "load", initSuggest);

function getEvent(event) {
    return (window.event) ? window.event : event;
}

function getEventTarget(event) {
    var realEvent = getEvent(event); 
    return (realEvent.target) ? realEvent.target : realEvent.srcElement;
}

/**
 *	@package		Typhoon suggest search
 * 
 *	@author			Freiheit
 *	@version		1.6
 *	@author			Björn Bartels <bb@p-ad.de>
 *	@version		1.6.1
 */
function Suggest(input, conf) {
	
    // for entity conversion
    var entityElement = document.createElement("div");
    
	// title of suggestions
	var masthead = entity("Produkt-Vorschl&auml;ge:");
	// title of term suggestions
	var masttermhead = entity("Suchbegriff-Vorschl&auml;ge:");
	// what to see and what to hide
	var displayShop			=	true;
	var displayTitle		=	true;
	var displayAuthor		=	false;
	var displayPrice		=	false;
	var displayCover		=	false;
	var displaySearchStart	=	true;
	
	// max amount of items to display
	var maxAmount = 6;
    // valid this reference even in subfunctions
    var self = this;
    // the xmlhttprequest
    var req = null;
    // the input label thet the suggest is added onto
    var input = input;
    // the target element where the typhoon table will be appended
	var target = document.getElementById("typhoontarget");
	// the checkbox for turning suggest off
    var checkbox = null;
    // the config object
    var config = conf;
    // the table element for suggestions
    var tableElement = null;
    // selected item
    var selected = -1;
    // all items
    var all = new Array();
    // last answer
    var lastAnswer = null;
    var log = new logger(0);
    var isIE = typeof(window.ActiveXObject) != 'undefined';
    var xmlHttp = new BuchXmlHttp();
    
    // listener functions
	var suggest_loadTableListObserver;
	var suggest_loadTableListEventElement;
	
    var eventHandler = function(event) {

        if (event) {
			suggest_loadTableListEventElement = event;
		}
        var keyCodes = [13, 38, 40];
        if (event) {
        	//if (jQuery.browser.msie) {alert(event.keyCode); }
//if(keyCodes.indexOf(event.keyCode)<0) {
    		//if(keyCodes.indexOf(event.keyCode)<0) {
	        //	if (suggest_loadTableListObserver) { clearTimeout(suggest_loadTableListObserver); }
	        //	suggest_loadTableListObserver = setTimeout(window.suggest.handle, 500);
	        //} else {
	        	window.suggest.handle(event);
	        //}
        }
	};

    var hideSuggestions = function(event) {
        window.suggest.hide();
    };
    var suppressReturn = function(event) {
        var realEvent = (window.event) ? window.event : event; if (realEvent.keyCode == 13) return false;
    };
    var activeSwitcher = function(event) {
        window.suggest.switchActive();
    };
    var submitter = function(event) {
        window.suggest.submit(event);
    };
    // initialize the suggestion layer
    init();
    

    /*
     * wird am Anfang aufgerufen, initialisiert alles
     */
    function init() {
        /* cookie-erkennung erstmal fuer's produktiv-deployment rausgenommen */
        /* wenn ich cookies setzen kann, will ich die Ausblendecheckbox einfuegen 
         * und evtl. gar nicht initialisieren, falls schon der Cookie gesetzt ist.
         */
        /* (testCookiesEnabled()) {
            var cookieVal = readCookie("typhoonActive");
            if (cookieVal == "false") {
                insertDeactivationCB(false);
                // checkbox einf�gen, nicht initialisieren
            } else {
                insertDeactivationCB(true);
                initializeListeners();
                createCookie("typhoonActive", "true", 365);
                // checkbox, init
            }
        } else {
            // nur initialisieren, checkbox nicht einf�gen.
            initializeListeners();
        }*/
        initializeListeners();
    }

    function initializeListeners() {
        input.setAttribute("autocomplete", "off", 0);
        addEvent(input, "keyup", eventHandler);
    	// beim return druecken soll doch bitte nicht das form.submit ausgeloest werden.
        addEvent(input, "keypress", suppressReturn);
        // der versteckt die liste wieder auf mausklick
        addEvent(document.getElementsByTagName("body")[0], "click", hideSuggestions);
    }

    function removeListeners() {
        input.removeAttribute("autocomplete");
        removeEvent(input, "keyup", eventHandler);
    	// beim return druecken soll doch bitte nicht das form.submit ausgeloest werden.
        removeEvent(input, "keypress", suppressReturn);
    	//input.onkeypress = function(event) { var realEvent = (window.event) ? window.event : event; if (realEvent.keyCode == 13) return false };
        // der versteckt die liste wieder auf mausklick
        removeEvent(document.getElementsByTagName("body")[0], "click", hideSuggestions);
    }

    function insertDeactivationCB(checked) {
        checkbox = createCheckbox(checked);
        var container = document.createElement("div");
		container.className = "deactivation_cb";
        container.appendChild(checkbox);
        container.appendChild(document.createTextNode(" Vorschläge anzeigen"));
        input.parentNode.appendChild(container);
        addEvent(checkbox, "change", activeSwitcher);
    }

    function createCheckbox(checked) {
        var cb = document.createElement("input");
        cb.setAttribute("type", "checkbox", 0);
        if (checked) {
            cb.setAttribute("checked", "checked", 0);
            cb.checked = true;
        }
        return cb; 
    }

    function switchActive() {
        var activated = checkbox.checked;
        createCookie("typhoonActive", activated ? "true" : "false", 365);
        if (activated) {
            initializeListeners();
        } else {
            removeListeners();
        }
    }

    /*
     * initialisiert/reinitialisiert die table elemente
     */ 
    function createTableElement() {
        var table = document.createElement("table");
        table.setAttribute("cellpadding", "0", 0);
        table.setAttribute("cellspacing", "0", 0);
        var pos = typhoon_getPosition(input);
        table.style.top = pos.y+"px";
        table.style.left = pos.x+"px";
        table.setAttribute("id", "suggestcontainer", 0);
        table.style.position = "absolute";
        // Append the table to the target Element
		target.appendChild(table);
        addEvent(table, "click", submitter);
        return table;
    }
    
    function createBodyElement(table) {
        var body = document.createElement("tbody");
        table.appendChild(body);
        return body;
    }

    // for entity conversion
    function entity(str) {
        entityElement.innerHTML = str;
        return entityElement.innerHTML;
    }

    function showSuggestions() {
        if (req != null && req.readyState && req.readyState == 4) {
            if (req.status && req.status != null && req.status == 200) {
                if (req.responseXML != null && (tableElement == null || lastAnswer != req.responseText)) {
		    // IE-Hack: Wenn der Server den Content bei laengeren
		    // Antworten aufsplittet, wird der MimeType nicht mehr 
		    // korrekt gesetzt, und req.responseXML enthaelt nicht
		    // das von uns erwartete XML-Dokument. Dies kann man
		    // sich dann jedoch selber erzeugen:
		    if (isIE) {
                        req.responseXML.loadXML(req.responseText);
	            }
                    var table = createTableElement();
                    var body = createBodyElement(table);
                    
                    var books = req.responseXML.getElementsByTagName("book");
                    var terms = req.responseXML.getElementsByTagName("term");
                    			
					while (body.hasChildNodes()) {
						body.removeChild(father.firstChild);
					}
					all = new Array();
                    if (config.trmFrst) {
	                    if (config.trmActv) {
				    		setTerms(body, terms);
				    	}
	                    if (config.artActv) {
				    		setBooks(body, books);
				    	}
			    	} else {
	                    if (config.artActv) {
				    		setBooks(body, books);
				    	}
	                    if (config.trmActv) {
				    		setTerms(body, terms);
				    	}
			    	}
                    hideLayer();
                    table.style.visibility = "visible";
                    tableElement = table;
                    lastAnswer = req.responseText;
                    req = null;
                }
            }
	    else {
	        log.info("There was a problem retrieving the XML data:\n" + req.statusText);
            }
        }
    }

    //browser fork
    function getTextContentFromNode(element) {
        try {
            if (element.textContent) return element.textContent;
        }
        catch(e) {
        }
        if (element.text) return element.text;
        var children = element.childNodes;
        var result = "";
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if ((node.nodeType >= 3) && (node.nodeType <= 6)) {
                result += node.nodeValue;
            }
            else if (node.nodeType == 1) {
                result += textContent(node);
            }
        }
        // Workaround for konqueror : it can't set element.textContent for some reason, while it doesn't support it... so we use element.text...
        element.text = result;
        return result;
    }

    // erzeugt ein span mit class=<tag> und inhalt des ersten tags
    function createSpan(tag, xml) {
    
    	var max_stringlength	=	50;
    	
    	switch (config.mnd) {
    		case 3:
    			var currencySymbol = 'CHF';
    			break;    		
    		case 6:
    			var currencySymbol = 'CHF';
    			break;
    		case 7:
    			var currencySymbol = 'CHF';
    			break;
    		case 8:
    			var currencySymbol = 'CHF';
    			break;
    		case 9:
    			var currencySymbol = 'CHF';
    			break;    		
    		case 13:
    			var currencySymbol = 'CHF';
    			break;    		
    		case 15:
    			var currencySymbol = 'CHF';
    			break;
    		case 18:
    			var currencySymbol = 'CHF';
    			break;
    		default:
    			var currencySymbol = '&euro;';
    			break;
    	}
    	
    
        var el = xml.getElementsByTagName(tag)[0];
        if (el) {
            value = getTextContentFromNode(el);
        }
        else {
            value = "";
        }
        // sonderfall preis
        if (value != "" && tag == "price") {
            while (value.length < 3) {
                value = "0" + value;
            }
            if (currencySymbol == 'CHF') {
                value = value.substring(0,value.length - 2) + "." + value.substring(value.length - 2, value.length);
                value = currencySymbol + " " + value;
            }
	    else {
                value = value.substring(0,value.length - 2) + "," + value.substring(value.length - 2, value.length);
                value = entity(currencySymbol) + " " + value;
            }
        }
        // sonderfall autoren
        if (value != "" && tag == "author" && value.length > max_stringlength) {
            value = value.substring(0, max_stringlength) + "...";
            // + "&euro;"
        }
        // sonderfall titel
        if (value != "" && tag == "title" && value.length > max_stringlength) {
            value = value.substring(0, max_stringlength) + "...";
            // + "&euro;"
        }
        // sonderfall shop
        if (value != "" && tag == "shop") {
            value = capitalize(value);
            // + "&euro;"
        }
        var element = createNode("span", value);
        element.className = tag;
        return element;
    }
	
	 function createTermSpan(tag, xml) {
    
    	var max_stringlength	=	50;
    	
        var value = getTextContentFromNode(xml);
        
        var element = createNode("span", value);
        element.className = tag;
        return element;
    }


    // erzeugt ein div mit class=<tag> und fuegt die elemente des arrays als kinder hinzu
    function createTr(tag) {
        var element = document.createElement("tr");
        element.className = tag;
        return element;
    }

    function createTd(tag, array) {
        var element = document.createElement("td");
        element.className = tag;
        element.setAttribute("nowrap","nowrap", 0);
        for (i = 0; i < array.length; i++) {
            element.appendChild(array[i]);
        }
        return element;
    }
    
    function createImg(xml) {
        var imageUrlElement = xml.getElementsByTagName("image")[0];
        var content = getTextContentFromNode(imageUrlElement);
        if (imageUrlElement != null && content != null && content != "") {
            var element = document.createElement("img");
            element.setAttribute("src", content, 0);
            return element;
        }
        else {
            return document.createElement("span");
        }
    }

    function createStartSearch(textLeft, textRight, headerClass) {
        var first = createTr("search");
        var link = document.createElement("span");
        
        var header = document.createElement("span");
        header.className = "typhoon-info-header";
        header.appendChild(document.createTextNode(textLeft));		
        link.appendChild(header);
		
        if (textRight != "") {
			var infotext = document.createElement("span");
			infotext.className = "typhoon-info-text";
			infotext.appendChild(document.createTextNode(textRight));
			link.appendChild(infotext);
		}
		
        var td = createTd("search", new Array(link));
        td.setAttribute("colspan", "4", 0);
        td.className = "typhoon-general-header";
        if (headerClass != "") {
        	td.className = headerClass;
        }
        first.appendChild(td);
        return first;
    }

    function createNoResults() {
        var first = createTr("noresults");
        var msg = document.createElement("span");
        var header = document.createElement("span");
        header.className = "typhoon-info-header-noresults";
        header.appendChild(document.createTextNode("Die Direktsuche ergab leider keine Ergebnisse. Auf gut Glück ..."));
        msg.appendChild(header);
        var td1 = createTd("noresults", new Array());
        td1.setAttribute("width", "0%", 0);
        var td2 = createTd("noresults", new Array(msg));
        td2.setAttribute("colspan", "2", 0);
        first.appendChild(td1);
        first.appendChild(td2);
        return first;
    }

    function setBooks(father, books) {
			// do not display more items than allowed
			var maxBooks = (books.length > maxAmount) ? maxAmount : books.length;

			if (maxBooks == 0) {
				hideSuggestions();
			} else {
				var firstIndex = all.length;
				all[firstIndex] = createStartSearch(masthead, "", "");
				father.appendChild(all[firstIndex]);
				addEvent(all[firstIndex], 'mouseover', function(event) { window.suggest.select(firstIndex); });
				selected = 0;
				for (var i = 0; i < maxBooks; i++) {
					var elImg = createNode("span", "");
					elImg.className = "typhoon-image";
					elImg.appendChild(createImg(books[i]));
					var elShop		= (displayShop)		? createSpan("shop", books[i]) 			: false;
					var elTitle		= (displayTitle)	? createSpan("title", books[i]) 		: false;
					var elAuthor	= (displayAuthor)	? createSpan("author", books[i]) 		: false;
					var elPrice		= (displayPrice)	? createSpan("price", books[i]) 		: false;
					var trElement	= createTr("book");
					var coverTd		= (displayCover)	? createTd("cover", new Array(elImg)) 	: false;
                    var shopTd		= (displayShop)		? createTd("shop", new Array(elShop)) 	: false;
					if (displayShop) {
						trElement.appendChild(shopTd);
					}
					if (displayCover) {
						trElement.appendChild(coverTd);
					}
					if (displayAuthor) {
						var titleAndAuthorTd = createTd("titleAndAuthor", new Array(elTitle, elAuthor));
					} else {
						var titleAndAuthorTd = createTd("titleAndAuthor", new Array(elTitle));
					}
					trElement.appendChild(titleAndAuthorTd);
					if (displayPrice) {
						var priceTd = createTd("price", new Array(elPrice));
						trElement.appendChild(priceTd);
					}
					
					trElement.artikel = getTextContentFromNode(books[i].getElementsByTagName("articleid")[0]);
					eval("addEvent(trElement, 'mouseover', function(event) { window.suggest.select(" + (firstIndex+i + 1) + "); });");
					father.appendChild(trElement);
					all[firstIndex +i+1] = trElement;
				}
				if (displaySearchStart) {
					all[firstIndex+maxBooks+1]= createStartSearch("", "Suche starten", "typhoon-fullsearch-header");
					father.appendChild(all[firstIndex+maxBooks+1]);
					eval("addEvent(all[firstIndex+maxBooks+1], 'mouseover', function(event) { window.suggest.select(" + (firstIndex+maxBooks + 1) + "); });");
				}
			}
			moveSelection(0);
    }

    function setTerms(father, terms) {
			// do not display more items than allowed
			var maxTerms = (terms.length > maxAmount) ? maxAmount : terms.length;

			if (maxTerms == 0) {
				hideSuggestions();
			} else {
				var firstIndex = all.length;
				all[firstIndex] = createStartSearch(masttermhead, "", "typhoon-terms-header");
				father.appendChild(all[firstIndex]);
				addEvent(all[firstIndex], 'mouseover', function(event) { window.suggest.select(firstIndex); });
				selected = 0;
				for (var i = 0; i < maxTerms; i++) {
					var trElement	= createTr("book");
					var elTitle		= createTermSpan("term", terms[i]);
					var titleAndAuthorTd = createTd("titleAndAuthor", new Array(elTitle));
					titleAndAuthorTd.setAttribute("colspan", "4", 0);
					trElement.appendChild(titleAndAuthorTd);
					trElement.isSearchTerm = true;
					trElement.searchTerm = getTextContentFromNode(terms[i]);
					eval("addEvent(trElement, 'mouseover', function(event) { window.suggest.select(" + (firstIndex+i + 1) + "); });");
					father.appendChild(trElement);
					all[firstIndex +i+1] = trElement;
				}
			}
			moveSelection(0);
    }
    
   

    function createNode(tag, content) {
        var newEl = document.createElement(tag);
        var newElContent = document.createTextNode(content);
        newEl.appendChild(newElContent);
        return newEl;
    }

    // self is called from html
    function getSuggestions(word) {
        if (word.length < 1) {
            if (tableElement) {
                tableElement.style.visibility = "hidden";
            }
            lastAnswer = null;
            return;
        }
        if (req != null) {
            req.abort();
        }
        if (config.tkn == "") {
            // no token, no request
            return;
        } else {
            req = xmlHttp.createReq();
	    if (req != null) {
                
            // Mindestens der Firefox setzt bei chunked-messages
            // den MimeType nicht korrekt... deshalb setzen wir
            // den hier hart.
            if (req.overrideMimeType) {
                req.overrideMimeType("text/xml");
            }

            // schauen wir mal, ob wir den shop einschraenken sollen
            word = addShopFilterIfNecessary(word);

            var url = "/typhoon/s/" + config.mnd + "/" + config.sid + "/" + encodeURI(word);
            xmlHttp.openReq(req, url, self.show);
            req.setRequestHeader("TYTOKEN", config.tkn);
            xmlHttp.sendReq(req);
	    }
        }
    }

    function addShopFilterIfNecessary(word) {
        var select = document.getElementById('sswg');
        if (select != null && select.value != 'ANY') {
            var shops = select.value.split('_');
            var i = 0;
            var searchstring = word;
            for (i = 0; i < shops.length; i++) {
                if (i != 0) searchstring += ' OR';
                var shopname = shops[i];
                // spezielles handling umlaute
                //if (shopname == 'HOERBUCH') shopname = 'H�RBUCH';
                //console.log(shopname);
                if (shopname == 'EBOOKS') shopname = 'EBOOK';
                if (shopname == 'ELEKTRO') shopname = 'ELEKTRONIK';
                if (shopname == 'FILM') shopname = 'FILM';
                if (shopname == 'SPIEL') shopname = 'SPIEL';
                if (shopname == 'GESELLSCHAFTSSPIEL') shopname = 'GESELLSCHAFTSSPIEL';
                searchstring += " filter(shop:" + shopname.toLowerCase() + ")";
            }
            return searchstring;
        }
        return word;
    }
      

    function handleEvent(event) {
    	
        var realEvent = window.suggest.getEvent(event);
        if (realEvent.keyCode) {
            if (realEvent.keyCode == 38 || realEvent.keyCode == 40 || realEvent.keyCode == 13) {
                switch (realEvent.keyCode) {
                    case 38:
                    	moveSelection(-1);
                        return;
                    case 40:
                    	moveSelection(1);
                        return;
                    case 13:
                    	submitSelection();
                    	return;
                }
            }
        }
        getSuggestions(getEventTarget(realEvent).value);
    }

    function submitSelection() {
        hideLayer();
        var element = all[selected];
        if ((typeof element != 'undefined') && element.isSearchTerm) {
        	window.location.href = config.searchurl + ";jsessionid=fdc-" + conf.sid + "?sswg=ANY&" + config.searchElementName + "=" + element.searchTerm;
        }else if ((typeof element != 'undefined') && (element.artikel)) {
            window.location.href = config.url + "/ID" + element.artikel + ".html;jsessionid=fdc-" + conf.sid;
        }
        else {
            input.form.submit();
        }
    }

    function moveSelection(direction) {
        if (direction > 0) {
            if (selected < all.length - 1) {
                selected = selected + 1;
            }
        }
        else {
            if (selected > 0) {
            selected = selected - 1 ;
            }
        }
        applySelection();
    }

    function setSelection(selection) {
        if (selection >= 0 && selection < all.length) {
            selected = selection;
        }
        applySelection();
    }

    function applySelection() {
        for (i = 0; i < all.length; i++) {
            if (i == selected) {
                all[i].className = "typhoon-selected-row";
            } else {
                all[i].className = "typhoon-unselected-row";
            }
        }
    }
	
    function getEvent(event) {
        return (suggest_loadTableListEventElement) ? suggest_loadTableListEventElement : event;
    }

    function getEventTarget(event) {
        var realEvent = getEvent(event); 
        return (realEvent.target) ? realEvent.target : realEvent.srcElement;
    }

    function typhoon_point(x, y) {
        this.x = x;
        this.y = y;
    }

    function typhoon_getPosition(element) {
        if (element.nodeType == 3) // defeat KHTML bug
            element = element.parentNode;
        return new typhoon_point(typhoon_findPosX(element), typhoon_findPosY(element) + element.offsetHeight);
    }
 
    function typhoon_findPosX(obj)
    {
        var curleft = 0;
        var origobj = obj;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curleft += obj.offsetLeft;
                obj = obj.offsetParent;
            }
        }
        else if (obj.x)
            curleft += obj.x;
        return curleft;
    } 

    function typhoon_findPosY(obj)
    {
        var curtop = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curtop += obj.offsetTop;
                obj = obj.offsetParent;
            }
        }
        else if (obj.y)
            curtop += obj.y;
        return curtop;
    }

    function hideLayer() {
        if (tableElement) {
            tableElement.parentNode.removeChild(tableElement);
        }
        tableElement = null;
    }

    /*
     * declare public methods here
     */
    self.handle = handleEvent;
    self.hide = hideLayer;
    self.show = showSuggestions;
    self.select = setSelection;
    self.submit = submitSelection;
    self.switchActive = switchActive;
    
    self.getEvent			=	getEvent;
    self.getEventTarget		=	getEventTarget;
    self.getSuggestions		=	getSuggestions;
    self.submitSelection	=	submitSelection;
    self.moveSelection		=	moveSelection;
}

// funktioniert nur im firefox, landet da auf der konsole.
// dann muss man da nicht mit den alerts rumbasteln
function logger(debugmode) {
    if (window.dump) {
        var console = window;
        var debug = debugmode;
    }
    else {
        var debug = -1;
    }
    this.info = function (message) {
        if (debug >= 0) console.dump("INFO: " + message + "\n");
    };
    this.warning = function (message) {
        if (debug >= 1) console.dump("WARNING: " + message + "\n");
    };
    this.error = function (message) {
        if (debug >= 2) console.dump("ERROR: " + message + "\n");
    };
}

var suggestIsInitialized = false;
// initialisiert, wenn moeglich, die suggest-funktionalitaet
function initSuggest() {
    if (!suggestIsInitialized) {
        var el = document.getElementsByName(sugCnf.searchElementName)[0];
        if ((el) && !(sugCnf == "undefined") && sugCnf.tkn != "") {
            window.suggest = new Suggest(el, sugCnf);
        }
        suggestIsInitialized = true;
    }
}
