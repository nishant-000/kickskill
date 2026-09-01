import React, {
  memo,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ─── GLSL ────────────────────────────────────────────────────────────────────

const vertexShaderSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;
out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;
vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y); }
  else if (u_fit == 2.) { box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y); }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}
void main() {
  gl_Position = a_position;
  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);
  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);
  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;
  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;
  v_responsiveBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;
  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;
  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;
  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;
  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) { v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x); }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV *= .01;
  vec2 imageBoxSize;
  if (u_fit == 1.) { imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio; }
  else if (u_fit == 2.) { imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio; }
  else { imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio); }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;
  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;
  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;

const simplexNoise = `
vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);}`;

const proceduralHash21 = `
float hash21(vec2 p){
  p=fract(p*vec2(0.3183099,0.3678794))+0.1;
  p+=dot(p,p+19.19);return fract(p.x*p.y);}`;

const ditheringFragmentShader = `#version 300 es
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;uniform float u_originY;
uniform float u_worldWidth;uniform float u_worldHeight;
uniform float u_fit;uniform float u_scale;uniform float u_rotation;
uniform float u_offsetX;uniform float u_offsetY;
uniform float u_pxSize;
uniform vec4 u_colorBack;uniform vec4 u_colorFront;
uniform float u_shape;uniform float u_type;
out vec4 fragColor;
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
float hash11(float p){p=fract(p*0.3183099)+0.1;p*=p+19.19;return fract(p*p);}
${proceduralHash21}
${simplexNoise}
float getSimplexNoise(vec2 uv,float t){
  float n=.5*snoise(uv-vec2(0.,.3*t));n+=.5*snoise(2.*uv+vec2(0.,.32*t));return n;}
const int bayer8x8[64]=int[64](
0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,
12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,
3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,
15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21);
float getBayer8(vec2 uv){
  ivec2 pos=ivec2(fract(uv/8.0)*8.0);
  return float(bayer8x8[pos.y*8+pos.x])/64.0;}
const int bayer4x4[16]=int[16](0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5);
float getBayer4(vec2 uv){ivec2 pos=ivec2(fract(uv/4.0)*4.0);return float(bayer4x4[pos.y*4+pos.x])/16.0;}
void main(){
  float t=.5*u_time;
  float pxSize=u_pxSize*u_pixelRatio;
  vec2 pxUV=(gl_FragCoord.xy-.5*u_resolution)/pxSize;
  vec2 canvasUV=(floor(pxUV)+.5)*pxSize;
  vec2 nUV=canvasUV/u_resolution;
  vec2 shapeUV=nUV;
  vec2 boxOrigin=vec2(.5-u_originX,u_originY-.5);
  vec2 gsz=vec2(u_worldWidth,u_worldHeight);
  gsz=max(gsz,vec2(1.))*u_pixelRatio;
  float pr=gsz.x/gsz.y;
  vec2 bsz=vec2((u_worldWidth==0.)?u_resolution.x:gsz.x,(u_worldHeight==0.)?u_resolution.y:gsz.y);
  float r=u_rotation*PI/180.;mat2 gr=mat2(cos(r),sin(r),-sin(r),cos(r));
  vec2 go=vec2(-u_offsetX,u_offsetY);
  if(u_shape>3.5){
    vec2 obs=vec2(0.);obs.x=min(bsz.x,bsz.y);
    if(u_fit==1.)obs.x=min(u_resolution.x,u_resolution.y);
    else if(u_fit==2.)obs.x=max(u_resolution.x,u_resolution.y);
    obs.y=obs.x;vec2 ows=u_resolution.xy/obs;
    shapeUV*=ows;shapeUV+=boxOrigin*(ows-1.);shapeUV+=go;shapeUV/=u_scale;shapeUV=gr*shapeUV;
  } else {
    vec2 pbs=vec2(0.);pbs.x=pr*min(bsz.x/pr,bsz.y);float nfw=pbs.x;
    if(u_fit==1.)pbs.x=pr*min(u_resolution.x/pr,u_resolution.y);
    else if(u_fit==2.)pbs.x=pr*max(u_resolution.x/pr,u_resolution.y);
    pbs.y=pbs.x/pr;vec2 pws=u_resolution.xy/pbs;
    shapeUV+=go/pws;shapeUV+=boxOrigin;shapeUV-=boxOrigin/pws;
    shapeUV*=u_resolution.xy;shapeUV/=u_pixelRatio;
    if(u_fit>0.)shapeUV*=(nfw/pbs.x);
    shapeUV/=u_scale;shapeUV=gr*shapeUV;shapeUV+=boxOrigin/pws;shapeUV-=boxOrigin;shapeUV+=.5;
  }
  float shape=0.;
  if(u_shape<1.5){shapeUV*=.001;shape=0.5+0.5*getSimplexNoise(shapeUV,t);shape=smoothstep(0.3,0.9,shape);}
  else if(u_shape<2.5){shapeUV*=.003;
    for(float i=1.0;i<6.0;i++){shapeUV.x+=0.6/i*cos(i*2.5*shapeUV.y+t);shapeUV.y+=0.6/i*cos(i*1.5*shapeUV.x+t);}
    shape=.15/max(0.001,abs(sin(t-shapeUV.y-shapeUV.x)));shape=smoothstep(0.02,1.,shape);}
  else if(u_shape<3.5){shapeUV*=.05;float si=floor(2.*shapeUV.x/TWO_PI);float rnd=hash11(si*10.);rnd=sign(rnd-.5)*pow(.1+abs(rnd),.4);shape=sin(shapeUV.x)*cos(shapeUV.y-5.*rnd*t);shape=pow(abs(shape),6.);}
  else if(u_shape<4.5){shapeUV*=4.;float w=cos(.5*shapeUV.x-2.*t)*sin(1.5*shapeUV.x+t)*(.75+.25*cos(3.*t));shape=1.-smoothstep(-1.,1.,shapeUV.y+w);}
  else if(u_shape<5.5){float d=length(shapeUV);shape=sin(pow(d,1.7)*7.-3.*t)*.5+.5;}
  else if(u_shape<6.5){float l=length(shapeUV);float a=6.*atan(shapeUV.y,shapeUV.x)+4.*t;float tw=1.2;float off=1./pow(max(l,1e-6),tw)+a/TWO_PI;float mid=smoothstep(0.,1.,pow(l,tw));shape=mix(0.,fract(off),mid);}
  else{shapeUV*=2.;float d=1.-pow(length(shapeUV),2.);vec3 pos=vec3(shapeUV,sqrt(max(0.,d)));vec3 lp=normalize(vec3(cos(1.5*t),.8,sin(1.25*t)));shape=.5+.5*dot(lp,pos);shape*=step(0.,d);}
  float dithering=getBayer8(pxUV);
  if(u_type<1.5){dithering=step(hash21(canvasUV),shape);}
  else if(u_type<2.5){ivec2 p2=ivec2(fract(pxUV/2.0)*2.0);int i2=p2.y*2+p2.x;int b2[4]=int[4](0,2,3,1);dithering=float(b2[i2])/4.0;}
  else if(u_type<3.5){dithering=getBayer4(pxUV);}
  dithering-=.5;
  float res=step(.5,shape+dithering);
  vec3 fc=u_colorFront.rgb*u_colorFront.a;float fo=u_colorFront.a;
  vec3 bc=u_colorBack.rgb*u_colorBack.a;float bo=u_colorBack.a;
  vec3 color=fc*res;float opacity=fo*res;
  color+=bc*(1.-opacity);opacity+=bo*(1.-opacity);
  fragColor=vec4(color,opacity);}`;

