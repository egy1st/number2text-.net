/*1330961950,176820409*/

if (window.CavalryLogger) { CavalryLogger.start_js(["lTxK4"]); }

ConnectLogin={init:function(a){this.appID=a.appID;this.addToProfile=a.addToProfile;this.oneClick=a.oneClick;this.channelUrl=a.channelUrl;XD.init(a);},login:function(a,b,c){if(this.oneClick&&!b){this._oneClick(a);}else this._openPopup(a,b,c);},logout:function(){XD.send({type:'logout'});},_oneClick:function(a){new AsyncRequest().setURI('/ajax/api/tos.php').setData({app_id:this.appID,grant_perm:1}).setHandler(function(b){ConnectLogin._refreshLoginStatus();a&&a();}).send();},_openPopup:function(a,b,c){c=c||{};var d=WindowComm.makeHandler(function(h){ConnectLogin._closePopup();if(ConnectLogin.appID)ConnectLogin._refreshLoginStatus();a&&a();}),e=WindowComm.makeHandler(function(h){ConnectLogin._closePopup();}),f=new URI('/login.php');f.setQueryData({api_key:this.appID,next:d,channel_url:e,cancel_url:e,req_perms:b,v:'1.0',fbconnect:1,add_to_profile:this.addToProfile,display:'popup'});f.addQueryData(c);var g=this._getSize(c);this._popup=PopupResizer.open(f.toString(),g.height,g.width);},_closePopup:function(){if(this._popup){this._popup.close();this._popup=null;}},_refreshLoginStatus:function(){if(this.channelUrl){XD.send({type:'refreshLoginStatus'});}else window.location.reload();},_getSize:function(a){if(a.social_plugin=='registration'){return {width:640,height:370};}else return {width:610,height:280};}};
FBCommentServer={serverStarted:true,init:function(a){CSS.setClass($(a.commentsID).parentNode,'mu-connect-disable-logout');this._notifyAddComment=a.notify;ConnectLogin.init(a);XD.init({channelUrl:a.channelUrl,hideOverflow:true,autoResize:true});},showConnect:function(){ConnectLogin.login();},setupConnect:function(a,b){if(Env.user&&Env.user!="0"){a.defer();}else b.defer();},addComment:function(a){if(this._notifyAddComment)XD.send({type:'addComment',comments:a});}};
if(!window.CommentAdminPanelController){window.CommentAdminPanelController=function(a){copy_properties(this,{channel:a.channel,controllerID:a.controllerID,commentIDs:a.commentIDs,domIDs:a.domIDs,blacklistedActors:a.blacklistedActors,actorToCommentInfoMap:a.actorToCommentIDMap,commentInfoMap:a.commentInfoMap,inAggregatedView:a.inAggregatedView,inModerationQueue:a.inModerationQueue,inContextualDialog:a.inContextualDialog,loggedIn:a.loggedIn,userOwnsPages:a.userOwnsPages,recentlyBlacklistedActors:a.blacklistedActors});this.controlledRegion=$(this.controllerID);this.attachClickHandlers();if(this.inModerationQueue)this.registerModeratorQueueHandlers(true);if(this.inContextualDialog)this.attachContextualDialogHandlers();if(!this.inAggregatedView)UnverifiedXD.init({autoResize:true,channelUrl:a.channel,hideOverflow:true,newResizeMethod:true,resizeWidth:false});};copy_properties(CommentAdminPanelController,{allControllers:{},mainController:null,contextualControllers:{},initController:function(a){var b=new CommentAdminPanelController(a),c=a.controllerID;CommentAdminPanelController.allControllers[c]=b;if(b.inContextualDialog){CommentAdminPanelController.contextualControllers[c]=b;}else CommentAdminPanelController.mainController=b;},syncController:function(a,b){var c=CommentAdminPanelController.allControllers[a];c.attachClickHandlers();if(!c.isControllingModerationQueue())return;c.deselectComments(b);c.registerModeratorQueueHandlers(false);c.synchronizeModeratorQueueUI();},resetController:function(a){var b=CommentAdminPanelController.allControllers[a];b.resetController();},updateController:function(a,b,c,d,e,f){var g=CommentAdminPanelController.allControllers[a];g.updateController(b,c,d,e,f);if(!CommentAdminPanelController.mainController.loggedIn)MultiLoginPopup.reattachLoginInterceptors();if(!g.isControllingModerationQueue())return;g.registerModeratorQueueHandlers(false);g.synchronizeModeratorQueueUI();},registerMoreCommentsLinkHandler:function(a,b){var c=CommentAdminPanelController.allControllers[a];c.registerMoreCommentsLinkHandler(b);},notifyCommentCreated:function(a){if(!CommentAdminPanelController.mainController.channel)return;UnverifiedXD.send({type:'commentCreated',href:a.href,parentCommentID:a.parentCommentID,commentID:a.commentID});},notifyCommentRemoved:function(a){if(!CommentAdminPanelController.mainController.channel)return;UnverifiedXD.send({type:'commentRemoved',href:a.href,commentID:a.commentID});},markAsShowingAllReplies:function(a){var b=a+' a.fbUpDownVoteOption',c=DOM.scry(document.documentElement,b),d=a+' li.fbUpDownVoteOption a.itemAnchor',e=DOM.scry(document.documentElement,d),f=c.concat(e);for(var g=0;g<f.length;g++){var h=f[g],i=new URI(h.getAttribute('ajaxify'));i.addQueryData({show_all_replies:1});h.setAttribute('ajaxify',i.toString());}},setLoggedIn:function(a){CommentAdminPanelController.mainController.loggedIn=a;}});copy_properties(CommentAdminPanelController.prototype,{isControllingModerationQueue:function(){var a=this==CommentAdminPanelController.mainController&&this.inModerationQueue;return a;},resetController:function(){this.commentIDs=[];this.domIDs=[];},updateController:function(a,b,c,d,e){a.forEach(function(g){this.commentIDs.push(g);},this);b.forEach(function(g){this.domIDs.push(g);},this);copy_properties(this.blacklistedActors,c);for(var f in d){if(!this.actorToCommentInfoMap[f])this.actorToCommentInfoMap[f]=[];d[f].forEach(function(g){this.actorToCommentInfoMap[f].push(g);},this);}copy_properties(this.commentInfoMap,e);this.attachClickHandlers();},attachClickHandlers:function(){for(var a=0;a<this.domIDs.length;a++){var b='li[id="'+this.domIDs[a]+'"]',c=DOM.scry(this.controlledRegion,b);if(c.length===0)continue;var d=c[0],e=DOM.scry(d,'a.uiCloseButton');Event.listen(d,'mouseleave',this.closeStickyMenuFlyouts.bind(this,e));var f=DOM.scry(d,'.fbModerateDropdownContainer');if(f.length>0){var g=f[0],h=DOM.find(g,'.fbModerateDropdownLink');Event.listen(h,'mouseover',function(q,event){CSS.addClass(q,'fbUnderlineText');}.curry(h));Event.listen(h,'mouseout',function(q,event){CSS.removeClass(q,'fbUnderlineText');}.curry(h));var i=DOM.find(g,'.fbModerationDropdownList');Event.listen(h,'click',this.exposeDropDownMenu.bind(this,h,i));Event.listen(i.parentNode,'mouseleave',this.concealDropDownMenu.bind(this,h,i));this.attachDropDownHandlers(d,this.commentIDs[a],i);}var j=this.commentInfoMap[this.commentIDs[a]].actor,k=!!this.recentlyBlacklistedActors[j];if(k){var l=DOM.scry(d,'.fbUndoBlacklistLink');if(l.length>0){var m=l[0];Event.listen(m,'click',this.toggleBlackListAndSync.bind(this,this.commentIDs[a]));}}}var n=DOM.scry(this.controlledRegion,'.fbReplyButton'),o=DOM.scry(this.controlledRegion,'.fbReplyAfterLoginButton');for(var p=0;p<n.length;p++)if(this.loggedIn){CSS.show(n[p]);CSS.hide(o[p]);}else{CSS.hide(n[p]);CSS.show(o[p]);}},closeStickyMenuFlyouts:function(a,event){Toggler.hide();for(var b=0;b<a.length;b++)a[b].blur();},attachDropDownHandlers:function(a,b,c){var d=DOM.scry(c,'.fbBanUser');if(d.length>0){var e=d[0],f=DOM.find(e,'^.fbFeedbackPost');if(f.id.startsWith(b))Event.listen(e,'click',this.toggleBlackListAndSync.bind(this,b));}},exposeDropDownMenu:function(a,b,event){if(CSS.shown(b))return this.concealDropDownMenu(a,b,event);Event.stop(event);CSS.show(b);b.focus();a.blur();return false;},concealDropDownMenu:function(a,b,event){Event.stop(event);CSS.removeClass(a,'fbUnderlineText');CSS.hide(b);a.blur();return false;},registerMoreCommentsLinkHandler:function(a){var b=a.pager_id;if(!ge(b))return;var c=$(b);Event.listen(c,'click',this.fetchMoreComments.bind(this,a,c));},deselectComments:function(a){for(var b=0;b<a.length;b++)delete this.selectedCommentsMap[a[b]];},registerModeratorQueueHandlers:function(a){if(a)this.selectedCommentsMap={};this.selectableComments=this.findSelectableComments();this.selectableCheckboxes=[];this.selectAllCheckBoxes=DOM.scry(this.controlledRegion,'.fbSelectAllCheckbox');this.approveButtons=DOM.scry(this.controlledRegion,'.fbApproveButton');this.removeButtons=DOM.scry(this.controlledRegion,'.fbRemoveButton');for(var b=0;b<this.selectableComments.length;b++){var c=this.selectableComments[b].id,d=!!this.selectedCommentsMap[c];this.setCommentSelection(this.selectableComments[b],d);var e=DOM.find(this.selectableComments[b],'.fbCommentCheckbox'),f=DOM.find(this.selectableComments[b],'.UIImageBlock_Content');Event.listen(e,'click',this.toggleCommentSelection.bind(this));Event.listen(this.selectableComments[b],'click',this.toggleCommentSelection.bind(this));e.checked=d;this.selectableCheckboxes.push(e);}for(var g=0;g<this.selectAllCheckBoxes.length;g++){this.selectAllCheckBoxes[g].checked=false;this.selectAllCheckBoxes[g].disabled=this.selectableComments.length===0;Event.listen(this.selectAllCheckBoxes[g],'click',this.toggleSelectAllCheckbox.bind(this,this.selectAllCheckBoxes[g]));}for(var h=0;h<this.approveButtons.length;h++)Event.listen(this.approveButtons[h],'click',this.setBulkPrivacy.bind(this,false));for(var i=0;i<this.removeButtons.length;i++)Event.listen(this.removeButtons[i],'click',this.setBulkPrivacy.bind(this,true));},findSelectableComments:function(){var a=DOM.scry(this.controlledRegion,'.fbTopLevelComment'),b=[];for(var c=0;c<a.length;c++)if((DOM.scry(a[c],'.fbCommentCheckbox').length===1)&&(DOM.scry(a[c],'.fbCommentOverlay').length===0))b.push(a[c]);return b;},toggleCommentSelection:function(event){var a={a:true},b=event.getTarget(),c=b.tagName.toLowerCase(),d=b.parentNode.tagName.toLowerCase();if(a[c]||a[d])return;var e=CSS.hasClass(b,'fbFeedbackPost')?b:DOM.find(b,'^.fbFeedbackPost'),f=this.commentIsSelected(e),g=!f;this.setCommentSelection(e,g);this.synchronizeModeratorQueueUI();if(CSS.hasClass(b,'fbCommentCheckbox'))Event.stop(event);},commentIsSelected:function(a){return CSS.hasClass(a,'fbCommentSelected');},setCommentSelection:function(a,b){if(b){this.selectComment(a);}else this.deselectComment(a);},selectComment:function(a){CSS.addClass(a,'fbCommentSelected');this.selectedCommentsMap[a.id]=true;DOM.find(a,'.fbCommentCheckbox').checked=true;},deselectComment:function(a){CSS.removeClass(a,'fbCommentSelected');delete this.selectedCommentsMap[a.id];DOM.find(a,'.fbCommentCheckbox').checked=false;},toggleSelectAllCheckbox:function(a,event){Event.stop(event);var b=a.checked;for(var c=0;c<this.selectableComments.length;c++){this.setCommentSelection(this.selectableComments[c],a.checked);this.selectableCheckboxes[c].checked=b;}this.synchronizeBulkModerationCheckboxes(b);this.synchronizeBulkModerationButtons(b);},synchronizeModeratorQueueUI:function(){var a=0;for(var b=0;b<this.selectableCheckboxes.length;b++)if(this.selectableCheckboxes[b].checked)a++;var c=this.selectableCheckboxes.length>0&&a==this.selectableCheckboxes.length;this.synchronizeBulkModerationCheckboxes(c);this.synchronizeBulkModerationButtons(a>0);},synchronizeBulkModerationCheckboxes:function(a){for(var b=0;b<this.selectAllCheckBoxes.length;b++)this.selectAllCheckBoxes[b].checked=a;},synchronizeBulkModerationButtons:function(a){for(var b=0;b<this.approveButtons.length;b++)Button.setEnabled(this.approveButtons[b],a);for(var c=0;c<this.removeButtons.length;c++)Button.setEnabled(this.removeButtons[c],a);},setBulkPrivacy:function(a,event){Event.stop(event);this.synchronizeBulkModerationButtons(false);selectedCommentIDs=[];for(var b in this.selectedCommentsMap)selectedCommentIDs.push(b);var c={is_private:a,in_moderation_queue:true,comment_ids:selectedCommentIDs,uniqids:selectedCommentIDs,controller_id:this.controllerID,owns_pages:this.userOwnsPages,in_aggregated_view:this.inAggregatedView,in_contextual_dialog:this.inContextualDialog};new AsyncRequest().setURI('/ajax/connect/comments/set_bulk_private.php').setData(c).send();return false;},toggleBlackListAndSync:function(a,event){Event.stop(event);var b=this.commentInfoMap[a].actor,c={blacklist:!this.blacklistedActors[b],in_moderation_queue:this.inModerationQueue,comment_id:a,other_comment_ids:this.getOtherCommentsByActor(b,a),uniqid:a,controller_id:this.controllerID,owns_pages:this.userOwnsPages,in_aggregated_view:this.inAggregatedView,in_contextual_dialog:this.inContextualDialog};new AsyncRequest().setURI('/ajax/connect/comments/set_blacklist.php').setData(c).setHandler(function(d){this.blacklistedActors[b]=!this.blacklistedActors[b];if(this.blacklistedActors[b]){this.recentlyBlacklistedActors[b]=true;}else delete this.recentlyBlacklistedActors[b];}.bind(this)).send();return false;},getOtherCommentsByActor:function(a,b){return this.actorToCommentInfoMap[a].filter(function(c){return c!=b;});},fetchMoreComments:function(a,b,event){Event.kill(event);CSS.addClass(b,'async_saving');var c={is_reply_thread:false,in_moderation_queue:false,view_as_moderator:false};copy_properties(c,a);c.recently_blacklisted=this.getRecentlyBlacklistedActors();c.offset=this.getVisibleCommentCount(c);if(!c.aggregate_view)delete c.aggregate_view;if(!c.comment_id)delete c.comment_id;if(!c.is_reply_thread)c.comment_ids=this.commentIDs;new AsyncRequest().setURI('/ajax/connect/feedback.php').setReadOnly(true).setData(c).send();},getVisibleCommentCount:function(a){var b=this.getCommentsSelector(a),c=DOM.scry($(a.controller_id),b),d=0;for(var e=0;e<c.length;e++)if(!CSS.hasClass(c[e],'fbCommentIgnored'))d++;return d;},getCommentsSelector:function(a){var b=a.is_reply_thread?'li.fbCommentReply':'li.fbTopLevelComment';if(a.controller_id!=a.uniqid)b='div[id="'+a.uniqid+'"] '+b;return b;},getRecentlyBlacklistedActors:function(){var a=[];for(var b in this.recentlyBlacklistedActors)a.push(b);return a;},attachContextualDialogHandlers:function(){this.documentClickListener=Event.listen(document.documentElement,'click',this.closeContextualDialog.bind(this));},closeContextualDialog:function(event){var a=event.getTarget(),b=Parent.byClass(a,'fbCommentContext');if(!b)this.destroyContextualDialog();},destroyContextualDialog:function(){this.documentClickListener.remove();delete this.documentClickListener;var a=this.controllerID;Feedback.closeContextualDialog(a);}});}
add_properties('Feedback',{registerComment:function(a,b){Feedback.comments[a]=b;return Feedback;},getRegisteredComment:function(a){return Feedback.comments[a];},deleteClickHandler:function(a,b,c,d,e){var f=new Dialog().setTitle("Delete Post").setBody("Are you sure you want to delete this post?").setButtons([Dialog.newButton('delete',"Delete"),Dialog.CANCEL]).setHandler(function(event){new AsyncRequest().setURI('/ajax/connect/feedback.php').setData({command:'delete',url:a,uniqid:d,owns_pages:e,controller_id:c,comment_id:b}).send();}.bind(this)).show();},resizeCommentas:function(a){var b=DOM.scry(a,'div.post')[0];if(b){var c=Vector2.getElementDimensions(b).x;if(c){var d=DOM.find(b,'.commentas'),e=Vector2.getElementDimensions(d).x;if((c-e)<190&&(c-190)>60){CSS.setStyle(d,'width',c-190+'px');var f=DOM.scry(d,'span.commentas_inner')[0];if(f){var g=Vector2.getElementDimensions(f).x;CSS.setStyle(d,'width',g+'px');}}}}},exposeContextualDialogReply:function(a){var b=$(a),c=b.parentNode.parentNode;CSS.show(DOM.find(c,"form"));DOM.find(c,"textarea").focus();return false;},concealContextualDialogReply:function(a){var b=$(a),c=b.parentNode.parentNode,d=DOM.find(c,"form"),e=DOM.find(c,"textarea"),f=e.value.length;if(!Input.getValue(e))CSS.hide(d);return false;},closeContextualDialog:function(a){var b=ContextualDialogX.getInstance($(a));b.hide();return false;},_clickLocked:false,attachOptInClickListener:function(a){Event.listen(a,'click',function(b){Event.kill(b);if(!this._clickLocked){this._clickLocked=true;setTimeout(function(){this._clickLocked=false;}.bind(this),1000);PlatformOptInPopup.open('feedback','opt.in');}});},attachReplyListener:function(a){var b=DOM.find(a,'textarea');a.suppressBlur=false;Event.listen(a,'click',function(c){var d=c.getTarget(),e=Parent.byClass(d,'commentas')!==null,f=Parent.byClass(d,'uiButton')!==null,g=Parent.byClass(d,'uiSelector')!==null;a.suppressBlur=e||f||g;});Event.listen(b,'blur',function(c,d){if(a.interval)return;a.interval=setInterval((function(e,f){if(e.suppressBlur||Input.getValue(f)||f==document.activeElement)return;CSS.hide(e);e.suppressBlur=false;clearInterval(e.interval);delete e.interval;}).curry(a,c),100);}.curry(b));},attachReplyClickListener:function(a,b,c){var d=DOM.find(a,'textarea');Event.listen(b,'click',function(e){CSS.show(a);d.focus();if(!c.isViewer&&c.isReply){var f=MentionsInput.getInstance(d);if(f){var g=f.getMentions();if(!g[c.uid]&&Input.getValue(d)===''){f.addMention(c);Input.setValue(d,Input.getValue(d)+' ');}}else Input.setValue(d,c.text+' ');}e.preventDefault();});},resetInput:function(a){var b=MentionsInput.getInstance(a);if(b){b.reset({flattened:'',mention_data:{}});}else Input.setValue(a,'');}});if(!window.Feedback.comments)window.Feedback.comments={};
function OpenIDRequest(){var a=new AsyncRequest().setReadOnly(true).setHandler(this.asyncResponseHandler.bind(this)).setErrorHandler(this.asyncErrorHandler.bind(this));copy_properties(this,{openidUrl:null,requestId:OpenIDRequest.maxRequestId++,successResponseHandler:null,cancelHandler:null,intermediateHandler:null,immediateMode:false,useExtensions:true,thirdPartyLogin:false,popupWindow:null,asyncRequest:a,retryCount:0});OpenIDRequest.requests[this.requestId]=this;}OpenIDRequest.getRequestById=function(a){return OpenIDRequest.requests[a];};OpenIDRequest.prototype.setOpenIDUrl=function(a){this.openidUrl=a;return this;};OpenIDRequest.prototype.setSuccessHandler=function(a){this.successResponseHandler=a;return this;};OpenIDRequest.prototype.setErrorHandler=function(a){this.errorHandler=a;return this;};OpenIDRequest.prototype.setCancelHandler=function(a){this.cancelHandler=a;return this;};OpenIDRequest.prototype.setImmediateMode=function(a){this.immediateMode=a;return this;};OpenIDRequest.prototype.setUseExtensions=function(a){this.useExtensions=a;return this;};OpenIDRequest.prototype.setIntermediateHandler=function(a){this.intermediateHandler=a;return this;};OpenIDRequest.prototype.setThirdPartyLogin=function(a){this.thirdPartyLogin=a;return this;};OpenIDRequest.prototype.send=function(){if(!this.openidUrl)throw "openidUrl is a required parameter. Call setOpenIDUrl()";uri=this.calculateRedirectUrl();if(this.immediateMode){this.createHiddenIframe(uri);}else{if(this.popupWindow)throw "OpenID popup is already in progress";this.showPopup(uri);}this.logMetrics('requestSent');};OpenIDRequest.prototype.calculateRedirectUrl=function(a){var b=this.immediateMode?'checkid_immediate':'checkid_setup',c={'openid.mode':b},d;if(this.useCacheInfo()&&OpenIDRequest.cache[this.openidUrl]){d=OpenIDRequest.cache[this.openidUrl].url;var e=URI(URI(d).getQueryData()['openid.return_to']);e.addQueryData({context:OpenIDRequest.context,request_id:this.requestId});c['openid.return_to']=e.toString();}else{d='/openid/consumer_helper.php';c.user_claimed_id=this.openidUrl;c.context=OpenIDRequest.context;c.request_id=this.requestId;c.no_extensions=!this.useExtensions;}c.appdata=OpenIDRequest.appData;c.third_party_login=this.thirdPartyLogin;return URI(d).addQueryData(c).getQualifiedURI();};OpenIDRequest.prototype.createHiddenIframe=function(a){var b='openid_request_'+this.requestId,c=document.body.appendChild(document.createElement('div')),d=function(){c.innerHTML=('<iframe name="'+b+'"'+' src="'+a.toString()+'"'+' scrolling="no" '+' frameborder="0" class="hidden_elem"></iframe>');};if(ua.ie()){c.innerHTML='<iframe src="javascript:false"></iframe>';d.defer();}else d();};OpenIDRequest.prototype.showPopup=function(a){if(OpenIDRequest.cache[this.openidUrl])popupDimensions=OpenIDRequest.cache[this.openidUrl].popup_dimensions;if(typeof(popupDimensions)=="undefined"||!popupDimensions||!popupDimensions.height||!popupDimensions.width)popupDimensions={height:'580',width:'790'};var b={x:coalesce(window.screenX,window.screenLeft),y:coalesce(window.screenY,window.screenTop),width:coalesce(window.outerWidth,document.body.clientWidth),height:coalesce(window.outerHeight,document.body.clientHeight)},c=b.x+((b.width-popupDimensions.width)/2),d=b.y+((b.height-popupDimensions.height)/2),e=["location=yes","scrollbars=1","left="+c,"top="+d,"resizable=yes","height="+popupDimensions.height,"width="+popupDimensions.width].join(",");this.popupWindow=window.open(a.toString(),'_blank',e);this.popupPollInterval=setInterval(this.pollPopupWindow.bind(this),100);this.popupWindow.focus();};OpenIDRequest.prototype.pollPopupWindow=function(){if(!(this.popupPollInterval&&this.popupWindow))return;if(this.popupWindow.closed){clearInterval(this.popupPollInterval);this.cancel();}};OpenIDRequest.prototype.closePopupIfOpen=function(){if(this.popupWindow){if(this.popupPollInterval)clearInterval(this.popupPollInterval);this.popupWindow.close();}this.popupWindow=null;};OpenIDRequest.prototype.cancel=function(){this.closePopupIfOpen();if(this.cancelHandler)this.cancelHandler();this.logMetrics('requestCanceled');};OpenIDRequest.prototype.logMetrics=function(a){new AsyncSignal('/ajax/openid/metrics.php',{metric:a,immediate:this.immediateMode,context:OpenIDRequest.context,openid_url:this.openidUrl}).send();};OpenIDRequest.prototype.triggerCompleteAuthAsync=function(a){if(a.charAt(0)=='?'||a.charAt(0)=='&')a=a.substr(1);var b=URI.explodeQuery(a);this.closePopupIfOpen();if(b['openid.mode']=='cancel'){this.cancel();return;}if(this.intermediateHandler)this.intermediateHandler();this.asyncRequest.setData({openid_params:b}).send();};OpenIDRequest.prototype.asyncResponseHandler=function(a){var b=a.getPayload();if(this.successResponseHandler)this.successResponseHandler(b);this.closePopupIfOpen();};OpenIDRequest.prototype.cleanHandleResponse=function(a){if(a.css)a.css=$A(a.css);this.asyncRequest.handleResponse(a);};OpenIDRequest.prototype.asyncErrorHandler=function(a){this.closePopupIfOpen();if(a.error==1428010||a.error==1428011){this.cancel();return;}if(this.errorHandler)this.errorHandler(a);};OpenIDRequest.prototype.retry=function(){++this.retryCount;this.requestId=OpenIDRequest.maxRequestId++;this.send();};OpenIDRequest.prototype.useCacheInfo=function(){return (this.retryCount==0);};OpenIDRequest.setProviderCache=function(a){OpenIDRequest.cache=a;};OpenIDRequest.cache={};OpenIDRequest.requests=[];OpenIDRequest.maxRequestId=0;OpenIDRequest.context='default';OpenIDRequest.appData={};