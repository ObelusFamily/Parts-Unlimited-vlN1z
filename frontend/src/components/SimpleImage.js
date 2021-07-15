import React, { useState, useCallback, useEffect } from 'react';
import { omit } from 'lodash-es';

const IMAGE_STATE = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export const SimpleImage = (props) => {
    const [imageState, setImageState] = useState(IMAGE_STATE.LOADING);
    const onChange = useCallback(
        (state) => {
            if (imageState === IMAGE_STATE.LOADING) {
              setImageState(state ? IMAGE_STATE.SUCCESS : IMAGE_STATE.FAILED);
            }
        },
        [imageState]
    );
    useEffect(() => {
      setImageState(IMAGE_STATE.LOADING);
    }, [props.src]);

    const imageProps = omit(props, ['defaultSrc']);
    const src = imageState === IMAGE_STATE.FAILED || !props.src ? props.defaultSrc : props.src;

    return <img {...imageProps} src={src} onLoad={() => onChange(true)} onError={() => onChange(false)} />;
};
