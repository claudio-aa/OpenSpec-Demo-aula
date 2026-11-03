import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { drawDiagram, drawTrialChart } from './diagrams.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const runtime = process.env.RUNTIME_ROOT || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies');
process.env.RUNTIME_NODE_MODULES ||= path.join(runtime, 'node/node_modules');
const skill = process.env.PRESENTATIONS_SKILL || path.join(os.homedir(), '.codex/plugins/cache/openai-primary-runtime/presentations/26.1026.10807/skills/presentations');
const { Presentation, PresentationFile } = await import(pathToFileURL(path.join(process.env.RUNTIME_NODE_MODULES, '@oai/artifact-tool/dist/artifact_tool.mjs')).href).catch(async () => {
  const { createRequire } = await import('node:module');
  const require = createRequire(path.join(process.env.RUNTIME_NODE_MODULES, '__runtime__.cjs'));
  return import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
});
const { resolvePresentationFont, finalizePresentation, applyPresentationChartFont } = await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const font = resolvePresentationFont();
const build = path.join(here,'.build');
await fs.mkdir(build,{recursive:true});
await fs.mkdir(path.join(here,'output'),{recursive:true});
const data = JSON.parse(await fs.readFile(path.join(here,'slides.json'),'utf8'));
const deck = Presentation.create({slideSize:{width:1280,height:720}});
const C = {ink:'#101B20',muted:'#526269',paper:'#F7F8F4',teal:'#007A79',light:'#A7E6DD',white:'#FFFFFF'};
function text(s,value,x,y,w,h,size=28,color=C.ink,bold=false){
  const el = s.shapes.add({geometry:'textbox',name:`text-${s.shapes.items.length}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  el.text=value;
  el.text.style={typeface:font,fontSize:size,color,bold,wrap:'square',autoFit:'none',insets:0,verticalAlignment:'top'};
  return el;
}
function header(s,d,i,dark=false){
  const fg=dark?C.white:C.ink;
  if(d.block) text(s,d.block,70,30,1130,25,18,dark?C.light:C.teal,true);
  text(s,d.title,70,60,1130,110,44,fg,true);
  text(s,String(i+1).padStart(2,'0'),70,664,70,22,17,dark?C.light:C.muted);
  text(s,d.time,1050,664,170,24,17,dark?C.light:C.muted);
}
function bottom(s,value,dark=false){if(value)text(s,value,70,600,1140,55,23,dark?C.light:C.teal,true);}
function nativeTable(s,d){
  const rows=[d.headers,...d.rows];
  const widths=d.widths || (d.headers.length===2?[680,460]:[245,430,465]);
  const t=s.tables.add({rows:rows.length,columns:d.headers.length,left:70,top:190,width:1140,height:340,columnWidths:widths,values:rows});
  t.borders.assign({fill:'#C7D2D1',width:0.7,style:'solid'});
  for(let r=0;r<rows.length;r++){
    t.rows[r].height=r===0?54:78;
    for(let c=0;c<d.headers.length;c++){
      const cell=t.getCell(r,c);cell.fill=r===0?C.ink:C.paper;
      cell.text.style={typeface:font,fontSize:r===0?25:25,color:r===0?C.white:C.ink,bold:r===0,insets:{left:16,right:12,top:12,bottom:10}};
    }
  }
}
for(const [i,d] of data.entries()){
  const s=deck.slides.add(); const dark=['cover','statement','prompt','closing'].includes(d.kind);
  s.background.fill=dark?C.ink:C.paper;
  s.speakerNotes.text=`Duração: ${d.minutes} min. Intervalo: ${d.time}.\n\n${d.notes}`;
  if(d.kind==='cover'){
    const bytes=await fs.readFile(path.join(here,'assets/parking.png'));
    s.images.add({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',alt:'Ilustração de uma saída de parque de estacionamento, extraída do enunciado',fit:'cover',position:{left:730,top:0,width:550,height:720}});
    text(s,'ANÁLISE DE SISTEMAS',70,76,570,40,23,C.light,true);
    text(s,d.title,70,220,615,220,64,C.white,true);
    text(s,d.subtitle,70,482,610,126,30,C.white);
    text(s,'Workshop guiado de 60 minutos',70,650,600,28,22,C.light);
  }else{
    header(s,d,i,dark);
    if(d.kind==='content'){
      if(d.lead)text(s,d.lead,70,183,1140,84,30,C.ink);
      d.items.forEach((a,k)=>{
        const y=(d.lead?282:205)+k*(d.items.length>3?75:96);
        text(s,a[0],70,y,300,70,27,C.teal,true);
        text(s,a[1],395,y,815,77,27,C.ink);
      });bottom(s,d.bottom);
    }else if(d.kind==='dual'){
      for(const side of ['left','right']){
        const x=side==='left'?70:670;
        text(s,d[side+'Title'],x,185,540,55,32,C.teal,true);
        let y=252;
        const code=d[side+'Code'];
        if(code){
          const h=code.split('\n').length*29+10;
          text(s,code,x,y,540,h,24,C.ink,true);y+=h+24;
        }
        if(d[side])text(s,d[side],x,y,540,580-y,26,C.ink);
      }bottom(s,d.bottom);
    }else if(d.kind==='command'){
      text(s,d.label,70,177,1140,43,25,C.teal,true);
      const lines=d.code.split('\n').length;
      const size=lines>6?24:26;
      const h=lines*(size+4)+16;
      text(s,d.code,70,237,1140,h,size,C.ink,true);
      text(s,d.after,70,237+h+22,1140,575-(237+h+22),25,C.ink);
      bottom(s,d.bottom);
    }else if(d.kind==='flow'){
      d.steps.forEach((a,k)=>{
        const y=186+k*77;
        text(s,String(k+1).padStart(2,'0'),70,y,80,60,33,C.teal,true);
        text(s,a[0],180,y,340,60,27,C.teal,true);
        text(s,a[1],540,y,670,70,26,C.ink);
      });bottom(s,d.bottom);
    }else if(d.kind==='diagram'){
      drawDiagram(s,d.diagram,{font,text,colors:C});bottom(s,d.bottom);
    }else if(d.kind==='trial-chart'){
      drawTrialChart(s,d,{font,text,colors:C,applyChartFont:applyPresentationChartFont});bottom(s,d.bottom);
    }else if(d.kind==='split'){
      text(s,d.leftTitle,70,212,540,85,d.leftTitle==='30 min'?68:36,C.teal,true);
      text(s,d.rightTitle,690,212,520,85,d.rightTitle==='30 min'?68:36,C.teal,true);
      text(s,d.left,70,310,520,300,30,C.ink);
      text(s,d.right,690,310,520,300,30,C.ink);
      if(d.bottom) bottom(s,d.bottom);
    }else if(d.kind==='statement'){
      text(s,d.big,70,195,1140,138,104,C.light,true);
      text(s,d.body,70,368,1130,150,40,C.white);
      bottom(s,d.bottom,true);
    }else if(d.kind==='table'){
      nativeTable(s,d);bottom(s,d.bottom);
    }else if(['sequence','files','closing'].includes(d.kind)){
      const fg=dark?C.white:C.ink, accent=dark?C.light:C.teal;
      d.items.forEach((item,k)=>{
        const y=205+k*88;
        if(d.kind==='sequence'){
          text(s,item[0],70,y,105,66,42,accent,true);
          text(s,item[1],195,y+4,265,66,31,fg,true);
          text(s,item[2],470,y+6,730,66,29,fg);
        }else{
          text(s,item[0],70,y,400,66,30,accent,true);
          text(s,item[1],500,y,700,70,29,fg);
        }
      });bottom(s,d.bottom,dark);
    }else if(d.kind==='prompt'){
      text(s,d.code,70,205,1140,70,37,C.light,true);
      text(s,d.prompt,70,310,1140,235,33,C.white);
      bottom(s,d.bottom,true);
    }else if(d.kind==='exercise'){
      text(s,d.code,70,206,1140,d.code.split('\n').length*43+12,32,C.teal,true);
      const y=d.code.split('\n').length>1?395:300;
      text(s,d.body,70,y,1140,230,30,C.ink);
      bottom(s,d.bottom);
    }
  }
}
await fs.writeFile(path.join(build,'font.json'),JSON.stringify({font}));
for(const [i,s] of deck.slides.items.entries()){
  const png=await deck.export({slide:s,format:'png',scale:1});
  await fs.writeFile(path.join(build,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
}
const candidate=path.join(build,'candidate.pptx');
await(await PresentationFile.exportPptx(deck)).save(candidate);
const final=path.join(here,'output',process.env.PPTX_FILENAME||'workshop-agentes-openspec-autocontido.pptx');
const tables=data.flatMap((s,i)=>s.kind==='table'?[i+1]:[]);
const charts=data.flatMap((s,i)=>s.kind==='trial-chart'?[i+1]:[]);
const result=await finalizePresentation({workspaceDir:here,candidatePath:candidate,finalPath:final,pythonExecutable:path.join(runtime,'python/bin/python3'),integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit',...tables.flatMap(n=>['--require-native-table-slide',String(n)])],explicitTotalSlideCount:data.length,requiredNativeTableOwnerSlides:tables,...(charts.length?{requiredNativeChartOwnerSlides:charts,materializeLiteralChartWorkbooks:true}:{}),fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(build,`${path.basename(final)}.validation.json`)});
await fs.writeFile(path.join(build,'result.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({final,slides:data.length,font}));
