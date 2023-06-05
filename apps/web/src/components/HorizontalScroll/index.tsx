import React, { ReactNode } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import usePreventBodyScroll from 'src/ahooks/usePreventBodyScroll';

function onWheel(apiObj: any, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const Index = ({ children }: { children: React.ReactNode }) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  return (
    <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
      <ScrollMenu Header={null} Footer={null} onWheel={onWheel as any}>
        {children as any}
      </ScrollMenu>
    </div>
  );
};

export default Index;
