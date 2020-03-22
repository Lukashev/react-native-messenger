import React from 'react';
import { Path, Svg } from 'react-native-svg'

function ChatIcon({ fill = 'none' }) {
return (
  <Svg width={30} height={30} viewBox="0 0 30 28" fill={fill}><Path d="M4.368 27.207H2.242l1.503-1.503a5.087 5.087 0 001.453-3.008C1.728 20.418 0 17.119 0 13.66 0 7.278 5.865.793 15.05.793 24.783.793 30 6.761 30 13.101c0 6.382-5.273 12.345-14.95 12.345-1.694 0-3.463-.226-5.042-.641a7.878 7.878 0 01-5.64 2.402z" /></Svg>
);
}

export default ChatIcon;