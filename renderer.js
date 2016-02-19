/*! SoftwareRenderer - ver. 0.1.0 */
OBJmodel=function(){function a(){}return a.prototype={verts:[],faces:[],normals:[],texcoords:[]},a.parse=function(a){for(var b=function(b){return a[b].split(" ").splice(1,3)},c=0;c<a.length;c++)switch(a[c].substr(0,2)){case"v ":this.prototype.verts.push(new f32x4(b(c)));break;case"vn":this.prototype.normals.push(new f32x4(b(c)));break;case"vt":this.prototype.texcoords.push(new f32x4(b(c)));break;case"f ":for(var d=b(c),e=0;3>e;e++)d[e]=d[e].split("/").map(function(a){return parseInt(a-1)});this.prototype.faces.push(d)}return console.log("total verts: "+this.prototype.verts.length),console.log("total normals: "+this.prototype.normals.length),console.log("total faces: "+this.prototype.faces.length),this.prototype},a}(),viewport=function(a,b,c,d){var e=Matrix();return e[0][3]=a+c/2,e[1][3]=b+d/2,e[2][3]=1,e[0][0]=c/2,e[1][1]=d/2,e[2][2]=0,e},projection=function(a){var b=Matrix();return b[3][2]=a,b},lookat=function(a,b,c){for(var d=normalize(vecSub(a,b)),e=normalize(cross(c,d)),f=normalize(cross(d,e)),g=Matrix(),h=Matrix(),i=0;3>i;i++)g[0][i]=e[i],g[1][i]=f[i],g[2][i]=d[i],h[i][3]=-b[i];ModelView=Minv*Tr},Matrix=function(){function a(){}return a.identity=function(){return[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]},a.mul=function(a,b){var c=[];return c},a.rotation=function(a,b,c,d){return[[1-2*b*b-2*c*c,2*a*b+2*c*d,2*a*c-2*b*d,0],[2*a*b-2*c*d,1-2*a*a-2*c*c,2*c*b+2*a*d,0],[2*a*c+2*b*d,2*c*b-2*a*d,1-2*a*a-2*b*b,0],[0,0,0,1]]},a}(),Vec3=function(){function a(){}return a.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},a.cross=function(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]},a.dist=function(a){for(var b=0,c=0;c<a.length;c++)b+=a[c]*a[c];return m.sqrt(b)},a.normalize=function(b){var c=1/a.dist(b);return[b[0]*c,b[1]*c,b[2]*c]},a}(),orient2d=function(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])},barycentric=function(a,b){var c=a[0],d=a[1],e=a[2],f=[d[0]-c[0],d[1]-c[1],d[2]-c[2]],g=[e[0]-c[0],e[1]-c[1],e[2]-c[2]],h=[b[0]-c[0],b[1]-c[1],b[2]-c[2]],i=1/(f[0]*g[1]-g[0]*f[1]);return v=(h[0]*g[1]-g[0]*h[1])*i,w=(f[0]*h[1]-h[0]*f[1])*i,u=1-v-w,[u,v,w]},Buffer=function(){function a(a,b,c){this.ctx=a,this.w=b,this.h=c,this.calls=0,this.pixels=0,this.imgData=a.createImageData(this.w,this.h),this.buf=new ArrayBuffer(this.imgData.data.length),this.buf8=new Uint8ClampedArray(this.buf),this.buf32=new Uint32Array(this.buf),this.zbuf=new Uint32Array(this.imgData.data.length)}return a.prototype={clear:function(a){for(var b=0;b<=this.h;b++)for(var c=0;c<this.w;c++){var d=this.index(c,b);this.set(c,b,a),this.zbuf[d]=0}},index:function(a,b){return(this.h-b)*this.w+a},set:function(a,b,c){var d=c[0]|c[1]<<8|c[2]<<16;this.buf32[this.index(a,b)]=4278190080|d},get:function(a,b){return this.buf32[this.index(a,b)]},triangle:function(a,b){for(var c=[a[0][0],a[1][0],a[2][0]],d=[a[0][1],a[1][1],a[2][1]],e=[a[0][2],a[1][2],a[2][2]],f=[this.w+1,this.h+1],g=[-1,-1],h=0;h<c.length;h++)for(var i=0;2>i;i++)f[i]=m.min(c[h][i],f[i]),g[i]=m.max(c[h][i],g[i]);if(!(f[0]>this.w||g[0]<0||f[1]>this.h||g[1]<0))for(var j,k,l,n,o,p=c[0][1]-c[1][1],q=c[1][0]-c[0][0],r=c[1][1]-c[2][1],s=c[2][0]-c[1][0],t=c[2][1]-c[0][1],u=c[0][0]-c[2][0],v=orient2d(c[1],c[2],f),w=orient2d(c[2],c[0],f),x=orient2d(c[0],c[1],f),y=[0,0,0],z=0,A=f[1];A<=g[1];A++){for(var B=[v,w,x],C=f[0];C<=g[0];C++)if(this.pixels++,B[0]+=r,B[1]+=t,B[2]+=p,!(B[0]<r||B[1]<t||B[2]<p)){bc=barycentric(c,[C,A,z]),z=0;for(var h=0;3>h;h++)z+=c[h][2]*bc[h];var D=this.index(C,A);if(this.zbuf[D]<z){var j,k,l,n,o;j=bc[0]*d[0][0]+bc[1]*d[1][0]+bc[2]*d[2][0],k=bc[0]*d[0][1]+bc[1]*d[1][1]+bc[2]*d[2][1],l=bc[0]*e[0][0]+bc[1]*e[1][0]+bc[2]*e[2][0],n=bc[0]*e[0][1]+bc[1]*e[1][1]+bc[2]*e[2][1],o=bc[0]*e[0][2]+bc[1]*e[1][2]+bc[2]*e[2][2];var E=b.fragment([[j,k],[n,l,o]],y);if(!E){this.zbuf[D]=z,this.set(C,A,y),this.calls++}}}v+=s,w+=u,x+=q}},draw:function(){this.imgData.data.set(this.buf8),this.ctx.putImageData(this.imgData,0,0)}},a}(),Effect=function(){function a(){}return a.prototype={vertex:function(a){},fragment:function(a,b){},setParameters:function(a){var b=this;Object.keys(a).map(function(c){b[c]=a[c]})}},a}(),Texture=function(){function a(a){this.texData=null,this.buf32=null,this.source=a,this.load()}return a.prototype={load:function(){img=new Image,img.src=this.source;var a=this;img.onload=function(){texCanvas=document.createElement("canvas"),ctx=texCanvas.getContext("2d"),texCanvas.width=img.width,texCanvas.height=img.height,ctx.drawImage(img,0,0),img.style.display="none",a.texData=ctx.getImageData(0,0,img.width,img.height);var b=new ArrayBuffer(a.texData.data.length);a.buf32=new Uint32Array(b);for(var c=0;c<a.buf32.length;c++){var d=a.texData.data,e=c<<2;a.buf32[c]=d[e]|d[e+1]<<8|d[e+2]<<16|d[e+3]<<24}}},sample:function(a,b){this.texData.data;const c=m.floor(b[0]*this.texData.width),d=m.floor(b[1]*this.texData.height);return i=(this.texData.height-d)*this.texData.width+c,smp=this.buf32[i],new Uint8Array([smp,smp>>8,smp>>16,smp>>24])}},a}(),ContentManager=function(){function a(){}function b(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a,!0),d.onload=function(){200==d.status?b(d.response):c(Error(d.statusText))},d.onerror=c,d.send(null)})}function c(a){console.error("request failed!")}function d(){h++,console.log("requests done:",h),h==i&&(console.info("All content is ready"),g())}function e(a,e){var f=function(a){null!=e&&(lines=a.split("\n"),model=OBJmodel.parse(lines),j[e]=model,d())};return b(a).then(f,c)}function f(a,b){console.log("Effect");var c=document.createElement("script");c.src=a,c.onload=function(){null!=b&&b(),d()},document.head.appendChild(c)}var g,h=0,i=0,j={};return a.prototype={load:function(a){return function(b,c){switch(c="undefined"!=typeof c?c:null,a){case"Model":return e(b,c);case"Texture":return loadTexture(b,c);case"Effect":return f(b,c)}}},contentCollection:function(){return j},finishedLoading:function(a){a||(a={}),i=a.numRequest||0,a.callback&&(g=a.callback)}},a}(),Renderer=function(){function a(){}var b,c,d;return drawImage=function(){b.clear([255,255,255]),start=new Date,c.setParameters({r:theta});for(var a=0;a<d.faces.length;a++){for(var e=d.faces[a],f=[],g=0;3>g;g++){var h=d.verts[e[g][0]],i=d.texcoords.length>0?d.texcoords[e[g][1]]:[0,0],j=d.normals.length>0?d.normals[e[g][2]]:[1,0,0],k=[h,i,j],l=c.vertex(k);f.push(l)}b.triangle(f,c)}b.draw(),theta+=.001*((new Date).getTime()-start.getTime());var m="Frame took "+((new Date).getTime()-start.getTime())+" ms",n="Pixels drawn/found "+b.calls+"/"+b.pixels;doc.getElementById("info").innerHTML=m+"<br/>"+n,b.calls=0,b.pixels=0,requestAnimationFrame(function(){drawImage()})},a.prototype={modelReady:function(a,e){console.log("ready to render!"),d=a.model,c=new DefaultEffect;var f=new Texture("assets/obj/diablo3/diablo3_pose_diffuse.png"),g=e.getContext("2d"),h=doc.getElementById("render_start");b=new Buffer(g,e.width,e.height),c.setParameters({scr_w:b.w,scr_h:b.h,texture:f}),h.style.display="block",h.onclick=function(){console.log("Begin render!"),startProfile=new Date,drawImage()}}},a}();