// ─── WebGL utils ─────────────────────────────────────────────────────────────

function _isSafari() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android");
}

function _createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function _createProgram(gl: WebGL2RenderingContext, vert: string, frag: string): WebGLProgram | null {
  const fmt = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT);
  if (fmt && fmt.precision < 23) {
    vert = vert.replace(/precision\s+(lowp|mediump)\s+float;/g, "precision highp float;");
    frag = frag.replace(/precision\s+(lowp|mediump)\s+float/g, "precision highp float")
               .replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g, "$1 highp $3");
  }
  const vs = _createShader(gl, gl.VERTEX_SHADER, vert);
  const fs = _createShader(gl, gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error: " + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  gl.detachShader(program, vs); gl.detachShader(program, fs);
  gl.deleteShader(vs); gl.deleteShader(fs);
  return program;
}

const defaultStyle = `@layer paper-shaders{:where([data-paper-shader]){isolation:isolate;position:relative;& canvas{contain:strict;display:block;position:absolute;inset:0;z-index:-1;width:100%;height:100%;border-radius:inherit;}}}`;

type UniformValue = number | boolean | number[] | number[][];

class ShaderMount {
  parentElement: HTMLElement;
  canvasElement: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  program: WebGLProgram | null = null;
  uniformLocations: Record<string, WebGLUniformLocation | null> = {};
  fragmentShader: string;
  rafId: number | null = null;
  lastRenderTime = 0;
  currentFrame = 0;
  speed = 0;
  currentSpeed = 0;
  providedUniforms: Record<string, UniformValue>;
  hasBeenDisposed = false;
  resolutionChanged = true;
  minPixelRatio: number;
  maxPixelCount: number;
  isSafari = _isSafari();
  uniformCache: Record<string, unknown> = {};
  renderScale = 1;
  parentWidth = 0;
  parentHeight = 0;
  parentDevicePixelWidth = 0;
  parentDevicePixelHeight = 0;
  devicePixelsSupported = false;
  resizeObserver: ResizeObserver | null = null;

