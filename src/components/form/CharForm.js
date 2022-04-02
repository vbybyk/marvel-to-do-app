import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import useMarvelService from '../../services/MarvelService';

import './charForm.scss'

const CharForm = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = useMarvelService()


    const onLoadedChar = (char) => { 
        setChar(char);
    }
    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
                    .then(onLoadedChar)
    }

    // const onChangeClear = () => {
    //   setChar(null)
    //   success = "null";
    // }
    
    const notLoaded = error ? "Error" : null;
    const loadingChar = loading ? "Loading" : null;
    let success;
    if (char && char.length > 0) {
      success =  <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>
    } else if (!char) {
       success = null;
    } else {
      success = <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;
    }
    
    
    return(
      <Formik
            initialValues={{        
                name: ''}}
            validationSchema={yup.object({
                name: yup.string()
                            .min(2, 'Min 2 symbols')
                            .required('This field is required')
            })}
            onSubmit={({name}) => updateChar(name)}
            // OnChange={onChangeClear}
      >
          <Form className="form__basics">
            <div className="form__title">
                Or find a character by name:
            </div>
            <Field
              id="name"
              name="name" 
              type="text"
              className="form__input"
              placeholder="Enter name">
            </Field>
            <button 
              className="button button__main"
              type="submit">
                <div className="inner">Find</div>
            </button>
            <ErrorMessage className="error" name="name" component="div"/>
            {notLoaded}
            {loadingChar}
            {success}
          </Form>
      </Formik>
    )
}

export default CharForm;