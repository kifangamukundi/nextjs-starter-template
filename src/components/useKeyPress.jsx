'use client'
import React, {useEffect, useState} from "react";

const useKeyPress = (keyMap, callbackMap) => {
    const [keyPressed, setKeyPressed] = useState(new Set());

    const downHandler = (event) => {
      // event.preventDefault();
      const { key, altKey, shiftKey, ctrlKey } = event;
  
      const modifiers = [];
      if (altKey) modifiers.push('alt');
      if (shiftKey) modifiers.push('shift');
      if (ctrlKey) modifiers.push('ctrl');
  
      // Generate all possible combinations of modifiers and key
      const combinations = [      [key.toLowerCase()],
        [modifiers.join('+'), key.toLowerCase()],
        [modifiers.reverse().join('+'), key.toLowerCase()]
      ];
  
      for (const combination of combinations) {
        const id = keyMap[combination.join('+')];
        const callback = callbackMap[id];
        if (callback) {
          const newKeyPressed = new Set(keyPressed);
          newKeyPressed.add(combination.join('+'));
          setKeyPressed(newKeyPressed);
          callback();
          break;
        }
      }
    };
  
    const upHandler = (event) => {
      // event.preventDefault();
      const { key, altKey, shiftKey, ctrlKey } = event;
  
      const modifiers = [];
      if (altKey) modifiers.push('alt');
      if (shiftKey) modifiers.push('shift');
      if (ctrlKey) modifiers.push('ctrl');
  
      // Generate all possible combinations of modifiers and key
      const combinations = [      [key.toLowerCase()],
        [modifiers.join('+'), key.toLowerCase()],
        [modifiers.reverse().join('+'), key.toLowerCase()]
      ];
  
      for (const combination of combinations) {
        const id = keyMap[combination.join('+')];
        const callback = callbackMap[id];
        if (callback) {
          const newKeyPressed = new Set(keyPressed);
          newKeyPressed.delete(combination.join('+'));
          setKeyPressed(newKeyPressed);
          break;
        }
      }
    };
    
      
  
    useEffect(() => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
  
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    });
  
    return keyPressed;
  };

export default useKeyPress;
  