  constructor(
    parentElement: HTMLElement,
    fragmentShader: string,
    uniforms: Record<string, UniformValue>,
    webGlContextAttributes?: WebGLContextAttributes,
    speed = 0,
    frame = 0,
    minPixelRatio = 2,
    maxPixelCount = 1920 * 1080 * 4,
  ) {
    this.parentElement = parentElement;
    this.fragmentShader = fragmentShader;
    this.providedUniforms = uniforms;
    this.currentFrame = frame;
    this.minPixelRatio = minPixelRatio;
    this.maxPixelCount = maxPixelCount;

    if (!document.querySelector("style[data-paper-shader]")) {
      const s = document.createElement("style");
      s.innerHTML = defaultStyle;
      s.setAttribute("data-paper-shader", "");
      document.head.prepend(s);
    }

    this.canvasElement = document.createElement("canvas");
    this.parentElement.prepend(this.canvasElement);

    const gl = this.canvasElement.getContext("webgl2", webGlContextAttributes);
    if (!gl) throw new Error("WebGL2 not supported");
    this.gl = gl;

    this.initProgram();
    this.setupPositionAttribute();
    this.setupUniforms();
    this.setUniformValues(this.providedUniforms);
    this.setupResizeObserver();
    visualViewport?.addEventListener("resize", this.handleVisualViewportChange);
    this.setSpeed(speed);
    this.parentElement.setAttribute("data-paper-shader", "");
    (this.parentElement as any).paperShaderMount = this;
    document.addEventListener("visibilitychange", this.handleDocumentVisibilityChange);
  }

  initProgram = () => {
    const p = _createProgram(this.gl, vertexShaderSource, this.fragmentShader);
    if (p) this.program = p;
  };

  setupPositionAttribute = () => {
    const loc = this.gl.getAttribLocation(this.program!, "a_position");
    const buf = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(loc);
    this.gl.vertexAttribPointer(loc, 2, this.gl.FLOAT, false, 0, 0);
  };

  setupUniforms = () => {
    const locs: Record<string, WebGLUniformLocation | null> = {
      u_time: this.gl.getUniformLocation(this.program!, "u_time"),
      u_pixelRatio: this.gl.getUniformLocation(this.program!, "u_pixelRatio"),
      u_resolution: this.gl.getUniformLocation(this.program!, "u_resolution"),
    };
    Object.keys(this.providedUniforms).forEach((key) => {
      locs[key] = this.gl.getUniformLocation(this.program!, key);
    });
    this.uniformLocations = locs;
  };

