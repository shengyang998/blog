var KNStaticAssets={};KNStaticAssets["KNTransitionSwoosh_Shadow.png"]=new Image;KNStaticAssets["KNTransitionSwoosh_Shadow.png"].src=static_url("KNTransitionSwoosh_Shadow.png");KNStaticAssets["KNTransitionSlide_Black.png"]=new Image;KNStaticAssets["KNTransitionSlide_Black.png"].src=static_url("KNTransitionSlide_Black.png");var TextureManager=Class.create({initialize:function(e){this.script=null;this.showUrl=e;this.sceneCache={};this.slideCache={};this.sceneDidLoadCallbackHandler=null;this.viewScale=1;document.observe(kScriptDidDownloadEvent,function(e){this.handleScriptDidDownloadEvent(e)}.bind(this),false)},setSceneDidLoadCallbackHandler:function(e,s){this.sceneDidLoadCallbackHandler={handler:e,sceneIndex:s}},processTextureDidLoadCallback:function(e,s){if(this.sceneDidLoadCallbackHandler==null){return}var t=this.sceneDidLoadCallbackHandler.sceneIndex;var i=this.script.slideIndexFromSceneIndexLookup[t];if(i!=s){return}if(this.isSlidePreloaded(s)){this.callSceneDidLoadCallback()}},processSlideDidLoadCallback:function(e){if(this.sceneDidLoadCallbackHandler==null){return}var s=this.sceneDidLoadCallbackHandler.sceneIndex;var t=this.script.slideIndexFromSceneIndexLookup[s];if(t!=e){return}this.callSceneDidLoadCallback()},processSceneDidLoadCallback:function(e){if(this.sceneDidLoadCallbackHandler&&e===this.sceneDidLoadCallbackHandler.sceneIndex&&this.isScenePreloaded(e)){this.callSceneDidLoadCallback()}},callSceneDidLoadCallback:function(){this.sceneDidLoadCallbackHandler.handler();this.sceneDidLoadCallbackHandler=null},loadScene:function(e,s){if(e<0||e>this.script.numScenes){return}if(s){this.setSceneDidLoadCallbackHandler(s,e)}var t=this.script.slideIndexFromSceneIndexLookup[e];if(this.delegate.loadTextureBySlideIndex){this.assetForSlide(t)}else{this.requestSlideSvgmap(t)}},preloadScenes:function(e){for(var s in e){var t=this.script.slideIndexFromSceneIndexLookup[s];if(t==null){continue}if(this.slideCache.hasOwnProperty(t)===false){this.loadScene(s)}}},isSlidePreloaded:function(e){var s=false;if(this.slideCache[e]){s=true;for(var t in this.slideCache[e].textureRequests){if(this.slideCache[e].textureRequests[t]===false){s=false;break}}}return s},isScenePreloaded:function(e){var s=this.script.slideIndexFromSceneIndexLookup[e];var t=this.isSlidePreloaded(s);return t},handleScriptDidDownloadEvent:function(e){this.script=e.memo.script;this.delegate=e.memo.delegate},assetForSlide:function(e){var s=this.slideCache[e];var t=this.script.slideList[e];var i=this.script.slides[t];var a=i.assets;if(s==null){this.slideCache[e]={};this.slideCache[e].textureAssets={};this.slideCache[e].textureRequests={};for(var r in a){var l=a[r];if(l.type==="texture"){this.slideCache[e].textureRequests[r]=false;this.requestAsset(r,l,t,e)}}}else{if(this.isSlidePreloaded(e)){this.processSlideDidLoadCallback(e)}else{for(var r in a){var l=a[r];if(this.slideCache[e].textureRequests[r]===false&&l.type==="texture"){this.requestAsset(r,l,t,e)}}}}},requestAsset:function(e,s,t,i){requestedSlideIndex=i;if(s.assetRequest.type==="slide"){if(s.assetRequest.state==="incoming"||s.assetRequest.state==="incoming-reflection"){if(s.assetRequest.slide){requestedSlideIndex=this.script.slideList.indexOf(s.assetRequest.slide);if(requestedSlideIndex===-1){if(this.script.loopSlideshow){requestedSlideIndex=0}else{requestedSlideIndex=i;s.assetRequest.state="KNTransitionSlide_Black.png"}}}else{if(i</0||e>