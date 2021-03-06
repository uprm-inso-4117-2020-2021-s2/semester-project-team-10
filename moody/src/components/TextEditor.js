import React, {Component, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../components/Text.css'
import ReactHtmlParser from 'react-html-parser';
import RadialMenu from './RadialMenu';
import { config } from '@fortawesome/fontawesome-svg-core';


const Editor = (props) =>{


    const [value, setValue] = useState("") 
    
    const handleOnChange = (e, editor) => {
        // console.log(editor.getData())
        const data = editor.getData()
        setValue(data)
        props.textSend(data)

    }

    return (
        <div className='text-box'>
            <h1>Date</h1>
            <CKEditor className='ck-editor__editable' 
                editor = {ClassicEditor}
                onChange={handleOnChange}
                
            />

            <div >            
            {/* <button 
                className = "boton"
                onClick = {(e) => console.log({value})}
            >
                Submit
            </button> */}
            </div>

            {/* <div>
                {ReactHtmlParser(value)}
            </div> */}
            {/* <div className="radial"> <RadialMenu/> </div> */}
        </div>
        
    )
}

export default Editor;