(globalThis.webpackChunkpeertube_client=globalThis.webpackChunkpeertube_client||[]).push([[291],{4994:t=>{"function"==typeof Object.create?t.exports=function(t,i){i&&(t.super_=i,t.prototype=Object.create(i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,i){if(i){t.super_=i;var h=function(){};h.prototype=i.prototype,t.prototype=new h,t.prototype.constructor=t}}},1750:(t,i,h)=>{var s=h(8823),r=s.Buffer;function _(t,i){for(var h in t)i[h]=t[h]}function e(t,i,h){return r(t,i,h)}r.from&&r.alloc&&r.allocUnsafe&&r.allocUnsafeSlow?t.exports=s:(_(s,i),i.Buffer=e),_(r,e),e.from=function(t,i,h){if("number"==typeof t)throw new TypeError("Argument must not be a number");return r(t,i,h)},e.alloc=function(t,i,h){if("number"!=typeof t)throw new TypeError("Argument must be a number");var s=r(t);return void 0!==i?"string"==typeof h?s.fill(i,h):s.fill(i):s.fill(0),s},e.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return r(t)},e.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return s.SlowBuffer(t)}},1775:(t,i,h)=>{var s=h(1750).Buffer;function r(t,i){this._block=s.alloc(t),this._finalSize=i,this._blockSize=t,this._len=0}r.prototype.update=function(t,i){"string"==typeof t&&(i=i||"utf8",t=s.from(t,i));for(var h=this._block,r=this._blockSize,_=t.length,e=this._len,n=0;n<_;){for(var o=e%r,a=Math.min(_-n,r-o),l=0;l<a;l++)h[o+l]=t[n+l];n+=a,(e+=a)%r==0&&this._update(h)}return this._len+=_,this},r.prototype.digest=function(t){var i=this._len%this._blockSize;this._block[i]=128,this._block.fill(0,i+1),i>=this._finalSize&&(this._update(this._block),this._block.fill(0));var h=8*this._len;if(h<=4294967295)this._block.writeUInt32BE(h,this._blockSize-4);else{var s=(4294967295&h)>>>0,r=(h-s)/4294967296;this._block.writeUInt32BE(r,this._blockSize-8),this._block.writeUInt32BE(s,this._blockSize-4)}this._update(this._block);var _=this._hash();return t?_.toString(t):_},r.prototype._update=function(){throw new Error("_update must be implemented by subclass")},t.exports=r},1291:(t,i,h)=>{var s=t.exports=function(t){t=t.toLowerCase();var i=s[t];if(!i)throw new Error(t+" is not supported (we accept pull requests)");return new i};s.sha=h(4796),s.sha1=h(6029),s.sha224=h(138),s.sha256=h(9470),s.sha384=h(5055),s.sha512=h(4006)},4796:(t,i,h)=>{var s=h(4994),r=h(1775),_=h(1750).Buffer,e=[1518500249,1859775393,-1894007588,-899497514],n=new Array(80);function o(){this.init(),this._w=n,r.call(this,64,56)}function a(t){return t<<30|t>>>2}function l(t,i,h,s){return 0===t?i&h|~i&s:2===t?i&h|i&s|h&s:i^h^s}s(o,r),o.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},o.prototype._update=function(t){for(var i,h=this._w,s=0|this._a,r=0|this._b,_=0|this._c,n=0|this._d,o=0|this._e,f=0;f<16;++f)h[f]=t.readInt32BE(4*f);for(;f<80;++f)h[f]=h[f-3]^h[f-8]^h[f-14]^h[f-16];for(var u=0;u<80;++u){var c=~~(u/20),p=0|((i=s)<<5|i>>>27)+l(c,r,_,n)+o+h[u]+e[c];o=n,n=_,_=a(r),r=s,s=p}this._a=s+this._a|0,this._b=r+this._b|0,this._c=_+this._c|0,this._d=n+this._d|0,this._e=o+this._e|0},o.prototype._hash=function(){var t=_.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},t.exports=o},6029:(t,i,h)=>{var s=h(4994),r=h(1775),_=h(1750).Buffer,e=[1518500249,1859775393,-1894007588,-899497514],n=new Array(80);function o(){this.init(),this._w=n,r.call(this,64,56)}function a(t){return t<<5|t>>>27}function l(t){return t<<30|t>>>2}function f(t,i,h,s){return 0===t?i&h|~i&s:2===t?i&h|i&s|h&s:i^h^s}s(o,r),o.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},o.prototype._update=function(t){for(var i,h=this._w,s=0|this._a,r=0|this._b,_=0|this._c,n=0|this._d,o=0|this._e,u=0;u<16;++u)h[u]=t.readInt32BE(4*u);for(;u<80;++u)h[u]=(i=h[u-3]^h[u-8]^h[u-14]^h[u-16])<<1|i>>>31;for(var c=0;c<80;++c){var p=~~(c/20),b=a(s)+f(p,r,_,n)+o+h[c]+e[p]|0;o=n,n=_,_=l(r),r=s,s=b}this._a=s+this._a|0,this._b=r+this._b|0,this._c=_+this._c|0,this._d=n+this._d|0,this._e=o+this._e|0},o.prototype._hash=function(){var t=_.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},t.exports=o},138:(t,i,h)=>{var s=h(4994),r=h(9470),_=h(1775),e=h(1750).Buffer,n=new Array(64);function o(){this.init(),this._w=n,_.call(this,64,56)}s(o,r),o.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},o.prototype._hash=function(){var t=e.allocUnsafe(28);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t},t.exports=o},9470:(t,i,h)=>{var s=h(4994),r=h(1775),_=h(1750).Buffer,e=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],n=new Array(64);function o(){this.init(),this._w=n,r.call(this,64,56)}function a(t,i,h){return h^t&(i^h)}function l(t,i,h){return t&i|h&(t|i)}function f(t){return(t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10)}function u(t){return(t>>>6|t<<26)^(t>>>11|t<<21)^(t>>>25|t<<7)}function c(t){return(t>>>7|t<<25)^(t>>>18|t<<14)^t>>>3}s(o,r),o.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},o.prototype._update=function(t){for(var i,h=this._w,s=0|this._a,r=0|this._b,_=0|this._c,n=0|this._d,o=0|this._e,p=0|this._f,b=0|this._g,w=0|this._h,d=0;d<16;++d)h[d]=t.readInt32BE(4*d);for(;d<64;++d)h[d]=0|(((i=h[d-2])>>>17|i<<15)^(i>>>19|i<<13)^i>>>10)+h[d-7]+c(h[d-15])+h[d-16];for(var B=0;B<64;++B){var y=w+u(o)+a(o,p,b)+e[B]+h[B]|0,E=f(s)+l(s,r,_)|0;w=b,b=p,p=o,o=n+y|0,n=_,_=r,r=s,s=y+E|0}this._a=s+this._a|0,this._b=r+this._b|0,this._c=_+this._c|0,this._d=n+this._d|0,this._e=o+this._e|0,this._f=p+this._f|0,this._g=b+this._g|0,this._h=w+this._h|0},o.prototype._hash=function(){var t=_.allocUnsafe(32);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t.writeInt32BE(this._h,28),t},t.exports=o},5055:(t,i,h)=>{var s=h(4994),r=h(4006),_=h(1775),e=h(1750).Buffer,n=new Array(160);function o(){this.init(),this._w=n,_.call(this,128,112)}s(o,r),o.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},o.prototype._hash=function(){var t=e.allocUnsafe(48);function i(i,h,s){t.writeInt32BE(i,s),t.writeInt32BE(h,s+4)}return i(this._ah,this._al,0),i(this._bh,this._bl,8),i(this._ch,this._cl,16),i(this._dh,this._dl,24),i(this._eh,this._el,32),i(this._fh,this._fl,40),t},t.exports=o},4006:(t,i,h)=>{var s=h(4994),r=h(1775),_=h(1750).Buffer,e=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],n=new Array(160);function o(){this.init(),this._w=n,r.call(this,128,112)}function a(t,i,h){return h^t&(i^h)}function l(t,i,h){return t&i|h&(t|i)}function f(t,i){return(t>>>28|i<<4)^(i>>>2|t<<30)^(i>>>7|t<<25)}function u(t,i){return(t>>>14|i<<18)^(t>>>18|i<<14)^(i>>>9|t<<23)}function c(t,i){return(t>>>1|i<<31)^(t>>>8|i<<24)^t>>>7}function p(t,i){return(t>>>1|i<<31)^(t>>>8|i<<24)^(t>>>7|i<<25)}function b(t,i){return(t>>>19|i<<13)^(i>>>29|t<<3)^t>>>6}function w(t,i){return(t>>>19|i<<13)^(i>>>29|t<<3)^(t>>>6|i<<26)}function d(t,i){return t>>>0<i>>>0?1:0}s(o,r),o.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},o.prototype._update=function(t){for(var i=this._w,h=0|this._ah,s=0|this._bh,r=0|this._ch,_=0|this._dh,n=0|this._eh,o=0|this._fh,B=0|this._gh,y=0|this._hh,E=0|this._al,v=0|this._bl,I=0|this._cl,g=0|this._dl,m=0|this._el,k=0|this._fl,U=0|this._gl,S=0|this._hl,x=0;x<32;x+=2)i[x]=t.readInt32BE(4*x),i[x+1]=t.readInt32BE(4*x+4);for(;x<160;x+=2){var A=i[x-30],z=i[x-30+1],T=c(A,z),C=p(z,A),j=b(A=i[x-4],z=i[x-4+1]),O=w(z,A),q=i[x-14],L=i[x-14+1],M=i[x-32],D=i[x-32+1],F=C+L|0,G=T+q+d(F,C)|0;G=(G=G+j+d(F=F+O|0,O)|0)+M+d(F=F+D|0,D)|0,i[x]=G,i[x+1]=F}for(var H=0;H<160;H+=2){G=i[H],F=i[H+1];var J=l(h,s,r),K=l(E,v,I),N=f(h,E),P=f(E,h),Q=u(n,m),R=u(m,n),V=e[H],W=e[H+1],X=a(n,o,B),Y=a(m,k,U),Z=S+R|0,$=y+Q+d(Z,S)|0;$=($=($=$+X+d(Z=Z+Y|0,Y)|0)+V+d(Z=Z+W|0,W)|0)+G+d(Z=Z+F|0,F)|0;var tt=P+K|0,it=N+J+d(tt,P)|0;y=B,S=U,B=o,U=k,o=n,k=m,n=_+$+d(m=g+Z|0,g)|0,_=r,g=I,r=s,I=v,s=h,v=E,h=$+it+d(E=Z+tt|0,Z)|0}this._al=this._al+E|0,this._bl=this._bl+v|0,this._cl=this._cl+I|0,this._dl=this._dl+g|0,this._el=this._el+m|0,this._fl=this._fl+k|0,this._gl=this._gl+U|0,this._hl=this._hl+S|0,this._ah=this._ah+h+d(this._al,E)|0,this._bh=this._bh+s+d(this._bl,v)|0,this._ch=this._ch+r+d(this._cl,I)|0,this._dh=this._dh+_+d(this._dl,g)|0,this._eh=this._eh+n+d(this._el,m)|0,this._fh=this._fh+o+d(this._fl,k)|0,this._gh=this._gh+B+d(this._gl,U)|0,this._hh=this._hh+y+d(this._hl,S)|0},o.prototype._hash=function(){var t=_.allocUnsafe(64);function i(i,h,s){t.writeInt32BE(i,s),t.writeInt32BE(h,s+4)}return i(this._ah,this._al,0),i(this._bh,this._bl,8),i(this._ch,this._cl,16),i(this._dh,this._dl,24),i(this._eh,this._el,32),i(this._fh,this._fl,40),i(this._gh,this._gl,48),i(this._hh,this._hl,56),t},t.exports=o}}]);
//# sourceMappingURL=291.chunk.js.map