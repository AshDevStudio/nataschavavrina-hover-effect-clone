import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './index.css';

const images = {
  leftSide: [
    "https://images.unsplash.com/photo-1682687218608-5e2522b04673?ixlib=rb-4.0.3&auto=format&fit=crop&w=2575&q=80",
    "https://images.unsplash.com/photo-1683446297911-f4a1fa8e62dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2564&q=80",
    "https://images.unsplash.com/photo-1683573254548-ebb7b94d7def?ixlib=rb-4.0.3&auto=format&fit=crop&w=1353&q=80",
    "https://images.unsplash.com/photo-1683053243792-28e9d984c25a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80",
  ],
  rightSide: [
    "https://images.unsplash.com/photo-1682709846996-f3c895743d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1682794496831-81a52c8e9136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1682314803906-d2078f031d82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1682200736161-77f04daf9a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80",
  ]
};

function App() {
  const container = useRef();
  const [activeSide, setActiveSide] = useState(null);
  const { contextSafe } = useGSAP({ scope: container });

  const ANIM_DURATION = 1.2;
  const ANIM_EASE = "expo.out"; 

  // --- MOUSE MOVE PARALLAX ---
  const handleMouseMove = contextSafe((e) => {
    if (!activeSide) return;
    const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
    const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to('.img-one', { x: xVal * 40, y: yVal * 40, duration: 0.8, ease: 'power2.out' });
    gsap.to('.img-two', { x: xVal * 60, y: yVal * 60, duration: 0.8, ease: 'power2.out' });
    gsap.to('.img-three', { x: xVal * 30, y: yVal * 30, duration: 0.8, ease: 'power2.out' });
    gsap.to('.img-four', { x: xVal * 80, y: yVal * 80, duration: 0.8, ease: 'power2.out' });
  });

  const handleMouseEnter = contextSafe((side) => {
    if (activeSide === side) return;
    setActiveSide(side);
    const isLeft = side === 'left';
    
    gsap.to(isLeft ? '.c-center-one' : '.c-center-two', {
      height: '100vh',
      duration: 1, 
      ease: 'power3.inOut'
    });

    if (isLeft) {
        gsap.to('#one', { width: '25vw', height: '25vh', opacity: 1, filter: 'blur(0.5px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.to('#two', { width: '15vw', height: '17vh', opacity: 1, filter: 'blur(5px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.to('#three', { width: '10vw', height: '12vh', opacity: 0.5, filter: 'blur(20px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.to('#four', { width: '7vw', height: '7vh', opacity: 0.3, filter: 'blur(20px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.fromTo('#btn-lft h3', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }); // Snappy button text
    } else {
        gsap.to('#five', { width: '25vw', height: '25vh', opacity: 1, filter: 'blur(0.5px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.to('#six', { width: '15vw', height: '17vh', opacity: 1, filter: 'blur(5px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.to('#seven', { width: '10vw', height: '12vh', opacity: 0.5, filter: 'blur(20px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.to('#eight', { width: '7vw', height: '7vh', opacity: 0.3, filter: 'blur(20px)', duration: ANIM_DURATION, ease: ANIM_EASE });
        gsap.fromTo('#btn-rght h3', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    setActiveSide(null);
    gsap.to('.img-all', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });

    gsap.to(['.c-center-one', '.c-center-two'], { height: '0vh', duration: 0.6, ease: 'power3.inOut' });

    gsap.to(['#one', '#five'], { width: '15vw', height: '10vh', opacity: 0, filter: 'blur(10px)', duration: ANIM_DURATION, ease: ANIM_EASE });
    gsap.to(['#two', '#six'], { width: '10vw', height: '10vh', opacity: 0, filter: 'blur(10px)', duration: ANIM_DURATION, ease: ANIM_EASE });
    gsap.to(['#three', '#seven'], { width: '7vw', height: '9vh', opacity: 0, filter: 'blur(50px)', duration: ANIM_DURATION, ease: ANIM_EASE });
    gsap.to(['#four', '#eight'], { width: '5vw', height: '5vh', opacity: 0, filter: 'blur(50px)', duration: ANIM_DURATION, ease: ANIM_EASE });
  });

  return (
    <div id="main" ref={container} onMouseMove={handleMouseMove}>
      <div className="left" onMouseEnter={() => handleMouseEnter('left')} onMouseLeave={handleMouseLeave}>
        <div id="btn-lft" className="btn"><h3>DIRECTOR WORKS</h3></div>
      </div>

      <div className="center">
        <div className="t-center"><h1>NATA<br />SCHA</h1></div>
        <div className="c-center-one"></div>
        <div className="c-center-two"></div>
        <div className="b-center"><h1>VAV<br />RINA</h1></div>
      </div>

      <div className="right" onMouseEnter={() => handleMouseEnter('right')} onMouseLeave={handleMouseLeave}>
        <div id="btn-rght" className="btn"><h3>Ashish.Web CODING</h3></div>
      </div>

      {/* IMAGES */}
      <div id="one"   className="img-all img-one left-img"   style={{ backgroundImage: `url(${images.leftSide[0]})` }}></div>
      <div id="two"   className="img-all img-two left-img"   style={{ backgroundImage: `url(${images.leftSide[1]})` }}></div>
      <div id="three" className="img-all img-three left-img" style={{ backgroundImage: `url(${images.leftSide[2]})` }}></div>
      <div id="four"  className="img-all img-four left-img"  style={{ backgroundImage: `url(${images.leftSide[3]})` }}></div>
      <div id="five"  className="img-all img-one right-img"   style={{ backgroundImage: `url(${images.rightSide[0]})` }}></div>
      <div id="six"   className="img-all img-two right-img"   style={{ backgroundImage: `url(${images.rightSide[1]})` }}></div>
      <div id="seven" className="img-all img-three right-img" style={{ backgroundImage: `url(${images.rightSide[2]})` }}></div>
      <div id="eight" className="img-all img-four right-img"  style={{ backgroundImage: `url(${images.rightSide[3]})` }}></div>
    </div>
  );
}

export default App;
