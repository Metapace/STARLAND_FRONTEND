import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Runner, Mouse, MouseConstraint } from 'matter-js';
import BscScan from 'src/assets/images/homepage/BscScan.png';
import CoinGape from 'src/assets/images/homepage/CoinGape.png';
import CoinGecko from 'src/assets/images/homepage/CoinGecko.png';
import CoinStats from 'src/assets/images/homepage/CoinStats.png';
import Coincodex from 'src/assets/images/homepage/Coincodex.png';
import Coinpaprika from 'src/assets/images/homepage/Coinpaprika.png';
import Whattomine from 'src/assets/images/homepage/Whattomine.png';
import { useInView } from 'react-intersection-observer';
import { useScroll } from 'ahooks';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
const cw = document.body.clientWidth;
const ch = document.body.clientHeight - 74;

function Comp() {
  const scene = useRef<HTMLDivElement>(null);
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const { lang, i18n } = useI18n(locale);
  const postion = useScroll();
  const { ref: inviewRef, inView } = useInView({
    threshold: 0,
  });
  const { ref: inviewRefTop, inView: inViewTop } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (!scene.current) return;

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
  useEffect(() => {
    if (!inView && !inViewTop) {
      World.clear(engine.current.world);
      isPressed.current = false;
      World.add(engine.current.world, [
        Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
        Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
        Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
        Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      ]);
    }
  }, [inView, inViewTop]);
  const handleAddCircle = () => {
    const Ycleint = 150;
    if (!isPressed.current) {
      isPressed.current = true;
      const ball = Bodies.rectangle(850, Ycleint, 278, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: BscScan,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      const ball2 = Bodies.rectangle(720, Ycleint, 278, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: CoinGape,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      const ball3 = Bodies.rectangle(160, Ycleint, 278, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: CoinGecko,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      const ball4 = Bodies.rectangle(220, Ycleint, 320, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: CoinStats,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      const ball5 = Bodies.rectangle(280, Ycleint, 298, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Coincodex,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      const ball6 = Bodies.rectangle(560, Ycleint, 428, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Coinpaprika,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      const ball7 = Bodies.rectangle(1250, Ycleint, 320, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Whattomine,
            xScale: 0.6,
            yScale: 0.5,
          },
        },
      });
      //   World.add(engine.current.world, [ball2]);
      World.add(engine.current.world, [ball, ball2, ball3, ball4, ball5, ball6, ball7]);
    }
  };
  useEffect(() => {
    if (inView) {
      handleAddCircle();
    }
  }, [inView]);

  return (
    <div className={styles['container']}>
      <div></div>
      <div className={styles['top-title']}>{i18n[lang]['intro.channel.title']}</div>
      <div className={styles['top-paragraph']}>{i18n[lang]['intro.channel.describe1']}</div>
      <div className={styles['top-paragraph']} ref={inviewRefTop}>
        {i18n[lang]['intro.channel.describe2']}
      </div>
      <div ref={scene} style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
      <div className={styles['container-bottom']} ref={inviewRef}></div>
    </div>
  );
}

export default Comp;
