import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Runner } from 'matter-js';
import BscScan from 'src/assets/images/homepage/BscScan.png';
import BlockchainCom from 'src/assets/images/homepage/Blockchain.com.png';
import Coinscreed from 'src/assets/images/homepage/Coinscreed.png';
import Cryptoro from 'src/assets/images/homepage/Crypto.ro.png';
import Cryptopotato from 'src/assets/images/homepage/Cryptopotato.png';
import Dexscreener from 'src/assets/images/homepage/Dexscreener.png';
import Etherscan from 'src/assets/images/homepage/Etherscan.png';
import StormGain from 'src/assets/images/homepage/StormGain.png';
import TheCrypto from 'src/assets/images/homepage/TheCrypto.png';
import CoinGape from 'src/assets/images/homepage/CoinGape.png';
import CoinGecko from 'src/assets/images/homepage/CoinGecko.png';
import CoinStats from 'src/assets/images/homepage/CoinStats.png';
import Coincodex from 'src/assets/images/homepage/Coincodex.png';
import Coinpaprika from 'src/assets/images/homepage/Coinpaprika.png';
import Whattomine from 'src/assets/images/homepage/Whattomine.png';
import { useInView } from 'react-intersection-observer';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
const cw = document.body.clientWidth;
const ch = document.body.clientHeight - 74;

const scaleX = 0.5;
const scaleY = 0.5;

function Comp() {
  const scene = useRef<HTMLDivElement>(null);
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const { lang, i18n } = useI18n(locale);
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
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(cw / 2, ch - 10, cw, 20, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true, render: { visible: false } }),
    ]);

    Runner.run(engine.current);
    Render.run(render);

    return () => {
      if (render) {
        Render.stop(render);
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
        render.canvas.remove();
        render.textures = {};
      }
    };
  }, []);
  useEffect(() => {
    if (!inView && !inViewTop) {
      World.clear(engine.current.world, true);
      isPressed.current = false;
      //   World.add(engine.current.world, [
      //     Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      //     Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      //     Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      //     Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      //   ]);
    }
  }, [inView, inViewTop]);
  const handleAddCircle = () => {
    const Ycleint = 150;
    if (!isPressed.current) {
      isPressed.current = true;
      const ball = Bodies.rectangle(0.1 * cw, Ycleint, 240, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: BscScan,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball2 = Bodies.rectangle(0.2 * cw, Ycleint, 216, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: CoinGape,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball3 = Bodies.rectangle(0.3 * cw, Ycleint, 224, 88, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: CoinGecko,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball4 = Bodies.rectangle(0.4 * cw, Ycleint, 280, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: CoinStats,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball5 = Bodies.rectangle(0.5 * cw, Ycleint, 280, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Coincodex,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball6 = Bodies.rectangle(0.62 * cw, Ycleint, 280, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Coinpaprika,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball7 = Bodies.rectangle(0.7 * cw, Ycleint, 296, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Whattomine,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball8 = Bodies.rectangle(0.8 * cw, Ycleint, 276, 64, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: BlockchainCom,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball9 = Bodies.rectangle(0.9 * cw, Ycleint, 240, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Coinscreed,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball10 = Bodies.rectangle(0.95 * cw, Ycleint, 136, 48, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Cryptoro,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball11 = Bodies.rectangle(0.16 * cw, Ycleint, 224, 56, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Cryptopotato,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball12 = Bodies.rectangle(0.56 * cw, Ycleint, 200, 56, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Dexscreener,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball13 = Bodies.rectangle(0.45 * cw, Ycleint, 256, 72, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: Etherscan,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball14 = Bodies.rectangle(0.75 * cw, Ycleint, 296, 96, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: StormGain,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      const ball15 = Bodies.rectangle(0.28 * cw, Ycleint, 256, 64, {
        mass: 1,
        restitution: 0.9,
        frictionAir: 0.006,
        // friction: 0.005,
        render: {
          sprite: {
            texture: TheCrypto,
            xScale: scaleX,
            yScale: scaleY,
          },
        },
      });
      //   World.add(engine.current.world, [ball2]);
      World.add(engine.current.world, [
        ball,
        ball2,
        ball3,
        ball4,
        ball5,
        ball6,
        ball7,
        ball8,
        ball9,
        ball10,
        ball11,
        ball12,
        ball13,
        ball14,
        ball15,
      ]);
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