  handleResize = () => {
    const dpr = Math.max(1, window.devicePixelRatio);
    const pinchZoom = visualViewport?.scale ?? 1;
    let tw = 0, th = 0;
    if (this.devicePixelsSupported) {
      const scale = Math.max(1, this.minPixelRatio / dpr);
      tw = this.parentDevicePixelWidth * scale * pinchZoom;
      th = this.parentDevicePixelHeight * scale * pinchZoom;
    } else {
      const trs = Math.max(dpr, this.minPixelRatio) * pinchZoom;
      tw = Math.round(this.parentWidth) * trs;
      th = Math.round(this.parentHeight) * trs;
    }
    const headroom = Math.sqrt(this.maxPixelCount) / Math.sqrt(tw * th);
    const clamp = Math.min(1, headroom);
    const nw = Math.round(tw * clamp);
    const nh = Math.round(th * clamp);
    const nrs = nw / Math.round(this.parentWidth);
    if (this.canvasElement.width !== nw || this.canvasElement.height !== nh || this.renderScale !== nrs) {
      this.renderScale = nrs;
      this.canvasElement.width = nw;
      this.canvasElement.height = nh;
      this.resolutionChanged = true;
      this.gl.viewport(0, 0, nw, nh);
      this.render(performance.now());
    }
  };

  handleVisualViewportChange = () => {
    this.resizeObserver?.disconnect();
    this.setupResizeObserver();
  };

  setupResizeObserver = () => {
    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (entry?.borderBoxSize[0]) {
        const phys = entry.devicePixelContentBoxSize?.[0];
        if (phys) {
          this.devicePixelsSupported = true;
          this.parentDevicePixelWidth = phys.inlineSize;
          this.parentDevicePixelHeight = phys.blockSize;
        }
        this.parentWidth = entry.borderBoxSize[0].inlineSize;
        this.parentHeight = entry.borderBoxSize[0].blockSize;
      }
      this.handleResize();
    });
    this.resizeObserver.observe(this.parentElement);
  };

  render = (currentTime: number) => {
    if (this.hasBeenDisposed || !this.program) return;
    const dt = currentTime - this.lastRenderTime;
    this.lastRenderTime = currentTime;
    if (this.currentSpeed !== 0) this.currentFrame += dt * this.currentSpeed;
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.uniform1f(this.uniformLocations.u_time!, this.currentFrame * 1e-3);
    if (this.resolutionChanged) {
      this.gl.uniform2f(this.uniformLocations.u_resolution!, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.uniform1f(this.uniformLocations.u_pixelRatio!, this.renderScale);
      this.resolutionChanged = false;
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    if (this.currentSpeed !== 0) this.requestRender();
    else this.rafId = null;
  };

  requestRender = () => {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(this.render);
  };

  areEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length)
      return a.every((v, i) => this.areEqual(v, (b as unknown[])[i]));
    return false;
  };

  setUniformValues = (uniforms: Record<string, UniformValue>) => {
    this.gl.useProgram(this.program);
    Object.entries(uniforms).forEach(([key, value]) => {
      if (this.areEqual(this.uniformCache[key], value)) return;
      this.uniformCache[key] = value;
      const loc = this.uniformLocations[key];
      if (!loc) return;
      if (Array.isArray(value)) {
        const flat = (Array.isArray(value[0]) ? (value as number[][]).flat() : value) as number[];
        const len = Array.isArray(value[0]) ? (value[0] as number[]).length : flat.length;
        if (len === 2) this.gl.uniform2fv(loc, flat);
        else if (len === 3) this.gl.uniform3fv(loc, flat);
        else if (len === 4) this.gl.uniform4fv(loc, flat);
      } else if (typeof value === "number") {
        this.gl.uniform1f(loc, value);
      } else if (typeof value === "boolean") {
        this.gl.uniform1i(loc, value ? 1 : 0);
      }
    });
  };

  setSpeed = (newSpeed = 1) => {
    this.speed = newSpeed;
    this.setCurrentSpeed(document.hidden ? 0 : newSpeed);
  };

  setCurrentSpeed = (newSpeed: number) => {
    this.currentSpeed = newSpeed;
    if (this.rafId === null && newSpeed !== 0) {
      this.lastRenderTime = performance.now();
      this.rafId = requestAnimationFrame(this.render);
    }
    if (this.rafId !== null && newSpeed === 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  };

  setUniforms = (newUniforms: Record<string, UniformValue>) => {
    this.setUniformValues(newUniforms);
    this.providedUniforms = { ...this.providedUniforms, ...newUniforms };
    this.render(performance.now());
  };

  handleDocumentVisibilityChange = () => {
    this.setCurrentSpeed(document.hidden ? 0 : this.speed);
  };

  dispose = () => {
    this.hasBeenDisposed = true;
    if (this.rafId !== null) { cancelAnimationFrame(this.rafId); this.rafId = null; }
    if (this.gl && this.program) { this.gl.deleteProgram(this.program); this.program = null; }
    this.resizeObserver?.disconnect();
    visualViewport?.removeEventListener("resize", this.handleVisualViewportChange);
    document.removeEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    this.canvasElement.remove();
    delete (this.parentElement as any).paperShaderMount;
  };
}

