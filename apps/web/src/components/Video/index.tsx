import { VideoPlayer } from '@videojs-player/react';
import 'video.js/dist/video-js.css';
import React, { FC } from 'react';

interface VideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  videoWidth?: number;
  videoHeight?: number;
}

const Index: FC<VideoProps> = ({ src, poster, width, height }) => {
  return (
    <VideoPlayer src={src} poster={poster} controlBar={false} controls volume={0.6} width={width} height={height} />
  );
};

export default Index;
