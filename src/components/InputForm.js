import React, { PropTypes } from 'react';


const InputForm = ({
  content,
  errors,
  onSubmit,
  onChange
}) =>
  (
    <div className="form">

      <form className="login-form">
        <input type="text" onChange={onChange} value={content.comment} placeholder="email" />
        <button onClick={onSubmit}>login</button>
        <p className="message">Not registered? <a onClick={() => console.log('TODO: redirect')}> Create an account</a></p>
        <
      </form>
    </div>
  )


InputForm.propTypes = {
  content: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default InputForm