// ─── Color utilities ─────────────────────────────────────────────────────────

function hexToRgba(hex: string): [number, number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length === 6) hex += "ff";
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
    parseInt(hex.slice(6, 8), 16) / 255,
  ];
}

function getShaderColor(color: string | number[]): number[] {
  if (Array.isArray(color)) return color.length === 4 ? color : [...color, 1];
  if (color.startsWith("#")) return hexToRgba(color);
  if (color.startsWith("rgba")) {
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (m) return [+m[1]/255, +m[2]/255, +m[3]/255, m[4] !== undefined ? +m[4] : 1];
  }
  return [0, 0, 0, 1];
}

// ─── ShaderMount React wrapper ───────────────────────────────────────────────

interface ShaderMountProps extends React.HTMLAttributes<HTMLDivElement> {
  fragmentShader: string;
  uniforms: Record<string, UniformValue>;
  speed?: number;
  frame?: number;
  width?: number | string;
  height?: number | string;
  minPixelRatio?: number;
  maxPixelCount?: number;
}

const ShaderMountComponent = forwardRef<HTMLDivElement, ShaderMountProps>(function ShaderMountImpl(
  { fragmentShader, uniforms: uniformsProp, speed = 0, frame = 0, width, height, minPixelRatio, maxPixelCount, style, ...divProps },
  forwardedRef,
) {
  const [isInit, setIsInit] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<ShaderMount | null>(null);

  useEffect(() => {
    if (divRef.current && !mountRef.current) {
      try {
        mountRef.current = new ShaderMount(divRef.current, fragmentShader, uniformsProp, undefined, speed, frame, minPixelRatio, maxPixelCount);
        setIsInit(true);
      } catch (e) {
        console.warn("ShaderMount init failed:", e);
      }
    }
    return () => { mountRef.current?.dispose(); mountRef.current = null; };
  }, [fragmentShader]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (isInit) mountRef.current?.setUniforms(uniformsProp); }, [uniformsProp, isInit]);
  useEffect(() => { if (isInit) mountRef.current?.setSpeed(speed); }, [speed, isInit]);

  const mergedRef = useCallback((node: HTMLDivElement | null) => {
    (divRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }, [forwardedRef]);

  const sizeStyle = width !== undefined || height !== undefined
    ? { width: typeof width === "string" && !isNaN(+width) ? +width : width, height: typeof height === "string" && !isNaN(+height) ? +height : height, ...style }
    : style;

  return <div ref={mergedRef} style={sizeStyle} {...divProps} />;
});

// ─── Dithering component ─────────────────────────────────────────────────────

