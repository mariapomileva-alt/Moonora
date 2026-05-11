"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   COVER 1 — FULL ILLUSTRATION
   Cinematic Moon Forest. Child fully illustrated in Pixar style.
════════════════════════════════════════════════════════════ */

function CoverFullIllustration({ name, transforming }: { name: string; transforming: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08152a] via-[#0d2040] to-[#1a3a2a]" />

      {/* Milky way streak */}
      <div className="absolute left-[10%] top-0 h-full w-[1px] rotate-[20deg] bg-gradient-to-b from-transparent via-[#f3ead8]/10 to-transparent blur-sm" />
      <div className="absolute left-[30%] top-0 h-full w-[2px] rotate-[18deg] bg-gradient-to-b from-transparent via-[#f3ead8]/06 to-transparent blur-md" />

      {/* Stars */}
      {[
        [8,6,1.5],[18,4,1],[32,9,1.2],[48,3,1],[62,7,1.5],[76,5,1],[88,11,1.2],
        [14,16,0.8],[42,13,1],[70,18,0.8],[82,14,1.2],[25,22,1],[55,19,0.8],
        [90,8,1.5],[6,28,0.8],[38,26,1],[72,24,0.8],
      ].map(([x,y,r],i)=>(
        <motion.div key={i} className="absolute rounded-full bg-[#f3ead8]"
          style={{left:`${x}%`,top:`${y}%`,width:r,height:r}}
          animate={{opacity:[0.3,0.9,0.3]}}
          transition={{duration:2.5+i%4,delay:i*0.4,repeat:Infinity,ease:"easeInOut"}}
        />
      ))}

      {/* Large glowing moon top-right */}
      <div className="absolute right-[8%] top-[6%] h-16 w-16 rounded-full bg-gradient-radial from-[#f8f0dc] via-[#e8d8a0] to-[#c9a962] opacity-90"
        style={{boxShadow:"0 0 40px 16px rgba(243,234,196,0.18), 0 0 80px 32px rgba(201,169,98,0.1)"}} />
      <div className="absolute right-[5%] top-[3%] h-28 w-28 rounded-full bg-[#f3ead8]/10 blur-3xl" />

      {/* Fireflies / floating particles */}
      {[[22,45],[38,38],[58,50],[72,42],[30,60]].map(([x,y],i)=>(
        <motion.div key={i} className="absolute h-1 w-1 rounded-full bg-[#e4cf8a]"
          style={{left:`${x}%`,top:`${y}%`,boxShadow:"0 0 6px 2px rgba(228,207,138,0.7)"}}
          animate={{y:[-6,6,-6],opacity:[0.4,1,0.4],scale:[0.8,1.2,0.8]}}
          transition={{duration:3+i,delay:i*0.6,repeat:Infinity,ease:"easeInOut"}}
        />
      ))}

      {/* Misty forest background (distant) */}
      <div className="absolute inset-x-0 bottom-[28%] h-40 bg-gradient-to-t from-[#0d2a1a]/80 via-[#0d2a1a]/40 to-transparent" />

      {/* Background trees (faint) */}
      <svg className="absolute inset-x-0 bottom-[24%] w-full opacity-40" viewBox="0 0 320 80" preserveAspectRatio="xMidYMax slice">
        {[0,30,60,95,130,165,200,240,275].map((x,i)=>(
          <g key={i} transform={`translate(${x},${i%2===0?0:8})`}>
            <path d={`M${10+(i%3)*2} 80 L${10+(i%3)*2} ${20+(i%4)*8} L${5+(i%3)} ${25+(i%4)*8} L${10+(i%3)*2} ${8+(i%4)*6} L${15-(i%3)} ${25+(i%4)*8} L${10+(i%3)*2} ${20+(i%4)*8}`}
              fill="#0a2218" />
          </g>
        ))}
      </svg>

      {/* Foreground mossy ground */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 320 60" preserveAspectRatio="xMidYMax slice">
        <path d="M0 60 Q20 40 45 48 T90 44 T135 46 T180 42 T225 45 T270 43 T320 46 L320 60Z" fill="#0a2018" />
        <path d="M0 60 Q15 50 40 55 T85 52 T130 54 T175 50 T220 53 T265 51 T320 54 L320 60Z" fill="#071814" />
        {/* Glowing mushrooms */}
        {[30,80,130,200,260].map((x,i)=>(
          <g key={i}>
            <ellipse cx={x} cy={52} rx={3} ry={5} fill={i%2===0?"#1a4a2a":"#162a1e"} />
            <ellipse cx={x} cy={48} rx={6} ry={3} fill={i%2===0?"#2a6a3a":"#1e4a2e"} />
          </g>
        ))}
      </svg>

      {/* Ground glow */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a2018] to-transparent" />
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 h-16 w-48 rounded-full bg-[#c9a962]/12 blur-2xl" />

      {/* ── ILLUSTRATED CHILD CHARACTER ── */}
      <AnimatePresence mode="wait">
        {transforming ? (
          <motion.div key="transform"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="absolute bottom-[14%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div className="h-12 w-12 rounded-full border border-[#c9a962]/40 bg-[#c9a962]/10"
              animate={{scale:[1,1.15,1],boxShadow:["0 0 0px #c9a962","0 0 20px #c9a962","0 0 0px #c9a962"]}}
              transition={{duration:1.8,repeat:Infinity}}
            />
            <p className="text-[8px] uppercase tracking-widest text-[#c9a962]/70">Illustrating…</p>
          </motion.div>
        ) : (
          <motion.div key="character"
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
            className="absolute bottom-[11%] left-1/2 -translate-x-1/2"
          >
            {/* Glow pool under character */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-20 rounded-full bg-[#c9a962]/20 blur-lg" />
            {/* Character SVG — Pixar-style girl in magical forest */}
            <svg viewBox="0 0 80 110" className="h-28 w-auto drop-shadow-[0_4px_24px_rgba(201,169,98,0.4)]">
              <defs>
                <radialGradient id="faceGrad1" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#f5d9b0"/>
                  <stop offset="100%" stopColor="#e8b882"/>
                </radialGradient>
                <radialGradient id="dressGrad1" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#7eb8e0"/>
                  <stop offset="100%" stopColor="#3a7aaa"/>
                </radialGradient>
                <radialGradient id="hairGrad1" cx="50%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="#c87840"/>
                  <stop offset="100%" stopColor="#7a3e10"/>
                </radialGradient>
                <filter id="glow1">
                  <feGaussianBlur stdDeviation="1.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              {/* Legs */}
              <ellipse cx="34" cy="100" rx="5" ry="9" fill="#e8b882"/>
              <ellipse cx="46" cy="100" rx="5" ry="9" fill="#e8b882"/>
              {/* Shoes */}
              <ellipse cx="33" cy="108" rx="6" ry="3" fill="#3a2a14"/>
              <ellipse cx="47" cy="108" rx="6" ry="3" fill="#3a2a14"/>
              {/* Dress */}
              <path d="M22 68 Q40 62 58 68 L62 100 Q40 106 18 100 Z" fill="url(#dressGrad1)" filter="url(#glow1)"/>
              <path d="M22 68 Q40 60 58 68" fill="none" stroke="#a8d8f8" strokeWidth="1.2" opacity="0.6"/>
              {/* Dress stars */}
              {[[32,78],[44,75],[38,86],[50,82]].map(([dx,dy],i)=>(
                <circle key={i} cx={dx} cy={dy} r="1" fill="#e4cf8a" opacity="0.7"/>
              ))}
              {/* Belt / sash */}
              <path d="M26 72 Q40 68 54 72" fill="none" stroke="#c9a962" strokeWidth="1.5" opacity="0.8"/>
              {/* Body */}
              <ellipse cx="40" cy="60" rx="14" ry="12" fill="#f0c898"/>
              {/* Arms */}
              <path d="M26 62 Q16 68 14 78" stroke="#e8b882" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M54 62 Q64 68 66 78" stroke="#e8b882" strokeWidth="6" strokeLinecap="round" fill="none"/>
              {/* Left hand — holding lantern */}
              <circle cx="14" cy="80" r="5" fill="#e8b882"/>
              {/* Lantern */}
              <rect x="6" y="83" width="8" height="10" rx="2" fill="#c9a962" opacity="0.9"/>
              <rect x="8" y="81" width="4" height="3" rx="1" fill="#a88b4a"/>
              <rect x="7" y="83" width="6" height="10" rx="1.5" fill="none" stroke="#e4cf8a" strokeWidth="0.5" opacity="0.6"/>
              <ellipse cx="10" cy="88" rx="2" ry="3" fill="#fff9e0" opacity="0.8"/>
              {/* Lantern glow */}
              <circle cx="10" cy="88" r="5" fill="#e4cf8a" opacity="0.2"/>
              {/* Neck */}
              <rect x="37" y="48" width="6" height="8" rx="3" fill="#f0c898"/>
              {/* Head */}
              <ellipse cx="40" cy="38" rx="14" ry="15" fill="url(#faceGrad1)"/>
              {/* Hair back */}
              <path d="M26 34 Q28 15 40 18 Q52 15 54 34 Q54 52 40 55 Q26 52 26 34Z" fill="url(#hairGrad1)" opacity="0.5"/>
              {/* Hair front */}
              <path d="M28 26 Q30 10 40 12 Q50 10 52 26 Q52 18 40 16 Q28 18 28 26Z" fill="url(#hairGrad1)"/>
              {/* Hair side pieces */}
              <path d="M26 28 Q20 36 22 46 Q28 44 30 38Z" fill="url(#hairGrad1)"/>
              <path d="M54 28 Q60 36 58 46 Q52 44 50 38Z" fill="url(#hairGrad1)"/>
              {/* Hair highlight */}
              <path d="M34 14 Q40 12 45 15" stroke="#e8a855" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" fill="none"/>
              {/* Flower in hair */}
              <circle cx="28" cy="26" r="4" fill="#e87898" opacity="0.9"/>
              {[[28,22],[24,26],[28,30],[32,26]].map(([px,py],i)=>(
                <ellipse key={i} cx={px} cy={py} rx="2.5" ry="1.5"
                  transform={`rotate(${i*90} ${px} ${py})`} fill="#f8a8c8" opacity="0.7"/>
              ))}
              <circle cx="28" cy="26" r="2" fill="#ffe0b2"/>
              {/* Eyes — large Pixar style */}
              <ellipse cx="34" cy="36" rx="5" ry="5.5" fill="#1a2a3a"/>
              <ellipse cx="46" cy="36" rx="5" ry="5.5" fill="#1a2a3a"/>
              {/* Iris */}
              <ellipse cx="34" cy="36.5" rx="3.5" ry="4" fill="#3a6a9a"/>
              <ellipse cx="46" cy="36.5" rx="3.5" ry="4" fill="#3a6a9a"/>
              {/* Pupil */}
              <ellipse cx="34.5" cy="37" rx="2" ry="2.5" fill="#0a1420"/>
              <ellipse cx="46.5" cy="37" rx="2" ry="2.5" fill="#0a1420"/>
              {/* Eye shine */}
              <circle cx="33" cy="34.5" r="1.2" fill="white" opacity="0.9"/>
              <circle cx="45" cy="34.5" r="1.2" fill="white" opacity="0.9"/>
              <circle cx="36" cy="38" r="0.6" fill="white" opacity="0.5"/>
              <circle cx="48" cy="38" r="0.6" fill="white" opacity="0.5"/>
              {/* Eyelashes */}
              {[[-3,-2,-1],[0,-2.5,0],[3,-2,1]].map(([dx,dy,rot],i)=>(
                <line key={i} x1={34+dx} y1={31.5+dy} x2={34+dx+rot*0.5} y2={29.5+dy-0.5}
                  stroke="#0a1420" strokeWidth="0.8" opacity="0.7"/>
              ))}
              {[[-3,-2,-1],[0,-2.5,0],[3,-2,1]].map(([dx,dy,rot],i)=>(
                <line key={i} x1={46+dx} y1={31.5+dy} x2={46+dx+rot*0.5} y2={29.5+dy-0.5}
                  stroke="#0a1420" strokeWidth="0.8" opacity="0.7"/>
              ))}
              {/* Nose */}
              <ellipse cx="40" cy="42" rx="2" ry="1.2" fill="#d49060" opacity="0.4"/>
              {/* Smile */}
              <path d="M35 46 Q40 50 45 46" stroke="#c06840" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              {/* Cheeks blush */}
              <ellipse cx="30" cy="43" rx="5" ry="3" fill="#f08080" opacity="0.18"/>
              <ellipse cx="50" cy="43" rx="5" ry="3" fill="#f08080" opacity="0.18"/>

              {/* Name tag floating */}
              {name && (
                <g transform="translate(40,5)">
                  <text textAnchor="middle" fontFamily="Georgia,serif" fontSize="5" fill="#e4cf8a" opacity="0.9">{name}</text>
                </g>
              )}
            </svg>

            {/* Hovering butterfly near hand */}
            <motion.div className="absolute top-4 -right-4"
              animate={{y:[-4,4,-4],rotate:[-8,8,-8]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}}>
              <svg viewBox="0 0 24 20" className="h-5 w-5 opacity-80">
                <path d="M12 10 Q6 2 2 4 Q0 8 4 12 Q8 16 12 10Z" fill="#a8d8f8" opacity="0.7"/>
                <path d="M12 10 Q18 2 22 4 Q24 8 20 12 Q16 16 12 10Z" fill="#88c8e8" opacity="0.7"/>
                <path d="M12 10 Q7 12 4 16 Q6 20 10 16 Q12 14 12 10Z" fill="#7ab8d8" opacity="0.55"/>
                <path d="M12 10 Q17 12 20 16 Q18 20 14 16 Q12 14 12 10Z" fill="#6aaac8" opacity="0.55"/>
                <line x1="12" y1="8" x2="12" y2="18" stroke="#3a7aaa" strokeWidth="0.5"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Foreground fern overlays */}
      <svg className="pointer-events-none absolute bottom-0 left-0 h-16 w-20 opacity-60" viewBox="0 0 60 50">
        <path d="M5 50 Q10 30 20 20 Q15 32 25 28 Q18 36 30 32 Q22 40 35 38 Q25 44 38 44 Q28 48 40 48" stroke="#1a4a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M5 50 Q8 32 14 24 Q10 34 16 32" stroke="#1a4a20" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
      </svg>
      <svg className="pointer-events-none absolute bottom-0 right-0 h-16 w-20 scale-x-[-1] opacity-50" viewBox="0 0 60 50">
        <path d="M5 50 Q10 30 20 20 Q15 32 25 28 Q18 36 30 32 Q22 40 35 38 Q25 44 38 44 Q28 48 40 48" stroke="#1a4a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COVER 2 — MAGIC PORTRAIT FRAME
   Gold arch window. Child illustrated inside as painted portrait.
════════════════════════════════════════════════════════════ */

function CoverMagicFrame({ name, transforming }: { name: string; transforming: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep night sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1e] via-[#0a1830] to-[#040a14]" />

      {/* Moonlight from top */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-48 w-56 rounded-full bg-[#f3ead8]/[0.08] blur-3xl" />

      {/* Stars — fewer, more elegant */}
      {[[6,5],[20,3],[35,8],[52,4],[68,7],[84,3],[14,15],[75,12],[90,18],[45,2]].map(([x,y],i)=>(
        <motion.div key={i} className="absolute rounded-full bg-[#f3ead8]"
          style={{left:`${x}%`,top:`${y}%`,width:i%3===0?1.5:1,height:i%3===0?1.5:1}}
          animate={{opacity:[0.3,0.8,0.3]}}
          transition={{duration:3+i%3,delay:i*0.5,repeat:Infinity}}
        />
      ))}

      {/* Clouds, wisps */}
      <div className="absolute left-[-5%] top-[22%] h-14 w-40 rounded-full bg-[#142a45]/50 blur-2xl opacity-70" />
      <div className="absolute right-[-5%] top-[30%] h-12 w-32 rounded-full bg-[#0e2038]/60 blur-2xl opacity-60" />
      <div className="absolute inset-x-[20%] top-[42%] h-10 w-[60%] rounded-full bg-[#0c1a2e]/40 blur-xl opacity-40" />

      {/* ── ORNATE GOLD ARCH FRAME ── */}
      <div className="absolute inset-x-[12%] top-[8%]" style={{height:"62%"}}>
        {/* Arch glow */}
        <div className="absolute inset-0 rounded-t-full bg-gradient-to-b from-[#c9a962]/[0.08] via-[#c9a962]/[0.04] to-transparent blur-md" />

        {/* Frame SVG */}
        <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {/* Outer arch */}
          <path d="M4 130 L4 55 Q4 4 50 4 Q96 4 96 55 L96 130" fill="none"
            stroke="url(#goldGrad2)" strokeWidth="2.5" opacity="0.85"/>
          {/* Inner arch */}
          <path d="M11 130 L11 57 Q11 12 50 12 Q89 12 89 57 L89 130" fill="none"
            stroke="url(#goldGrad2)" strokeWidth="1" opacity="0.4"/>
          {/* Top crown ornament */}
          <circle cx="50" cy="6" r="3.5" fill="#e4cf8a" opacity="0.9"/>
          <path d="M44 6 Q50 0 56 6" fill="none" stroke="#c9a962" strokeWidth="1.2" opacity="0.7"/>
          {/* Side gems */}
          <circle cx="4" cy="55" r="3" fill="#c9a962" opacity="0.7"/>
          <circle cx="96" cy="55" r="3" fill="#c9a962" opacity="0.7"/>
          {/* Laurel left */}
          <path d="M4 45 Q2 38 6 32 Q8 38 4 45Z" fill="#c9a962" opacity="0.4"/>
          <path d="M4 40 Q0 34 4 28 Q6 34 4 40Z" fill="#c9a962" opacity="0.3"/>
          {/* Laurel right */}
          <path d="M96 45 Q98 38 94 32 Q92 38 96 45Z" fill="#c9a962" opacity="0.4"/>
          <path d="M96 40 Q100 34 96 28 Q94 34 96 40Z" fill="#c9a962" opacity="0.3"/>
          {/* Arch stars */}
          {[[25,10],[50,5],[75,10],[15,22],[85,22]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1" fill="#e4cf8a" opacity="0.7"/>
          ))}
          {/* Bottom flourish */}
          <path d="M20 130 Q50 124 80 130" fill="none" stroke="#c9a962" strokeWidth="0.8" opacity="0.45"/>
          <defs>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0e0a0"/>
              <stop offset="40%" stopColor="#c9a962"/>
              <stop offset="100%" stopColor="#a08040"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Illustrated child inside arch */}
        <div className="absolute inset-x-[12%] top-[6%] bottom-[4%] overflow-hidden"
          style={{borderRadius:"50% 50% 0 0 / 55% 55% 0 0", clipPath:"none"}}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3050] via-[#0e2040] to-[#081428]" />

          {/* Soft moonlit glow inside */}
          <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-[#f3ead8]/[0.07] blur-2xl" />

          <AnimatePresence mode="wait">
            {transforming ? (
              <motion.div key="t" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                className="flex h-full items-center justify-center">
                <motion.div className="h-8 w-8 rounded-full border border-[#c9a962]/50 bg-[#c9a962]/10"
                  animate={{scale:[1,1.3,1]}} transition={{duration:1.4,repeat:Infinity}}/>
              </motion.div>
            ) : (
              <motion.div key="portrait" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}}
                className="relative flex h-full items-end justify-center pb-2">
                {/* Painted portrait SVG */}
                <svg viewBox="0 0 70 95" className="h-full w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  <defs>
                    <radialGradient id="faceGrad2" cx="50%" cy="35%" r="55%">
                      <stop offset="0%" stopColor="#f0cda0"/>
                      <stop offset="100%" stopColor="#d8a870"/>
                    </radialGradient>
                    <radialGradient id="dressGrad2" cx="50%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#9a70d0"/>
                      <stop offset="100%" stopColor="#5a3a90"/>
                    </radialGradient>
                  </defs>
                  {/* Dress/body */}
                  <path d="M15 62 Q35 56 55 62 L58 94 Q35 100 12 94Z" fill="url(#dressGrad2)"/>
                  {/* Dress details */}
                  <path d="M20 70 Q35 66 50 70" stroke="#b898e8" strokeWidth="0.8" fill="none" opacity="0.6"/>
                  <path d="M18 78 Q35 74 52 78" stroke="#b898e8" strokeWidth="0.8" fill="none" opacity="0.4"/>
                  {/* Star embroidery */}
                  {[[28,75],[42,72],[35,82]].map(([x,y],i)=>(
                    <path key={i} d={`M${x} ${y-2} L${x+1} ${y} L${x+2} ${y} L${x+1} ${y+1.5} L${x+1.5} ${y+3} L${x} ${y+2} L${x-1.5} ${y+3} L${x-1} ${y+1.5} L${x-2} ${y} L${x-1} ${y} Z`}
                      fill="#e4cf8a" opacity="0.6"/>
                  ))}
                  {/* Body */}
                  <ellipse cx="35" cy="54" rx="12" ry="10" fill="#eab890"/>
                  {/* Arms */}
                  <path d="M23 56 Q14 62 12 72" stroke="#e0a878" strokeWidth="5" strokeLinecap="round" fill="none"/>
                  <path d="M47 56 Q56 62 58 72" stroke="#e0a878" strokeWidth="5" strokeLinecap="round" fill="none"/>
                  {/* Neck */}
                  <rect x="32" y="44" width="6" height="7" rx="3" fill="#eab890"/>
                  {/* Head */}
                  <ellipse cx="35" cy="34" rx="14" ry="15" fill="url(#faceGrad2)"/>
                  {/* Hair — long, wavy, dark */}
                  <path d="M21 30 Q20 12 35 14 Q50 12 49 30 Q50 50 35 52 Q20 50 21 30Z" fill="#3a2010" opacity="0.45"/>
                  <path d="M23 22 Q24 6 35 8 Q46 6 47 22" fill="#4a2a14"/>
                  <path d="M21 24 Q16 34 18 48 Q24 46 26 38Z" fill="#4a2a14"/>
                  <path d="M49 24 Q54 34 52 48 Q46 46 44 38Z" fill="#4a2a14"/>
                  {/* Hair shimmer */}
                  <path d="M28 10 Q35 8 42 11" stroke="#8a5030" strokeWidth="1" opacity="0.5" fill="none"/>
                  {/* Crown / tiara */}
                  <path d="M24 20 L27 14 L30 18 L35 12 L40 18 L43 14 L46 20" stroke="#e4cf8a" strokeWidth="1.2" fill="none" opacity="0.9"/>
                  {[27,35,43].map((x,i)=>(
                    <circle key={i} cx={x} cy={i===1?12:14} r={i===1?1.8:1.2} fill="#e4cf8a" opacity="0.9"/>
                  ))}
                  {/* Eyes — expressive, large */}
                  <ellipse cx="29" cy="33" rx="5" ry="5.5" fill="#1a1a2a"/>
                  <ellipse cx="41" cy="33" rx="5" ry="5.5" fill="#1a1a2a"/>
                  <ellipse cx="29" cy="33.5" rx="3.5" ry="4" fill="#6a4a9a"/>
                  <ellipse cx="41" cy="33.5" rx="3.5" ry="4" fill="#6a4a9a"/>
                  <ellipse cx="29.5" cy="34" rx="2" ry="2.5" fill="#0a0a18"/>
                  <ellipse cx="41.5" cy="34" rx="2" ry="2.5" fill="#0a0a18"/>
                  <circle cx="28" cy="31.5" r="1.2" fill="white" opacity="0.9"/>
                  <circle cx="40" cy="31.5" r="1.2" fill="white" opacity="0.9"/>
                  {/* Nose */}
                  <ellipse cx="35" cy="38" rx="1.8" ry="1" fill="#c08858" opacity="0.4"/>
                  {/* Smile — gentle */}
                  <path d="M30 43 Q35 47 40 43" stroke="#b06848" strokeWidth="1" strokeLinecap="round" fill="none"/>
                  {/* Cheeks */}
                  <ellipse cx="25" cy="40" rx="5" ry="3" fill="#e87870" opacity="0.16"/>
                  <ellipse cx="45" cy="40" rx="5" ry="3" fill="#e87870" opacity="0.16"/>
                  {/* Name */}
                  {name && (
                    <text x="35" y="3" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.5" fill="#e4cf8a" opacity="0.8">{name}</text>
                  )}
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Frame glints */}
        {[[5,20],[95,35],[50,2]].map(([x,y],i)=>(
          <motion.div key={i} className="absolute h-1 w-1 rounded-full bg-[#f0e8c0]"
            style={{left:`${x}%`,top:`${y}%`}}
            animate={{opacity:[0,1,0],scale:[0.5,1.5,0.5]}}
            transition={{duration:2.5,delay:i*1.2,repeat:Infinity}}
          />
        ))}
      </div>

      {/* Misty ground */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#040a14] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-[#081020]/70 blur-sm" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COVER 3 — DREAMY SILHOUETTE
   Cinematic child silhouette against moonlit world.
════════════════════════════════════════════════════════════ */

function CoverSilhouette({ name, transforming }: { name: string; transforming: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very dark sky, indigo-black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04080f] via-[#060e1c] to-[#02060e]" />

      {/* Milky gradient across sky */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#0e1e38]/60 to-transparent" />

      {/* Stars — denser, more cinematic */}
      {[
        [5,4],[12,8],[22,3],[33,6],[45,2],[58,5],[70,9],[82,4],[92,7],
        [8,14],[28,12],[48,16],[65,11],[80,15],[95,13],
        [18,22],[38,20],[60,24],[78,19],
      ].map(([x,y],i)=>(
        <motion.div key={i} className="absolute rounded-full bg-[#f3ead8]"
          style={{left:`${x}%`,top:`${y}%`,width:i%4===0?2:i%3===0?1.5:1,height:i%4===0?2:i%3===0?1.5:1}}
          animate={{opacity:[0.25,0.75+(i%3)*0.1,0.25]}}
          transition={{duration:2+(i%5),delay:i*0.3,repeat:Infinity}}
        />
      ))}

      {/* BIG full moon, low on horizon */}
      <div className="absolute bottom-[33%] left-1/2 -translate-x-1/2 h-28 w-28 rounded-full"
        style={{
          background:"radial-gradient(circle at 40% 35%, #faf4e0 0%, #f0e0a8 30%, #d4b870 70%, #b89840 100%)",
          boxShadow:"0 0 60px 20px rgba(243,224,168,0.2), 0 0 120px 50px rgba(201,169,98,0.1)",
        }} />
      {/* Moon halo rings */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 h-44 w-44 -translate-x-1/2 rounded-full border border-[#f3ead8]/08" />
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 h-60 w-60 -translate-x-1/2 rounded-full border border-[#f3ead8]/04" />

      {/* Moon craters (subtle) */}
      <div className="absolute bottom-[37%] left-[42%] h-3 w-4 rounded-full bg-[#c8a855]/20 blur-[2px]" />
      <div className="absolute bottom-[40%] left-[52%] h-2 w-2 rounded-full bg-[#c8a855]/15 blur-[2px]" />

      {/* Horizon mist */}
      <div className="absolute bottom-[30%] inset-x-0 h-16 bg-gradient-to-t from-[#0a1a2e]/60 via-[#0a1a2e]/20 to-transparent blur-sm" />

      {/* Distant castle/towers */}
      <svg className="absolute bottom-[32%] left-1/2 -translate-x-1/2 w-[45%] opacity-45" viewBox="0 0 120 80">
        <rect x="45" y="30" width="30" height="50" fill="#060c18"/>
        <rect x="35" y="40" width="14" height="40" fill="#060c18"/>
        <rect x="71" y="40" width="14" height="40" fill="#060c18"/>
        <rect x="28" y="50" width="10" height="30" fill="#060c18"/>
        <rect x="82" y="50" width="10" height="30" fill="#060c18"/>
        {/* Battlements */}
        {[45,51,57,63,69].map((x,i)=>(
          <rect key={i} x={x} y={26} width={4} height={6} fill="#060c18"/>
        ))}
        {[35,40].map((x,i)=>(
          <rect key={i} x={x} y={36} width={4} height={5} fill="#060c18"/>
        ))}
        {[71,76].map((x,i)=>(
          <rect key={i} x={x} y={36} width={4} height={5} fill="#060c18"/>
        ))}
        {/* Flag */}
        <line x1="60" y1="14" x2="60" y2="28" stroke="#0a1828" strokeWidth="0.8"/>
        <path d="M60 14 L68 18 L60 22Z" fill="#0a1828"/>
        {/* Window glow */}
        <rect x="56" y="44" width="8" height="10" rx="2" fill="#c9a96230"/>
      </svg>

      {/* Foreground rolling hills */}
      <svg className="absolute inset-x-0 bottom-[14%] w-full opacity-90" viewBox="0 0 320 80" preserveAspectRatio="xMidYMax slice">
        <path d="M0 80 Q40 40 80 55 T160 45 T240 52 T320 40 L320 80Z" fill="#040810"/>
        <path d="M0 80 Q60 55 100 62 T200 58 T280 60 T320 55 L320 80Z" fill="#030608"/>
      </svg>

      {/* ── CHILD SILHOUETTE (illustrated, not photo) ── */}
      <AnimatePresence mode="wait">
        {transforming ? (
          <motion.div key="t" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="absolute bottom-[16%] left-[30%] -translate-x-1/2 flex flex-col items-center gap-1">
            <motion.div className="h-6 w-6 rounded-full border border-[#c9a962]/40 bg-[#c9a962]/08"
              animate={{scale:[1,1.4,1]}} transition={{duration:1.6,repeat:Infinity}}/>
          </motion.div>
        ) : (
          <motion.div key="sil" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.9}}
            className="absolute bottom-[14%] left-[28%] -translate-x-1/2">
            {/* Child silhouette — illustrated, seated/looking up at moon */}
            <svg viewBox="0 0 55 85" className="h-24 w-auto"
              style={{filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.9))"}}>
              {/* Silhouette is very dark with slight rim light from moon */}
              <defs>
                <linearGradient id="silhouetteGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0e1e30"/>
                  <stop offset="60%" stopColor="#070e18"/>
                  <stop offset="100%" stopColor="#030810"/>
                </linearGradient>
              </defs>
              {/* Dress flowing out */}
              <path d="M14 60 Q8 70 4 85 L50 85 Q46 70 40 60 Q27 56 14 60Z" fill="url(#silhouetteGrad)"/>
              {/* Dress hem detail (rim light) */}
              <path d="M6 82 Q27 78 48 82" stroke="#1e3050" strokeWidth="0.6" fill="none" opacity="0.5"/>
              {/* Body */}
              <path d="M18 38 Q27 34 36 38 L40 60 Q27 64 14 60Z" fill="url(#silhouetteGrad)"/>
              {/* Left arm up, pointing at moon */}
              <path d="M18 42 Q10 28 16 14" stroke="url(#silhouetteGrad)" strokeWidth="6" strokeLinecap="round" fill="none"/>
              {/* Right arm down/back */}
              <path d="M36 42 Q42 50 40 58" stroke="#060e18" strokeWidth="5" strokeLinecap="round" fill="none"/>
              {/* Neck */}
              <rect x="24" y="30" width="6" height="9" rx="3" fill="url(#silhouetteGrad)"/>
              {/* Head — looking UP and slightly right toward moon */}
              <ellipse cx="28" cy="22" rx="12" ry="13" fill="url(#silhouetteGrad)"/>
              {/* Hair — long, flowing */}
              <path d="M16 20 Q15 4 28 6 Q41 4 40 20 Q41 36 28 40 Q15 36 16 20Z" fill="#030810" opacity="0.7"/>
              <path d="M16 18 Q11 28 14 40 Q18 38 20 30Z" fill="#030810"/>
              <path d="M40 18 Q44 28 42 40 Q38 38 36 30Z" fill="#030810"/>
              {/* Hair highlight (rim light) */}
              <path d="M38 10 Q41 18 40 28" stroke="#1a3050" strokeWidth="1" opacity="0.5" fill="none"/>
              {/* Finger pointing at moon (rim light) */}
              <path d="M16 14 Q13 8 15 4" stroke="#1e3050" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            </svg>
            {/* Moon-glow rim on silhouette */}
            <div className="absolute inset-0 rounded-full opacity-20"
              style={{background:"radial-gradient(ellipse at 80% 20%, rgba(243,224,168,0.3) 0%, transparent 60%)"}}/>
            {/* Ground shadow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-16 rounded-full bg-black/50 blur-lg"/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Foreground dark ground */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 320 50" preserveAspectRatio="xMidYMax slice">
        <path d="M0 50 Q30 32 65 38 T130 34 T200 36 T270 32 T320 35 L320 50Z" fill="#020508"/>
        <path d="M0 50 Q20 40 50 44 T110 42 T180 44 T240 42 T320 45 L320 50Z" fill="#010304"/>
      </svg>

      {/* Title area bottom glow */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#020508] to-transparent" />

      {name && (
        <p className="absolute bottom-[20%] right-[8%] text-right font-serif text-[7px] italic text-[#e4cf8a]/50 leading-tight">
          {name}&apos;s<br/>story
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COVER CARD WRAPPER
════════════════════════════════════════════════════════════ */

function CoverCard({
  title,
  optionLabel,
  badge,
  description,
  bullets,
  selected,
  onSelect,
  children,
  delay = 0,
}: {
  title: string;
  optionLabel: string;
  badge?: string;
  description: string;
  bullets: string[];
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center"
    >
      {/* Book mockup */}
      <div className="relative w-full max-w-[220px] sm:max-w-[230px]" style={{ perspective: "1400px" }}>
        {/* Drop shadow */}
        <div className="absolute -bottom-5 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl" />

        <motion.div
          animate={{ rotateY: selected ? 0 : -7, scale: selected ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Cover binding shell */}
          <div className={`relative rounded-r-[1.3rem] rounded-l-sm p-[3px] transition-all duration-400 ${
            selected
              ? "shadow-[0_0_60px_rgba(201,169,98,0.35),0_40px_80px_-10px_rgba(0,0,0,0.9)]"
              : "shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]"
          }`}
            style={{
              background: selected
                ? "linear-gradient(155deg,#f0e0a0 0%,#c9a962 35%,#a88b4a 58%,#d4c08a 100%)"
                : "linear-gradient(155deg,#1e3050 0%,#0e1e30 50%,#080e18 100%)",
            }}
          >
            {/* Inner cover */}
            <div className="relative overflow-hidden rounded-r-[1.1rem] rounded-l-[2px]"
              style={{ minHeight: 290 }}>
              {/* Illustrations */}
              {children}

              {/* Film grain */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
              />

              {/* Spine */}
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-4 bg-gradient-to-r from-black/50 to-transparent" />

              {/* Top edge highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f3ead8]/15 to-transparent" />

              {/* Content overlay layer */}
              <div className="relative z-20 flex flex-col items-center px-4 pb-5 pt-3" style={{ minHeight: 290 }}>
                {/* Moonora masthead */}
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-[#c9a962]/80" fill="currentColor">
                    <path d="M8 5c0 2-1.6 3.5-3.5 4 1.5-.8 2.5-2.4 2.5-4 0-1.6-1-3.2-2.5-4C6.4 1.5 8 3 8 5z"/>
                  </svg>
                  <p className="text-[7.5px] font-semibold uppercase tracking-[0.42em] text-[#c9a962]/90">Moonora</p>
                </div>

                {/* Spacer — art fills the middle */}
                <div className="flex-1" style={{ minHeight: 180 }} />

                {/* Title */}
                <motion.p layout
                  className="text-center font-serif text-[0.88rem] leading-snug text-[#f3ead8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-[0.95rem]">
                  {title}
                </motion.p>
                {/* Gold rule */}
                <div className="mx-auto mt-2 h-px w-8 bg-gradient-to-r from-transparent via-[#c9a962]/55 to-transparent" />
              </div>
            </div>
          </div>

          {/* Book spine side */}
          <div className="absolute bottom-0 left-0 top-0 w-2 rounded-l-sm"
            style={{ transform:"rotateY(-90deg) translateZ(-1px) translateX(-1px)",
              background:"linear-gradient(to bottom, #0e1e30, #060e18)",
              transformOrigin:"left center" }} />
        </motion.div>
      </div>

      {/* Card info below */}
      <div className="mt-7 w-full max-w-[230px] text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#c9a962]/75">
            {optionLabel}
          </p>
          {badge && (
            <span className="rounded-full bg-[#c9a962]/15 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-[#c9a962]/90">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-[#f3ead8]/55">{description}</p>
        <ul className="mt-3 space-y-1 text-left">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#f3ead8]/42">
              <span className="mt-0.5 shrink-0 text-[#c9a962]/60">✦</span>
              {b}
            </li>
          ))}
        </ul>
        <button
          onClick={onSelect}
          className={`mt-4 w-full rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-250 ${
            selected
              ? "bg-gradient-to-r from-[#c9a962] to-[#e4cf8a] text-[#040c18] shadow-[0_0_30px_rgba(201,169,98,0.4)]"
              : "border border-white/12 bg-white/[0.04] text-[#f3ead8]/75 hover:border-[#c9a962]/35 hover:bg-white/[0.07] hover:text-[#f3ead8]/90"
          }`}
        >
          {selected ? "✓ Selected" : "Select this cover"}
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════ */

export function CoverOptionsSection({
  photoUrl,
  name,
}: {
  photoUrl: string | null;
  name: string;
}) {
  const [selected, setSelected] = useState<0 | 1 | 2>(0);
  const [transforming, setTransforming] = useState(false);
  const title = name.trim() ? `${name.trim()} and the Moon Forest` : "The Moon Forest";

  // Brief "illustrating" animation whenever photo is uploaded
  useEffect(() => {
    if (!photoUrl) return;
    setTransforming(true);
    const t = setTimeout(() => setTransforming(false), 2200);
    return () => clearTimeout(t);
  }, [photoUrl]);

  const covers: {
    optionLabel: string;
    badge?: string;
    description: string;
    bullets: string[];
    scene: React.ReactNode;
  }[] = [
    {
      optionLabel: "Option 1 — Full Illustration",
      badge: "Recommended",
      description: "Your child is fully hand-illustrated as a cinematic Pixar character — living inside the story world.",
      bullets: [
        "Complete immersion in the moon forest",
        "Child becomes part of the illustration",
        "Emotionally expressive, painterly style",
      ],
      scene: <CoverFullIllustration name={name} transforming={transforming} />,
    },
    {
      optionLabel: "Option 2 — Magic Portrait Frame",
      description: "An illustrated portrait of your child, set inside an ornate gold arch that becomes a window into the story.",
      bullets: [
        "Photo used as reference for painted portrait",
        "Premium gold architectural frame",
        "Elegant — real photo character preserved",
      ],
      scene: <CoverMagicFrame name={name} transforming={transforming} />,
    },
    {
      optionLabel: "Option 3 — Dreamy Silhouette",
      description: "A cinematic silhouette of your child gazing at a moonlit world — mysterious, elegant, deeply emotional.",
      bullets: [
        "Cinematic moonlit atmosphere",
        "Child silhouette pointing at the moon",
        "Story world as the main visual",
      ],
      scene: <CoverSilhouette name={name} transforming={transforming} />,
    },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#050b18] to-night-950" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c9a962]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a962]/75">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a962]/50" />
            Cover style
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a962]/50" />
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#f3ead8] sm:text-[2.1rem]">
            How should your child appear on the cover?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#f3ead8]/48 sm:text-[0.95rem]">
            Your photo is used only as a reference. Our studio illustrates your child entirely
            in the style of the chosen cover — never pasted, never cropped.
          </p>
        </motion.div>

        {/* Photo upload notice */}
        <AnimatePresence>
          {photoUrl && transforming && (
            <motion.div
              key="notice"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-8 max-w-sm"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-[#c9a962]/20 bg-[#c9a962]/[0.06] px-5 py-3.5">
                <motion.div className="h-2 w-2 shrink-0 rounded-full bg-[#c9a962]"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }} />
                <p className="text-xs text-[#f3ead8]/70">
                  Generating illustrated previews from your photo…
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Three cover cards */}
        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {covers.map((c, i) => (
            <CoverCard
              key={i}
              title={title}
              optionLabel={c.optionLabel}
              badge={c.badge}
              description={c.description}
              bullets={c.bullets}
              selected={selected === i}
              onSelect={() => setSelected(i as 0 | 1 | 2)}
              delay={i * 0.13}
            >
              {c.scene}
            </CoverCard>
          ))}
        </div>

        {/* Recommendation note */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#c9a962]/12 bg-[#c9a962]/[0.035] px-6 py-5"
        >
          <p className="flex items-start gap-3 text-sm leading-relaxed text-[#f3ead8]/60">
            <span className="mt-0.5 shrink-0 text-[#c9a962]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
                <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span>
              <span className="font-medium text-[#f3ead8]/85">Our recommendation: </span>
              Choose the <span className="text-[#c9a962]">Full Illustration Cover</span> for the most magical, immersive result — your child becomes a true character in the story. Or choose the{" "}
              <span className="text-[#c9a962]">Magic Portrait Frame</span> if you want the illustrated portrait to closely resemble your child&apos;s real face.
            </span>
          </p>
        </motion.div>

        {/* Continue CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c9a962] to-[#e4cf8a] px-8 py-3.5 text-sm font-semibold text-[#040c18] shadow-[0_0_40px_rgba(201,169,98,0.2)] transition hover:brightness-105 hover:shadow-[0_0_60px_rgba(201,169,98,0.3)]">
            Continue with selected cover
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
