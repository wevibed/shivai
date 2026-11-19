import { useEffect, useRef, useState } from 'react'
import { createShowroom, FINISHES } from './scene'
import { CFG, wa, SETS, PRODUCTS, money } from './config'

const kword = (k) => (k < 25 ? 'warm' : k < 60 ? 'neutral' : 'cool')

export default function App() {
  const cv = useRef(null), story = useRef(null), d3 = useRef(null), d4 = useRef(null), load = useRef(null), sc = useRef(null)
  const [fin, setFin] = useState('Brushed gold')
  const [set, setSet] = useState('rect')
  const [led, setLed] = useState(true)
  const [bright, setBright] = useState(80)
  const [kel, setKel] = useState(20)

  useEffect(() => {
    const ui = {
      story: story.current,
      chs: [...story.current.querySelectorAll('.ch')],
      d3: d3.current, d4: d4.current, load: load.current,
      lbs: [...document.querySelectorAll('.lb')],
      onNoGL: () => document.body.classList.add('nogl'),
    }
    const s = createShowroom(cv.current, ui)
    sc.current = s
    return () => { if (s) s.dispose(); sc.current = null }
  }, [])
  useEffect(() => { sc.current && sc.current.setFin(fin) }, [fin])
  useEffect(() => { sc.current && sc.current.setSet(set) }, [set])
  useEffect(() => { sc.current && sc.current.setLed(led) }, [led])
  useEffect(() => { sc.current && sc.current.setBright(bright / 100) }, [bright])
  useEffect(() => { sc.current && sc.current.setKelvin(kel / 100) }, [kel])

  const S = SETS[set]
  return (
    <>
      <canvas id="c" ref={cv} aria-label="Interactive 3D bathroom. Drag to look around." />
      <div className="shade" /><div className="lb t" /><div className="lb b" />
      <div id="load" ref={load}><b>SHUVAI</b><span>Preparing the showroom</span></div>
      <div id="fb">
        <h2>Shuvai Incorporated</h2>
        <p>The 3D showroom needs a newer browser or device. Message us and we will send photos and prices.</p>
        <a className="wa" href={wa('Hi Shuvai, I’d like photos and prices.')}>Chat on WhatsApp</a>
      </div>
      <div className="brand">SHUVAI<small>Incorporated · Harare</small></div>

      <main><div id="story" ref={story}>
        <section className="ch"><div><h1>SHUVAI</h1><div className="sub">Ordinary bathrooms, made luxurious.</div><p className="hint">Scroll to step inside.</p></div></section>
        <section className="ch top"><div><h2>Floated off the wall.</h2><p>Marble-finish vanities, hung clean and light, under a mirror that glows. Drag to look around.</p></div></section>
        <section className="ch top"><div><h2>Set the light.</h2><p>Switch the LED mirror, dim it, or move from warm evening to cool morning.</p></div></section>
        <section className="ch top"><div><h2>Choose your set.</h2><p>Rectangular or elliptical. Pick your tap finish and the room follows.</p></div></section>
        <section className="ch"><div><h2>Take it home.</h2>
          <div className="card"><h3>{S.name}</h3>
            <ul>{S.parts.map((p) => <li key={p}>{p}</li>)}<li>Tap finish: <b>{fin}</b></li><li>Free delivery around Harare</li><li>Complete set <b>{money(S.price)}</b></li></ul>
            <a className="wa" href={wa(`Hi Shuvai, I’d like to order the ${S.name} (${money(S.price)}) with ${fin} taps.`)} target="_blank" rel="noopener">Enquire on WhatsApp</a>
          </div></div></section>
      </div></main>

      <section id="real">
        <h2>The range</h2>
        <p className="lead">Mirrors, vanities and complete sets, ready from our Westgate Mall showroom.</p>
        <div className="grid">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="pc">
              <img src={p.img} alt={p.name} loading="lazy" />
              <h3>{p.name}</h3><p>{p.text}</p>
              <div className="pr">{money(p.price)}</div>
              <a className="wa" href={wa(`Hi Shuvai, I’m interested in the ${p.name} (${money(p.price)}).`)} target="_blank" rel="noopener">Enquire</a>
            </article>
          ))}
        </div>
        <footer>
          <h3>Visit the showroom</h3>
          <p>{CFG.address}. Free delivery around Harare.</p>
          <p><a href={wa('Hi Shuvai, I’d like to visit the showroom.')}>WhatsApp {CFG.phoneDisplay}</a> · <a href={`mailto:${CFG.email}`}>{CFG.email}</a> · <a href={`https://instagram.com/${CFG.instagram}`} target="_blank" rel="noopener">@{CFG.instagram}</a></p>
        </footer>
      </section>

      <div className="dock" id="d3" ref={d3}>
        <button className="pill" aria-pressed={led} onClick={() => setLed(!led)}>LED {led ? 'on' : 'off'}</button>
        <label className="rg">Brightness<input type="range" min="0" max="100" value={bright} onChange={(e) => setBright(+e.target.value)} aria-label="Mirror brightness" /></label>
        <label className="rg">{kword(kel)}<input type="range" min="0" max="100" value={kel} onChange={(e) => setKel(+e.target.value)} aria-label="Light colour, warm to cool" /></label>
      </div>
      <div className="dock" id="d4" ref={d4}>
        <div style={{ display: 'flex', gap: 10 }}>
          {Object.entries(SETS).map(([k, v]) => (
            <button key={k} className="pill" aria-pressed={set === k} onClick={() => setSet(k)}>{v.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {Object.entries(FINISHES).map(([k, v]) => (
            <button key={k} className="sw" title={k} aria-label={k + ' finish'} aria-pressed={fin === k} style={{ background: v[2] }} onClick={() => setFin(k)} />
          ))}
        </div>
        <div className="fl">Tap finish: <b>{fin}</b></div>
      </div>
    </>
  )
}
