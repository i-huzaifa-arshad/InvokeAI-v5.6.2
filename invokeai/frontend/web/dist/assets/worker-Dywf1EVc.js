(function(){"use strict";const g=(e,t,i)=>{let s=t,r=i,o=-1,d=-1,c=0,y=!0;const m=new Uint8ClampedArray(e);for(let a=0;a<i;a++)for(let n=0;n<t;n++)c=m[(a*t+n)*4+3]??0,c>0&&(y=!1,n<s&&(s=n),n>o&&(o=n),a<r&&(r=a),a>d&&(d=a));return y?null:{minX:s,minY:r,maxX:o+1,maxY:d+1}},p=[];let l=null;function f(e,t,i){const s={type:"log",data:{level:e,message:t,ctx:i}};self.postMessage(s)}function u(){const e=p.shift();if(!e){l=null;return}if(f("debug","Processing task",{type:e.type,id:e.data.id}),e.started=performance.now(),l=e,e.type==="get_bbox"){const{buffer:t,width:i,height:s,id:r}=e.data,o=g(t,i,s),d={type:"extents",data:{id:r,extents:o}};e.finished=performance.now(),f("debug","Task complete",{type:e.type,id:e.data.id,started:e.started,finished:e.finished,durationMs:e.finished-e.started}),self.postMessage(d)}else f("error","Unknown task type",{type:e.type});u()}self.onmessage=e=>{const t=e.data;f("debug","Received task",{type:t.type,id:t.data.id}),p.push({...e.data,started:null,finished:null}),l||u()}})();
