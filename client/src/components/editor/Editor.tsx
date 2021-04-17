import React, { useCallback, useEffect, useState } from 'react';
import { Canvas } from './Canvas';
import { useCanvas } from '../../hooks/useCanvas';
import { Toolbar } from './Toolbar';
import Background from '../../images/covegg19-0,1.jpg';
import EditorForm from './EditorForm';
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Editor = () => {
  const [{ canvas }, { init, handleColor, undo }] = useCanvas();

  const [editorForm, toggleEditorForm] = useState(false);

  const handleSave = useCallback(() => {
    if (!canvas || !canvas.current) return '';
    const dataUrl = canvas.current.toDataURL('image/png');
    return dataUrl;
  }, [canvas]);

  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);

  return (
    <section className='container'>
      <div className='editor'>
        <Toolbar handleColor={handleColor} />
        <div
          className='wall'
          style={{
            width: `${360}px`,
            height: `${478}px`,
            backgroundImage: `url(${Background})`
          }}
        >
          <Canvas canvasRef={canvas} />
        </div>
      </div>
      <div className='options'>
        <button className={'btn-save btn-undo'} onClick={undo}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button
          onClick={() => toggleEditorForm(!editorForm)}
          className={'btn-save'}
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
      {editorForm && <EditorForm handleSave={handleSave} />}
    </section>
  );
};

export default Editor;