const DitheringShapes: Record<string, number> = { simplex: 1, warp: 2, dots: 3, wave: 4, ripple: 5, swirl: 6, sphere: 7 };
const DitheringTypes: Record<string, number> = { random: 1, "2x2": 2, "4x4": 3, "8x8": 4 };
const ShaderFitOptions: Record<string, number> = { none: 0, contain: 1, cover: 2 };

interface DitheringProps extends React.HTMLAttributes<HTMLDivElement> {
  colorBack?: string;
  colorFront?: string;
  shape?: string;
  type?: string;
  size?: number;
  fit?: string;
  scale?: number;
  rotation?: number;
  originX?: number;
  originY?: number;
  offsetX?: number;
  offsetY?: number;
  worldWidth?: number;
  worldHeight?: number;
  speed?: number;
  frame?: number;
}

const Dithering = memo(function DitheringImpl({
  colorBack = "#000000", colorFront = "#a78bfa",
  shape = "warp", type = "4x4", size = 1.5,
  fit = "none", scale = 1, rotation = 0,
  originX = 0.5, originY = 0.5, offsetX = 0, offsetY = 0,
  worldWidth = 0, worldHeight = 0,
  speed = 0, frame = 0,
  ...props
}: DitheringProps) {
  const uniforms = useMemo(() => ({
    u_colorBack: getShaderColor(colorBack),
    u_colorFront: getShaderColor(colorFront),
    u_shape: DitheringShapes[shape] ?? 2,
    u_type: DitheringTypes[type] ?? 3,
    u_pxSize: size,
    u_fit: ShaderFitOptions[fit] ?? 0,
    u_scale: scale, u_rotation: rotation,
    u_offsetX: offsetX, u_offsetY: offsetY,
    u_originX: originX, u_originY: originY,
    u_worldWidth: worldWidth, u_worldHeight: worldHeight,
  }), [colorBack, colorFront, shape, type, size, fit, scale, rotation, offsetX, offsetY, originX, originY, worldWidth, worldHeight]);

  return <ShaderMountComponent {...props} speed={speed} frame={frame} fragmentShader={ditheringFragmentShader} uniforms={uniforms} />;
});

// ─── Ticket geometry ─────────────────────────────────────────────────────────

export interface TicketGeometry {
  aspect: number;
  cornerRadius: number;
  notchRadius: number;
  perforation: number;
}

export interface TicketLayout {
  padding: number;
  labelTop: number; labelSize: number; labelLead: number; labelTracking: number;
  nameTop: number; nameSize: number; nameLead: number; nameTracking: number;
  footerTop: number; footerSize: number; footerTracking: number;
  stubSize: number; stubTracking: number; stubOpacity: number;
  watermarkSize: number; watermarkOpacity: number; watermarkColor: string;
  inkColor: string;
}

export interface TicketTexture {
  colorBack: string; colorFront: string;
  shape: string; type: string; size: number;
  scale: number; rotation: number; offsetX: number; offsetY: number;
  speed: number;
}

const REF = 741;

export const TICKET_GEOMETRY: TicketGeometry = {
  aspect: 741 / 425,
  cornerRadius: 25 / REF,
  notchRadius: 21 / REF,
  perforation: 562 / REF,
};

export function ticketClipPath(width: number, height: number, g: TicketGeometry = TICKET_GEOMETRY): string {
  const r = g.cornerRadius * width;
  const n = g.notchRadius * width;
  const p = g.perforation * width;
  return [
    `M ${r} 0`, `L ${p - n} 0`, `A ${n} ${n} 0 0 0 ${p + n} 0`,
    `L ${width - r} 0`, `A ${r} ${r} 0 0 0 ${width} ${r}`,
    `L ${width} ${height - r}`, `A ${r} ${r} 0 0 0 ${width - r} ${height}`,
    `L ${p + n} ${height}`, `A ${n} ${n} 0 0 0 ${p - n} ${height}`,
    `L ${r} ${height}`, `A ${r} ${r} 0 0 0 0 ${height - r}`,
    `L 0 ${r}`, `A ${r} ${r} 0 0 0 ${r} 0`, "Z",
  ].join(" ");
}

