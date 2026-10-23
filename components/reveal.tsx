'use client';
import {animate} from 'motion';
import {useEffect,useRef} from 'react';
export function Reveal({children,className=''}:{children:React.ReactNode;className?:string}) {const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const el=ref.current;if(!el||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){animate(el,{opacity:[0.65,1],transform:['translateY(18px)','translateY(0)']},{duration:0.65,ease:[0.22,1,0.36,1]});observer.disconnect();}},{threshold:0.08});observer.observe(el);return()=>observer.disconnect()},[]);return <div ref={ref} className={className}>{children}</div>}
