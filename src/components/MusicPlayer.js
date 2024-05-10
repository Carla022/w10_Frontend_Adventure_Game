import React, { useEffect } from 'react';
import { Howl} from 'howler';
import music1 from '../sound/achaidh-cheide-kevin-macleod-main-version-18632-02-14.mp3';
import music2 from '../sound/folk-round-kevin-macleod-main-version-18634-03-03.mp3';
import music3 from '../sound/sound1.mp3';


const MusicPlayer = () => {
  useEffect(() => {
    const sounds = [
      music1,
      music2,
      music3
    ];

    const sound = new Howl({
      src: [sounds[0]],
      loop: false,
      onend: () => {
        const nextSoundIndex = (sound.playing() ? sound.playing() + 1 : 0) % [sounds].length;
        sound.stop();
        sound.play(sounds[nextSoundIndex]);
      }
    });

    // Start playing the first sound
    sound.play();

    // Clean up when the component unmounts
    return () => {
      sound.unload();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount
};

export default MusicPlayer;











