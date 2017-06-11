import React, { PropTypes } from 'react';
import Textarea from '../components/Textarea';

const InputForm = ({
  content,
  onSubmit,
  onChange,
  maxCharacters
}) => {
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit();
  }

  const onTextChange = value => {
    if (value.length <= maxCharacters) {
      onChange(value);
    }
  }

  return (
    <div className="form">
      <form className="comment-form" onSubmit={handleSubmit}>
        <Textarea
          title="Palaute"
          onTextChange={onTextChange}
          value={content}
        />
        <p className="footnote align-right">Merkkejä jäljellä {maxCharacters - content.length}</p>
        <button className={'margin-1 btn ' + (content.length < 5 && 'disabled')} type="submit">Lähetä</button>
      </form>
    </div>
  )
}

InputForm.defaultProps = {
  maxCharacters: 500
}

InputForm.propTypes = {
  content: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  maxCharacters: PropTypes.number
}

export default InputForm
