import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearState, EditProps, saveProblem } from './editorSlice';
import grades from './grades';
import { Coords } from '../../hooks/useCanvas';
import { editProblem } from './editorSlice';

interface Props {
  currentBoard: string;
  coords: Array<Coords> | undefined;
  toggleForm?: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: EditProps;
}

const initialState = {
  title: '',
  grade: 0,
  setBy: '',
  rules: 'Feet follow hands',
  board: '',
  date: new Date().toISOString()
};
const EditorForm: FC<Props> = ({ currentBoard, coords, toggleForm, edit }) => {
  const [formData, setFormData] = useState(initialState);
  const renders = useRef(0);
  const history = useHistory();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user.name);
  const status = useAppSelector((state) => state.editor.status);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!edit) {
      dispatch(
        saveProblem({
          ...formData,
          setBy: user,
          coords,
          board: currentBoard
        })
      );
    } else {
      dispatch(
        editProblem({
          title,
          rules,
          grade,
          coords,
          problemId: edit.problemId
        })
      );
      if (toggleForm) toggleForm(false);
    }
  };

  // In case of editing, load pre-edit values on first render
  useEffect(() => {
    if (!edit || renders.current > 0) return;
    setFormData({
      ...initialState,
      ...edit
    });
    renders.current++;
  }, [edit, renders]);

  useEffect(() => {
    if (status === 'resolved') {
      history.push('/browse');
    }
    return () => {
      dispatch(clearState());
    };
  }, [status, history, dispatch]);

  const { title, grade, rules } = formData;
  return (
    <form
      className='form menu-animation-down'
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Feet follow hands?'
          name='rules'
          value={rules}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div>
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            padding: '0.4rem',
            color: `${grades[grade].color}`
          }}
        >
          <strong>{grades[grade].grade}</strong>
        </p>
        <div className='div-center'>
          <input
            type='range'
            name='grade'
            min={0}
            max={grades.length - 1}
            value={grade}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
      </div>
      <div>
        <input
          type='submit'
          className='submit-button'
          value={edit ? 'Edit Problem' : 'Save Problem'}
        ></input>
      </div>
    </form>
  );
};

export default EditorForm;