function splitName(name: string, max = 3): string[] {
  const clean = name.trim().replace(/\s+/g, " ").toUpperCase();
  if (!clean) return [];
  const lines: string[] = [];
  for (const word of clean.split(" ")) {
    if (lines.length < max) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
}

function fitScale(lines: string[], opts: { availableWidth: number; availableHeight: number; fontSize: number; lineHeight: number; tracking: number }): number {
  if (!lines.length) return 1;
  const { availableWidth, availableHeight, fontSize, lineHeight, tracking } = opts;
  if (fontSize <= 0 || availableWidth <= 0) return 1;
  const longest = Math.max(...lines.map((l) => l.length));
  const charWidth = (0.6 + tracking) * fontSize;
  const block = lines.length * lineHeight;
  return Math.max(0.05, Math.min(1,
    charWidth > 0 ? availableWidth / (longest * charWidth) : 1,
    block > 0 && availableHeight > 0 ? availableHeight / block : 1,
  ));
}

// ─── TicketCard ───────────────────────────────────────────────────────────────

interface TicketCardProps {
  name: string;
  presenter: string;
  event: string;
  venue: string;
  dates: string;
  stubText: string;
  watermark: string;
  width?: number;
  geometry?: TicketGeometry;
  layout?: TicketLayout;
  texture?: TicketTexture;
  className?: string;
}

function TicketCard({
  name, presenter, event, venue, dates, stubText, watermark,
  width = REF,
  geometry = TICKET_GEOMETRY,
  layout,
  texture,
  className,
}: TicketCardProps) {
  const tl = layout ?? PASSPORT_LAYOUT;
  const tx = texture ?? PASSPORT_TEXTURE;
  const height = width / geometry.aspect;
  const perfX = geometry.perforation * width;

  const lines = splitName(name);
  const scale = fitScale(lines, {
    availableWidth: perfX - tl.padding * width - 0.03 * width,
    availableHeight: tl.footerTop * width - tl.nameTop * width - 0.02 * width,
    fontSize: tl.nameSize * width,
    lineHeight: tl.nameLead * width,
    tracking: tl.nameTracking,
  });

  const shaderStyle: React.CSSProperties = { position: "absolute", inset: 0, width, height };

  return (
    <div
      className={`relative select-none ${className ?? ""}`}
      style={{ width, height, clipPath: `path('${ticketClipPath(width, height, geometry)}')` }}
    >
      <div className="absolute inset-0" style={{ background: tx.colorBack }} />
      <Dithering
        colorBack={tx.colorBack}
        colorFront={tx.colorFront}
        shape={tx.shape}
        type={tx.type}
        size={tx.size}
        scale={tx.scale}
        rotation={tx.rotation}
        offsetX={tx.offsetX}
        offsetY={tx.offsetY}
        speed={tx.speed}
        style={shaderStyle}
      />
      {/* Perforation dashed line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: perfX,
          width: Math.max(1, 0.0022 * width),
          backgroundImage: `repeating-linear-gradient(to bottom, ${tl.inkColor}44 0 ${0.012 * width}px, transparent ${0.012 * width}px ${0.024 * width}px)`,
        }}
      />
      {/* Watermark */}
      <div
        className="pointer-events-none absolute grid place-items-center font-bold"
        style={{ left: perfX, top: 0, width: width - perfX, height, color: tl.watermarkColor, opacity: tl.watermarkOpacity }}
      >
        <span style={{ writingMode: "vertical-rl", fontSize: tl.watermarkSize * width, lineHeight: 1, letterSpacing: "-0.04em" }}>
          {watermark}
        </span>
      </div>
      {/* Text layer */}
      <div className="absolute inset-0" style={{ color: tl.inkColor }}>
        <div
          className="absolute whitespace-pre uppercase"
          style={{
            left: tl.padding * width, top: tl.labelTop * width,
            fontSize: tl.labelSize * width,
            lineHeight: `${tl.labelLead * width}px`,
            letterSpacing: `${tl.labelTracking}em`,
          }}
        >
          {presenter}{"\n"}{event}
        </div>
        <div
          className="absolute font-medium"
          style={{
            left: tl.padding * width, top: tl.nameTop * width,
            fontSize: tl.nameSize * width * scale,
            lineHeight: `${tl.nameLead * width * scale}px`,
            letterSpacing: `${tl.nameTracking}em`,
          }}
        >
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </div>
        <div
          className="absolute whitespace-nowrap uppercase"
          style={{
            left: tl.padding * width, top: tl.footerTop * width,
            fontSize: tl.footerSize * width,
            letterSpacing: `${tl.footerTracking}em`,
          }}
        >
          {venue} · {dates}
        </div>
        <div
          className="absolute grid place-items-center font-medium whitespace-nowrap uppercase"
          style={{
            left: perfX, top: 0, width: width - perfX, height,
            fontSize: tl.stubSize * width,
            letterSpacing: `${tl.stubTracking}em`,
            opacity: tl.stubOpacity,
          }}
        >
          <span style={{ writingMode: "vertical-rl" }}>{stubText}</span>
        </div>
      </div>
    </div>
  );
}

// ─── TiltCard ────────────────────────────────────────────────────────────────

interface TiltCardProps {
  children: React.ReactNode;
  clipPath?: string;
  maxTilt?: number;
  scale?: number;
  glare?: number;
  className?: string;
}

export function TiltCard({ children, clipPath, maxTilt = 9, scale = 1.02, glare = 0.16, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-(dy * 2) * maxTilt}deg) rotateY(${dx * 2 * maxTilt}deg) scale(${scale})`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(38% 55% at ${(dx + 0.5) * 100}% ${(dy + 0.5) * 100}%, rgba(255,255,255,${glare}) 0%, rgba(255,255,255,0) 70%)`;
    }
  }, [maxTilt, scale, glare]);

  const onLeave = useCallback(() => {
    setHovering(false);
    if (cardRef.current) cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative w-fit will-change-transform ${className ?? ""}`}
      style={{
        transition: hovering ? "none" : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare > 0 && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ clipPath, transition: hovering ? "none" : "background 420ms ease-out" }}
        />
      )}
    </div>
  );
}

// ─── AdmitOneTicket ──────────────────────────────────────────────────────────

interface AdmitOneTicketProps extends TicketCardProps {
  tilt?: boolean | Partial<Omit<TiltCardProps, "children" | "clipPath">>;
}

export function AdmitOneTicket({ tilt, ...props }: AdmitOneTicketProps) {
  const width = props.width ?? REF;
  const geometry = props.geometry ?? TICKET_GEOMETRY;
  const height = width / geometry.aspect;

  if (tilt === false) return <TicketCard {...props} />;

  const tiltProps = typeof tilt === "object" ? tilt : {};
  return (
    <TiltCard clipPath={`path('${ticketClipPath(width, height, geometry)}')`} {...tiltProps}>
      <TicketCard {...props} />
    </TiltCard>
  );
}

// ─── KickSkill / Skill Passport purple theme ─────────────────────────────────

export const PASSPORT_TEXTURE: TicketTexture = {
  colorBack: "#06041a",
  colorFront: "#7c3aed",
  shape: "warp",
  type: "4x4",
  size: 1.4,
  scale: 1.1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  speed: 0.28,
};

export const PASSPORT_LAYOUT: TicketLayout = {
  padding: 57 / REF,
  labelTop: 58 / REF,
  labelSize: 19.72 / REF,
  labelLead: 28 / REF,
  labelTracking: 0.016,
  nameTop: 185 / REF,
  nameSize: 64.79 / REF,
  nameLead: 65 / REF,
  nameTracking: -0.01,
  footerTop: 348 / REF,
  footerSize: 19.72 / REF,
  footerTracking: 0.016,
  stubSize: 67.61 / REF,
  stubTracking: 0,
  stubOpacity: 0.75,
  watermarkSize: 144 / REF,
  watermarkOpacity: 0.18,
  watermarkColor: "#a78bfa",
  inkColor: "#ede9fe",
};

export default AdmitOneTicket;
