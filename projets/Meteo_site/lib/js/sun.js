Date.prototype.sunrise=function(t,a,e){return this.sunriseSet(t,a,!0,e)},Date.prototype.sunset=function(t,a,e){return this.sunriseSet(t,a,!1,e)},Date.prototype.sunriseSet=function(t,a,e,n){n||(n=90.8333);var h,r,o,s,M,D,i,u,g,c=a/Date.DEGREES_PER_HOUR,E=this.getDayOfYear();o=(r=.9856*(h=e?E+(6-c)/24:E+(18-c)/24)-3.289)+1.916*Math.sinDeg(r)+.02*Math.sinDeg(2*r)+282.634,o=Math.mod(o,360),s=.91764*Math.tanDeg(o),M=360/(2*Math.PI)*Math.atan(s),M=Math.mod(M,360),M+=90*Math.floor(o/90)-90*Math.floor(M/90),M/=Date.DEGREES_PER_HOUR,D=.39782*Math.sinDeg(o),i=Math.cosDeg(Math.asinDeg(D)),cosLocalHourAngle=(Math.cosDeg(n)-D*Math.sinDeg(t))/(i*Math.cosDeg(t)),u=Math.acosDeg(cosLocalHourAngle),e&&(u=360-u),g=u/Date.DEGREES_PER_HOUR+M-.06571*h-6.622-a/Date.DEGREES_PER_HOUR,g=Math.mod(g,24);var f=new Date(0);f.setUTCFullYear(this.getUTCFullYear()),f.setUTCMonth(this.getUTCMonth()),f.setUTCDate(this.getUTCDate());var R=f.getTime()+60*g*60*1e3;return new Date(R)},Date.DEGREES_PER_HOUR=15,Date.prototype.getDayOfYear=function(){var t=new Date(this.getFullYear(),0,1);return Math.ceil((this-t)/864e5)},Math.degToRad=function(t){return t*Math.PI/180},Math.radToDeg=function(t){return 180*t/Math.PI},Math.sinDeg=function(t){return Math.sin(2*t*Math.PI/360)},Math.acosDeg=function(t){return 360*Math.acos(t)/(2*Math.PI)},Math.asinDeg=function(t){return 360*Math.asin(t)/(2*Math.PI)},Math.tanDeg=function(t){return Math.tan(2*t*Math.PI/360)},Math.cosDeg=function(t){return Math.cos(2*t*Math.PI/360)},Math.mod=function(t,a){var e=t%a;return e<0&&(e+=a),e};
