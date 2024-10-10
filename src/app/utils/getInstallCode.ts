import { WidgetProps } from '../widget/types';
import { uniqID } from './uniqID';

export function getInstallCode(settings: WidgetProps) {
  const widgetId = uniqID();
  return `<div id='widget-${widgetId}'></div>
<script>
\tfunction installStyles(){let e=${window.location.origin}+"/public/style.css",t=document.querySelector('link[href="'+e+'"]');if(!t){let l=document.createElement("link");l.rel="stylesheet",l.href=e,document.head.appendChild(l)}}function installScript(e){let t=${window.location.origin}+"/public/bundle.js",l=document.querySelector('script[src="'+t+'"]');if(l)e();else{let i=document.createElement("script");i.src=t,i.addEventListener("load",e),document.head.appendChild(i)}}document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector('#widget-'+"${widgetId}");e&&(installStyles(),installScript(()=>{Widget.createWidget(e,${JSON.stringify(settings)})}))});
</script>`;
}
