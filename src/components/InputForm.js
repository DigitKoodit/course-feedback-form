import React, { PropTypes } from 'react';
import Textarea from '../components/Textarea';

const InputForm = ({
  content,
  errors,
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
        <button className="btn" type="submit">Lähetä</button>
      </form>
    </div>
  )
}



InputForm.propTypes = {
  content: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    commentForm: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default InputForm
