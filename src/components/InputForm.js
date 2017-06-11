import React, { PropTypes } from 'react';
import Textarea from '../components/Textarea';

const InputForm = ({
  content,
  onSubmit,
  onChange
}) => {
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="form">
      <form className="comment-form" onSubmit={handleSubmit}>
        <Textarea
          title="Palaute"
          onTextChange={onChange}
          value={content}
        />
        <p className="footnote align-right">Merkkejä {content.length}</p>
        <button className={'margin-1 btn ' + (content.length < 5 && 'disabled')} type="submit">Lähetä</button>
      </form>
    </div>
  )
}



InputForm.propTypes = {
  content: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default InputForm
