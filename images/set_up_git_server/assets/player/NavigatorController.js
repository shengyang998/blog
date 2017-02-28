var NavigatorController=Class.create({initialize:function(e){this.domNode=e;this.thumbnailSidebar=new NavigatorThumbnailSidebar;this.thumbnailScroller=new NavigatorThumbnailScroller;this.thumbnailSelection=new NavigatorThumbnailSelection;this.thumbnailContainer=new NavigatorThumbnailContainer;this.thumbnailSidebar.domNode.appendChild(this.thumbnailScroller.domNode);this.thumbnailScroller.domNode.appendChild(this.thumbnailSelection.domNode);this.thumbnailScroller.domNode.appendChild(this.thumbnailContainer.domNode);this.domNode.appendChild(this.thumbnailSidebar.domNode);this.leftSidebar=new NavigatorLeftSidebar;this.domNode.appendChild(this.leftSidebar.domNode);Event.observe(this.domNode,"click",this.handleClickEvent.bind(this));Event.observe(this.leftSidebar.domNode,"mouseover",this.handleMouseOverEvent.bind(this));Event.observe(this.domNode,"mouseleave",this.handleMouseOutEvent.bind(this));document.observe(kSlideIndexDidChangeEvent,this.handleSlideIndexDidChangeEvent.bind(this));document.observe(kScriptDidDownloadEvent,this.handleScriptDidDownloadEvent.bind(this));this.slideThumbnail=null},initScrollbar:function(){if(this.thumbnailScroller.domNode.scrollHeight>this.thumbnailScroller.domNode.offsetHeight){this.thumbnailScroller.domNode.style.width="126px"}else{this.thumbnailScroller.domNode.style.width="129px"}if(browserPrefix==="ms"){this.domNode.style.width="148px";this.thumbnailSidebar.domNode.style.left="-148px";this.thumbnailSidebar.domNode.style.width="137px";this.thumbnailScroller.domNode.style.width="137px"}},handleClickEvent:function(e){if(gShowController.isRecording){return}e=e||window.event;var t=e.target||e.srcElement;var i;if(browserPrefix==="ms"){e.cancelBubble=true}else{e.stopPropagation()}while(t.slideNumber==null&&t.nodeName.toLowerCase()!="body"){t=t.parentNode}if(t.slideNumber){this.selectedSlideIndex=t.slideNumber;this.select(this.selectedSlideIndex)}},select:function(e){gShowController.jumpToSlide(e)},handleMouseOverEvent:function(e){e=e||window.event;var t=0;var i=0;if(e.pageX||e.pageY){t=e.pageX;i=e.pageY}else{if(e.clientX||e.clientY){t=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-document.documentElement.clientLeft;i=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-document.documentElement.clientTop}}if(t===0&&i===0){return}var o=this.selectedSlideIndex*76;var n=this.thumbnailScroller.domNode.scrollTop;var l=this.thumbnailScroller.domNode.clientHeight;if(n>o){this.thumbnailScroller.domNode.scrollTop=o}else{if(n+l<o+76){var a="o-n-l+76;this.thumbnailScroller.domNode.scrollTop=this.thumbnailScroller.domNode.scrollTop+a}}clearTimeout(this.navigatorTimeout);this.navigatorTimeout=setTimeout(this.thumbnailSidebar.show.bind(this.thumbnailSidebar,this.leftSidebar),400)},handleMouseOutEvent:function(e){clearTimeout(this.navigatorTimeout);this.navigatorTimeout=setTimeout(this.thumbnailSidebar.hide.bind(this.thumbnailSidebar,this.leftSidebar),400)},handleSlideIndexDidChangeEvent:function(e){this.selectedSlideIndex=e.memo.slideIndex;this.thumbnailSelection.select(this.selectedSlideIndex)},handleScriptDidDownloadEvent:function(e){var" t="e.memo.script;for(var" i="0,o=t.slideList.length;i<o;i++){var" n="t.slideList[i];var" l="new" navigatorthumbnailitem;l.domnode.slidenumber="i+1;l.numberNode.innerHTML=i+1;setElementProperty(l.domNode,"top",i*76+"px");this.thumbnailContainer.addItem(l);if(gShowController.delegate.getKPFJsonStringForShow==null){var" +n+"="" thumbnail.jpeg";var="" d="document.createElement("img");Event.observe(d,"load",this.updateThumbnail.bind(this,i,d));d.src=a}else{gShowController.delegate.loadTextureBySlideIndex(i,{type:"slideThumbnail",state:"outgoing"},function(e,t){this.updateThumbnail(e,t)}.bind(this,i))}}this.initScrollbar()},updateThumbnail:function(e,t){var" o="gShowController.script.originalSlideWidth;var" a,d;if(l="">=4/3){a=88;d=Math.ceil(88*(1/l))}else{a=Math.ceil(66*l);d=66}this.slideThumbnail={width:a,height:d,top:Math.ceil((66-d)/2),left:Math.ceil((88-a)/2),scaleX:a/o,scaleY:d/n}}if(t.nodeName.toLowerCase()==="svg"){t.firstElementChild.setAttribute("transform","matrix("+this.slideThumbnail.scaleX+",0,0,"+this.slideThumbnail.scaleY+",0,0)")}t.setAttribute("style",kTransitionPropertyName+":opacity; "+kTransitionDurationName+":500; width:"+this.slideThumbnail.width+"px; height:"+this.slideThumbnail.height+"px; left:"+this.slideThumbnail.left+"px; top:"+this.slideThumbnail.top+"px; opacity: 0; position: absolute;");t.setAttribute("draggable",false);if(browserPrefix==="moz"){Event.observe(t,"dragstart",function(e){e.preventDefault()})}i.appendChild(t);t.style.opacity=1}});var NavigatorLeftSidebar=Class.create({initialize:function(){this.domNode=document.createElement("div");this.domNode.setAttribute("class","navigatorLeftSidebar")}});var NavigatorThumbnailSidebar=Class.create({initialize:function(){this.domNode=document.createElement("div");this.domNode.setAttribute("class","navigatorThumbnailSidebar")},show:function(e){e.domNode.style.visibility="hidden";this.domNode.style.left="0px";gShowController.displayManager.navigatorIsShowing=true;gShowController.displayManager.clearTimeoutForCursor()},hide:function(e){e.domNode.style.visibility="visible";this.domNode.style.left="-140px";gShowController.displayManager.navigatorIsShowing=false;gShowController.displayManager.setTimeoutForCursor()}});var NavigatorThumbnailScroller=Class.create({initialize:function(){this.domNode=document.createElement("div");this.domNode.setAttribute("class","navigatorThumbnailScroller")}});var NavigatorThumbnailSelection=Class.create({initialize:function(e){this.domNode=document.createElement("div");this.domNode.setAttribute("class","navigatorThumbnailSelection")},select:function(e){this.domNode.style.top=76*e+"px";this.domNode.style.display="block"}});var NavigatorThumbnailContainer=Class.create({initialize:function(){this.domNode=document.createElement("div");this.domNode.setAttribute("class","navigatorThumbnailContainer");this.thumbnailItems=[]},addItem:function(e){this.thumbnailItems.push(e);this.domNode.appendChild(e.domNode)}});var NavigatorThumbnailItem=Class.create({initialize:function(){this.domNode=document.createElement("div");this.domNode.setAttribute("class","navigatorThumbnailItem");this.thumbnailContentNode=document.createElement("div");this.thumbnailContentNode.setAttribute("style","position: absolute; height: 76px; width: 119px;");this.numberNode=document.createElement("div");this.numberNode.setAttribute("style","position: absolute; bottom: 1px; width: 20px; height: 20px; text-align: right; font-weight: bold; color: white;");this.imageNode=document.createElement("div");this.imageNode.setAttribute("style","position: absolute; left: 24px; width: 95px; height: 76px;");this.thumb=document.createElement("div");this.thumb.setAttribute("style","position: absolute; top: 4px; width: 90px; height: 68px;");this.canvasContainer=document.createElement("div");this.canvasContainer.setAttribute("class","navigatorThumbnailItemCanvasContainer");this.thumb.appendChild(this.canvasContainer);this.imageNode.appendChild(this.thumb);this.thumbnailContentNode.appendChild(this.numberNode);this.thumbnailContentNode.appendChild(this.imageNode);this.domNode.appendChild(this.thumbnailContentNode)}});</o+76){var>