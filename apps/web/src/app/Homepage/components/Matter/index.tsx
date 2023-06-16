import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Runner } from 'matter-js';
import BscScan from 'src/assets/images/homepage/BscScan.png';
import CoinGape from 'src/assets/images/homepage/CoinGape.png';
import CoinGecko from 'src/assets/images/homepage/CoinGecko.png';
import CoinStats from 'src/assets/images/homepage/CoinStats.png';
import Coincodex from 'src/assets/images/homepage/Coincodex.png';
import Coinpaprika from 'src/assets/images/homepage/Coinpaprika.png';
import Whattomine from 'src/assets/images/homepage/Whattomine.png';
import styles from './index.module.less';

function Comp() {
  const scene = useRef<HTMLDivElement>(null);
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());

  useEffect(() => {
    if (!scene.current) return;
    const cw = document.body.clientWidth;
    const ch = 960;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    Runner.run(engine.current);
    Render.run(render);

    return () => {
      if (render) {
        Render.stop(render);
        World.clear(engine.current.world);
        Engine.clear(engine.current);
        render.canvas.remove();
        render.canvas = null;
        render.context = null;
        render.textures = {};
      }
    };
  }, []);

  const handleDown = () => {
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e) => {
    if (isPressed.current) {
      const ball = Bodies.rectangle(e.clientX, e.clientY, 278, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          fillStyle: 'lightgreen',
          strokeStyle: '#ffffff',
          sprite: {
            texture: BscScan,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      World.add(engine.current.world, [ball]);
    }
  };

  return (
    <div onMouseDown={handleDown} onMouseUp={handleUp} onMouseMove={handleAddCircle} className={styles['container']}>
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default Comp;
