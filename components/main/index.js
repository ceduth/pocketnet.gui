var main = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {};


		var roller = null, lenta = null, share = null, panel,leftpanel, uptimer = null;

		var videomain = false

		var upbutton = null, upbackbutton = null, plissing = null, searchvalue = '', searchtags = null, result, fixedBlock, openedpost = null;

		var currentMode = 'common', hsready = false, fixeddirection = null, external = null;

		var lastscroll = 0

		var addbuttonShowed = false

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var lastStickyRefresh = 0

		/*var mobilemodes = [{
			mode : 'leftshow',
			icon : 'fas fa-hashtag'
		},{
			mode : 'mainshow',
			icon : 'fas fa-home'
		},{
			mode : 'rightshow',
			icon : 'fas fa-arrow-right'
		}]

		var mobilemode = 'mainshow'*/

		var helpers = {
			
		}
		
		var actions = {
			
			refreshSticky : function(alv){

				

				var ns = self.app.lastScrollTop

				if(!hsready) initstick()

				if (hsready && (ns != lastStickyRefresh || alv)){

					lastStickyRefresh = ns

					if(alv){
						el.panel.hcSticky('refresh');
						el.leftpanel.hcSticky('refresh');

						console.log("REFRESH STICKY")

						/*setTimeout(function(){
							if(el.panel) el.panel.hcSticky('refresh');
							if(el.leftpanel) el.leftpanel.hcSticky('refresh');
						}, 300)*/
					}

					
				}
					
			},

			addbutton : function(){

				self.app.platform.ui.share()
			},

			addbuttonscroll  : function(){

				if (self.app.lastScrollTop > 400){
					if(!addbuttonShowed)
						el.addbutton.addClass('scrollactive')

					addbuttonShowed = true
				}
				else{

					if (addbuttonShowed)
						el.addbutton.removeClass('scrollactive')

					addbuttonShowed = false
				}
			},

			currentMode : function(){

				if(currentMode == 'recommended'){

					self.nav.api.history.addParameters({
						r : 'recommended'
					})

				}
				else{

					if(currentMode == 'sub'){

						self.nav.api.history.addParameters({
							r : 'sub'
						})

					}
					else{
						self.nav.api.history.removeParameters(['r'])
					}
				}

				renders.lentawithsearch()

				makeShare()

			},

			backtolenta : function(){
				actions.backtolentaClear()


				self.app.actions.scroll(lastscroll)
				//_scrollTop(lastscroll, null, 5)
				

			},

			backtolentaClear : function(){

				self.nav.api.history.removeParameters(['v'])

				el.c.removeClass('opensvishowed')

				renders.post(null)

				setTimeout(function(){

					renders.upbutton()
					
					actions.refreshSticky()

				}, 350)

				if(lenta && lenta.update) lenta.update()
			}	
		}

		var events = {

			
			currentMode : function(){
				currentMode = $(this).attr('lenta')

				actions.currentMode()
			},
			panelPosition : function(){

				actions.panelPosition()
			},

			up : function(){
				self.app.actions.scroll(0)
				//lastscroll = 0
			}

		}

		var makenext = function(type, start, count, clbk){

			var l = result[type].data.length;
			var L = result[type].count

			if(start + count <= l){
				return
			}

			if (start < l){
				var d = l - start;

				start = l;
				count = count - d;
			}
			
			if(start + count > L) count = L - start

			if(count <= 0) return

			load[type](function(data){

				if(clbk)
				{
					clbk(data)
				}

				else
				{
					renders[type](data)
				}

			}, start, count)	

		}

		var load = {
			posts : function(clbk, start, count){
				self.app.platform.sdk.search.get(searchvalue, 'posts', start, count, fixedBlock, function(r){

					clbk(r.data);

				})
			},
		}

		var renders = {

			addpanel : function(){

				self.app.user.isState(function(state){
					if(state){

						if(state && !isMobile()){
							el.addbutton.addClass('active')
						}
						else
						{
							el.addbutton.removeClass('active')
						}

					}
				})
			},

			
			share : function(){

				if(!isMobile() && !videomain && !searchvalue && !searchtags){

					el.c.removeClass('wshar')

					self.nav.api.load({

						open : true,
						id : 'share',
						el : el.share,
						animation : false,

						mid : 'sharemain',
						
						clbk : function(e, p){

							share = p

							actions.refreshSticky()

						},
						essenseData : {
							minimized : true,
							post : function(){
								if (plissing)
									plissing.destroy()
							}
						}

					})
				}else{
					el.c.addClass('wshar')
				}
			},

			topvideos: function (show) {
				
				if (show){

					el.topvideos.removeClass('hidden')
					
					self.app.platform.papi.horizontalLenta(el.topvideos, function (e,p) {

						external = p
						actions.refreshSticky()

					}, {
						caption : self.app.localization.e("Top videos") ,
						video: true,
						r : 'hot',
						loaderkey : 'recommended',
						shuffle : true,
						period : '4320',
						page : 0,
						openPostInWindowMobile : true,
						afterload : function(ed, s, e){

							if(e || !s.length) return

							ed.page++
						},
						ended : function(s){

							if(!s.length) return true
							return false

						},
						hasshares : function(shares){

							if (shares.length <= 2 && el.topvideos){
								el.topvideos.addClass('hidden')
							}
							
						},
	
						opensvi : isMobile() ? null : function(id, share){

							self.nav.api.load({
								open : true,
								href : 'index?video=1&v=' + id,
								history : true,
								handler : true
							})
							
						},

						compact : true
	
					})
				}

				else{

					if (external){
						external.destroy()
						external = null
					}

					el.topvideos.html('')
					//showmoreby.removeClass('hasshares')

					el.topvideos.addClass('hidden')
				}

				
			},

			leftpanel: function(){

				self.nav.api.load({

					open : true,
					id : 'leftpanel',
					el : el.leftpanel,
					animation : false,

					essenseData : {
					
						renderclbk : function(){
							actions.refreshSticky(true)
						},

						changed : function(){
							renders.lentawithsearch()
						},

						close : function(){
							showCategories(false)
						}
					},
					clbk : function(e, p){

						leftpanel = p;

					}

				})
			},

			panel : function(){

				if(videomain && !isMobile()) return

				self.nav.api.load({

					open : true,
					id : 'panel',
					el : el.panel,
					animation : false,

					essenseData : {
					
						renderclbk : function(){
							console.log("renderclbk")
							actions.refreshSticky(true)
	
						}
					},
					clbk : function(e, p){

						console.log("panelss")

						panel = p;
						
					}

				})
			},
			lentawithsearch : function(clbk, p){

				
				if(searchvalue){

					var value = searchvalue.replace('tag:', "#");

					var c = deep(self, 'app.modules.menu.module.showsearch')

					if (c)

						c(value)

					self.app.platform.sdk.search.get(searchvalue, 'posts', 0, 10, null, function(r, block){

						if (r.count){
							self.app.platform.sdk.activity.addsearch(searchvalue)
						}

						fixedBlock = block

						result = {
							posts : r
						};

						renders.lenta(clbk, p)
					})

				}
				else{
					result = {}
					fixedBlock = null

					var c = deep(self, 'app.modules.menu.module.showsearch')

					if (c){

						if(searchtags){

							var val = _.map(searchtags, function(w){return '#' + w}).join(' ')

							c(val)

							self.app.platform.sdk.activity.addtagsearch(val)

						}
						else{
							c('')
						}

					}

					renders.lenta(clbk, p)
				}
			},
			lenta : function(clbk, p){

				if(!p) p = {};

				var loader = null
				var fp = false

				if (lenta) {
					lenta.destroy()
				}

				renders.addpanel();

				if(searchvalue){
					loader = function(clbk){
						var _clbk = function(data){
							var shares = self.app.platform.sdk.node.shares.transform(data) 

							if (clbk)
								clbk(shares, null, {
									count : 10
								})
						}

						if(!fp){

							fp = true

							_clbk(result.posts.data)

						}

						else
						{
							makenext('posts', result.posts.data.length, 10, function(data){
								_clbk(data)
							})
						}
					}
				}
				
				self.nav.api.load({
					open : true,
					id : 'lenta',
					el : el.lenta,
					animation : false,

					mid : 'main',

					essenseData : {
						hr : 'index?',
						goback : p.goback,
						searchValue : searchvalue || null,
						search : searchvalue ? true : false,
						tags : searchtags,
						video : videomain && !isMobile(),
						videomobile : videomain && isMobile(),
						//window : isMobile() ? el.c.find('.lentacell') : el.w,
						page : 0,
						afterload : function(ed, s, e){

							if(!isMobile()) return

							if(e || !s.length) return

							ed.page++
						},
						opensvi : function(id){


							lastscroll = self.app.lastScrollTop

							el.c.addClass('opensvishowed')

							if (upbutton) upbutton.destroy()
							
							if (upbackbutton) upbackbutton.destroy()

							setTimeout(function(){
								upbackbutton = self.app.platform.api.upbutton(el.upbackbutton, {
									top : function(){
										/*if(isMobile() || isTablet() || window.cordova){
											return '135px'
										}*/
										return '65px'
									},
									rightEl : el.c.find('.lentacellsvi'),
									scrollTop : 0,
									click : function(a){
										actions.backtolenta()
									},

									icon : '<i class="fas fa-chevron-left"></i>',
									class : 'bright',
									text : 'Back'
								})	
							}, 50)
								
							setTimeout(function(){
								upbackbutton.apply()
							},300)

							renders.post(id)

							self.nav.api.history.addParameters({
								v : id
							})

							events.up()
						},

						renderClbk : function(){

							
							actions.refreshSticky()
						},
						loader : loader
					},
					clbk : function(e, p){

						renders.upbutton()

						actions.refreshSticky()

						lenta = p

						if (clbk)
							clbk()

					}

				})

			},

			upbutton : function(){
				if(upbutton) upbutton.destroy()

				if(isMobile()) return

				upbutton = self.app.platform.api.upbutton(el.up, {
					top : function(){
						return '65px'
					},
					rightEl : el.c.find('.leftpanelcell')
				})	
			},

			post : function(id){

				if(!el || !el.c) return

				if (!id){

					if (openedpost){
						
						openedpost.destroy()
						openedpost = null
					}

					el.c.find('.renderposthere').html('')

				}

				else{
					
					self.app.platform.papi.post(id, el.c.find('.renderposthere'), function(e, p){
						openedpost = p
					}, {
						video : true,
						autoplay : true,
						nocommentcaption : true,
						r : 'recommended',
						
						opensvi : function(id){


							if (openedpost){
						
								openedpost.destroy()
								openedpost = null
							}
		
							el.c.find('.renderposthere').html('')

							renders.post(id)

							self.app.actions.scroll(0)
						}
					})
				}

				
			},

			/*mobilemode : function(mode){

				if (mode){

					if (mobilemode == 'mainshow'){
						lastscroll = self.app.lastScrollTop
						self.app.actions.scroll(0)
					}

					mobilemode = mode
				}

				el.c.attr('mobilemode', mobilemode)


				setTimeout(function(){
					self.app.el.html.removeClass('scrollmodedown')
				}, 300)
				

				if (mobilemode == 'mainshow' && lastscroll){
					_scrollTop(lastscroll, null, 0)
				}
			},*/

			
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initstick = function(){
			if(!isMobile() && !isTablet() && !hsready){

				var t1 = 64
				var t2 = 76

				console.log("INITSTICKER!!!")

				if (el.leftpanel)
					el.leftpanel.hcSticky({
						stickTo: '#main',
						top : t1,
						bottom : 122
					});

				if (el.panel)
					el.panel.hcSticky({
						stickTo: '#main',
						top : t2,
						bottom : 122
					});

				hsready = true
			}
		}

		var initEvents = function(){

			self.app.events.scroll.main = actions.addbuttonscroll

			/*self.app.events.resize.mainpage = function(){
				setTimeout(function(){
					actions.refreshSticky(true)
				}, 500)
			}*/


			el.c.find('.backtolenta').on('click', actions.backtolenta)

			el.addbutton.on('click', actions.addbutton)

			if(!isMobile() && !isTablet()){

				if(!videomain) initstick()

			}
			else{


				
			}
			

		}

		var makePanel = function(){

			if(!isMobile()){
				renders.panel();
			}
				
			renders.leftpanel();

			renders.addpanel();
		}

		var makeShare = function(){

			self.app.user.isState(function(state){
				if(state){

					if(!isMobile()){

						if (currentMode == 'common')
						{
							renders.share()
							el.c.find('.bgCaption').removeClass('hidden')
						}
						else
						{
							el.share.html('')
							el.c.find('.bgCaption').addClass('hidden')
						}

					}
				}

			})
			
			
		}

		var make = function(clbk, p){

			localStorage['lentakey'] = parameters().r || 'index'
			
			if (parameters().video){
				localStorage['lentakey'] = 'video'
			}

			renders.lentawithsearch(clbk, p)

			makeShare()

			makePanel()

			if (currentMode == 'common' && !videomain && !searchvalue && !searchtags)
				renders.topvideos(true)
			else{
				renders.topvideos(false)
			}

			
				
		}

		var showCategories = function(t){
			if (el.c && isMobile()){

				self.app.mobile.vibration.small()

				if (t){
					el.c.addClass('leftshowed')
					self.app.actions.offScroll()
				}
				else{
					el.c.removeClass('leftshowed')
					self.app.actions.onScroll()
				}
				
			}
		}
		
		return {
			primary : primary,

			parametersHandler : function(clbk){

				var tgsi = decodeURI(parameters().sst || '')

				var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
					return r
				}));

				var nsearchtags = words.length ? words : null
				var nsearchvalue = parameters().ss || ''
				var ncurrentMode = parameters().r || 'common';
				var nlentakey = parameters().video ? 'video' : (parameters().r || 'index')
				var nvideomain = nlentakey == 'video'
				var page = parameters().page

				var changes = false


				localStorage['lentakey'] = nlentakey

				if (currentMode != ncurrentMode){
					currentMode = ncurrentMode; changes = true
				}

				if (videomain != nvideomain){
					videomain = nvideomain; changes = true
				}

				if (searchvalue != nsearchvalue){
					searchvalue = nsearchvalue; changes = true
				}

				if (searchtags != nsearchtags){
					searchtags = nsearchtags; changes = true
				}

				if(page) changes = true

				if (videomain){

					el.c.addClass('videomain')

					if(!parameters().v){
						actions.backtolenta()
					}
				}
				else{
					el.c.removeClass('videomain')
					actions.backtolentaClear()
				}

				if (changes){
					renders.topvideos(currentMode == 'common' && !videomain && !searchvalue && !searchtags)

					

					if (lenta) {
						lenta.destroy()
						lenta = null
					}
	
					renders.lentawithsearch()
					makePanel()
					makeShare()

					actions.refreshSticky()

					if (clbk)
						clbk()
				}

				
				if (lenta) {
					lenta.hideshowedvideo()
				}
				
				
				

				//renders.leftpanel() ?

				

				

			},

			

			authclbk : function(){

				if(typeof el != 'undefined' && el.c){

					el.c.find('.bgCaption').removeClass('hidden')

					makeShare()

					

					actions.refreshSticky()
				}
				
			},

			getdata : function(clbk, p){

				hsready = false;

				var _s = parameters()

				if (_s.r){
					currentMode = _s.r
				}
				else{
					currentMode = 'common'
				}

				beginmaterial = _s.s || _s.i || _s.v || null;

				
				if((!beginmaterial && !_s.ss && !_s.sst && !p.state && (window.cordova || self.app.platform.matrixchat.connectWith))){
					
					self.nav.api.load({
						open : true,
						href : 'welcome',
						history : true,
						replaceState : true
					})

					return
				}

				if(self.app.curation()){
					
					self.nav.api.load({
						open : true,
						href : 'userpage?pc=1',
						history : true,
						replaceState : true
					})

					return
				}

				if(_s.v && (isMobile() || window.cordova)){

					self.nav.api.load({
						open : true,
						href : 'post?s=' + _s.v,
						history : true,
						replaceState : true
					})

					return 
				}

				if(p.state && primary && !self.app.user.validate()){

					self.nav.api.load({
						open : true,
						href : 'userpage?id=test',
						history : true,
						replaceState : true
					})

					return
				}
				
				var data = {
					
				};
			
		
				clbk(data);
				

			},

			destroy : function(){

				

				showCategories(false)

				delete self.app.events.scroll.main
				delete self.app.events.resize.mainpage
					

				renders.post(null)

				hsready = false

				//searchvalue = '', searchtags = null

				if (plissing)
					plissing.destroy()

				if (upbutton)
					upbutton.destroy()

					upbutton = null

				if (upbackbutton)
					upbackbutton.destroy()

					upbackbutton = null
				
				if (roller)
					roller.destroy()


				if (lenta){
					lenta.destroy()
				}

				if (share){
					share.destroy()
				}

				if (panel){
					panel.destroy()
				}

				if (openedpost){
					openedpost.clearessense()
					openedpost = null
				}

				if (external){
					external.clearessense()
					external = null
				}

				if (leftpanel){
					leftpanel.destroy()
					leftpanel = null
				}

				lastscroll = 0
				leftpanel = null
				panel = null
				roller = null
				lenta = null
				share = null
				videomain = false
				fixeddirection = null
				addbuttonShowed = false

				if(el.c) el.c.empty()

				el = {}
				
				if (self.app.scrolling){
	
					_.each(self.app.scrolling.clbks, function(c){
						c(0)
					})
	
				}
			},

			showCategories : function(show){

				showCategories(show)
			},
			
			init : function(p){
				

				roller = null
				lenta = null
				fixeddirection = null
				lastStickyRefresh = 0

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.share = el.c.find('.share');
				el.lenta = el.c.find('.lentaWrapper');
				el.lentacell =  el.c.find('.lentacell')
				el.panel = el.c.find('.panel');
				el.leftpanel = el.c.find('.leftpanel');
				el.up = el.c.find('.upbuttonwrapper')
				el.upbackbutton = el.c.find('.upbackbuttonwrapper')
				el.addbutton = el.c.find('.addbutton')
				el.slwork = el.c.find('.maincntwrapper >div.work')
				el.topvideos = el.c.find('.topvideosWrapper')

				//self.app.el.footer.addClass('workstation')

				initEvents();

				if(!p.goback){
					searchvalue = parameters().ss || ''

					var tgsi = decodeURI(parameters().sst || '')

					var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
						return r
					}));

					searchtags = words.length ? words : null

					fixedBlock = null
					result = {}
				}

				videomain = parameters().video ? true : false

				if(videomain && !isMobile()){
					el.c.addClass('videomain')
				}

				make(function(){
					p.clbk(null, p);
				}, p)

				
				
			}
		}
	};

	self.showCategories = function(sh){
		_.each(essenses, function(essense){

			essense.showCategories(sh);

		})
	}

	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		var d = null;

		_.each(essenses, function(essense){

			var _d = essense.destroy();

			if (_d) d = _d;

		})

		return d;

	}

	self.authclbk = function(){
		_.each(essenses, function(e){
			e.authclbk()
		})
	} 

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = main;
}
else{

	app.modules.main = {};
	app.modules.main.module = main;

}